// Chapter17DTypeFlipFlopWithClear (c) Charles Petzold, 2024

let Chapter17DTypeFlipFlopWithClear = 
{
    name: "Chapter17DTypeFlipFlopWithClear",
    transform: { x: 640, y: 120, scale: 1, rotate: 0 },
    propagationDelay: 100,
    components:
        [
            { name: "coreD", type: "External", file: "Chapter17FlipFlopCoreDClear", scale: 0.75 },

            { name: "node", type: "Node", x: -120, relative: { xy: { name: "coreD.and2", io: "B"}}},
            { name: "inv", type: "Inverter", y: -50, scale:0.5, rotate: -90, relative: { xy: { name:"node"}}},
            { name: "joint", type: "Joint", relative: { x: { name:"inv"}, y: { name: "coreD.and1", io: "A"}}},

            { name:"buttonData", type:"DigitButton", x:-200, relative: { xy: { name:"coreD.and2", io:"B" }}},
            { name:"buttonClk", type:"DigitButton", relative: { x: { name:"buttonData"}, y: { name:"coreD.node" }}},

            { name:"orJoint2", type: "Joint", x:-50, relative: { xy: { name:"coreD.or", io:"A"}}},
            { name:"orJoint1", type: "Joint", y:-40, relative: { xy: { name:"orJoint2"}}},
            { name:"buttonClear", type:"DigitButton", relative: {x: { name: "buttonData"}, y: { name:"orJoint1" }}},

            { name:"data", type:"Label", text:"Data", y:45, relative: { xy: { name:"buttonData" }}},
            { name:"clk", type:"Label", text: "Clock", y:45, relative: { xy: { name: "buttonClk" }}},
            { name:"clear", type:"Label", text: "Clear", y:45, relative: { xy: { name: "buttonClear" }}},

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

            { name: "wireClear", points: [ { name:"buttonClear", io: "right"}, { name: "orJoint1"}, { name: "orJoint2"}, { name: "coreD.or", io: "A", input: 0}]},

            { points:[ { name:"coreD.coreRS.node1" }, { name:"light1", io:"inp" } ] },
            { points:[ { name:"coreD.coreRS.node2" }, { name:"light2", io:"inp" } ] }
        ]
}