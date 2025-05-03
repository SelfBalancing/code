// Chapter15OneBitFullAdder (c) Charles Petzold, 2024 

let Chapter15OneBitFullAdder = 
{
    name: "Chapter15OneBitFullAdder",
    transform: {x: -20, y: 55, scale: 1, rotate: 0},
    propagationDelay: 100,
    wireCurveRadius: 10,
    components:
    [
        { name: "fuller", type: "External", file: "Chapter15OneBitFuller", scale: 0.65, y: 26 },

        { name: "buttonA", type: "DigitButton", x: 80, relative: { y: { name:"fuller.halfer1.summer.nand", io: "A" }}},
        { name: "buttonB", type: "DigitButton", relative: {x: { name:"buttonA" }, y: { name:"fuller.halfer1.nodeB2"}}},
        { name: "buttonCarry", type: "DigitButton", y:-75, relative: {xy:{ name:"fuller.halfer2.nodeA1"}}},

        { name: "sumLight", type: "BitLight", x:100, relative: {xy: { name:"fuller.halfer2.summer.and", io: "out"}}},
        { name: "carryLight", type: "BitLight", relative: { x: { name:"sumLight"}, y: { name: "fuller.carryOr", io: "out"}}},

        { name: "labelA", type: "Label", text: "A", y: 50, relative: {xy: { name:"buttonA"}}},
        { name: "labelB", type: "Label", text: "B", y: 50, relative: {xy: { name:"buttonB"}}},
        { name: "labelSum", type: "Label", text: "SUM", xAlign: 0.5, yAlign: 0, y: 50, relative: { xy: { name:"sumLight" }}},
        { name: "labelCarry", type: "Label", text: "CARRY OUT", xAlign: 0.5, yAlign: 0, y: 50, relative: { xy: { name:"carryLight" }}},

        { name: "labelCarryIn", type: "Label", text: "CARRY IN", x: -100, relative: { xy: { name:"buttonCarry" }}}

    ],
    wires:
    [
        { points: [ { name:"buttonA", io: "right"}, { name: "fuller.halfer1.nodeA1" }]},
        { points: [ { name:"buttonB", io: "right"}, { name: "fuller.halfer1.nodeB2"}]},
        { points: [ { name:"fuller.halfer1.nodeB2"}, { name: "fuller.halfer1.jt0"}, { name: "fuller.halfer1.summer.nand", io: "B", input: 1}]},

        { points: [ { name:"buttonCarry", io: "bottom"}, { name: "fuller.halfer2.nodeA1"}]},

        { points: [ { name:"fuller.halfer2.summer.and", io:"out"}, { name:"sumLight", io: "left"}]},
        { points: [ { name:"fuller.carryOr", io: "out"}, { name: "carryLight", io: "left"}]},
    ]
};

