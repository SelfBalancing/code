// Chapter17HoldFlipFlop (c) Charles Petzold, 2024

let Chapter17HoldFlipFlop = 
{
    name: "Chapter17HoldFlipFlop",
    transform: { x: 500, y: 100, scale: 1, rotate: 0 },
    propagationDelay: 10,
    components:
        [
            { name: "coreD", type: "External", file: "Chapter17FlipFlopCoreD" },

            { name:"buttonR", type:"MomentaryButton", x:-200, relative: { xy: { name:"coreD.and1", io:"A" }}},
            { name:"buttonS", type:"MomentaryButton", relative: { x: { name:"buttonR"}, y: { name:"coreD.and2", io:"B" }}},
            { name:"buttonH", type:"DigitButton", relative: { x: { name:"buttonR"}, y: { name:"coreD.node" }}},

            { name:"reset", type:"Label", text:"Reset", y:45, relative: { xy: { name:"buttonR" }}},
            { name:"set", type:"Label", text: "Set", y:45, relative: { xy: { name: "buttonS" }}},
            { name:"hold", type:"Label", text: "Hold", y:45, relative: { xy: { name: "buttonH" }}},

            { name:"light1", type:"BitLight", x:100, relative: { xy: { name:"coreD.coreRS.node1" }}},
            { name:"light2", type:"BitLight", relative: { x: { name:"light1" }, y: { name:"coreD.coreRS.node2"}}},

            { name:"q", type:"Label", text: "Q", x:60, relative: { xy: { name:"light1" }}},
            { name:"qbar", type:"Label", text: "Q\u0305", x:60, relative: { xy: { name:"light2" }}}
        ],       

    wires:
        [
            { points: [ { name:"buttonR", io:"right" }, { name:"coreD.and1", io:"A", input:0 }]},
            { points: [ { name:"buttonS", io:"right" }, { name:"coreD.and2", io:"B", input:1 }]},
            { points: [ { name:"buttonH", io:"right" }, { name:"coreD.node" }]},

            { points:[ { name:"coreD.coreRS.node1" }, { name:"light1", io:"inp" } ] },
            { points:[ { name:"coreD.coreRS.node2" }, { name:"light2", io:"inp" } ] }
        ]
}