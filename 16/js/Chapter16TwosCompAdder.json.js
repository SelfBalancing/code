// Chapter16TwosCompAdder (c) Charles Petzold, 2024

let Chapter16TwosCompAdder = 
{
    name: "Chapter16TwosCompAdder",
    transform: {x: 40, y: 200, scale: 1, rotate: 0},
    propagationDelay: 25,
    nodeRadius: 3,
    wireCurveRadius: 5,

    components:
    [
        { name: "adder0", type: "External", file: "Chapter14EightBitComponent", x: 1050 },
        { name: "adder1", type: "External", file: "Chapter14EightBitComponent", x: 930 },
        { name: "adder2", type: "External", file: "Chapter14EightBitComponent", x: 810 },
        { name: "adder3", type: "External", file: "Chapter14EightBitComponent", x: 690 },
        { name: "adder4", type: "External", file: "Chapter14EightBitComponent", x: 570 },
        { name: "adder5", type: "External", file: "Chapter14EightBitComponent", x: 450 },
        { name: "adder6", type: "External", file: "Chapter14EightBitComponent", x: 330 },
        { name: "adder7", type: "External", file: "Chapter14EightBitComponent", x: 210 },

        { name: "b0", type: "Label", text: "Bit 0", y:-45, relative: { xy: { name: "adder0.buttonA"}}},
        { name: "b1", type: "Label", text: "Bit 1", y:-45, relative: { xy: { name: "adder1.buttonA"}}},
        { name: "b2", type: "Label", text: "Bit 2", y:-45, relative: { xy: { name: "adder2.buttonA"}}},
        { name: "b3", type: "Label", text: "Bit 3", y:-45, relative: { xy: { name: "adder3.buttonA"}}},
        { name: "b4", type: "Label", text: "Bit 4", y:-45, relative: { xy: { name: "adder4.buttonA"}}},
        { name: "b5", type: "Label", text: "Bit 5", y:-45, relative: { xy: { name: "adder5.buttonA"}}},
        { name: "b6", type: "Label", text: "Bit 6", y:-45, relative: { xy: { name: "adder6.buttonA"}}},
        { name: "b7", type: "Label", text: "Bit 7", y:-45, relative: { xy: { name: "adder7.buttonA"}}},

        { name: "ground", type: "Ground", x: 35, y: 25, relative: { xy: { name: "adder0.fuller.halfer2.nodeA1"}}},
        { name: "gndJoint", type: "Joint", relative: { x: { name:"ground"}, y: { name:"adder0.fuller.halfer2.nodeA1"}}},

        { name: "plus", type: "Label", text: "+", x: -75, y: 7, size: 4, relative: { xy: { name: "adder7.buttonB"}}},

        { name: "overflowLight", type: "BitLight", x:-150, relative: { xy: { name: "adder7.light"}}},
        { name: "jt1", type: "Joint", y:25, relative: { xy: { name: "adder7.fuller.carryOr", io: "out"}}},
        { name: "jt2", type: "Joint", x:-25, relative: { xy: { name: "jt1"}}},

        { name:"overflow", type: "Label", text: "Overflow", y: 50, relative: {xy: { name:"overflowLight"}}},

        { name: "num1", type: "DynamicDecimal", twosComp: true, text: "0", x: 120, relative: { xy: { name:"adder0.buttonA" }}, 
            digits: {0: "adder0.buttonA", 1: "adder1.buttonA", 2: "adder2.buttonA", 3: "adder3.buttonA", 
                        4: "adder4.buttonA", 5: "adder5.buttonA", 6: "adder6.buttonA", 7: "adder7.buttonA"}},

        { name: "num1", type: "DynamicDecimal", twosComp: true, text: "0", x: 120, relative: { xy: { name:"adder0.buttonB" }}, 
            digits: {0: "adder0.buttonB", 1: "adder1.buttonB", 2: "adder2.buttonB", 3: "adder3.buttonB", 
                        4: "adder4.buttonB", 5: "adder5.buttonB", 6: "adder6.buttonB", 7: "adder7.buttonB"}},

        { name: "sum", type: "DynamicDecimal", twosComp: true, text: "0", x: 120, relative: { xy: { name:"adder0.light" }}, 
            digits: {0: "adder0.light", 1: "adder1.light", 2: "adder2.light", 3: "adder3.light", 
                        4: "adder4.light", 5: "adder5.light", 6: "adder6.light", 7: "adder7.light"}},

        { name:"overflowOr", type: "OrGate", scale: 0.25, rotate: 90, y: -100, relative: {xy: { name:"overflowLight"}}},
        { name:"overflowNor", type: "NorGate", scale: 0.25, rotate: 90, inputs: 3, y: -100, x: -20, relative: {xy: { name:"overflowOr"}}},
        { name:"overflowAnd", type: "AndGate", scale: 0.25, rotate: 90, inputs: 3, y: -100, x: 20, relative: {xy: { name:"overflowOr"}}},
        { name:"overflowInv", type: "Inverter", scale: 0.25, rotate: -90, x: 50, y: -5, relative: {xy: { name:"overflowOr", io: "out"}}},

        { name:"aNode", type: "Node", relative: {xy: { name:"adder7.fuller.halfer1.jt1"}}},
        { name:"bNode", type: "Node", relative: {xy: { name:"adder7.fuller.halfer1.jt2"}}},

        { name:"overflowNodeB", type: "Node", relative: {x: { name:"overflowAnd", io: "2/3"}, y: { name:"aNode"}}},
        { name:"overflowNodeC", type: "Node", relative: {x: { name:"overflowAnd", io: "3/3"}, y: { name:"bNode"}}},
        { name:"overflowNodeA", type: "Node", y: 10, relative: {x: { name:"overflowAnd", io: "1/3"}, y: { name:"aNode"}}},

        { name:"overflowJointA", type: "Joint", relative: {y: { name:"overflowNodeA"}, x: { name:"overflowNor", io: "1/3"}}},
        { name:"overflowJointB", type: "Joint", relative: {y: { name:"overflowNodeB"}, x: { name:"overflowNor", io: "2/3"}}},
        { name:"overflowJointC", type: "Joint", relative: {y: { name:"overflowNodeC"}, x: { name:"overflowNor", io: "3/3"}}},

        { name:"invNode1", type: "Node", y: 25, relative: {xy: { name:"adder7.fuller.halfer2.summer.and", io: "out"}}},
        { name:"invJoint2", type: "Joint", relative: {y: { name:"invNode1"}, x: { name:"overflowInv"}}},
        { name:"invJoint3", type: "Joint", relative: {x: { name:"overflowInv"}, y: { name:"overflowNodeA"}}},

        { name:"overflowJointA1", type: "Joint", y: 30, relative: {xy: { name:"overflowAnd", io: "out"}}},
        { name:"overflowJointA2", type: "Joint", relative: {x: { name:"overflowOr", io: "A"}, y: { name:"overflowJointA1"}}},

        { name:"overflowJointB1", type: "Joint", relative: {x: { name:"overflowNor", io: "out"}, y: { name:"overflowJointA1"}}},
        { name:"overflowJointB2", type: "Joint", relative: {x: { name:"overflowOr", io: "B"}, y: { name:"overflowJointB1"}}},
    ],
    wires:
    [
        { points:[{ name:"adder7.fuller.halfer1.nodeB2"}, { name:"bNode"}]},
        { points:[{ name:"bNode"}, { name:"overflowNodeC"}]},
        { points:[{ name:"overflowNodeC"}, { name:"overflowAnd", io: "3/3", input: 2}]},
        { points:[{ name:"overflowNodeC"}, { name:"overflowJointC"}, { name:"overflowNor", io: "3/3", input: 2}]},

        { points:[{ name:"adder7.fuller.halfer1.nodeA2"}, { name:"aNode"}]},
        { points:[{ name:"aNode"}, { name:"overflowNodeB"}]},
        { points:[{ name:"overflowNodeB"}, { name:"overflowAnd", io: "2/3", input: 1}]},
        { points:[{ name:"overflowNodeB"}, { name:"overflowJointB"}, { name:"overflowNor", io: "2/3", input: 1}]},

        { points:[{ name:"adder7.fuller.halfer2.summer.and", io: "out"}, { name:"invNode1"}]},
        { points:[{ name:"invNode1"}, { name:"adder7.light", io: "top"}]},
        { points:[{ name:"invNode1"}, { name:"invJoint2"}, { name:"overflowInv"}]},
        { points:[{ name:"overflowInv", io: "out"}, { name:"invJoint3"}, { name:"overflowNodeA"}]},
        { points:[{ name:"overflowNodeA"}, { name:"overflowAnd", io: "1/3", input: 0}]},
        { points:[{ name:"overflowNodeA"}, { name:"overflowJointA"}, { name:"overflowNor", io: "1/3", input: 0}]},

        { points:[{ name:"overflowAnd", io: "out"}, { name:"overflowJointA1"}, { name:"overflowJointA2"}, { name:"overflowOr", io: "A", input: 0}]},
        { points:[{ name:"overflowNor", io: "out"}, { name:"overflowJointB1"}, { name:"overflowJointB2"}, { name:"overflowOr", io: "B", input: 1}]},

        { points: [ { name:"adder0.fuller.halfer2.nodeA1"}, { name:"gndJoint"}, { name:"ground"}]},            

        { points: [ { name: "adder0.fuller.carryOr", io: "out"}, { name:"adder0.jtCarry1"}, 
            { name:"adder0.jtCarry2"}, { name: "adder1.jtCarry3" }, { name: "adder1.fuller.halfer2.nodeA1"}]},
        { points: [ { name: "adder1.fuller.carryOr", io: "out"}, { name:"adder1.jtCarry1"}, 
            { name:"adder1.jtCarry2"}, { name: "adder2.jtCarry3" }, { name: "adder2.fuller.halfer2.nodeA1"}]},
        { points: [ { name: "adder2.fuller.carryOr", io: "out"}, { name:"adder2.jtCarry1"}, 
            { name:"adder2.jtCarry2"}, { name: "adder3.jtCarry3" }, { name: "adder3.fuller.halfer2.nodeA1"}]},
        { points: [ { name: "adder3.fuller.carryOr", io: "out"}, { name:"adder3.jtCarry1"}, 
            { name:"adder3.jtCarry2"}, { name: "adder4.jtCarry3" }, { name: "adder4.fuller.halfer2.nodeA1"}]},
        { points: [ { name: "adder4.fuller.carryOr", io: "out"}, { name:"adder4.jtCarry1"}, 
            { name:"adder4.jtCarry2"}, { name: "adder5.jtCarry3" }, { name: "adder5.fuller.halfer2.nodeA1"}]},
        { points: [ { name: "adder5.fuller.carryOr", io: "out"}, { name:"adder5.jtCarry1"}, 
            { name:"adder5.jtCarry2"}, { name: "adder6.jtCarry3" }, { name: "adder6.fuller.halfer2.nodeA1"}]},
        { points: [ { name: "adder6.fuller.carryOr", io: "out"}, { name:"adder6.jtCarry1"}, 
            { name:"adder6.jtCarry2"}, { name: "adder7.jtCarry3" }, { name: "adder7.fuller.halfer2.nodeA1"}]},

        { points:[{ name:"overflowOr", io: "out"}, { name:"overflowLight", io: "top"}]},
    ]
}
