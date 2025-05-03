// Chapter08KittenSelector (c) Charles Petzold, 2024

let Chapter08KittenSelector = 
{
    name: "Chapter08KittenSelector",
    transform: {x: 25, y: 50, scale: 1, rotate: 0},
    consistency: true,

    components:[
        { name:"switchSex", type: "Switch", x: 40, y: 40 },
        { name:"switchNeu", type: "Switch", y: 110, relative: {xy: { name:"switchSex"}}},
        { name:"switchBlk", type: "Switch", y: 180, relative: {xy: { name:"switchSex"}}},
        { name:"switchWht", type: "Switch", y: 250, relative: {xy: { name:"switchSex"}}},
        { name:"switchTan", type: "Switch", y: 320, relative: {xy: { name:"switchSex"}}},

        { name: "vSex", type: "V", x: -45, y: -35, relative: { xy: { name:"switchSex"}}},
        { name: "vNeu", type: "V", x: -45, y: -35, relative: { xy: { name:"switchNeu"}}},
        { name: "vBlk", type: "V", x: -45, y: -35, relative: { xy: { name:"switchBlk"}}},
        { name: "vWht", type: "V", x: -45, y: -35, relative: { xy: { name:"switchWht"}}},
        { name: "vTan", type: "V", x: -45, y: -35, relative: { xy: { name:"switchTan"}}},

        { name:"vJointSex", type:"Joint", relative: {x: { name:"vSex"}, y: { name:"switchSex"}}},
        { name:"vJointNeu", type:"Joint", relative: {x: { name:"vNeu"}, y: { name:"switchNeu"}}},
        { name:"vJointBlk", type:"Joint", relative: {x: { name:"vBlk"}, y: { name:"switchBlk"}}},
        { name:"vJointWht", type:"Joint", relative: {x: { name:"vWht"}, y: { name:"switchWht"}}},
        { name:"vJointTan", type:"Joint", relative: {x: { name:"vTan"}, y: { name:"switchTan"}}},

        { name:"or3", type: "OrGate", scale: 0.5, x: 950, y: 185},
        { name:"and3", type: "AndGate", scale: 0.5, x: -120, relative: {xy: { name:"or3", io: "A"}}},
        { name:"or2", type: "OrGate", scale: 0.5, x: -120, relative: {xy: { name:"and3", io: "B"}}},
        { name:"or1", type: "OrGate", scale: 0.5, x: -240, relative: {xy: { name:"or2"}}},
        { name:"and1", type: "AndGate", scale: 0.5, x: -120, y: -91, relative: {xy: { name:"or2"}}},
        { name:"and2", type: "AndGate", scale: 0.5, x: -120, y: 91, relative: {xy: { name:"or2"}}},

        { name:"invSex", type: "Inverter", scale: 0.35, x: 80, relative:  {x: { name:"switchSex", io: "out"}, y: { name:"and1", io: "A"}}},
        { name:"sexNode", type: "Node", x: 40, relative: {xy: { name:"switchSex", io: "out"}}},
        { name:"sexJoint", type: "Joint", relative: {x: { name:"sexNode"}, y: { name:"invSex"}}},

        { name:"or1Joint1", type: "Joint", x: 25, relative: {xy: { name:"or1", io: "out"}}},
        { name:"or1Joint2", type: "Joint", relative: {x: { name:"or1Joint1"}, y: { name:"and1", io: "B"}}},

        { name:"or2Joint11", type: "Joint", x: 25, relative: {xy: { name:"and1", io: "out"}}},
        { name:"or2Joint12", type: "Joint", relative: {x: { name:"or2Joint11"}, y: { name:"or2", io: "A"}}},
        { name:"or2Joint21", type: "Joint", x: 25, relative: {xy: { name:"and2", io: "out"}}},
        { name:"or2Joint22", type: "Joint", relative: {x: { name:"or2Joint21"}, y: { name:"or2", io: "B"}}},

        { name:"femaleJoint2", type: "Joint", x: -180, relative: {xy: { name:"and2", io: "A"}}},
        { name:"femaleJoint1", type: "Joint", relative: {y: { name:"sexNode"}, x: { name:"femaleJoint2"}}},

        { name:"whiteNode", type: "Node", x: 270, relative: {xy: { name:"switchWht", io: "out"}}},
        { name:"whiteInv", type: "Inverter", scale: 0.35, x: 140, relative: {x: { name:"whiteNode"}, y: { name:"and2", io: "B"}}},
        { name:"whiteJoint1", type: "Joint", relative: {x: { name:"whiteNode"}, y: { name:"or1", io: "A"}}},

        { name:"blackJoint1", type: "Joint", x: 230, relative: {xy: { name:"switchBlk", io: "out"}}},
        { name:"blackJoint2", type: "Joint", y: 170, relative: {xy: { name:"blackJoint1"}}},
        { name:"blackJoint4", type: "Joint", x: -25, relative: {xy: { name:"or3", io: "B"}}},
        { name:"blackJoint3", type: "Joint", relative: {x: { name:"blackJoint4"}, y: { name:"blackJoint2"}}},

        { name:"tanJoint2", type: "Joint", x: -25, relative: {xy: { name:"or1", io: "B"}}},
        { name:"tanJoint1", type: "Joint", relative: {x: { name:"tanJoint2"}, y: { name:"switchTan", io: "out"}}},

        { name:"neuJoint1", type: "Joint", relative: {x: { name:"or1"}, y: { name:"switchNeu"}}},
        { name:"neuJoint2", type: "Joint", relative: {x: { name:"neuJoint1"}, y: { name:"switchSex"}}},
        { name:"neuJoint4", type: "Joint", x: -25, relative: {xy: { name:"and3", io: "A"}}},
        { name:"neuJoint3", type: "Joint", relative: {x: { name:"neuJoint4"}, y: { name:"neuJoint2"}}},


        { name:"female", type: "Label", text: "雌性", x: 270, y: -15, xAlign: 0.5, yAlign: 1, relative: {xy: { name:"switchSex"}}},
        { name:"male", type: "Label", text: "雄性", y: 15, xAlign: 0.5, yAlign: 1, relative: {x: { name:"female"}, y: { name:"invSex"}}},

        { name:"neutered", type: "Label", text: "已绝育", x: 150, y: -15, relative: {xy: { name:"switchNeu"}}},
        { name:"black", type: "Label", text: "黑色", x: 150, y: -15, relative: {xy: { name:"switchBlk"}}},
        { name:"white", type: "Label", text: "白色", x: 150, y: -15, relative: {xy: { name:"switchWht"}}},
        { name:"tan", type: "Label", text: "棕褐色", x: 150, y: -15, relative: {xy: { name:"switchTan"}}},

        { name:"light", type: "Lightbulb", x: 70, y: -70, relative: {xy: { name:"or3", io: "out"}}},
        { name:"lightJoint", type: "Joint", relative: {x: { name:"light", io: "left"}, y: { name:"or3", io: "out"}}},
        { name:"gnd", type: "Ground", y: 100, relative: {xy: { name: "light", io: "right"}}}
    ],
    wires:[

        { name:"wireVSex", points: [{ name:"switchSex"}, { name:"vJointSex"}, { name:"vSex"}]},
        { name:"wireVNeu", points: [{ name:"switchNeu"}, { name:"vJointNeu"}, { name:"vNeu"}]},
        { name:"wireVBlk", points: [{ name:"switchBlk"}, { name:"vJointBlk"}, { name:"vBlk"}]},
        { name:"wireVWht", points: [{ name:"switchWht"}, { name:"vJointWht"}, { name:"vWht"}]},
        { name:"wireVTan", points: [{ name:"switchTan"}, { name:"vJointTan"}, { name:"vTan"}]},

        { name:"wireSexNode1", points: [{ name:"switchSex", io: "out"}, { name:"sexNode"}]},
        { name:"wireSexNode1", points: [{ name:"sexNode"}, { name:"sexJoint"}, { name:"invSex"}]},

        { name:"wireWhite", points: [{ name:"switchWht", io: "out"}, { name:"whiteNode"}]},
        { name:"wireWhiteInv", points: [{ name:"whiteInv", io: "out"}, { name:"and2", io: "B", input: 1}]},
        { points:[{ name:"whiteNode"}, { name:"whiteJoint1"}, { name:"or1", io: "A", input: 0}]},
        { points:[{ name:"whiteNode"}, { name:"whiteInv"}]},

        { points:[{ name:"switchNeu", io: "out"}, { name:"neuJoint1"}, { name:"neuJoint2"}, { name:"neuJoint3"}, { name:"neuJoint4"}, { name:"and3", io: "A"}]},

        { name:"wireMale", points: [{ name:"invSex", io: "out"}, { name:"and1", io: "A", input: 0}]},

        { name:"wireFemale", points: [{ name:"sexNode"}, { name:"femaleJoint1"}, { name:"femaleJoint2"}, { name:"and2", io: "A", input: 0}]},

        { name:"wireBlk", points: [{ name:"switchBlk", io: "out"}, { name:"blackJoint1"}, { name:"blackJoint2"}, { name:"blackJoint3"}, { name:"blackJoint4"}, { name:"or3", io: "B", input:1}]},
        { name:"wireTan", points: [{ name:"switchTan", io: "out"}, { name:"tanJoint1"}, { name:"tanJoint2"}, { name:"or1", io: "B", input:1}]},

        { name:"wireOr3A", points: [{ name:"and3", io: "out"}, { name:"or3", io: "A", input: 0}]},
        { name:"wireAnd3B", points: [{ name:"or2", io: "out"}, { name:"and3", io: "B", input: 1}]},

        { name:"wireAnd1B", points: [{ name:"or1", io: "out"}, { name:"or1Joint1"}, { name:"or1Joint2"}, { name:"and1", io: "B", input: 1}]},

        { name:"wireAnd1", points: [{ name:"and1", io: "out"}, { name:"or2Joint11"}, { name:"or2Joint12"}, { name:"or2", io: "A", input:0}]},
        { name:"wireAnd2", points: [{ name:"and2", io: "out"}, { name:"or2Joint21"}, { name:"or2Joint22"}, { name:"or2", io: "B", input:1}]},


        { name:"wireLightLeft", points: [{ name:"or3", io: "out"}, { name:"lightJoint"}, { name:"light", io: "left"}]},
        { name:"wireLightRight", points: [{ name:"light", io: "right"}, { name:"gnd"}]}
    ],
    dependencies:
    [
        { name: "switchBlk", value: true, contrary: [{ name:"switchTan"}, { name:"switchWht"}]},
        { name: "switchWht", value: true, contrary: [{ name:"switchTan"}, { name:"switchBlk"}]},
        { name: "switchTan", value: true, contrary: [{ name:"switchBlk"}, { name:"switchWht"}]}
    ]
}
