// Chapter18BcdDecoder (c) Charles Petzold, 2024

let Chapter18BcdDecoder = 
{
    name: "Chapter18BcdDecoder",
    transform: { x: 0, y: 0, scale: 1, rotate: 0 },
    components: [
        { name: "and0", type: "AndGate", scale: 0.33, rotate: -90, inputs: 4, x: -180 },
        { name: "and1", type: "AndGate", scale: 0.33, rotate: -90, inputs: 4, x: -140 },
        { name: "and2", type: "AndGate", scale: 0.33, rotate: -90, inputs: 4, x: -100 },
        { name: "and3", type: "AndGate", scale: 0.33, rotate: -90, inputs: 4, x: -60 },
        { name: "and4", type: "AndGate", scale: 0.33, rotate: -90, inputs: 4, x: -20 },
        { name: "and5", type: "AndGate", scale: 0.33, rotate: -90, inputs: 4, x: 20 },
        { name: "and6", type: "AndGate", scale: 0.33, rotate: -90, inputs: 4, x: 60 },
        { name: "and7", type: "AndGate", scale: 0.33, rotate: -90, inputs: 4, x: 100 },
        { name: "and8", type: "AndGate", scale: 0.33, rotate: -90, inputs: 4, x: 140 },
        { name: "and9", type: "AndGate", scale: 0.33, rotate: -90, inputs: 4, x: 180 },

        { name: "and0InvJoint0", type: "Joint", y: 25, relative: {xy: { name:"and0", io: "4/4"}}},
        { name: "and2InvNode0", type: "Node", relative: {y: { name:"and0InvJoint0"}, x: { name:"and2", io: "4/4"}}},
        { name: "and4InvNode0", type: "Node", relative: {y: { name:"and0InvJoint0"}, x: { name:"and4", io: "4/4"}}},
        { name: "and6InvNode0", type: "Node", relative: {y: { name:"and0InvJoint0"}, x: { name:"and6", io: "4/4"}}},
        { name: "and8InvNode0", type: "Node", relative: {y: { name:"and0InvJoint0"}, x: { name:"and8", io: "4/4"}}},

        { name: "and0InvJoint1", type: "Joint", y: 10, relative: {y: { name:"and0InvJoint0" }, x: { name:"and0", io: "3/4"}}},
        { name: "and1InvNode1", type: "Node", relative: {y: { name:"and0InvJoint1"}, x: { name:"and1", io: "3/4"}}},
        { name: "and4InvNode1", type: "Node", relative: {y: { name:"and0InvJoint1"}, x: { name:"and4", io: "3/4"}}},
        { name: "and5InvNode1", type: "Node", relative: {y: { name:"and0InvJoint1"}, x: { name:"and5", io: "3/4"}}},
        { name: "and8InvNode1", type: "Node", relative: {y: { name:"and0InvJoint1"}, x: { name:"and8", io: "3/4"}}},
        { name: "and9InvJoint1", type: "Joint", relative: {y: { name:"and0InvJoint1"}, x: { name:"and9", io: "3/4"}}},
  
        { name: "and0InvJoint2", type: "Joint", y: 10, relative: {y: { name:"and0InvJoint1" }, x: { name:"and0", io: "2/4"}}},
        { name: "and1InvNode2", type: "Node", relative: {y: { name:"and0InvJoint2"}, x: { name:"and1", io: "2/4"}}},
        { name: "and2InvNode2", type: "Node", relative: {y: { name:"and0InvJoint2"}, x: { name:"and2", io: "2/4"}}},
        { name: "and3InvNode2", type: "Node", relative: {y: { name:"and0InvJoint2"}, x: { name:"and3", io: "2/4"}}},
        { name: "and8InvNode2", type: "Node", relative: {y: { name:"and0InvJoint2"}, x: { name:"and8", io: "2/4"}}},
        { name: "and9InvJoint2", type: "Joint", relative: {y: { name:"and0InvJoint2"}, x: { name:"and9", io: "2/4"}}},
  
        { name: "and0InvJoint3", type: "Joint", y: 10, relative: {y: { name:"and0InvJoint2" }, x: { name:"and0", io: "1/4"}}},
        { name: "and1InvNode3", type: "Node", relative: {y: { name:"and0InvJoint3"}, x: { name:"and1", io: "1/4"}}},
        { name: "and2InvNode3", type: "Node", relative: {y: { name:"and0InvJoint3"}, x: { name:"and2", io: "1/4"}}},
        { name: "and3InvNode3", type: "Node", relative: {y: { name:"and0InvJoint3"}, x: { name:"and3", io: "1/4"}}},
        { name: "and4InvNode3", type: "Node", relative: {y: { name:"and0InvJoint3"}, x: { name:"and4", io: "1/4"}}},
        { name: "and5InvNode3", type: "Node", relative: {y: { name:"and0InvJoint3"}, x: { name:"and5", io: "1/4"}}},
        { name: "and6InvNode3", type: "Node", relative: {y: { name:"and0InvJoint3"}, x: { name:"and6", io: "1/4"}}},
        { name: "and7InvJoint3", type: "Joint", relative: {y: { name:"and0InvJoint3"}, x: { name:"and7", io: "1/4"}}},

        { name: "and1Joint0", type: "Joint", y: 25, relative: {y: { name:"and0InvJoint3"}, x: { name:"and1", io: "4/4"}}},
        { name: "and3Node0", type: "Node", relative: {y: { name:"and1Joint0"}, x: { name:"and3", io: "4/4"}}},
        { name: "and5Node0", type: "Node", relative: {y: { name:"and1Joint0"}, x: { name:"and5", io: "4/4"}}},
        { name: "and7Node0", type: "Node", relative: {y: { name:"and1Joint0"}, x: { name:"and7", io: "4/4"}}},
        { name: "and9Joint0", type: "Joint", relative: {y: { name:"and1Joint0"}, x: { name:"and9", io: "4/4"}}},

        { name: "and2Joint1", type: "Joint", y: 10, relative: {y: { name:"and1Joint0"}, x: { name:"and2", io: "3/4"}}},
        { name: "and3Node1", type: "Node", relative: {y: { name:"and2Joint1"}, x: { name:"and3", io: "3/4"}}},
        { name: "and6Node1", type: "Node", relative: {y: { name:"and2Joint1"}, x: { name:"and6", io: "3/4"}}},
        { name: "and7Joint1", type: "Joint", relative: {y: { name:"and2Joint1"}, x: { name:"and7", io: "3/4"}}},

        { name: "and4Node2", type: "Node", y: 10, relative: {y: { name:"and2Joint1"}, x: { name:"and4", io: "2/4"}}},
        { name: "and5Node2", type: "Node", relative: {y: { name:"and4Node2"}, x: { name:"and5", io: "2/4"}}},
        { name: "and6Node2", type: "Node", relative: {y: { name:"and4Node2"}, x: { name:"and6", io: "2/4"}}},
        { name: "and7Joint2", type: "Joint", relative: {y: { name:"and4Node2"}, x: { name:"and7", io: "2/4"}}},

        { name: "and2Joint3", type: "Joint", y: 10, relative: {y: { name:"and4Node2"}, x: { name:"and2", io: "1/4"}}},    
        { name: "and8Node3", type: "Node", relative: {y: { name:"and2Joint3"}, x: { name:"and8", io: "1/4"}}},
        { name: "and9Joint3", type: "Joint", relative: {y: { name:"and2Joint3"}, x: { name:"and9", io: "1/4"}}},
    
        { name: "inv0", type: "Inverter", scale: 0.20, rotate: -90, y: 120, relative: { xy: { name:"and8InvNode0"}}},
        { name: "inv1", type: "Inverter", scale: 0.20, rotate: -90, relative: { y: { name:"inv0"}, x: { name:"and5InvNode1"}}},
        { name: "inv2", type: "Inverter", scale: 0.20, rotate: -90, relative: { y: { name:"inv0"}, x: { name:"and3InvNode2"}}},
        { name: "inv3", type: "Inverter", scale: 0.20, rotate: -90, relative: { y: { name:"inv0"}, x: { name:"and1InvNode3"}}},

        { name: "node0", type: "Node", y: 15, relative: {y: { name:"inv0"}, x: { name:"and7Node0"}}},
        { name: "node1", type: "Node", relative: {y: { name:"node0"}, x: { name:"and6Node1"}}},
        { name: "node2", type: "Node", relative: {y: { name:"node0"}, x: { name:"and4Node2"}}},
        { name: "node3", type: "Node", relative: {y: { name:"node0"}, x: { name:"and2Joint3"}}},

        { name: "joint0", type: "Joint", relative: {y: { name:"node0"}, x: { name:"inv0"}}},
        { name: "joint1", type: "Joint", relative: {y: { name:"node1"}, x: { name:"inv1"}}},
        { name: "joint2", type: "Joint", relative: {y: { name:"node2"}, x: { name:"inv2"}}},
        { name: "joint3", type: "Joint", relative: {y: { name:"node3"}, x: { name:"inv3"}}}
      ],
      wires: [



        { name: "wireInv0And2", points: [{ name:"and2InvNode0"}, { name:"and2", io: "4/4", input: 3}]},
        { name: "wireInv0And4", points: [{ name:"and4InvNode0"}, { name:"and4", io: "4/4", input: 3}]},
        { name: "wireInv0And6", points: [{ name:"and6InvNode0"}, { name:"and6", io: "4/4", input: 3}]},
        { name: "wireInv0And8", points: [{ name:"and8InvNode0"}, { name:"and8", io: "4/4", input: 3}]},

        { name: "wireInv1And1", points: [{ name:"and1InvNode1"}, { name:"and1", io: "3/4", input: 2}]},
        { name: "wireInv1And4", points: [{ name:"and4InvNode1"}, { name:"and4", io: "3/4", input: 2}]},
        { name: "wireInv1And5", points: [{ name:"and5InvNode1"}, { name:"and5", io: "3/4", input: 2}]},
        { name: "wireInv1And8", points: [{ name:"and8InvNode1"}, { name:"and8", io: "3/4", input: 2}]},

        { name: "wireInv2And1", points: [{ name:"and1InvNode2"}, { name:"and1", io: "2/4", input: 1}]},
        { name: "wireInv2And2", points: [{ name:"and2InvNode2"}, { name:"and2", io: "2/4", input: 1}]},
        { name: "wireInv2And3", points: [{ name:"and3InvNode2"}, { name:"and3", io: "2/4", input: 1}]},
        { name: "wireInv2And8", points: [{ name:"and8InvNode2"}, { name:"and8", io: "2/4", input: 1}]},

        { name: "wireInv3And1", points: [{ name:"and1InvNode3"}, { name:"and1", io: "1/4", input: 0}]},
        { name: "wireInv3And2", points: [{ name:"and2InvNode3"}, { name:"and2", io: "1/4", input: 0}]},
        { name: "wireInv3And3", points: [{ name:"and3InvNode3"}, { name:"and3", io: "1/4", input: 0}]},
        { name: "wireInv3And4", points: [{ name:"and4InvNode3"}, { name:"and4", io: "1/4", input: 0}]},
        { name: "wireInv3And5", points: [{ name:"and5InvNode3"}, { name:"and5", io: "1/4", input: 0}]},
        { name: "wireInv3And6", points: [{ name:"and6InvNode3"}, { name:"and6", io: "1/4", input: 0}]},

        { name: "wireInv0out0", points: [{ name:"inv0", io: "out"}, { name:"and8InvNode0"}]},
        { name: "wireInv0out1", points: [{ name:"and8InvNode0"}, { name:"and6InvNode0"}]},
        { name: "wireInv0out2", points: [{ name:"and6InvNode0"}, { name:"and4InvNode0"}]},
        { name: "wireInv0out3", points: [{ name:"and4InvNode0"}, { name:"and2InvNode0"}]},
        { name: "wireInv0out4", points: [{ name:"and2InvNode0"}, { name:"and0InvJoint0"}, { name:"and0", io: "4/4", input: 3}]},

        { name: "wireInv1out0", points: [{ name:"inv1", io: "out"}, { name:"and5InvNode1"}]},
        { name: "wireInv1out1", points: [{ name:"and5InvNode1"}, { name:"and8InvNode1"}]},
        { name: "wireInv1out2", points: [{ name:"and8InvNode1"}, { name:"and9InvJoint1"}, { name:"and9", io: "3/4", input: 2}]},
        { name: "wireInv1out3", points: [{ name:"and5InvNode1"}, { name:"and4InvNode1"}]},
        { name: "wireInv1out4", points: [{ name:"and4InvNode1"}, { name:"and1InvNode1"}]},
        { name: "wireInv1out5", points: [{ name:"and1InvNode1"}, { name:"and0InvJoint1"}, { name:"and0", io: "3/4", input: 2}]},

        { points: [{ name:"inv2", io: "out"}, { name:"and3InvNode2"}]},
        { points: [{ name:"and3InvNode2"}, { name:"and8InvNode2"}]},
        { points: [{ name:"and8InvNode2"}, { name:"and9InvJoint2"}, { name:"and9", io: "2/4", input: 1}]},
        { points: [{ name:"and3InvNode2"}, { name:"and2InvNode2"}]},
        { points: [{ name:"and2InvNode2"}, { name:"and1InvNode2"}]},
        { points: [{ name:"and1InvNode2"}, { name:"and0InvJoint2"}, { name:"and0", io: "2/4", input: 1}]},

        { name: "wireInv3out0", points: [{ name:"inv3", io: "out"}, { name:"and1InvNode3"}]},
        { name: "wireInv3out1", points: [{ name:"and1InvNode3"}, { name:"and2InvNode3"}]},
        { name: "wireInv3out2", points: [{ name:"and2InvNode3"}, { name:"and3InvNode3"}]},
        { name: "wireInv3out3", points: [{ name:"and3InvNode3"}, { name:"and4InvNode3"}]},
        { name: "wireInv3out4", points: [{ name:"and4InvNode3"}, { name:"and5InvNode3"}]},
        { name: "wireInv3out5", points: [{ name:"and5InvNode3"}, { name:"and6InvNode3"}]},
        { name: "wireInv3out6", points: [{ name:"and6InvNode3"}, { name:"and7InvJoint3"}, { name:"and7", io: "1/4", input: 0}]},
        { name: "wireInv3out7", points: [{ name:"and1InvNode3"}, { name:"and0InvJoint3"}, { name:"and0", io: "1/4", input: 0}]},

        { name: "wire0out0", points: [{ name:"and3Node0"}, { name:"and3", io: "4/4", input: 3}]},
        { name: "wire0out1", points: [{ name:"and5Node0"}, { name:"and5", io: "4/4", input: 3}]},
        { name: "wire0out2", points: [{ name:"and7Node0"}, { name:"and7", io: "4/4", input: 3}]},

        { points: [{ name:"and3Node1"}, { name:"and3", io: "3/4", input: 2}]},
        { points: [{ name:"and6Node1"}, { name:"and6", io: "3/4", input: 2}]},

        { name: "wire2out0", points: [{ name:"and4Node2"}, { name:"and4", io: "2/4", input: 1}]},
        { name: "wire2out1", points: [{ name:"and5Node2"}, { name:"and5", io: "2/4", input: 1}]},
        { name: "wire2out2", points: [{ name:"and6Node2"}, { name:"and6", io: "2/4", input: 1}]},

        { points: [{ name:"and8Node3"}, { name:"and8", io: "1/4", input: 0}]},

        { name: "nodeToInv0", points: [{ name:"node0"}, { name:"joint0"}, { name: "inv0" }]},
        { points: [{ name:"node1"}, { name:"joint1"}, { name: "inv1" }]},
        { name: "nodeToInv2", points: [{ name:"node2"}, { name:"joint2"}, { name: "inv2" }]},
        { points: [{ name:"node3"}, { name:"joint3"}, { name: "inv3" }]},

        { name: "wireNode0Out0", points: [ { name:"node0"}, { name:"and7Node0"}] },
        { name: "wireNode0Out1", points: [ { name:"and7Node0"}, { name:"and9Joint0"}, { name:"and9", io: "4/4", input: 3}]},
        { name: "wireNode0Out2", points: [ { name:"and7Node0"}, { name:"and5Node0"}]},
        { name: "wireNode0Out3", points: [ { name:"and5Node0"}, { name:"and3Node0"}]},
        { name: "wireNode0Out4", points: [ { name:"and3Node0"}, { name:"and1Joint0"}, { name:"and1", io: "4/4", input: 3}]},

        { points: [ { name:"node1"}, { name:"and6Node1"}] },
        { points: [ { name:"and6Node1"}, { name:"and7Joint1"}, { name:"and7", io: "3/4", input: 2}]},
        { points: [ { name:"and6Node1"}, { name:"and3Node1"}]},
        { points: [ { name:"and3Node1"}, { name:"and2Joint1"}, { name:"and2", io: "3/4", input: 2}]},

        { name: "wireNode2Out0", points: [ { name:"node2"}, { name:"and4Node2"}]},
        { name: "wireNode2Out1", points: [ { name:"and4Node2"}, { name:"and5Node2"}]},
        { name: "wireNode2Out2", points: [ { name:"and5Node2"}, { name:"and6Node2"}]},
        { name: "wireNode2Out3", points: [ { name:"and6Node2"}, { name:"and7Joint2"}, { name:"and7", io: "2/4", input: 1}]},

        { points: [{ name:"node3"}, { name:"and2Joint3"}, { name:"and8Node3"}]},
        { points: [{ name:"and8Node3"}, { name:"and9Joint3"}, { name:"and9", io: "1/4", input: 0}]}
    
      ]
    }
    
    