// Chapter15OneBitFuller (c) Charles Petzold, 2024

let Chapter15OneBitFuller = 
{
    name: "Chapter15OneBitFuller",
    components:
    [
        { name: "halfer1", type: "External", file: "Chapter15OneBitHalfer", x:100 },
        { name: "halfer2", type: "External", file: "Chapter15OneBitHalfer", x:600 },

        { name: "nodeB1", type: "Node", relative: {x: { name:"halfer2.nodeB2"}, y: { name:"halfer1.summer.and", io: "out"}}},

        { name: "carryOr", type: "OrGate", relative: { x: { name:"halfer2.summer.and"}, y: { name: "halfer2.carryAnd", io: "B" }}},
        { name: "jtCarry1", type: "Joint", x:125, relative: {xy: { name:"halfer1.carryAnd", io: "out"}}},
        { name: "jtCarry2", type: "Joint", y:100, relative: {xy: { name:"jtCarry1"}}},
        { name: "jtCarry4", type: "Joint", x:-50, relative: {xy: { name:"carryOr", io: "B"}}},
        { name: "jtCarry3", type: "Joint", relative: {x: { name:"jtCarry4"}, y: { name:"jtCarry2"}}},


        { name: "jtOr2", type: "Joint", x: -50, relative: { xy: { name:"halfer2.summer.and", io: "B" }}},
        { name: "jtOr1", type: "Joint", relative: { x: { name:"jtOr2"}, y: { name:"halfer2.summer.or", io: "out"}}}
    ],
    wires:
    [
        { points:[ { name: "halfer1.summer.and", io: "out"}, { name: "nodeB1"}]},
        { points: [ { name:"nodeB1"}, { name:"halfer2.nodeB2"}]},
        { points: [ { name:"nodeB1"}, { name:"halfer2.jt0"}, { name: "halfer2.summer.nand", io: "B", input: 1}]},

        { points: [ { name: "halfer2.carryAnd", io: "out"}, { name: "carryOr", io: "A", input: 0}]},
        { name: "carryWire", points: [ { name: "halfer1.carryAnd", io: "out"}, { name: "jtCarry1"}, { name: "jtCarry2"},{ name: "jtCarry3"},{ name: "jtCarry4"}, { name:"carryOr", io: "B", input: 1}]},


        { points: [ { name: "halfer2.summer.or", io: "out"}, { name:"jtOr1"}, { name: "jtOr2"}, { name: "halfer2.summer.and", io: "B", input: 1 }]},
    ]
}