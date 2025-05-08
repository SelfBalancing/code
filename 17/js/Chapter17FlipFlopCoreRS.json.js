// Chapter17FlipFlopCore (c) Charles Petzold, 2024

let Chapter17FlipFlopCoreRS = 
{
    name: "Chapter17FlipFlopCoreRS",
    components:
        [
            { name:"nor1", type:"NorGate"}, 

            { name:"nor2", type:"NorGate", y:200, relative: { xy: { name:"nor1" } }},
            { name:"node1", type:"Node", x:50, relative: { xy: { name:"nor1", io:"out" }}},
            { name:"node2", type:"Node", relative: { x: { name:"node1"}, y: { name:"nor2" }}},

            { comment:  "Joints at right of gates" },
            { name:"jtr", type:"Joint", y:75, relative: { xy: { name:"node1" }}},
            { name:"jbr", type:"Joint", y:-75, relative: {xy: { name:"node2"}}},

            { comment:  "Joints even with inputs to NORs" },
            { name:"jtl", type:"Joint", x:-75, relative: { xy: { name:"nor1", io:"B" }}},
            { name:"jbl", type:"Joint", relative: { x: { name:"jtl"}, y: { name:"nor2", io:"A" }}},

            { comment:  "Joints in middle at left" },
            { name:"jlm1", type:"Joint", relative: { x: { name:"jtl"}, y: { name:"jtr"}}}, 
            { name:"jlm2", type:"Joint", relative: { x: { name:"jbl"}, y: { name:"jbr"}}} 
        ],       

    wires:
        [
            { name: "wireNor2Out", points:[ { name:"nor2", io:"out" }, { name:"node2" }] },
            { name: "wireNor1Inp", points:[ { name:"node2" }, { name: "jbr" }, { name:"jlm1" }, { name:"jtl" }, { name:"nor1", io:"B", input:1 }]},

            { name: "wireNor1Out", points:[ { name:"nor1", io:"out" }, { name:"node1" }] },
            { name: "wireNor2Inp", points:[ { name:"node1" }, { name: "jtr" }, { name:"jlm2" }, { name:"jbl" }, { name:"nor2", io:"A", input:0 }]}
       ]
}