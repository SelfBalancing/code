// Chapter18BinaryClock (c) Charles Petzold, 2024

let Chapter18BinaryClock = 
{
    name: "Chapter18BinaryClock",
    transform: { x: 0, y: 180, scale: 1, rotate: 0 },
    wireCurveRadius: 10,
    nodeRadius: 4,
    propagationDelay: 50,
    components:
        [
            { name: "seconds", type: "External", file: "Chapter18TwoDigits"},
            { name: "minutes", type: "External", file: "Chapter18TwoDigits", y: 350},
            { name: "hours", type: "External", file: "Chapter18HoursLights", x: 450, y: 925},
            { name: "ampm", type: "External", file: "Chapter18AmPm", x:60, y: 925},

            { name: "osc", type: "External", file: "Chapter18Oscillator", x:1115, y:-50},
            { name: "oscJoint", type: "Joint", relative: { x: { name:"seconds.low.lowBase.ff0.clkJoint"}, y: { name:"osc.oscNode"}}},

            { name: "carryJoint2", type: "Joint", relative: {y: { name:"seconds.high.carryHighJoint1"}, x: { name:"oscJoint"}}},
            { name: "carryJoint4", type: "Joint", relative: {y: { name:"minutes.high.carryHighJoint1"}, x: { name:"minutes.low.lowBase.ff0.clkJoint"}}},
            { name: "carryJoint5", type: "Joint", relative: {x: { name:"carryJoint4"}, y: { name:"hours.hours.core.low.lowBase.ff0.clkJoint"}}},

            { name: "lightAmPm", type: "BitLight", y: -375, relative: {xy: { name:"ampm.ff.qJoint"}}},
            { name: "carryAmPmJoint", type: "Joint", relative: {y: { name:"hours.hours.core.nandTensCarry", io: "out"}, x: { name:"ampm.ff.clkJoint"}}}
        ],  
    wires:
        [
            { points: [{ name:"osc.oscNode"}, { name:"oscJoint"}, { name:"seconds.low.lowBase.ff0.clkJoint"}, { name:"seconds.low.lowBase.ff0.ff", io: "Clk", input: "clk"}]},

            { points: [{ name:"seconds.high.nandHigh", io: "out"}, { name:"seconds.high.carryHighJoint0"}, { name:"seconds.high.carryHighJoint1"}, { name:"carryJoint2"}, { name:"minutes.low.lowBase.ff0.clkJoint"}, { name:"minutes.low.lowBase.ff0.ff", io: "Clk", input: "clk"}]},

            { points: [{ name:"minutes.high.nandHigh", io: "out"}, { name:"minutes.high.carryHighJoint0"}, { name:"minutes.high.carryHighJoint1"}, { name:"carryJoint4"}, { name:"carryJoint5"}, { name:"hours.hours.core.low.lowBase.ff0.ff", io: "Clk", input: "clk"}]},

            { points: [{ name:"hours.hours.core.nandTensCarry", io: "out"}, { name:"carryAmPmJoint"}, { name:"ampm.ff.clkJoint"}, { name:"ampm.ff.ff", io: "Clk", input: "clk"}]},
            
            { points: [{ name:"ampm.ff.ff", io: "Q", output: "q"}, { name:"ampm.ff.qJoint"}, { name:"lightAmPm", io: "bottom"}]}
        ]    
}