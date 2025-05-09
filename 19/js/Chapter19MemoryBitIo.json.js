// Chapter19MemoryBitIo.json.js (c) Charles Petzold, 2020

let Chapter19MemoryBitIo = 
{
    name: "Chapter19MemoryBitIo",
    components:
    [
        { name:"mem", type: "External", file: "Chapter19MemoryBit", scale: 0.25},

        { name:"diJoint2", type: "Joint", y:-150, relative: {xy: { name:"mem.diJoint1"}}},
        { name:"diJoint3", type: "Joint", x: 100, relative: {xy: { name:"diJoint2"}}},
        { name:"button", type: "DigitButton", y: -50, relative: {xy: { name:"diJoint3"}}},

       { name:"doJoint2", type: "Joint", y: 75, relative: {xy: { name:"mem.doJoint1"}}},
       { name:"doJoint3", type: "Joint", relative: {x: { name:"diJoint3"}, y: { name:"doJoint2"}}},
       { name:"light", type: "BitLight", y: 50, relative: {xy: { name:"doJoint3"}}},

       { name:"writeJoint", type: "Joint", y: -50, relative: {xy: { name:"mem.writeNode"}}}
    ],
    wires:
    [
        { points:[{ name:"button", io: "bottom"}, { name:"diJoint3"}, { name:"diJoint2"}, { name:"mem.diJoint1"}, { name:"mem.invNode"}]},
        { points:[{ name:"mem.node1"}, { name:"mem.doJoint1"}, { name:"doJoint2"}, { name:"doJoint3"}, { name:"light", io: "top"}]}
    ]
}