// Chapter15OneBitFullerMod (c) Charles Petzold, 2024

let Chapter15OneBitFullerMod = 
{
    name: "Chapter15OneBitFullerMod",
    components:
    [
        { name: "halfer1", type: "External", file: "Chapter15OneBitHalferMod1", x:100 },
        { name: "halfer2", type: "External", file: "Chapter15OneBitHalferMod2", x:600 },

        { name: "nodeB1", type: "Node", relative: {x: { name:"halfer2.jointB2"}, y: { name:"halfer1.summer.and", io: "out"}}},

        { name: "carryOr", type: "OrGate", relative: { x: { name:"halfer2.summer.and"}, y: { name: "halfer2.carryAnd", io: "B" }}},
        { name: "jtCarry4", type: "Joint", x:-50, relative: {xy: { name:"carryOr", io: "B"}}},
        { name: "jtCarry3", type: "Joint", relative: {x: { name:"jtCarry4"}, y: { name:"halfer1.carryAnd"}}},

        { name: "jtOr2", type: "Joint", x: -50, relative: { xy: { name:"halfer2.summer.and", io: "B" }}},
        { name: "jtOr1", type: "Joint", relative: { x: { name:"jtOr2"}, y: { name:"halfer2.summer.or", io: "out"}}},

        { name:"newJoint", type: "Joint", relative: {x: { name:"halfer1.summer.nodeOr1"}, y: { name:"halfer2.carryAnd", io: "B"}}},

    ],
    wires:
    [
        { points:[ { name: "halfer1.summer.and", io: "out"}, { name: "nodeB1"}]},
        { points: [ { name:"nodeB1"}, { name:"halfer2.jointB2"}, { name:"halfer2.summer.or", io: "B", input: 1}]},
        { points: [ { name:"nodeB1"}, { name:"halfer2.jt0"}, { name: "halfer2.summer.nand", io: "B", input: 1}]},

        { points: [ { name: "halfer2.carryAnd", io: "out"}, { name: "carryOr", io: "A", input: 0}]},
        { name: "carryWire", points: [ { name: "halfer1.carryAnd", io: "out"}, { name: "jtCarry3"},{ name: "jtCarry4"}, { name:"carryOr", io: "B", input: 1}]},

        { points: [ { name: "halfer2.summer.or", io: "out"}, { name:"jtOr1"}, { name: "jtOr2"}, { name: "halfer2.summer.and", io: "B", input: 1 }]},

        { points:[{ name:"halfer1.summer.nodeOr1"}, { name:"newJoint"}, { name:"halfer2.carryAnd", io: "B", input: 1}]}
    ]
}