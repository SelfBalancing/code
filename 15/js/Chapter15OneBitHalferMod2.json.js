// Chapter15OneBitHalferMod2 (c) Charles Petzold, 2024

let Chapter15OneBitHalferMod2 = 
{
    name: "Chapter15OneBitHalferMod2",
    components:
    [
        { name: "summer", type: "External", file: "Chapter15OneBitSummer" },

        { name: "carryAnd", type: "AndGate", x: 240, y: 400},

        { name: "nodeA1", type: "Node", x:200, relative: {y: { name:"summer.nand", io: "A"}}},
        { name: "nodeA2", type: "Node", x: 200, relative: {y: { name: "summer.or", io: "A"}}},
        { name: "jointB2", type: "Joint", x: 150, relative: {y: { name: "summer.or", io: "B"}}},

        { name: "jt1", type: "Joint", relative: { x: { name:"nodeA2"}, y: { name: "carryAnd", io: "A"}}},
        { name: "jt0", type: "Joint", relative: { x: { name:"jointB2"}, y: { name: "summer.nand", io: "B"}}}
    ],
    wires:
    [
        { points: [ { name: "nodeA1"}, { name: "summer.nand", io: "A", input: 0} ]},
        { points: [ { name: "nodeA1"}, { name: "nodeA2"} ]},
        { points: [ { name: "nodeA2"}, { name: "summer.or", io: "A", input: 0} ]},
        { points: [ { name: "nodeA2"}, { name: "jt1"}, { name: "carryAnd", io: "A", input: 0} ]},

    ]
}