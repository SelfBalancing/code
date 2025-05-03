// Chapter15OneBitHalfer (c) Charles Petzold, 2024

let Chapter15OneBitHalferMod1 = 
{
    name: "Chapter15OneBitHalferMod1",
    components:
    [
        { name: "summer", type: "External", file: "Chapter15OneBitSummerMod" },

        { name: "carryAnd", type: "AndGate", x: 240, y: 480},

        { name: "nodeA1", type: "Node", x:200, relative: {y: { name:"summer.nand", io: "A"}}},
        { name: "nodeA2", type: "Node", x: 200, relative: {y: { name: "summer.or", io: "A"}}},
        { name: "nodeB2", type: "Node", x: 150, relative: {y: { name: "summer.or", io: "B"}}},

        { name: "jt1", type: "Joint", relative: { x: { name:"nodeA2"}, y: { name: "carryAnd", io: "A"}}},
        { name: "jt2", type: "Joint", relative: { x: { name:"nodeB2"}, y: { name: "carryAnd", io: "B"}}},
        { name: "jt0", type: "Joint", relative: { x: { name:"nodeB2"}, y: { name: "summer.nand", io: "B"}}}
    ],
    wires:
    [
        { points: [ { name: "nodeA1"}, { name: "summer.nand", io: "A", input: 0} ]},
        { points: [ { name: "nodeA1"}, { name: "nodeA2"} ]},
        { points: [ { name: "nodeA2"}, { name: "summer.or", io: "A", input: 0} ]},
        { points: [ { name: "nodeA2"}, { name: "jt1"}, { name: "carryAnd", io: "A", input: 0} ]},

        { points: [ { name: "nodeB2"}, { name: "summer.or", io: "B", input: 1} ]},
        { points: [ { name: "nodeB2"}, { name: "jt2"}, { name: "carryAnd", io: "B", input: 1} ]}
    ]
}