// Chapter18NixieDisplay (c) Charles Petzold, 2024

let Chapter18NixieDisplay = 
{
    name: "Chapter18NixieDisplay",
    transform: { x: 0, y: 0, scale: 1, rotate: 0 },
    wireCurveRadius: 5,
    nodeRadius: 4,
    components:
        [
            { name: "nixie", type: "External", file: "Chapter18NixieDecoder", scale: 1.75, x: 360, y: 475},
            { name: "digit", type: "External", file: "Chapter18LowReset", x: 50, y: 850},
            { name: "osc", type: "External", file: "Chapter18Oscillator", x: 600, y: 800},

            { name: "oscJoint", type: "Joint", relative: { x: { name:"digit.lowBase.ff0.clkJoint"}, y: { name:"osc.oscNode"}}},

            { name: "ff1Joint", type: "Joint", relative: {x: { name:"nixie.decoder.node1"}, y: { name:"digit.low1ClearNode"}}},
            { name: "ff2Joint1", type: "Joint", y: -75, relative: {xy: { name:"digit.lowBase.ff2.qJoint"}}},
            { name: "ff2Joint2", type: "Joint", relative: {y: { name:"ff2Joint1"}, x: { name:"nixie.decoder.node2"}}},
            { name: "ff3Joint", type: "Joint", relative: {y: { name:"digit.low3ClearNode"}, x: { name:"nixie.decoder.node3"}}}
      
        ],
    wires: [
        { points: [ { name:"osc.oscNode"}, { name:"oscJoint"}, { name:"digit.lowBase.ff0.clkJoint"}, { name:"digit.lowBase.ff0.ff", io: "Clk", input: "clk"}]},
        { points: [ { name:"digit.lowBase.ff0.ff", io: "Q", output: "q"}, { name:"digit.lowBase.ff0.qJoint"}, { name:"nixie.decoder.node0"}]},
        { points: [ { name:"digit.low1ClearNode"}, { name:"ff1Joint"}, { name:"nixie.decoder.node1"}]},
        { points: [ { name:"digit.lowBase.ff2.ff", io: "Q", output: "q"}, { name:"digit.lowBase.ff2.qJoint"}, { name:"ff2Joint1"}, { name:"ff2Joint2"}, { name:"nixie.decoder.node2"}]},
        { points: [ { name:"digit.low3ClearNode"}, { name:"ff3Joint"}, { name:"nixie.decoder.node3"}]}
    ]
}
