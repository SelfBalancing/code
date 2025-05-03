// Chapter14OneBitHalfAdder (c) Charles Petzold, 2024

let Chapter14OneBitHalfAdder = 
{
    name: "Chapter14OneBitHalfAdder",
    transform: {x: 0, y: 0, scale: 1, rotate: 0},
    propagationDelay: 100,
    components:
    [
        { name: "halfer", type: "External", file: "Chapter14OneBitHalfer "},

        { name: "button1", type: "DigitButton", x: -170, relative: {xy: { name:"halfer.summer.or", io: "A" }}},
        { name: "button2", type: "DigitButton", relative: {x: { name:"button1" }, y: { name:"halfer.nodeB2"}}},

        { name: "lightSum", type: "BitLight", x: 100, relative: { xy: { name: "halfer.summer.and", io: "out" }}},
        { name: "lightCarry", type: "BitLight", relative: {x: { name:"lightSum"}, y: { name: "halfer.carryAnd"}}},

        { name: "labelSum", type: "Label", text: "SUM", xAlign: 0.5, yAlign: 0, y: 50, relative: { xy: { name:"lightSum" }}},
        { name: "labelCarry", type: "Label", text: "CARRY", xAlign: 0.5, yAlign: 0, y: 50, relative: { xy: { name:"lightCarry" }}},
    ],
    wires:
    [
        { points: [ { name: "button1", io: "right"}, { name: "halfer.nodeA1"} ]},
        { points: [ { name: "button2", io: "right"}, { name: "halfer.nodeB2"} ]},

        { points: [ { name: "halfer.nodeB2"}, { name:"halfer.jt0"}, { name: "halfer.summer.or", io: "B", input: 1} ]},

        { points: [ { name: "halfer.summer.and", io: "out"}, { name: "lightSum", io: "left"}]},
        { points: [ { name: "halfer.carryAnd", io: "out"}, { name: "lightCarry", io: "left"}]}
    ]
}