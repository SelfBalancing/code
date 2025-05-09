// Chapter21LogicUnit (c) Charles Petzold, 2024

let Chapter21LogicUnit = 
{
    name: "Chapter21LogicUnit",
    transform: { x: 475, y: 325, scale: 1, rotate: 0 },
    wireCurveRadius: 10,
    components:
    [
        { name:"bitwiseAnd", type: "BitwiseAnd", text: "AND", width: 100, height: 75,
            ports: [{text: "A", x: 0.25, y: 0}, {text: "B", x: 0.75, y:0}, {text: "Out", x: 0.5, y: 1}]},

        { name:"bitwiseXor", type: "BitwiseXor", text: "XOR", width: 100, height: 75, x: 150,
            ports: [{text: "A", x: 0.25, y: 0}, {text: "B", x: 0.75, y:0}, {text: "Out", x: 0.5, y: 1}]},

        { name:"bitwiseOr", type: "BitwiseOr", text: "OR", width: 100, height: 75, x: 300,
            ports: [{text: "A", x: 0.25, y: 0}, {text: "B", x: 0.75, y:0}, {text: "Out", x: 0.5, y: 1}]},

        { name:"spinA", type: "HexSpinner", value: 0x33, y: -225, relative: {xy: { name:"bitwiseAnd", io: "A"}}},
        { name:"spinB", type: "HexSpinner", value: 0x55, relative: {x: { name:"bitwiseOr", io: "B"}, y: { name:"spinA"}}},
    
        { name:"a", type: "Label", text: "A", y: -75, relative: {xy: { name:"spinA"}}},
        { name:"b", type: "Label", text: "B", y: -75, relative: {xy: { name:"spinB"}}},

        { name:"button0", type: "DigitButton", x: -225, relative: {xy: { name:"spinA"}}},
        { name:"button1", type: "DigitButton", x: -100, relative: {xy: { name:"button0"}}},
        { name:"button2", type: "DigitButton", x: -100, relative: {xy: { name:"button1"}}, initial: true},

        { name:"functionBits", type: "DynamicDecimal", y: -65, relative: {xy: { name:"button1"}},
            lookup: {0: "Add", 1: "Add with Carry", 2: "Subtract", 3: "Subtract with Borrow",
                     4: "Bitwise AND", 5: "Bitwise XOR", 6: "Bitwise OR", 7: "Compare"},
            digits: {0: "button0", 1: "button1", 2: "button2"}},

        { name:"bNodeOr", type: "DataPathNode", right: true, y: -125, relative: {xy: { name:"bitwiseOr", io: "B"}}},
        { name:"bNodeXor", type: "DataPathNode", top: true, relative: {x: { name:"bitwiseXor", io: "B"}, y: { name:"bNodeOr"}}},
        { name:"bNodeAnd", type: "DataPathNode", top: true, left: true, relative: {x: { name:"bitwiseAnd", io: "B"}, y: { name:"bNodeOr"}}},

        { name:"aNodeAnd", type: "DataPathNode", left: true, y: -75, relative: {xy: { name:"bitwiseAnd", io: "A"}}},
        { name:"aNodeXor", type: "DataPathNode", top: true, relative: {x: { name:"bitwiseXor", io: "A"}, y: { name:"aNodeAnd"}}},
        { name:"aNodeOr", type: "DataPathNode", top: true, right: true, relative: {x: { name:"bitwiseOr", io: "A"}, y: { name:"aNodeAnd"}}},

        { name:"triAnd", type: "TriStateBuffer", group: "a", text: "TRI", width: 100, height: 75, y: 225, relative: {xy: { name:"bitwiseAnd"}},
            ports: [{text: "Input", x: 0.5, y: 0}, {text: "Output", x: 0.5, y: 1}, {text: "En", x: 0, y: 0.5}],
            triStates: [{ name:"output", group: "a"}]},

        { name:"triXor", type: "TriStateBuffer", group: "a", text: "TRI", width: 100, height: 75, relative: {x: { name:"bitwiseXor"}, y: { name:"triAnd"}},
            ports: [{text: "Input", x: 0.5, y: 0}, {text: "Output", x: 0.5, y: 1}, {text: "En", x: 0, y: 0.5}],
            triStates: [{ name:"output", group: "a"}]},

        { name:"triOr", type: "TriStateBuffer", group: "a", text: "TRI", width: 100, height: 75, relative: {x: { name:"bitwiseOr"}, y: { name:"triAnd"}},
            ports: [{text: "Input", x: 0.5, y: 0}, {text: "Output", x: 0.5, y: 1}, {text: "En", x: 0, y: 0.5}],
            triStates: [{ name:"output", group: "a"}]},

        { name:"triNodeAnd", type: "DataPathNode", left: true, bottom: true, y:50, relative: {xy: { name:"triAnd", io: "Output"}}},
        { name:"triNodeXor", type: "DataPathNode", relative: {x: { name:"triXor", io: "Output"}, y: { name:"triNodeAnd"}}},
        { name:"triNodeOr", type: "DataPathNode", bottom: true, right: true, relative: {x: { name:"triOr", io: "Output"}, y: { name:"triNodeAnd"}}},

        { name:"result", type: "HexLight", y: 125, relative: {xy: { name:"triNodeXor"}}},
        { name:"sum", type: "Label", text: "Result", y: 50, relative: {xy: { name:"result"}}},

        { name:"and3", type: "AndGate", inputs: 3, scale: 0.5, x: -120, relative: {xy: { name:"triAnd", io: "En"}}},
        { name:"and2", type: "AndGate", inputs: 3, scale: 0.5, y: -75, relative: {xy: { name:"and3"}}},
        { name:"and1", type: "AndGate", inputs: 3, scale: 0.5, y: -75, relative: {xy: { name:"and2"}}},

        { name:"and2Joint2", type: "Joint", x: -25, relative: {xy: { name:"triXor", io: "En"}}},
        { name:"and2Joint1", type: "Joint", relative: {y: { name:"and2", io: "out"}, x: { name:"and2Joint2"}}},

        { name:"and1Joint2", type: "Joint", x: -25, relative: {xy: { name:"triOr", io: "En"}}},
        { name:"and1Joint1", type: "Joint", relative: {x: { name:"and1Joint2"}, y: { name:"and1", io: "out"}}},

        { name:"f2Node1", type: "Node", relative: {x: { name:"button2"}, y: { name:"and1", io: "3/3"}}},
        { name:"f2Node2", type: "Node", relative: {x: { name:"button2"}, y: { name:"and2", io: "3/3"}}},
        { name:"f2Joint3", type: "Joint", relative: {x: { name:"button2"}, y: { name:"and3", io: "3/3"}}},

        { name:"f1Node1", type: "Node", y: 125, relative: {xy: { name:"button1"}}},
        { name:"f1Joint2", type: "Joint", relative: {x: { name:"f1Node1"}, y: { name:"and1", io: "2/3"}}},
        { name:"f1Inv", type: "Inverter", scale: 0.33, rotate: 90, x: 40, y: 50, relative: {xy: { name:"f1Node1"}}},
        { name:"f1Joint3", type: "Joint", relative: {x: { name:"f1Inv"}, y: { name:"f1Node1"}}},
        { name:"f1Node4", type: "Node", relative: {x: { name:"f1Inv"}, y: { name:"and2", io: "2/3"}}},
        { name:"f1Joint5", type: "Joint", relative: {x: { name:"f1Node4"}, y: { name:"and3", io: "2/3"}}},

        { name:"f0Node1", type: "Node", relative: {x: { name:"button0"}, y: { name:"f1Node1"}}},
        { name:"f0Joint2", type: "Joint", relative: {x: { name:"f0Node1"}, y: { name:"and2", io: "1/3"}}},
        { name:"f0Inv", type: "Inverter", scale: 0.33, rotate: 90, x: 40, y: 50, relative: {xy: { name:"f0Node1"}}},
        { name:"f0Joint3", type: "Joint", relative: {x: { name:"f0Inv"}, y: { name:"f0Node1"}}},
        { name:"f0Node4", type: "Node", relative: {x: { name:"f0Inv"}, y: { name:"and1", io: "1/3"}}},
        { name:"f0Joint5", type: "Joint", relative: {x: { name:"f0Node4"}, y: { name:"and3", io: "1/3"}}},

    ],
    wires:
    [
        { points:[{ name:"triNodeXor", io: "bottom"}, { name:"result", io: "top"}], wide: true, beg: "none"},

        { points:[{ name:"triAnd", io: "Output", output: "output"}, { name:"triNodeAnd", io: "top"}], wide: true, end: "none", chars: 0},
        { points:[{ name:"triXor", io: "Output", output: "output"}, { name:"triNodeXor", io: "top"}], wide: true, end: "none", chars: 0},
        { points:[{ name:"triOr", io: "Output", output: "output"}, { name:"triNodeOr", io: "top"}], wide: true, end: "none", chars: 0},
        { points:[{ name:"triNodeAnd", io: "right"}, { name:"triNodeXor", io: "left"}], wide: true, beg: "none", end: "none", chars: 0},
        { points:[{ name:"triNodeXor", io: "right"}, { name:"triNodeOr", io: "left"}], wide: true, beg: "none", end: "none", chars: 0},

        { points:[{ name:"bitwiseAnd", io: "Out", output: "output"}, { name:"triAnd", io: "Input", input: "input"}], wide: true},
        { points:[{ name:"bitwiseXor", io: "Out", output: "output"}, { name:"triXor", io: "Input", input: "input"}], wide: true},
        { points:[{ name:"bitwiseOr", io: "Out", output: "output"}, { name:"triOr", io: "Input", input: "input"}], wide: true},

        { points:[{ name:"spinB", io: "bottom", output: "output"}, { name:"bNodeOr", io: "top"}], wide: true, end: "none", chars: 0},
        { points:[{ name:"bNodeOr", io: "bottom"}, { name:"bitwiseOr", io: "B", "input": "b"}], wide: true, beg: "none", nudge: 18},
        { points:[{ name:"bNodeOr", io: "left"}, { name:"bNodeXor", io: "right"}], wide: true, beg: "none", end: "none", chars: 0},
        { points:[{ name:"bNodeXor", io: "bottom"}, { name:"bitwiseXor", io: "B", "input": "b"}], wide: true, beg: "none", nudge: 18},
        { points:[{ name:"bNodeXor", io: "left"}, { name:"bNodeAnd", io: "right"}], wide: true, end: "none", beg: "none", chars: 0},
        { points:[{ name:"bNodeAnd", io: "bottom"}, { name:"bitwiseAnd", io: "B", "input": "b"}], wide: true, beg: "none", nudge: 18},

        { points:[{ name:"spinA", io: "bottom", output: "output"}, { name:"aNodeAnd", io: "top"}], wide: true, end: "none", chars: 0},
        { points:[{ name:"aNodeAnd", io: "bottom"}, { name:"bitwiseAnd", io: "A", "input": "a"}], wide: true, beg: "none", nudge: -5},
        { points:[{ name:"aNodeAnd", io: "right"}, { name:"aNodeXor", io: "left"}], wide: true, beg: "none", end: "none", chars: 0},
        { points:[{ name:"aNodeXor", io: "bottom"}, { name:"bitwiseXor", io: "A", "input": "a"}], wide: true, beg: "none", nudge: -5},
        { points:[{ name:"aNodeXor", io: "right"}, { name:"aNodeOr", io: "left"}], wide: true, beg: "none", end: "none", chars: 0},
        { points:[{ name:"aNodeOr", io: "bottom"}, { name:"bitwiseOr", io: "A", "input": "a"}], wide: true, beg: "none", nudge: -5},

        { points:[{ name:"and3", io: "out"}, { name:"triAnd", io: "En", input: "enable"}]},
        { points:[{ name:"and2", io: "out"}, { name:"and2Joint1"}, { name:"and2Joint2"}, { name:"triXor", io: "En", input: "enable"}]},
        { points:[{ name:"and1", io: "out"}, { name:"and1Joint1"}, { name:"and1Joint2"}, { name:"triOr", io: "En", input: "enable"}]},

        { points:[{ name:"button2", io: "bottom"}, { name:"f2Node1"}]},
        { points:[{ name:"f2Node1"}, { name:"and1", io: "3/3", input: 2}]},
        { points:[{ name:"f2Node1"}, { name:"f2Node2"}]},
        { points:[{ name:"f2Node2"}, { name:"and2", io: "3/3", input: 2}]},
        { points:[{ name:"f2Node2"}, { name:"f2Joint3"}, { name:"and3", io: "3/3", input: 2}]},

        { points:[{ name:"button1", io: "bottom"}, { name:"f1Node1"}]},
        { points:[{ name:"f1Node1"}, { name:"f1Joint2"}, { name:"and1", io: "2/3", input: 1}]},
        { points:[{ name:"f1Node1"}, { name:"f1Joint3"}, { name:"f1Inv"}]},
        { points:[{ name:"f1Inv", io: "out"}, { name:"f1Node4"}]},
        { points:[{ name:"f1Node4"}, { name:"and2", io: "2/3", input: 1}]},
        { points:[{ name:"f1Node4"}, { name:"f1Joint5"}, { name:"and3", io: "2/3", input: 1}]},

        { points:[{ name:"button0", io: "bottom"}, { name:"f0Node1"}]},
        { points:[{ name:"f0Node1"}, { name:"f0Joint2"}, { name:"and2", io: "1/3", input: 0}]},
        { points:[{ name:"f0Node1"}, { name:"f0Joint3"}, { name:"f0Inv"}]},
        { points:[{ name:"f0Inv", io: "out"}, { name:"f0Node4"}]},
        { points:[{ name:"f0Node4"}, { name:"and1", io: "1/3", input: 0}]},
        { points:[{ name:"f0Node4"}, { name:"f0Joint5"}, { name:"and3", io: "1/3", input: 0}]},
    ]
}