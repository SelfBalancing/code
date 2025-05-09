// Chapter21ArithmeticLogicUnit (c) Charles Petzold, 2024

let Chapter21ArithmeticLogicUnit = 
{
    name: "Chapter21ArithmeticLogicUnit",
    transform: { x: 250, y: 375, scale: 1, rotate: 0 },
    wireCurveRadius: 10,
    components:
    [
        { name:"arithUnit", type: "ArithmeticUnit", text: "Add/Sub", width: 250, height: 100,
            ports: [{text: "F\u2081", x: 0.8, y:0}, {text: "F\u2080", x: 0.9, y: 0},
                    {text: "A", x: 0.15, y: 0}, {text: "B", x: 0.5, y:0}, {text: "Out", x: 0.5, y: 1},
                    {text: "CY In", x: 0, y: 0.5}, {text: "CY Out", x: 1, y: 0.5}]},

        { name:"logicUnit", type: "LogicUnit", text: "Logic", width: 250, height: 100, x: 600,
            ports: [{text: "F\u2082", x: 0.05, y:0}, {text: "F\u2081", x: 0.15, y:0}, {text: "F\u2080", x: 0.25, y: 0},
                    {text: "A", x: 0.5, y: 0}, {text: "B", x: 0.85, y:0}, {text: "Out", x: 0.5, y: 1}],
            triStates: [{ name:"output", group: "a1"}]},

        { name:"spinB", type: "HexSpinner", value: 0, y: -275, relative: {xy: { name:"logicUnit", io: "B"}}},
        { name:"spinA", type: "HexSpinner", value: 0, relative: {x: { name:"arithUnit", io: "A"}, y: { name:"spinB"}}},
            
        { name:"a", type: "Label", text: "A", y: -75, relative: {xy: { name:"spinA"}}},
        { name:"b", type: "Label", text: "B", y: -75, relative: {xy: { name:"spinB"}}},

        { name:"button1", type: "DigitButton", x: 390, relative: {xy: { name:"spinA"}}},
        { name:"button0", type: "DigitButton", x: 110, relative: {xy: { name:"button1"}}},
        { name:"button2", type: "DigitButton", x: -110, relative: {xy: { name:"button1"}}},

        { name:"functionBits", type: "DynamicDecimal", y: -65, relative: {xy: { name:"button1"}},
            lookup: {0: "Add", 1: "Add with Carry", 2: "Subtract", 3: "Subtract with Borrow",
                     4: "Bitwise AND", 5: "Bitwise XOR", 6: "Bitwise OR", 7: "Compare"},
            digits: {0: "button0", 1: "button1", 2: "button2"}},

        { name:"flagsLatch", type: "Latch", text: "Flags Latch", width: 375, height: 75, x: 175, y: 875, relative: {xy: { name:"arithUnit"}},
            ports: [{text: "S", x: 0.15, y: 0}, {text: "Z", x: 0.5, y: 0}, {text: "CY", x: 0.85, y: 0},
                    {text: "S\u200B", x: 0.15, y: 1}, {text: "Z\u200B", x: 0.5, y: 1}, {text: "CY\u200B", x: 0.85, y: 1},
                    {text: "Clk", x: 0, y: 0.5}]},

        { name:"sLight", type: "BitLight", y: 100, relative: {xy: { name:"flagsLatch", io: "S\u200B"}}},
        { name:"sign", type: "Label", text: "Sign", xAlign: 0.5, yAlign: 0, y: 50, relative: { xy: { name:"sLight" }}},

        { name:"zLight", type: "BitLight", relative: {x: { name:"flagsLatch", io: "Z\u200B"}, y: { name:"sLight"}}},
        { name:"zero", type: "Label", text: "Zero", xAlign: 0.5, yAlign: 0, y: 50, relative: { xy: { name:"zLight" }}},

        { name:"cyLight", type: "BitLight", relative: {x: { name:"flagsLatch", io: "CY\u200B"}, y: { name:"sLight"}}},
        { name:"carry", type: "Label", text: "Carry", xAlign: 0.5, yAlign: 0, y: 50, relative: { xy: { name:"cyLight" }}},
        { name:"cyLoopNode", type: "Node", y: 35, relative: {xy: { name:"flagsLatch", io: "CY\u200B"}}},

        { name:"outTri", type: "TriStateBuffer", text: "TRI", width: 150, height: 75, x: 50, relative: {x: { name:"logicUnit"}, y: { name:"flagsLatch"}},
            ports: [{text: "In", x: 0.5, y: 0}, {text: "Out", x: 0.5, y: 1}, {text: "En", x: 1, y: 0.5}],
            triStates: [{ name:"output", group: "b"}]},

        { name:"outLatch", type: "Latch", text: "Latch", width: 150, height: 75, y: -150, relative: {xy: { name:"outTri"}},
            ports: [{text: "In", x: 0.5, y: 0}, {text: "Out", x: 0.5, y: 1}, {text: "Clk", x: 0, y: 0.5}]},

        { name:"clkButton", type: "MomentaryButton", x: -300, relative: {xy: { name:"flagsLatch", io: "Clk"}}},
        { name:"clock", type: "Label", text: "Clock", y: 50, relative: {xy: { name:"clkButton"}}},
        { name:"clkNode", type: "Node", x: -50, relative: {xy: { name:"flagsLatch", io: "Clk"}}},
        { name:"clkJoint3", type: "Joint", x: -50, relative: {xy: { name:"outLatch", io: "Clk"}}},
        { name:"clkJoint1", type: "Joint", y: -50, relative: {x: { name:"clkNode"}, y: { name:"flagsLatch"}}},
        { name:"clkJoint2", type: "Joint", relative: {x: { name:"clkJoint3"}, y: { name:"clkJoint1"}}},

        { name:"enButton", type: "MomentaryButton", x: 100, relative: {xy: { name:"outTri", io: "En"}}},
        { name:"enable", type: "Label", text: "Enable", y: 50, relative: {xy: { name:"enButton"}}},

        { name:"arithTri", type: "TriStateBuffer", text: "TRI", width: 150, height: 75, x: 50, y: 525, relative: {xy: { name:"arithUnit"}},
            ports: [{text: "In", x: 0.5, y: 0}, {text: "Out", x: 0.5, y: 1}, {text: "En", x: 1, y: 0.5}],
            triStates: [{ name:"output", group: "a1"}]},

        { name:"accTri", type: "TriStateBuffer", text: "TRI", width: 150, height: 75, x: -275, relative: {xy: { name:"arithTri"}},
            ports: [{text: "In", x: 0.5, y: 0}, {text: "Out", x: 0.5, y: 1}, {text: "En", x: 1, y: 0.5}],
            triStates: [{ name:"output", group: "a1"}]},

        { name:"cyAnd", type: "AndGate", scale: 0.33, rotate: 90, y: 325, relative: {y: { name:"arithUnit"}, x: { name:"flagsLatch", io: "CY"}}}, 
        { name:"fnctOr", type: "OrGate", scale: 0.33, rotate: 90, y: -100, relative: {xy: { name:"cyAnd", io: "A"}}},
        { name:"fnctAnd", type: "AndGate", scale: 0.33, rotate: 90, y: -175, relative: {xy: { name:"fnctOr", io: "A"}}},
        { name:"fnctInv", type: "Inverter", scale: 0.33, rotate: 90, x: -65, y: 100, relative: {xy: { name:"fnctAnd"}}},

        { name:"f2Node", type: "Node", y: -75, relative: {x: { name:"fnctInv"}, y: { name:"arithUnit"}}},
        { name:"f2Joint1", type: "Joint", relative: {x: { name:"button2"}, y: { name:"f2Node"}}},
        { name:"f2Joint2", type: "Joint", relative: {x: { name:"logicUnit", io: "F\u2082"}, y: { name:"f2Node"}}},

        { name:"f1Node1", type: "Node", y: 25, relative: {x: { name:"fnctAnd", io: "A"}, y: { name:"f2Node"}}},
        { name:"f1Node2", type: "Node", relative: {x: { name:"button1"}, y: { name:"f1Node1"}}},
        { name:"f1Joint1", type: "Joint", relative: {x: { name:"arithUnit", io: "F\u2081"}, y: { name:"f1Node2"}}},
        { name:"f1Joint2", type: "Joint", relative: {x: { name:"logicUnit", io: "F\u2081"}, y: { name:"f1Node2"}}},

        { name:"f0Node1", type: "Node", y: 25, relative: {x: { name:"fnctAnd", io: "B"}, y: { name:"f1Node1"}}},
        { name:"f0Node2", type: "Node", relative: {x: { name:"button0"}, y: { name:"f0Node1"}}},
        { name:"f0Joint1", type: "Joint", relative: {x: { name:"arithUnit", io: "F\u2080"}, y: { name:"f0Node2"}}},
        { name:"f0Joint2", type: "Joint", relative: {x: { name:"logicUnit", io: "F\u2080"}, y: { name:"f0Node2"}}},

        { name:"accAnd", type: "AndGate", scale: 0.33, rotate: 180, x: 225, y: 125, relative: {xy: { name:"arithUnit"}}},
        { name:"accNodeB", type: "Node", relative: {x: { name:"f2Node"}, y: { name:"accAnd", io: "B"}}},
        { name:"accNodeA", type: "Node", relative: {x: { name:"fnctAnd", io: "out"}, y: { name:"accAnd", io: "A"}}},
        { name:"accEnJoint2", type: "Joint", x: 25, relative: {xy: { name:"accTri", io: "En"}}},
        { name:"accEnJoint1", type: "Joint", relative: {x: { name:"accEnJoint2"}, y: { name:"accAnd", io: "out"}}},

        { name:"invNode", type: "Node", y: 20, relative: {xy: { name:"fnctInv", io: "out"}}},
        { name:"invJoint1", type: "Joint", relative: {y: { name:"invNode"}, x: { name:"fnctOr", io: "B"}}},
        { name:"invJoint2", type: "Joint", relative: {x: { name:"invNode"}, y: { name:"arithTri", io: "En"}}},

        { name:"cyOutJoint1", type: "Joint", x: 25, relative: {xy: { name:"arithUnit", io: "CY Out"}}},
        { name:"cyOutJoint3", type: "Joint", y: -50, relative: {xy: { name:"cyAnd", io: "B"}}},
        { name:"cyOutJoint2", type: "Joint", relative: {x: { name:"cyOutJoint1"}, y: { name:"cyOutJoint3"}}},

        { name:"aNode1", type: "DataPathNode", y: -125, relative: {xy: { name:"arithUnit", io: "A"}}},
        { name:"aNode2", type: "DataPathNode", right: true, top: true, relative: {y: { name:"aNode1"}, x: { name:"logicUnit", io: "A"}}},
        { name:"aNode3", type: "DataPathNode", top: true, left: true, relative: {y: { name:"aNode1"}, x: { name:"accTri", io: "In"}}},
        { name:"bNode1", type: "DataPathNode", right: true, y: -175, relative: {xy: { name:"logicUnit", io: "B"}}},
        { name:"bNode2", type: "DataPathNode", left: true, top: true, relative: {y: { name:"bNode1"}, x: { name:"arithUnit", io: "B"}}},

        { name:"outNode2", type: "DataPathNode", bottom: true, y: 50, relative: {xy: { name:"arithTri", io: "Out"}}},
        { name:"outNode1", type: "DataPathNode", left: true, bottom: true, relative: {y: { name:"outNode2"}, x: { name:"accTri", io: "Out"}}},
        { name:"outNode3", type: "DataPathNode", right: true, relative: {y: { name:"outNode1"}, x: { name:"logicUnit", io: "Out"}}},

        { name:"outNodeSign", type: "DataPathNode", top: true, bottom: true, relative: {x: { name:"flagsLatch", io: "S"}, y: { name:"outNode1"}}},

        { name:"zeroOr", type: "OrGate", scale: 0.33, rotate: 90, y: -375, relative: {xy: { name:"flagsLatch", io: "Z"}}},
        { name:"zeroAndArith", type: "AndGate", scale: 0.33, rotate: 90, x: -25, y: -75, relative: {xy: { name:"zeroOr", io: "B"}}},
        { name:"zeroAndLogic", type: "AndGate", scale: 0.33, rotate: 90, x: 25, relative: {x: { name:"zeroOr", io: "A"}, y: { name:"zeroAndArith"}}},
        { name:"zeroNorArith", type: "DataNorGate", scale: 0.5, x: -125, y: -25, relative: {xy: { name:"zeroAndArith"}}},
        { name:"zeroNorLogic", type: "DataNorGate", scale: 0.5, rotate: 180, x: 450, relative: {xy: { name:"zeroNorArith"}}},

        { name:"zeroNodeArith", type: "DataPathNode", left: true, relative: {x: { name:"arithUnit", io: "Out"}, y: { name:"zeroNorArith"}}},
        { name:"zeroNodeLogic", type: "DataPathNode", right: true, relative: {x: { name:"logicUnit", io: "Out"}, y: { name:"zeroNorArith"}}},

        { name:"zeroArithJoint1", type: "Joint", relative: {x: { name:"zeroAndArith", io: "B"}, y: { name:"zeroNorArith", io: "out"}}},
        { name:"zeroArithJoint2", type: "Joint", y: 15, relative: {xy: { name:"zeroAndArith", io: "out"}}},
        { name:"zeroArithJoint3", type: "Joint", relative: {y: { name:"zeroArithJoint2"}, x: { name:"zeroOr", io: "B"}}},

        { name:"zeroLogicJoint1", type: "Joint", relative: {x: { name:"zeroAndLogic", io: "A"}, y: { name:"zeroNorLogic", io: "out"}}},
        { name:"zeroLogicJoint2", type: "Joint", y: 15, relative: {xy: { name:"zeroAndLogic", io: "out"}}},
        { name:"zeroLogicJoint3", type: "Joint", relative: {y: { name:"zeroLogicJoint2"}, x: { name:"zeroOr", io: "A"}}},

        { name:"useArithNode", type: "Node", y: 35, relative: {xy: { name:"fnctOr", io: "out"}}},
        { name:"useArithJoint", type: "Joint", relative: {x: { name:"zeroAndArith", io: "A"}, y: { name:"useArithNode"}}},
        { name:"useLogicNode", type: "Node", relative: {x: { name:"zeroAndLogic", io: "B"}, y: { name:"useArithNode"}}},
        { name:"useLogicInv", type: "Inverter", scale: 0.33, rotate: 90, y: 35, relative: {xy: { name:"useLogicNode"}}},

        { name:"cyInAnd", type: "AndGate", scale: 0.33, rotate: -90, x: -20, y: 135, relative: {xy: { name:"arithUnit", io: "CY In"}}},
        { name:"cyInJoint", type: "Joint", relative: {x: { name:"cyInAnd", io: "B"}, y: { name:"invNode"}}},
        { name:"cyLoopJoint2", type: "Joint", relative: {y: { name:"arithUnit", io: "CY In"}, x: { name:"cyInAnd", io: "out"}}},
        { name:"cyLoopJoint1", type: "Joint", relative: {x: { name:"cyInAnd", io: "A"}, y: { name:"cyLoopNode"}}},

        { name:"result", type: "HexLight", relative: {x: { name:"outTri", io: "Out"}, y: { name:"cyLight"}}},
        { name:"sum", type: "Label", text: "Result", y: 50, relative: {xy: { name:"result"}}},
    ],
    wires:
    [
        { points:[{ name:"spinA", io: "bottom", output: "output"}, { name:"aNode1", io: "top"}], wide: true, end: "none", chars: 0},
        { points:[{ name:"aNode1", io: "left"}, { name:"aNode3", io: "right"}], wide: true, beg: "none", end: "none", chars: 0},
        { points:[{ name:"aNode3", io: "bottom"}, { name:"accTri", io: "In", input: "input"}], wide: true, beg: "none", chars: 2},
        { points:[{ name:"aNode1", io: "bottom"}, { name:"arithUnit", io: "A", input: "a"}], wide: true, beg: "none", chars: 2},
        { points:[{ name:"aNode1", io: "right"}, { name:"aNode2", io: "left"}], wide: true, beg: "none", end: "none", chars: 0},
        { points:[{ name:"aNode2", io: "bottom"}, { name:"logicUnit", io: "A", input: "a"}], wide: true, beg: "none", chars: 2},

        { points:[{ name:"spinB", io: "bottom", output: "output"}, { name:"bNode1", io: "top"}], wide: true, end: "none", chars: 0},
        { points:[{ name:"bNode1", io: "bottom"}, { name:"logicUnit", io: "B", input: "b"}], wide: true, beg: "none", chars: 2},
        { points:[{ name:"bNode1", io: "left"}, { name:"bNode2", io: "right"}], wide: true, beg: "none", end: "none", chars: 0},
        { points:[{ name:"bNode2", io: "bottom"}, { name:"arithUnit", io: "B", input: "b"}], wide: true, beg: "none", chars: 2},

        { points:[{ name:"button2", io: "bottom"}, { name:"f2Joint1"}, { name:"f2Node"}]},
        { points:[{ name:"f2Node"}, { name:"f2Joint2"}, { name:"logicUnit", io: "F\u2082", input: "f2"}]},
        { points:[{ name:"f2Node"}, { name:"accNodeB"}]},
        { points:[{ name:"accNodeB"}, { name:"fnctInv"}]},
        { points:[{ name:"accNodeB"}, { name:"accAnd", io: "B", input: 1}]},

        { points:[{ name:"button1", io: "bottom"}, { name:"f1Node2"}]},
        { points:[{ name:"f1Node2"}, { name:"f1Joint1"}, { name:"arithUnit", io: "F\u2081", input: "f1"}]},
        { points:[{ name:"f1Node2"}, { name:"f1Node1"}]},
        { points:[{ name:"f1Node1"}, { name:"f1Joint2"}, { name:"logicUnit", io: "F\u2081", input: "f1"}]},
        { points:[{ name:"f1Node1"}, { name:"fnctAnd", io: "A", input: 0}]},

        { points:[{ name:"button0", io: "bottom"}, { name:"f0Node2"}]},
        { points:[{ name:"f0Node2"}, { name:"f0Node1"}]},
        { points:[{ name:"f0Node1"}, { name:"f0Joint1"}, { name:"arithUnit", io: "F\u2080", input: "f0"}]},
        { points:[{ name:"f0Node2"}, { name:"f0Joint2"}, { name:"logicUnit", io: "F\u2080", input: "f0"}]},
        { points:[{ name:"f0Node1"}, { name:"fnctAnd", io: "B", input: 1}]},

        { points:[{ name:"fnctAnd", io: "out"}, { name:"accNodeA"}]},
        { points:[{ name:"accNodeA"}, { name:"fnctOr", io: "A", input: 0}]},
        { points:[{ name:"accNodeA"}, { name:"accAnd", io: "A", input: 0}]},
        { points:[{ name:"accAnd", io: "out"}, { name:"accEnJoint1"}, { name:"accEnJoint2"}, { name:"accTri", io: "En", input: "enable"}]},

        { points:[{ name:"fnctInv", io: "out"}, { name:"invNode"}]},
        { points:[{ name:"invNode"}, { name:"invJoint1"}, { name:"fnctOr", io: "B", input: 1}]},
        { points:[{ name:"invNode"}, { name:"invJoint2"}, { name:"arithTri", io: "En", input: "enable"}]},
        { points:[{ name:"fnctOr", io: "out"}, { name:"useArithNode"}]},
        { points:[{ name:"useArithNode"}, { name:"cyAnd", io: "A", input: 0}]},
        { points:[{ name:"useArithNode"}, { name:"useLogicNode"}]},
        { points:[{ name:"useLogicNode"}, { name:"useArithJoint"}, { name:"zeroAndArith", io: "A", input: 0}]},
        { points:[{ name:"useLogicNode"}, { name:"useLogicInv", io: "in"}]},
        { points:[{ name:"useLogicInv", io: "out"}, { name:"zeroAndLogic", io: "B", input: 1}]},

        { points:[{ name:"arithUnit", io: "CY Out", output: "co"}, { name:"cyOutJoint1"}, { name:"cyOutJoint2"}, { name:"cyOutJoint3"}, { name:"cyAnd", io: "B", input: 1}]},

        { points:[{ name:"cyAnd", io: "out"}, { name:"flagsLatch", io: "CY", input: "ci"}]},

        { points:[{ name:"flagsLatch", io: "CY\u200B", output: "co"}, { name:"cyLoopNode"}]},
        { points:[{ name:"cyLoopNode"}, { name:"cyLight", io: "top"}]},
        { points:[{ name:"flagsLatch", io: "Z\u200B", output: "zo"}, { name:"zLight", io: "top"}]},
        { points:[{ name:"flagsLatch", io: "S\u200B", output: "so"}, { name:"sLight", io: "top"}]},

        { points:[{ name:"cyLoopNode"}, { name:"cyLoopJoint1"}, { name:"cyInAnd", io: "A", input: 0}]},
        { points:[{ name:"invNode"}, { name:"cyInJoint"}, { name:"cyInAnd", io: "B", input: 1}]}, 
        { points:[{ name:"cyInAnd", io: "out"}, { name:"cyLoopJoint2"}, { name:"arithUnit", io: "CY In", input: "ci"}]},

        { points:[{ name:"arithUnit", io: "Out", output: "output"}, { name:"zeroNodeArith", io: "top"}], wide: true, beg: "none", end: "none"},
        { points:[{ name:"zeroNodeArith", io: "bottom"}, { name:"arithTri", io: "In", input: "input"}], wide: true, beg: "none", chars: 2},
        { points:[{ name:"zeroNodeArith", io: "right"}, { name:"zeroNorArith", io: "input"}], wide: true, beg: "none", end: "none"},

        { points:[{ name:"accTri", io: "Out", output: "output"}, { name:"outNode1", io: "top"}], wide: true, end: "none", chars: 0},
        { points:[{ name:"arithTri", io: "Out", output: "output"}, { name:"outNode2", io: "top"}], wide: true, end: "none", chars: 0},
        { points:[{ name:"outNode2", io: "right"}, { name:"outNodeSign", io: "left"}], wide: true, beg: "none", end: "none"},
        { points:[{ name:"outNodeSign", io: "right"}, { name:"outNode3", io: "left"}], wide: true, beg: "none", end: "none"},

        { points:[{ name:"logicUnit", io: "Out", output: "output"}, { name:"zeroNodeLogic", io: "top"}], wide: true, beg: "none", end: "none"},
        { points:[{ name:"zeroNodeLogic", io: "bottom"}, { name:"outNode3", io: "top"}], wide: true, beg: "none", end: "none", chars: 0},
        { points:[{ name:"zeroNodeLogic", io: "left"}, { name:"zeroNorLogic", io: "input"}], wide: true, beg: "none", end: "none"},

        { points:[{ name:"zeroNorArith", io: "out"}, { name:"zeroArithJoint1"}, { name:"zeroAndArith", io: "B", input: 1}]},
        { points:[{ name:"zeroAndArith", io: "out"}, { name:"zeroArithJoint2"}, { name:"zeroArithJoint3"}, { name:"zeroOr", io: "B", input: 1}]},

        { points:[{ name:"zeroNorLogic", io: "out"}, { name:"zeroLogicJoint1"}, { name:"zeroAndLogic", io: "A", input: 0}]},
        { points:[{ name:"zeroAndLogic", io: "out"}, { name:"zeroLogicJoint2"}, { name:"zeroLogicJoint3"}, { name:"zeroOr", io: "A", input: 0}]},

        { points:[{ name:"outNode2", io: "left"}, { name:"outNode1", io: "right"}], wide: true, beg: "none", end: "none"},
        { points:[{ name:"outNode3", io: "bottom"}, { name:"outLatch", io: "In", input: "input"}], wide: true, beg: "none"},
        { points:[{ name:"outLatch", io: "Out", output: "output"}, { name:"outTri", io: "In", input: "input"}], wide: true},

        { points:[{ name:"outNodeSign", output: "bit7", y: 10}, { name:"flagsLatch", io: "S", input: "si"}]},

        { points:[{ name:"zeroOr", io: "out"}, { name:"flagsLatch", io: "Z", "input": "zi"}]},

        { points:[{ name:"clkButton", io: "right"}, { name:"clkNode"}]},
        { points:[{ name:"clkNode"}, { name:"flagsLatch", io: "Clk", input: "clk"}]},
        { points:[{ name:"clkNode"}, { name:"clkJoint1"}, { name:"clkJoint2"}, { name:"clkJoint3"}, { name:"outLatch", io: "Clk", input: "clk"}]},

        { points:[{ name:"outTri", io: "Out", output: "output"}, { name:"result", io: "top"}], wide: true, beg: "none"},
        { points:[{ name:"enButton", io: "left"}, { name:"outTri", io: "En", input: "enable"}]},
   ]
}