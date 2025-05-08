// Chapter17EightBitRippleCounter (c) Charles Petzold, 2024

let Chapter17EightBitRippleCounter = 
{
    name: "Chapter17EightBitRippleCounter",
    transform: { x: 365, y: 75, scale: 1, rotate: 0 },
    nodeRadius: 3,
    wireCurveRadius: 10,
    propagationDelay: 0,
    components:
        [
            { name: "stage0", type: "External", file: "Chapter17EightBitRippleComponent", x: 1050 },
            { name: "stage1", type: "External", file: "Chapter17EightBitRippleComponent", x: 900 },
            { name: "stage2", type: "External", file: "Chapter17EightBitRippleComponent", x: 750 },
            { name: "stage3", type: "External", file: "Chapter17EightBitRippleComponent", x: 600 },
            { name: "stage4", type: "External", file: "Chapter17EightBitRippleComponent", x: 450 },
            { name: "stage5", type: "External", file: "Chapter17EightBitRippleComponent", x: 300 },
            { name: "stage6", type: "External", file: "Chapter17EightBitRippleComponent", x: 150 },
            { name: "stage7", type: "External", file: "Chapter17EightBitRippleComponent", x: 0 },

            { name: "oscInv", type: "Inverter", propagationDelay: 500, y: -75, scale: 0.25, relative: { xy: { name: "stage0.coreEdge.dNode" }}},
            { name: "oscNode", type: "Node", x: 25, relative: {xy: { name:"oscInv", io: "out"}}},
            { name: "oscLoop1", type: "Joint", y: 25, relative: { xy: { name:"oscNode"}}},
            { name: "oscLoop3", type: "Joint", x: -50, relative: {xy: { name: "oscInv"}}},
            { name: "oscLoop2", type: "Joint", relative: {x: { name:"oscLoop3"}, y: { name: "oscLoop1"}}},
            { name: "oscJoint", type: "Joint", relative: {x: { name:"stage0.coreEdge.clkNode"}, y: { name:"oscNode"}}},

            { name: "value", type: "DynamicDecimal", text: "0", x: 75, y:75, relative: { xy: { name:"stage4.light" }}, 
                    digits: {0: "stage0.light", 1: "stage1.light", 2: "stage2.light", 3: "stage3.light", 
                             4: "stage4.light", 5: "stage5.light", 6: "stage6.light", 7: "stage7.light"}}

        ],       

    wires:
        [
            { points: [{ name:"stage0.dataClockNode"}, { name:"stage1.coreEdge.clkNode"}]},
            { points: [{ name:"stage1.dataClockNode"}, { name:"stage2.coreEdge.clkNode"}]},
            { points: [{ name:"stage2.dataClockNode"}, { name:"stage3.coreEdge.clkNode"}]},
            { points: [{ name:"stage3.dataClockNode"}, { name:"stage4.coreEdge.clkNode"}]},
            { points: [{ name:"stage4.dataClockNode"}, { name:"stage5.coreEdge.clkNode"}]},
            { points: [{ name:"stage5.dataClockNode"}, { name:"stage6.coreEdge.clkNode"}]},
            { points: [{ name:"stage6.dataClockNode"}, { name:"stage7.coreEdge.clkNode"}]},

            { points: [{ name:"oscInv", io: "out"}, { name:"oscNode"}]},
            { points: [{ name:"oscNode"}, { name: "oscLoop1"}, { name:"oscLoop2"}, { name: "oscLoop3"}, { name:"oscInv"}]},
            { points: [{ name:"oscNode"}, { name:"oscJoint"}, { name:"stage0.coreEdge.clkNode"}]}

        ]
}