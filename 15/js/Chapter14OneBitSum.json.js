// Chapter14OneBitSum (c) Charles Petzold, 2024

let Chapter14OneBitSum = 
{
    name: "Chapter14OneBitSum",
    transform: {x: 0, y: 0, scale: 1, rotate: 0},
    propagationDelay: 100,
    components:
    [
        { name: "summer", type: "External", file: "Chapter14OneBitSummer" },

        { name: "button1", type: "DigitButton", x: -170, relative: {xy: { name:"summer.or", io: "A" }}},
        { name: "button2", type: "DigitButton", relative: {x: { name:"button1" }, y: { name:"summer.nand", io: "B"}}},

        { name: "light", type: "BitLight", x: 100, relative: { xy: { name: "summer.and", io: "out" }}},
        { name: "label", type: "Label", text: "SUM", xAlign: 0.5, yAlign: 0, y: 50, relative: { xy: { name:"light" }}},

        { name: "nodeA", type: "Node", x: 200, relative: { y: { name:"button1" }}},
        { name: "nodeB", type: "Node", x: 150, relative: { y: { name:"button2" }}},

        { name: "jtA", type: "Joint", relative: { x: { name:"nodeA"}, y: { name: "summer.nand", io: "A"}}},
        { name: "jtB1", type: "Joint", relative: { x: { name:"nodeB"}, y: { name: "summer.or", io: "B"}}}
    ],
    wires:
    [
        { points: [ { name:"button1", io: "right"}, { name: "nodeA" }]},
        { points: [ { name:"nodeA"}, { name: "summer.or", io: "A", input: 0}]},
        { points: [ { name:"nodeA"}, { name: "jtA"}, { name:"summer.nand", io: "A", input: 0}]},

        { points: [ { name:"button2", io: "right"}, { name: "nodeB" }]},
        { points: [ { name:"nodeB"}, { name: "jtB1"}, { name: "summer.or", io: "B", input: 1}]},
        { points: [ { name:"nodeB"}, { name:"summer.nand", io: "B", input: 1}]},

        { points: [ { name:"summer.and", io: "out"}, { name: "light", io: "left"}]}
    ]
}