// Chapter18HoursCore (c) Charles Petzold, 2024

let Chapter18HoursCore = 
{
    name: "Chapter18HoursCore",
    transform: { x: 0, y: 0, scale: 1, rotate: 0 },
    components:
        [
            { name: "low", type: "External", x:0, file: "Chapter18LowDigit" },
            { name: "ff4", type: "External", x:-135, file: "Chapter18FlipFlop"},

            { name: "carryLowHighJoint", type: "Joint", relative: {y: { name:"low.nandLow", io: "out"}, x: { name:"ff4.clkJoint"}}},

            { name: "tensLoopJoint3", type: "Joint", x: -15, relative: {xy: { name:"ff4.ff", io: "Q|OL"}}},
            { name: "tensLoopJoint2", type: "Joint", relative: {x: { name:"tensLoopJoint3"}, y: { name:"ff4.loopJoint2"}}},

         { name: "andTensClear", type: "AndGate", inputs: 3, x:-20, y: -40, scale: 0.5, rotate: 180, relative: {x: { name:"ff4.qJoint"}, y: { name:"low.nandLow"}}},
         
         { name: "inv", type: "Inverter", x: 75, scale: 0.25, rotate: 180, relative: {xy: { name:"andTensClear", io: "1/3"}}},
         { name: "invNode", type: "Node", relative: {x: { name:"low.low3CarryNode"}, y: { name:"inv" }}},

            { name: "andTensClearNodeB", type: "Node", relative: {x: { name:"ff4.qJoint"}, y: { name:"andTensClear", io: "3/3"}}},
            { name: "andTensClearNodeA", type: "Node", relative: { x: { name:"low.lowBase.ff1.qJoint"}, y: { name:"andTensClear", io: "2/3"}}},

            { name: "nandTensCarry", type: "NandGate", y: -50, scale: 0.33, rotate: 180, relative: {xy: { name:"andTensClear"}}},
            { name: "nandTensCarryNodeB", type: "Node", relative: {x: { name:"ff4.qJoint"}, y: { name:"nandTensCarry", io: "B"}}},
            { name: "nandTensCarryNodeA", type: "Node", relative: { x: { name:"low.lowBase.ff0.qJoint"}, y: { name:"nandTensCarry", io: "A"}}},

            { name: "clearOr", type: "OrGate", scale: 0.33, relative: {x: { name:"low.andLow", io: "out"}, y: { name:"low.clrJoint"}}},

            { name: "orJointA", type: "Joint", relative: {x: { name:"low.andLowJoint"}, y: { name:"clearOr", io: "A"}}},

            { name: "nodeTensClear", type: "Node", relative: { x: { name:"ff4.ff", io:"Clr"}, y: { name:"clearOr", io: "B"}}},
            { name: "joint1TensOut", type: "Joint", x:-25, relative: { xy: { name:"andTensClear", io: "out"}}},
            { name: "joint2TensOut", type: "Joint", relative: { x: { name:"joint1TensOut"}, y: { name:"clearOr", io: "B"}}}
        ],   
    wires:
        [
            { points: [{ name:"low.nandLow", io: "out"}, { name:"carryLowHighJoint"}, { name:"ff4.clkJoint"}, { name:"ff4.ff", io: "Clk", input: "clk"}]},

            { points: [{ name:"ff4.ff", io: "Q|OL", output: "qbar"}, { name:"tensLoopJoint3"}, { name:"tensLoopJoint2"}, { name: "ff4.loopJoint1"}, { name:"ff4.dJoint"}, { name:"ff4.ff", io: "D", input: "data"}]},

            { points: [{ name:"clearOr", io: "out"}, { name:"low.clrNode3"}]},
            { points: [{ name:"ff4.ff", io:"Q", output: "q"}, { name:"ff4.qJoint"}, { name:"andTensClearNodeB"}]},
            { points: [{ name:"andTensClearNodeB"}, { name:"andTensClear", io: "3/3", input: 2}]},

            { points: [{ name:"nandTensCarryNodeB"}, { name:"nandTensCarry", io: "B", input: 1}]},

            { points: [{ name:"low.low0CarryNode"}, { name: "nandTensCarryNodeA"}]},
            { points: [{ name:"nandTensCarryNodeA"}, { name:"nandTensCarry", io: "A", input: 0}]},

            { points:[{ name:"low.low1ClearNode"}, { name:"andTensClearNodeA"}]},
            { points: [{ name:"andTensClearNodeA"}, { name:"andTensClear", io: "2/3", input: 1}]},

            { points: [{ name:"low.low3CarryNode"}, { name:"invNode"}]},
            { points: [{ name:"invNode"}, { name:"inv"}]},

            { points: [{ name:"inv", io: "out"}, { name:"andTensClear", io: "1/3", input: 0 }]},

            { points: [{ name:"low.andLow", io: "out"}, { name:"low.andLowJoint"}, { name:"orJointA"}, { name:"clearOr", io: "A", input: 0}]},

            { points: [{ name:"andTensClear", io: "out"}, { name:"joint1TensOut"}, { name: "joint2TensOut"}, { name:"nodeTensClear"}]},
            { points: [{ name:"nodeTensClear"}, { name:"clearOr", io: "B", input: 1}]},
            { points: [{ name:"nodeTensClear"}, { name:"ff4.ff", io: "Clr", input: "clr"}]}
      ]
}