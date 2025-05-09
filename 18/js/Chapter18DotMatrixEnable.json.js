// Chapter18DotMatrixEnable (c) Charles Petzold, 2024

let Chapter18DotMatrixEnable = 
{
    name: "Chapter18DotMatrixEnable",
    transform: { x: 0, y: 0, scale: 1, rotate: 0 },
    components:
    [
        { name: "and0", type:"AndGate", noPropagationDelay: true, scale:0.75, rotate: -90 },
        { name: "and1", type:"AndGate", noPropagationDelay: true, scale:0.75, rotate: -90, x: 100},
        { name: "and2", type:"AndGate", noPropagationDelay: true, scale:0.75, rotate: -90, x: 200},
        { name: "and3", type:"AndGate", noPropagationDelay: true, scale:0.75, rotate: -90, x: 300},
        { name: "and4", type:"AndGate", noPropagationDelay: true, scale:0.75, rotate: -90, x: 400},

        { name: "jointCommon0", type: "Joint", relative: {xy: { name:"and0", io: "B"}}, y: 100 },
        { name: "nodeCommon1", type: "Node", relative: {x: { name:"and1", io: "B"}, y: { name:"jointCommon0"}}},
        { name: "nodeCommon2", type: "Node", relative: {x: { name:"and2", io: "B"}, y: { name:"jointCommon0"}}},
        { name: "nodeCommon3", type: "Node", relative: {x: { name:"and3", io: "B"}, y: { name:"jointCommon0"}}},
        { name: "nodeCommon4", type: "Node", relative: {x: { name:"and4", io: "B"}, y: { name:"jointCommon0"}}},

        { name: "node0", type: "Node", relative: {xy: { name:"and0", io: "A"}}, y: 250 },
        { name: "node1", type: "Node", relative: {xy: { name:"and1", io: "A"}}, y: 350 },
        { name: "node2", type: "Node", relative: {xy: { name:"and2", io: "A"}}, y: 450 },
        { name: "node3", type: "Node", relative: {xy: { name:"and3", io: "A"}}, y: 550 },
        { name: "node4", type: "Node", relative: {xy: { name:"and4", io: "A"}}, y: 650 }
    ],
    wires:
    [
        { points:[{ name:"nodeCommon1"}, { name:"and1", io: "B", input: 1}]},
        { points:[{ name:"nodeCommon2"}, { name:"and2", io: "B", input: 1}]},
        { points:[{ name:"nodeCommon3"}, { name:"and3", io: "B", input: 1}]},
        { points:[{ name:"nodeCommon4"}, { name:"and4", io: "B", input: 1}]},

        { points:[{ name:"nodeCommon4"}, { name:"nodeCommon3"}]},
        { points:[{ name:"nodeCommon3"}, { name:"nodeCommon2"}]},
        { points:[{ name:"nodeCommon2"}, { name:"nodeCommon1"}]},
        { points:[{ name:"nodeCommon1"}, { name:"jointCommon0"}, { name:"and0", io: "B", input: 1}]},

        { points: [{ name:"node0"}, { name:"and0", io: "A", input: 0}]},
        { points: [{ name:"node1"}, { name:"and1", io: "A", input: 0}]},
        { points: [{ name:"node2"}, { name:"and2", io: "A", input: 0}]},
        { points: [{ name:"node3"}, { name:"and3", io: "A", input: 0}]},
        { points: [{ name:"node4"}, { name:"and4", io: "A", input: 0}]}
    ]
}
