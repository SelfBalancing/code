// Chapter15OneBitFullAdderXor (c) Charles Petzold, 2024 

let Chapter15OneBitFullAdderXor = 
{
    name: "Chapter15OneBitFullAdderXor",
    transform: {x: 640, y: 320, scale: 1, rotate: 0},
    propagationDelay: 100,
    wireCurveRadius: 15,
    components:
    [
        { name:"or", type: "OrGate", scale: 0.65},

        { name: "and2", type: "AndGate", scale: 0.65, x: -150, relative: {y: { name:"or", io: "A"}}},
        { name: "xor2", type: "XorGate",  scale: 0.65, x: 0, y: -150, relative: {xy: { name:"and2"}}},

        { name:"xor1", type: "XorGate", scale: 0.65, x: -250, relative: {xy: { name:"xor2", io: "B"}}},
        { name:"and1", type: "AndGate", scale: 0.65, x: 0, y: 125, relative: {xy: { name:"xor1"}}},

        { name: "nodeA1", type: "Node", x:-50, relative: {xy: { name:"xor1", io: "A"}}},
        { name: "nodeB1", type: "Node", x: -75, relative: {xy: { name: "and1", io: "B"}}},

        { name: "buttonA", type: "DigitButton", x: -125, relative: { xy: { name:"nodeA1" }}},
        { name: "buttonB", type: "DigitButton", relative: {x: { name:"buttonA" }, y: { name:"nodeB1"}}},
        { name: "labelA", type: "Label", text: "A", y: 50, relative: {xy: { name:"buttonA"}}},
        { name: "labelB", type: "Label", text: "B", y: 50, relative: {xy: { name:"buttonB"}}},

        { name:"nodeA2", type: "Node", x: -50, relative: {xy: { name:"xor2", io: "A"}}},
        { name:"nodeB2", type: "Node", x: -75, relative: {xy: { name:"xor2", io: "B"}}},

        { name: "buttonCarry", type: "DigitButton", y:-85, relative: {xy:{ name:"nodeA2"}}},
        { name: "labelCarryIn", type: "Label", text: "CARRY IN", x: -100, relative: { xy: { name:"buttonCarry" }}},

        { name: "carryLight", type: "BitLight", x: 100, relative: { xy: { name:"or", io: "out"}}},
        { name: "sumLight", type: "BitLight", relative: {x: { name:"carryLight"}, y: { name:"xor2", io: "out"}}},

        { name: "labelSum", type: "Label", text: "SUM", xAlign: 0.5, yAlign: 0, y: 50, relative: { xy: { name:"sumLight" }}},
        { name: "labelCarry", type: "Label", text: "CARRY OUT", xAlign: 0.5, yAlign: 0, y: 50, relative: { xy: { name:"carryLight" }}},
       
        { name: "jtA1", type: "Joint", relative: { x: { name:"nodeA1"}, y: { name: "and1", io: "A"}}},
        { name: "jtB1", type: "Joint", relative: { x: { name:"nodeB1"}, y: { name: "xor1", io: "B"}}},
        { name: "jtA2", type: "Joint", relative: { x: { name:"nodeA2"}, y: { name: "and2", io: "A"}}},
        { name: "jtB2", type: "Joint", relative: { x: { name:"nodeB2"}, y: { name: "and2", io: "B"}}},

        { name: "jtCarry1", type: "Joint", x:50, relative: {xy: { name:"and1", io: "out"}}},
        { name: "jtCarry2", type: "Joint", y:75, relative: {xy: { name:"jtCarry1"}}},
        { name: "jtCarry4", type: "Joint", x:-40, relative: {xy: { name:"or", io: "B"}}},
        { name: "jtCarry3", type: "Joint", relative: {x: { name:"jtCarry4"}, y: { name:"jtCarry2"}}}
    ],
    wires:
    [
        { points:[{ name:"buttonA", io: "right"}, { name:"nodeA1"}]},
        { points:[{ name:"buttonB", io: "right"}, { name:"nodeB1"}]},
        { points:[{ name:"buttonCarry", io: "bottom"}, { name:"nodeA2"}]},

        { points: [ { name: "nodeA1"}, { name: "xor1", io: "A", input: 0} ]},
        { points: [ { name: "nodeA1"}, { name: "jtA1"}, { name: "and1", io: "A", input: 0} ]},

        { points: [ { name: "nodeB1"}, { name: "and1", io: "B", input: 1} ]},
        { points: [ { name: "nodeB1"}, { name: "jtB1"}, { name: "xor1", io: "B", input: 1} ]},

        { points: [ { name: "nodeA2"}, { name: "xor2", io: "A", input: 0} ]},
        { points: [ { name: "nodeA2"}, { name: "jtA2"}, { name: "and2", io: "A", input: 0} ]},

        { points:[{ name:"xor1", io: "out"}, { name:"nodeB2"}]},
        { points: [ { name: "nodeB2"}, { name: "xor2", io: "B", input: 1} ]},
        { points: [ { name: "nodeB2"}, { name: "jtB2"}, { name: "and2", io: "B", input: 1} ]},

        { points: [ { name: "and2", io: "out"}, { name: "or", io: "A", input: 0}]},
        { points: [ { name: "and1", io: "out"}, { name: "jtCarry1"}, { name: "jtCarry2"},{ name: "jtCarry3"},{ name: "jtCarry4"}, { name:"or", io: "B", input: 1}]},

        { points: [ { name:"xor2", io:"out"}, { name:"sumLight", io: "left"}]},
        { points: [ { name:"or", io: "out"}, { name: "carryLight", io: "left"}]},
    ]
}