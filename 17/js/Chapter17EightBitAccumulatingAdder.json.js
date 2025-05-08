// Chapter17EightBitAccumulatingAdder (c) Charles Petzold, 2024

let Chapter17EightBitAccumulatingAdder = 
{
    name: "Chapter17EightBitAccumulatingAdder",
    transform: {x: 10, y: 65, scale: 1, rotate: 0},
    propagationDelay: 10,
    nodeRadius: 3,
    wireCurveRadius: 5,

    components:
    [
        { name: "adder0", type: "External", file: "Chapter17EightBitAdderComponent", x: 1030 },
        { name: "adder1", type: "External", file: "Chapter17EightBitAdderComponent", x: 900 },
        { name: "adder2", type: "External", file: "Chapter17EightBitAdderComponent", x: 770 },
        { name: "adder3", type: "External", file: "Chapter17EightBitAdderComponent", x: 640 },
        { name: "adder4", type: "External", file: "Chapter17EightBitAdderComponent", x: 500 },
        { name: "adder5", type: "External", file: "Chapter17EightBitAdderComponent", x: 370 },
        { name: "adder6", type: "External", file: "Chapter17EightBitAdderComponent", x: 240 },
        { name: "adder7", type: "External", file: "Chapter17EightBitAdderComponent", x: 110 },

        { name: "b0", type: "Label", text: "Bit 0", y:-45, relative: { xy: { name: "adder0.button"}}},
        { name: "b1", type: "Label", text: "Bit 1", y:-45, relative: { xy: { name: "adder1.button"}}},
        { name: "b2", type: "Label", text: "Bit 2", y:-45, relative: { xy: { name: "adder2.button"}}},
        { name: "b3", type: "Label", text: "Bit 3", y:-45, relative: { xy: { name: "adder3.button"}}},
        { name: "b4", type: "Label", text: "Bit 4", y:-45, relative: { xy: { name: "adder4.button"}}},
        { name: "b5", type: "Label", text: "Bit 5", y:-45, relative: { xy: { name: "adder5.button"}}},
        { name: "b6", type: "Label", text: "Bit 6", y:-45, relative: { xy: { name: "adder6.button"}}},
        { name: "b7", type: "Label", text: "Bit 7", y:-45, relative: { xy: { name: "adder7.button"}}},

        { name: "ground", type: "Ground", x: 50, y: 25, relative: { xy: { name: "adder0.fuller.halfer2.nodeA1"}}},
        { name: "gndJoint", type: "Joint", relative: { x: { name:"ground"}, y: { name:"adder0.fuller.halfer2.nodeA1"}}},

        { name: "num", type: "DynamicDecimal", text: "0", x: 130, relative: { xy: { name:"adder0.button" }}, 
            digits: {0: "adder0.button", 1: "adder1.button", 2: "adder2.button", 3: "adder3.button", 
                        4: "adder4.button", 5: "adder5.button", 6: "adder6.button", 7: "adder7.button"}},

        { name: "sum", type: "DynamicDecimal", text: "0", x: 120, relative: { xy: { name:"adder0.light" }}, 
            digits: {0: "adder0.light", 1: "adder1.light", 2: "adder2.light", 3: "adder3.light", 
                        4: "adder4.light", 5: "adder5.light", 6: "adder6.light", 7: "adder7.light"}},

        { name: "addButton", type: "MomentaryButton", x: 25, relative: { x: { name:"num"}, y: { name:"adder0.clkNode"}}},
        { name: "addText", type:"Label", text:"ADD", y:50, relative: { xy: { name:"addButton"}}}
    ],
    wires:
    [
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

        { points: [ { name:"addButton", io: "left"}, { name: "adder0.clkNode"}]},
        { points: [ { name:"adder0.clkNode"}, { name:"adder1.clkNode"}]},
        { points: [ { name:"adder1.clkNode"}, { name:"adder2.clkNode"}]},
        { points: [ { name:"adder2.clkNode"}, { name:"adder3.clkNode"}]},
        { points: [ { name:"adder3.clkNode"}, { name:"adder4.clkNode"}]},
        { points: [ { name:"adder4.clkNode"}, { name:"adder5.clkNode"}]},
        { points: [ { name:"adder5.clkNode"}, { name:"adder6.clkNode"}]},
        { points: [ { name:"adder6.clkNode"}, { name:"adder7.clkNode"}]}
    ]
}
