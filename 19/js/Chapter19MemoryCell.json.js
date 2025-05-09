// Chapter19MemoryCell (c) Charles Petzold, 2024

let Chapter19MemoryCell = 
{
    name: "Chapter19MemoryCell",
    transform: { x: 0, y: 0, scale: 1, rotate: 0 },
    components:
        [
            { name:"nor1", type:"NorGate"}, 

            { name:"nor2", type:"NorGate", y:200, relative: { xy: { name:"nor1" } }},
            { name:"node1", type:"Node", x:50, relative: { xy: { name:"nor1", io:"out" }}},
            { name:"joint2", type:"Joint", relative: { x: { name:"node1"}, y: { name:"nor2" }}},

            { comment:  "Joints at right of gates" },
            { name:"jtr", type:"Joint", y:75, relative: { xy: { name:"node1" }}},
            { name:"jbr", type:"Joint", y:-75, relative: {xy: { name:"joint2"}}},

            { comment:  "Joints even with inputs to NORs" },
            { name:"jtl", type:"Joint", x:-50, relative: { xy: { name:"nor1", io:"B" }}},
            { name:"jbl", type:"Joint", relative: { x: { name:"jtl"}, y: { name:"nor2", io:"A" }}},

            { comment:  "Joints in middle at left" },
            { name:"jlm1", type:"Joint", relative: { x: { name:"jtl"}, y: { name:"jtr"}}}, 
            { name:"jlm2", type:"Joint", relative: { x: { name:"jbl"}, y: { name:"jbr"}}},

            { name: "and1", type: "AndGate", x: -200, relative: { xy: { name: "nor1", io: "A" }}},
            { name: "and2", type: "AndGate", relative: { x: { name:"and1" }, y: { name: "nor2", io: "B" }}},
    
            { name: "writeNode", type: "Node", x:-75, relative: { xy: { name: "and1", io: "B" }} },
            { name: "jt2", type: "Joint", relative: { x: { name:"writeNode"}, y: { name:"and2", io: "A"}}},

            { name: "invNode", type: "Node", x: -150, relative: { xy: { name: "and2", io: "B"}}},
            { name: "inv", type: "Inverter", y: -85, scale:1, rotate: -90, relative: { xy: { name:"invNode"}}},
            { name: "invJoint", type: "Joint", relative: { x: { name:"inv"}, y: { name: "and1", io: "A"}}},

            { name:"writeJoint", type: "Joint", y: -150, relative: {xy: { name:"writeNode"}}},

            { name:"trans", type: "Transistor", scale: 3, x: 375, y: 150},
            { name:"cJoint", type: "Joint", relative: {x: { name:"trans", io: "C"}, y: { name:"node1"}}},
            { name:"bJoint2", type: "Joint", x: -50, relative: {xy: { name:"trans", io: "B"}}},
            { name:"bJoint1", type: "Joint", y: 200, relative: {xy: { name:"bJoint2"}}},

            { name:"buttonNode", type: "Node", x:-75, relative: {xy: { name:"invNode"}}},
            { name:"emitterNode", type: "OrNode", x:85, relative: {x: { name:"trans", io: "E"}, y: { name:"buttonNode"}}}
        ],       
    wires:
        [
            { name: "wireNor2Out", points:[ { name:"nor2", io:"out" }, { name:"joint2" }, { name: "jbr" }, { name:"jlm1" }, { name:"jtl" }, { name:"nor1", io:"B", input:1 }]},

            { name: "wireNor1Out", points:[ { name:"nor1", io:"out" }, { name:"node1" }] },
            { name: "wireNor2Inp", points:[ { name:"node1" }, { name: "jtr" }, { name:"jlm2" }, { name:"jbl" }, { name:"nor2", io:"A", input:0 }]},

            { name: "wireAnd1", points: [ { name:"writeNode"}, { name: "and1", io: "B", input: 1 }]},
            { name: "wireAnd2", points: [ { name:"writeNode"}, { name:"jt2"}, { name: "and2", io: "A", input: 0 }]},
            { name: "wireFromAnd1", points: [ { name:"and1", io: "out"}, { name:"nor1", io: "A", input: 0 }]},
            { name: "wireFromAnd2", points: [ { name:"and2", io: "out"}, { name:"nor2", io: "B", input: 1 }]},

            { points:[{ name:"invNode"}, { name:"inv", io: "inp"}]},
            { points:[{ name:"invNode"}, { name:"and2", io: "B", input: 1}]},
            { points:[{ name:"inv", io: "out"}, { name:"invJoint"}, { name:"and1", io: "A", input: 0}]},

            { points:[{ name:"node1"}, { name:"cJoint"}, { name:"trans", io: "C", input: "C"}]},

            { points:[{ name:"buttonNode"}, { name:"invNode"}]},
            { points:[{ name:"trans", io: "E", output: "E"}, { name:"emitterNode", input: 0}]}
       ]
}