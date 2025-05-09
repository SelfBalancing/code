// Chapter22IncrementerDecrementerBitF (c) Charles Petzold, 2024

let Chapter22IncrementerDecrementerBitF = 
{
    name: "Chapter22IncrementerDecrementerBitF",
    
    "components":
    [
        { name:"and", type: "Joint", scale: 0.15, "rotate": 90, y: 100, x: -16},
        { name:"xor1", type: "XorGate", scale: 0.15, "rotate": 90, x: 20, relative: {xy: { name:"and"}} },
        { name:"cascadeJoint", type: "Joint", y: -20, relative: {"xy": { name:"xor1", io: "A"}}},
    ],
  
    "wires": 
    [
    ]
};