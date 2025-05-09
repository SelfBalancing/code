// Chapter18LowReset (c) Charles Petzold, 2024

let Chapter18LowReset = 
{
    name: "Chapter18LowReset",
    transform: { x: 0, y: 0, scale: 1, rotate: 0 },
    components:
        [
            { name: "lowBase", type: "External", file: "Chapter18LowNoReset"},
            
            { name: "andLow", type: "AndGate", x: -20, y: -50, scale: 0.33, rotate: 180, relative: {xy: { name:"lowBase.ff3.qJoint"}}},
            { name: "low1ClearNode", type: "Node", relative: {x: { name:"lowBase.ff1.qJoint"}, y: { name:"andLow", io: "A"}}},
            { name: "low3ClearNode", type: "Node", relative: {x: { name:"lowBase.ff3.qJoint"}, y: { name:"andLow", io: "B"}}},

            { name: "andLowJoint", type: "Joint", x:-25, relative: {xy: { name:"andLow", io: "out"}}},

            { name: "clrNode3", type: "Node", y: 50, relative: {xy: { name:"lowBase.ff3.ff", io: "Clr"}}},
            { name: "clrJoint", type: "Joint", relative: {x: { name:"andLowJoint"}, y: { name:"clrNode3"}}},
            { name: "clrNode2", type: "Node", relative: {x: { name:"lowBase.ff2.ff", io: "Clr"}, y: { name:"clrNode3"}}},
            { name: "clrNode1", type: "Node", relative: {x: { name:"lowBase.ff1.ff", io: "Clr"}, y: { name:"clrNode3"}}},
            { name: "clrJoint0", type: "Joint", relative: {x: { name:"lowBase.ff0.ff", io: "Clr"}, y: { name:"clrNode3"}}}
        ],
        
    wires:
        [
            { points: [{ name:"andLow", io: "out"}, { name:"andLowJoint"}, { name:"clrJoint"}, { name:"clrNode3"}]},

            { points: [{ name:"lowBase.ff1.ff", io: "Q", output: "q"}, { name:"lowBase.ff1.qJoint"}, { name:"low1ClearNode"}]},
            { points: [{ name:"lowBase.ff3.ff", io: "Q", output: "q"}, { name:"lowBase.ff3.qJoint"}, { name:"low3ClearNode"}]},

            { points:[{ name:"low1ClearNode"}, { name:"andLow", io: "A", input: 0}]},
            { points:[{ name:"low3ClearNode"}, { name:"andLow", io: "B", input: 1}]},

            { points: [{ name:"clrNode3"}, { name:"lowBase.ff3.ff", io: "Clr", input: "clr"}]},
            { points: [{ name:"clrNode3"}, { name:"clrNode2"}]},
    
            { points: [{ name:"clrNode2"}, { name:"lowBase.ff2.ff", io: "Clr", input: "clr"}]},
            { points: [{ name:"clrNode2"}, { name:"clrNode1"}]},

            { points: [{ name:"clrNode1"}, { name:"lowBase.ff1.ff", io: "Clr", input: "clr"}]},
            { points: [{ name:"clrNode1"}, { name:"clrJoint0"}, { name:"lowBase.ff0.ff", io: "Clr", input: "clr"}]}
       ]
}