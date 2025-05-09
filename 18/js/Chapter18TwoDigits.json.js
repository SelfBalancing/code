// Chapter18TwoDigits (c) Charles Petzold, 2024

let Chapter18TwoDigits = 
{
    name: "Chapter18TwoDigits",
    components:
    [
        { name: "low", type: "External",file: "Chapter18LowDigit", x:560 },
        { name: "high", type: "External", file: "Chapter18HighDigit", x:45},

        { name: "carryLowHighJoint", type: "Joint", relative: {y: { name:"low.nandLow", io: "out"}, x: { name:"high.ff4.clkJoint"}}},

        { name: "light0", type: "BitLight", y: -160, relative: {xy: { name:"low.lowBase.ff0.qJoint"}}},
        { name: "light1", type: "BitLight", y: -160, relative: {xy: { name:"low.lowBase.ff1.qJoint"}}},
        { name: "light2", type: "BitLight", y: -160, relative: {xy: { name:"low.lowBase.ff2.qJoint"}}},
        { name: "light3", type: "BitLight", y: -160, relative: {xy: { name:"low.lowBase.ff3.qJoint"}}},

        { name: "light4", type: "BitLight", y: -160, relative: {xy: { name:"high.ff4.qJoint"}}},
        { name: "light5", type: "BitLight", y: -160, relative: {xy: { name:"high.ff5.qJoint"}}},
        { name: "light6", type: "BitLight", y: -160, relative: {xy: { name:"high.ff6.qJoint"}}}
    ],
    wires:
    [
        { points: [{ name:"low.andLow", io: "out"}, { name:"low.andLowJoint"}, { name:"low.clrJoint"}, { name:"low.clrNode3"}]},
        { points: [{ name:"low.nandLow", io: "out"}, { name:"carryLowHighJoint"}, { name:"high.ff4.clkJoint"}, { name:"high.ff4.ff", io: "Clk", input: "clk"}]},

        { points: [{ name:"low.low0CarryNode"}, { name:"light0", io: "bottom"}]},
        { points: [{ name:"low.low1ClearNode"}, { name:"light1", io: "bottom"}]},
        { points: [{ name:"low.lowBase.ff2.ff", io: "Q", output: "q"}, { name:"low.lowBase.ff2.qJoint"}, { name:"light2", io: "bottom"}]},
        { points: [{ name:"low.low3CarryNode"}, { name:"light3", io: "bottom"}]},

        { points: [{ name:"high.high4CarryNode"}, { name:"light4", io: "bottom"}]},
        { points: [{ name:"high.high5ClearNode"}, { name:"light5", io: "bottom"}]},
        { points: [{ name:"high.high6CarryNode"}, { name:"light6", io: "bottom"}]}
    ]
}