// Chapter15FourBitAssemblage (c) Charles Petzold, 2024

let Chapter15FourBitAssemblage = 
{
    name: "Chapter15FourBitAssemblage",
    transform: {x: 125, y: 230, scale: 1, rotate: 0},
    propagationDelay: 250,
    nodeRadius: 3,
    wireCurveRadius: 5,

    components:
    [
        { name: "adder0", type: "External", file: "Chapter15FourBitComponentUI", x: 1000 },
        { name: "adder1", type: "External", file: "Chapter15FourBitComponentUI", x: 750 },
        { name: "adder2", type: "External", file: "Chapter15FourBitComponentUI", x: 500 },
        { name: "adder3", type: "External", file: "Chapter15FourBitComponentUI", x: 250 },

        { name:"bit0", type: "Label", text: "Bit 0", y: -45, relative: { xy: { name:"adder0.buttonA"}}},
        { name:"bit1", type: "Label", text: "Bit 1", relative: { y: { name:"bit0"}, x: { name:"adder1.buttonA"}}},
        { name:"bit2", type: "Label", text: "Bit 2", relative: { y: { name:"bit0"}, x: { name:"adder2.buttonA"}}},
        { name:"bit3", type: "Label", text: "Bit 3", relative: { y: { name:"bit0"}, x: { name:"adder3.buttonA"}}},

        { name:"ci1Node0", type: "Node", x: 40, relative: {xy: { name:"adder0.component.ci1Node1"}}},
        { name:"buttonCI", type: "DigitButton", x: 70, relative: {xy: { name:"ci1Node0"}}},
        { name:"cy", type: "Label", text: "CI", y: -45, relative: { xy: { name:"buttonCI"}}},
        { name:"ci2Node0", type: "Node", relative: {x: { name:"ci1Node0"}, y: { name:"adder0.component.ci2Node1"}}},

        { name:"cyLight1", type: "BitLight", x: -250, relative: {xy: { name:"adder3.light1"}}},
        { name:"cyLight2", type: "BitLight", x: -250, relative: {xy: { name:"adder3.light2"}}},

        { name:"cyLight1Joint1", type: "Joint", y: 25, relative: {xy: { name:"adder3.component.cyOr", io: "out"}}},
        { name:"cyLight1Joint2", type: "Joint", relative: {y: { name:"cyLight1Joint1"}, x: { name:"cyLight1"}}},

        { name:"or1", type: "OrGate", scale: 0.30, rotate: -90, y: 75, relative: {xy: { name:"adder1.component.ci2Node1"}}},
        { name:"or2", type: "OrGate", scale: 0.30, inputs: 3, rotate: -90, relative: {y: { name:"or1"}, x: { name:"adder2.component.ci2Node1"}}},
        { name:"or3", type: "OrGate", scale: 0.30, inputs: 4, rotate: -90, relative: {y: { name:"or1"}, x: { name:"adder3.component.ci2Node1"}}},
        { name:"or4", type: "OrGate", scale: 0.30, inputs: 5, rotate: -90, relative: {y: { name:"or1"}, x: { name:"cyLight2"}}},

        { name:"and11", type: "AndGate", scale: 0.3, rotate: -90, y: 75, relative: {xy: { name:"or1", io: "A"}}},

        { name:"and21", type: "AndGate", scale: 0.3, rotate: -90, y: 75, relative: {xy: { name:"or2", io: "2/3"}}},
        { name:"and22", type: "AndGate", inputs: 3, scale: 0.3, rotate: -90, x: -50, relative: {xy: { name:"and21"}}},

        { name:"and22Joint2", type: "Joint", y: 25, relative: {xy: { name:"or2", io: "1/3"}}},
        { name:"and22Joint1", type: "Joint", relative: {x: { name:"and22", io: "out"}, y: { name:"and22Joint2"}}},

        { name:"and32", type: "AndGate", inputs: 3, scale: 0.3, rotate: -90, y: 75, relative: {xy: { name:"or3", io: "2/4"}}},
        { name:"and31", type: "AndGate", inputs: 2, scale: 0.3, rotate: -90, x: 50, relative: {xy: { name:"and32"}}},
        { name:"and33", type: "AndGate", inputs: 4, scale: 0.3, rotate: -90, x: -50, relative: {xy: { name:"and32"}}},

        { name:"and31Joint2", type: "Joint", y: 25, relative: {xy: { name:"or3", io: "3/4"}}},
        { name:"and31Joint1", type: "Joint", relative: {x: { name:"and31", io: "out"}, y: { name:"and31Joint2"}}},

        { name:"and33Joint2", type: "Joint", y: 25, relative: {xy: { name:"or3", io: "1/4"}}},
        { name:"and33Joint1", type: "Joint", relative: {x: { name:"and33", io: "out"}, y: { name:"and33Joint2"}}},

        { name:"and42", type: "AndGate", inputs: 3, scale: 0.3, rotate: -90, y: 75, relative: {xy: { name:"or4", io: "3/5"}}},
        { name:"and41", type: "AndGate", inputs: 2, scale: 0.3, rotate: -90, x: 50, relative: {xy: { name:"and42"}}},
        { name:"and43", type: "AndGate", inputs: 4, scale: 0.3, rotate: -90, x: -50, relative: {xy: { name:"and42"}}},
        { name:"and44", type: "AndGate", inputs: 5, scale: 0.3, rotate: -90, x: -100, relative: {xy: { name:"and42"}}},

        { name:"and41Joint2", type: "Joint", y: 25, relative: {xy: { name:"or4", io: "4/5"}}},
        { name:"and41Joint1", type: "Joint", relative: {x: { name:"and41", io: "out"}, y: { name:"and41Joint2"}}},

        { name:"and43Joint2", type: "Joint", y: 25, relative: {xy: { name:"or4", io: "2/5"}}},
        { name:"and43Joint1", type: "Joint", relative: {x: { name:"and43", io: "out"}, y: { name:"and43Joint2"}}},

        { name:"and44Joint2", type: "Joint", y: 15, relative: {xy: { name:"or4", io: "1/5"}}},
        { name:"and44Joint1", type: "Joint", relative: {x: { name:"and44", io: "out"}, y: { name:"and44Joint2"}}},

        { name:"cJoint0", type: "Joint", y: 280, relative: {xy: { name:"ci2Node0"}}},
        { name:"cNode1", type: "Node", relative: {x: { name:"and11", io: "A"}, y: { name:"cJoint0"}}},
        { name:"cNode2", type: "Node", relative: {x: { name:"and22", io: "1/3"}, y: { name:"cJoint0"}}}, 
        { name:"cNode3", type: "Node", relative: {x: { name:"and33", io: "1/4"}, y: { name:"cJoint0"}}}, 
        { name:"cJoint4", type: "Joint", relative: {x: { name:"and44", io: "1/5"}, y: { name:"cJoint0"}}}, 

        { name:"p0Joint0", type: "Joint", y: -15, relative: {y: { name:"cJoint0"}, x: { name:"adder0.component.pNode"}}},
        { name:"p0Node1", type: "Node", relative: {x: { name:"and11", io: "B"}, y: { name:"p0Joint0"}}},
        { name:"p0Node2", type: "Node", relative: {x: { name:"and22", io: "2/3"}, y: { name:"p0Joint0"}}}, 
        { name:"p0Node3", type: "Node", relative: {x: { name:"and33", io: "2/4"}, y: { name:"p0Joint0"}}}, 
        { name:"p0Joint4", type: "Joint", relative: {x: { name:"and44", io: "2/5"}, y: { name:"p0Joint0"}}}, 

        { name:"g0Node", type: "Node", y: 25, relative: {y: { name:"or1"}, x: { name:"adder0.component.gNode"}}},
        { name:"g0Joint", type: "Joint", relative: {x: { name:"or1", io: "B"}, y: { name:"g0Node"}}},

        { name:"g0Joint0", type: "Joint", y: -15, relative: {y: { name:"p0Joint0"}, x: { name:"adder0.component.gNode"}}},
        { name:"g0Node1", type: "Node", relative: {x: { name:"and21", io: "A"}, y: { name:"g0Joint0"}}},
        { name:"g0Node2", type: "Node", relative: {x: { name:"and32", io: "1/3"}, y: { name:"g0Joint0"}}},
        { name:"g0Joint3", type: "Joint", relative: {x: { name:"and43", io: "1/4"}, y: { name:"g0Joint0"}}},

        { name:"p1Joint0", type: "Joint", y: -15, relative: {y: { name:"g0Joint0"}, x: { name:"adder1.component.pNode"}}},
        { name:"p1Node1", type: "Node", relative: {x: { name:"and21", io: "B"}, y: { name:"p1Joint0"}}}, 
        { name:"p1Node2", type: "Node", relative: {x: { name:"and22", io: "3/3"}, y: { name:"p1Joint0"}}}, 
        { name:"p1Node3", type: "Node", relative: {x: { name:"and32", io: "2/3"}, y: { name:"p1Joint0"}}}, 
        { name:"p1Node4", type: "Node", relative: {x: { name:"and33", io: "3/4"}, y: { name:"p1Joint0"}}}, 
        { name:"p1Node5", type: "Node", relative: {x: { name:"and43", io: "2/4"}, y: { name:"p1Joint0"}}}, 
        { name:"p1Joint6", type: "Joint", relative: {x: { name:"and44", io: "3/5"}, y: { name:"p1Joint0"}}}, 

        { name:"g1Node", type: "Node", y: 25, relative: {y: { name:"or2"}, x: { name:"adder1.component.gNode"}}},
        { name:"g1Joint", type: "Joint", relative: {x: { name:"or2", io: "3/3"}, y: { name:"g1Node"}}},

        { name:"g1Joint0", type: "Joint", y: -15, relative: {y: { name:"p1Joint0"}, x: { name:"adder1.component.gNode"}}},
        { name:"g1Node1", type: "Node", relative: {x: { name:"and31", io: "A"}, y: { name:"g1Joint0"}}},
        { name:"g1Joint2", type: "Joint", relative: {x: { name:"and42", io: "1/3"}, y: { name:"g1Joint0"}}},

        { name:"p2Joint0", type: "Joint", y: -15, relative: {y: { name:"g1Joint0"}, x: { name:"adder2.component.pNode"}}},
        { name:"p2Node1", type: "Node", relative: {x: { name:"and31", io: "B"}, y: { name:"p2Joint0"}}}, 
        { name:"p2Node2", type: "Node", relative: {x: { name:"and32", io: "3/3"}, y: { name:"p2Joint0"}}}, 
        { name:"p2Node3", type: "Node", relative: {x: { name:"and33", io: "4/4"}, y: { name:"p2Joint0"}}}, 
        { name:"p2Node4", type: "Node", relative: {x: { name:"and42", io: "2/3"}, y: { name:"p2Joint0"}}}, 
        { name:"p2Node5", type: "Node", relative: {x: { name:"and43", io: "3/4"}, y: { name:"p2Joint0"}}}, 
        { name:"p2Joint6", type: "Joint", relative: {x: { name:"and44", io: "4/5"}, y: { name:"p2Joint0"}}}, 

        { name:"g2Node", type: "Node", y: 15, relative: {y: { name:"or3"}, x: { name:"adder2.component.gNode"}}},
        { name:"g2Joint", type: "Joint", relative: {x: { name:"or3", io: "4/4"}, y: { name:"g2Node"}}},

        { name:"g2Joint0", type: "Joint", y: -15, relative: {y: { name:"p2Joint0"}, x: { name:"adder2.component.gNode"}}},
        { name:"g2Joint1", type: "Joint", relative: {x: { name:"and41", io: "A"}, y: { name:"g2Joint0"}}},

        { name:"p3Joint0", type: "Joint", y: -15, relative: {y: { name:"g2Joint0"}, x: { name:"adder3.component.pNode"}}},
        { name:"p3Node1", type: "Node", relative: {x: { name:"and41", io: "B"}, y: { name:"p3Joint0"}}}, 
        { name:"p3Node2", type: "Node", relative: {x: { name:"and42", io: "3/3"}, y: { name:"p3Joint0"}}}, 
        { name:"p3Node3", type: "Node", relative: {x: { name:"and43", io: "4/4"}, y: { name:"p3Joint0"}}}, 
        { name:"p3Joint4", type: "Joint", relative: {x: { name:"and44", io: "5/5"}, y: { name:"p3Joint0"}}}, 

        { name:"g3Joint", type: "Joint", y: 15, relative: {y: { name:"or4"}, x: { name:"adder3.component.gNode"}}},
        { name:"g3Joint0", type: "Joint", relative: {x: { name:"or4", io: "5/5"}, y: { name:"g3Joint"}}},

        { name:"p0", type: "Label", text: "P0", y: -45, x: 20, relative: {x: { name:"adder0.component.pNode"}, y: { name:"g0Node"}}},
        { name:"g0", type: "Label", text: "G0", x: -20, relative: {x: { name:"adder0.component.gNode"}, y: { name:"p0"}}},

        { name:"p1", type: "Label", text: "P1", x: 20, relative: {x: { name:"adder1.component.pNode"}, y: { name:"p0"}}},
        { name:"g1", type: "Label", text: "G1", x: -20, relative: {x: { name:"adder1.component.gNode"}, y: { name:"p0"}}},

        { name:"p2", type: "Label", text: "P2", x: 20, relative: {x: { name:"adder2.component.pNode"}, y: { name:"p0"}}},
        { name:"g2", type: "Label", text: "G2", x: -20, relative: {x: { name:"adder2.component.gNode"}, y: { name:"p0"}}},

        { name:"p3", type: "Label", text: "P3", x: 20, relative: {x: { name:"adder3.component.pNode"}, y: { name:"p0"}}},
        { name:"g3", type: "Label", text: "G3", x: -20, relative: {x: { name:"adder3.component.gNode"}, y: { name:"p0"}}},

        { name:"ci", type: "Label", text: "CI", x: 20, relative: {x: { name:"ci1Node0"}, y: { name:"p0"}}},
    ],
    wires:
    [
        { points:[{ name:"adder3.component.gNode"}, { name:"g3Joint"}, { name:"g3Joint0"}, { name:"or4", io: "5/5", input: 4}]},

        { points:[{ name:"adder3.component.pNode"}, { name:"p3Joint0"}, { name:"p3Node1"}]},
        { points:[{ name:"p3Node1"}, { name:"and41", io: "B", input: 1}]},
        { points:[{ name:"p3Node1"}, { name:"p3Node2"}]},
        { points:[{ name:"p3Node2"}, { name:"and42", io: "3/3", input: 2}]},
        { points:[{ name:"p3Node2"}, { name:"p3Node3"}]},
        { points:[{ name:"p3Node3"}, { name:"and43", io: "4/4", input: 3}]},
        { points:[{ name:"p3Node3"}, { name:"p3Joint4"}, { name:"and44", io: "5/5", input: 4}]},

        { points:[{ name:"adder2.component.gNode"}, { name:"g2Node"}]},
        { points:[{ name:"g2Node"}, { name:"g2Joint"}, { name:"or3", io: "4/4", input: 3}]},
        { points:[{ name:"g2Node"}, { name:"g2Joint0"}, { name:"g2Joint1"}, { name:"and41", io: "A", input: 0}]},

        { points:[{ name:"adder2.component.pNode"}, { name:"p2Joint0"}, { name:"p2Node1"}]},
        { points:[{ name:"p2Node1"}, { name:"and31", io: "B", input: 1}]},
        { points:[{ name:"p2Node1"}, { name:"p2Node2"}]},
        { points:[{ name:"p2Node2"}, { name:"and32", io: "3/3", input: 2}]},
        { points:[{ name:"p2Node2"}, { name:"p2Node3"}]},
        { points:[{ name:"p2Node3"}, { name:"and33", io: "4/4", input: 3}]},
        { points:[{ name:"p2Node3"}, { name:"p2Node4"}]},
        { points:[{ name:"p2Node4"}, { name:"and42", io: "2/3", input: 1}]},
        { points:[{ name:"p2Node4"}, { name:"p2Node5"}]},
        { points:[{ name:"p2Node5"}, { name:"and43", io: "3/4", input: 2}]},
        { points:[{ name:"p2Node5"}, { name:"p2Joint6"}, { name:"and44", io: "4/5", input: 3}]},

        { points:[{ name:"adder1.component.gNode"}, { name:"g1Node"}]},
        { points:[{ name:"g1Node"}, { name:"g1Joint"}, { name:"or2", io: "3/3", input: 2}]},
        { points:[{ name:"g1Node"}, { name:"g1Joint0"}, { name:"g1Node1"}]},
        { points:[{ name:"g1Node1"}, { name:"and31", io: "A", input: 0}]},
        { points:[{ name:"g1Node1"}, { name:"g1Joint2"}, { name:"and42", io: "1/3", input: 0}]},
     
        { points:[{ name:"adder1.component.pNode"}, { name:"p1Joint0"}, { name:"p1Node1"}]},
        { points:[{ name:"p1Node1"}, { name:"and21", io: "B", input: 1}]},
        { points:[{ name:"p1Node1"}, { name:"p1Node2"}]},
        { points:[{ name:"p1Node2"}, { name:"and22", io: "3/3", input: 2}]},
        { points:[{ name:"p1Node2"}, { name:"p1Node3"}]},
        { points:[{ name:"p1Node3"}, { name:"and32", io: "2/3", input: 1}]},
        { points:[{ name:"p1Node3"}, { name:"p1Node4"}]},
        { points:[{ name:"p1Node4"}, { name:"and33", io: "3/4", input: 2}]},
        { points:[{ name:"p1Node4"}, { name:"p1Node5"}]},
        { points:[{ name:"p1Node5"}, { name:"and43", io: "2/4", input: 1}]},
        { points:[{ name:"p1Node5"}, { name:"p1Joint6"}, { name:"and44", io: "3/5", input: 2}]},

        { points:[{ name:"adder0.component.gNode"}, { name:"g0Node"}]},
        { points:[{ name:"g0Node"}, { name:"g0Joint"}, { name:"or1", io: "B", input: 1}]},
        { points:[{ name:"g0Node"}, { name:"g0Joint0"}, { name:"g0Node1"}]},
        { points:[{ name:"g0Node1"}, { name:"and21", io: "A", input: 0}]},
        { points:[{ name:"g0Node1"}, { name:"g0Node2"}]},
        { points:[{ name:"g0Node2"}, { name:"and32", io: "1/3", input: 0}]},
        { points:[{ name:"g0Node2"}, { name:"g0Joint3"}, { name:"and43", io: "1/4", input: 0}]},

        { points:[{ name:"adder0.component.pNode"}, { name:"p0Joint0"}, { name:"p0Node1"}]},
        { points:[{ name:"p0Node1"}, { name:"and11", io: "B", input: 1}]},
        { points:[{ name:"p0Node1"}, { name:"p0Node2"}]},
        { points:[{ name:"p0Node2"}, { name:"and22", io: "2/3", input: 1}]},
        { points:[{ name:"p0Node2"}, { name:"p0Node3"}]},
        { points:[{ name:"p0Node3"}, { name:"and33", io: "2/4", input: 1}]},
        { points:[{ name:"p0Node3"}, { name:"p0Joint4"}, { name:"and44", io: "2/5", input: 1}]},

        { points:[{ name:"ci2Node0"}, { name:"cJoint0"}, { name:"cNode1"}]},
        { points:[{ name:"cNode1"}, { name:"and11", io: "A", input: 0}]},
        { points:[{ name:"cNode1"}, { name:"cNode2"}]},
        { points:[{ name:"cNode2"}, { name:"and22", io: "1/3", input: 0}]},
        { points:[{ name:"cNode2"}, { name:"cNode3"}]},
        { points:[{ name:"cNode3"}, { name:"and33", io: "1/4", input: 0}]},
        { points:[{ name:"cNode3"}, { name:"cJoint4"}, { name:"and44", io: "1/5", input: 0}]},

        { points:[{ name:"or1", io: "out"}, { name:"adder1.component.ci2Node1"}]},
        { points:[{ name:"or2", io: "out"}, { name:"adder2.component.ci2Node1"}]},
        { points:[{ name:"or3", io: "out"}, { name:"adder3.component.ci2Node1"}]},
        { points:[{ name:"or4", io: "out"}, { name:"cyLight2", io: "bottom"}]},

        { points:[{ name:"and11", io: "out"}, { name:"or1", io: "A", input: 0}]},

        { points:[{ name:"and21", io: "out"}, { name:"or2", io: "2/3", input: 1}]},
        { points:[{ name:"and22", io: "out"}, { name:"and22Joint1"}, { name:"and22Joint2"}, { name:"or2", io: "1/3", input: 0}]},

        { points:[{ name:"and32", io: "out"}, { name:"or3", io: "2/4", input: 1}]},
        { points:[{ name:"and31", io: "out"}, { name:"and31Joint1"}, { name:"and31Joint2"}, { name:"or3", io: "3/4", input: 2}]},
        { points:[{ name:"and33", io: "out"}, { name:"and33Joint1"}, { name:"and33Joint2"}, { name:"or3", io: "1/4", input: 0}]},

        { points:[{ name:"and41", io: "out"}, { name:"and41Joint1"}, { name:"and41Joint2"}, { name:"or4", io: "4/5", input: 3}]},
        { points:[{ name:"and42", io: "out"}, { name:"or4", io: "3/5", input: 2}]},
        { points:[{ name:"and43", io: "out"}, { name:"and43Joint1"}, { name:"and43Joint2"}, { name:"or4", io: "2/5", input: 1}]},
        { points:[{ name:"and44", io: "out"}, { name:"and44Joint1"}, { name:"and44Joint2"}, { name:"or4", io: "1/5", input: 0}]},

        { points:[{ name:"buttonCI", io: "left"}, { name:"ci1Node0"}]},
        { points:[{ name:"ci1Node0"}, { name:"adder0.component.ci1Node1"}]},
        { points:[{ name:"ci1Node0"}, { name:"ci2Node0"}]},
        { points:[{ name:"ci2Node0"}, { name:"adder0.component.ci2Node1"}]},

        { points:[{ name:"adder0.component.cyOr", io: "out"}, { name:"adder0.component.cyJoint0"}, { name:"adder0.component.cyJoint1"}, { name:"adder1.component.cyJoint2"}, { name:"adder1.component.ci1Node1"}]},
        { points:[{ name:"adder1.component.cyOr", io: "out"}, { name:"adder1.component.cyJoint0"}, { name:"adder1.component.cyJoint1"}, { name:"adder2.component.cyJoint2"}, { name:"adder2.component.ci1Node1"}]},
        { points:[{ name:"adder2.component.cyOr", io: "out"}, { name:"adder2.component.cyJoint0"}, { name:"adder2.component.cyJoint1"}, { name:"adder3.component.cyJoint2"}, { name:"adder3.component.ci1Node1"}]},
        { points:[{ name:"adder3.component.cyOr", io: "out"}, { name:"cyLight1Joint1"}, { name:"cyLight1Joint2"}, { name:"cyLight1", io: "top"}]},

    ]
}
