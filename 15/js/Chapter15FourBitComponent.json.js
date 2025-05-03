// Chapter15FourBitComponent (c) Charles Petzold, 2024

let Chapter15FourBitComponent = 
{
    name: "Chapter15FourBitComponent",
    components:
    [
        { name:"nand1", type: "NandGate", y: -75},
        { name:"or1", type: "OrGate", y: 75},
        { name:"and1", type: "AndGate", x: 240},
        { name:"gAnd", type: "AndGate", y: 500},

        { name:"node1A1", type: "Node", x: -50, relative: {y: { name:"nand1", io: "A"}}},
        { name:"node1A2", type: "Node", relative: {x: { name:"node1A1"}, y: { name: "or1", io: "A"}}},
        { name:"joint1A3", type: "Joint", relative: {x: { name:"node1A1"}, y: { name: "gAnd", io: "A"}}},

        { name: "node1B2", type: "Node", x: -100, relative: {y: { name: "or1", io: "B"}}},
        { name:"joint1B1", type: "Joint", relative: {x: { name:"node1B2"}, y: { name: "nand1", io: "B"}}},
        { name:"joint1B3", type: "Joint", relative: {x: { name:"node1B2"}, y: { name: "gAnd", io: "B"}}},

        { name: "jtNand12", type: "Joint", x: -50, relative: { xy: { name:"and1", io: "A" }}},
        { name: "jtNand11", type: "Joint", relative: { x: { name:"jtNand12"}, y: { name:"nand1", io: "out"}}},

        { name: "jtOr12", type: "Joint", x: -50, relative: { xy: { name:"and1", io: "B" }}},
        { name: "nodeOr11", type: "Node", relative: { x: { name:"jtOr12"}, y: { name:"or1", io: "out"}}},

        { name:"nand2", type: "NandGate", x: 525, relative: {xy: { name:"nand1"}}},
        { name:"or2", type: "OrGate", relative: {x: { name:"nand2"}, y: { name:"or1"}}},
        { name:"and2", type: "AndGate", x: 240, relative: {x: { name:"nand2"}, y: { name:"and1"}}},

        { name: "jtNand22", type: "Joint", x: -50, relative: { xy: { name:"and2", io: "A" }}},
        { name: "jtNand21", type: "Joint", relative: { x: { name:"jtNand22"}, y: { name:"nand2", io: "out"}}},

        { name: "jtOr22", type: "Joint", x: -50, relative: { xy: { name:"and2", io: "B" }}},
        { name: "jtOr21", type: "Joint", relative: { x: { name:"jtOr22"}, y: { name:"or2", io: "out"}}},

        { name:"cyOr", type: "OrGate", y: 600, relative: {xy: { name:"and2"}}},
        { name:"cyAnd", type: "AndGate", relative: {x: { name:"nand2"}, y: { name:"cyOr", io: "B"}}},

        { name:"gNode", type: "Node", x: -50, relative: {x: { name:"cyOr"}, y: { name:"gAnd"}}},
        { name:"gJoint", type: "Joint", relative: {x: { name:"gNode"}, y: { name:"cyOr", io: "A"}}},

        { name:"ci1Node1", type: "Node", x: -50, relative: {xy: { name:"nand2", io: "A"}}},
        { name:"ci1Node2", type: "Node", relative: {x: { name:"ci1Node1"}, y: { name:"or2", io: "A"}}},
        { name:"ci1Joint3", type: "Joint", relative: {x: { name:"ci1Node1"}, y: { name:"cyAnd", io: "A"}}},

        { name:"node2B2", type: "Node", x: -50, relative: {x: { name:"ci1Node1"}}},
        { name:"joint2B1", type: "Joint", relative: {x: { name:"node2B2"}, y: { name:"nand2", io: "B"}}},
        { name:"node2B3", type: "Node", relative: {x: { name:"node2B2"}, y: { name:"or2", io: "B"}}},

        { name:"pNode", type: "Node", y: -100, x: -100, relative: {y: { name:"gNode"}, x: { name:"cyAnd"}}},
        { name:"pJoint1", type: "Joint", relative: {x: { name:"nodeOr11"}, y: { name:"pNode"}}},
        { name:"pJoint2", type: "Joint", relative: {y: { name:"cyAnd", io: "B"}, x: { name:"pNode"}}},

        { name:"cyJoint0", type: "Joint", x: 100, relative: {xy: { name: "cyOr", io: "out"}}},
        { name:"cyJoint1", type: "Joint", y: 200, relative: {xy: { name: "cyJoint0"}}},
        { name:"cyJoint2", type: "Joint", y: -200, relative: {xy: { name: "ci1Node1"}}},

        { name:"nand3", type: "NandGate", rotate: 180, x: 1750, relative: {xy: { name:"nand2"}}},
        { name:"or3", type: "OrGate", rotate: 180, relative: {x: { name:"nand3"}, y: { name:"or2"}}},
        { name:"and3", type: "AndGate", rotate: 180, x: -240, relative: {x: { name:"nand3"}, y: { name:"and2"}}},

        { name: "jtNand32", type: "Joint", x: 50, relative: { xy: { name:"and3", io: "B" }}},
        { name: "jtNand31", type: "Joint", relative: { x: { name:"jtNand32"}, y: { name:"nand3", io: "out"}}},

        { name: "jtOr32", type: "Joint", x: 50, relative: { xy: { name:"and3", io: "A" }}},
        { name: "jtOr31", type: "Joint", relative: { x: { name:"jtOr32"}, y: { name:"or3", io: "out"}}},

        { name:"ci2Node1", type: "Node", x: 50, relative: {xy: { name:"nand3", io: "B"}}},
        { name:"ci2Joint2", type: "Joint", relative: {x: { name:"ci2Node1"}, y: { name:"or3", io: "B"}}},

        { name:"node3A1", type: "Node", x: 100, relative: {xy: { name:"or3", io: "A"}}},
        { name:"joint3A2", type: "Joint", relative: {x: { name:"node3A1"}, y: { name:"nand3", io: "A"}}},

        { name:"sumJoint1", type: "Joint", y: 190, relative: {xy: { name:"node2B3"}}},
        { name:"sumJoint2", type: "Joint", relative: {y: { name:"sumJoint1"}, x: { name:"node3A1"}}},
    ],

    wires: 
    [
        { points:[{ name:"node1A1"}, { name:"nand1", io: "A", input: 0}]},
        { points:[{ name:"node1A1"}, { name:"node1A2"}]},
        { points:[{ name:"node1A2"}, { name:"or1", io: "A", input: 0}]},
        { points:[{ name:"node1A2"}, { name:"joint1A3"}, { name:"gAnd", io: "A", input: 0}]},

        { points:[{ name:"node1B2"}, { name:"or1", io: "B", input: 1}]},
        { points:[{ name:"node1B2"}, { name:"joint1B1"}, { name:"nand1", io: "B", input: 1}]},
        { points:[{ name:"node1B2"}, { name:"joint1B3"}, { name:"gAnd", io: "B", input: 1}]},

        { points:[{ name:"and1", io: "out"}, { name:"node2B2"}]},
        { points:[{ name:"node2B2"}, { name:"joint2B1"}, { name:"nand2", io: "B", input: 1}]},
        { points:[{ name:"node2B2"}, { name:"node2B3"}]},
        { points:[{ name:"node2B3"}, { name:"or2", io: "B", input: 1}]},

        { points: [ { name: "nand1", io: "out"}, { name:"jtNand11"}, { name: "jtNand12"}, { name: "and1", io: "A", input: 0 }]},
        { points: [ { name: "or1", io: "out"}, { name:"nodeOr11"}]},
        { points:[{ name:"nodeOr11"}, { name: "jtOr12"}, { name: "and1", io: "B", input: 1 }]},

        { points: [ { name: "nand2", io: "out"}, { name:"jtNand21"}, { name: "jtNand22"}, { name: "and2", io: "A", input: 0 }]},
        { points: [ { name: "or2", io: "out"}, { name:"jtOr21"}, { name: "jtOr22"}, { name: "and2", io: "B", input: 1 }]},

        { points:[{ name:"gAnd", io: "out"}, { name:"gNode"}]},
        { points:[{ name:"gNode"}, { name:"gJoint"}, { name:"cyOr", io: "A", input: 0}]},
        { points:[{ name:"cyAnd", io: "out"}, { name:"cyOr", io: "B", input: 1}]},

        { points:[{ name:"nodeOr11"}, { name:"pJoint1"}, { name:"pNode"}]},
        { points:[{ name:"pNode"}, { name:"pJoint2"}, { name:"cyAnd", io: "B", input: 1}]},
      
        { points:[{ name:"ci1Node1"}, { name:"nand2", io: "A", input: 0}]},
        { points:[{ name:"ci1Node1"}, { name:"ci1Node2"}]},
        { points:[{ name:"ci1Node2"}, { name:"or2", io: "A", input: 0}]},
        { points:[{ name:"ci1Node2"}, { name:"ci1Joint3"}, { name:"cyAnd", io: "A", input: 0}]},

        { points: [ { name: "nand3", io: "out"}, { name:"jtNand31"}, { name: "jtNand32"}, { name: "and3", io: "B", input: 1 }]},
        { points: [ { name: "or3", io: "out"}, { name:"jtOr31"}, { name: "jtOr32"}, { name: "and3", io: "A", input: 0 }]},

        { points:[{ name:"ci2Node1"}, { name:"nand3", io: "B", input: 1}]},
        { points:[{ name:"ci2Node1"}, { name:"ci2Joint2"}, { name:"or3", io: "B", input: 1}]},

        { points:[{ name:"node2B3"}, { name:"sumJoint1"}, { name:"sumJoint2"}, { name:"node3A1"}]},
        { points:[{ name:"node3A1"}, { name:"or3", io: "A", input: 0}]},
        { points:[{ name:"node3A1"}, { name:"joint3A2"}, { name:"nand3", io: "A", input: 0}]},

    ],
}
