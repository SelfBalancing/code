// Chapter19EightBitMemory (c) Charles Petzold, 2024

let Chapter19EightBitMemory = 
{
    name: "Chapter19EightBitMemory",
    transform: { x: 275, y: 225, scale: 1, rotate: 0 },
    wireCurveRadius: 5,
    nodeRadius: 3,
    propagationDelay: 0,
    components:
        [
            { name:"bit7", type: "External", file: "Chapter19MemoryBitIo", x: 0},
            { name:"bit6", type: "External", file: "Chapter19MemoryBitIo", x: 200},
            { name:"bit5", type: "External", file: "Chapter19MemoryBitIo", x: 400},
            { name:"bit4", type: "External", file: "Chapter19MemoryBitIo", x: 600},
            { name:"bit3", type: "External", file: "Chapter19MemoryBitIo", x: 800},
            { name:"bit2", type: "External", file: "Chapter19MemoryBitIo", x: 1000},
            { name:"bit1", type: "External", file: "Chapter19MemoryBitIo", x: 1200},
            { name:"bit0", type: "External", file: "Chapter19MemoryBitIo", x: 1400},

            { name:"7", type: "Label", text: "Bit 7", y: -20, relative: {xy: { name:"bit7.button", io: "top"}}},
            { name:"6", type: "Label", text: "Bit 6", y: -20, relative: {xy: { name:"bit6.button", io: "top"}}},
            { name:"5", type: "Label", text: "Bit 5", y: -20, relative: {xy: { name:"bit5.button", io: "top"}}},
            { name:"4", type: "Label", text: "Bit 4", y: -20, relative: {xy: { name:"bit4.button", io: "top"}}},
            { name:"3", type: "Label", text: "Bit 3", y: -20, relative: {xy: { name:"bit3.button", io: "top"}}},
            { name:"2", type: "Label", text: "Bit 2", y: -20, relative: {xy: { name:"bit2.button", io: "top"}}},
            { name:"1", type: "Label", text: "Bit 1", y: -20, relative: {xy: { name:"bit1.button", io: "top"}}},
            { name:"0", type: "Label", text: "Bit 0", y: -20, relative: {xy: { name:"bit0.button", io: "top"}}},

            { name:"writeButton", type: "MomentaryButton", x: -150, relative: {xy: { name:"bit7.writeJoint"}}},
            { name:"write", type: "Label", text: "Write", y: 50, relative: {xy: { name:"writeButton"}}},

            { name:"write7Node", type: "Node", relative: {xy: { name:"bit7.writeJoint"}}},
            { name:"write6Node", type: "Node", relative: {xy: { name:"bit6.writeJoint"}}},
            { name:"write5Node", type: "Node", relative: {xy: { name:"bit5.writeJoint"}}},
            { name:"write4Node", type: "Node", relative: {xy: { name:"bit4.writeJoint"}}},
            { name:"write3Node", type: "Node", relative: {xy: { name:"bit3.writeJoint"}}},
            { name:"write2Node", type: "Node", relative: {xy: { name:"bit2.writeJoint"}}},
            { name:"write1Node", type: "Node", relative: {xy: { name:"bit1.writeJoint"}}}

        ],
        wires:
        [
            { points:[{ name:"writeButton", io: "right"}, { name:"write7Node"}]},
            { points:[{ name:"write7Node"}, { name:"bit7.mem.writeNode"}]},
            { points:[{ name:"write7Node"}, { name:"write6Node"}]},
            { points:[{ name:"write6Node"}, { name:"bit6.mem.writeNode"}]},
            { points:[{ name:"write6Node"}, { name:"write5Node"}]},
            { points:[{ name:"write5Node"}, { name:"bit5.mem.writeNode"}]},
            { points:[{ name:"write5Node"}, { name:"write4Node"}]},
            { points:[{ name:"write4Node"}, { name:"bit4.mem.writeNode"}]},
            { points:[{ name:"write4Node"}, { name:"write3Node"}]},
            { points:[{ name:"write3Node"}, { name:"bit3.mem.writeNode"}]},
            { points:[{ name:"write3Node"}, { name:"write2Node"}]},
            { points:[{ name:"write2Node"}, { name:"bit2.mem.writeNode"}]},
            { points:[{ name:"write2Node"}, { name:"write1Node"}]},
            { points:[{ name:"write1Node"}, { name:"bit1.mem.writeNode"}]},
            { points:[{ name:"write1Node"}, { name:"bit0.writeJoint"}, { name:"bit0.mem.writeNode"}]}
        ]
    }