// Chapter17EdgeTriggeredFlipFlopWithClear (c) Charles Petzold, 2024

let Chapter17EdgeTriggeredFlipFlopWithClear = 
{
    name: "Chapter17EdgeTriggeredFlipFlopWithClear",
    transform: { x: 520, y: 250, scale: 1, rotate: 0 },
    wireCurveRadius: 20,
    propagationDelay: 100,
    components:
        [
            { name: "core", type: "External", file: "Chapter17FlipFlopCoreClearPreset", scale: 0.5 },

            { name:"buttonClk", type:"DigitButton", x: -100, relative: {  xy: { name:"core.clkInv" }}},
            { name:"buttonClear", type:"DigitButton", relative: { x: { name:"buttonClk"}, y: { name:"core.clearNode" }}},
            { name:"buttonPreset", type: "DigitButton", relative: {x: { name:"buttonClk"}, y: { name:"core.presetNode"}}},
            { name:"buttonData", type:"DigitButton", relative: { x: { name:"buttonClk"}, y: { name:"core.norB2", io: "2/3" }}},

            { name:"clear", type:"Label", text: "Clear", y:45, relative: { xy: { name: "buttonClear" }}},
            { name:"preset", type:"Label", text: "Preset", y:45, relative: { xy: { name: "buttonPreset" }}},
            { name:"clk", type:"Label", text: "Clock", y:45, relative: { xy: { name: "buttonClk" }}},
            { name:"data", type:"Label", text:"Data", y:45, relative: { xy: { name:"buttonData" }}},

            { name:"light1", type:"BitLight", x:100, relative: { xy: { name:"core.qNode" }}},
            { name:"light2", type:"BitLight", relative: { x: { name:"light1" }, y: { name:"core.qbarNode"}}},

            { name:"q", type:"Label", text: "Q", x:60, relative: { xy: { name:"light1" }}},
            { name:"qbar", type:"Label", text: "Q\u0305", x:60, relative: { xy: { name:"light2" }}}
        ],       

    wires:
        [
            { points: [ { name:"buttonClear", io: "right"}, { name:"core.clearNode"}]},
            { points: [ { name:"buttonPreset", io: "right"}, { name:"core.presetNode"}]},
            { points: [ { name:"buttonClk", io:"right" }, { name:"core.clkInv" }]},
            { points: [ { name:"buttonData", io: "right"}, { name: "core.norB2", io: "2/3", input: 1}]},

            { points:[ { name:"core.qNode" }, { name:"light1", io:"inp" } ] },
            { points:[ { name:"core.qbarNode" }, { name:"light2", io:"inp" } ] }
        ]
}