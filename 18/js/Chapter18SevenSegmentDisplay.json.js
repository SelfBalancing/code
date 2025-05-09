// Chapter18SevenSegmentDisplay (c) Charles Petzold, 2024

let Chapter18SevenSegmentDisplay = 
{
    name: "Chapter18SevenSegmentDisplay",
    transform: { x: 0, y: 125, scale: 1, rotate: 0 },
    wireCurveRadius: 5,
    nodeRadius: 4,
    components:
        [
            { name: "decoder", type: "External", file: "Chapter18SevenSegmentDecoder", x: 360, y: 475},
            { name: "digit", type: "External", file: "Chapter18LowReset", x: 50, y: 850},
            { name: "osc", type: "External", file: "Chapter18Oscillator", x: 600, y: 800},

            { name: "oscJoint", type: "Joint", relative: { x: { name:"digit.lowBase.ff0.clkJoint"}, y: { name:"osc.oscNode"}}},

            { name: "ff1Joint", type: "Joint", relative: {x: { name:"decoder.bcd.node1"}, y: { name:"digit.low1ClearNode"}}},
            { name: "ff2Joint1", type: "Joint", y: -75, relative: {xy: { name:"digit.lowBase.ff2.qJoint"}}},
            { name: "ff2Joint2", type: "Joint", relative: {y: { name:"ff2Joint1"}, x: { name:"decoder.bcd.node2"}}},
            { name: "ff3Joint", type: "Joint", relative: {y: { name:"digit.low3ClearNode"}, x: { name:"decoder.bcd.node3"}}}
      
        ],
    wires: [
        { points: [ { name:"osc.oscNode"}, { name:"oscJoint"}, { name:"digit.lowBase.ff0.clkJoint"}, { name:"digit.lowBase.ff0.ff", io: "Clk", input: "clk"}]},
        { points: [ { name:"digit.lowBase.ff0.ff", io: "Q", output: "q"}, { name:"digit.lowBase.ff0.qJoint"}, { name:"decoder.bcd.node0"}]},
        { points: [ { name:"digit.low1ClearNode"}, { name:"ff1Joint"}, { name:"decoder.bcd.node1"}]},
        { points: [ { name:"digit.lowBase.ff2.ff", io: "Q", output: "q"}, { name:"digit.lowBase.ff2.qJoint"}, { name:"ff2Joint1"}, { name:"ff2Joint2"}, { name:"decoder.bcd.node2"}]},
        { points: [ { name:"digit.low3ClearNode"}, { name:"ff3Joint"}, { name:"decoder.bcd.node3"}]}
    ]
}
