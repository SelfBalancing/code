// Chapter15FourBitComponentUI (c) Charles Petzold, 2024

let Chapter15FourBitComponentUI = 
{
    name: "Chapter15FourBitComponentUI",
    components:
    [
        { name: "component", type: "External", file: "Chapter15FourBitComponent", scale: 0.20, rotate: 90 },

        { name: "buttonA", type: "DigitButton", y: -135, relative: { xy: { name: "component.node1B2"}}},
        { name: "buttonB", type: "DigitButton", y: 85, relative: { xy: { name: "buttonA"}}},

        { name: "jtA1", type: "Joint", y: 15, relative: { xy: { name:"buttonA", io: "bottom"}}},
        { name: "jtA2", type: "Joint", relative: { x: { name: "component.node1A1" }, y: { name: "jtA1"}}},

        { name:"light1", type: "BitLight", y: 100, relative: { xy: { name: "component.and2"}}},
        { name:"light2", type: "BitLight", y: -75, relative: { xy: { name: "component.and3"}}},
    ],
    wires: 
    [
        { points:[{ name:"buttonA", io: "bottom"}, { name:"jtA1"}, { name:"jtA2"}, { name:"component.node1A1"}]},
        { points:[{ name:"buttonB", io: "bottom"}, { name:"component.node1B2"}]},

        { points:[{ name:"component.and2", io: "out"}, { name:"light1", io: "top"}]},
        { points:[{ name:"component.and3", io: "out"}, { name:"light2", io: "bottom"}]},
    ]
}
