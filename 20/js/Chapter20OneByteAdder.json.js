// Chapter20OneByteAdder (c) Charles Petzold, 2024
// ©️自权的SPACE 2025 汉化

let Chapter20OneByteAdder = 
{
    name: "Chapter20OneByteAdder",
    transform: { x: 200, y: 150, scale: 1, rotate: 0 },
    propagationDelay: 0, 
    components:
    [
        { name:"memory", type: "Memory", width: 200, height: 830, x: -180, y:-130,
            ports: [{text: "Addr", y: 350}, {text: "DO", y: 400}, {text: "DI", y: 750}, {text: "Write", y: 800}],
            triStates: [{ name:"do", group: "data"}],
            initialize: [53, 27, 9, 49, 30, 18, 35, 12]},

        { name:"counter", type: "Counter", text: "16-Bit Counter", initial: -1, width: 200, height: 75, x: 250, y: 75,
            ports: [{text: "Clk", x: 1, y: 0.5, edge: true}, {text: "Output", x: 0.5, y: 1}, {text: "Clr", x: 0, y: 0.5}]},

        { name:"ff1", type: "FlipFlop", text: "Flip-Flop", preset: true, width: 150, height: 75, x: 0, y: -150, relative: {xy: { name:"counter"}}, 
            ports: [
            { text: "Clk", x: 0, y: 0.25, edge: true},
            { text: "D",  x: 0, y: 0.75 },
            { text: "Q", x: 1, y: 0.25 },
            { text: "Q|OL", x: 1, y: 0.75 },
            { text: "Preset",  x: 0.5, y: 1 }]},

        { name:"ff2", type: "FlipFlop", text: "Flip-Flop", width: 150, height: 75, x: 275, relative: {xy: { name:"ff1"}}, 
            ports: [
            { text: "Clk", x: 0, y: 0.25, edge: true},
            { text: "D",  x: 0, y: 0.75 },
            { text: "Q", x: 1, y: 0.25 },
            { text: "Q|OL", x: 1, y: 0.75 },
            { text: "Preset",  x: 0.5, y: 1 }]},

        { name:"adder", type: "Adder", text: "8-Bit Adder", width: 200, height: 75, y: 275, relative: {xy: { name:"counter"}},
            ports: [{text: "A", x: 0.25, y: 0}, {text: "B", x: 0.75, y: 0}, {text: "Sum", x: 0.5, y: 1}]},

        { name:"latch", type: "Latch", text: "8-Bit Latch", width: 200, height: 75, y: 50, relative: {x: { name:"adder"}, y: { name:"adder", io: "Sum"}},
            ports: [{text: "Input", x: 0.5, y: 0}, {text: "Output", x: 0.5, y: 1}, {text: "Clr", x: 0, y: 0.5}, {text: "Clk", x: 1, y: 0.5, edge: true}]},

        { name:"qbarNode", type: "Node", x: 25, y: 40, relative: {xy: { name:"ff1", io: "Q|OL"}}},
        { name:"qbarJoint", type: "Joint", relative: {x: { name:"qbarNode"}, y: { name:"ff1", io: "Q|OL"}}},
        { name:"dJoint", type: "Joint", x: -25, relative: {xy: { name:"ff1", io: "D"}}},
        { name:"loopJoint", type: "Joint", relative: {x: { name:"dJoint"}, y: { name:"qbarNode"}}},

        { name:"clrButton", type: "MomentaryButton", x: -150, relative: {xy: { name:"counter", io: "Clr"}}},
        { name:"clear", type: "Label", text: "Clear", y: 15, relative: {xy: { name:"clrButton", io: "bottom"}}},
        { name:"clrNode", type: "Node", x: 75, relative: {xy: { name:"clrButton", io: "right"}}},
        { name:"clrJoint", type: "Joint", relative: {x: { name:"clrNode"}, y: { name:"latch", io: "Clr"}}},

        { name:"ffClearNode", type: "Node", y: 50, relative: {xy: { name:"ff1", io: "Preset"}}},
        { name:"ffClearJoint1", type: "Joint", relative: {y: { name:"ffClearNode"}, x: { name:"clrNode"}}},
        { name:"ffClearJoint2", type: "Joint", relative: {y: { name:"ffClearNode"}, x: { name:"ff2", io: "Preset"}}},

        { name:"clkButton", type: "MomentaryButton", relative: {y: { name:"ff1", io: "Clk"}, x: { name:"clrButton"}}},
        { name:"clock", type: "Label", text: "Clock", y: 15, relative: {xy: { name:"clkButton", io: "bottom"}}},
        { name:"clkInv", type: "Inverter", scale: 0.33, y: -115, relative: {xy: { name:"ff1", io: "Preset"}}},
        { name:"clkNode", type: "Node", x: -50, relative: {xy: { name:"ff1", io: "Clk"}}},
        { name:"clkJoint", type: "Joint", relative: {x: { name:"clkNode"}, y: { name:"clkInv"}}},
        { name:"clkInvJoint2", type: "Joint", x: -25, relative: {xy: { name:"ff2", io: "Clk"}}},
        { name:"clkInvJoint1", type: "Joint", relative: {x: { name:"clkInvJoint2"}, y: { name:"clkInv"}}},
        { name:"qdJoint", type: "Joint", x: 85, relative: {xy: { name:"ff1", io: "Q"}}},
        { name:"qdNode", type: "Node", relative: {x: { name:"qdJoint"}, y: { name:"ff2", io: "D"}}},
        { name:"counterClkJoint", type: "Joint", relative: {x: { name:"qdNode"}, y: { name:"counter", io: "Clk"}}},

        { name:"writeAnd", type: "AndGate", scale: 0.5, rotate: 90, x: 250, y: 50, relative: {xy: { name:"latch", io: "Clk"}}},
        { name:"writeJoint", type: "Joint", relative: {x: { name:"writeAnd", io: "out"}, y: { name:"memory", io: "Write"}}},

        { name:"qJoint", type: "Joint", relative: {x: { name:"writeAnd", io: "A"}, y: { name:"clkButton", io: "left"}}},
        { name:"latchClkNode", type: "Node", relative: {x: { name:"qJoint"}, y: { name:"latch", io: "Clk"}}},

        { name:"pulseAnd", type: "AndGate", scale: 0.5, rotate: 90, y: -400, relative: {xy: { name:"latchClkNode"}}},
        { name:"pulseAndJointA", type: "Joint", relative: {x: { name:"pulseAnd", io: "A"}, y: { name:"ff2", io: "Q"}}},
        { name:"pulseAndJointB", type: "Joint", relative: {x: { name:"pulseAnd", io: "B"}, y: { name:"qbarNode"}}},

        { name:"counterJoint", type: "Joint", relative: {x: { name:"counter", io: "Output"}, y: { name:"memory", io: "Addr"}}},

        { name:"doNode", type: "DataPathNode", top: true, relative: {x: { name:"adder", io: "A"}, y: { name:"memory", io: "DO"}}},
        { name:"dataNor", type: "DataNorGate", scale: 0.5, x: 250, relative: {xy: { name:"doNode"}}},
        { name:"norJoint", type: "Joint", relative: {x: { name:"writeAnd", io: "B"}, y: { name:"dataNor"}}},

        { name:"latchNode", type: "DataPathNode", bottom: true, relative: {x: { name:"latch", io: "Output"}, y: { name:"memory", io: "DI"}}},

        { name:"circleJoint1", type: "Joint", x: 150, relative: {xy: { name:"latchNode"}}},
        { name:"circleJoint3", type: "Joint", y: -50, relative: {xy: { name:"adder", io: "B"}}},
        { name:"circleJoint2", type: "Joint", relative: {x: { name:"circleJoint1"}, y: { name:"circleJoint3"}}},
        
        { name:"decimal", type: "DynamicDecimal", text: 0, x: 350, relative: {xy: { name:"latch", io: "Clk"}},
            bytes: {0: "latch"}},

    ],
    wires: 
    [
        { points:[{ name:"clkButton", io: "right"}, { name:"clkNode"}]}, 
        { points:[{ name:"clkNode"}, { name:"ff1", io: "Clk", input: "clk"}]},
        { points:[{ name:"clkNode"}, { name:"clkJoint"}, { name:"clkInv", io: "input"}]},
        { points:[{ name:"clkInv", io: "out"}, { name:"clkInvJoint1"}, { name:"clkInvJoint2"}, { name:"ff2", io: "Clk", input: "clk"}]},

        { name:"counterDataPath", points: [{ name:"counter", io: "Output", output: "output"}, { name:"counterJoint"}, { name:"memory", input: "addr", io: "Addr"}], wide: true, chars: 4, nudge: -30},

        { points:[{ name:"ff1", io: "Q", output: "q"}, { name:"qdJoint"}, { name:"qdNode"}]},
        { points:[{ name:"qdNode"}, { name:"ff2", io: "D", input: "data"}]},
        { points:[{ name:"qdNode"}, { name:"counterClkJoint"}, { name:"counter", io: "Clk", input: "clk"}]},

        { points:[{ name:"ff2", io: "Q", output: "q"}, { name:"pulseAndJointA"}, { name:"pulseAnd", io: "A", input: 0}]},
        { points:[{ name:"qbarNode"}, { name:"pulseAndJointB"}, { name:"pulseAnd", io: "B", input: 1}]},
        { points:[{ name:"pulseAnd", io: "out"}, { name:"latchClkNode"}]},
  
        { points:[{ name:"ff1", io: "Q|OL", output: "qbar"}, { name:"qbarJoint"}, { name:"qbarNode"}]},
        { points:[{ name:"qbarNode"}, { name:"loopJoint"}, { name:"dJoint"}, { name:"ff1", io: "D", input: "data"}]},
   
        { points:[{ name:"latchClkNode"}, { name:"latch", io: "Clk", input: "clk"}]},
        { points:[{ name:"latchClkNode"}, { name:"writeAnd", io: "A", input: 0}]},

        { points:[{ name:"clrButton", io: "right"}, { name:"clrNode"}]},
        { points:[{ name:"clrNode"}, { name:"counter", io: "Clr", input: "clr"}]},
        { points:[{ name:"clrNode"}, { name:"clrJoint"}, { name:"latch", io: "Clr", input: "clr"}]},
        { points:[{ name:"clrNode"}, { name:"ffClearJoint1"}, { name:"ffClearNode"}]}, 
        { points:[{ name:"ffClearNode"}, { name:"ff1", io: "Preset", input: "pre"}]},
        { points:[{ name:"ffClearNode"}, { name:"ffClearJoint2"}, { name:"ff2", io: "Preset", input: "pre"}]},

        { points:[{ name:"memory", io: "DO", output: "do"}, { name:"doNode", io: "left"}], wide: true, end: "none"},

        { points:[{ name:"adder", io: "Sum", output: "sum"}, { name:"latch", io: "Input", input: "input"}], wide: true},
        { points:[{ name:"doNode", io: "bottom"}, { name:"adder", io: "A", input: "a"}], wide: true, chars: 0, beg: "none"},

        { points:[{ name:"latch", io: "Output", output: "output"}, { name:"latchNode", io: "top"}], wide: true, chars: 0, end: "none"},
        { points:[{ name:"latchNode", io: "left"}, { name:"memory", input: "di", io: "DI"}], wide: true, beg: "none"},
        { points:[{ name:"latchNode", io: "right"}, { name:"circleJoint1"}, { name:"circleJoint2"}, { name:"circleJoint3"}, { name:"adder", io: "B", input: "b"}], wide: true, beg: "none"},

        { points:[{ name:"doNode", io: "right"}, { name:"dataNor", io: "input"}], wide: true, chars: 0, beg: "none", end: "none"},
        { points:[{ name:"dataNor", io: "out"}, { name:"norJoint"}, { name:"writeAnd", io: "B", input: 1}]},

        { points:[{ name:"writeAnd", io: "out"}, { name:"writeJoint"}, { name:"memory", input: "write", io: "Write"}], arrows: "end"}
    ]
}
