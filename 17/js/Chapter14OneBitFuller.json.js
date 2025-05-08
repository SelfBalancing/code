// Chapter14OneBitFuller (c) Charles Petzold, 2024
// ©️自权的SPACE 2025 汉化

let Chapter14OneBitFuller = 
{
    name: "Chapter14OneBitFuller",
    components:
    [
        { name: "halfer1", type: "External", file: "Chapter14OneBitHalfer", x:100 },
        { name: "halfer2", type: "External", file: "Chapter14OneBitHalfer", x:600 },

        { name: "nodeB1", type: "Node", relative: {x: { name:"halfer2.nodeB2"}, y: { name:"halfer1.summer.and", io: "out"}}},

        { name: "carryOr", type: "OrGate", relative: { x: { name:"halfer2.summer.and"}, y: { name: "halfer2.carryAnd", io: "B" }}},
        { name: "jtCarry1", type: "Joint", x:125, relative: {xy: { name:"halfer1.carryAnd", io: "out"}}},
        { name: "jtCarry2", type: "Joint", y:100, relative: {xy: { name:"jtCarry1"}}},
        { name: "jtCarry4", type: "Joint", x:-50, relative: {xy: { name:"carryOr", io: "B"}}},
        { name: "jtCarry3", type: "Joint", relative: {x: { name:"jtCarry4"}, y: { name:"jtCarry2"}}}
    ],
    wires:
    [
        { points:[ { name: "halfer1.summer.and", io: "out"}, { name: "nodeB1"}]},
        { points: [ { name:"nodeB1"}, { name:"halfer2.nodeB2"}]},
        { points: [ { name:"nodeB1"}, { name:"halfer2.jt0"}, { name: "halfer2.summer.or", io: "B", input: 1}]},

        { points: [ { name: "halfer2.carryAnd", io: "out"}, { name: "carryOr", io: "A", input: 0}]},
        { points: [ { name: "halfer1.carryAnd", io: "out"}, { name: "jtCarry1"}, { name: "jtCarry2"},{ name: "jtCarry3"},{ name: "jtCarry4"}, { name:"carryOr", io: "B", input: 1}]}
    ]
}