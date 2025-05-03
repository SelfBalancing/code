// Chatper15OneBitSummer (c) Charles Petzold, 2024

let Chapter15OneBitSummer = 
{
    name: "Chapter15OneBitSummer",

    components: [
        { name: "or", type: "OrGate", x: 250, y: 250 },
        { name: "nand", type: "NandGate", x: 240, y: 100 },        
        { name: "and", type: "AndGate", x: 480, y: 175 },

        { name: "jtOr2", type: "Joint", x: -50, relative: { xy: { name:"and", io: "B" }}},
        { name: "jtOr1", type: "Joint", relative: { x: { name:"jtOr2"}, y: { name:"or", io: "out"}}},

        { name: "jtNand2", type: "Joint", x: -50, relative: { xy: { name:"and", io: "A" }}},
        { name: "jtNand1", type: "Joint", relative: { x: { name:"jtNand2"}, y: { name:"nand", io: "out"}}},
    ],

    wires: [
        { points: [ { name: "or", io: "out"}, { name:"jtOr1"}, { name: "jtOr2"}, { name: "and", io: "B", input: 1 }]},
        { points: [ { name: "nand", io: "out"}, { name:"jtNand1"}, { name: "jtNand2"}, { name: "and", io: "A", input: 0 }]}
    ]
};