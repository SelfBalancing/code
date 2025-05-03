// Chapter08LogicRelaysCommon.json.js (c) Charles Petzold, 2024

let Chapter08LogicRelaysCommon = {
    name: "Chapter08LogicRelaysCommon",
    transform: {x: 200, y: 80, scale: 1, rotate: 0},
    components:
    [
        { name: "relay1", type: "Relay", x: 0, y: 0, scale: 1.5 },
        { name: "switch1", type: "Switch", x:-140, relative: { xy: { name:"relay1", io: "coilIn" }}},
        { name: "v1", type: "V", x: -45, y: -35, relative: { xy: { name:"switch1"}}},
        { name: "jtv1", type: "Joint", relative: { x: { name:"v1"}, y: { name: "switch1"}}},
        { name: "g1", type: "Ground", y: 25, relative: { xy: { name:"relay1", io: "coilOut"}}},

        { name: "relay2", type: "Relay", scale: 1.5, x: 170, y: 150, relative: { xy: { name:"relay1" }}},
        { name: "switch2", type: "Switch", relative: { x: { name:"switch1"}, y: { name: "relay2", io: "coilIn"}}},
        { name: "v2", type: "V", x: -45, y: -35, relative: { xy: { name:"switch2"}}},
        { name: "jtv2", type: "Joint", relative: { x: { name:"v2"}, y: { name: "switch2"}}},
        { name: "g2", type: "Ground", y: 25, relative: { xy: { name:"relay2", io: "coilOut"}}}
    ],
    wires:
    [
        { name: "wireV1", points: [ { name:"v1" }, { name:"jtv1"}, { name:"switch1" } ]},
        { name: "wireS1", points: [ { name:"switch1", io: "out"}, { name:"relay1", io: "coilIn"}]},
        { name: "wireG1", points: [ { name:"relay1", io: "coilOut"}, { name:"g1" }]},

        { name: "wireV2", points: [ { name:"v2" }, { name:"jtv2"}, { name:"switch2" } ]},
        { name: "wireS2", points: [ { name:"switch2", io: "out"}, { name:"relay2", io: "coilIn"}]},
        { name: "wireG2", points: [ { name:"relay2", io: "coilOut"}, { name:"g2" }]}
    ],
}