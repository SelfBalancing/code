// Chapter18ColumnSelect (c) Charles Petzold, 2024

let Chapter18ColumnSelect = 
{
    name: "Chapter18ColumnSelect",
    transform: { x: 0, y: 0, scale: 1, rotate: 0 },
    components:
        [
            { name: "ff0", type: "External", x:100, file: "Chapter18FlipFlop2" },
            { name: "ff1", type: "External", x:240, file: "Chapter18FlipFlop2" },
            { name: "ff2", type: "External", x:380, file: "Chapter18FlipFlop2" },
            { name: "osc", type: "External", file: "Chapter18FastOscillator", relative: {xy: { name:"ff0"}}, x: 150, y: -50},

            { name: "oscJoint", type: "Joint", relative: { x: { name:"ff0.clkJoint"}, y: { name:"osc.oscNode"}}},

            { name: "node01", type: "Node", relative: {x: { name:"ff1.clkJoint"}, y: { name:"ff0.ff", io: "Q|OL"}}},
            { name: "node12", type: "Node", relative: {x: { name:"ff2.clkJoint"}, y: { name:"ff1.ff", io: "Q|OL"}}},
            { name: "loopJoint3", type: "Joint", x: 15, relative: {xy: { name:"ff2.ff", io: "Q|OL"}}},
            { name: "loopJoint2", type: "Joint", relative: {x: { name:"loopJoint3"}, y: { name:"ff2.loopJoint2"}}},

            { name: "andLow", type: "AndGate", x: 20, y: -50, scale: 0.33, relative: {xy: { name:"ff2.qJoint"}}},
            { name: "low0ClearNode", type: "Node", relative: {x: { name:"ff0.qJoint"}, y: { name:"andLow", io: "A"}}},
            { name: "low2ClearNode", type: "Node", relative: {x: { name:"ff2.qJoint"}, y: { name:"andLow", io: "B"}}},

            { name: "andLowJoint", type: "Joint", x:25, relative: {xy: { name:"andLow", io: "out"}}},

            { name: "clrNode2", type: "Node", y: 50, relative: {xy: { name:"ff2.ff", io: "Clr"}}},
            { name: "clrJoint", type: "Joint", relative: {x: { name:"andLowJoint"}, y: { name:"clrNode2"}}},
            { name: "clrNode1", type: "Node", relative: {x: { name:"ff1.ff", io: "Clr"}, y: { name:"clrNode2"}}},
            { name: "clrJoint0", type: "Joint", relative: {x: { name:"ff0.ff", io: "Clr"}, y: { name:"clrNode2"}}}
        ],       

    wires:
        [
            { points: [ { name:"osc.oscNode"}, { name:"oscJoint"}, { name:"ff0.clkJoint"}, { name:"ff0.ff", io: "Clk", input: "clk"}]},

            { points: [{ name:"ff0.ff", io: "Q|OL", output: "qbar"}, { name:"node01"} ]},
            { points: [{ name:"node01"}, { name:"ff1.loopJoint2"}, { name: "ff0.loopJoint1"}, { name:"ff0.dJoint"}, { name:"ff0.ff", io: "D", input: "data"} ]},
            { points: [{ name:"node01"}, { name:"ff1.clkJoint"}, { name:"ff1.ff", io: "Clk", input: "clk"}]},

            { points: [{ name:"ff1.ff", io: "Q|OL", output: "qbar"}, { name:"node12"} ]},
            { points: [{ name:"node12"}, { name:"ff2.loopJoint2"}, { name: "ff1.loopJoint1"}, { name:"ff1.dJoint"}, { name:"ff1.ff", io: "D", input: "data"} ]},
            { points: [{ name:"node12"}, { name:"ff2.clkJoint"}, { name:"ff2.ff", io: "Clk", input: "clk"}]},

            { points: [{ name:"ff2.ff", io: "Q|OL", output: "qbar"}, { name:"loopJoint3"}, { name:"loopJoint2"}, { name: "ff2.loopJoint1"}, { name:"ff2.dJoint"}, { name:"ff2.ff", io: "D", input: "data"}]},

            { points: [{ name:"andLow", io: "out"}, { name:"andLowJoint"}, { name:"clrJoint"}, { name:"clrNode2"}]},

            { points: [{ name:"ff0.ff", io: "Q", output: "q"}, { name:"ff0.qJoint"}, { name:"low0ClearNode"}]},
            { points: [{ name:"ff2.ff", io: "Q", output: "q"}, { name:"ff2.qJoint"}, { name:"low2ClearNode"}]},

            { points:[{ name:"low0ClearNode"}, { name:"andLow", io: "A", input: 0}]},
            { points:[{ name:"low2ClearNode"}, { name:"andLow", io: "B", input: 1}]},

            { points: [{ name:"clrNode2"}, { name:"clrNode1"}]},
            { points: [{ name:"clrNode1"}, { name:"clrJoint0"}, { name:"ff0.ff", io: "Clr", input: "clr"}]},
            { points: [{ name:"clrNode1"}, { name:"ff1.ff", io: "Clr", input: "clr"}]},
            { points: [{ name:"clrNode2"}, { name:"ff2.ff", io: "Clr", input: "clr"}]}
       ]
}