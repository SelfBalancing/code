// Chapter18HoursLights (c) Charles Petzold, 2024

let Chapter18HoursLights = 
{
    name: "Chapter18HoursLights",
    components:
        [
            { name: "hours", type: "External", file: "Chapter18Hours" },

            { name: "lightHours0", type: "BitLight", y: -375, relative: {xy: { name:"hours.core.low.lowBase.ff0.qJoint"}}},
            { name: "lightHours1", type: "BitLight", y: -375, relative: {y: { name:"hours.core.low.lowBase.ff0.qJoint"}, x: { name:"hours.twelveOr1"}}},
            { name: "lightHours2", type: "BitLight", y: -375, relative: {xy: { name:"hours.core.low.lowBase.ff2.qJoint"}}},
            { name: "lightHours3", type: "BitLight", y: -375, relative: {xy: { name:"hours.core.low.lowBase.ff3.qJoint"}}},
            { name: "lightHours4", type: "BitLight", y: -375, relative: {y: { name:"hours.core.ff4.qJoint"}, x: { name:"hours.twelveOr4"}}}
        ],       

    wires:
        [
            { points: [{ name:"hours.core.nandTensCarryNodeA"}, { name:"lightHours0", io: "bottom"}]},
            { points: [{ name:"hours.twelveOr1", io: "out"}, { name:"lightHours1", io: "bottom"}]},
            { points: [{ name:"hours.bigNorNode2"}, { name:"lightHours2", io: "bottom"}]},
            { points: [{ name:"hours.core.invNode"}, { name:"lightHours3", io: "bottom"}]},
            { points: [{ name:"hours.twelveOr4", io: "out"}, { name:"lightHours4", io: "bottom"}]}
        ]    
}