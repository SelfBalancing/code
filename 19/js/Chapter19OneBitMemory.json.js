// Chapter19OneBitMemory (c) Charles Petzold, 2024

let Chapter19OneBitMemory = 
{
    name: "Chapter19OneBitMemory",
    transform: { x: 510, y: 100, scale: 1, rotate: 0 },
    propagationDelay: 10,
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
            { name:"jtl", type:"Joint", x:-75, relative: { xy: { name:"nor1", io:"B" }}},
            { name:"jbl", type:"Joint", relative: { x: { name:"jtl"}, y: { name:"nor2", io:"A" }}},

            { comment:  "Joints in middle at left" },
            { name:"jlm1", type:"Joint", relative: { x: { name:"jtl"}, y: { name:"jtr"}}}, 
            { name:"jlm2", type:"Joint", relative: { x: { name:"jbl"}, y: { name:"jbr"}}},

            { name: "and1", type: "AndGate", x: -250, relative: { xy: { name: "nor1", io: "A" }}},
            { name: "and2", type: "AndGate", relative: { x: { name:"and1" }, y: { name: "nor2", io: "B" }}},

            { name: "writeNode", type: "Node", x:-75, y: 125, relative: { xy: { name: "and1" }} },
            { name: "writeJoint1", type: "Joint", relative: { x: { name:"writeNode"}, y: { name:"and1", io: "B"}}},
            { name: "writeJoint2", type: "Joint", relative: { x: { name:"writeNode"}, y: { name:"and2", io: "A"}}},

            { name: "invNode", type: "Node", x: -120, relative: { xy: { name: "and2", io: "B"}}},
            { name: "inv", type: "Inverter", y: -50, scale:0.5, rotate: -90, relative: { xy: { name:"invNode"}}},
            { name: "joint", type: "Joint", relative: { x: { name:"inv"}, y: { name: "and1", io: "A"}}},

            { name:"buttonData", type:"DigitButton", x:-200, relative: { xy: { name:"and2", io:"B" }}},
            { name:"buttonWrite", type:"MomentaryButton", relative: { x: { name:"buttonData"}, y: { name:"writeNode" }}},

            { name:"data", type:"Label", text:"Data In", y:50, relative: { xy: { name:"buttonData" }}},
            { name:"write", type:"Label", text: "Write", y:50, relative: { xy: { name: "buttonWrite" }}},

            { name:"light", type:"BitLight", x:100, relative: { xy: { name:"node1" }}},

            { name:"out", type:"Label", text: "Data Out", y:50, relative: { xy: { name:"light" }}}
        ],       

    wires:
        [
            { name: "wireNor2Out", points:[ { name:"nor2", io:"out" }, { name:"joint2" }, { name: "jbr" }, { name:"jlm1" }, { name:"jtl" }, { name:"nor1", io:"B", input:1 }]},

            { name: "wireNor1Out", points:[ { name:"nor1", io:"out" }, { name:"node1" }] },
            { name: "wireNor2Inp", points:[ { name:"node1" }, { name: "jtr" }, { name:"jlm2" }, { name:"jbl" }, { name:"nor2", io:"A", input:0 }]},

            { name: "wireAnd1", points: [ { name:"writeNode"}, { name:"writeJoint1"}, { name: "and1", io: "B", input: 1 }]},
            { name: "wireAnd2", points: [ { name:"writeNode"}, { name:"writeJoint2"}, { name: "and2", io: "A", input: 0 }]},
            { name: "wireFromAnd1", points: [ { name:"and1", io: "out"}, { name:"nor1", io: "A", input: 0 }]},
            { name: "wireFromAnd2", points: [ { name:"and2", io: "out"}, { name:"nor2", io: "B", input: 1 }]},

            { points: [ { name:"buttonWrite", io:"right" }, { name:"writeNode" }]},
            { points: [ { name:"buttonData", io: "right"}, { name: "invNode"}]},
            { name:"wireToInv", points: [ { name:"invNode"}, { name:"inv"}]},
            { name: "wireInv", points: [ { name:"inv", io: "out"}, { name:"joint"}, { name:"and1", io: "A", input: 0}]},
            { name: "wireToAnd2B", points: [ { name: "invNode"}, { name: "and2", io: "B", input: 1}]},

            { points:[ { name:"node1" }, { name:"light", io:"inp" } ] }
       ]
}