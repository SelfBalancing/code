// Chapter17OscillatingRelay (c) Charles Petzold, 2024

let Chapter17OscillatingRelay = {
    name: "Chapter17OscllatingRelay",
    transform: {x: 220, y: 30, scale: 1, rotate: 0},
    propagationDelay: 250,
    testable: true,
    components:
    [
        { name: "relay", type: "Relay", scale: 1.5, x: 0, y: 0 },
        { name: "switch", type: "Switch", x:-140, relative: { xy: { name:"relay", io: "coilIn" }}},
        { name: "battery", type: "Battery", x:50, y: 50, relative: { xy: { name:"relay", io: "coilOut"}}},

        { name: "joint1", type: "Joint", x: 50, relative: { xy: { name:"relay", io: "out0" }}},
        { name: "joint2", type: "Joint", relative: { x: { name:"joint1"}, y: { name:"battery"}}},
        { name: "joint3", type: "Joint", relative: { x: { name:"relay", io: "coilOut"}, y: { name:"battery"}}},

        { name: "joint4", type: "Joint", x:-50, relative: { xy: { name:"switch" }}},
        { name: "joint5", type: "Joint", relative: { x: { name:"joint4"}, y: { name:"relay", io: "pivotSide"}}}

    ],
    wires:
    [
        { name: "wire1", points: [ { name:"relay", io: "out0"}, { name:"joint1"}, { name:"joint2"}, { name:"battery", io: "pos"}]},
        { name: "wire2", points: [{ name:"battery", io: "neg"}, { name:"joint3"}, { name:"relay", io: "coilOut"}]},
        { name: "wire3", points: [{ name:"relay", io: "coilIn"}, { name:"switch", io: "out"}]},
        { name: "wire4", points: [{ name:"switch", io: "left"}, { name:"joint4"}, { name:"joint5"}, { name:"relay", io: "pivotSide"}]}
    ]
}
