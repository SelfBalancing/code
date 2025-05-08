// Chapter17EdgeTriggeredFlipFlop (c) Charles Petzold, 2024

let Chapter17EdgeTriggeredFlipFlop = 
{
    name: "Chapter17EdgeTriggeredFlipFlop",
    transform: { x: 400, y: 105, scale: 1, rotate: 0 },
    wireCurveRadius: 10,
    propagationDelay: 100,
    components:
        [
            { name: "coreEdge", type: "External", file: "Chapter17FlipFlopCoreEdge", scale: 0.5 },

            { name:"buttonData", type:"DigitButton", x:-100, relative: { xy: { name:"coreEdge.dNode" }}},
            { name:"buttonClk", type:"DigitButton", relative: { x: { name:"buttonData"}, y: { name:"coreEdge.clkNode" }}},

            { name:"data", type:"Label", text:"Data", y:45, relative: { xy: { name:"buttonData" }}},
            { name:"clk", type:"Label", text: "Clock", y:45, relative: { xy: { name: "buttonClk" }}},

            { name:"light1", type:"BitLight", x:100, relative: { xy: { name:"coreEdge.coreD2.coreRS.node1" }}},
            { name:"light2", type:"BitLight", relative: { x: { name:"light1" }, y: { name:"coreEdge.coreD2.coreRS.node2"}}},

            { name:"q", type:"Label", text: "Q", x:60, relative: { xy: { name:"light1" }}},
            { name:"qbar", type:"Label", text: "Q\u0305", x:60, relative: { xy: { name:"light2" }}}
        ],       

    wires:
        [
            { points: [ { name:"buttonData", io: "right"}, { name: "coreEdge.dNode"}]},
            { points: [ { name:"buttonClk", io:"right" }, { name:"coreEdge.clkNode" }]},

            { points:[ { name:"coreEdge.coreD2.coreRS.node1" }, { name:"light1", io:"inp" } ] },
            { points:[ { name:"coreEdge.coreD2.coreRS.node2" }, { name:"light2", io:"inp" } ] }
        ]
}