// Chapter18FlipFlop2 (c) Charles Petzold, 2024

let Chapter18FlipFlop2 = 
{
    name: "Chapter18FlipFlop2",
    transform: { x: 0, y: 0, scale: 1, rotate: 0 },
    components:
        [
            { name: "ff", type: "FlipFlop", width: 80, height: 80, fontScale:0.5, ports: [
                { text: "Clk", x: 0, y: 0.25, edge: true},
                { text: "D",  x: 0, y: 0.75 },
                { text: "Q", x: 1, y: 0.25 },
                { text: "Q|OL", x: 1, y: 0.75 },
                { text: "Clr",  x: 0.5, y: 1 }
            ]},

            { name:"clkJoint", type: "Joint", x:-30, relative: {xy: { name:"ff", io: "Clk"}}},
            { name:"dJoint", type: "Joint", x:-15, relative: {xy: { name:"ff", io: "D"}}},
            { name:"qJoint", type: "Joint", x:15, relative: {xy: { name:"ff", io: "Q"}}},
            { name:"loopJoint1", type: "Joint", y: 40, relative: {xy: { name:"dJoint"}}},
            { name:"loopJoint2", type: "Joint", relative: {x: { name:"clkJoint"}, y: { name:"loopJoint1"}}}
        ],       

    wires:
        [
        ]
}