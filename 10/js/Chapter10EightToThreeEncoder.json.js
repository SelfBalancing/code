// Chapter10EightToThreeEncoder.json.js (c) Charles Petzold, 2024

var Chapter10EightToThreeEncoder = {
    name: "Chapter10EightToThreeEncoder",
    transform: {x: 200, y: 435, scale: 1, rotate: 0},
    wireCurveRadius: 3,
    components:
    [
        { name:"orC", type: "OrGate", inputs: 4, scale: 0.5, rotate: 90, x: -100},
        { name:"orB", type: "OrGate", inputs: 4, scale: 0.5, rotate: 90, x: 0},
        { name:"orA", type: "OrGate", inputs: 4, scale: 0.5, rotate: 90, x: 100},
    
        { name:"lightC", type: "BitLight", y: 60, relative: {xy: { name:"orC", io: "out"}}},
        { name:"lightB", type: "BitLight", relative: {x: { name:"orB", io: "out"}, y: { name:"lightC"}}},
        { name:"lightA", type: "BitLight", relative: {x: { name:"orA", io: "out"}, y: { name:"lightC"}}},
    
        { name:"gndA", type: "Ground", y: 30, relative: {xy: { name:"lightA", io: "bottom"}}},
        { name:"gndB", type: "Ground", y: 30, relative: {xy: { name:"lightB", io: "bottom"}}},
        { name:"gndC", type: "Ground", y: 30, relative: {xy: { name:"lightC", io: "bottom"}}},
    
        { name:"slider", type: "CircularSlider", y: -375},
        { name:"v", type: "V", x: -50, y: -30, relative: {xy: { name:"slider"}}},
        { name:"vJoint", type: "Joint", relative: {x: { name:"v"}, y: { name:"slider"}}},
    
        { name:"0", type: "Label", text: "0", size: 1.25, x: -15, y: 10, relative: {xy: { name:"slider", io: "0"}}},
        { name:"1", type: "Label", text: "1", size: 1.25, x: -15, y: 15, relative: {xy: { name:"slider", io: "1"}}},
        { name:"2", type: "Label", text: "2", size: 1.25, x: -15, y: 20, relative: {xy: { name:"slider", io: "2"}}},
        { name:"3", type: "Label", text: "3", size: 1.25, x: -15, y: 20, relative: {xy: { name:"slider", io: "3"}}},
        { name:"4", type: "Label", text: "4", size: 1.25, x: 15, y: 20, relative: {xy: { name:"slider", io: "4"}}},
        { name:"5", type: "Label", text: "5", size: 1.25, x: 15, y: 20, relative: {xy: { name:"slider", io: "5"}}},
        { name:"6", type: "Label", text: "6", size: 1.25, x: 15, y: 15, relative: {xy: { name:"slider", io: "6"}}},
        { name:"7", type: "Label", text: "7", size: 1.25, x: 15, y: 15, relative: {xy: { name:"slider", io: "7"}}},
    
        { name:"jointC7", type: "Joint", y: -35, relative: {x: { name:"orC", io: "1/4"}}},
        { name:"nodeB7", type: "Node", y: -35, relative: {x: { name:"orB", io: "1/4"}}},
        { name:"nodeA7", type: "Node", y: -35, relative: {x: { name:"orA", io: "1/4"}}},
        { name:"joint7", type: "Joint", relative: {x: { name:"slider", io: "7"}, y: { name:"nodeA7"}}},
    
        { name:"jointC6", type: "Joint", y: -50, relative: {x: { name:"orC", io: "2/4"}}},
        { name:"nodeB6", type: "Node", y: -50, relative: {x: { name:"orB", io: "2/4"}}},
        { name:"joint61", type: "Joint", y:  -140, relative: {x: { name:"slider", io: "6"}}},
        { name:"joint62", type: "Joint", relative: {y: { name:"joint61"}, x: { name:"nodeB6"}}},
    
        { name:"jointC5", type: "Joint", y: -65, relative: {x: { name:"orC", io: "3/4"}}},
        { name:"nodeA5", type: "Node", y: -65, relative: {x: { name:"orA", io: "2/4"}}},
        { name:"joint51", type: "Joint", y: -155, relative: {x: { name:"slider", io: "5"}}},
        { name:"joint52", type: "Joint", relative: {x: { name:"nodeA5"}, y: { name:"joint51"}}},
    
        { name:"jointC4", type: "Joint", y: -80, relative: {x: { name:"orC", io: "4/4"}}},
        { name:"joint4", type: "Joint", relative: {x: { name:"slider", io: "4"}, y: { name:"jointC4"}}},
    
        { name:"jointA3", type: "Joint", y: -110, relative: {x: { name:"orA", io: "3/4"}}},
        { name:"nodeB3", type: "Node", y: -110, relative: {x: { name:"orB", io: "3/4"}}},
        { name:"joint3", type: "Joint", relative: {x: { name:"slider", io: "3"}, y: { name:"nodeB3"}}},
    
        { name:"jointB2", type: "Joint", y: -95, relative: {x: { name:"orB", io: "4/4"}}},
        { name:"joint2", type: "Joint", relative: {x: { name:"slider", io: "2"}, y: { name:"jointB2"}}},
    
        { name:"jointA1", type: "Joint", y: -125, relative: {x: { name:"orA", io: "4/4"}}},
        { name:"joint1", type: "Joint", relative: {x: { name:"slider", io: "1"}, y: { name:"jointA1"}}}
      ],
      wires: [
        { name:"wireV", points: [{ name:"slider", output: "V"}, { name:"vJoint"}, { name:"v"}]},
    
        { points:[{ name:"slider", io: "1", output: "1"}, { name:"joint1"}, { name:"jointA1"}, { name:"orA", io: "4/4", input: 3}]},
    
        { points:[{ name:"slider", io: "2", output: "2"}, { name:"joint2"}, { name:"jointB2"}, { name:"orB", io: "4/4", input: 3}]},
    
        { points:[{ name:"slider", io: "3", output: "3"}, { name:"joint3"}, { name:"nodeB3"}]},
        { points:[{ name:"nodeB3"}, { name:"orB", io: "3/4", input: 2}]},
        { points:[{ name:"nodeB3"}, { name:"jointA3"}, { name:"orA", io: "3/4", input: 2}]},
    
        { points:[{ name:"slider", io: "4", output: "4"}, { name:"joint4"}, { name:"jointC4"}, { name:"orC", io: "4/4", input: 3}]},
    
        { points:[{ name:"slider", io:"5", output: "5"}, { name:"joint51"}, { name:"joint52"}, { name:"nodeA5"}]},
        { points:[{ name:"nodeA5"}, { name:"orA", io: "2/4", input: 1}]},
        { points:[{ name:"nodeA5" }, { name:"jointC5"}, { name:"orC", io: "3/4", input: 1}]},
    
        { name:"wire6", points: [{ name:"slider", io: "6", output: "6"}, { name:"joint61"}, { name:"joint62"}, { name:"nodeB6"}]},
        { name:"wire6B", points: [{ name:"nodeB6"}, { name:"orB", io: "2/4", input: 1}]},
        { name:"wire6C", points: [{ name:"nodeB6"}, { name:"jointC6"}, { name:"orC", io: "2/4", input: 1}]},
    
        { points:[{ name:"slider", io: "7", output: "7"}, { name:"joint7"}, { name:"nodeA7"}]},
        { points:[{ name:"nodeA7"}, { name:"nodeB7"}]},
        { points:[{ name:"nodeA7"}, { name:"orA", io: "1/4", input: 0}]},
        { points:[{ name:"nodeB7"}, { name:"orB", io: "1/4", input: 0}]},
        { points:[{ name:"nodeB7"}, { name:"jointC7"}, { name:"orC", io: "1/4", input: 0}]},
    
        { name:"wireLtC", points: [{ name:"orC", io: "out"}, { name:"lightC", io: "top"}]},
        { name:"wireLtB", points: [{ name:"orB", io: "out"}, { name:"lightB", io: "top"}]},
        { name:"wireLtA", points: [{ name:"orA", io: "out"}, { name:"lightA", io: "top"}]},

        { points:[{ name:"lightC", io: "bottom"}, { name:"gndC"}]},
        { points:[{ name:"lightB", io: "bottom"}, { name:"gndB"}]},
        { points:[{ name:"lightA", io: "bottom"}, { name:"gndA"}]}
    ]
}