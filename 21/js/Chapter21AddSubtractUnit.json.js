// Chapter21AddSubtractUnit (c) Charles Petzold, 2024
// ©️自权的SPACE 2025 汉化

let Chapter21AddSubtractUnit = 
{
    name: "Chapter21AddSubtractUnit",
    transform: { x: 500, y: 450, scale: 1, rotate: 0 },
    wireCurveRadius: 10,
    components:
    [
        { name:"adder", type: "Adder", text: "8-Bit Adder", width: 300, height: 75, 
            ports: [{text: "A", x: 0.2, y: 0}, {text: "B", x: 0.8, y: 0}, {text: "Sum", x: 0.5, y: 1},
                        {text: "CI", x: 0, y: 0.5}, {text: "CO", x: 1, y: 0.5}]},

        { name:"onescomp", type: "OnesComplement", text: "One's Complement", width: 200, height: 75, x: 140, y: -175, relative: {xy: { name:"adder"}},
            ports: [{text: "Input", x: 0.5, y: 0}, {text: "Output", x: 0.5, y: 1}, {text: "Inv", x: 0, y: 0.5}]},

        { name:"sumLight", type: "HexLight", y: 125, relative: {xy: { name:"adder", io: "Sum"}}},
        { name:"sum", type: "Label", text: "Result", y: 50, relative: {xy: { name:"sumLight"}}},

        { name:"spinB", type: "HexSpinner", value: 0x77, y: -225, relative: {xy: { name:"onescomp", io: "Output"}}},
        { name:"spinA", type: "HexSpinner", value: 0x77, relative: {x: { name:"adder", io: "A"}, y: { name:"spinB"}}},

        { name:"a", type: "Label", text: "A", y: -75, relative: {xy: { name:"spinA"}}},
        { name:"b", type: "Label", text: "B", y: -75, relative: {xy: { name:"spinB"}}},

        { name:"button0", type: "DigitButton", x: -200, relative: {xy: { name:"spinA"}}},
        { name:"button1", type: "DigitButton", x: -100, relative: {xy: { name:"button0"}}},

        { name:"functionBits", type: "DynamicDecimal", x: -50, y: -65, relative: {xy: { name:"button0"}},
            lookup: {0: "Add", 1: "Add with Carry", 2: "Subtract", 3: "Subtract with Borrow"},
            digits: {0: "button0", 1: "button1"}},

        { name:"function", type: "Label", text: "Function:", y: -30, relative: {xy: { name:"functionBits"}}},

        { name:"and1", type: "AndGate", scale: 0.5, rotate: 90, x: 12.5, y: 225, relative: {xy: { name:"button1"}}},
        { name:"and0", type: "AndGate", scale: 0.5, rotate: 90, x: -12.5, relative: {x: { name:"button0"}, y: { name:"and1"}}},
        { name:"or", type: "OrGate", scale: 0.5, x: -100, relative: {xy: { name:"adder", io: "CI"}}},

        { name:"node1", type: "Node", y: 75, relative: {xy: { name:"button1"}}},
        { name:"node0", type: "Node", y: 125, relative: {xy: { name:"button0"}}},

        { name:"inv", type: "Inverter", scale: 0.25, rotate: 180, x: -25, relative: {xy: { name:"node0"}}},
        { name:"invJoint", type: "Joint", relative: {x: { name:"and1", io: "A"}, y: { name:"inv", io: "out"}}},

        { name:"subNode", type: "Node", x: -200, relative: {xy: { name:"onescomp", io: "Inv"}}},
        { name:"subJoint", type: "Joint", relative: {x: { name:"subNode"}, y: { name:"node1"}}},

        { name:"ciJoint0", type: "Joint", relative: {x: { name:"and0", io: "out"}, y: { name:"or", "io": "A"}}},
        { name:"ciJoint1", type: "Joint", relative: {x: { name:"and1", io: "out"}, y: { name:"or", "io": "B"}}},

        { name:"ciXor", type: "XorGate", "scale": 0.5, x: -125, y: -50, relative: {xy: { name:"and1"}}},
        { name:"xorJoint2", type: "Joint", x: -35, relative: {xy: { name:"ciXor", io: "A"}}},
        { name:"xorJoint1", type: "Joint", relative: {x: { name:"xorJoint2"}, y: { name:"node1"}}},

        { name:"cyButton", type: "DigitButton", x: -100, relative: {xy: { name:"ciXor", io: "B"}}},
        { name:"cyJoint", type: "Joint", relative: {x: { name:"and0", io: "B"}, y: { name:"ciXor", io: "out"}}},

        { name:"cyIn", type: "Label", text: "CY In", y: 50, relative: {xy: { name:"cyButton"}}},

        { name:"xor", type: "XorGate", scale: 0.5, x: 75, y: -12.5, relative: {xy: { name:"adder", io: "CO"}}},

        { name:"cyJoint1", type: "Joint", y: 75, relative: {xy: { name:"subNode"}}},
        { name:"cyJoint3", type: "Joint", x: -40, relative: {xy: { name:"xor", io: "A"}}},
        { name:"cyJoint2", type: "Joint", relative: {x: { name:"cyJoint3"}, y: { name:"cyJoint1"}}},

        { name:"cyLight", type: "BitLight", x: 75, relative: {xy: { name:"xor", io: "out"}}},
        { name:"cyOut", type: "Label", text: "CY Out", y: 50, relative: {xy: { name:"cyLight"}}},
    ],
    wires:
    [
        { points:[{ name:"adder", io: "Sum", output: "sum"}, { name:"sumLight", io: "top"}], wide: true, chars: 2, beg: "none"},
        { points:[{ name:"adder", io: "CO", output: "co"}, { name:"xor", io: "B", input: 1}]},
        { points:[{ name:"xor", io: "out"}, { name:"cyLight", io: "left"}]},

        { points:[{ name:"subNode"}, { name:"cyJoint1"}, { name:"cyJoint2"}, { name:"cyJoint3"}, { name:"xor", io: "A", input: 0}]},
        { points:[{ name:"spinA", io: "bottom", output: "output"}, { name:"adder", io: "A", input: "a"}], wide: true, chars: 2, beg: "none"},
        { points:[{ name:"spinB", io: "bottom", output: "output"}, { name:"onescomp", io: "Input", input: "input"}], wide: true, chars: 2, beg: "none"},

        { points:[{ name:"onescomp", io: "Output", output: "output"}, { name:"adder", io: "B", input: "b"}], wide: true, chars: 2, beg: "none"},
        { points:[{ name:"button1", io: "bottom"}, { name:"node1"}]},
        { points:[{ name:"node1"}, { name:"subJoint"}, { name:"subNode"}]},
        { points:[{ name:"subNode"}, { name:"onescomp", io: "Inv", input: "inv"}]},
        { points:[{ name:"node1"}, { name:"and1", io: "B", input: 1}]},
        { points:[{ name:"node1"}, { name:"xorJoint1"}, { name:"xorJoint2"}, { name:"ciXor", io: "A", input: 0}]},

        { points:[{ name:"button0", io: "bottom"}, { name:"node0"}]},
        { points:[{ name:"node0"}, { name:"and0", io: "A", input: 0}]},
        { points:[{ name:"node0"}, { name:"inv"}]},
        { points:[{ name:"inv", io: "out"}, { name:"invJoint"}, { name:"and1", io: "A", input: 0}]},

        { points:[{ name:"and1", io: "out"}, { name:"ciJoint1"}, { name:"or", io: "B", input: 1}]},
        { points:[{ name:"and0", io: "out"}, { name:"ciJoint0"}, { name:"or", io: "A", input: 0}]},
        { points:[{ name:"or", io: "out"}, { name:"adder", io: "CI", input: "ci"}]},

        { points:[{ name:"cyButton", io: "right"}, { name:"ciXor", io: "B", input: 1}]},
        { points:[{ name:"ciXor", io: "out"}, { name:"cyJoint"}, { name:"and0", io: "B", input: 1}]},
    ]
}