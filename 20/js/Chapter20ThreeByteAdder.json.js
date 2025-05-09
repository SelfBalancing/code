// Chapter20ThreeByteAdder (c) Charles Petzold, 2024

let Chapter20ThreeByteAdder = 
{
    name: "Chapter20ThreeByteAdder",
    transform: { x: 220, y: 150, scale: 1, rotate: 0 },
    wireCurveRadius: 10,
    propagationDelay: 0,
    components:
    [
        { name:"memory", type: "Memory", width: 200, height: 1210, x: -200, y:-130,
            ports: [{text: "Addr", y: 350}, {text: "DO", y: 410}, {text: "DI", y: 1175}, {text: "Write", y: 1125}],
            triStates: [{ name:"do", group: "data"}],
            initialize: [2, 0xC8, 0xAF, 0x00, 
                           2, 0xB8, 0x88, 0x00,
                           3, 0x50, 0xC3, 0x00,
                           3, 0x50, 0xC3, 0x00,
                           2, 0x40, 0x0D, 0x03,
                           4, 0x00, 0x00, 0x00,
                           8]},

        { name:"counter", type: "Counter", text: "16-Bit Counter", initial: -1, width: 200, height: 75, x: 300, y: 75,
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
            { text: "Preset", x: 0.5, y: 1 }]},

        { name:"adder", type: "Adder", text: "8-Bit Adder", width: 200, height: 75, x: 400, y: 400, relative: {xy: { name:"counter"}},
            ports: [{text: "A", x: 0.25, y: 0}, {text: "B", x: 0.75, y: 0}, {text: "Sum", x: 0.5, y: 1},
                        {text: "CI", x: 0, y: 0.5}, {text: "CO", x: 1, y: 0.5}]},

        { name:"onescomp", type: "OnesComplement", text: "One's Complement", width: 200, height: 75, x: -50, y: -150, relative: {xy: { name:"adder"}},
            ports: [{text: "Input", x: 0.5, y: 0}, {text: "Output", x: 0.5, y: 1}, {text: "Inv", x: 0, y: 0.5}]},

        { name:"instLatch", type: "Latch", text: "Instruction Latch", outputs: 4, width: 200, height: 75, x: -350, relative: {x: { name:"adder"}, y: { name:"onescomp"}},
            ports: [{text: "Input", x: 0.5, y: 0}, {text: "Clr", x: 1, y: 0.5}, {text: "Clk", x: 0, y: 0.5, edge: true},
                        {text: "Q3", x: 0.2, y: 1}, {text: "Q2", x: 0.4, y: 1}, {text: "Q1", x: 0.6, y: 1}, {text: "Q0", x: 0.8, y: 1}, ]},

        { name:"midLatch", type: "Latch", text: "Mid-Byte Latch", width: 200, height: 75, y: 125, relative: {x: { name:"adder"}, y: { name:"adder", io: "Sum"}},
            ports: [{text: "Input", x: 0.5, y: 0}, {text: "Output", x: 0.5, y: 1}, {text: "Clr", x: 1, y: 0.5}, {text: "Clk", x: 0, y: 0.5, edge: true},
                        {text: "CI", x: 0.25, y: 0}, {text: "CO", x: 0.25, y: 1}]},

        { name:"lowLatch", type: "Latch", text: "Low-Byte Latch", width: 200, height: 75, x: 300, relative: {xy: { name:"midLatch"}},
            ports: [{text: "Input", x: 0.5, y: 0}, {text: "Output", x: 0.5, y: 1}, {text: "Clr", x: 1, y: 0.5}, {text: "Clk", x: 0, y: 0.5, edge: true},
            {text: "CI", x: 0.25, y: 0}, {text: "CO", x: 0.25, y: 1}]},

        { name:"highLatch", type: "Latch", text: "High-Byte Latch", width: 200, height: 75, x: -300, relative: {xy: { name:"midLatch"}},
            ports: [{text: "Input", x: 0.5, y: 0}, {text: "Output", x: 0.5, y: 1}, {text: "Clr", x: 1, y: 0.5}, {text: "Clk", x: 0, y: 0.5, edge: true}]},

        { name:"lowBuffer", type: "OrigTriStateBuffer", group: "a", text: "Tri-State Buffer", width: 200, height: 75, y: 200, relative: {xy: { name:"lowLatch"}},
            ports: [{text: "Input", x: 0.5, y: 0}, {text: "Output", x: 0.5, y: 1}, {text: "En", x: 0, y: 0.5}]},

        { name:"midBuffer", type: "OrigTriStateBuffer", group: "a", text: "Tri-State Buffer", width: 200, height: 75, relative: {x: { name:"midLatch"}, y: { name:"lowBuffer"}},
            ports: [{text: "Input", x: 0.5, y: 0}, {text: "Output", x: 0.5, y: 1}, {text: "En", x: 0, y: 0.5},
            {text: "CI", x: 0.75, y: 0}, {text: "CO", x: 0.75, y: 1}]},

        { name:"highBuffer", type: "OrigTriStateBuffer", group: "a", text: "Tri-State Buffer", width: 200, height: 75, relative: {x: { name:"highLatch"}, y: { name:"lowBuffer"}},
            ports: [{text: "Input", x: 0.5, y: 0}, {text: "Output", x: 0.5, y: 1}, {text: "En", x: 0, y: 0.5},
            {text: "CI", x: 0.75, y: 0}, {text: "CO", x: 0.75, y: 1}]},

        { name:"decoder", type: "TwoToFourDecoder", text: "2-to-4 Decoder", width: 200, height: 75, x: -325, relative: {xy: { name:"instLatch"}},
            ports: [{text: "A1", x: 0.4, y: 0}, {text: "A0", x: 0.6, y: 0},
                        {text: "11", x: 0.20, y: 1}, {text: "10", x: 0.40, y: 1}, {text: "01", x: 0.60, y: 1}, {text: "00", x: 0.80, y: 1}, ]},

        { name:"decimal", type: "DynamicDecimal", text: 0, x: 225, relative: {xy: { name:"lowLatch", io: "Clr"}},
            bytes: {0: "lowLatch", 1: "midLatch", 2: "highLatch"}},

        { name:"instruction", type: "DynamicDecimal", text: "", relative: {x: { name:"decimal"}, y: { name:"instLatch", io: "Clr"}},
            lookup: {2: "ADD", 3: "SUBTRACT", 4: "WRITE", 8: "HALT"},
            bytes: {0: "instLatch"}},

        { name:"onesCompNode", type: "Node", y: 25, relative: {xy: { name:"instLatch", io: "Q0"}}},
        { name:"onesCompJoint2", type: "Joint", x: -25, relative: {xy: { name:"onescomp", io: "Inv"}}},
        { name:"onesCompJoint1", type: "Joint", relative: {y: { name:"onesCompNode"}, x: { name:"onesCompJoint2"}}},

        { name:"instLatchAnd", type: "AndGate", scale: 0.25, rotate: 90, x: 6, y: 125, relative: {xy: { name:"instLatch", io: "Q1"}}},
        { name:"instWriteAnd", type: "AndGate", scale: 0.25, rotate: 90, inputs: 3, y: 125, relative: {xy: { name:"instLatch", io: "Q2"}}},

        { name:"writeJoint1", type: "Joint", y: 25, relative: {xy: { name:"instWriteAnd", io: "out"}}},
        { name:"writeJoint2", type: "Joint", relative: {y: { name:"writeJoint1"}, x: { name:"decoder", io: "00"}}},
        { name:"writeJoint3", type: "Joint", relative: {x: { name:"writeJoint2"}, y: { name:"memory", io: "Write"}}},

        { name:"instLatchClkAnd",type: "AndGate", scale: 0.25, x: -50, relative: {xy: { name:"instLatch", io: "Clk"}}},                        
        { name:"lowLatchClkAnd", type: "AndGate", scale: 0.25, x: -50, relative: {xy: { name:"lowLatch", io: "Clk"}}},
        { name:"midLatchClkAnd", type: "AndGate", scale: 0.25, x: -50, relative: {xy: { name:"midLatch", io: "Clk"}}},
        { name:"highLatchClkAnd", type: "AndGate", scale: 0.25, x: -50, relative: {xy: { name:"highLatch", io: "Clk"}}},

        { name:"instLatch00Node", type: "Node", y: 85, relative: {xy: { name:"decoder", io: "00"}}},
        { name:"instLatchJoint1", type: "Joint", x: 75, relative: {xy: { name:"instLatch00Node"}}},
        { name:"instLatchJoint2", type: "Joint", relative: {x: { name:"instLatchJoint1"}, y: { name:"instLatchClkAnd", io: "B"}}},
        { name:"inst00Inv", type: "Inverter", scale: 0.25, x: 50, y: 25, relative: {xy: { name:"instLatch00Node"}}},
        { name:"inst00Joint1", type: "Joint", relative: {y: { name:"inst00Inv"}, x: { name:"instLatch00Node"}}},
        { name:"inst00Joint2", type: "Joint", relative: {y: { name:"inst00Joint1"}, x: { name:"instWriteAnd", io: "3/3"}}},

        { name:"lowEnableJoint", type: "Joint", x: -20, relative: {x: { name:"lowLatchClkAnd", io: "B"}, y: { name:"lowBuffer", io: "En"}}},
        { name:"midEnableJoint", type: "Joint", x: -20, relative: {x: { name:"midLatchClkAnd", io: "B"}, y: { name:"midBuffer", io: "En"}}},
        { name:"highEnableNode", type: "Node", x: -20, relative: {x: { name:"highLatchClkAnd", io: "B"}, y: { name:"highBuffer", io: "En"}}},

        { name:"midEnableNode", type: "Node", y: -75, relative: {xy: { name:"midEnableJoint"}}},
        { name:"lowEnableNode", type: "Node", y: -90, relative: {xy: { name:"lowEnableJoint"}}},

        { name:"decoderA0Joint", type: "Joint", y: 9, relative: {x: { name:"decoder", io: "A0"}, y: { name:"memory", io: "Addr"}}},
        { name:"decoderA1Joint", type: "Joint", y: 9, relative: {x: { name:"decoder", io: "A1"}, y: { name:"memory", io: "Addr"}}},

        { name:"carryAnd", type: "AndGate", scale: 0.25, x:25, y: 65, relative: {xy: { name:"instLatch", io: "Q0"}}},
        { name:"carryOr", type: "OrGate", scale: 0.25, x: -50, relative: {xy: { name:"adder", io: "CI"}}},
        { name:"ciOrBJoint2", type: "Joint", x: -50, relative: {xy: { name:"carryOr", io: "B", input: 1}}},
        { name:"ciOrBJoint1", type: "Joint", relative: {x: { name:"ciOrBJoint2"}, y: { name:"carryAnd", io: "out"}}},

        { name:"decoder11Joint", type: "Joint", relative: {x: { name:"decoder", io: "11"}, y: { name:"highEnableNode"}}},
        { name:"decoder10Joint", type: "Joint", relative: {x: { name:"decoder", io: "10"}, y: { name:"midEnableNode"}}},
        { name:"decoder01Joint", type: "Joint", relative: {x: { name:"decoder", io: "01"}, y: { name:"lowEnableNode"}}},

        { name:"decoder01Node", type: "Node", relative: {x: { name:"decoder", io: "01"}, y: { name:"carryAnd", io: "B"}}},
        { name:"onesCompAndJoint", type: "Joint", relative: {x: { name:"onesCompNode"}, y: { name:"carryAnd", io: "A"}}},

        { name:"lowLatchAndBJoint", type: "Joint", relative: {x: { name:"lowEnableNode"}, y: { name:"lowLatchClkAnd", io: "B"}}},
        { name:"midLatchAndBJoint", type: "Joint", relative: {x: { name:"midEnableNode"}, y: { name:"midLatchClkAnd", io: "B"}}},
        { name:"highLatchAndBJoint", type: "Joint", relative: {x: { name:"highEnableNode"}, y: { name:"highLatchClkAnd", io: "B"}}},

        { name:"addSubHighNode", type: "Node", y: -25, relative: {x: { name:"instLatchAnd", io: "out"}, y: { name:"highLatch"}}},
        { name:"addSubMidNode", type: "Node", relative: {y: { name:"addSubHighNode"}, x: { name:"midEnableNode"}}},
        { name:"addSubLowJoint1", type: "Joint", relative: {y: { name:"addSubHighNode"}, x: { name:"lowEnableNode"}}},
        { name:"addSubLowJoint2", type: "Joint", relative: {x: { name:"addSubLowJoint1"}, y: { name:"lowLatchClkAnd", io: "A"}}},
        { name:"addSubMidJoint", type: "Joint", relative: {x: { name:"addSubMidNode"}, y: { name:"midLatchClkAnd", io: "A"}}},
        { name:"addSubHighJoint1", type: "Joint", relative: {y: { name:"addSubHighNode"}, x: { name:"highEnableNode"}}},
        { name:"addSubHighJoint2", type: "Joint", relative: {x: { name:"addSubHighJoint1"}, y: { name:"highLatchClkAnd", io: "A"}}},

        { name:"adderSumNode", type: "DataPathNode", y: 50, relative: {xy: { name:"adder", io: "Sum"}}},
        { name:"adderSumHighJoint", type: "Joint", relative: {x: { name:"highLatch", io: "Input"}, y: { name:"adderSumNode"}}},
        { name:"adderSumLowJoint", type: "Joint", relative: {x: { name:"lowLatch", io: "Input"}, y: { name:"adderSumNode"}}},

        { name:"qbarNode", type: "Node", x: 25, y: 40, relative: {xy: { name:"ff1", io: "Q|OL"}}},
        { name:"qbarJoint", type: "Joint", relative: {x: { name:"qbarNode"}, y: { name:"ff1", io: "Q|OL"}}},
        { name:"dJoint", type: "Joint", x: -25, relative: {xy: { name:"ff1", io: "D"}}},
        { name:"loopJoint", type: "Joint", relative: {x: { name:"dJoint"}, y: { name:"qbarNode"}}},

        { name:"pulseAnd", type: "AndGate", scale: 0.25, x: 50, y: 6, relative: {xy: { name:"ff2", io: "Q"}}},
        { name:"qbarJoint1", type: "Joint", x: 25, relative: {y: { name:"qbarNode"}, x: { name:"ff2", io: "Q"}}},
        { name:"qbarJoint2", type: "Joint", relative: {x: { name:"qbarJoint1"}, y: { name:"pulseAnd", io: "B"}}},

        { name:"pulseJoint1", type: "Joint", x: 50, relative: {xy: { name:"pulseAnd", io: "output"}}},
        { name:"pulseJoint2", type: "Joint", y: 30, relative: {x: { name:"pulseJoint1"}, y: { name:"memory", io: "Addr"}}},
        { name:"pulseNode1", type: "Node", x: -25, relative: {xy: { name:"instLatchClkAnd", io: "A"}}},
        { name:"pulseJoint3", type: "Joint", relative: {x: { name:"pulseNode1"}, y: { name:"pulseJoint2"}}},
        { name:"pulseNode2", type: "Node", y:-25, relative: {xy: { name:"instWriteAnd", io: "1/3"}}},
        { name:"pulseJoint4", type: "Joint", relative: {x: { name:"pulseJoint3"}, y: { name:"pulseNode2"}}},
        { name:"pulseJoint5", type: "Joint", relative: {y: { name:"pulseNode2"}, x: { name:"instLatchAnd", io: "A"}}},

        { name:"clrButton", type: "MomentaryButton", x: -200, relative: {xy: { name:"counter", io: "Clr"}}},
        { name:"clear", type: "Label", text: "Clear", y: 15, relative: {xy: { name:"clrButton", io: "bottom"}}},
        { name:"clrNode", type: "Node", x: 75, relative: {xy: { name:"clrButton", io: "right"}}},

        { name:"ffClearNode", type: "Node", y: 50, relative: {xy: { name:"ff1", io: "Preset"}}},
        { name:"ffClearJoint1", type: "Joint", relative: {y: { name:"ffClearNode"}, x: { name:"clrNode"}}},
        { name:"clrNode3", type: "Node", relative: {y: { name:"ffClearNode"}, x: { name:"ff2", io: "Preset"}}},
        { name:"instClearJoint", type: "Joint", x: 25, relative: {xy: { name:"instLatch", io: "Clr"}}},
        { name:"clrNode2", type: "Node", relative: {y: { name:"clrNode3"}, x: { name:"instClearJoint"}}},
        { name:"midClearNode", type:"Node", x: 15, y:60, relative: {xy: { name:"midLatch", io: "Clr"}}},
        { name:"lowClearNode", type:"Node", x:15, relative: {xy: { name:"lowLatch", io: "Clr"}}},
        { name:"clrJoint", type: "Joint", relative: {x: { name:"lowClearNode"}, y: { name:"clrNode3"}}},
        { name:"lowClearJoint", type: "Joint", relative: {x: { name:"lowClearNode"}, y: { name:"midClearNode"}}},
        { name:"midClearJoint", type: "Joint", relative: {x: { name:"midClearNode"}, y: { name:"midLatch", io: "Clr"}}},
        { name:"highClearJoint2", type: "Joint", x: 15, relative: {xy: { name:"highLatch", io: "Clr"}}},
        { name:"highClearJoint1", type: "Joint", relative: {y: { name:"midClearNode"}, x: { name:"highClearJoint2"}}},

        { name:"clkAnd", type:"AndGate", scale: 0.25, x: -100, relative: {xy: { name:"ff1", io:"Clk"}}},
        { name:"clkButton", type: "MomentaryButton", relative: {y: { name:"clkAnd", io: "A"}, x: { name:"clrButton"}}},
        { name:"clock", type: "Label", text: "Clock", y: 15, relative: {xy: { name:"clkButton", io: "bottom"}}},
        { name:"clkInv", type: "Inverter", scale: 0.33, y: -115, relative: {xy: { name:"ff1", io: "Preset"}}},
        { name:"clkNode", type: "Node", x: -50, relative: {xy: { name:"ff1", io: "Clk"}}},
        { name:"clkJoint", type: "Joint", relative: {x: { name:"clkNode"}, y: { name:"clkInv"}}},
        { name:"clkInvJoint2", type: "Joint", x: -25, relative: {xy: { name:"ff2", io: "Clk"}}},
        { name:"clkInvJoint1", type: "Joint", relative: {x: { name:"clkInvJoint2"}, y: { name:"clkInv"}}},
        { name:"qdJoint", type: "Joint", x: 85, relative: {xy: { name:"ff1", io: "Q"}}},
        { name:"qdNode", type: "Node", relative: {x: { name:"qdJoint"}, y: { name:"ff2", io: "D"}}},
        { name:"counterClkJoint", type: "Joint", relative: {x: { name:"qdNode"}, y: { name:"counter", io: "Clk"}}},

        { name:"counterJoint", type: "Joint", relative: {x: { name:"counter", io: "Output"}, y: { name:"memory", io: "Addr"}}},

        { name:"doNode", type: "DataPathNode", top: true, relative: {x: { name:"instLatch", io: "Input"}, y: { name:"memory", io: "DO"}}},
        { name:"doJoint", type: "Joint", relative: {x: { name:"adder", io: "A"}, y: { name:"doNode"}}},

        { name:"highLatchNode", type: "DataPathNode", bottom: true, relative: {x: { name:"highLatch", io: "Output"}, y: { name:"memory", io: "DI"}}},
        { name:"midLatchNode", type: "DataPathNode", bottom: true, relative: {x: { name:"midLatch", io: "Output"}, y: { name:"memory", io: "DI"}}},
        { name:"lowLatchNode", type: "DataPathNode", bottom: true, relative: {x: { name:"lowLatch", io: "Output"}, y: { name:"memory", io: "DI"}}},

        { name:"circleJoint1", type: "Joint", x: 175, relative: {xy: { name:"lowLatchNode"}}},
        { name:"circleJoint3", type: "Joint", y: -50, relative: {xy: { name:"adder", io: "B"}}},
        { name:"circleJoint2", type: "Joint", relative: {x: { name:"circleJoint1"}, y: { name:"circleJoint3"}}},

        { name:"ciLatchLowNode", type: "Node", y: -50, relative: {xy: { name:"lowLatch", io: "CI"}}},
        { name:"ciLatchMidJoint", type: "Joint", relative: {x: { name:"midLatch", io: "CI"}, y: { name:"ciLatchLowNode"}}},
        { name:"coAdderJoint", type: "Joint", relative: {x: { name:"ciLatchLowNode"}, y: { name:"adder", io: "CO"}}},

        { name:"cicoLowJoint2", type: "Joint", y: -25, relative: {xy: { name:"midBuffer", io: "CI"}}},
        { name:"cicoLowJoint1", type: "Joint", relative: {y: { name:"cicoLowJoint2"}, x: { name:"lowLatch", io: "CO"}}},

        { name:"cicoMidJoint2", type: "Joint", relative: {x: { name:"highBuffer", io: "CI"}, y: { name:"cicoLowJoint2"}}},
        { name:"cicoMidJoint1", type: "Joint", relative: {y: { name:"cicoMidJoint2"}, x: { name:"midLatch", io: "CO"}}},

        { name:"haltInv", type: "Inverter", scale: 0.33, rotate: 180, x: -25, y: 25, relative: {xy: { name:"instLatch", io: "Q3"}}},
        { name:"haltJoint1", type:"Joint", relative: {x: { name:"instLatch", io:"Q3"}, y: { name:"haltInv"}}},
        { name:"haltJoint2", type: "Joint", x: -85, relative: {xy: { name:"haltInv", io: "out"}}},
        { name:"haltJoint5", type: "Joint", x: -25, relative: {xy: { name:"clkAnd", io: "B"}}},
        { name:"haltJoint4", type: "Joint", y: 25, relative: {xy: { name:"haltJoint5"}}},
        { name:"haltJoint3", type: "Joint", relative: {x: { name:"haltJoint2"}, y: { name:"haltJoint4"}}},

        { name:"carryLoopNode", type: "Node", y: 25, relative: {xy: { name:"midBuffer", io: "CO"}}},
        { name:"carryLoopJoint1", type: "Joint", relative: {x: { name:"highBuffer", io: "CO"}, y: { name:"carryLoopNode"}}},
        { name:"carryLoopJoint2", type: "Joint", x: 400, relative: {xy: { name:"carryLoopNode"}}},
        { name:"carryLoopJoint5", type: "Joint", x: -25, relative: {xy: { name:"carryOr", io: "A"}}},
        { name:"carryLoopJoint4", type: "Joint", y: -60, relative: {xy: { name:"carryLoopJoint5"}}},
        { name:"carryLoopJoint3", type: "Joint", relative: {y: { name:"carryLoopJoint4"}, x: { name:"carryLoopJoint2"}}}
    ],
    wires: 
    [
        { points:[{ name:"clrNode3"}, { name:"clrJoint"}, { name:"lowClearNode"}]},
        { points:[{ name:"lowClearNode"}, { name:"lowLatch", io: "Clr", input: "clr"}]},
        { points:[{ name:"lowClearNode"}, { name:"lowClearJoint"}, { name:"midClearNode"}]},
        { points:[{ name:"midClearNode"}, { name:"midClearJoint"}, { name:"midLatch", io: "Clr", input: "clr"}]},
        { points:[{ name:"midClearNode"}, { name:"highClearJoint1"}, { name:"highClearJoint2"}, { name:"highLatch", io: "Clr", input: "clr"}]},

        { points:[{ name:"midBuffer", io: "CO", output: "xo"}, { name:"carryLoopNode"}]},
        { points:[{ name:"highBuffer", io: "CO", output: "xo"}, { name:"carryLoopJoint1"}, { name:"carryLoopNode"}]},
        { points:[{ name:"carryLoopNode"}, { name:"carryLoopJoint2"}, { name:"carryLoopJoint3"}, { name:"carryLoopJoint4"}, { name:"carryLoopJoint5"}, { name:"carryOr", io: "A", input: 0}]},

        { points: [{ name:"instLatch", io: "Q3", output: 3}, { name:"haltJoint1"}, { name:"haltInv"}]},
        { points: [{ name:"haltInv", io: "out"}, { name:"haltJoint2"}, { name:"haltJoint3"}, { name:"haltJoint4"}, { name:"haltJoint5"}, { name:"clkAnd", io: "B", input: 1}]},

        { points:[{ name:"clkButton", io: "right"}, { name:"clkAnd", io:"A", input: 0}]}, 
        { points:[{ name:"clkAnd", io: "out"}, { name:"clkNode"}]},
        { points:[{ name:"clkNode"}, { name:"ff1", io: "Clk", input: "clk"}]},
        { points:[{ name:"clkNode"}, { name:"clkJoint"}, { name:"clkInv", io: "input"}]},
        { points:[{ name:"clkInv", io: "out"}, { name:"clkInvJoint1"}, { name:"clkInvJoint2"}, { name:"ff2", io: "Clk", input: "clk"}]},

        { points:[{ name:"counter", io: "Output", output: "output"}, { name:"counterJoint"}, { name:"memory", input: "addr", io: "Addr"}], wide: true, chars: 4},

        { points:[{ name:"ff1", io: "Q", output: "q"}, { name:"qdJoint"}, { name:"qdNode"}]},
        { points:[{ name:"qdNode"}, { name:"ff2", io: "D", input: "data"}]},
        { points:[{ name:"qdNode"}, { name:"counterClkJoint"}, { name:"counter", io: "Clk", input: "clk"}]},

        { points:[{ name:"ff1", io: "Q|OL", output: "qbar"}, { name:"qbarJoint"}, { name:"qbarNode"}]},
        { points:[{ name:"qbarNode"}, { name:"loopJoint"}, { name:"dJoint"}, { name:"ff1", io: "D", input: "data"}]},
        { points:[{ name:"qbarNode"}, { name:"qbarJoint1"}, { name:"qbarJoint2"}, { name:"pulseAnd", io: "B", input: 1}]},
        { points:[{ name:"ff2", io: "Q", output: "q"}, { name:"pulseAnd", io: "A", input: 0}]},

        { points:[{ name:"pulseAnd", io: "out"}, { name:"pulseJoint1"}, { name:"pulseJoint2"}, { name:"pulseJoint3"}, { name:"pulseNode1"}]},
        { points:[{ name:"pulseNode1"}, { name:"instLatchClkAnd", io: "A", input: 0}]},
        { points:[{ name:"pulseNode1"}, { name:"pulseJoint4"}, { name:"pulseNode2"}]},
        { points:[{ name:"pulseNode2"}, { name:"instWriteAnd", io: "1/3", input: 0}]},
        { points:[{ name:"pulseNode2"}, { name:"pulseJoint5"}, { name:"instLatchAnd", io: "A", input: 0}]},
   
        { points:[{ name:"clrButton", io: "right"}, { name:"clrNode"}]},
        { points:[{ name:"clrNode"}, { name:"counter", io: "Clr", input: "clr"}]},
        { points:[{ name:"clrNode"}, { name:"ffClearJoint1"}, { name:"ffClearNode"}]}, 
        { points:[{ name:"ffClearNode"}, { name:"ff1", io: "Preset", input: "pre"}]},
        { points:[{ name:"ffClearNode"}, { name:"clrNode2"}]},
        { points:[{ name:"clrNode2"}, { name:"clrNode3"}]}, 
        { points:[{ name:"clrNode3"}, { name:"ff2", io: "Preset", input: "pre"}]},
        { points:[{ name:"clrNode2"}, { name:"instClearJoint"}, { name:"instLatch", io: "Clr", input: "clr"}]},

        { points:[{ name:"memory", io: "DO", output: "do"}, { name:"doNode", io: "left"}], wide: true, end: "none"},

        { points:[{ name:"adder", io: "Sum", output: "sum"}, { name:"adderSumNode", io: "top"}], wide: true, end: "none"},
        { points:[{ name:"adderSumNode", io: "bottom"}, { name:"midLatch", io: "Input", input: "input"}], wide: true, beg: "none"},
        { points:[{ name:"adderSumNode", io: "left"}, { name:"adderSumHighJoint"}, { name:"highLatch", io: "Input", input: "input"}], wide: true, beg: "none"},
        { points:[{ name:"adderSumNode", io: "right"}, { name:"adderSumLowJoint"}, { name:"lowLatch", io: "Input", input: "input"}], wide: true, beg: "none"},

        { points:[{ name:"adder", io: "CO", output: "co"}, { name:"coAdderJoint"}, { name:"ciLatchLowNode"}]},
        { points:[{ name:"ciLatchLowNode"}, { name:"lowLatch", io: "CI", input: "xi"}]},
        { points:[{ name:"ciLatchLowNode"}, { name:"ciLatchMidJoint"}, { name:"midLatch", io: "CI", input: "xi"}]},

        { points:[{ name:"lowLatch", io: "CO", output: "xo"}, { name:"cicoLowJoint1"}, { name:"cicoLowJoint2"}, { name:"midBuffer", io: "CI", input: "xi"}]},
        { points:[{ name:"midLatch", io: "CO", output: "xo"}, { name:"cicoMidJoint1"}, { name:"cicoMidJoint2"}, { name:"highBuffer", io: "CI", input: "xi"}]},

        { points:[{ name:"doNode", io: "bottom"}, { name:"instLatch", io: "Input", input: "input"}], wide: true, beg: "none"},
        { points:[{ name:"doNode", io: "right"}, { name:"doJoint"}, { name:"onescomp", io: "Input", input: "input"}], wide: true, beg: "none"},
        { points:[{ name:"onescomp", io: "Output", output: "output"}, { name:"adder", io: "A", input: "a"}], wide: true, chars: 2, beg: "none"},

        { points:[{ name:"highLatch", io: "Output", output: "output"}, { name:"highBuffer", io: "Input", input: "input"}], wide: true},
        { points:[{ name:"midLatch", io: "Output", output: "output"}, { name:"midBuffer", io: "Input", input: "input"}], wide: true},
        { points:[{ name:"lowLatch", io: "Output", output: "output"}, { name:"lowBuffer", io: "Input", input: "input"}], wide: true},

        { points:[{ name:"instLatchClkAnd", io: "out"}, { name:"instLatch", io: "Clk", input: "clk"}]},
        { points:[{ name:"lowLatchClkAnd", io: "out"}, { name:"lowLatch", io: "Clk", input: "clk"}]},
        { points:[{ name:"midLatchClkAnd", io: "out"}, { name:"midLatch", io: "Clk", input: "clk"}]},
        { points:[{ name:"highLatchClkAnd", io: "out"}, { name:"highLatch", io: "Clk", input: "clk"}]},

        { points:[{ name:"decoder", io: "00", output: 0}, { name:"instLatch00Node"}]},
        { points:[{ name:"instLatch00Node"}, { name:"instLatchJoint1"}, { name:"instLatchJoint2"}, { name:"instLatchClkAnd", io: "B", input: 1}]},
        { points:[{ name:"instLatch00Node"}, { name:"inst00Joint1"}, { name:"inst00Inv", io: "input"}]},
        { points:[{ name:"inst00Inv", io: "out"}, { name:"inst00Joint2"}, { name:"instWriteAnd", io: "3/3", input: 2}]},

        { points:[{ name:"highBuffer", io: "Output", output: "output"}, { name:"highLatchNode", io: "top"}], wide: true, chars: 0, end: "none"},
        { points:[{ name:"midBuffer", io: "Output", output: "output"}, { name:"midLatchNode", io: "top"}], wide: true, chars: 0, end: "none"},
        { points:[{ name:"lowBuffer", io: "Output", output: "output"}, { name:"lowLatchNode", io: "top"}], wide: true, chars: 0, end: "none"},

        { points:[{ name:"decoderA0Joint", hook: "counter", output: 0}, { name:"decoder", io: "A0", input: 0}]},
        { points:[{ name:"decoderA1Joint", hook: "counter", output: 1}, { name:"decoder", io: "A1", input: 1}]},

        { points:[{ name:"decoder", io: "11", output: 3}, { name:"decoder11Joint"}, { name:"highEnableNode"}]},
        { points:[{ name:"decoder", io: "10", output: 2}, { name:"decoder10Joint"}, { name:"midEnableNode"}]},
        { points:[{ name:"decoder", io: "01", output: 1}, { name:"decoder01Node"}]},
        { points:[{ name:"decoder01Node"}, { name:"decoder01Joint"}, { name:"lowEnableNode"}]},
        { points:[{ name:"decoder01Node"}, { name:"carryAnd", io: "B", input: 1}]},
        { points:[{ name:"onesCompNode"}, { name:"onesCompAndJoint"}, { name:"carryAnd", io: "A", input: 0}]},
        { points:[{ name:"carryAnd", io: "out"}, { name:"ciOrBJoint1"}, { name:"ciOrBJoint2"}, { name:"carryOr", io: "B", input: 1}]},
        { points:[{ name:"carryOr", io: "out"}, { name:"adder", io: "CI", input: "ci"}]},

        { points:[{ name:"lowEnableNode"}, { name:"lowEnableJoint"}, { name:"lowBuffer", io: "En", input: "enable"}]},
        { points:[{ name:"midEnableNode"}, { name:"midEnableJoint"}, { name:"midBuffer", io: "En", input: "enable"}]},
        { points:[{ name:"highEnableNode"}, { name:"highBuffer", io: "En", input: "enable"}]},

        { points:[{ name:"lowEnableNode"}, { name:"lowLatchAndBJoint"}, { name:"lowLatchClkAnd", io: "B", input: 1}]},
        { points:[{ name:"midEnableNode"}, { name:"midLatchAndBJoint"}, { name:"midLatchClkAnd", io: "B", input: 1}]},
        { points:[{ name:"highEnableNode"}, { name:"highLatchAndBJoint"}, { name:"highLatchClkAnd", io: "B", input: 1}]},

        { points:[{ name:"instLatch", io: "Q2", output: 2}, { name:"instWriteAnd", io: "2/3", input: 1}]},

        { points:[{ name:"instLatch", io: "Q1", output: 1}, { name:"instLatchAnd", io: "B", input: 1}]},
        { points:[{ name:"instLatchAnd", io: "out"}, { name:"addSubHighNode"}]},
        { points:[{ name:"addSubHighNode"}, { name:"addSubMidNode"}]},
        { points:[{ name:"addSubMidNode"}, { name:"addSubLowJoint1"}, { name:"addSubLowJoint2"}, { name:"lowLatchClkAnd", io: "A", input: 0}]},
        { points:[{ name:"addSubMidNode"}, { name:"addSubMidJoint"}, { name:"midLatchClkAnd", io: "A", input: 0}]},
        { points:[{ name:"addSubHighNode"}, { name:"addSubHighJoint1"}, { name:"addSubHighJoint2"}, { name:"highLatchClkAnd", io: "A", input: 0}]},

        { points:[{ name:"instLatch", io: "Q0", output: 0}, { name:"onesCompNode"}]},
        { points:[{ name:"onesCompNode"}, { name:"onesCompJoint1"}, { name:"onesCompJoint2"}, { name:"onescomp", io: "Inv", input: "inv"}]},
    
        { points:[{ name:"highLatchNode", io: "right"}, { name:"midLatchNode", io: "left"}], wide: true, beg: "none", end: "none"},
        { points:[{ name:"midLatchNode", io: "right"}, { name:"lowLatchNode", io: "left"}], wide: true, beg: "none", end: "none"},
        { points:[{ name:"lowLatchNode", io: "right"}, { name:"circleJoint1"}, { name:"circleJoint2"}, { name:"circleJoint3"}, { name:"adder", io: "B", input: "b"}], wide: true, beg: "none"},

        { points:[{ name:"highLatchNode", io: "left"}, { name:"memory", input: "di", io: "DI"}], wide: true, beg: "none"},

        { points:[{ name:"midLatchNode", io: "left"}, { name:"highLatchNode", io: "right"}], wide: true, beg: "none", end: "none"},
        { points:[{ name:"lowLatchNode", io: "left"}, { name:"midLatchNode", io: "right"}], wide: true, beg: "none", end: "none"},

        { points:[{ name:"instWriteAnd", io: "out"}, { name:"writeJoint1"}, { name:"writeJoint2"}, { name:"writeJoint3"}, { name:"memory", io: "Write", input: "write"}], arrows: "end"}
    ]
}
