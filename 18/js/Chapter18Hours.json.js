// Chapter18Hours (c) Charles Petzold, 2024

let Chapter18Hours = 
{
    name: "Chapter18Hours",
    transform: { x: 0, y: 0, scale: 1, rotate: 0 },
    components:
        [
            { name: "core", type: "External", file: "Chapter18HoursCore" },

            { comment: "The 5-input NOR that transforms 0-0000 into 1-0010" },

            { name: "bigNorNode2", type: "Node", y:-25, relative: { y: { name:"core.low.nandLow"}, x: { name:"core.low.lowBase.ff2.qJoint"}}},
            { name: "bigNor", type: "NorGate", inputs: 5, x: 50, scale: 0.83, relative: {x: { name:"core.low.lowBase.ff0.ff"}, y: { name:"bigNorNode2"}}},

            { name: "twelveOr1", type: "OrGate", x: 8, y:-260, scale: 0.33, rotate: -90, relative: {xy: { name:"core.low.lowBase.ff1.qJoint"}}},
            { name: "twelveOr4", type: "OrGate", x: 8, y:-260, scale: 0.33, rotate: -90, relative: {xy: { name:"core.ff4.qJoint"}}},

            { name: "bigNorJoint1", type: "Joint", x: 25, relative: {xy: { name:"bigNor", io: "out"}}},
            { name: "bigNorJoint2", type: "Joint", y: -100, relative: {xy: { name:"bigNorJoint1"}}},
            { name: "bigNorNode3", type: "Node", relative: { x: { name:"twelveOr1", io: "B"}, y: { name:"bigNorJoint2"}}},
            { name: "bigNorJoint4", type: "Joint", relative: { x: { name:"twelveOr4", io: "B"}, y: { name:"bigNorJoint2"}}}
        ], 

    wires:
        [
            { points: [{ name:"core.andTensClearNodeB"}, { name:"bigNor", io: "1/5", input: 0}]},
            { points: [{ name:"core.andTensClearNodeA"}, { name:"bigNor", io: "2/5", input: 1}]},
            { points: [{ name:"bigNorNode2"}, { name:"bigNor",io: "3/5", input: 2}]},
            { points: [{ name:"core.low.low3CarryNode"}, { name:"bigNor", io: "4/5", input: 3}]},
            { points: [{ name:"core.low.low0CarryNode"}, { name:"bigNor", io: "5/5", input: 4}]},

            { points: [{ name:"core.andTensClearNodeB"}, { name:"core.nandTensCarryNodeB"}]},
            { points:[{ name:"core.nandTensCarryNodeB"}, { name:"twelveOr4", io: "A", input: 0}]},
            { points:[{ name:"core.andTensClearNodeA"}, { name:"twelveOr1", io: "A", input: 0}]},

            { points:[{ name:"core.low.lowBase.ff2.ff", io: "Q", output: "q"}, { name:"core.low.lowBase.ff2.qJoint"}, { name:"bigNorNode2"}]},

            { points: [{ name:"bigNor", io: "out"}, { name:"bigNorJoint1"}, { name: "bigNorJoint2"}, { name:"bigNorNode3"}]},
            { points: [{ name:"bigNorNode3"}, { name: "twelveOr1", io: "B", input: 1}]},
            { points: [{ name:"bigNorNode3"}, { name: "bigNorJoint4"}, { name:"twelveOr4", io: "B", input: 1}]}
       ]
}