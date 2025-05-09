// Chapter19OneByteMemory (c) Charles Petzold, 2024

let Chapter19OneByteMemory = 
{
    name: "Chapter19OneByteMemory",
    components:
        [
            { name:"bit7", type: "External", file: "Chapter19MemoryCell", scale: 0.2, x: 0},
            { name:"bit6", type: "External", file: "Chapter19MemoryCell", scale: 0.2, x: 200},
            { name:"bit5", type: "External", file: "Chapter19MemoryCell", scale: 0.2, x: 400},
            { name:"bit4", type: "External", file: "Chapter19MemoryCell", scale: 0.2, x: 600},
            { name:"bit3", type: "External", file: "Chapter19MemoryCell", scale: 0.2, x: 800},
            { name:"bit2", type: "External", file: "Chapter19MemoryCell", scale: 0.2, x: 1000},
            { name:"bit1", type: "External", file: "Chapter19MemoryCell", scale: 0.2, x: 1200},
            { name:"bit0", type: "External", file: "Chapter19MemoryCell", scale: 0.2, x: 1400},

            { name:"bit7WriteNode", type: "Node", relative: {xy: { name:"bit7.writeJoint"}}},
            { name:"bit6WriteNode", type: "Node", relative: {xy: { name:"bit6.writeJoint"}}},
            { name:"bit5WriteNode", type: "Node", relative: {xy: { name:"bit5.writeJoint"}}},
            { name:"bit4WriteNode", type: "Node", relative: {xy: { name:"bit4.writeJoint"}}},
            { name:"bit3WriteNode", type: "Node", relative: {xy: { name:"bit3.writeJoint"}}},
            { name:"bit2WriteNode", type: "Node", relative: {xy: { name:"bit2.writeJoint"}}},
            { name:"bit1WriteNode", type: "Node", relative: {xy: { name:"bit1.writeJoint"}}},

            { name:"bit7BNode", type: "Node", relative: {xy: { name:"bit7.bJoint1"}}},
            { name:"bit6BNode", type: "Node", relative: {xy: { name:"bit6.bJoint1"}}},
            { name:"bit5BNode", type: "Node", relative: {xy: { name:"bit5.bJoint1"}}},
            { name:"bit4BNode", type: "Node", relative: {xy: { name:"bit4.bJoint1"}}},
            { name:"bit3BNode", type: "Node", relative: {xy: { name:"bit3.bJoint1"}}},
            { name:"bit2BNode", type: "Node", relative: {xy: { name:"bit2.bJoint1"}}},
            { name:"bit1BNode", type: "Node", relative: {xy: { name:"bit1.bJoint1"}}},

            { name:"decoderAnd", type: "AndGate", scale: 0.2, x: -75, relative: {xy: { name:"bit7.writeJoint"}}},
            { name:"decoderBNode", type: "Node", x: -25, relative: {xy: { name:"decoderAnd", io: "B"}}},
            { name:"decoderBJoint", type: "Joint", relative: {x: { name:"decoderBNode"}, y: { name:"bit7BNode"}}},
            { name:"writeANode", type: "Node", x:-25, relative: {x: { name:"decoderBNode"}, y: { name:"decoderAnd", io: "A"}}}
        ],
    wires: [

        { points:[{ name:"decoderAnd", io: "out"}, { name:"bit7WriteNode" }]},
        { points:[{ name:"decoderBNode"}, { name:"decoderAnd", io: "B", input: 1}]},
        { points:[{ name:"writeANode"}, { name:"decoderAnd", io: "A", input: 0}]},

        { points:[{ name:"bit7WriteNode"}, { name:"bit7.writeNode"}]},
        { points:[{ name:"bit7WriteNode"}, { name:"bit6WriteNode"}]},
        { points:[{ name:"bit6WriteNode"}, { name:"bit6.writeNode"}]},
        { points:[{ name:"bit6WriteNode"}, { name:"bit5WriteNode"}]},
        { points:[{ name:"bit5WriteNode"}, { name:"bit5.writeNode"}]},
        { points:[{ name:"bit5WriteNode"}, { name:"bit4WriteNode"}]},
        { points:[{ name:"bit4WriteNode"}, { name:"bit4.writeNode"}]},
        { points:[{ name:"bit4WriteNode"}, { name:"bit3WriteNode"}]},
        { points:[{ name:"bit3WriteNode"}, { name:"bit3.writeNode"}]},
        { points:[{ name:"bit3WriteNode"}, { name:"bit2WriteNode"}]},
        { points:[{ name:"bit2WriteNode"}, { name:"bit2.writeNode"}]},
        { points:[{ name:"bit2WriteNode"}, { name:"bit1WriteNode"}]},
        { points:[{ name:"bit1WriteNode"}, { name:"bit1.writeNode"}]},
        { points:[{ name:"bit1WriteNode"}, { name:"bit0.writeJoint"}, { name:"bit0.writeNode"}]},

        { points:[{ name:"decoderBNode"}, { name:"decoderBJoint"}, { name:"bit7BNode"}]},
        { points:[{ name:"bit7BNode"}, { name:"bit7.bJoint2"}, { name:"bit7.trans", io: "B", input: "B"}]},
        { points:[{ name:"bit7BNode"}, { name:"bit6BNode"}]},
        { points:[{ name:"bit6BNode"}, { name:"bit6.bJoint2"}, { name:"bit6.trans", io: "B", input: "B"}]},
        { points:[{ name:"bit6BNode"}, { name:"bit5BNode"}]},
        { points:[{ name:"bit5BNode"}, { name:"bit5.bJoint2"}, { name:"bit5.trans", io: "B", input: "B"}]},
        { points:[{ name:"bit5BNode"}, { name:"bit4BNode"}]},
        { points:[{ name:"bit4BNode"}, { name:"bit4.bJoint2"}, { name:"bit4.trans", io: "B", input: "B"}]},
        { points:[{ name:"bit4BNode"}, { name:"bit3BNode"}]},
        { points:[{ name:"bit3BNode"}, { name:"bit3.bJoint2"}, { name:"bit3.trans", io: "B", input: "B"}]},
        { points:[{ name:"bit3BNode"}, { name:"bit2BNode"}]},
        { points:[{ name:"bit2BNode"}, { name:"bit2.bJoint2"}, { name:"bit2.trans", io: "B", input: "B"}]},
        { points:[{ name:"bit2BNode"}, { name:"bit1BNode"}]},
        { points:[{ name:"bit1BNode"}, { name:"bit1.bJoint2"}, { name:"bit1.trans", io: "B", input: "B"}]},
        { points:[{ name:"bit1BNode"}, { name:"bit0.bJoint1"}, { name:"bit0.bJoint2"}, { name:"bit0.trans", io: "B", input: "B"}]}
    ]
}
