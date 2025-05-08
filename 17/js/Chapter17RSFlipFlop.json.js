// Chapter17RSFlipFlop (c) Charles Petzold, 2024

let Chapter17RSFlipFlop = 
{
    name: "Chapter17RSFlipFlop",
    transform: { x: 220, y: 80, scale: 1, rotate: 0 },
    propagationDelay: 10,
    components:
        [
            { name: "core", type: "External", file: "Chapter17FlipFlopCoreRS" },

            { name:"button1", type:"MomentaryButton", x:-150, relative: { xy: { name:"core.nor1", io:"A" }}},
            { name:"button2", type:"MomentaryButton", relative: { x: { name:"button1"}, y: { name:"core.nor2", io:"B" }}},

            { name:"reset", type:"Label", text:"Reset", y:45, relative: { xy: { name:"button1" }}},
            { name:"set", type:"Label", text: "Set", y:45, relative: { xy: { name: "button2" }}},

            { name:"light1", type:"BitLight", x:100, relative: { xy: { name:"core.node1" }}},
            { name:"light2", type:"BitLight", relative: { x: { name:"light1" }, y: { name:"core.node2"}}},

            { name:"q", type:"Label", text: "Q", x:60, relative: { xy: { name:"light1" }}},
            { name:"qbar", type:"Label", text: "Q\u0305", x:60, relative: { xy: { name:"light2" }}}
        ],       

    wires:
        [
            { points: [ { name:"button1", io:"right" }, { name:"core.nor1", io:"A", input:0 }]},
            { points: [ { name:"button2", io:"right" }, { name:"core.nor2", io:"B", input:1 }]},
            
            { points:[ { name:"core.node1" }, { name:"light1", io:"inp" } ] },
            { points:[ { name:"core.node2" }, { name:"light2", io:"inp" } ] }
        ]
}