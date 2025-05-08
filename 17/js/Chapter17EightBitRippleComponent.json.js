// Chapter17EightBitRippleComponent (c) Charles Petzold, 2024

let Chapter17EightBitRippleComponent = 
{
    name: "Chapter17EightBitRippleComponent",
    components:
        [
            { name: "coreEdge", type: "External", file: "Chapter17FlipFlopCoreEdge", x: -280, y: 150, scale: 0.25, rotate: 90 },

            { name: "dataClockNode", type: "Node", x: -25, y: 0, relative: { x: { name:"coreEdge.dNode"}, y: { name:"coreEdge.clkNode"}}},
            { name: "qbarJoint1", type: "Joint", relative: { x: { name:"dataClockNode" }, y: { name:"coreEdge.coreD2.coreRS.node2"}}},
            { name: "dJoint", type: "Joint", relative: { x: { name:"coreEdge.dNode"}, y: { name: "dataClockNode"}}},

            { name:"clk", type:"Label", text: "Clk", size: 0.5, x:-15, y:-7, relative: { xy: { name: "coreEdge.clkNode" }}},
            { name:"data", type:"Label", text:"Data", size: 0.5, x:15, y:-7, relative: { xy: { name:"coreEdge.dNode" }}},

            { name:"light", type:"BitLight", y:75, relative: { xy: { name:"coreEdge.coreD2.coreRS.node1" }}},

            { name:"q", type:"Label", text: "Q", size:0.5, x:-8, y:13, relative: { xy: { name:"coreEdge.coreD2.coreRS.node1" }}},
            { name:"qbar", type:"Label", text: "Q\u0305", size:0.5, x:0, y:13, relative: { xy: { name:"coreEdge.coreD2.coreRS.node2" }}}
        ],       

    wires:
        [
            { points:[ { name:"coreEdge.coreD2.coreRS.node1" }, { name:"light", io:"top" } ] },
            { points:[ { name:"coreEdge.coreD2.coreRS.node2" }, { name:"qbarJoint1" }, { name: "dataClockNode"}]},
            { points:[ { name:"dataClockNode"}, { name:"dJoint"}, { name:"coreEdge.dNode"}]}
        ]
}