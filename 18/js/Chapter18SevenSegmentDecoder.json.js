// Chapter18SevenSegmentDecoder (c) Charles Petzold, 2024

let Chapter18SevenSegmentDecoder = 
{
    name: "Chapter18SevenSegmentDecoder",
    transform: { x: 0, y: 0, scale: 1, rotate: 0 },
    components:
        [
            { name: "bcd", type: "External", file: "Chapter18BcdDecoder", scale: 1.75},

            { name: "seven", type: "SevenSegment", y: -475 },

            { name: "dNor", type: "NorGate", inputs: 3, scale: 0.5, rotate: -90, x: 0, y: -250 },
            { name: "aNor", type: "NorGate", inputs: 2, scale: 0.5, rotate: -90, x: -280, relative: {xy: { name:"dNor"}}},
            { name: "fNor", type: "NorGate", inputs: 4, scale: 0.5, rotate: -90, x: -210, relative: {xy: { name:"dNor"}}},
            { name: "eOr", type: "OrGate", inputs: 4, scale: 0.5, rotate: -90, x: -140, relative: {xy: { name:"dNor"}}},
            { name: "cInv", type: "Inverter", scale: 0.5, rotate: -90, x: 140 , relative: {xy: { name:"dNor"}}},
            { name: "gNor", type: "NorGate", inputs: 3, scale: 0.5, rotate: -90, x: 210 , relative: {xy: { name:"dNor"}}},
            { name: "bNor", type: "NorGate", inputs: 2, scale: 0.5, rotate: -90, x: 280, relative: {xy: { name:"dNor"}}},

            { name: "aJoint", type: "Joint", relative: {x: { name:"aNor"}, y: { name:"seven", io: "a"}}},
            { name: "bJoint", type: "Joint", relative: {x: { name:"bNor"}, y: { name:"seven", io: "b"}}},
            { name: "cJoint", type: "Joint", relative: {x: { name:"cInv"}, y: { name:"seven", io: "c"}}},
            { name: "eJoint", type: "Joint", relative: {x: { name:"eOr"}, y: { name:"seven", io: "e"}}},
            { name: "fJoint", type: "Joint", relative: {x: { name:"fNor"}, y: { name:"seven", io: "f"}}},
            { name: "gJoint", type: "Joint", relative: {x: { name:"gNor"}, y: { name:"seven", io: "g"}}},

            { name: "and0Joint", type: "Joint", y: -130, relative: {xy: { name:"bcd.and0", io: "out"}}},
            { name: "and0eNode", type: "Node", relative: {y: { name:"and0Joint"}, x: { name:"eOr", io: "1/4"}}},
            { name: "and0gJoint", type: "Joint", relative: {y: { name:"and0Joint"}, x: { name:"gNor", io: "1/3"}}},

            { name: "and1Node", type: "Node", y: -115, relative: {xy: { name:"bcd.and1", io: "out"}}},
            { name: "and1aJoint", type: "Joint", relative: {y: { name:"and1Node"}, x: { name:"aNor", io: "1/2"}}},
            { name: "and1fNode", type: "Node", relative: {y: { name:"and1Node"}, x: { name:"fNor", io: "1/4"}}},
            { name: "and1dNode", type: "Node", relative: {y: { name:"and1Node"}, x: { name:"dNor", io: "1/3"}}},
            { name: "and1gJoint", type: "Joint", relative: {y: { name:"and1Node"}, x: { name:"gNor", io: "2/3"}}},

            { name: "and2Node", type: "Node", y: -100, relative: {xy: { name:"bcd.and2", io: "out"}}},
            { name: "and2fJoint", type: "Joint", relative: {y: { name:"and2Node"}, x: { name:"fNor", io: "2/4"}}},
            { name: "and2eNode", type: "Node", relative: {y: { name:"and2Node"}, x: { name:"eOr", io: "2/4"}}},
            { name: "and2cJoint", type: "Joint", relative: {y: { name:"and2Node"}, x: { name:"cInv"}}},

            { name: "and3Joint", type: "Joint", y: -85, relative: {xy: { name:"bcd.and3", io: "out"}}},
            { name: "and3fJoint", type: "Joint", relative: {y: { name:"and3Joint"}, x: { name:"fNor", io: "3/4"}}},

            { name: "and4Node", type: "Node", y: -70, relative: {xy: { name:"bcd.and4", io: "out"}}},
            { name: "and4aJoint", type: "Joint", relative: {y: { name:"and4Node"}, x: { name:"aNor", io: "2/2"}}},
            { name: "and4dJoint", type: "Joint", relative: {y: { name:"and4Node"}, x: { name:"dNor", io: "2/3"}}},

            { name: "and5Joint", type: "Joint", y: -70, relative: {xy: { name:"bcd.and5", io: "out"}}},
            { name: "and5bJoint", type: "Joint", relative: {y: { name:"and5Joint"}, x: { name:"bNor", io: "1/2"}}},

            { name: "and6Node", type: "Node", y: -55, relative: {xy: { name:"bcd.and6", io: "out"}}},
            { name: "and6eJoint", type: "Joint", relative: {y: { name:"and6Node"}, x: { name:"eOr", io: "3/4"}}},
            { name: "and6bJoint", type: "Joint", relative: {y: { name:"and6Node"}, x: { name:"bNor", io: "2/2"}}},

            { name: "and7Node", type: "Node", y: -40, relative: {xy: { name:"bcd.and7", io: "out"}}},
            { name: "and7fJoint", type: "Joint", relative: {y: { name:"and7Node"}, x: { name:"fNor", io: "4/4"}}},
            { name: "and7dNode", type: "Node", relative: {y: { name:"and7Node"}, x: { name:"dNor", io: "3/3"}}},
            { name: "and7gJoint", type: "Joint", relative: {y: { name:"and7Node"}, x: { name:"gNor", io: "3/3"}}},

            { name: "and8Joint", type: "Joint", y: -25, relative: {xy: { name:"bcd.and8", io: "out"}}},
            { name: "and8eJoint", type: "Joint", relative: {y: { name:"and8Joint"}, x: { name:"eOr", io: "4/4"}}}

            ],
            wires: [
                { name: "aWire", points: [{ name:"aNor", io: "out"}, { name:"aJoint"}, { name:"seven", io: "a", input: "a"}]},
                { name: "bWire", points: [{ name:"bNor", io: "out"}, { name:"bJoint"}, { name:"seven", io: "b", input: "b"}]},
                { name: "cWire", points: [{ name:"cInv", io: "out"}, { name:"cJoint"}, { name:"seven", io: "c", input: "c"}]},
                { name: "dWire", points: [{ name:"dNor", io: "out"}, { name:"seven", io: "d", input: "d"}]},
                { name: "eWire", points: [{ name:"eOr", io: "out"}, { name:"eJoint"}, { name:"seven", io: "e", input: "e"}]},
                { name: "fWire", points: [{ name:"fNor", io: "out"}, { name:"fJoint"}, { name:"seven", io: "f", input: "f"}]},
                { name: "gWire", points: [{ name:"gNor", io: "out"}, { name:"gJoint"}, { name:"seven", io: "g", input: "g"}]},

                { name: "wire00", points: [{ name:"bcd.and0", io: "out"}, { name:"and0Joint"}, { name:"and0eNode"}]},
                { name: "wire01", points: [{ name:"and0eNode"}, { name:"eOr", io: "1/4", input: 0}]},
                { name: "Wire02", points: [{ name:"and0eNode"}, { name:"and0gJoint"}, { name:"gNor", io: "1/3", input: 0}]},

                { name: "wire10", points: [{ name:"bcd.and1", io: "out"}, { name:"and1Node"}]},
                { name: "wire11", points: [{ name:"and1Node"}, { name:"and1aJoint"}, { name:"aNor", io: "1/2", input: 0}]},
                { name: "wire12", points: [{ name:"and1Node"}, { name:"and1fNode"}]},
                { name: "wire13", points: [{ name:"and1fNode"}, { name:"fNor", io: "1/4", input: 0}]},
                { name: "wire14", points: [{ name:"and1fNode"}, { name:"and1dNode"}]},
                { name: "wire15", points: [{ name:"and1dNode"}, { name:"dNor", io: "1/3", input: 0}]},
                { name: "wire16", points: [{ name:"and1dNode"}, { name:"and1gJoint"}, { name:"gNor", io: "2/3", input: 1}]},

                { name: "wire20", points: [{ name:"bcd.and2", io: "out"}, { name:"and2Node"}]},
                { name: "wire21", points: [{ name:"and2Node"}, { name:"and2fJoint"}, { name:"fNor", io: "2/4", input: 1}]},
                { name: "wire22", points: [{ name:"and2Node"}, { name:"and2eNode"}]},
                { name: "wire23", points: [{ name:"and2eNode"}, { name:"eOr", io: "2/4", input: 1}]},
                { name: "wire24", points: [{ name:"and2eNode"}, { name:"and2cJoint"}, { name:"cInv"}]},

                { name: "wire30", points: [{ name:"bcd.and3", io: "out"}, { name:"and3Joint"}, { name:"and3fJoint"}, { name:"fNor", io: "3/4", input: 2}]},

                { name: "wire40", points: [{ name:"bcd.and4", io: "out"}, { name:"and4Node"}]},
                { name: "wire41", points: [{ name:"and4Node"}, { name:"and4aJoint"}, { name:"aNor", io: "2/2", input: 1}]},
                { name: "wire42", points: [{ name:"and4Node"}, { name:"and4dJoint"}, { name:"dNor", io: "2/3", input: 1}]},

                { name: "wire50", points: [{ name:"bcd.and5", io: "out"}, { name:"and5Joint"}, { name:"and5bJoint"}, { name:"bNor", io: "1/2", input: 0}]},

                { name: "wire60", points: [{ name:"bcd.and6", io: "out"}, { name:"and6Node"}]},
                { name: "wire61", points: [{ name:"and6Node"}, { name:"and6eJoint"}, { name:"eOr", io: "3/4", input: 2}]},
                { name: "wire62", points: [{ name:"and6Node"}, { name:"and6bJoint"}, { name:"bNor", io: "2/2", input: 1}]},

                { name:"wire70", points: [{ name:"bcd.and7", io: "out"}, { name:"and7Node"}]},
                { name: "wire71", points: [{ name:"and7Node"}, { name:"and7dNode"}]},
                { name:"wire72", points: [{ name:"and7dNode"}, { name:"dNor", io: "3/3", input: 2}]},
                { name:"wire73", points: [{ name:"and7dNode"}, { name:"and7fJoint"}, { name:"fNor", io: "4/4", input: 3}]},
                { name:"wire74", points: [{ name:"and7Node"}, { name:"and7gJoint"}, { name:"gNor", io: "3/3", input: 2}]},

                { name: "wire80", points: [{ name:"bcd.and8", io: "out"}, { name:"and8Joint"}, { name:"and8eJoint"}, { name:"eOr", io: "4/4", input: 3}]}

            ]
        }

