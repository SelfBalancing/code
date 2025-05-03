// Chapter08DeMorgansLaws.json.js (c) Charles Petzold, 2024
// ©️自权的SPACE 2025 汉化

let Chapter08DeMorgansLaws = {
    name: "Chapter08DeMorgansLaws",
    transform: {x: 50, y: 50, scale: 1, rotate: 0},
    components:
    [
        { name:"switchA", type: "DigitButton"},
        { name:"switchB", type: "DigitButton", x: 100},

        { name:"andGate", type: "AndGate", x: 250, y: 100},
        { name:"norGate", type: "NorGate", y: 150, relative: {xy: { name:"andGate"}}},

        { name:"orGate", type: "OrGate", y: 150, relative: {xy: { name:"norGate"}}},
        { name:"nandGate", type: "NandGate", y: 150, relative: {xy: { name:"orGate"}}},

        { name:"andInv1", type: "Inverter", scale: 0.35, x: -90, relative: {xy: { name:"andGate", io: "A"}}},
        { name:"andInv2", type: "Inverter", scale: 0.35, x: -90, relative: {xy: { name:"andGate", io: "B"}}},

        { name:"orInv1", type: "Inverter", scale: 0.35, x: -90, relative: {xy: { name:"orGate", io: "A"}}},
        { name:"orInv2", type: "Inverter", scale: 0.35, x: -90, relative: {xy: { name:"orGate", io: "B"}}},

        { name:"andLight", type: "BitLight", x: 125, relative: {xy: { name:"andGate", io: "out"}}},
        { name:"orLight", type: "BitLight", relative: {x: { name:"andLight"}, y: { name:"orGate"}}},
        { name:"nandLight", type: "BitLight", relative: {x: { name:"andLight"}, y: { name:"nandGate"}}},
        { name:"norLight", type: "BitLight", relative: {x: { name:"andLight"}, y: { name:"norGate"}}},

        { name:"andNodeA", type: "Node", relative: {x: { name:"switchA"}, y: { name:"andGate", io: "A"}}},
        { name:"andNodeB", type: "Node", relative: {x: { name:"switchB"}, y: { name:"andGate", io: "B"}}},
        { name:"norNodeA", type: "Node", relative: {x: { name:"switchA"}, y: { name:"norGate", io: "A"}}},
        { name:"norNodeB", type: "Node", relative: {x: { name:"switchB"}, y: { name:"norGate", io: "B"}}},
        { name:"orNodeA", type: "Node", relative: {x: { name:"switchA"}, y: { name:"orGate", io: "A"}}},
        { name:"orNodeB", type: "Node", relative: {x: { name:"switchB"}, y: { name:"orGate", io: "B"}}},
        { name:"nandJointA", type: "Joint", relative: {x: { name:"switchA"}, y: { name:"nandGate", io: "A"}}},
        { name:"nandJointB", type: "Joint", relative: {x: { name:"switchB"}, y: { name:"nandGate", io: "B"}}},

        { name:"brace1", type: "Brace", orientation: "right", extent: 110, x: 565, y: 175},
        { name:"brace2", type: "Brace", orientation: "right", extent: 110, x: 565, y: 475},

        { name:"equal1", type: "Label", text: "=", size: 2, x: 600, y: 175},
        { name:"equal2", type: "Label", text: "=", size: 2, x: 600, y: 475},
    ],
    wires:
    [
        { points:[{ name:"switchA", io: "bottom"}, { name:"andNodeA"}]},
        { points:[{ name:"switchB", io: "bottom"}, { name:"andNodeB"}]},

        { points:[{ name:"andNodeA"}, { name:"norNodeA"}]},
        { points:[{ name:"andNodeB"}, { name:"norNodeB"}]},

        { points:[{ name:"norNodeA"}, { name:"orNodeA"}]},
        { points:[{ name:"norNodeB"}, { name:"orNodeB"}]},

        { points:[{ name:"andNodeA"}, { name:"andInv1"}]},
        { points:[{ name:"andInv1", io: "out"}, { name:"andGate", io: "A", input: 0}]},
        { points:[{ name:"andNodeB"}, { name:"andInv2"}]},
        { points:[{ name:"andInv2", io: "out"}, { name:"andGate", io: "B", input: 1}]},

        { points:[{ name:"norNodeA"}, { name:"norGate", io: "A", input: 0}]},
        { points:[{ name:"norNodeB"}, { name:"norGate", io: "B", input: 1}]},

        { points:[{ name:"orNodeA"}, { name:"orInv1"}]},
        { points:[{ name:"orInv1", io: "out"}, { name:"orGate", io: "A", input: 0}]},
        { points:[{ name:"orNodeB"}, { name:"orInv2"}]},
        { points:[{ name:"orInv2", io: "out"}, { name:"orGate", io: "B", input: 1}]},

        { points:[{ name:"orNodeA"}, { name:"nandJointA"}, { name:"nandGate", io: "A", input: 0}]},
        { points:[{ name:"orNodeB"}, { name:"nandJointB"}, { name:"nandGate", io: "B", input: 1}]},

        { points:[{ name:"andGate", io: "out"}, { name:"andLight", io: "left"}]},
        { points:[{ name:"orGate", io: "out"}, { name:"orLight", io: "left"}]},
        { points:[{ name:"nandGate", io: "out"}, { name:"nandLight", io: "left"}]},
        { points:[{ name:"norGate", io: "out"}, { name:"norLight", io: "left"}]},
    ]
}