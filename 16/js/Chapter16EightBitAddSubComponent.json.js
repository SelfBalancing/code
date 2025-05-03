// Chapter16EightBitAddSubComponent (c) Charles Petzold, 2024

let Chapter16EightBitAddSubComponent = 
{
    name: "Chapter16EightBitAddSubComponent",
    components:
    [
        { name: "fuller", type: "External", file: "Chapter14OneBitFuller", scale: 0.20, rotate: 90, x:0, y: 0},

        { name: "xor", type: "XorGate", scale: 0.25, rotate: "90", y: -50, relative: {xy: { name:"fuller.halfer1.nodeB2"}}},
        { name: "xorNode", type: "Node", y: -25, relative: {xy: { name:"xor", io: "A"}}},

        { name: "buttonA", type: "DigitButton", y: -200, relative: { xy: { name: "xor", io: "B"}}},
        { name: "jtA1", type: "Joint", y: 20, relative: { xy: { name:"buttonA", io: "bottom"}}},
        { name: "jtA2", type: "Joint", relative: { x: { name: "fuller.halfer1.nodeA1" }, y: { name: "jtA1"}}},

        { name: "buttonB", type: "DigitButton", y: 100, relative: { xy: { name: "buttonA"}}},

        { name: "light", type: "BitLight", y: 100, relative: { xy: { name: "fuller.halfer2.summer.and"}}},

        { name: "jtCarry1", type: "Joint", y: 20, relative: {xy: { name: "fuller.carryOr", io: "out"}}},
        { name: "jtCarry2", type: "Joint", x:-20, relative: {xy: { name: "jtCarry1"}}},
        { name: "jtCarry3", type: "Joint", x:20, relative: { xy: { name:"fuller.halfer2.nodeA1"}}}

    ],
    wires:
    [
        { points: [ { name:"buttonA", io: "bottom"}, { name:"jtA1"}, { name: "jtA2"}, { name:"fuller.halfer1.nodeA1"}]},
        { points:[{ name:"xorNode"}, { name:"xor", io: "A", input: 0}]},
        { points: [ { name:"buttonB", io: "bottom"}, { name:"xor", io: "B", input: 1}]},
        { points:[{ name:"xor", io: "out"}, { name:"fuller.halfer1.nodeB2"}]},

        { points: [ { name:"fuller.halfer1.nodeB2"}, { name: "fuller.halfer1.jt0"}, { name: "fuller.halfer1.summer.or", io: "B", input: 1}]},
        
        { points: [ { name:"fuller.halfer2.summer.and", io: "out"}, { name:"light", io: "top"}]}
    ]
}
