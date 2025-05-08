// Chapter17FlipFlopCoreEdge (c) Charles Petzold, 2024

let Chapter17FlipFlopCoreEdge = 
{
    name: "Chapter17FlipFlopCoreEdge",
    components:
        [
            { name: "coreD1", type: "External", file: "Chapter17FlipFlopCoreD"  },
            { name: "coreD2", type: "External", file: "Chapter17FlipFlopCoreD", x:675 },

            { name: "dNode", type: "Node", x: -250, relative: { xy: { name: "coreD1.and2", io: "B"}}},
            { name: "dInv", type: "Inverter", x: 50, scale:0.75, relative: { xy: { name:"dNode"}}},
            { name: "dJoint", type: "Joint", relative: { x: { name:"dNode"}, y: { name: "coreD1.and1", io: "A"}}},

            { name: "clkInv", type: "Inverter", scale: 0.75, relative: { x: { name: "dInv"}, y: { name: "coreD1.node" }}},
            { name: "clkNode", type: "Node", x:-100, y: -100, relative: { x: { name:"clkInv"}, y: { name:"coreD1.and1"}}},
            { name: "clkJoint1", type: "Joint", relative: {x: { name: "clkNode"}, y: { name:"clkInv"}}},

            { name: "clkJoint2", type: "Joint", x: -50, relative: {x: { name: "coreD2.node"}, y: { name: "clkNode" }}},
            { name: "clkJoint3", type: "Joint", relative: {x: { name: "clkJoint2"}, y: { name: "coreD2.node" }}},

            { name: "conn1Joint", type: "Joint", relative: { x: { name: "coreD1.coreRS.node1"}, y: { name:"coreD2.and1", io: "A"}}},
            { name: "conn2Joint", type: "Joint", relative: { x: { name: "coreD1.coreRS.node2"}, y: { name:"coreD2.and2", io: "B"}}}
        ],       
    wires:
        [
            { name:"wireToDInv", points: [ { name:"dNode"}, { name:"dInv"}]},
            { name: "wireDInv", points: [ { name: "dNode"},  { name:"dJoint"}, { name:"coreD1.and1", io: "A", input: 0}]},
            { name: "wireToAnd2B", points: [ { name:"dInv", io: "out"}, { name: "coreD1.and2", io: "B", input: 1}]},

            { name: "wireFromClkNode1", points: [ { name: "clkNode"}, { name: "clkJoint1"}, { name:"clkInv"}]},
            { name: "wireFromClkInv", points: [ { name: "clkInv", io: "out"}, { name:"coreD1.node"}]},
            { name: "wireFromClkNode2", points:[ { name:"clkNode"}, { name:"clkJoint2"}, { name: "clkJoint3"}, { name:"coreD2.node" }]},

            { name: "wireLink1", points: [ { name:"coreD1.coreRS.node1"}, { name:"conn1Joint"}, { name: "coreD2.and1", io: "A", input: 0}]},
            { name: "wireLink2", points: [ { name:"coreD1.coreRS.node2"}, { name:"conn2Joint"}, { name: "coreD2.and2", io: "B", input: 1}]}
        ]
}