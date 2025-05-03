// Chapter08NorLogicRelays.json.js (c) Charles Petzold, 2024

let Chapter08NorLogicRelays = {
    name: "Chapter08NorLogicRelays",
    transform: {x: 200, y: 80, scale: 1, rotate: 0},
    propagationDelay: 100,
    testable: true,
    components:
    [
        { name: "common", type: "External", file: "Chapter08LogicRelaysCommon"},

        { name: "vTop", type: "V", y:-40, relative: { xy: { name:"common.relay1", io: "pivot" }}},
        { name: "jtMid", type: "Joint", relative: { x: { name:"common.relay2", io: "pivot"}, y: { name:"common.relay1", io: "out0"}}},

        { name: "light", type: "Lightbulb", x:250, y: 120, relative: {x: { name: "common.relay2"}, y: { name:"common.relay1"}}},
        { name: "jtLight", type: "Joint", relative: { x: { name: "light", io: "left" }, y: { name:"common.relay2", io:"out0"}}},
        { name: "gLight", type: "Ground", y: 100, relative: {xy: { name: "light", io: "right"}}}
    ],
    wires:
    [
        { name: "wireV", points: [ { name:"vTop"}, { name:"common.relay1", io: "pivot" }]},
        { name: "wireMid", points: [ { name:"common.relay1", io: "out0"}, { name: "jtMid"}, { name: "common.relay2", io: "pivot"}]},
        { name: "wireLt", points: [ { name:"common.relay2", io: "out0"}, { name: "jtLight"}, { name: "light", io: "left"}]},

        { name: "wireG", points: [ { name:"light", io: "right"}, { name: "gLight"}]}
    ]
}
