// Chapter18Oscillator (c) Charles Petzold, 2024

let Chapter18Oscillator = 
{
    name: "Chapter18Oscillator",
    components:
        [
            { name: "oscInv", type: "Inverter", propagationDelay: 500, scale: 0.25 },
            { name: "oscNode", type: "Node", x: 25, relative: {xy: { name:"oscInv", io: "out"}}},
            { name: "oscLoop1", type: "Joint", y: 25, relative: { xy: { name:"oscNode"}}},
            { name: "oscLoop3", type: "Joint", x: -25, relative: {xy: { name: "oscInv"}}},
            { name: "oscLoop2", type: "Joint", relative: {x: { name:"oscLoop3"}, y: { name: "oscLoop1"}}}
        ],       

    wires:
        [
            { points: [{ name:"oscInv", io: "out"}, { name:"oscNode"}]},
            { points: [{ name:"oscNode"}, { name: "oscLoop1"}, { name:"oscLoop2"}, { name: "oscLoop3"}, { name:"oscInv"}]}
        ]
}