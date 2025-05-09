// Chapter22IncrementerDecrementerBitE (c) Charles Petzold, 2024

let Chapter22IncrementerDecrementerBitE = 
{
    name: "Chapter22IncrementerDecrementerBitE",
    
    "components":
    [
        { name:"and", type: "AndGate", scale: 0.15, "rotate": 90, y: 100, x: -16},
        { name:"xor1", type: "XorGate", scale: 0.15, "rotate": 90, x: 20, relative: {xy: { name:"and"}} },
        { name:"xor2", type: "XorGate", scale: 0.15, "rotate": 90, y: -50, relative: {"xy": { name:"and", io: "B"}}},
    
        { name:"cascadeNode", type: "Node", y: -20, relative: {"xy": { name:"xor1", io: "A"}}},
        { name:"cascadeJoint", type: "Joint", relative: {x: { name:"and", io: "A"}, y: { name:"cascadeNode"}}},
    
        { name:"incdecJoint", type: "Joint", y: -20, relative: {"xy": { name:"xor2", io: "A"}}},
    
        { name:"inputNode", type: "Node", y: -80, relative: {"xy": { name:"xor1", io: "B"}}},
        { name:"inputJoint", type: "Joint", relative: {y: { name:"inputNode"}, x: { name:"xor2", io: "B"}}},
    
        { name:"loop1", type: "Joint", y: 10, relative: {"xy": { name:"and", io: "out"}}},
        { name:"loop2", type: "Joint", x: -15, relative: {"xy": { name:"loop1"}}},
        { name:"loop3", type: "Joint", relative: {x: { name:"loop2"}, y: { name:"cascadeNode"}}},
    ],
  
    "wires": 
    [
        { points:[{ name:"inputNode"}, { name:"xor1", io: "B", input: 1}]},
        { points:[{ name:"inputNode"}, { name:"inputJoint"}, { name:"xor2", io: "B", input: 1}]},
        { points:[{ name:"cascadeNode"}, { name:"xor1", io: "A", input: 0}]},
        { points:[{ name:"cascadeNode"}, { name:"cascadeJoint"}, { name:"and", io: "A", input: 0}]},
        { points:[{ name:"xor2", io: "out"}, { name:"and", io: "B", input: 1}]},
    ]
};