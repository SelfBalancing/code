// Chapter19EightAnds.json.js (c) Charles Petzold, 2024
// ©️自权的SPACE 2025 汉化

let Chapter19EightAnds = 
{
    name: "Chapter19EightAnds",
    components: [
  
      { name: "and0", type: "AndGate", inputs:4, scale: 0.3, rotate: 90, x: 1400},
      { name: "and1", type: "AndGate", inputs:4, scale: 0.3, rotate: 90, x: 1200},
      { name: "and2", type: "AndGate", inputs:4, scale: 0.3, rotate: 90, x: 1000},
      { name: "and3", type: "AndGate", inputs:4, scale: 0.3, rotate: 90, x: 800},
      { name: "and4", type: "AndGate", inputs:4, scale: 0.3, rotate: 90, x: 600},
      { name: "and5", type: "AndGate", inputs:4, scale: 0.3, rotate: 90, x: 400},
      { name: "and6", type: "AndGate", inputs:4, scale: 0.3, rotate: 90, x: 200},
      { name: "and7", type: "AndGate", inputs:4, scale: 0.3, rotate: 90, x: 0},

      { name:"inv0", type: "Inverter", scale: 0.15, x: -40, y: -60},
      { name:"inv1", type: "Inverter", scale: 0.15, x: -40, y: -40},
      { name:"inv2", type: "Inverter", scale: 0.15, x: -40, y: -20},
  
      { name:"and0Joint2", type: "Joint", relative: {x: { name:"and0", io: "4/4"}, y: { name:"inv2"}}},
      { name:"and0Joint1", type: "Joint", relative: {x: { name:"and0", io: "3/4"}, y: { name:"inv1"}}},
      { name:"and0Joint0", type: "Joint", relative: {x: { name:"and0", io: "2/4"}, y: { name:"inv0"}}},

      { name: "and7Node2", type: "Node", y: -60, relative: {x:  { name:"and7", io: "4/4"}, y: { name:"inv2"}}},
      { name: "and7Node1", type: "Node", y: -50, relative: {x:  { name:"and7", io: "3/4"}, y: { name:"inv1"}}},
      { name: "and7Node0", type: "Node", y: -40, relative: {x:  { name:"and7", io: "2/4"}, y: { name:"inv0"}}},
  
      { name:"and1Node2", type: "Node", relative: {x:  { name:"and1", io: "4/4"}, y: { name:"inv2"}}},
      { name:"and1Node1", type: "Node", relative: {x:  { name:"and1", io: "3/4"}, y: { name:"inv1"}}},
      { name:"and1Joint0", type: "Joint", relative: {x:  { name:"and1", io: "2/4"}, y: { name:"and7Node0"}}},
  
      { name: "and2Node2", type: "Node", relative: {x:  { name:"and2", io: "4/4"}, y: { name:"inv2"}}},
      { name: "and2Joint1", type: "Joint", relative: {x:  { name:"and2", io: "3/4"}, y: { name:"and7Node1"}}},
      { name: "and2Node0", type: "Node", relative: {x:  { name:"and2", io: "2/4"}, y: { name:"inv0"}}},
  
      { name: "and3Node2", type: "Node", relative: {x:  { name:"and3", io: "4/4"}, y: { name:"inv2"}}},
      { name: "and3Node1", type: "Node", relative: {x:  { name:"and3", io: "3/4"}, y: { name:"and7Node1"}}},
      { name: "and3Node0", type: "Node", relative: {x:  { name:"and3", io: "2/4"}, y: { name:"and7Node0"}}},
  
      { name: "and4Joint2", type: "Joint", relative: {x:  { name:"and4", io: "4/4"}, y: { name:"and7Node2"}}},
      { name: "and4Node1", type: "Node", relative: {x:  { name:"and4", io: "3/4"}, y: { name:"inv1"}}},
      { name: "and4Node0", type: "Node", relative: {x:  { name:"and4", io: "2/4"}, y: { name:"inv0"}}},
  
      { name: "and5Node2", type: "Node", relative: {x:  { name:"and5", io: "4/4"}, y: { name:"and7Node2"}}},
      { name: "and5Node1", type: "Node", relative: {x:  { name:"and5", io: "3/4"}, y: { name:"inv1"}}},
      { name: "and5Node0", type: "Node", relative: {x:  { name:"and5", io: "2/4"}, y: { name:"and7Node0"}}},
  
      { name: "and6Node2", type: "Node", relative: {x:  { name:"and6", io: "4/4"}, y: { name:"and7Node2"}}},
      { name: "and6Node1", type: "Node", relative: {x:  { name:"and6", io: "3/4"}, y: { name:"and7Node1"}}},
      { name: "and6Node0", type: "Node", relative: {x:  { name:"and6", io: "2/4"}, y: { name:"inv0"}}}
  
      ],
    wires: 
      [
      { points:[{ name:"inv2", io: "out"}, { name:"and3Node2"} ]},
      { points:[{ name:"and3Node2"}, { name:"and3", io: "4/4", input: 3}]},
      { points:[{ name:"and3Node2"}, { name:"and2Node2"}]},
      { points:[{ name:"and2Node2"}, { name:"and2", io: "4/4", input: 3}]},
      { points:[{ name:"and2Node2"}, { name:"and1Node2"}]},
      { points:[{ name:"and1Node2"}, { name:"and1", io: "4/4", input: 3}]},
      { points:[{ name:"and1Node2"}, { name:"and0Joint2"}, { name:"and0", io: "4/4", input: 3}]},
  
      { points:[{ name:"inv1", io: "out"}, { name:"and5Node1"} ]},
      { points:[{ name:"and5Node1"}, { name:"and5", io: "3/4", input: 2}]},
      { points:[{ name:"and5Node1"}, { name:"and4Node1"}]},
      { points:[{ name:"and4Node1"}, { name:"and4", io: "3/4", input: 2}]},
      { points:[{ name:"and4Node1"}, { name:"and1Node1"}]},
      { points:[{ name:"and1Node1"}, { name:"and1", io: "3/4", input: 2}]},
      { points:[{ name:"and1Node1"}, { name:"and0Joint1"}, { name:"and0", io: "3/4", input: 2}]},
  
      { points:[{ name:"inv0", io: "out"}, { name:"and6Node0"} ]},
      { points:[{ name:"and6Node0"}, { name:"and6", io: "2/4", input: 1}]},
      { points:[{ name:"and6Node0"}, { name:"and4Node0"}]},
      { points:[{ name:"and4Node0"}, { name:"and4", io: "2/4", input: 1}]},
      { points:[{ name:"and4Node0"}, { name:"and2Node0"}]},
      { points:[{ name:"and2Node0"}, { name:"and2", io: "2/4", input: 1}]},
      { points:[{ name:"and2Node0"}, { name:"and0Joint0"}, { name:"and0", io: "2/4", input: 1}]},
  
      { points:[{ name:"and7Node2"}, { name:"and7", io: "4/4", input: 3}]},
      { points:[{ name:"and7Node2"}, { name:"and6Node2"}]},
      { points:[{ name:"and6Node2"}, { name:"and6", io: "4/4", input: 3}]},
      { points:[{ name:"and6Node2"}, { name:"and5Node2"}]},
      { points:[{ name:"and5Node2"}, { name:"and5", io: "4/4", input: 3}]},
      { points:[{ name:"and5Node2"}, { name:"and4Joint2"}, { name:"and4", io: "4/4", input: 3}]},
  
      { points:[{ name:"and7Node1"}, { name:"and7", io: "3/4", input: 2}]},
      { points:[{ name:"and7Node1"}, { name:"and6Node1"}]},
      { points:[{ name:"and6Node1"}, { name:"and6", io: "3/4", input: 2}]},
      { points:[{ name:"and6Node1"}, { name:"and3Node1"}]},
      { points:[{ name:"and3Node1"}, { name:"and3", io: "3/4", input: 2}]},
      { points:[{ name:"and3Node1"}, { name:"and2Joint1"}, { name:"and2", io: "3/4", input: 2}]},
  
      { points:[{ name:"and7Node0"}, { name:"and7", io: "2/4", input: 1}]},
      { points:[{ name:"and7Node0"}, { name:"and5Node0"}]},
      { points:[{ name:"and5Node0"}, { name:"and5", io: "2/4", input: 1}]},
      { points:[{ name:"and5Node0"}, { name:"and3Node0"}]},
      { points:[{ name:"and3Node0"}, { name:"and3", io: "2/4", input: 1}]},
      { points:[{ name:"and3Node0"}, { name:"and1Joint0"}, { name:"and1", io: "2/4", input: 1}]}
    ]
    }