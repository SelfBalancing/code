// Chapter08NandLogicRelays.json.js (c) Charles Petzold, 2024

let Chapter08NandLogicRelays = {
    name: "Chapter08NandLogicRelays",
    transform: {x: 200, y: 100, scale: 1, rotate: 0},
    propagationDelay: 100,
    testable: true,
    components:
    [
        { name: "common", type: "External", file: "Chapter08LogicRelaysCommon"},

        { name: "vTop1", type: "V", y:-40, relative: { xy: { name:"common.relay1", io: "pivot" }}},
        { name: "vTop2", type: "V", y:-40, relative: { xy: { name:"common.relay2", io: "pivot"}}},

        { name: "outNode", type: "Node", x: 50, y:-75, relative: { xy: { name: "common.relay2", io: "out1"}}},
        { name: "jt1", type: "Joint", relative: { x: { name:"outNode"}, y: { name: "common.relay1", io: "out0"}}},
        { name: "jt2", type: "Joint", relative: { x: { name:"outNode"}, y: { name: "common.relay2", io: "out0"}}},

        { name: "light", type: "Lightbulb", x:100, y: -50, relative: {xy: { name: "outNode"}}},
        { name: "jtLight", type: "Joint", relative: { x: { name: "light", io: "left" }, y: { name:"outNode"}}},
        { name: "gLight", type: "Ground", y: 100, relative: {xy: { name: "light", io: "right"}}}
    ],
    wires:
    [
        { name: "wireV1", points: [ { name:"vTop1"}, { name:"common.relay1", io: "pivot" }]},
        { name: "wireV2", points: [ { name:"vTop2"}, { name:"common.relay2", io: "pivot" }]},

        { name: "wireNode1", points: [ { name:"common.relay1", io: "out0"}, { name: "jt1"}, { name: "outNode"}]},
        { name: "wireNode2", points: [ { name:"common.relay2", io: "out0"}, { name: "jt2"}, { name: "outNode"}]},
        { name: "wireLt", points: [ { name:"outNode"}, { name:"jtLight"}, { name:"light", io: "left" }]},

        { name: "wireG", points: [ { name:"light", io: "right"}, { name: "gLight"}]}
    ]
}