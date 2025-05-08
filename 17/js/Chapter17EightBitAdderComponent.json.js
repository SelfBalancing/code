// Chapter17EightBitAdderComponent (c) Charles Petzold, 2024

let Chapter17EightBitAdderComponent = 
{
    name: "Chapter17EightBitComponent",
    components:
    [
        { name: "fuller", type: "External", file: "Chapter14OneBitFuller", scale: 0.20, rotate: 90, x:0, y: 0},

        { name: "latch", type: "External", file: "Chapter17FlipFlopCoreEdge", scale:0.20, rotate: 90,
                x: -45, y: 420, relative: { xy: { name: "fuller"}}},

        { name: "button", type: "DigitButton", y:-50, relative: {xy: { name: "fuller.halfer1.nodeB2"}}},

        { name: "dJoint1", type: "Joint", y: 20, relative: { xy: { name:"fuller.halfer2.summer.and", io: "out"}}},
        { name: "dJoint2", type: "Joint", relative: { y: { name:"dJoint1"}, x: { name:"latch.dNode"}}},

        { name: "light", type: "BitLight", y: 50, relative: { xy: { name: "latch.coreD2.coreRS.node1"}}},
        { name: "outJoint2", type: "Joint", x: 20, relative: { xy: { name: "fuller.halfer1.nodeA1"}}},
        { name: "outJoint1", type: "Joint", relative: { x: { name:"outJoint2"}, y: { name:"latch.coreD2.coreRS.node1"}}},
        
        { name: "clkNode", type: "Node", y:-25, relative: { xy: { name:"latch.clkNode"}}},

        { name: "jtCarry1", type: "Joint", y: 10, relative: {xy: { name: "fuller.carryOr", io: "out"}}},
        { name: "jtCarry2", type: "Joint", x:-20, relative: {xy: { name: "jtCarry1"}}},
        { name: "jtCarry3", type: "Joint", x:30, relative: { xy: { name:"fuller.halfer2.nodeA1"}}}
    ],
    wires:
    [
        { points: [ { name:"button", io: "bottom"}, { name:"fuller.halfer1.nodeB2"}]},
        { points: [ { name:"fuller.halfer1.nodeB2"}, { name: "fuller.halfer1.jt0"}, { name: "fuller.halfer1.summer.or", io: "B", input: 1}]},

        { points: [ { name:"fuller.halfer2.summer.and", io: "out"}, { name:"dJoint1"}, { name:"dJoint2"}, { name:"latch.dNode"}]},

        { points: [ { name:"clkNode"}, { name: "latch.clkNode"}]},
      
        { points: [ { name:"latch.coreD2.coreRS.node1"}, { name:"light", io: "top"}]},
        { points: [ { name:"latch.coreD2.coreRS.node1"}, { name:"outJoint1"}, { name:"outJoint2"}, { name: "fuller.halfer1.nodeA1"}]}
    ]
}
