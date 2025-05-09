// Chapter18SettableBinaryClock (c) Charles Petzold, 2024

let Chapter18SettableBinaryClock = 
{
    name: "Chapter18SettableBinaryClock",
    transform: { x: 0, y: 180, scale: 1, rotate: 0 },
    wireCurveRadius: 10,
    nodeRadius: 4,
    propagationDelay: 50,
    components:
        [
            { name: "osc", type: "External", file: "Chapter18Oscillator", x:1200, y:-50},
            { name: "seconds", type: "External", file: "Chapter18TwoDigits", x: 75},
            { name: "minutes", type: "External", file: "Chapter18TwoDigits", x: 75, y: 425},
            { name: "hours", type: "External", file: "Chapter18HoursLights", x: 525, y: 1075},
            { name: "ampm", type: "External", file: "Chapter18AmPm", x: 135, y: 1075},

            { name: "oscJoint", type: "Joint", relative: { x: { name:"seconds.low.lowBase.ff0.clkJoint"}, y: { name:"osc.oscNode"}}},

            { name: "minsetXor", type: "XorGate", x:100, y:30, scale: 0.50, relative: {xy: { name: "seconds.high.carryHighJoint1"}}},
            { name: "minSetButton", type: "MomentaryButton", x:-50, relative: {x: { name: "seconds.high.carryHighJoint1"}, y: { name:"minsetXor", io: "B"}}},

            { name: "carryJoint1", type: "Joint", relative: { x: { name:"seconds.high.carryHighJoint1"}, y: { name:"minsetXor", io: "A"}}},
            { name: "carryJoint2", type: "Joint", relative: {y: { name:"minsetXor", io: "out"}, x: { name:"oscJoint"}}},

            { name: "hoursetXor", type: "XorGate", x:100, y:30, scale: 0.50, relative: {xy: { name: "minutes.high.carryHighJoint1"}}},
            { name: "hourSetButton", type: "MomentaryButton", x:-50, relative: {x: { name: "minutes.high.carryHighJoint1"}, y: { name:"hoursetXor", io: "B"}}},

            { name: "carryJoint3", type: "Joint", relative: { x: { name:"minutes.high.carryHighJoint1"}, y: { name:"hoursetXor", io: "A"}}},
            { name: "carryJoint4", type: "Joint", relative: {y: { name:"hoursetXor", io: "out"}, x: { name:"minutes.low.lowBase.ff0.clkJoint"}}},
            { name: "carryJoint5", type: "Joint", relative: {x: { name:"carryJoint4"}, y: { name:"hours.hours.core.low.lowBase.ff0.clkJoint"}}},

            { name: "lightAmPm", type: "BitLight", y: -375, relative: {xy: { name:"ampm.ff.qJoint"}}},
            { name: "carryAmPmJoint", type: "Joint", relative: {y: { name:"hours.hours.core.nandTensCarry", io: "out"}, x: { name:"ampm.ff.clkJoint"}}}

        ],  
    wires:
        [
            { points: [{ name:"osc.oscNode"}, { name:"oscJoint"}, { name:"seconds.low.lowBase.ff0.clkJoint"}, { name:"seconds.low.lowBase.ff0.ff", io: "Clk", input: "clk"}]},

            { points: [{ name:"seconds.high.nandHigh", io: "out"}, { name:"seconds.high.carryHighJoint0"}, { name:"carryJoint1"}, { name:"minsetXor", io: "A", input:0}]},

            { points: [{ name:"minSetButton", io: "right"}, { name:"minsetXor", io: "B", input: 1}]},
            { points: [{ name:"minsetXor", io: "out"}, { name: "carryJoint2"}, { name:"minutes.low.lowBase.ff0.clkJoint"}, { name:"minutes.low.lowBase.ff0.ff", io: "Clk", input: "clk"}]},

            { points: [{ name:"minutes.high.nandHigh", io: "out"}, { name:"minutes.high.carryHighJoint0"}, { name:"carryJoint3"}, { name:"hoursetXor", io: "A", input: 0}]},

            { points: [{ name:"hourSetButton", io: "right"}, { name:"hoursetXor", io: "B", input: 1}]},
            { points: [{ name:"hoursetXor", io: "out"}, { name:"carryJoint4"}, { name:"carryJoint5"}, { name:"hours.hours.core.low.lowBase.ff0.ff", io: "Clk", input: "clk"}]},

            { points: [{ name:"hours.hours.core.nandTensCarry", io: "out"}, { name:"carryAmPmJoint"}, { name:"ampm.ff.clkJoint"}, { name:"ampm.ff.ff", io: "Clk", input: "clk"}]},
            
            { points: [{ name:"ampm.ff.ff", io: "Q", output: "q"}, { name:"ampm.ff.qJoint"}, { name:"lightAmPm", io: "bottom"}]}
        ]    
}