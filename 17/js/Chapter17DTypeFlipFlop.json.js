// Chapter17DTypeFlipFlop (c) Charles Petzold, 2024

let Chapter17DTypeFlipFlop = 
{
    name: "Chapter17DTypeFlipFlop",
    transform: { x: 500, y: 100, scale: 1, rotate: 0 },
    propagationDelay: 10,
    components:
        [
            { name: "coreD", type: "External", file: "Chapter17FlipFlopCoreD" },

            { name: "node", type: "Node", x: -120, relative: { xy: { name: "coreD.and2", io: "B"}}},
            { name: "inv", type: "Inverter", y: -50, scale:0.5, rotate: -90, relative: { xy: { name:"node"}}},
            { name: "joint", type: "Joint", relative: { x: { name:"inv"}, y: { name: "coreD.and1", io: "A"}}},

            { name:"buttonData", type:"DigitButton", x:-200, relative: { xy: { name:"coreD.and2", io:"B" }}},
            { name:"buttonClk", type:"DigitButton", relative: { x: { name:"buttonData"}, y: { name:"coreD.node" }}},

            { name:"data", type:"Label", text:"Data", y:45, relative: { xy: { name:"buttonData" }}},
            { name:"clk", type:"Label", text: "Clock", y:45, relative: { xy: { name: "buttonClk" }}},

            { name:"light1", type:"BitLight", x:100, relative: { xy: { name:"coreD.coreRS.node1" }}},
            { name:"light2", type:"BitLight", relative: { x: { name:"light1" }, y: { name:"coreD.coreRS.node2"}}},

            { name:"q", type:"Label", text: "Q", x:60, relative: { xy: { name:"light1" }}},
            { name:"qbar", type:"Label", text: "Q\u0305", x:60, relative: { xy: { name:"light2" }}}
        ],       

    wires:
        [
            { points: [ { name:"buttonClk", io:"right" }, { name:"coreD.node" }]},
            { points: [ { name:"buttonData", io: "right"}, { name: "node"}]},
            { name:"wireToInv", points: [ { name:"node"}, { name:"inv"}]},
            { name: "wireInv", points: [ { name:"inv", io: "out"}, { name:"joint"}, { name:"coreD.and1", io: "A", input: 0}]},
            { name: "wireToAnd2B", points: [ { name: "node"}, { name: "coreD.and2", io: "B", input: 1}]},

            { points:[ { name:"coreD.coreRS.node1" }, { name:"light1", io:"inp" } ] },
            { points:[ { name:"coreD.coreRS.node2" }, { name:"light2", io:"inp" } ] }
        ]
}