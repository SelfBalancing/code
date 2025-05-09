// Chapter18LowNoReset (c) Charles Petzold, 2024

let Chapter18LowNoReset = 
{
    name: "Chapter18LowNoReset",
    transform: { x: 0, y: 0, scale: 1, rotate: 0 },
    components:
        [
            { name: "ff0", type: "External", x:520, file: "Chapter18FlipFlop" },
            { name: "ff1", type: "External", x:380, file: "Chapter18FlipFlop" },
            { name: "ff2", type: "External", x:240, file: "Chapter18FlipFlop" },
            { name: "ff3", type: "External", x:100, file: "Chapter18FlipFlop" },

            { name: "node01", type: "Node", relative: {x: { name:"ff1.clkJoint"}, y: { name:"ff0.ff", io: "Q|OL"}}},
            { name: "node12", type: "Node", relative: {x: { name:"ff2.clkJoint"}, y: { name:"ff1.ff", io: "Q|OL"}}},
            { name: "node23", type: "Node", relative: {x: { name:"ff3.clkJoint"}, y: { name:"ff2.ff", io: "Q|OL"}}},
            { name: "loopJoint3", type: "Joint", x: -15, relative: {xy: { name:"ff3.ff", io: "Q|OL"}}},
            { name: "loopJoint2", type: "Joint", relative: {x: { name:"loopJoint3"}, y: { name:"ff3.loopJoint2"}}}
        ],       

    wires:
        [
            { points: [{ name:"ff0.ff", io: "Q|OL", output: "qbar"}, { name:"node01"} ]},
            { points: [{ name:"node01"}, { name:"ff1.loopJoint2"}, { name: "ff0.loopJoint1"}, { name:"ff0.dJoint"}, { name:"ff0.ff", io: "D", input: "data"} ]},
            { points: [{ name:"node01"}, { name:"ff1.clkJoint"}, { name:"ff1.ff", io: "Clk", input: "clk"}]},

            { points: [{ name:"ff1.ff", io: "Q|OL", output: "qbar"}, { name:"node12"} ]},
            { points: [{ name:"node12"}, { name:"ff2.loopJoint2"}, { name: "ff1.loopJoint1"}, { name:"ff1.dJoint"}, { name:"ff1.ff", io: "D", input: "data"} ]},
            { points: [{ name:"node12"}, { name:"ff2.clkJoint"}, { name:"ff2.ff", io: "Clk", input: "clk"}]},

            { points: [{ name:"ff2.ff", io: "Q|OL", output: "qbar"}, { name:"node23"} ]},
            { points: [{ name:"node23"}, { name:"ff3.loopJoint2"}, { name: "ff2.loopJoint1"}, { name:"ff2.dJoint"}, { name:"ff2.ff", io: "D", input: "data"} ]},
            { points: [{ name:"node23"}, { name:"ff3.clkJoint"}, { name:"ff3.ff", io: "Clk", input: "clk"}]},

            { points: [{ name:"ff3.ff", io: "Q|OL", output: "qbar"}, { name:"loopJoint3"}, { name:"loopJoint2"}, { name: "ff3.loopJoint1"}, { name:"ff3.dJoint"}, { name:"ff3.ff", io: "D", input: "data"}]}
       ]
}