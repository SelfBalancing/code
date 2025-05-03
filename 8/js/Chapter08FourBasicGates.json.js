// Chapter08FourBasicGates.json.js (c) Charles Petzold, 2024

let Chapter08FourBasicGates = {
    name: "Chapter08FourBasicGates",
    transform: {x: 50, y: 50, scale: 1, rotate: 0},
    components:
    [
        { name:"switchA", type: "DigitButton"},
        { name:"switchB", type: "DigitButton", x: 100},

        { name:"andGate", type: "AndGate", x: 200, y: 100},
        { name:"orGate", type: "OrGate", y: 150, relative: {xy: { name:"andGate"}}},
        { name:"nandGate", type: "NandGate", y: 150, relative: {xy: { name:"orGate"}}},
        { name:"norGate", type: "NorGate", y: 150, relative: {xy: { name:"nandGate"}}},

        { name:"andLight", type: "BitLight", x: 125, relative: {xy: { name:"andGate", io: "out"}}},
        { name:"orLight", type: "BitLight", relative: {x: { name:"andLight"}, y: { name:"orGate"}}},
        { name:"nandLight", type: "BitLight", relative: {x: { name:"andLight"}, y: { name:"nandGate"}}},
        { name:"norLight", type: "BitLight", relative: {x: { name:"andLight"}, y: { name:"norGate"}}},

        { name:"and", type: "Label", text: "AND", size: 2, x: 150, relative: {xy: { name:"andLight"}}},
        { name:"or", type: "Label", text: "OR", size: 2, relative: {y: { name:"orLight"}, x: { name:"and"}}},
        { name:"nand", type: "Label", text: "NAND", size: 2, relative: {y: { name:"nandLight"}, x: { name:"and"}}},
        { name:"nor", type: "Label", text: "NOR", size: 2, relative: {y: { name:"norLight"}, x: { name:"and"}}},

        { name:"andNodeA", type: "Node", relative: {x: { name:"switchA"}, y: { name:"andGate", io: "A"}}},
        { name:"andNodeB", type: "Node", relative: {x: { name:"switchB"}, y: { name:"andGate", io: "B"}}},
        { name:"orNodeA", type: "Node", relative: {x: { name:"switchA"}, y: { name:"orGate", io: "A"}}},
        { name:"orNodeB", type: "Node", relative: {x: { name:"switchB"}, y: { name:"orGate", io: "B"}}},
        { name:"nandNodeA", type: "Node", relative: {x: { name:"switchA"}, y: { name:"nandGate", io: "A"}}},
        { name:"nandNodeB", type: "Node", relative: {x: { name:"switchB"}, y: { name:"nandGate", io: "B"}}},
        { name:"norJointA", type: "Joint", relative: {x: { name:"switchA"}, y: { name:"norGate", io: "A"}}},
        { name:"norJointB", type: "Joint", relative: {x: { name:"switchB"}, y: { name:"norGate", io: "B"}}}
    ],
    wires:
    [
        { points:[{ name:"switchA", io: "bottom"}, { name:"andNodeA"}]},
        { points:[{ name:"switchB", io: "bottom"}, { name:"andNodeB"}]},

        { points:[{ name:"andNodeA"}, { name:"orNodeA"}]},
        { points:[{ name:"andNodeB"}, { name:"orNodeB"}]},

        { points:[{ name:"orNodeA"}, { name:"nandNodeA"}]},
        { points:[{ name:"orNodeB"}, { name:"nandNodeB"}]},

        { points:[{ name:"andNodeA"}, { name:"andGate", io: "A", input: 0}]},
        { points:[{ name:"andNodeB"}, { name:"andGate", io: "B", input: 1}]},

        { points:[{ name:"orNodeA"}, { name:"orGate", io: "A", input: 0}]},
        { points:[{ name:"orNodeB"}, { name:"orGate", io: "B", input: 1}]},

        { points:[{ name:"nandNodeA"}, { name:"nandGate", io: "A", input: 0}]},
        { points:[{ name:"nandNodeB"}, { name:"nandGate", io: "B", input: 1}]},

        { points:[{ name:"nandNodeA"}, { name:"norJointA"}, { name:"norGate", io: "A", input: 0}]},
        { points:[{ name:"nandNodeB"}, { name:"norJointB"}, { name:"norGate", io: "B", input: 1}]},

        { points:[{ name:"andGate", io: "out"}, { name:"andLight", io: "left"}]},
        { points:[{ name:"orGate", io: "out"}, { name:"orLight", io: "left"}]},
        { points:[{ name:"nandGate", io: "out"}, { name:"nandLight", io: "left"}]},
        { points:[{ name:"norGate", io: "out"}, { name:"norLight", io: "left"}]},
    ]
}