// Chapter16EightBitAddSub (c) Charles Petzold, 2024

let Chapter16EightBitAddSub = 
{
    name: "Chapter16EightBitAddSub",
    transform: {x: 15, y: 275, scale: 1, rotate: 0},
    propagationDelay: 100,
    nodeRadius: 3,
    wireCurveRadius: 5,

    components:
    [
        { name: "adder0", type: "External", file: "Chapter16EightBitAddSubComponent", x: 1050 },
        { name: "adder1", type: "External", file: "Chapter16EightBitAddSubComponent", x: 930 },
        { name: "adder2", type: "External", file: "Chapter16EightBitAddSubComponent", x: 810 },
        { name: "adder3", type: "External", file: "Chapter16EightBitAddSubComponent", x: 690 },
        { name: "adder4", type: "External", file: "Chapter16EightBitAddSubComponent", x: 570 },
        { name: "adder5", type: "External", file: "Chapter16EightBitAddSubComponent", x: 450 },
        { name: "adder6", type: "External", file: "Chapter16EightBitAddSubComponent", x: 330 },
        { name: "adder7", type: "External", file: "Chapter16EightBitAddSubComponent", x: 210 },

        { name: "b0", type: "Label", text: "Bit 0", y:-45, relative: { xy: { name: "adder0.buttonA"}}},
        { name: "b1", type: "Label", text: "Bit 1", y:-45, relative: { xy: { name: "adder1.buttonA"}}},
        { name: "b2", type: "Label", text: "Bit 2", y:-45, relative: { xy: { name: "adder2.buttonA"}}},
        { name: "b3", type: "Label", text: "Bit 3", y:-45, relative: { xy: { name: "adder3.buttonA"}}},
        { name: "b4", type: "Label", text: "Bit 4", y:-45, relative: { xy: { name: "adder4.buttonA"}}},
        { name: "b5", type: "Label", text: "Bit 5", y:-45, relative: { xy: { name: "adder5.buttonA"}}},
        { name: "b6", type: "Label", text: "Bit 6", y:-45, relative: { xy: { name: "adder6.buttonA"}}},
        { name: "b7", type: "Label", text: "Bit 7", y:-45, relative: { xy: { name: "adder7.buttonA"}}},

        { name: "ciJoint2", type: "Joint", x: 25, relative: { xy: { name:"adder0.fuller.halfer2.nodeA1"}}},
        { name:"ciJoint1", type: "Joint", relative: {x: { name:"ciJoint2"}, y: { name:"adder0.xorNode"}}},

        { name: "op", type: "DigitButton", label0: "+", label1: "\u2013", x: -120, relative: { xy: { name: "adder7.buttonB"}}},
        { name:"opNode", type: "Node", relative: {x: { name:"op"}, y: { name:"adder7.xorNode"}}},

        { name: "overflowLight", type: "BitLight", x:-120, relative: { xy: { name: "adder7.light"}}},
        { name:"overflowXor", type: "XorGate", scale: 0.25, rotate: 90, y: -100, relative: { xy: { name: "overflowLight"}}},
        { name:"overflow", type: "Label", text: "Overflow", y: 50, relative: {xy: { name:"overflowLight"}}},

        { name: "jtA1", type: "Joint", y:25, relative: { xy: { name: "adder7.fuller.carryOr", io: "out"}}},
        { name:"jtA4", type: "Joint", y: -25, relative: {xy: { name:"overflowXor", io: "A"}}},
        { name:"jtA3", type: "Joint", x: 25, relative: {xy: { name:"jtA4"}}},
        { name: "jtA2", type: "Joint", relative: { x: { name: "jtA3" }, y: { name:"jtA1"}}},

        { name:"jtB2", type: "Joint", relative: {x: { name:"overflowXor", io: "B"}, y: { name:"jtA4"}}},
        { name:"jtB1", type: "Joint", relative: {x: { name:"op"}, y: { name:"jtB2"}}},


        { name: "num1", type: "DynamicDecimal", text: "0", x: 120, relative: { xy: { name:"adder0.buttonA" }}, 
            digits: {0: "adder0.buttonA", 1: "adder1.buttonA", 2: "adder2.buttonA", 3: "adder3.buttonA", 
                        4: "adder4.buttonA", 5: "adder5.buttonA", 6: "adder6.buttonA", 7: "adder7.buttonA"}},

        { name: "num1", type: "DynamicDecimal", text: "0", x: 120, relative: { xy: { name:"adder0.buttonB" }}, 
            digits: {0: "adder0.buttonB", 1: "adder1.buttonB", 2: "adder2.buttonB", 3: "adder3.buttonB", 
                        4: "adder4.buttonB", 5: "adder5.buttonB", 6: "adder6.buttonB", 7: "adder7.buttonB"}},

        { name: "sum", type: "DynamicDecimal", text: "0", x: 120, relative: { xy: { name:"adder0.light" }}, 
            digits: {0: "adder0.light", 1: "adder1.light", 2: "adder2.light", 3: "adder3.light", 
                        4: "adder4.light", 5: "adder5.light", 6: "adder6.light", 7: "adder7.light"}}
    ],
    wires:
    [
        { points:[{ name:"op", io: "bottom"}, { name:"opNode"}]},
        { points:[{ name:"opNode"}, { name:"adder7.xorNode"}]},
        { points:[{ name:"adder7.xorNode"}, { name:"adder6.xorNode"}]},
        { points:[{ name:"adder6.xorNode"}, { name:"adder5.xorNode"}]},
        { points:[{ name:"adder5.xorNode"}, { name:"adder4.xorNode"}]},
        { points:[{ name:"adder4.xorNode"}, { name:"adder3.xorNode"}]},
        { points:[{ name:"adder3.xorNode"}, { name:"adder2.xorNode"}]},
        { points:[{ name:"adder2.xorNode"}, { name:"adder1.xorNode"}]},
        { points:[{ name:"adder1.xorNode"}, { name:"adder0.xorNode"}]},

        { points: [ { name:"adder0.xorNode"}, { name:"ciJoint1"}, { name:"ciJoint2"}, { name:"adder0.fuller.halfer2.nodeA1"}]},            

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

        { points:[{ name:"op", io: "bottom"}, { name:"jtB1"}, { name:"jtB2"}, { name:"overflowXor", io: "B", input: 1}]},

        { points: [ { name:"adder7.fuller.carryOr", io: "out"}, { name:"jtA1"}, { name: "jtA2"}, { name:"jtA3"}, { name: "jtA4"}, { name:"overflowXor", io: "A", input: 0}]},
        { points:[{ name:"overflowXor", io: "out"}, { name:"overflowLight", io: "top"}]}
    ]
}
