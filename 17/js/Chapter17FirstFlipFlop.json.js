// Chapter17FirstFlipFlop (c) Charles Petzold, 2024

let Chapter17FirstFlipFlop = {
    name: "Chapter17FirstFlipFlop",
    transform: {x: 200, y: 100, scale: 1, rotate: 0},
    propagationDelay: 100,
    components:
    [
        { name:"nor2", type:"NorGate", x: 300, y: 100}, 
        { name:"nor1", type:"NorGate", x:-250, relative: { xy: { name:"nor2", io: "A" } }},

        { name:"switch1", type: "Switch", x: -160, relative: {xy: { name:"nor1", io: "B"}}},
        { name:"switch2", type: "Switch", y: 100, relative: {xy: { name:"switch1"}}},

        { name: "jt2", type: "Joint", x:-50, relative: {x: { name:"nor2", io: "B" }, y: { name:"switch2"}}},
        { name: "jt3", type: "Joint", relative: {x: { name:"jt2"}, y: { name:"nor2", io: "B"}}},

        { name:"node", type: "Node", x: 50, relative: {xy: { name:"nor2", io: "out"}}},
        { name: "jloop1", type: "Joint", y: -100, relative: {xy: { name:"node" }}},
        { name: "jloop2", type: "Joint", x: -50, relative: {x: { name:"nor1", io: "A" }, y: { name:"jloop1"}}},
        { name: "jloop3", type: "Joint", relative: {x: { name:"jloop2"}, y: { name:"nor1", io: "A"}}},
        { name: "light", type: "Lightbulb", x: 100, y: -30, relative: { xy: { name: "node" }}},
        { name: "jt4", type: "Joint", relative: { x: { name: "light", io: "left"}, y: { name:"node" }}},
        { name: "ground", type: "Ground", y: 50, relative: {xy: { name:"light", io: "right"}}},
        { name: "v1", type: "V", x: -50, y: -35, relative: {xy: { name:"switch1"}}},
        { name: "jtv1", type: "Joint", relative: { x: { name: "v1"}, y: { name:"switch1"}}},
        { name: "v2", type: "V", x: -50, y: -35, relative: {xy: { name:"switch2"}}},
        { name: "jtv2", type: "Joint", relative: { x: { name: "v2"}, y: { name:"switch2"}}}
    ],

    wires:
    [
        { name: "wireSw1", points: [ { name:"switch1", io: "out"}, { name:"nor1", io: "B", input: 1} ] },
        { name: "wireNorNor", points: [ { name:"nor1", io: "out"}, { name:"nor2", io: "A", input: 0}]},
        { name: "wireNor2Out", points: [ { name:"nor2", io: "out"}, { name:"node"}]},
        { name: "wireLoop", points: [ { name:"node"}, { name:"jloop1"}, { name:"jloop2"}, { name: "jloop3"}, { name:"nor1", io: "A", input: 0}]},
        { name: "wireSW2", points: [ { name:"switch2", io: "out"}, { name:"jt2"}, { name:"jt3"}, { name:"nor2", io: "B", input: 1}]},
        { name: "wireLight1", points: [ { name:"node"}, { name:"jt4"}, { name:"light", io: "left"} ]},
        { name: "wireGround", points: [ { name:"light", io: "right"}, { name:"ground"}]},
        { name: "wirev1", points: [ { name:"switch1"}, { name:"jtv1"}, { name:"v1"}]},
        { name: "wirev2", points: [ { name:"switch2"}, { name:"jtv2"}, { name:"v2"}]}
    ]
}