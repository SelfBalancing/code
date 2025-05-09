// Chapter18ColumnDecoder (c) Charles Petzold, 2024

let Chapter18ColumnDecoder = 
{
    name: "Chapter18ColumnDecoder",
    transform: { x: 0, y: 0, scale: 1, rotate: 0 },
      components: [

        { name: "select", type: "External", file: "Chapter18ColumnSelect", scale: 0.57, x: -250, y:158},

        { name: "and0", type: "AndGate", scale: 0.33, rotate: -90, inputs: 3, x: -170, noPropagationDelay: true },
        { name: "and1", type: "AndGate", scale: 0.33, rotate: -90, inputs: 3, x: -120, noPropagationDelay: true },
        { name: "and2", type: "AndGate", scale: 0.33, rotate: -90, inputs: 3, x: -70, noPropagationDelay: true },
        { name: "and3", type: "AndGate", scale: 0.33, rotate: -90, inputs: 3, x: -20, noPropagationDelay: true },

        { name: "inv2", type: "Inverter", rotate: -90, scale: 0.20, y:90, relative: {xy: { name:"and3", io: "3/3"}}, noPropagationDelay: true},
        { name: "inv2InvNode", type: "Node", y: 15, relative: {y: { name:"inv2"}, x: { name:"select.low2ClearNode"}}},
        { name: "inv2InvJoint", type: "Joint", relative: {y: { name:"inv2InvNode"}, x: { name:"inv2"}}},

        { name:"inv2And3Node", type: "Node", relative: {xy: { name:"and3", io: "3/3"}}, y: 15},
        { name:"inv2And2Node", type: "Node", relative: {x: { name:"and2", io: "3/3"}, y: { name:"inv2And3Node"}}},
        { name:"inv2And1Node", type: "Node", relative: {x: { name:"and1", io: "3/3"}, y: { name:"inv2And3Node"}}},
        { name:"inv2And0Joint", type: "Joint", relative: {x: { name:"and0", io: "3/3"}, y: { name:"inv2And3Node"}}},

        { name: "inv1", type: "Inverter", rotate: -90, scale: 0.20, relative: {y: { name:"inv2"}, x: { name:"and1", io: "2/3"}}, noPropagationDelay: true},
        { name: "inv1InvNode", type: "Node", y: 15, relative: {y: { name:"inv1"}, x: { name:"select.ff1.qJoint"}}},
        { name: "inv1InvJoint", type: "Joint", relative: {y: { name:"inv1InvNode"}, x: { name:"inv1"}}},
        { name: "inv1And1Node", type: "Node", relative: {xy: { name:"and1", io: "2/3"}}, y: 25},
        { name: "inv1And0Joint", type: "Joint", relative: {x: { name:"and0", io: "2/3"}, y: { name:"inv1And1Node"}}},

        { name:"inv0", type: "Inverter", rotate: -90, scale: 0.20, relative: {x: { name:"and0", io:"1/3"}, y: { name:"inv2"}}, noPropagationDelay: true},
        { name:"inv0InvNode", type: "Node", y: 15, relative: {x: { name:"select.low0ClearNode"}, y: { name:"inv0"}}},
        { name: "inv0InvJoint", type: "Joint", relative: {y: { name:"inv0InvNode"}, x: { name:"inv0"}}},
        { name:"inv0And0Node", type: "Node", relative: {xy: { name:"and0", io: "1/3"}}, y: 35},
        { name:"inv0And2Joint", type: "Joint", relative: {x: { name:"and2", io: "1/3"}, y: { name:"inv0And0Node"}}},

        { name:"q1Node", type: "Node", relative: {x: { name:"inv1InvNode"}, y: { name:"inv0And0Node"}}},
        { name:"q1And2Joint", type: "Joint", relative: {x: { name:"and2", io: "2/3"}, y: { name:"q1Node"}}},
        { name:"q1And3Joint", type: "Joint", relative: {x: { name:"and3", io: "2/3"}, y: { name:"q1Node"}}},

        { name:"q0And1Node", type: "Node", relative: {xy: { name:"and1", io: "1/3"}}, y: 45},
        { name:"q0Joint", type: "Joint", relative: {y: { name:"q0And1Node"}, x: { name:"inv0InvNode"}}},
        { name:"q0And3Joint", type: "Joint", relative: {y: { name:"q0And1Node"}, x: { name:"and3", io: "1/3"}}}
      ],
      wires: [

        { points: [{ name:"select.low2ClearNode"}, { name:"inv2InvNode"}]},
        { points: [{ name:"inv2InvNode"}, { name:"inv2InvJoint"}, { name:"inv2"}]},
        { points: [{ name:"inv2", io: "out"}, { name:"inv2And3Node"}]},
        { points: [{ name:"inv2And3Node"}, { name:"and3", io: "3/3", input: 2}]},
        { points: [{ name:"inv2And3Node"}, { name:"inv2And2Node"}]},
        { points: [{ name:"inv2And2Node"}, { name:"and2", io: "3/3", input: 2}]},
        { points: [{ name:"inv2And2Node"}, { name:"inv2And1Node"}]},
        { points: [{ name:"inv2And1Node"}, { name:"and1", io: "3/3", input: 2}]},
        { points: [{ name:"inv2And1Node"}, { name:"inv2And0Joint"}, { name:"and0", io: "3/3", input: 2}]},

        { points:[{ name:"select.ff1.ff", io: "Q", output: "q"}, { name:"select.ff1.qJoint"}, { name:"inv1InvNode"}]},
        
        { points:[{ name:"inv1InvNode"}, { name:"inv1InvJoint"}, { name:"inv1"}]},
        { points:[{ name:"inv1", io: "out"}, { name:"inv1And1Node"}]},
        { points:[{ name:"inv1And1Node"}, { name:"and1", io: "2/3", input: 1}]},
        { points:[{ name:"inv1And1Node"}, { name:"inv1And0Joint"}, { name:"and0", io: "2/3", input: 1}]},

        { points:[{ name:"select.low0ClearNode"}, { name:"inv0InvNode"}]},
        { points:[{ name:"inv0InvNode"}, { name:"inv0InvJoint"}, { name:"inv0"}]},
        { points: [{ name:"inv0", io: "out"}, { name:"inv0And0Node"}]},
        { points:[{ name:"inv0And0Node"}, { name:"and0", io: "1/3", input: 0}]},
        { points:[{ name:"inv0And0Node"}, { name:"inv0And2Joint"}, { name:"and2", io: "1/3", input: 0}]},

        { points:[{ name:"inv1InvNode"}, { name:"q1Node"}]},
        { points:[{ name:"q1Node"}, { name:"q1And2Joint"}, { name:"and2", io: "2/3", input: 1}]},
        { points:[{ name:"q1Node"}, { name:"q1And3Joint"}, { name:"and3", io: "2/3", input: 1}]},

        { points:[{ name:"inv0InvNode"}, { name:"q0Joint"}, { name:"q0And1Node"}]},
        { points: [{ name:"q0And1Node"}, { name:"and1", io:"1/3", input: 0}]},
        { points:[{ name:"q0And1Node"}, { name:"q0And3Joint"}, { name:"and3", io: "1/3", input: 0}]}
      ]
    }
    
    