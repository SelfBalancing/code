// Chapter18HighDigit (c) Charles Petzold, 2024

let Chapter18HighDigit = 
{
    name: "Chapter18HighDigit",
    transform: { x: 0, y: 0, scale: 1, rotate: 0 },
    components:
        [
            { name: "ff4", type: "External", x:380, file: "Chapter18FlipFlop" },
            { name: "ff5", type: "External", x:240, file: "Chapter18FlipFlop" },
            { name: "ff6", type: "External", x:100, file: "Chapter18FlipFlop" },

            { name: "node01", type: "Node", relative: {x: { name:"ff5.clkJoint"}, y: { name:"ff4.ff", io: "Q|OL"}}},
            { name: "node12", type: "Node", relative: {x: { name:"ff6.clkJoint"}, y: { name:"ff5.ff", io: "Q|OL"}}},
            { name: "loopJoint3", type: "Joint", x: -15, relative: {xy: { name:"ff6.ff", io: "Q|OL"}}},
            { name: "loopJoint2", type: "Joint", relative: {x: { name:"loopJoint3"}, y: { name:"ff6.loopJoint2"}}},

            { name: "andHigh", type: "AndGate", x: -20, y: -50, scale: 0.33, rotate: 180, relative: {xy: { name:"ff6.qJoint"}}},
            { name: "high5ClearNode", type: "Node", relative: {x: { name:"ff5.qJoint"}, y: { name:"andHigh", io: "A"}}},
            { name: "high6ClearNode", type: "Node", relative: {x: { name:"ff6.qJoint"}, y: { name:"andHigh", io: "B"}}},

            { name: "nandHigh", type: "NandGate", y: -50, scale: 0.33, rotate: 180, relative: {xy: { name:"andHigh"}}},
            { name: "high4CarryNode", type: "Node", relative: {x: { name:"ff4.qJoint"}, y: { name:"nandHigh", io: "A"}}},
            { name: "high6CarryNode", type: "Node", relative: {x: { name:"ff6.qJoint"}, y: { name:"nandHigh", io: "B"}}},

            { name: "andHighJoint", type: "Joint", x: -25, relative: {xy: { name:"andHigh", io: "out"}}},
            { name: "clrNode6", type: "Node", y: 50, relative: {xy: { name:"ff6.ff", io: "Clr"}}},
            { name: "clrJoint", type: "Joint", relative: {x: { name:"andHighJoint"}, y: { name:"clrNode6"}}},
           
            { name: "clrNode5", type: "Node", relative: {x: { name:"ff5.ff", io: "Clr"}, y: { name:"clrNode6"}}},
            { name: "clrJoint4", type: "Joint", relative: {x: { name:"ff4.ff", io: "Clr"}, y: { name:"clrNode6"}}},

            { name: "carryHighJoint0", type: "Joint", x:-40, relative: {xy: { name:"nandHigh", io: "out"}}},
            { name: "carryHighJoint1", type: "Joint", y:25, relative: {x: { name:"carryHighJoint0"}, y: { name:"clrJoint"}}}
        ],       

    wires:
        [
            { points: [{ name:"ff4.ff", io: "Q|OL", output: "qbar"}, { name:"node01"} ]},
            { points: [{ name:"node01"}, { name:"ff5.loopJoint2"}, { name: "ff4.loopJoint1"}, { name:"ff4.dJoint"}, { name:"ff4.ff", io: "D", input: "data"} ]},
            { points: [{ name:"node01"}, { name:"ff5.clkJoint"}, { name:"ff5.ff", io: "Clk", input: "clk"}]},

            { points: [{ name:"ff5.ff", io: "Q|OL", output: "qbar"}, { name:"node12"} ]},
            { points: [{ name:"node12"}, { name:"ff6.loopJoint2"}, { name: "ff5.loopJoint1"}, { name:"ff5.dJoint"}, { name:"ff5.ff", io: "D", input: "data"} ]},
            { points: [{ name:"node12"}, { name:"ff6.clkJoint"}, { name:"ff6.ff", io: "Clk", input: "clk"}]},

            { points: [{ name:"ff6.ff", io: "Q|OL", output: "qbar"}, { name:"loopJoint3"}, { name:"loopJoint2"}, { name: "ff6.loopJoint1"}, { name:"ff6.dJoint"}, { name:"ff6.ff", io: "D", input: "data"}]},

            { points:[{ name:"ff4.ff", io: "Q", output: "q"}, { name:"ff4.qJoint"}, { name:"high4CarryNode"}]},
            { points:[{ name:"high4CarryNode"}, { name:"nandHigh", io: "A", input: 0}]},

            { points:[{ name:"ff5.ff", io: "Q", output: "q"}, { name:"ff5.qJoint"}, { name:"high5ClearNode"}]},
            { points:[{ name:"high5ClearNode"}, { name:"andHigh", io: "A", input: 0}]},
    
            { points:[{ name:"ff6.ff", io: "Q", output: "q"}, { name:"ff6.qJoint"}, { name:"high6ClearNode"}]},
            { points:[{ name:"high6ClearNode"}, { name:"andHigh", io: "B", input: 1}]},
            { points:[{ name:"high6ClearNode"}, { name:"high6CarryNode"}]},
            { points:[{ name:"high6CarryNode"}, { name:"nandHigh", io: "B", input: 1}]},

            { points: [{ name:"andHigh", io: "out"}, { name:"andHighJoint"}, { name:"clrJoint"}, { name:"clrNode6"}]},

            { points: [{ name:"clrNode6"}, { name:"ff6.ff", io: "Clr", input: "clr"}]},
            { points: [{ name:"clrNode6"}, { name:"clrNode5"}]},

            { points: [{ name:"clrNode5"}, { name:"ff5.ff", io: "Clr", input: "clr"}]},
            { points: [{ name:"clrNode5"}, { name:"clrJoint4"}, { name:"ff4.ff", io: "Clr", input: "clr"}]}
       ]
}