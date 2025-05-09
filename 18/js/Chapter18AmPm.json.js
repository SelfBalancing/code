// Chapter18AmPm (c) Charles Petzold, 2024
// ©️自权的SPACE 2025 汉化

let Chapter18AmPm = 
{
    name: "Chapter18AmPm",
    transform: { x: 0, y: 0, scale: 1, rotate: 0 },
    components:
    [
        { name: "ff", type: "External", file: "Chapter18FlipFlop"},

        { name: "ampmLoopJoint3", type: "Joint", x: -15, relative: {xy: { name:"ff.ff", io: "Q|OL"}}},
        { name: "ampmLoopJoint2", type: "Joint", relative: {x: { name:"ampmLoopJoint3"}, y: { name:"ff.loopJoint2"}}}
    ],
    wires:
    [
        { points: [{ name:"ff.ff", io: "Q|OL", output: "qbar"}, { name:"ampmLoopJoint3"}, { name:"ampmLoopJoint2"}, { name: "ff.loopJoint1"}, { name:"ff.dJoint"}, { name:"ff.ff", io: "D", input: "data"}]}
    ]
}