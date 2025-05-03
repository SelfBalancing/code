// Chapter10ThreeToEightDecoder.json.js (c) Charles Petzold, 2024
// ©️自权的SPACE 2025 汉化

var Chapter10ThreeToEightDecoder = {
    name: "Chapter10ThreetoEightDecoder",
    transform: {x: 75, y: 355, scale: 1, rotate: 0},
    propagationDelay: 100,
    components: [
        { name:"and0", type: "AndGate", scale: 0.5, rotate: 90, inputs: 3, x: 0},
        { name:"and1", type: "AndGate", scale: 0.5, rotate: 90, inputs: 3, x: 100},
        { name:"and2", type: "AndGate", scale: 0.5, rotate: 90, inputs: 3, x: 200},
        { name:"and3", type: "AndGate", scale: 0.5, rotate: 90, inputs: 3, x: 300},
        { name:"and4", type: "AndGate", scale: 0.5, rotate: 90, inputs: 3, x: 400},
        { name:"and5", type: "AndGate", scale: 0.5, rotate: 90, inputs: 3, x: 500},
        { name:"and6", type: "AndGate", scale: 0.5, rotate: 90, inputs: 3, x: 600},
        { name:"and7", type: "AndGate", scale: 0.5, rotate: 90, inputs: 3, x: 700},
    
        { name:"jointAI0", type: "Joint", y: -25, relative: {xy: { name:"and0", io: "3/3"}}},
        { name:"nodeAI2", type: "Node", y: -25, relative: {xy: { name:"and2", io: "3/3"}}},
        { name:"nodeAI4", type: "Node", y: -25, relative: {xy: { name:"and4", io: "3/3"}}},
        { name:"nodeAI6", type: "Node", y: -25, relative: {xy: { name:"and6", io: "3/3"}}},
    
        { name:"jointBI0", type: "Joint", y: -40, relative: {xy: { name:"and0", io: "2/3"}}},
        { name:"nodeBI1", type: "Node", y: -40, relative: {xy: { name:"and1", io: "2/3"}}},
        { name:"nodeBI4", type: "Node", y: -40, relative: {xy: { name:"and4", io: "2/3"}}},
        { name:"jointBI5", type: "Joint", y: -40, relative: {xy: { name:"and5", io: "2/3"}}},
    
        { name:"jointCI0", type: "Joint", y: -55, relative: {xy: { name:"and0", io: "1/3"}}},
        { name:"nodeCI1", type: "Node", y: -55, relative: {xy: { name:"and1", io: "1/3"}}},
        { name:"nodeCI2", type: "Node", y: -55, relative: {xy: { name:"and2", io: "1/3"}}},
        { name:"jointCI3", type: "Joint", y: -55, relative: {xy: { name:"and3", io: "1/3"}}},
    
        { name:"jointA1", type: "Joint", y: -70, relative: {xy: { name:"and1", io: "3/3"}}},
        { name:"nodeA3",  type: "Node", y: -70, relative: {xy: { name:"and3", io: "3/3"}}},
        { name:"nodeA5", type: "Node", y: -70, relative: {xy: { name:"and5", io: "3/3"}}},
        { name:"nodeA", type: "Node", y: -70, x: 60, relative: {xy: { name:"and6", io: "3/3"}}},
        { name:"jointA7", type: "Joint", y: -70, relative: {xy: { name:"and7", io: "3/3"}}},
    
        { name:"jointB2", type: "Joint", y: -85, relative: {xy: { name:"and2", io: "2/3"}}},
        { name:"nodeB3",  type: "Node", y: -85, relative: {xy: { name:"and3", io: "2/3"}}},
        { name:"nodeB", type: "Node", y: -85, x: 50, relative: {xy: { name:"and4", io: "2/3"}}},
        { name:"nodeB6", type: "Node", y: -85, relative: {xy: { name:"and6", io: "2/3"}}},
        { name:"jointB7", type: "Joint", y: -85, relative: {xy: { name:"and7", io: "2/3"}}},
    
        { name:"jointC", type: "Joint", y: -100, x: 40, relative: {xy: { name:"and2", io: "1/3"}}},
        { name:"nodeC4", type: "Node", y: -100, relative: {xy: { name:"and4", io: "1/3"}}},
        { name:"nodeC5", type: "Node", y: -100, relative: {xy: { name:"and5", io: "1/3"}}},
        { name:"nodeC6", type: "Node", y: -100, relative: {xy: { name:"and6", io: "1/3"}}},
        { name:"jointC7", type: "Joint", y: -100, relative: {xy: { name:"and7", io: "1/3"}}},
    
        { name:"invC", type: "Inverter", scale:  0.25, rotate: 90, y: -160, relative: {xy: { name:"and2", io: "1/3"}}},
        { name:"invB", type: "Inverter", scale:  0.25, rotate: 90, y: -160, relative: {xy: { name:"and4", io: "2/3"}}},
        { name:"invA", type: "Inverter", scale:  0.25, rotate: 90, y: -160, relative: {xy: { name:"and6", io: "3/3"}}},
    
        { name:"nodeInvC", type: "Node", y: -20, relative: {xy: { name:"invC"}}},
        { name:"nodeInvB", type: "Node", y: -20, relative: {xy: { name:"invB"}}},
        { name:"nodeInvA", type: "Node", y: -20, relative: {xy: { name:"invA"}}},
    
        { name:"jointInvC", type: "Joint", relative: {y: { name:"nodeInvC"}, x: { name:"jointC"}}},
        { name:"jointInvB", type: "Joint", relative: {y: { name:"nodeInvB"}, x: { name:"nodeB"}}},
        { name:"jointInvA", type: "Joint", relative: {y: { name:"nodeInvA"}, x: { name:"nodeA"}}},
    
        { name:"switchC", type: "DigitButton", y: -70, relative: {xy: { name:"nodeInvC"}}},
        { name:"switchB", type: "DigitButton", y: -70, relative: {xy: { name:"nodeInvB"}}},
        { name:"switchA", type: "DigitButton", y: -70, relative: {xy: { name:"nodeInvA"}}},
    
        { name:"vC", type: "V", y: -70, relative: {xy: { name:"switchC"}}},
        { name:"vB", type: "V", y: -70, relative: {xy: { name:"switchB"}}},
        { name:"vA", type: "V", y: -70, relative: {xy: { name:"switchA"}}},
    
   
        { name:"light0", type: "SimpleLight", rotate: 90, y: 100, relative: {xy: { name:"and0", io: "out"}}},
        { name:"light1", type: "SimpleLight", rotate: 90, relative: {x: { name:"and1", io: "out"}, y: { name:"light0"}}},
        { name:"light2", type: "SimpleLight", rotate: 90, relative: {x: { name:"and2", io: "out"}, y: { name:"light0"}}},
        { name:"light3", type: "SimpleLight", rotate: 90, relative: {x: { name:"and3", io: "out"}, y: { name:"light0"}}},
        { name:"light4", type: "SimpleLight", rotate: 90, relative: {x: { name:"and4", io: "out"}, y: { name:"light0"}}},
        { name:"light5", type: "SimpleLight", rotate: 90, relative: {x: { name:"and5", io: "out"}, y: { name:"light0"}}},
        { name:"light6", type: "SimpleLight", rotate: 90, relative: {x: { name:"and6", io: "out"}, y: { name:"light0"}}},
        { name:"light7", type: "SimpleLight", rotate: 90, relative: {x: { name:"and7", io: "out"}, y: { name:"light0"}}},
    
    
        { name:"0", type: "Label", text: "0", size: 1.5, x: 15, y: -60, relative: {xy: { name:"light0"}}},
        { name:"1", type: "Label", text: "1", size: 1.5, x: 15, relative: {x: { name:"light1"}, y: { name:"0"}}},
        { name:"2", type: "Label", text: "2", size: 1.5, x: 15, relative: {x: { name:"light2"}, y: { name:"0"}}},
        { name:"3", type: "Label", text: "3", size: 1.5, x: 15, relative: {x: { name:"light3"}, y: { name:"0"}}},
        { name:"4", type: "Label", text: "4", size: 1.5, x: 15, relative: {x: { name:"light4"}, y: { name:"0"}}},
        { name:"5", type: "Label", text: "5", size: 1.5, x: 15, relative: {x: { name:"light5"}, y: { name:"0"}}},
        { name:"6", type: "Label", text: "6", size: 1.5, x: 15, relative: {x: { name:"light6"}, y: { name:"0"}}},
        { name:"7", type: "Label", text: "7", size: 1.5, x: 15, relative: {x: { name:"light7"}, y: { name:"0"}}},

        { name:"gnd0", type: "Ground", y: 40, relative: {xy: { name:"light0", io: "out"}}},
        { name:"gnd1", type: "Ground", y: 40, relative: {xy: { name:"light1", io: "out"}}},
        { name:"gnd2", type: "Ground", y: 40, relative: {xy: { name:"light2", io: "out"}}},
        { name:"gnd3", type: "Ground", y: 40, relative: {xy: { name:"light3", io: "out"}}},
        { name:"gnd4", type: "Ground", y: 40, relative: {xy: { name:"light4", io: "out"}}},
        { name:"gnd5", type: "Ground", y: 40, relative: {xy: { name:"light5", io: "out"}}},
        { name:"gnd6", type: "Ground", y: 40, relative: {xy: { name:"light6", io: "out"}}},
        { name:"gnd7", type: "Ground", y: 40, relative: {xy: { name:"light7", io: "out"}}}

      
        ],
      wires: 
        [
    
        { points:[{ name:"and0", io: "out"}, { name:"light0", io: "inp"}]},
        { points:[{ name:"and1", io: "out"}, { name:"light1", io: "inp"}]},
        { points:[{ name:"and2", io: "out"}, { name:"light2", io: "inp"}]},
        { points:[{ name:"and3", io: "out"}, { name:"light3", io: "inp"}]},
        { points:[{ name:"and4", io: "out"}, { name:"light4", io: "inp"}]},
        { points:[{ name:"and5", io: "out"}, { name:"light5", io: "inp"}]},
        { points:[{ name:"and6", io: "out"}, { name:"light6", io: "inp"}]},
        { points:[{ name:"and7", io: "out"}, { name:"light7", io: "inp"}]},
        
        { points:[{ name:"switchC", io: "bottom"}, { name:"nodeInvC"}]},
        { points:[{ name:"switchB", io: "bottom"}, { name:"nodeInvB"}]},
        { points:[{ name:"switchA", io: "bottom"}, { name:"nodeInvA"}]},
    
        { points:[{ name:"switchC", io: "top"}, { name:"vC"}]},
        { points:[{ name:"switchB", io: "top"}, { name:"vB"}]},
        { points:[{ name:"switchA", io: "top"}, { name:"vA"}]},
    
        { points:[{ name:"nodeInvC"}, { name:"jointInvC"}, { name:"jointC"}, { name:"nodeC4"}]},
        { points:[{ name:"nodeInvB"}, { name:"jointInvB"}, { name:"nodeB"}]},
        { points:[{ name:"nodeInvA"}, { name:"jointInvA"}, { name:"nodeA"}]},
    
        { points:[{ name:"nodeInvC"}, { name:"invC"}]},
        { points:[{ name:"nodeInvB"}, { name:"invB"}]},
        { points:[{ name:"nodeInvA"}, { name:"invA"}]},
    
        { points:[{ name:"invC", io: "out"}, { name:"nodeCI2"}]},
        { points:[{ name:"invB", io: "out"}, { name:"nodeBI4"}]},
        { points:[{ name:"invA", io: "out"}, { name:"nodeAI6"}]},
    
        { points:[{ name:"nodeC4"}, { name:"and4", io: "1/3", input: 0}]},
        { points:[{ name:"nodeC4"}, { name:"nodeC5"}]},
        { points:[{ name:"nodeC5"}, { name:"and5", io: "1/3", input: 0}]},
        { points:[{ name:"nodeC5"}, { name:"nodeC6"}]},
        { points:[{ name:"nodeC6"}, { name:"and6", io: "1/3", input: 0}]},
        { points:[{ name:"nodeC6"}, { name:"jointC7"}, { name:"and7", io: "1/3", input: 0}]},
    
        { points:[{ name:"nodeB"}, { name:"nodeB6"}]},
        { points:[{ name:"nodeB6"}, { name:"and6", io: "2/3", input: 1}]},
        { points:[{ name:"nodeB6"}, { name:"jointB7"}, { name:"and7", io: "2/3", input: 1}]},
        { points:[{ name:"nodeB"}, { name:"nodeB3"}]},
        { points:[{ name:"nodeB3"}, { name:"and3", io: "2/3", input: 1}]},
        { points:[{ name:"nodeB3"}, { name:"jointB2"}, { name:"and2", io: "2/3", input: 1}]},
    
        { points:[{ name:"nodeA"}, { name:"jointA7"}, { name:"and7", io: "3/3", input: 2}]},
        { points:[{ name:"nodeA"}, { name:"nodeA5"}]},
        { points:[{ name:"nodeA5"}, { name:"and5", io: "3/3", input: 2}]},
        { points:[{ name:"nodeA5"}, { name:"nodeA3"}]},
        { points:[{ name:"nodeA3"}, { name:"and3", io: "3/3", input: 2}]},
        { points:[{ name:"nodeA3"}, { name:"jointA1"}, { name:"and1", io: "3/3", input: 2}]},
    
        { points:[{ name:"nodeCI2"}, { name:"and2", io: "1/3", input: 0}]},
        { points:[{ name:"nodeCI2"}, { name:"jointCI3"}, { name:"and3", io: "1/3", input: 0}]},
        { points:[{ name:"nodeCI2"}, { name:"nodeCI1"}]},
        { points:[{ name:"nodeCI1"}, { name:"and1", io: "1/3", input: 0}]},
        { points:[{ name:"nodeCI1"}, { name:"jointCI0"}, { name:"and0", io: "1/3", input: 0}]},
    
        { points:[{ name:"nodeBI4"}, { name:"and4", io: "2/3", input: 1}]},
        { points:[{ name:"nodeBI4"}, { name:"jointBI5"}, { name:"and5", io: "2/3", input: 1}]},
        { points:[{ name:"nodeBI4"}, { name:"nodeBI1"}]},
        { points:[{ name:"nodeBI1"}, { name:"and1", io: "2/3", input: 1}]},
        { points:[{ name:"nodeBI1"}, { name:"jointBI0"}, { name:"and0", io: "2/3", input: 1}]},
        
        { points:[{ name:"nodeAI6"}, { name:"and6", io: "3/3", input: 2}]},
        { points:[{ name:"nodeAI6"}, { name:"nodeAI4"}]},
        { points:[{ name:"nodeAI4"}, { name:"and4", io: "3/3", input: 2}]},
        { points:[{ name:"nodeAI4"}, { name:"nodeAI2"}]},
        { points:[{ name:"nodeAI2"}, { name:"and2", io: "3/3", input: 2}]},
        { points:[{ name:"nodeAI2"}, { name:"jointAI0"}, { name:"and0", io: "3/3", input: 2}]},

        { points:[{ name:"light0", io: "out"}, { name:"gnd0"}]},
        { points:[{ name:"light1", io: "out"}, { name:"gnd1"}]},
        { points:[{ name:"light2", io: "out"}, { name:"gnd2"}]},
        { points:[{ name:"light3", io: "out"}, { name:"gnd3"}]},
        { points:[{ name:"light4", io: "out"}, { name:"gnd4"}]},
        { points:[{ name:"light5", io: "out"}, { name:"gnd5"}]},
        { points:[{ name:"light6", io: "out"}, { name:"gnd6"}]},
        { points:[{ name:"light7", io: "out"}, { name:"gnd7"}]}
   
      ]
    
      }
    