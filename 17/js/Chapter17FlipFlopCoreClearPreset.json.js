// Chapter17FlipFlopCoreClearPreset (c) Charles Petzold, 2024

let Chapter17FlipFlopCoreClearPreset = 
{
    name: "Chapter17FlipFlopCoreClearPreset",
    components:
        [
            { name: "norC1", type: "NorGate", inputs: 3, y:-125  },
            { name: "qNode", type: "Node", x: 50, relative: { xy: { name: "norC1", io: "out"}}},
            { name: "jtC1", type: "Joint", y: 75, relative: { xy: { name: "qNode"}}},
            { name: "jtC1loop1", type: "Joint", x: -50, relative: { xy: { name:"norC1", io: "3/3"}}},
            { name: "jtC1loop2", type: "Joint", y: 50, relative: { xy: { name: "jtC1loop1"}}},

            { name: "norC2", type: "NorGate", inputs: 3, y:125 },
            { name: "qbarNode", type: "Node", relative: { x: { name:"qNode"}, y: { name: "norC2", io: "out"}}},
            { name: "jtC2", type: "Joint", y: -75, relative: { xy: { name: "qbarNode"}}},
            { name: "jtC2loop1", type: "Joint", x: -50, relative: { xy: { name:"norC2", io: "1/3"}}},
            { name: "jtC2loop2", type: "Joint", y: -50, relative: { xy: { name: "jtC2loop1"}}},

            { name: "norA2", type:"NorGate", inputs: 3, x:-350, relative: {xy: { name:"norC1"}}},
            { name: "nodeA2", type: "Node", x: 50, relative: { xy: { name: "norA2", io: "out"}}},
            { name: "jtA2", type: "Joint", y: -75, relative: { xy: { name: "nodeA2"}}},
            { name: "jtA2loop1", type: "Joint", x: -50, relative: { xy: { name:"norA2", io: "1/3"}}},
            { name: "jtA2loop2", type: "Joint", y: -50, relative: { xy: { name: "jtA2loop1"}}},

            { name: "norA1", type:"NorGate", inputs: 3, y:-250, relative: {xy: { name:"norA2"}}},
            { name: "jointA1", type: "Joint", x: 50, relative: { xy: { name: "norA1", io: "out"}}},
            { name: "jtA1", type: "Joint", y: 75, relative: { xy: { name: "jointA1"}}},
            { name: "jtA1loop1", type: "Joint", x: -50, relative: { xy: { name:"norA1", io: "3/3"}}},
            { name: "jtA1loop2", type: "Joint", y: 50, relative: { xy: { name: "jtA1loop1"}}},

            { name: "norB1", type:"NorGate", inputs: 3, x:-350, relative: {xy: { name:"norC2"}}},
            { name: "nodeB1", type: "Node", relative: { x: { name:"nodeA2"}, y: { name: "norB1", io: "out"}}},
            { name: "jtB1", type: "Joint", y: 75, relative: { xy: { name: "nodeB1"}}},
            { name: "nodeB1in", type: "Node", x: -50, relative: {xy: { name:"norB1", io: "3/3"}}},
            { name: "jtB1loop2", type: "Joint", y: 50, relative: { xy: { name: "nodeB1in"}}},

            { name: "jtB1in1", type: "Joint", x: -50, relative: {xy: { name:"nodeB1in"}}},
            { name: "jtB1In2", type: "Joint", relative: {x: { name:"jtB1in1"}, y: { name:"norA1", io: "2/3"}}},

            { name: "norB2", type: "NorGate", inputs: 3, y:250, relative: {xy: { name:"norB1"}}},
            { name: "jointB2", type: "Joint", x: 50, relative: { xy: { name: "norB2", io: "out"}}},
            { name: "jtB2", type: "Joint", y: -75, relative: { xy: { name: "jointB2"}}},
            { name: "jtB2loop1", type: "Joint", x: -50, relative: { xy: { name:"norB2", io: "1/3"}}},
            { name: "jtB2loop2", type: "Joint", y: -50, relative: { xy: { name: "jtB2loop1"}}},

            { name: "jtABloop1", type: "Joint", y: 75, relative: {xy: { name:"nodeA2"}}},
            { name: "jtABloop3", type: "Joint", x: -50, relative: {xy: { name:"norB1", io:"1/3"}}},
            { name: "jtABloop2", type: "Joint", y: -50, relative: { xy: { name:"jtABloop3"}}},

            { name: "clearNode", type: "Node", x:-50, relative: { xy: { name:"norA1", io: "1/3"}}},
            { name: "clearJoint1", type: "Joint", y: -50, relative: {xy: { name: "clearNode"}}},
            { name: "clearJoint2", type: "Joint", x: -50, relative: { y: { name:"clearJoint1"}, x: { name:"norC1"}}},
            { name: "clearJoint3", type: "Joint", relative: { x: { name:"clearJoint2"}, y: { name:"norC1", io: "1/3"}}},

            { name: "clkNode", type: "Node", x: -200, relative: { xy: { name: "norB1", io: "2/3"}}},
            { name: "clkJoint", type: "Joint", relative: { x: { name:"clkNode"}, y: { name:"norA2", io: "3/3"}}},
            { name: "clkInv", type: "Inverter", x: -175, scale:0.75, relative: {xy: { name:"clkNode"}}},

            { name: "presetNode", type: "Node", x:-150, relative: {xy: { name:"norA2", io:"2/3"}}},
            { name: "presetNode2", type: "Node", relative: { x: { name:"presetNode" }, y: { name:"norB2", io:"3/3"}}},
            { name: "presetJoint1", type: "Joint", y:50, relative: {xy: { name:"presetNode2"}}},
            { name: "presetJoint2", type: "Joint", x:-50, relative: {y: { name:"presetJoint1"}, x: { name:"norC2", io: "3/3"}}},
            { name: "presetJoint3", type: "Joint", relative: {x: { name:"presetJoint2"}, y: { name:"norC2", io: "3/3"}}}
        ],       
    wires:
        [
            { name: "wireOutC2", points: [ { name:"norC2", io: "out"}, { name: "qbarNode"}]},
            { name: "wireLoopC2", points: [ { name:"qbarNode"}, { name:"jtC2"}, { name: "jtC1loop2"}, { name: "jtC1loop1"}, { name:"norC1", io: "3/3", input: 2}]},

            { name: "wireOutC1", points: [ { name:"norC1", io: "out"}, { name: "qNode"}]},
            { name: "wireLoopC1", points: [ { name:"qNode"}, { name:"jtC1"}, { name: "jtC2loop2"}, { name: "jtC2loop1"}, { name:"norC2", io: "1/3", input: 0}]},

            { name: "wireLoopA1", points: [ { name:"norA1", io: "out"},{ name:"jointA1"}, { name:"jtA1"}, { name: "jtA2loop2"}, { name: "jtA2loop1"}, { name:"norA2", io: "1/3", input: 0}]},

            { name: "wireOutA2", points: [{ name:"norA2", io: "out"}, { name:"nodeA2"}]},
            { name: "wireLoopA2", points: [ { name:"nodeA2"}, { name:"jtA2"}, { name: "jtA1loop2"}, { name: "jtA1loop1"}, { name:"norA1", io: "3/3", input: 2}]},
            { name: "wireAtoC", points: [{ name:"nodeA2"}, { name: "norC1", io: "2/3", input: 1}]},

            { name: "wireOutB1", points: [{ name:"norB1", io: "out"}, { name:"nodeB1"}]},
            { name: "wireLoopB1", points: [ { name:"nodeB1"}, { name:"jtB1"}, { name: "jtB2loop2"}, { name: "jtB2loop1"}, { name:"norB2", io: "1/3", input: 0}]},
            { name: "wireBtoC", points: [{ name:"nodeB1"}, { name: "norC2", io: "2/3", input: 1}]},

            { name: "wireLoopB2", points: [{ name:"norB2", io: "out"}, { name:"jointB2"}, { name:"jtB2"}, { name: "jtB1loop2"}, { name: "nodeB1in"}]},
            { name: "wireLoopB2x", points: [{ name: "nodeB1in"}, { name:"norB1", io: "3/3", input: 2}]},
            { name: "wireLoopB2y", points: [{ name:"nodeB1in"}, { name: "jtB1in1"}, { name: "jtB1In2"}, { name:"norA1", io: "2/3", input: 1}]},

            { name: "wireLoopAB", points: [{ name:"nodeA2"}, { name:"jtABloop1"}, { name:"jtABloop2"}, { name:"jtABloop3"}, { name:"norB1", io: "1/3", input: 0}]},

            { name: "wireClear1", points: [{ name:"clearNode"}, { name: "norA1", io: "1/3", input: 0}]},
            { name:"wireClear2", points: [{ name:"clearNode"}, { name:"clearJoint1"}, { name:"clearJoint2"}, { name:"clearJoint3"}, { name: "norC1", io: "1/3", input: 0}]},

            { name: "wirePreset1", points: [{ name:"presetNode"}, { name:"norA2", io:"2/3", input: 1}]},
            { name: "wirePreset2", points: [{ name:"presetNode"}, { name: "presetNode2"}]},
            { name: "wirePreset3", points: [{ name:"presetNode2"}, { name: "norB2", io: "3/3", input: 2}]},
            { name: "wirePreset4", points: [{ name:"presetNode2"}, { name: "presetJoint1"}, { name: "presetJoint2"}, { name: "presetJoint3"}, { name:"norC2", io: "3/3", input: 2}]},

            { name: "wireClk0", points: [{ name:"clkInv", io: "out"}, { name:"clkNode"}]},
            { name: "wireClk1", points: [{ name:"clkNode"}, { name: "norB1", io: "2/3", input: 1}]},
            { name: "wireClk2", points: [{ name:"clkNode"}, { name: "clkJoint"}, { name:"norA2", io: "3/3", input: 2}]}
        ]
}