// Chapter22VersatileRegisterArray (c) Charles Petzold, 2024

let Chapter22VersatileRegisterArray = 
{
    name: "Chapter22VersatileRegisterArray",
    transform: { x: 500, y: 425, scale: 1, rotate: 0 },
    wireCurveRadius: 5,
    nodeRadius: 3,
    components:
    [
        { name:"a", type: "Latch", text: "A", width: 60, height: 30, x: -80, ports: [{text: " ", x: 0.5, y: 0}, {text: "  ", x: 0.5, y: 1}, {text: "   ", x: 0, y: 0.5}]},
        { name:"b", type: "Latch", text: "B", width: 60, height: 30, x: 80, ports: [{text: " ", x: 0.5, y: 0}, {text: "  ", x: 0.5, y: 1}, {text: "   ", x: 0, y: 0.5}]},
        { name:"c", type: "Latch", text: "C", width: 60, height: 30, x: 160, ports: [{text: " ", x: 0.5, y: 0}, {text: "  ", x: 0.5, y: 1}, {text: "   ", x: 0, y: 0.5}]},
        { name:"d", type: "Latch", text: "D", width: 60, height: 30, x: 240, ports: [{text: " ", x: 0.5, y: 0}, {text: "  ", x: 0.5, y: 1}, {text: "   ", x: 0, y: 0.5}]},
        { name:"e", type: "Latch", text: "E", width: 60, height: 30, x: 320, ports: [{text: " ", x: 0.5, y: 0}, {text: "  ", x: 0.5, y: 1}, {text: "   ", x: 0, y: 0.5}]},
        { name:"h", type: "Latch", text: "H", width: 60, height: 30, x: 470, ports: [{text: " ", x: 0.5, y: 0}, {text: "  ", x: 0.5, y: 1}, {text: "   ", x: 0, y: 0.5}]},
        { name:"l", type: "Latch", text: "L", width: 60, height: 30, x: 620, ports: [{text: " ", x: 0.5, y: 0}, {text: "  ", x: 0.5, y: 1}, {text: "   ", x: 0, y: 0.5}]},

        { name:"aOr", type: "OrGate", scale: 0.25, x: -50, relative: {xy: { name:"a", io: "   "}}},
        { name:"hOr", type: "OrGate", scale: 0.25, x: -50, relative: {xy: { name:"h", io: "   "}}},
        { name:"lOr", type: "OrGate", scale: 0.25, x: -50, relative: {xy: { name:"l", io: "   "}}},

        { name:"hOrJoint2", type: "Joint", x: -15, relative: {xy: { name:"hOr", io: "B"}}},
        { name:"hOrJoint1", type: "Joint", y: 35, relative: {xy: { name:"hOrJoint2"}}},
        { name:"lOrJoint", type: "Joint", x: -15, relative: {xy: { name:"lOr", io: "B"}}},
        { name:"lOrNode", type: "Node", relative: {x: { name:"lOrJoint"}, y: { name:"hOrJoint1"}}},

        { name:"hTri2", type: "TriStateBuffer", text: "TRI", width: 60, height: 30, y: -140, relative: {xy: { name:"h"}},
                ports:  [{text: " ", x: 0.5, y: 0}, {text: "  ", x: 0.5, y: 1}, {text: "   ", x: 1, y: 0.5}],
                triStates: [{ name:"output", group: "c"}]},

        { name:"lTri2", type: "TriStateBuffer", text: "TRI", width: 60, height: 30, relative: {y: { name:"hTri2"}, x: { name:"l"}},
                ports:  [{text: " ", x: 0.5, y: 0}, {text: "  ", x: 0.5, y: 1}, {text: "   ", x: 1, y: 0.5}],
                triStates: [{ name:"output", group: "b"}]},
    
        { name:"aTri", type: "TriStateBuffer", text: "TRI", width: 60, height: 30, y: 230, relative: {xy: { name:"a"}}, 
                ports:  [{text: " ", x: 0.5, y: 0}, {text: "  ", x: 0.5, y: 1}, {text: "   ", x: 1, y: 0.5}],
                triStates: [{ name:"output", group: "a"}]},

        { name:"aTriOr", type: "OrGate", scale: 0.25, rotate: 180, x: 50, relative: {xy: { name:"aTri", io: "   "}}},

        { name:"bTri", type: "TriStateBuffer", text: "TRI", width: 60, height: 30, relative: {x: { name:"b"}, y: { name:"aTri"}}, 
                ports:  [{text: " ", x: 0.5, y: 0}, {text: "  ", x: 0.5, y: 1}, {text: "   ", x: 1, y: 0.5}],
                triStates: [{ name:"output", group: "a"}]},

        { name:"cTri", type: "TriStateBuffer", text: "TRI", width: 60, height: 30, relative: {x: { name:"c"}, y: { name:"aTri"}}, 
                ports:  [{text: " ", x: 0.5, y: 0}, {text: "  ", x: 0.5, y: 1}, {text: "   ", x: 1, y: 0.5}],
                triStates: [{ name:"output", group: "a"}]},

        { name:"dTri", type: "TriStateBuffer", text: "TRI", width: 60, height: 30, relative: {x: { name:"d"}, y: { name:"aTri"}}, 
                ports:  [{text: " ", x: 0.5, y: 0}, {text: "  ", x: 0.5, y: 1}, {text: "   ", x: 1, y: 0.5}],
                triStates: [{ name:"output", group: "a"}]},

        { name:"eTri", type: "TriStateBuffer", text: "TRI", width: 60, height: 30, relative: {x: { name:"e"}, y: { name:"aTri"}}, 
                ports:  [{text: " ", x: 0.5, y: 0}, {text: "  ", x: 0.5, y: 1}, {text: "   ", x: 1, y: 0.5}],
                triStates: [{ name:"output", group: "a"}]},

        { name:"hTri", type: "TriStateBuffer", text: "TRI", width: 60, height: 30, relative: {x: { name:"h"}, y: { name:"aTri"}}, 
                ports:  [{text: " ", x: 0.5, y: 0}, {text: "  ", x: 0.5, y: 1}, {text: "   ", x: 1, y: 0.5}],
                triStates: [{ name:"output", group: "a"}]},

        { name:"lTri", type: "TriStateBuffer", text: "TRI", width: 60, height: 30, relative: {x: { name:"l"}, y: { name:"aTri"}}, 
                ports:  [{text: " ", x: 0.5, y: 0}, {text: "  ", x: 0.5, y: 1}, {text: "   ", x: 1, y: 0.5}],
                triStates: [{ name:"output", group: "a"}]},

        { name:"inTri16", type: "TriState16SplitOut", text: "16-Bit TRI", x: 100, width: 120, height: 30, relative: {xy: { name:"lTri2"}},
                ports: [{text: " ", x: 0.5, y: 0}, {text: "  ", x: 0.25, y: 1}, {text: "   ", x: 0.75, y: 1}, {text: "    ", x: 1, y: 0.5}],
                triStates: [{ name:"outputlo", group: "b"}, { name:"outputhi", group: "c"}]},
    
        { name:"outTri16", type: "TriState16SplitIn", text: "16-Bit TRI", width: 120, height: 30, relative: {y: { name:"lTri"}, x: { name:"inTri16"}},
                ports: [{text: " ", x: 0.25, y: 0}, {text: "  ", x: 0.75, y: 0}, {text: "   ", x: 0.5, y: 1}, {text: "    ", x: 1, y: 0.5}],
                triStates: [{ name:"output", group: "d"}]},

        { name:"dec1", type: "ThreeToEightDecoder", text: "3-to-8 Decoder", width: 350, height: 75, x: -400, y: -250, relative: {xy: { name:"a"}}, ports: [
           {text: "In", x: 0.15, y: 0}, {text: "S\u2082", x: 0.5, y: 0}, {text: "S\u2081", x: 0.7, y: 0}, {text: "S\u2080", x: 0.9, y: 0}, 
           {text: "0", x: 0.0625, y: 1}, {text: "1", x: 0.1875, y: 1}, {text: "2", x: 0.3125, y: 1}, {text: "3", x: 0.4375, y: 1}, {text: "4", x: 0.5625, y: 1}, {text: "5", x: 0.6875, y: 1}, {text: "6", x: 0.8125, y: 1}, {text: "7", x: 0.9375, y: 1}]},

        { name:"inSelect0", type: "DigitButton", y: -75, relative: {xy: { name:"dec1", io: "S\u2080"}}},
        { name:"inSelect1", type: "DigitButton", relative: {x: { name:"dec1", io: "S\u2081"}, y: { name:"inSelect0"}}},
        { name:"inSelect2", type: "DigitButton", relative: {x: { name:"dec1", io: "S\u2082"}, y: { name:"inSelect0"}}},
        { name:"inClock", type: "MomentaryButton", relative: {x: { name:"dec1", io: "In"}, y: { name:"inSelect0"}}},

        { name:"clock", type: "Label", text: "Clock", y: -25, relative: {xy: { name:"inClock", io: "top"}}},
        { name:"inSelect", type: "DynamicDecimal", relative: {x: { name:"inSelect1"}, y: { name:"clock"}},
                showBits: 3,
                lookup: {0: "B", 1: "C", 2: "D", 3: "E", 4: "H", 5: "L", 6: "M", 7: "A"},
                digits: {0: "inSelect0", 1: "inSelect1", 2: "inSelect2"}},

        { name:"dec2", type: "ThreeToEightDecoder", text: "3-to-8 Decoder", width: 350, height: 75, x: 400, relative: {x: { name:"l"}, y: { name:"dec1"}}, ports: [
           {text: "In", x: 0.85, y: 0}, {text: "S\u2082", x: 0.1, y: 0}, {text: "S\u2081", x: 0.3, y: 0}, {text: "S\u2080", x: 0.5, y: 0}, 
           {text: "0", x: 0.0625, y: 1}, {text: "1", x: 0.1875, y: 1}, {text: "2", x: 0.3125, y: 1}, {text: "3", x: 0.4375, y: 1}, {text: "4", x: 0.5625, y: 1}, {text: "5", x: 0.6875, y: 1}, {text: "6", x: 0.8125, y: 1}, {text: "7", x: 0.9375, y: 1}]},

        { name:"outSelect0", type: "DigitButton", relative: {x: { name:"dec2", io: "S\u2080"}, y: { name:"inSelect0"}}},
        { name:"outSelect1", type: "DigitButton", relative: {x: { name:"dec2", io: "S\u2081"}, y: { name:"inSelect0"}}},
        { name:"outSelect2", type: "DigitButton", relative: {x: { name:"dec2", io: "S\u2082"}, y: { name:"inSelect0"}}},
        { name:"outEnable", type: "MomentaryButton", relative: {x: { name:"dec2", io: "In"}, y: { name:"inSelect0"}}},

        { name:"enable", type: "Label", text: "Enable", relative: {x: { name:"outEnable", io: "top"}, y: { name:"clock"}}},
        { name:"outSelect", type: "DynamicDecimal", relative: {x: { name:"outSelect1"}, y: { name:"clock"}},
                showBits: 3,
                lookup: {0: "B", 1: "C", 2: "D", 3: "E", 4: "H", 5: "L", 6: "M", 7: "A"},
                digits: {0: "outSelect0", 1: "outSelect1", 2: "outSelect2"}},
              
        { name:"aLatchNode", type: "DataPathNode", left: true, top: true, y: -200, relative: {xy: { name:"a", io: " "}}},
        { name:"bLatchNode", type: "DataPathNode", top: true, relative: {x: { name:"b", io: " "}, y: { name:"aLatchNode"}}},
        { name:"cLatchNode", type: "DataPathNode", top: true, relative: {x: { name:"c", io: " "}, y: { name:"aLatchNode"}}},
        { name:"dLatchNode", type: "DataPathNode", relative: {x: { name:"d", io: " "}, y: { name:"aLatchNode"}}},
        { name:"eLatchNode", type: "DataPathNode", top: true, relative: {x: { name:"e", io: " "}, y: { name:"aLatchNode"}}},
        { name:"hLatchNode", type: "DataPathNode", top: true, relative: {x: { name:"h", io: " "}, y: { name:"aLatchNode"}}},
        { name:"lLatchNode", type: "DataPathNode", top: true, right: true, relative: {x: { name:"l", io: " "}, y: { name:"aLatchNode"}}},

        { name:"spin", type: "HexSpinner", value: 0x33, relative: {x: { name:"dLatchNode"}, y: { name:"inClock"}}},
        { name:"hlSpin", type: "WordSpinner", value: 0x26AE, relative: {x: { name:"inTri16", io: " "}, y: { name:"spin"}}},
    
        { name:"aNode", type: "DataPathNode", right: true, y: 40, relative: {xy: { name:"a", io: "  "}}},
        { name:"aJoint", type: "Joint", x: -75, relative: {xy: { name:"aNode"}}},
    
        { name:"aOutNode", type: "DataPathNode", left: true, bottom: true, y: 50, relative: {xy: { name:"aTri", io: "  "}}},
        { name:"bOutNode", type: "DataPathNode", bottom: true, relative: {x: { name:"bTri", io: "  "}, y: { name:"aOutNode"}}},
        { name:"cOutNode", type: "DataPathNode", bottom: true, relative: {x: { name:"cTri", io: "  "}, y: { name:"aOutNode"}}},
        { name:"dOutNode", type: "DataPathNode", relative: {x: { name:"dTri", io: "  "}, y: { name:"aOutNode"}}},
        { name:"eOutNode", type: "DataPathNode", bottom: true, relative: {x: { name:"eTri", io: "  "}, y: { name:"aOutNode"}}},
        { name:"hOutNode", type: "DataPathNode", bottom: true, relative: {x: { name:"hTri", io: "  "}, y: { name:"aOutNode"}}},
        { name:"lOutNode", type: "DataPathNode", right: true, bottom: true, relative: {x: { name:"lTri", io: "  "}, y: { name:"aOutNode"}}},
    
        { name:"ck0Joint1", type: "Joint", y: 35, relative: {xy: { name:"dec1", io: "0"}}},
        { name:"ck1Joint1", type: "Joint", y: 30, relative: {xy: { name:"dec1", io: "1"}}},
        { name:"ck2Joint1", type: "Joint", y: 25, relative: {xy: { name:"dec1", io: "2"}}},
        { name:"ck3Joint1", type: "Joint", y: 20, relative: {xy: { name:"dec1", io: "3"}}},
        { name:"ck4Joint1", type: "Joint", y: 15, relative: {xy: { name:"dec1", io: "4"}}},
        { name:"ck5Joint1", type: "Joint", y: 10, relative: {xy: { name:"dec1", io: "5"}}},
        { name:"ck7Joint", type: "Joint", relative: {x: { name:"dec1", io: "7"}, y: { name:"aOr", io: "A"}}},
    
        { name:"ck0Joint3", type: "Joint", x: -10, relative: {xy: { name:"b", io: "   "}}},
        { name:"ck1Joint3", type: "Joint", x: -10, relative: {xy: { name:"c", io: "   "}}},
        { name:"ck2Joint3", type: "Joint", x: -10, relative: {xy: { name:"d", io: "   "}}},
        { name:"ck3Joint3", type: "Joint", x: -10, relative: {xy: { name:"e", io: "   "}}},
        { name:"ck4Joint3", type: "Joint", x: -15, relative: {xy: { name:"hOr", io: "A"}}},
        { name:"ck5Joint3", type: "Joint", x: -15, relative: {xy: { name:"lOr", io: "A"}}},
    
        { name:"ck0Joint2", type: "Joint", relative: {y: { name:"ck0Joint1"}, x: { name:"ck0Joint3"}}},
        { name:"ck1Joint2", type: "Joint", relative: {y: { name:"ck1Joint1"}, x: { name:"ck1Joint3"}}},
        { name:"ck2Joint2", type: "Joint", relative: {y: { name:"ck2Joint1"}, x: { name:"ck2Joint3"}}},
        { name:"ck3Joint2", type: "Joint", relative: {y: { name:"ck3Joint1"}, x: { name:"ck3Joint3"}}},
        { name:"ck4Joint2", type: "Joint", relative: {y: { name:"ck4Joint1"}, x: { name:"ck4Joint3"}}},
        { name:"ck5Joint2", type: "Joint", relative: {y: { name:"ck5Joint1"}, x: { name:"ck5Joint3"}}},
    
        { name:"en5Joint1", type: "Joint", y: -60, relative: {x: { name:"dec2", io: "5"}, y: { name:"lTri", io: "   "}}},
        { name:"en4Joint1", type: "Joint", y: -65, relative: {x: { name:"dec2", io: "4"}, y: { name:"hTri", io: "   "}}},
        { name:"en3Joint1", type: "Joint", y: -70, relative: {x: { name:"dec2", io: "3"}, y: { name:"eTri", io: "   "}}},
        { name:"en2Joint1", type: "Joint", y: -75, relative: {x: { name:"dec2", io: "2"}, y: { name:"dTri", io: "   "}}},
        { name:"en1Joint1", type: "Joint", y: -80, relative: {x: { name:"dec2", io: "1"}, y: { name:"cTri", io: "   "}}},
        { name:"en0Joint1", type: "Joint", y: -85, relative: {x: { name:"dec2", io: "0"}, y: { name:"bTri", io: "   "}}},
        { name:"en7Joint1", type: "Joint", y: -90, relative: {x: { name:"dec2", io: "7"}, y: { name:"aTri", io: "   "}}},
    
        { name:"en5Joint3", type: "Joint", x: 10, relative: {xy: { name:"lTri", io: "   "}}},
        { name:"en4Joint3", type: "Joint", x: 10, relative: {xy: { name:"hTri", io: "   "}}},
        { name:"en3Joint3", type: "Joint", x: 10, relative: {xy: { name:"eTri", io: "   "}}},
        { name:"en2Joint3", type: "Joint", x: 10, relative: {xy: { name:"dTri", io: "   "}}},
        { name:"en1Joint3", type: "Joint", x: 10, relative: {xy: { name:"cTri", io: "   "}}},
        { name:"en0Joint3", type: "Joint", x: 10, relative: {xy: { name:"bTri", io: "   "}}},
        { name:"en7Joint3", type: "Joint", x: 25, relative: {xy: { name:"aTriOr", io: "A"}}},
    
        { name:"en5Joint2", type: "Joint", relative: {x: { name:"en5Joint3"}, y: { name:"en5Joint1"}}},
        { name:"en4Joint2", type: "Joint", relative: {x: { name:"en4Joint3"}, y: { name:"en4Joint1"}}},
        { name:"en3Joint2", type: "Joint", relative: {x: { name:"en3Joint3"}, y: { name:"en3Joint1"}}},
        { name:"en2Joint2", type: "Joint", relative: {x: { name:"en2Joint3"}, y: { name:"en2Joint1"}}},
        { name:"en1Joint2", type: "Joint", relative: {x: { name:"en1Joint3"}, y: { name:"en1Joint1"}}},
        { name:"en0Joint2", type: "Joint", relative: {x: { name:"en0Joint3"}, y: { name:"en0Joint1"}}},
        { name:"en7Joint2", type: "Joint", relative: {x: { name:"en7Joint3"}, y: { name:"en7Joint1"}}},

        { name:"outLight", type: "HexLight", y: 125, relative: {xy: { name:"dOutNode"}}},
        { name:"output", type: "Label", text: "8-Bit Output", y: 50, relative: {xy: { name:"outLight"}}},

        { name:"out16Light", type: "WordLight", relative: {x: { name:"outTri16", io: "   "}, y: { name:"outLight"}}},
        { name:"output16", type: "Label", text: "16-Bit Output", relative: {y: { name:"output"}, x: { name:"out16Light"}}},

        { name:"accLight", type: "HexLight", relative: {y: { name:"outLight", io: "   "}, x: { name:"aJoint"}}},
        { name:"accumulator", type: "Label", text: "Accumulator", relative: {x: { name:"accLight"}, y: { name:"output"}}},

        { name:"accClkBtn", type: "MomentaryButton", relative: {x: { name:"dec1", io: "3"}, y: { name:"aOr", io: "B"}}},
        { name:"accClk1", type: "Label", text: "Accumulator", y: 50, relative: {xy: { name:"accClkBtn"}}},
        { name:"accClk2", type: "Label", text: "Clock", y: 25, relative: {xy: { name:"accClk1"}}},

        { name:"accEnBtn", type: "MomentaryButton", y: 135, relative: {xy: { name:"accClkBtn"}}},
        { name:"accEn1", type: "Label", text: "Accumulator", y: 50, relative: {xy: { name:"accEnBtn"}}},
        { name:"accEn2", type: "Label", text: "Enable", y: 25, relative: {xy: { name:"accEn1"}}},

        { name:"accEnJoint2", type: "Joint", x: 15, relative: {xy: { name:"aTriOr", io: "B"}}},
        { name:"accEnJoint1", type: "Joint", relative: {x: { name:"accEnJoint2"}, y: { name:"accEnBtn"}}},

        { name:"hInNode1", type: "DataPathNode", left: true, y: 30, relative: {xy: { name:"hTri2", io: "  "}}},
        { name:"hInNode2", type: "DataPathNode", right: true, bottom: true, relative: {y: { name:"hInNode1"}, x: { name:"inTri16", io: "  "}}},
        { name:"lInNode1", type: "DataPathNode", left: true, y: 35, relative: {x: { name:"lTri2", io: "  "}, y: { name:"hInNode1"}}},
        { name:"lInNode2", type: "DataPathNode", right: true, bottom: true, relative: {y: { name:"lInNode1"}, x: { name:"inTri16", io: "   "}}},

        { name:"hOutNode1", type: "DataPathNode", left: true, y: 90, relative: {xy: { name:"h", io: "  "}}},
        { name:"hOutNode2", type: "DataPathNode", right: true, top: true, relative: {y: { name:"hOutNode1"}, x: { name:"outTri16", io: " "}}},
        { name:"lOutNode1", type: "DataPathNode", left: true, y: -35, relative: {x: { name:"l", io: "  "}, y: { name:"hOutNode1"}}},
        { name:"lOutNode2", type: "DataPathNode", right: true, top: true, relative: {y: { name:"lOutNode1"}, x: { name:"outTri16", io: "  "}}},

        { name:"hlSelInv", type: "Inverter", scale: 0.2, rotate: 180, x: 120, y: -30, relative: {xy: { name:"inTri16"}}},
        { name:"hlSelNodeR", type: "Node", x: 25, relative: {xy: { name:"inTri16", io: "    "}}},
        { name:"hlSelNodeL", type: "Node", x: -20, relative: {x: { name:"inTri16"}, y: { name:"hlSelInv"}}},
        { name:"hlSelJoint", type: "Joint", relative: {x: { name:"hlSelNodeR"}, y: { name:"hlSelInv"}}},
        { name:"hlSelJointL", type: "Joint", relative: {x: { name:"hlSelNodeL"}, y: { name:"lTri2", io: "   "}}},
        { name:"hlSelJointH2", type: "Joint", x: 50, relative: {xy: { name:"hTri2", io: "   "}}},
        { name:"hlSelJointH1", type: "Joint", relative: {x: { name:"hlSelJointH2"}, y: { name:"hlSelNodeL"}}},

        { name:"hlEnButton", type: "MomentaryButton", x: 100, relative: {xy: { name:"outTri16", io: "    ", input: "enable"}}},
        { name:"hlEnable", type: "Label", text: "HL Enable", y: 50, relative: {xy: { name:"hlEnButton"}}},
        { name:"hlClkButton", type: "MomentaryButton", relative: {x: { name:"hlEnButton"}, y: { name:"lOrNode"}}},
        { name:"hlClock", type: "Label", text: "HL Clock", y: 50, relative: {xy: { name:"hlClkButton"}}},
        { name:"hlSelButton", type: "DigitButton", relative: {x: { name:"hlEnButton"}, y: { name:"inTri16", io: "    "}}},
        { name:"hlSelect", type: "Label", text: "HL Select", y: 50, relative: {xy: { name:"hlSelButton"}}},
   
      ],
      "wires": 
      [
        { comment: "From the outputs of the latches to the inputs of the tri-state buffers"},
        
        { points:[{ name:"a", io: "  ", output: "output"}, { name:"aNode", io: "top"}], wide: true, end: "none", pos: 15},
        { points:[{ name:"aNode", io: "bottom"}, { name:"aTri", io: " ", input: "input"}], wide: true, beg: "none", chars: 0},
        { points:[{ name:"b", io: "  ", output: "output"}, { name:"bTri", io: " ", input: "input"}], wide: true, pos: 15},
        { points:[{ name:"c", io: "  ", output: "output"}, { name:"cTri", io: " ", input: "input"}], wide: true, pos: 15},
        { points:[{ name:"d", io: "  ", output: "output"}, { name:"dTri", io: " ", input: "input"}], wide: true, pos: 15},
        { points:[{ name:"e", io: "  ", output: "output"}, { name:"eTri", io: " ", input: "input"}], wide: true, pos: 15},

        { comment: "Additions for HL"},

        { points:[{ name:"hTri2", io: "  ", output: "output"}, { name:"hInNode1", io: "top"}], wide: true, end: "none", chars: 0},
        { points:[{ name:"hInNode1", io: "bottom"}, { name:"h", io: " ", input: "input"}], wide: true, beg: "none", pos: -25},
        { points:[{ name:"inTri16", io: "  ", output: "outputhi"}, { name:"hInNode2", io: "top"}], wide: true, end: "none", chars: 0},
        { points:[{ name:"hInNode2", io: "left"}, { name:"hInNode1", io: "right"}], wide: true, beg: "none", end: "none", chars: 0},

        { points:[{ name:"lTri2", io: "  ", output: "output"}, { name:"lInNode1", io: "top"}], wide: true, end: "none", chars: 0},
        { points:[{ name:"lInNode1", io: "bottom"}, { name:"l", io: " ", input: "input"}], wide: true, beg: "none", pos: -25},
        { points:[{ name:"inTri16", io: "   ", output: "outputlo"}, { name:"lInNode2", io: "top"}], wide: true, end: "none", chars: 0},
        { points:[{ name:"lInNode2", io: "left"}, { name:"lInNode1", io: "right"}], wide: true, beg: "none", end: "none", chars: 0},

        { points:[{ name:"h", io: "  ", output: "output"}, { name:"hOutNode1", io: "top"}], wide: true, end: "none", pos: 15},
        { points:[{ name:"hOutNode1", io: "bottom"}, { name:"hTri", io: " ", input: "input"}], wide: true, beg: "none", pos: -25},
        { points:[{ name:"hOutNode1", io: "right"}, { name:"hOutNode2", io: "left"}], wide: true, beg: "none", end: "none", chars: 0},
        { points:[{ name:"hOutNode2", io: "bottom"}, { name:"outTri16", io: " ", input: "inputhi"}], wide: true, beg: "none", pos: -25},

        { points:[{ name:"l", io: "  ", output: "output"}, { name:"lOutNode1", io: "top"}], wide: true, end: "none", pos: 15},
        { points:[{ name:"lOutNode1", io: "bottom"}, { name:"lTri", io: " ", input: "input"}], wide: true, beg: "none", pos: -25},
        { points:[{ name:"lOutNode1", io: "right"}, { name:"lOutNode2", io: "left"}], wide: true, beg: "none", end: "none", chars: 0},
        { points:[{ name:"lOutNode2", io: "bottom"}, { name:"outTri16", io: "  ", input: "inputlo"}], wide: true, beg: "none", pos: -25},

        { comment: "From the nodes above the latches to the latches"},
    
        { points:[{ name:"aLatchNode", io: "bottom"}, { name:"a", io: " ", input: "input"}], wide: true, beg: "none", pos: -30},
        { points:[{ name:"bLatchNode", io: "bottom"}, { name:"b", io: " ", input: "input"}], wide: true, beg: "none", pos: -30},
        { points:[{ name:"cLatchNode", io: "bottom"}, { name:"c", io: " ", input: "input"}], wide: true, beg: "none", pos: -30},
        { points:[{ name:"dLatchNode", io: "bottom"}, { name:"d", io: " ", input: "input"}], wide: true, beg: "none", pos: -30},
        { points:[{ name:"eLatchNode", io: "bottom"}, { name:"e", io: " ", input: "input"}], wide: true, beg: "none", pos: -30},
        { points:[{ name:"hLatchNode", io: "bottom"}, { name:"hTri2", io: " ", input: "input"}], wide: true, beg: "none", pos: -40},
        { points:[{ name:"lLatchNode", io: "bottom"}, { name:"lTri2", io: " ", input: "input"}], wide: true, beg: "none", pos: -40},

        { comment: "Between the nodes above the latches"},
    
        { points:[{ name:"spin", io: "bottom", output: "output"}, { name:"dLatchNode", io: "top"}], wide: true, end: "none", pos: 20},
        { points:[{ name:"dLatchNode", io: "left"}, { name:"cLatchNode", io: "right"}], wide: true, beg: "none", end: "none", chars: 0},
        { points:[{ name:"cLatchNode", io: "left"}, { name:"bLatchNode", io: "right"}], wide: true, beg: "none", end: "none", chars: 0},
        { points:[{ name:"bLatchNode", io: "left"}, { name:"aLatchNode", io: "right"}], wide: true, beg: "none", end: "none", chars: 0},
        { points:[{ name:"dLatchNode", io: "right"}, { name:"eLatchNode", io: "left"}], wide: true, beg: "none", end: "none", chars: 0},
        { points:[{ name:"eLatchNode", io: "right"}, { name:"hLatchNode", io: "left"}], wide: true, beg: "none", end: "none", chars: 0},
        { points:[{ name:"hLatchNode", io: "right"}, { name:"lLatchNode", io: "left"}], wide: true, beg: "none", end: "none", chars: 0},

        { comment: "From the tri-state buffers to the nodes below the tri-state buffers"},
    
        { points:[{ name:"aTri", io: "  ", output: "output"}, { name:"aOutNode", io: "top"}], wide: true, end: "none", chars: 0},
        { points:[{ name:"bTri", io: "  ", output: "output"}, { name:"bOutNode", io: "top"}], wide: true, end: "none", chars: 0},
        { points:[{ name:"cTri", io: "  ", output: "output"}, { name:"cOutNode", io: "top"}], wide: true, end: "none", chars: 0},
        { points:[{ name:"dTri", io: "  ", output: "output"}, { name:"dOutNode", io: "top"}], wide: true, end: "none", chars: 0},
        { points:[{ name:"lTri", io: "  ", output: "output"}, { name:"lOutNode", io: "top"}], wide: true, end: "none", chars: 0},
        { points:[{ name:"hTri", io: "  ", output: "output"}, { name:"hOutNode", io: "top"}], wide: true, end: "none", chars: 0},
        { points:[{ name:"eTri", io: "  ", output: "output"}, { name:"eOutNode", io: "top"}], wide: true, end: "none", chars: 0},

        { comment: "Between the nodes below the tri-state buffers"},

        { points:[{ name:"aOutNode", io: "right"}, { name:"bOutNode", io: "left"}], wide: true, beg: "none", end: "none", chars: 0},
        { points:[{ name:"bOutNode", io: "right"}, { name:"cOutNode", io: "left"}], wide: true, beg: "none", end: "none", chars: 0},
        { points:[{ name:"cOutNode", io: "right"}, { name:"dOutNode", io: "left"}], wide: true, beg: "none", end: "none", chars: 0},
        { points:[{ name:"lOutNode", io: "left"}, { name:"hOutNode", io: "right"}], wide: true, beg: "none", end: "none", chars: 0},
        { points:[{ name:"hOutNode", io: "left"}, { name:"eOutNode", io: "right"}], wide: true, beg: "none", end: "none", chars: 0},
        { points:[{ name:"eOutNode", io: "left"}, { name:"dOutNode", io: "right"}], wide: true, beg: "none", end: "none", chars: 0},

        { comment: "To the result displays"},

        { points:[{ name:"aNode", io: "left"}, { name:"aJoint"}, { name:"accLight", io: "top"}], wide: true, beg: "none", chars: 0},
        { points:[{ name:"dOutNode", io: "bottom"}, { name:"outLight", io: "top"}], wide: true, beg: "none"},

        { comment: "The in-select logic"},

        { points:[{ name:"inClock", io: "bottom"}, { name:"dec1", io: "In", input: "inp"}]},
        { points:[{ name:"inSelect2", io: "bottom"}, { name:"dec1", io: "S\u2082", input: 2}]},
        { points:[{ name:"inSelect1", io: "bottom"}, { name:"dec1", io: "S\u2081", input: 1}]},
        { points:[{ name:"inSelect0", io: "bottom"}, { name:"dec1", io: "S\u2080", input: 0}]},
   
        { points:[{ name:"dec1", io: "0", output: 0}, { name:"ck0Joint1"}, { name:"ck0Joint2"}, { name:"ck0Joint3"}, { name:"b", io: "   ", input: "clk"}]},
        { points:[{ name:"dec1", io: "1", output: 1}, { name:"ck1Joint1"}, { name:"ck1Joint2"}, { name:"ck1Joint3"}, { name:"c", io: "   ", input: "clk"}]},
        { points:[{ name:"dec1", io: "2", output: 2}, { name:"ck2Joint1"}, { name:"ck2Joint2"}, { name:"ck2Joint3"}, { name:"d", io: "   ", input: "clk"}]},
        { points:[{ name:"dec1", io: "3", output: 3}, { name:"ck3Joint1"}, { name:"ck3Joint2"}, { name:"ck3Joint3"}, { name:"e", io: "   ", input: "clk"}]},
        { points:[{ name:"dec1", io: "4", output: 4}, { name:"ck4Joint1"}, { name:"ck4Joint2"}, { name:"ck4Joint3"}, { name:"hOr", io: "A", input: 0}]},
        { points:[{ name:"hOr", io: "out"}, { name:"h", io: "   ", input: "clk"}]},
        { points:[{ name:"dec1", io: "5", output: 5}, { name:"ck5Joint1"}, { name:"ck5Joint2"}, { name:"ck5Joint3"}, { name:"lOr", io: "A", input: 0}]},
        { points:[{ name:"lOr", io: "out"}, { name:"l", io: "   ", input: "clk"}]},
        { points:[{ name:"dec1", io: "7", output: 7}, { name:"ck7Joint"}, { name:"aOr", io: "A", input: 0}]},
        { points:[{ name:"aOr", io: "out"}, { name:"a", io: "   ", input: "clk"}]},

        { comment: "The out-select logic"},

        { points:[{ name:"outEnable", io: "bottom"}, { name:"dec2", io: "In", input: "inp"}]},
        { points:[{ name:"outSelect2", io: "bottom"}, { name:"dec2", io: "S\u2082", input: 2}]},
        { points:[{ name:"outSelect1", io: "bottom"}, { name:"dec2", io: "S\u2081", input: 1}]},
        { points:[{ name:"outSelect0", io: "bottom"}, { name:"dec2", io: "S\u2080", input: 0}]},
    
        { points:[{ name:"dec2", io: "5", output: 5}, { name:"en5Joint1"}, { name:"en5Joint2"}, { name:"en5Joint3"}, { name:"lTri", io: "   ", input: "enable"}]},
        { points:[{ name:"dec2", io: "4", output: 4}, { name:"en4Joint1"}, { name:"en4Joint2"}, { name:"en4Joint3"}, { name:"hTri", io: "   ", input: "enable"}]},
        { points:[{ name:"dec2", io: "3", output: 3}, { name:"en3Joint1"}, { name:"en3Joint2"}, { name:"en3Joint3"}, { name:"eTri", io: "   ", input: "enable"}]},
        { points:[{ name:"dec2", io: "2", output: 2}, { name:"en2Joint1"}, { name:"en2Joint2"}, { name:"en2Joint3"}, { name:"dTri", io: "   ", input: "enable"}]},
        { points:[{ name:"dec2", io: "1", output: 1}, { name:"en1Joint1"}, { name:"en1Joint2"}, { name:"en1Joint3"}, { name:"cTri", io: "   ", input: "enable"}]},
        { points:[{ name:"dec2", io: "0", output: 0}, { name:"en0Joint1"}, { name:"en0Joint2"}, { name:"en0Joint3"}, { name:"bTri", io: "   ", input: "enable"}]},
        { points:[{ name:"dec2", io: "7", output: 7}, { name:"en7Joint1"}, { name:"en7Joint2"}, { name:"en7Joint3"}, { name:"aTriOr", io: "A", input: 0}]},
        { points:[{ name:"aTriOr", io: "out"}, { name:"aTri", io: "   ", input: "enable"}]},

        { comment: "Accumulator Additions"},

        { points:[{ name:"accClkBtn", io: "right"}, { name:"aOr", io: "B", input: 1}]},
        { points:[{ name:"accEnBtn", io: "right"}, { name:"accEnJoint1"}, { name:"accEnJoint2"}, { name:"aTriOr", io: "B", input: 1}]},

        { comment: "16-Bit Paths"},

        { points:[{ name:"hlSpin", io: "bottom", output: "output"}, { name:"inTri16", io: " ", input: "input"}], wide16: true, chars: 4, pos: 20},
        { points:[{ name:"outTri16", io: "   ", output: "output"}, { name:"out16Light", io: "top"}], wide16: true, chars: 4},

        { comment: "HL additions"},

        { points:[{ name:"lOrNode"}, { name:"hOrJoint1"}, { name:"hOrJoint2"}, { name:"hOr", io: "B", input: 1}]},
        { points:[{ name:"lOrNode"}, { name:"lOrJoint"}, { name:"lOr", io: "B", input: 1}]},
        { points:[{ name:"hlClkButton", io: "left"}, { name:"lOrNode"}]},

        { points:[{ name:"hlEnButton", io: "left"}, { name:"outTri16", io: "    ", input: "enable"}]},

        { points:[{ name:"hlSelButton", io: "left"}, { name:"hlSelNodeR"}]},
        { points:[{ name:"hlSelNodeR"}, { name:"inTri16", io: "    ", input: "enable"}]},
        { points:[{ name:"hlSelNodeR"}, { name:"hlSelJoint"}, { name:"hlSelInv", io: "in"}]},
        { points:[{ name:"hlSelInv", io: "out"}, { name:"hlSelNodeL"}]},
        { points:[{ name:"hlSelNodeL"}, { name:"hlSelJointL"}, { name:"lTri2", io: "   ", input: "enable"}]},
        { points:[{ name:"hlSelNodeL"}, { name:"hlSelJointH1"}, { name:"hlSelJointH2"}, { name:"hTri2", io: "   ", input: "enable"}]},

    ]
};
