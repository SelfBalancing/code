// Chapter23InstructionDecoder (c) Charles Petzold, 2024

let Chapter23InstructionDecoder = 
{
    name: "Chapter23InstructionDecoder",
    transform: { x: 200, y: 100, scale: 1, rotate: 0 },
    wireCurveRadius: 5,
    nodeRadius: 3,
    propagationDelay: 10,

    components:
    [
        { name:"opcodeSpinner", type: "HexSpinner", value: 0x40},

        { name:"mnemonic", type: "DynamicDecimal", y: -60, relative: {xy: { name:"opcodeSpinner"}},
            bytes: {0: "opcodeSpinner"}, lookup: "opcodes1", lookupOnly: true },

        { name:"hiDecode", type: "TwoToFourDecoder", text: "2-to-4", width: 80, height: 60, x: -165, y: 100, relative: {xy: { name:"opcodeSpinner"}},
            ports: [{text: "S\u2081", x: 0.25, y: 0}, {text: "S\u2080", x: 0.75, y: 0},
                    {text: "0", x: 0.125, y: 1}, {text: "1", x: 0.375, y: 1}, {text: "2", x: 0.625, y: 1}, {text: "3", x: 0.875, y: 1}]},

        { name:"miDecode", type: "ThreeToEightDecoder", text: "3-to-8", width: 120, height: 60, x: 100, relative: {xy: { name:"hiDecode"}},
            ports: [{text: "S\u2082", x: 0.17, y: 0}, {text: "S\u2081", x: 0.5, y: 0}, {text: "S\u2080", x: 0.83, y: 0},
                    {text: "0", x: 0.0625, y: 1}, {text: "1", x: 0.1875, y: 1}, {text: "2", x: 0.3125, y: 1}, {text: "3", x: 0.4375, y: 1},
                    {text: "4", x: 0.5625, y: 1}, {text: "5", x: 0.6875, y: 1}, {text: "6", x: 0.8125, y: 1}, {text: "7", x: 0.9375, y: 1}]},

        { name:"loDecode", type: "ThreeToEightDecoder", text: "3-to-8", width: 120, height: 60, x: 140, relative: {xy: { name:"miDecode"}},
            ports: [{text: "S\u2082", x: 0.17, y: 0}, {text: "S\u2081", x: 0.5, y: 0}, {text: "S\u2080", x: 0.83, y: 0},
                    {text: "0", x: 0.0625, y: 1}, {text: "1", x: 0.1875, y: 1}, {text: "2", x: 0.3125, y: 1}, {text: "3", x: 0.4375, y: 1},
                    {text: "4", x: 0.5625, y: 1}, {text: "5", x: 0.6875, y: 1}, {text: "6", x: 0.8125, y: 1}, {text: "7", x: 0.9375, y: 1}]},
                
        { name:"opJoint71", type: "Joint", y: 20, relative: {xy: { name:"opcodeSpinner", io: 7}}},
        { name:"opJoint72", type: "Joint", relative: {y: { name:"opJoint71"}, x: { name:"hiDecode", io: "S\u2081"}}},

        { name:"opJoint61", type: "Joint", y: 30, relative: {xy: { name:"opcodeSpinner", io: 6}}},
        { name:"opJoint62", type: "Joint", relative: {y: { name:"opJoint61"}, x: { name:"hiDecode", io: "S\u2080"}}},

        { name:"opJoint51", type: "Joint", y: 40, relative: {xy: { name:"opcodeSpinner", io: 5}}},
        { name:"opJoint52", type: "Joint", relative: {y: { name:"opJoint51"}, x: { name:"miDecode", io: "S\u2082"}}},

        { name:"opJoint41", type: "Joint", y: 50, relative: {xy: { name:"opcodeSpinner", io: 4}}},
        { name:"opJoint42", type: "Joint", relative: {y: { name:"opJoint41"}, x: { name:"miDecode", io: "S\u2081"}}},
             
        { name:"opJoint31", type: "Joint", y: 50, relative: {xy: { name:"opcodeSpinner", io: 3}}},
        { name:"opJoint32", type: "Joint", relative: {y: { name:"opJoint31"}, x: { name:"miDecode", io: "S\u2080"}}},

        { name:"opJoint21", type: "Joint", y: 40, relative: {xy: { name:"opcodeSpinner", io: 2}}},
        { name:"opJoint22", type: "Joint", relative: {y: { name:"opJoint21"}, x: { name:"loDecode", io: "S\u2082"}}},

        { name:"opJoint11", type: "Joint", y: 30, relative: {xy: { name:"opcodeSpinner", io: 1}}},
        { name:"opJoint12", type: "Joint", relative: {y: { name:"opJoint11"}, x: { name:"loDecode", io: "S\u2081"}}},
                
        { name:"opJoint01", type: "Joint", y: 20, relative: {xy: { name:"opcodeSpinner", io: 0}}},
        { name:"opJoint02", type: "Joint", relative: {y: { name:"opJoint01"}, x: { name:"loDecode", io: "S\u2080"}}},

        { name:"movrrAnd", type: "AndGate", inputs: 3, scale: 0.33, x:300, y: 100, relative: {xy: { name:"loDecode"}}},
        { name:"movrmAnd", type: "AndGate", inputs: 3, scale: 0.33, y: 40, relative: {xy: { name:"movrrAnd"}}},
        { name:"movmrAnd", type: "AndGate", inputs: 3, scale: 0.33, y: 40, relative: {xy: { name:"movrmAnd"}}},
        { name:"mvirAnd", type: "AndGate", inputs: 3, scale: 0.33, y: 40, relative: {xy: { name:"movmrAnd"}}},
        { name:"mvimAnd", type: "AndGate", inputs: 3, scale: 0.33, y: 40, relative: {xy: { name:"mvirAnd"}}},
        { name:"addrAnd", type: "AndGate", scale: 0.33, y: 40, relative: {xy: { name:"mvimAnd"}}},
        { name:"addmAnd", type: "AndGate", scale: 0.33, y: 40, relative: {xy: { name:"addrAnd"}}},
        { name:"adiAnd", type: "AndGate", scale: 0.33, y: 40, relative: {xy: { name:"addmAnd"}}},
        { name:"inxAnd", type: "AndGate", inputs: 3, scale: 0.33, y: 40, relative: {xy: { name:"adiAnd"}}},
        { name:"dcxAnd", type: "AndGate", inputs: 3, scale: 0.33, y: 40, relative: {xy: { name:"inxAnd"}}},
        { name:"ldaAnd", type: "AndGate", inputs: 3, scale: 0.33, y: 40, relative: {xy: { name:"dcxAnd"}}},
        { name:"staAnd", type: "AndGate", inputs: 3, scale: 0.33, y: 40, relative: {xy: { name:"ldaAnd"}}},
        { name:"hltAnd", type: "AndGate", inputs: 3, scale: 0.33, y: 40, relative: {xy: { name:"staAnd"}}},

        { name:"hidec0Node1", type: "Node", relative: {x: { name:"hiDecode", io: "0"}, y: { name:"mvirAnd", io: "2/3"}}},
        { name:"hidec0Node2", type: "Node", relative: {x: { name:"hidec0Node1"}, y: { name:"mvimAnd", io: "2/3"}}},
        { name:"hidec0Node3", type: "Node", relative: {x: { name:"hidec0Node1"}, y: { name:"inxAnd", io: "3/3"}}},
        { name:"hidec0Node4", type: "Node", relative: {x: { name:"hidec0Node1"}, y: { name:"dcxAnd", io: "3/3"}}},
        { name:"hidec0Node5", type: "Node", relative: {x: { name:"hidec0Node1"}, y: { name:"ldaAnd", io: "3/3"}}},
        { name:"hidec0Joint", type: "Joint", relative: {x: { name:"hidec0Node1"}, y: { name:"staAnd", io: "3/3"}}},

        { name:"hidec1Node1", type: "Node", x: -20, relative: {xy: { name:"movrrAnd", io: "1/3"}}},
        { name:"hidec1Joint0", type: "Joint", relative: {x: { name:"hiDecode", io: "1"}, y: { name:"hidec1Node1"}}},
        { name:"hidec1Node2", type: "Node", relative: {x: { name:"hidec1Node1"}, y: { name:"movrmAnd", io: "1/3"}}},
        { name:"hidec1Node3", type: "Node", relative: {x: { name:"hidec1Node1"}, y: { name:"movmrAnd", io: "1/3"}}},
        { name:"hidec1Joint", type: "Joint", relative: {x: { name:"hidec1Node1"}, y: { name:"hltAnd", io: "1/3"}}},

        { name:"hidec2Node", type: "Node", relative: {x: { name:"hiDecode", io: "2"}, y: { name:"addrAnd", io: "A"}}},
        { name:"hidec2Joint", type: "Joint", relative: {x: { name:"hiDecode", io: "2"}, y: { name:"addmAnd", io: "A"}}},

        { name:"hidec3Joint", type: "Joint", relative: {x: { name:"hiDecode", io: "3"}, y: { name:"adiAnd", io: "B"}}},
        
        { name:"midec4Joint", type: "Joint", relative: {x: { name:"miDecode", io: "4"}, y: { name:"inxAnd", io: "2/3"}}},
        { name:"midec5Joint", type: "Joint", relative: {x: { name:"miDecode", io: "5"}, y: { name:"dcxAnd", io: "2/3"}}},
        { name:"midec6Node", type: "Node", relative: {x: { name:"miDecode", io: "6"}, y: { name:"movmrAnd", io: "3/3"}}},
        { name:"midec6Joint", type: "Joint", relative: {x: { name:"miDecode", io: "6"}, y: { name:"staAnd", io: "2/3"}}},
        { name:"midec7Joint", type: "Joint", relative: {x: { name:"miDecode", io: "7"}, y: { name:"ldaAnd", io: "2/3"}}},

        { name:"lodec2Node", type: "Node", relative: {x: { name:"loDecode", io: "2"}, y: { name:"ldaAnd", io: "1/3"}}},
        { name:"lodec2Joint", type: "Joint", relative: {x: { name:"loDecode", io: "2"}, y: { name:"staAnd", io: "1/3"}}},
                
        { name:"lodec3Node", type: "Node", relative: {x: { name:"loDecode", io: "3"}, y: { name:"inxAnd", io: "1/3"}}},
        { name:"lodec3Joint", type: "Joint", relative: {x: { name:"loDecode", io: "3"}, y: { name:"dcxAnd", io: "1/3"}}},

        { name:"lodec6Node1", type: "Node", relative: {x: { name:"loDecode", io: "6"}, y: { name:"movrmAnd", io: "2/3"}}},
        { name:"lodec6Node2", type: "Node", relative: {x: { name:"lodec6Node1"}, y: { name:"mvirAnd", io: "1/3"}}},
        { name:"lodec6Node3", type: "Node", relative: {x: { name:"lodec6Node1"}, y: { name:"mvimAnd", io: "1/3"}}},
        { name:"lodec6Joint", type: "Joint", relative: {x: { name:"lodec6Node1"}, y: { name:"adiAnd", io: "A"}}},

        { name:"memsrcNode", type: "Node", x: -175, relative: {xy: { name:"movrmAnd", io: "2/3"}}},
        { name:"memsrcInv", type: "Inverter", scale: 0.25, x: 25, y: -25, relative: {xy: { name:"memsrcNode"}}},
        { name:"memsrcinvJoint", type: "Joint", relative: {x: { name:"memsrcNode"}, y: { name:"memsrcInv"}}},
        { name:"memsrcinvNode0", type: "Node", x: -100, relative: {y: { name:"memsrcInv", io: "out"}, x: { name:"movrrAnd"}}},
        { name:"memsrcinvNode1", type: "Node", relative: {x: { name:"memsrcinvNode0"}, y: { name:"movmrAnd", io: "2/3"}}},
        { name:"memsrcinvJoint1", type: "Joint", relative: {x: { name:"memsrcinvNode0"}, y: { name:"movrrAnd", io: "2/3"}}},
        { name:"memsrcinvJoint2", type: "Joint", relative: {x: { name:"memsrcinvNode0"}, y: { name:"addrAnd", io: "B"}}},

        { name:"memdstNode", type: "Node", relative: {x: { name:"memsrcNode"}, y: { name:"movmrAnd", io: "3/3"}}},
        { name:"memdstInv", type: "Inverter", scale: 0.25, x: 25, y: -25, relative: {xy: { name:"memdstNode"}}},
        { name:"memdstinvJoint", type: "Joint", relative: {x: { name:"memdstNode"}, y: { name:"memdstInv"}}},
        { name:"memdstinvNode0", type: "Node", x: -80, relative: {y: { name:"memdstInv", io: "out"}, x: { name:"movrrAnd"}}},
        { name:"memdstinvNode1", type: "Node", relative: {x: { name:"memdstinvNode0"}, y: { name:"movrmAnd", io: "3/3"}}},
        { name:"memdstinvJoint1", type: "Joint", relative: {x: { name:"memdstinvNode0"}, y: { name:"movrrAnd", io: "3/3"}}},
        { name:"memdstinvJoint2", type: "Joint", relative: {x: { name:"memdstinvNode0"}, y: { name:"mvirAnd", io: "3/3"}}},

        { name:"memsrcNode1", type: "Node", x: -40, relative: {y: { name:"memsrcNode"}, x: { name:"movrmAnd", io: "2/3"}}},
        { name:"memsrcNode2", type: "Node", relative: {x: { name:"memsrcNode1"}, y: { name:"addmAnd", io: "B"}}},
        { name:"memsrcJoint", type: "Joint", relative: {x: { name:"memsrcNode1"}, y: { name:"hltAnd", io: "2/3"}}},

        { name:"memdstNode1", type: "Node", x: -60, relative: {y: { name:"memdstNode"}, x: { name:"movmrAnd", io: "2/3"}}},
        { name:"memdstNode2", type: "Node", relative: {x: { name:"memdstNode1"}, y: { name:"mvimAnd", io: "3/3"}}},
        { name:"memdstJoint", type: "Joint", relative: {x: { name:"memdstNode1"}, y: { name:"hltAnd", io: "3/3"}}},

        { name:"movrrInline", type: "InlineText", text: "MOV r,r", x: 100, relative: {xy: { name:"movrrAnd", io: "out"}}},
        { name:"movrmInline", type: "InlineText", text: "MOV r,M", relative: {x: { name:"movrrInline"}, y: { name:"movrmAnd", io: "out"}}},
        { name:"movmrInline", type: "InlineText", text: "MOV M,r", relative: {x: { name:"movrrInline"}, y: { name:"movmrAnd", io: "out"}}},
        { name:"mvirInline", type: "InlineText", text: "MVI r,data", relative: {x: { name:"movrrInline"}, y: { name:"mvirAnd", io: "out"}}},
        { name:"mvimInline", type: "InlineText", text: "MVI M,data", relative: {x: { name:"movrrInline"}, y: { name:"mvimAnd", io: "out"}}},
        { name:"addrInline", type: "InlineText", text: "ADD r,...", relative: {x: { name:"movrrInline"}, y: { name:"addrAnd", io: "out"}}},
        { name:"addmInline", type: "InlineText", text: "ADD M,...", relative: {x: { name:"movrrInline"}, y: { name:"addmAnd", io: "out"}}},
        { name:"adiInline", type: "InlineText", text: "ADI data,...", relative: {x: { name:"movrrInline"}, y: { name:"adiAnd", io: "out"}}},
        { name:"inxInline", type: "InlineText", text: "INX HL", relative: {x: { name:"movrrInline"}, y: { name:"inxAnd", io: "out"}}},
        { name:"dcxInline", type: "InlineText", text: "DCX HL", relative: {x: { name:"movrrInline"}, y: { name:"dcxAnd", io: "out"}}},
        { name:"ldaInline", type: "InlineText", text: "LDA addr", relative: {x: { name:"movrrInline"}, y: { name:"ldaAnd", io: "out"}}},
        { name:"staInline", type: "InlineText", text: "STA addr", relative: {x: { name:"movrrInline"}, y: { name:"staAnd", io: "out"}}},
        { name:"hltInline", type: "InlineText", text: "HLT", relative: {x: { name:"movrrInline"}, y: { name:"hltAnd", io: "out"}}},

        { name:"mvirNode", type: "Node", x: 85, relative: {xy: { name:"mvirAnd", io: "out"}}},
        { name:"mvimNode", type: "Node", x: 75, relative: {xy: { name:"mvimAnd", io: "out"}}},
        { name:"addrNode", type: "Node", x: 35, relative: {xy: { name:"addrAnd", io: "out"}}},
        { name:"addmNode", type: "Node", x: 25, relative: {xy: { name:"addmAnd", io: "out"}}},
        { name:"adiNode", type: "Node", x: 65, relative: {xy: { name:"adiAnd", io: "out"}}},
        { name:"ldaNode", type: "Node", x: 55, relative: {xy: { name:"ldaAnd", io: "out"}}},
        { name:"staNode", type: "Node", x: 45, relative: {xy: { name:"staAnd", io: "out"}}},

        { hidden: true, name: "hiddenHaltNode", type: "Node", relative: {xy: { name:"hltInline", io: "end"}}},
        { name:"haltJoint1", type: "Joint", x: 25, relative: {xy: { name:"hiddenHaltNode"}}},

        { comment: "Diode Array"},

        { name:"diodes", type: "InstructionDiodeMatrix", x: 100, relative: {xy: { name:"movrrInline"}}},

        { comment: "TODO: Tri-State Buffers on Diode Array. These need to be specific types with the number of signals specified"},

        { name:"triAddrC1", type: "SoloTriState", inputs: 2, text: "TRI", width: 62.5, height: 50, x: -6, y: 20, relative: {xy: { name:"diodes", io: "out0"}},
            ports: [{text: "En", x: 1, y: 0.5, hidden: true}, 
                    {text: "In1", x: 0.1, y: 0, hidden: true}, {text: "Out1", x: 0.1, y: 1, hidden: true},
                    {text: "In2", x: 0.9, y: 0, hidden: true}, {text: "Out2", x: 0.9, y: 1, hidden: true}]},
                
        { name:"triAddrP1", type: "SoloTriState", inputs: 1, text: "TRI", width: 40, height: 50, x: -20, y: 20, relative: {xy: { name:"diodes", io: "out2"}},
            ports: [{text: "En", x: 1, y: 0.5, hidden: true}, 
                    {text: "In1", x: 0.5, y: 0, hidden: true}, {text: "Out1", x: 0.5, y: 1, hidden: true}]},

        { name:"triAddrC2", type: "SoloTriState", inputs: 3, text: "TRI", width: 125, height: 50, x: -12.5, y: 20, relative: {xy: { name:"diodes", io: "out3"}},
            ports: [{text: "En", x: 1, y: 0.5, hidden: true}, 
                    {text: "In1", x: 0.1, y: 0, hidden: true}, {text: "Out1", x: 0.1, y: 1, hidden: true}, 
                    {text: "In2", x: 0.5, y: 0, hidden: true}, {text: "Out2", x: 0.5, y: 1, hidden: true}, 
                    {text: "In3", x: 0.9, y: 0, hidden: true}, {text: "Out3", x: 0.9, y: 1, hidden: true}]},

        { name:"triAddrP2", type: "SoloTriState", inputs: 1, text: "TRI", width: 40, height: 50, x: -20, y: 20, relative: {xy: { name:"diodes", io: "out6"}},
            ports: [{text: "En", x: 1, y: 0.5, hidden: true}, 
                    {text: "In1", x: 0.5, y: 0, hidden: true}, {text: "Out1", x: 0.5, y: 1, hidden: true}]},
        
        { name:"triDataC1", type: "SoloTriState", inputs: 4, text: "TRI", width: 187.5, height: 50, x: -19, y: 20, relative: {xy: { name:"diodes", io: "out7"}},
            ports: [{text: "En", x: 1, y: 0.5, hidden: true}, 
                    {text: "In1", x: 0.1, y: 0, hidden: true}, {text: "Out1", x: 0.1, y: 1, hidden: true}, 
                    {text: "In2", x: 0.367, y: 0, hidden: true}, {text: "Out2", x: 0.367, y: 1, hidden: true}, 
                    {text: "In3", x: 0.633, y: 0, hidden: true}, {text: "Out3", x: 0.633, y: 1, hidden: true}, 
                    {text: "In4", x: 0.9, y: 0, hidden: true}, {text: "Out4", x: 0.9, y: 1, hidden: true}]},

        { name:"triDataP1", type: "SoloTriState", inputs: 4, text: "TRI", width: 187.5, height: 50, x: -19, y: 20, relative: {xy: { name:"diodes", io: "out11"}},
            ports: [{text: "En", x: 1, y: 0.5, hidden: true}, 
                    {text: "In1", x: 0.1, y: 0, hidden: true}, {text: "Out1", x: 0.1, y: 1, hidden: true}, 
                    {text: "In2", x: 0.367, y: 0, hidden: true}, {text: "Out2", x: 0.367, y: 1, hidden: true}, 
                    {text: "In3", x: 0.633, y: 0, hidden: true}, {text: "Out3", x: 0.633, y: 1, hidden: true}, 
                    {text: "In4", x: 0.9, y: 0, hidden: true}, {text: "Out4", x: 0.9, y: 1, hidden: true}]},

        { name:"triDataC2", type: "SoloTriState", inputs: 1, text: "TRI", width: 40, height: 50, x: -20, y: 20, relative: {xy: { name:"diodes", io: "out15"}},
            ports: [{text: "En", x: 1, y: 0.5, hidden: true}, 
                    {text: "In1", x: 0.5, y: 0, hidden: true}, {text: "Out1", x: 0.5, y: 1, hidden: true}]},

        { name:"triDataP2", type: "SoloTriState", inputs: 1, text: "TRI", width: 40, height: 50, x: -20, y: 20, relative: {xy: { name:"diodes", io: "out16"}},
            ports: [{text: "En", x: 1, y: 0.5, hidden: true}, 
                    {text: "In1", x: 0.5, y: 0, hidden: true}, {text: "Out1", x: 0.5, y: 1, hidden: true}]},

        { comment: "TextBox's on tri-state buffers"},

        { name: "txtAC1-1", type: "TextBox", text: "HL Enable", width: 50, horzAlign: "right", y: 25, attach: "0.75,0", relative: {xy: { name:"triAddrC1", io: "Out1"}}},
        { name: "txtAC1-2", type: "TextBox", text: "Inst. Latch 2\u00A0&\u00A03 Enable", width: 50, horzAlign: "left", attach: "0.25,0", relative: {x: { name:"triAddrC1", io: "Out2"}, y: { name:"txtAC1-1"}}},

        { name: "txtAP1", type: "TextBox", text: "Inc-Dec Clock", width: 50, relative: {x: { name:"triAddrP1", io: "Out1"}, y: { name:"txtAC1-1"}}},

        { name: "txtAC2-1", type: "TextBox", text: "HL Select", width: 50, horzAlign: "right", attach: "0.75,0", relative: {x: { name:"triAddrC2", io: "Out1"}, y: { name:"txtAC1-1"}}},
        { name: "txtAC2-2", type: "TextBox", text: "Inc. Enable", width: 50, relative: {x: { name:"triAddrC2", io: "Out2"}, y: { name:"txtAC1-1"}}},
        { name: "txtAC2-3", type: "TextBox", text: "Dec. Enable", width: 50, horzAlign: "left", attach: "0.25,0", relative: {x: { name:"triAddrC2", io: "Out3"}, y: { name:"txtAC1-1"}}},

        { name: "txtAP2", type: "TextBox", text: "HL Clock", width: 50, relative: {x: { name:"triAddrP2", io: "Out1"}, y: { name:"txtAC1-1"}}},

        { name: "txtDC1-1", type: "TextBox", text: "RA Enable", width: 50, horzAlign: "right", attach: "0.8,0", relative: {x: { name:"triDataC1", io: "Out1"}, y: { name:"txtAC1-1"}}},
        { name: "txtDC1-2", type: "TextBox", text: "RAM DO Enable", width: 50, attach: "0.6,0", relative: {x: { name:"triDataC1", io: "Out2"}, y: { name:"txtAC1-1"}}},
        { name: "txtDC1-3", type: "TextBox", text: "Inst. Latch 2 Enable", width: 50, attach: "0.4,0", relative: {x: { name:"triDataC1", io: "Out3"}, y: { name:"txtAC1-1"}}},
        { name: "txtDC1-4", type: "TextBox", text: "Acc. Enable", width: 50, horzAlign: "left", attach: "0.2,0", relative: {x: { name:"triDataC1", io: "Out4"}, y: { name:"txtAC1-1"}}},

        { name: "txtDP1-1", type: "TextBox", text: "RA Clock", width: 50, horzAlign: "right", attach: "0.8,0", relative: {x: { name:"triDataP1", io: "Out1"}, y: { name:"txtAC1-1"}}},
        { name: "txtDP1-2", type: "TextBox", text: "RAM Write", width: 50, attach: "0.6,0", relative: {x: { name:"triDataP1", io: "Out2"}, y: { name:"txtAC1-1"}}},
        { name: "txtDP1-3", type: "TextBox", text: "ALU Clock", width: 50, attach: "0.4,0", relative: {x: { name:"triDataP1", io: "Out3"}, y: { name:"txtAC1-1"}}},
        { name: "txtDP1-4", type: "TextBox", text: "Acc. Clock", width: 50, horzAlign: "left", attach: "0.2,0", relative: {x: { name:"triDataP1", io: "Out4"}, y: { name:"txtAC1-1"}}},

        { name: "txtDC2", type: "TextBox", text: "ALU Enable", width: 50, relative: {x: { name:"triDataC2", io: "Out1"}, y: { name:"txtAC1-1"}}},

        { name: "txtDP2", type: "TextBox", text: "Acc. Clock", width: 50, relative: {x: { name:"triDataP2", io: "Out1"}, y: { name:"txtAC1-1"}}},

        { comment: "Labels at top"},

        { name:"label366", type: "Label", text: "Initial Decoding (pgs 366 & 367)", x: -0, y: -125, relative: {xy: { name:"movrrAnd"}}},

        { name:"braceAddr1", type: "Brace", orientation: "up", extent: 87, x: 87, y: -50, relative: {xy: { name:"diodes"}}},
        { name:"braceLabelAddr1", type: "Label", text: "Cycle 1", y: -20, relative: {xy: { name:"braceAddr1"}}},

        { name:"braceAddr2", type: "Brace", orientation: "up", extent: 112, x: 362, relative: {x: { name:"diodes"}, y: { name:"braceAddr1"}}},
        { name:"braceLabelAddr2", type: "Label", text: "Cycle 2", relative: {x: { name:"braceAddr2"}, y: { name:"braceLabelAddr1"}}},

        { name:"braceData1", type: "Brace", orientation: "up", extent: 212, x: 762, y: -50, relative: {xy: { name:"diodes"}}},
        { name:"braceLabelData1", type: "Label", text: "Cycle 1", y: -20, relative: {xy: { name:"braceData1"}}},

        { name:"braceData2", type: "Brace", orientation: "up", extent: 62, x: 1112, relative: {x: { name:"diodes"}, y: { name:"braceAddr1"}}},
        { name:"braceLabelData2", type: "Label", text: "Cycle 2", relative: {x: { name:"braceData2"}, y: { name:"braceLabelData1"}}},

        { name:"braceAddr", type: "Brace", orientation: "up", extent: 237, x: 237, y: -110, relative: {xy: { name:"diodes"}}},
        { name:"braceLabelAddr", type: "Label", text: "Address Bus", y: -20, relative: {xy: { name:"braceAddr"}}},

        { name:"braceData", type: "Brace", orientation: "up", extent: 312, x: 862, relative: {x: { name:"diodes"}, y: { name:"braceAddr"}}},
        { name:"braceLabelData", type: "Label", text: "Data Bus", relative: {x: { name:"braceData"}, y: { name:"braceLabelAddr"}}},

        { name:"label374", type: "Label", text: "Diode ROM Matrix (pages 374, 375, and 376)", x: 587, relative: {x: { name:"diodes"}, y: { name:"label366"}}},

        { comment: "Cycle decoding stage 1 (first x and y setting determines location of whole bottom circuit)"},

        { name:"cycle1Or1", type: "OrGate", inputs: 3, scale: 0.5, x: 325, y: 1300, relative: {xy: { name:"hiDecode"}}},
        { name:"mvirInline2", type: "InlineText", text: "MVI r,data", x: -125, relative: {xy: { name:"cycle1Or1", io: "1/3"}}},
        { name:"mvimInline2", type: "InlineText", text: "MVI M,data", relative: {x: { name:"mvirInline2"}, y: { name:"cycle1Or1", io: "2/3"}}},
        { name:"adiInline2", type: "InlineText", text: "ADI data,...", relative: {x: { name:"mvirInline2"}, y: { name:"cycle1Or1", io: "3/3"}}},

        { name:"cycle1Or2", type: "OrGate", scale: 0.5, y: 105, relative: {xy: { name:"cycle1Or1"}}},
        { name:"ldaInline2", type: "InlineText", text: "LDA", relative: {x: { name:"mvirInline2"}, y: { name:"cycle1Or2", io: "A"}}},
        { name:"staInline2", type: "InlineText", text: "STA", relative: {x: { name:"mvirInline2"}, y: { name:"cycle1Or2", io: "B"}}},

        { name:"cycle1Or3", type: "OrGate", inputs: 3, scale: 0.5, y: 100, relative: {xy: { name:"cycle1Or2"}}},
        { name:"addrInline2", type: "InlineText", text: "ADD r,...", relative: {x: { name:"mvirInline2"}, y: { name:"cycle1Or3", io: "2/3"}}},
        { name:"addmInline2", type: "InlineText", text: "ADD M,...", relative: {x: { name:"mvirInline2"}, y: { name:"cycle1Or3", io: "3/3"}}},

        { name:"adiCycleNode", type: "Node", x: -25, relative: {xy: { name:"cycle1Or1", io: "3/3"}}},
        { name:"adiCycleJoint", type: "Joint", relative: {x: { name:"adiCycleNode"}, y: { name:"cycle1Or3", io: "1/3"}}},

        { name:"cycle1Or4", type: "OrGate", scale: 0.5, x:50, y: 55, relative: {xy: { name:"cycle1Or1", io: "out"}}},
        { name:"cycle1Or1Node", type: "Node", x: 25, relative: {xy: { name:"cycle1Or1", io: "out"}}},
        { name:"cycle1Or2Node", type: "Node", relative: {y: { name:"cycle1Or2", io: "out"}, x: { name:"cycle1Or1Node"}}},
        { name:"cycle1Or3Node", type: "Node", relative: {y: { name:"cycle1Or3", io: "out"}, x: { name:"cycle1Or1Node"}}},
        { name:"cycle1Or4Node", type: "Node", x: 25, relative: {xy: { name:"cycle1Or4", io: "out"}}},
        { name:"cycle1Inv1", type: "Inverter", scale: 0.25, x: 25, relative: {xy: { name:"cycle1Or3Node"}}},
        { name:"cycle1Inv1Joint", type: "Joint", y: 25, relative: {x: { name:"cycle1Or3Node"}, y: { name:"cycle1Inv1"}}},
        { name:"cycle1Inv2", type: "Inverter", scale: 0.25, x: 25, relative: {xy: { name:"cycle1Or4Node"}}},
        { name:"cycle1Or1Joint", type: "Joint", relative: {x: { name:"cycle1Or1Node"}, y: { name:"cycle1Or4", io: "A"}}},
        { name:"cycle1Or2Joint", type: "Joint", relative: {x: { name:"cycle1Or2Node"}, y: { name:"cycle1Or4", io: "B"}}},

        { comment: "Connection with instruction decode. First x orients it horizontally"},

        { name:"addmJoint3", type: "Joint", relative: {y: { name:"addmInline2"}, x: { name:"hidec0Node1"}}},
        { name:"addrJoint3", type: "Joint", x: 10, relative: {y: { name:"addrInline2"}, x: { name:"addmJoint3"}}},
        { name:"staJoint3", type: "Joint", x: 10, relative: {y: { name:"staInline2"}, x: { name:"addrJoint3"}}},
        { name:"ldaJoint3", type: "Joint", x: 10, relative: {y: { name:"ldaInline2"}, x: { name:"staJoint3"}}},
        { name:"adiJoint3", type: "Joint", x: 10, relative: {y: { name:"adiInline2"}, x: { name:"ldaJoint3"}}},
        { name:"mvimJoint3", type: "Joint", x: 10, relative: {y: { name:"mvimInline2"}, x: { name:"adiJoint3"}}},
        { name:"mvirJoint3", type: "Joint", x: 10, relative: {y: { name:"mvirInline2"}, x: { name:"mvimJoint3"}}},

        { name:"mvirJoint1", type: "Joint", y: 450, relative: {xy: { name:"mvirNode"}}},
        { name:"mvimJoint1", type: "Joint", y: -10, relative: {x: { name:"mvimNode"}, y: { name:"mvirJoint1"}}},
        { name:"adiJoint1", type: "Joint", y: -10, relative: {x: { name:"adiNode"}, y: { name:"mvimJoint1"}}},
        { name:"ldaJoint1", type: "Joint", y: -10, relative: {x: { name:"ldaNode"}, y: { name:"adiJoint1"}}},
        { name:"staJoint1", type: "Joint", y: -10, relative: {x: { name:"staNode"}, y: { name:"ldaJoint1"}}},
        { name:"addrJoint1", type: "Joint", y: -10, relative: {x: { name:"addrNode"}, y: { name:"staJoint1"}}},
        { name:"addmJoint1", type: "Joint", y: -10, relative: {x: { name:"addmNode"}, y: { name:"addrJoint1"}}},

        { name:"mvirJoint2", type: "Joint", relative: {y: { name:"mvirJoint1"}, x: { name:"mvirJoint3"}}},
        { name:"mvimJoint2", type: "Joint", relative: {y: { name:"mvimJoint1"}, x: { name:"mvimJoint3"}}},
        { name:"adiJoint2", type: "Joint", relative: {y: { name:"adiJoint1"}, x: { name:"adiJoint3"}}},
        { name:"ldaJoint2", type: "Joint", relative: {y: { name:"ldaJoint1"}, x: { name:"ldaJoint3"}}},
        { name:"staJoint2", type: "Joint", relative: {y: { name:"staJoint1"}, x: { name:"staJoint3"}}},
        { name:"addrJoint2", type: "Joint", relative: {y: { name:"addrJoint1"}, x: { name:"addrJoint3"}}},
        { name:"addmJoint2", type: "Joint", relative: {y: { name:"addmJoint1"}, x: { name:"addmJoint3"}}},

        { comment: "Fetch and Cycle inlines"},

        { name:"1ByteFetch", type: "InlineText", text: "1-Byte Fetch", x: 25, relative: {xy: { name:"cycle1Inv2", io: "out"}}},
        { name:"1ByteFetchNot", type: "InlineText", text: "1-Byte Fetch|OL", y: -105, relative: {y: { name:"cycle1Or4", io: "out"}, x: { name:"1ByteFetch"}}},
        { name:"1ByteFetchNotJoint", type: "Joint", relative: {x: { name:"cycle1Or4Node"}, y: { name:"1ByteFetchNot"}}},
        { name:"2ByteFetch", type: "InlineText", text: "2-Byte Fetch", relative: {y: { name:"cycle1Or1Node"}, x: { name:"1ByteFetch"}}},
        { name:"3ByteFetch", type: "InlineText", text: "3-Byte Fetch", relative: {y: { name:"cycle1Or2Node"}, x: { name:"1ByteFetch"}}},
        { name:"1CycleExec", type: "InlineText", text: "1-Cycle Execute", relative: {y: { name:"cycle1Inv1", io: "out"}, x: { name:"1ByteFetch"}}},
        { name:"2CycleExec", type: "InlineText", text: "2-Cycle Execute", relative: {y: { name:"cycle1Inv1Joint"}, x: { name:"1ByteFetch"}}},

        { comment: "From Chap23Fig15.json used for book illustration"},

        { name: "counter", type: "Counter", text: "4-Bit Counter", initial: -1, width: 200, height: 75, x: 375, y: -270, relative: {xy: { name:"cycle1Or1"}}, 
            "ports": [
            {text: "Clk", x: 0, y: 0.20}, {text: "Clear", x: 1, y: 0.20}, 
            {text: "Q\u2083", x: 0.125, y: 1}, {text: "Q\u2082", x: 0.375, y: 1}, {text: "Q\u2081", x: 0.625, y: 1}, {text: "Q\u2080", x: 0.875, y: 1}
          ]},
    
        { name:"decoder", type: "FourToSixteenDecoder", text: "4-to-16 Decoder", width:200, height: 75, y: 100, relative: {xy: { name:"counter"}}, 
            "ports": [
           {text: "D\u2083", x: 0.125, y: 0}, {text: "D\u2082", x: 0.375, y: 0}, {text: "D\u2081", x: 0.625, y: 0}, {text: "D\u2080", x: 0.875, y: 0},
           {text: "...", x: 0.1875, y: 1}, {text: "9", x: 0.40625, y: 1}, {text: "8", x: 0.46875, y: 1}, 
                {text: "7", x: 0.53125, y: 1}, {text: "6", x: 0.59375, y: 1}, {text: "5", x: 0.65625, y: 1}, {text: "4", x: 0.71875, y: 1}, 
                {text: "3", x: 0.78125, y: 1}, {text: "2", x: 0.84375, y: 1}, {text: "1", x: 0.90625, y: 1}, {text: "0", x: 0.96875, y: 1}
          ]},
    
        { name:"fetch2And", type: "AndGate", scale: 0.20, x: 270, y: 215, relative: {xy: { name:"counter"}} },
     
        { name:"fetch3And", type: "AndGate", scale: 0.20, y: 25, relative: {xy: { name:"fetch2And"}}},
    
        { name:"pcincOr", type: "OrGate", "inputs": 3, scale: 0.20, y: 40, relative: {xy: { name:"fetch3And"}}},
        { name:"pcIncAnd1", type: "AndGate", scale: 0.20, y: -15, x: -50, relative: {xy: { name:"pcincOr"}}},
        { name:"pcIncAnd2", type: "AndGate", scale: 0.20, y: 15, relative: {x: { name:"pcIncAnd1"}, y: { name:"pcincOr"}}},

        { name:"1ByteFetchNotNode", type: "Node", relative: {x: { name:"decoder", io: "0"}, y:{ name:"fetch2And", io: "B"}}},
        { name:"1ByteFetchNotJoint2", type: "Joint", relative: {x: { name:"1ByteFetchNotNode"}, y: { name:"pcIncAnd1", io: "B"}}},
    
        { name:"exec1Or", type: "OrGate", "inputs": 3, scale: 0.20, y: 65, relative: {xy: { name:"pcincOr"}}},
        { name:"exec1And2", type: "AndGate", scale: 0.20, relative: {x: { name:"pcIncAnd1"}, y: { name:"exec1Or"}}},
        { name:"exec1And1", type: "AndGate", scale: 0.20, y: -25, relative: {xy: { name:"exec1And2"}}},
        { name:"exec1And3", type: "AndGate", scale: 0.20, y: 25, relative: {xy: { name:"exec1And2"}}},
    
        { name:"fetch2", type: "InlineText", text: "Fetch Cycle 2", x: 150, relative: {xy: { name:"fetch2And", io: "out"}}},
        { name:"fetch1", type: "InlineText", text: "Fetch Cycle 1", y: -25, relative: {xy: { name:"fetch2"}}},
        { name:"fetch3", type: "InlineText", text: "Fetch Cycle 3", relative: {y: { name:"fetch3And"}, x: { name:"fetch2"}}},
        { name:"pcinc", type: "InlineText",  text: "PC Increment Cycle", relative: {y: { name:"pcincOr"}, x: { name:"fetch2"}}},
        { name:"execCycle1", type: "InlineText", text: "Execute Cycle 1",  relative: {y: { name:"exec1Or", io: "out"}, x: { name:"fetch2"}}},
    
        { name:"fetch1Joint", type: "Joint", relative: {x: { name:"decoder", io: "0"}, y: { name:"fetch1", io: "0,0.5"}}},
        { name:"pcinc1Joint", type: "Joint", relative: {x: { name:"decoder", io: "1"}, y: { name:"pcincOr", io: "2/3"}}},
    
        { name:"exec1And1Joint1", type: "Joint", x: 10, relative: {xy: { name:"exec1And1", io: "out"}}},
        { name:"exec1And1Joint2", type: "Joint", relative: {x: { name:"exec1And1Joint1"}, y: { name:"exec1Or", io: "1/3"}}},
        { name:"exec1And3Joint1", type: "Joint", relative: {x: { name:"exec1And1Joint1"}, y: { name:"exec1And3", io: "out"}}},
        { name:"exec1And3Joint2", type: "Joint", relative: {x: { name:"exec1And1Joint1"}, y: { name:"exec1Or", io: "3/3"}}},
    
        { name:"pcincJoint1", type:"Joint", x: 10, relative: {xy: { name:"pcIncAnd1", io: "out"}}},
        { name:"pcincJoint2", type:"Joint", relative: {x: { name:"pcincJoint1"}, y: { name:"pcincOr", io: "1/3"}}},
        { name:"pcincJoint3", type:"Joint", relative: {x: { name:"pcincJoint1"}, y: { name:"pcIncAnd2", io: "out"}}},
        { name:"pcincJoint4", type:"Joint", relative: {x: { name:"pcincJoint3"}, y: { name:"pcincOr", io: "3/3"}}},
    
        { name:"exec2Or", type: "OrGate", "inputs": 3, scale: 0.20, y: 90, relative: {xy: { name:"exec1Or"}}},
        { name:"exec2And2", type: "AndGate", scale: 0.20, relative: {x: { name:"exec1And1"}, y: { name:"exec2Or"}}},
        { name:"exec2And1", type: "AndGate", scale: 0.20, y: -25, relative: {xy: { name:"exec2And2"}}},
        { name:"exec2And3", type: "AndGate", scale: 0.20, y: 25, relative: {xy: { name:"exec2And2"}}},
    
        { name:"resetOr", type: "OrGate", "inputs": 3, scale: 0.20, y: 105, relative: {xy: { name:"exec2Or"}}},
        { name:"resetAnd2", type: "AndGate", scale: 0.20, relative: {x: { name:"exec2And1"}, y: { name:"resetOr"}}},
        { name:"resetAnd1", type: "AndGate", scale: 0.20, y: -25, relative: {xy: { name:"resetAnd2"}}},
        { name:"resetAnd3", type: "AndGate", scale: 0.20, y: 25, relative: {xy: { name:"resetAnd2"}}},
    
        { name:"mainResetOr", type: "OrGate", scale: 0.2, "rotate": -180, x: 75, relative: {xy: { name:"counter", io: "Clear"}}},
    
        { name:"exec2And", type: "AndGate", scale: 0.20, x: 30, y: 5, relative: {xy: { name:"exec2Or", io: "out"}}},
        { name:"resetTriggerAnd2", type: "AndGate", scale: 0.20, x: 30, y: -5, relative: {xy: { name:"resetOr", io: "out"}}},
    
        { name:"execCycle2", type: "InlineText", text: "Execute Cycle 2", "xAlign": 0, "yAlign": 0.5, relative: {y: { name:"exec2And", io: "out"}, x: { name:"fetch2", io: "0,0.5"}}},
    
        { name:"dec2Node", type: "Node", relative: {x: { name:"decoder", io: "2"}, y: { name:"fetch2And", io: "A"}}},
        { name:"dec2Joint", type: "Joint", relative: {x: { name:"dec2Node"}, y: { name:"exec1And1", io: "A"}}},
    
        { name:"dec3Node", type: "Node", relative: {x: { name:"decoder", io: "3"}, y: { name:"pcIncAnd1", io: "A"}}},
        { name:"dec3Joint", type: "Joint", relative: {x: { name:"decoder", io: "3"}, y: { name:"exec2And1", io: "A"}}},
    
        { name:"dec4Node1", type: "Node", relative: {x: { name:"decoder", io: "4"}, y: { name:"fetch3And", io: "A"}}},
        { name:"dec4Node2", type: "Node", relative: {x: { name:"dec4Node1"}, y: { name:"exec1And2", io: "A"}}},
        { name:"dec4Joint", type: "Joint", relative: {x: { name:"dec4Node1"}, y: { name:"resetAnd1", io: "A"}}},
    
        { name:"dec5Node", type: "Node", relative: {x: { name:"decoder", io: "5"}, y: { name:"pcIncAnd2", io: "A"}}},
        { name:"dec5Joint", type: "Joint", relative: {x: { name:"dec5Node"}, y: { name:"exec2And2", io: "A"}}},
    
        { name:"dec6Node", type: "Node", relative: {x: { name:"decoder", io: "6"}, y: { name:"exec1And3", io: "A"}}},
        { name:"dec6Joint", type: "Joint", relative: {x: { name:"dec6Node"}, y: { name:"resetAnd2", io: "A"}}},
    
        { name:"exec1Joint1", type:"Joint", x: 10, relative: {xy: { name:"exec1And1", io: "out"}}},
        { name:"exec1Joint2", type:"Joint", relative: {x: { name:"exec1Joint1"}, y: { name:"exec1Or", io: "1/3"}}},
        { name:"exec1Joint3", type:"Joint", relative: {x: { name:"exec1Joint1"}, y: { name:"exec1And3", io: "out"}}},
        { name:"exec1Joint4", type:"Joint", relative: {x: { name:"exec1Joint3"}, y: { name:"exec1Or", io: "3/3"}}},
    
        { name:"exec2Joint1", type:"Joint", x: 10, relative: {xy: { name:"exec2And1", io: "out"}}},
        { name:"exec2Joint2", type:"Joint", relative: {x: { name:"exec2Joint1"}, y: { name:"exec2Or", io: "1/3"}}},
        { name:"exec2Joint3", type:"Joint", relative: {x: { name:"exec2Joint1"}, y: { name:"exec2And3", io: "out"}}},
        { name:"exec2Joint4", type:"Joint", relative: {x: { name:"exec2Joint3"}, y: { name:"exec2Or", io: "3/3"}}},
    
        { name:"resetJoint1", type:"Joint", x: 10, relative: {xy: { name:"resetAnd1", io: "out"}}},
        { name:"resetJoint2", type:"Joint", relative: {x: { name:"resetJoint1"}, y: { name:"resetOr", io: "1/3"}}},
        { name:"resetJoint3", type:"Joint", relative: {x: { name:"resetJoint1"}, y: { name:"resetAnd3", io: "out"}}},
        { name:"resetJoint4", type:"Joint", relative: {x: { name:"resetJoint3"}, y: { name:"resetOr", io: "3/3"}}},
    
        { name:"dec7Joint", type: "Joint", relative: {x: { name:"decoder", io: "7"}, y: { name:"exec2And3", io: "A"}}},
        { name:"dec8Joint", type: "Joint", relative: {x: { name:"decoder", io: "8"}, y: { name:"resetAnd3", io: "A"}}},
    
        { name:"fetch1ByteNode1", type: "Node", x: -10, relative: {x: { name:"decoder", io: "8"}, y: { name:"exec1And1", io: "B"}}},
        { name:"fetch1ByteNode2", type: "Node", relative: {x: { name:"fetch1ByteNode1"}, y: { name:"exec2And1", io: "B"}}},
        { name:"fetch1ByteJoint", type: "Joint", relative: {x: { name:"fetch1ByteNode1"}, y: { name:"resetAnd1", io: "B"}}},
    
        { name:"fetch2ByteJoint1", type: "Joint", x: -10, relative: {x: { name:"fetch1ByteNode1"}, y: { name:"pcIncAnd1", io: "B"}}},
        { name:"fetch2ByteNode2", type: "Node", relative: {x: { name:"fetch2ByteJoint1"}, y: { name:"exec1And2", io: "B"}}},
        { name:"fetch2ByteNode3", type: "Node", relative: {x: { name:"fetch2ByteJoint1"}, y: { name:"exec2And2", io: "B"}}},
        { name:"fetch2ByteJoint", type: "Joint", relative: {x: { name:"fetch2ByteJoint1"}, y: { name:"resetAnd2", io: "B"}}},
         
        { name:"fetch3ByteJoint1", type: "Joint", x: -10, relative: {x: { name:"fetch2ByteJoint1"}, y: { name:"fetch3And", io: "B"}}},
        { name:"fetch3ByteNode2", type: "Node", relative: {x: { name:"fetch3ByteJoint1"}, y: { name:"pcIncAnd2", io: "B"}}},
        { name:"fetch3ByteNode3", type: "Node", relative: {x: { name:"fetch3ByteJoint1"}, y: { name:"exec1And3", io: "B"}}},
        { name:"fetch3ByteNode4", type: "Node", relative: {x: { name:"fetch3ByteJoint1"}, y: { name:"exec2And3", io: "B"}}},
        { name:"fetch3ByteJoint", type: "Joint", relative: {x: { name:"fetch3ByteJoint1"}, y: { name:"resetAnd3", io: "B"}}},
    
        { name:"resetTriggerAnd1", type: "AndGate", scale: 0.2, y: -5, relative: {x: { name:"resetTriggerAnd2"}, y: { name:"1CycleExec"}}},
        { name:"resetOr2", type: "OrGate", scale: 0.20, x: 20, y: 5, relative: {xy: { name:"resetTriggerAnd1", io: "out"}}},
        { name:"resetOrJoint3", type: "Joint", x: 10, relative: {xy: { name:"resetTriggerAnd2", io: "out"}}},
        { name:"resetOrJoint4", type: "Joint", relative: {x: { name:"resetOrJoint3"}, y: { name:"resetOr2", io: "B"}}},
    
        { name:"exec2JointA1", type: "Joint", x:-20, relative: {xy: { name:"exec2And", io: "B"}}},
        { name:"exec2NodeA", type: "Node", relative: {x: { name:"exec2JointA1"}, y: { name:"2CycleExec"}}},
        { name:"exec2JointA2", type: "Joint", relative: {x: { name:"exec2NodeA"}, y: { name:"resetTriggerAnd2", io: "A"}}},
        
        { name:"exec2NodeB", type: "Node", x:-10, relative: {xy: { name:"exec2And", io: "A"}}},
        { name:"exec2JointB", type: "Joint", relative: {x: { name:"exec2NodeB"}, y: { name:"resetTriggerAnd1", io: "A"}}},
    
        { name:"resetLoopJoint1", type: "Joint", x: 25, relative: {xy: { name:"resetOr2", io: "out"}}},
        { name:"resetLoopJoint2", type: "Joint", relative: {x: { name:"resetLoopJoint1"}, y: { name:"mainResetOr", io: "A"}}},

        { comment: "Flip-flop oscillators, positioned relative to 4-Bit Counter"},

        { name:"ff2", type: "FlipFlop", text: "Flip-Flop", width: 150, height: 75, x: 0, y: -125, relative: {xy: { name:"counter"}}, 
                ports: [ { text: "Clk", x: 0, y: 0.25, edge: true}, { text: "D",  x: 0, y: 0.75 }, { text: "Q", x: 1, y: 0.25 },
                        { text: "Q|OL", x: 1, y: 0.75 }, { text: "Preset",  x: 0.5, y: 0 }]},

        { name:"ff1", type: "FlipFlop", text: "Flip-Flop", preset: true, width: 150, height: 75, x: -210, relative: {xy: { name:"ff2"}}, 
                ports: [ { text: "Clk", x: 0, y: 0.25, edge: true}, { text: "D",  x: 0, y: 0.75 }, { text: "Q", x: 1, y: 0.25 },
                        { text: "Q|OL", x: 1, y: 0.75 }, { text: "Preset",  x: 0.5, y: 0 }]},

        { name:"ffHalt", type: "FlipFlop", text: "Flip-Flop", width: 150, height: 75, x: -310, relative: {xy: { name:"ff1"}}, 
                ports: [ { text: "Clk", x: 0, y: 0.25, edge: true}, { text: "D",  x: 0, y: 0.75 }, { text: "Q", x: 1, y: 0.25 },
                        { text: "Q|OL", x: 1, y: 0.75 }, { text: "Clear",  x: 0.5, y: 0 }]},

        { name:"haltJoint4", type: "Joint", x: -15, relative: {xy: { name:"ffHalt", io: "Clk"}}},
        { name:"haltJoint3", type: "Joint", y: -225, relative: {xy: { name:"haltJoint4"}}},
        { name:"haltAnd", type: "AndGate", scale: 0.33, rotate: 180, relative: {x: { name:"hltAnd"}, y: { name:"haltJoint3"}}},
        { name:"haltJoint2", type: "Joint", relative: {x: { name:"haltJoint1"}, y: { name:"haltAnd", io: "B"}}},
        
        { name:"pulseAnd", type: "AndGate", scale: 0.5, x: 50, y: 12.5, relative: {xy: { name:"ff2", io: "Q"}}},
        { name:"oscAnd", type: "AndGate", scale: 0.5, x: -115, relative: {xy: { name:"ff1", io: "Clk"}}},
        { name:"oscInv", type: "Inverter", scale: 0.33, x: 115, y: -35, relative: {xy: { name:"ff1"}}},

        { name:"oscInvNode", type: "Node", x: -25, relative: {xy: { name:"ff1", io: "Clk"}}},
        { name:"oscInvJoint1", type: "Joint", relative: {x: { name:"oscInvNode"}, y: { name:"oscInv"}}},
        { name:"oscInvJoint3", type: "Joint", x: -15, relative: {xy: { name:"ff2", io: "Clk"}}},
        { name:"oscInvJoint2", type: "Joint", relative: {y: { name:"oscInv"}, x: { name:"oscInvJoint3"}}},

        { name:"cycleClkNode", type: "Node", x: -30, relative: {xy: { name:"ff2", io: "D"}}},
        { name:"cycleClkJoint1", type: "Joint", relative: {x: { name:"cycleClkNode"}, y: { name:"ff1", io: "Q"}}},
        { name:"cycleClkJoint2", type: "Joint", relative: {x: { name:"cycleClkNode"}, y: { name:"counter", io: "Clk" }}},

        { name:"ffLoopNode", type: "Node", x: 15, y: 35, relative: {xy: { name:"ff1", io: "Q|OL"}}},
        { name:"ffLoopJoint1", type: "Joint", relative: {x: { name:"ffLoopNode"}, y: { name:"ff1", io: "Q|OL"}}},
        { name:"ffLoopJoint3", type: "Joint", x: -15, relative: {xy: { name:"ff1", io: "D"}}},
        { name:"ffLoopJoint2", type: "Joint", relative: {x: { name:"ffLoopJoint3"}, y: { name:"ffLoopNode"}}},

        { name:"pulseAndJoint2", type: "Joint", x: -25, relative: {xy: { name:"pulseAnd", io: "B"}}},
        { name:"pulseAndJoint1", type: "Joint", relative: {x: { name:"pulseAndJoint2"}, y: { name:"ffLoopNode"}}},

        { name:"pulse", type: "InlineText", text: "Pulse", relative: {y: { name:"pulseAnd", io: "out"}, x: { name:"fetch1"}}},

        { name:"haltNode", type: "Node", x: 15, relative: {xy: { name:"ffHalt", io: "Q|OL"}}},
        { name:"haltJoint", type: "Joint", relative: {x: { name:"haltNode"}, y: { name:"oscAnd", io: "A"}}},
        { name:"haltLoopJoint1", type: "Joint", y: 35, relative: {xy: { name:"haltNode"}}},
        { name:"haltLoopJoint3", type: "Joint", x: -15, relative: {xy: { name:"ffHalt", io: "D"}}},
        { name:"haltLoopJoint2", type: "Joint", relative: {x: { name:"haltLoopJoint3"}, y: { name:"haltLoopJoint1"}}},
        { name:"haltLoopJoint4", type: "Joint", relative: {x: { name:"haltNode"}, y: { name:"oscAnd", io: "A"}}},

        { name:"clkButton", type: "MomentaryButton", x: -15, y: 150, relative: {xy: { name:"oscAnd"}}},
        { name:"clock", type: "Label", text: "Clock", y: 50, relative: {xy: { name:"clkButton"}}},
        { name:"clkJoint", type: "Joint", relative: {x: { name:"clkButton"}, y: { name:"oscAnd", io: "B"}}},

        { name:"resetButton", type: "MomentaryButton", y: -125, relative: {xy: { name:"ffHalt", io: "Clear"}}},
        { name:"reset", type: "Label", text: "Reset", y: -50, relative: {xy: { name:"resetButton"}}},

        { name:"resetNode1", type: "Node", y: -75, relative: {xy: { name:"ffHalt", io: "Clear"}}},
        { name:"resetNode2", type: "Node", relative: {x: { name:"ff1", io: "Preset"}, y: { name:"resetNode1"}}},
        { name:"resetNode3", type: "Node", relative: {x: { name:"ff2", io: "Preset"}, y: { name:"resetNode1"}}},
        { name:"resetOrJoint1", type: "Joint", x: 50, relative: {x: { name:"mainResetOr"}, y: { name:"resetNode1"}}},
        { name:"resetOrJoint2", type: "Joint", relative: {x: { name:"resetOrJoint1"}, y: { name:"mainResetOr", io: "B"}}},

        { comment: "Final Decoding: Fetch Cycles" },

        { name:"fetchOr", type: "OrGate", inputs: 3, scale: 0.75, x: 100, relative: {xy: { name:"fetch2", io: "end"}}},
        { name:"fetch1Node", type: "Node", x: 25, relative: {xy: { name:"fetch1", io: "end"}}},
        { name:"fetch2Node", type: "Node", x: 45, relative: {xy: { name:"fetch2", io: "end"}}},
        { name:"fetch3Node", type: "Node", x: 65, relative: {xy: { name:"fetch3", io: "end"}}},

        { comment: "Final Decoding: Execute Pulses" },

        { name:"ep1And", type: "AndGate", scale: 0.33, x: 300, y: 25, relative: {xy: { name:"execCycle1", io: "end"}}},
        { name:"ep2And", type: "AndGate", scale: 0.33, y: -25, relative: {y: { name:"execCycle2", io: "end"}, x: { name:"ep1And"}}},
        { name:"ep1Node", type: "Node", x: -25, relative: {x: { name:"ep1And"}, y: { name:"execCycle1"}}},
        { name:"ep1Joint", type: "Joint", relative: {x: { name:"ep1Node"}, y: { name:"ep1And", io: "A"}}},
        { name:"ep2Node", type: "Node", x: -25, relative: {x: { name:"ep2And"}, y: { name:"execCycle2"}}},
        { name:"ep2Joint", type: "Joint", relative: {x: { name:"ep2Node"}, y: { name:"ep2And", io: "B"}}},
        { name:"epPulseNode", type: "Node", x: -65, relative: {xy: { name:"ep1And", io: "B"}}},
        { name:"epPulseJoint", type: "Joint", relative: {x: { name:"epPulseNode"}, y: { name:"ep2And", io: "A"}}},

        { name:"execPulse1", type: "InlineText", text: "Execute Pulse 1", x: 100, relative: {xy: { name:"ep1And", io: "out"}}},
        { name:"execPulse2", type: "InlineText", text: "Execute Pulse 2", relative: {y: { name:"ep2And", io: "out"}, x: { name:"execPulse1"}}},

        { comment: "Control signals on diode matrix tri-states. x Values should be 1/2 group spacing on diodes (with some fudging)"},

        { name:"aec1Joint1", type: "Joint", x: 35, y: 125, relative: {xy: { name:"triAddrC1", io: "En"}}},
        { name:"aec1Joint2", type: "Joint", relative: {y: { name:"triAddrC1", io: "En"}, x: { name:"aec1Joint1"}}},
        { name:"8ec1Node", type: "Node", x: 25, relative: {x: { name:"triDataC1", io: "En"}, y: { name:"aec1Joint1"}}},
        { name:"8ec1Joint", type: "Joint", relative: {y: { name:"triDataC1", io: "En"}, x: { name:"8ec1Node"}}},

        { name:"aep1Node1", type: "Node", x: 25, y: 150, relative: {xy: { name:"triAddrP1", io: "En"}}},
        { name:"aep1Joint2", type: "Joint", relative: {y: { name:"triAddrP1", io: "En"}, x: { name:"aep1Node1"}}},
        { name:"8ep1Node", type: "Node", x: 25, relative: {x: { name:"triDataP1", io: "En"}, y: { name:"aep1Node1"}}},
        { name:"8ep1Joint", type: "Joint", relative: {y: { name:"triDataP1", io: "En"}, x: { name:"8ep1Node"}}},

        { name:"p1HaltJoint1", type: "Joint", relative: {x: { name:"haltJoint2"}, y: { name:"aep1Node1"}}},
        { name:"p1HaltJoint2", type: "Joint", relative: {x: { name:"p1HaltJoint1"}, y: { name:"haltAnd", io: "A"}}},

        { name:"aec2Joint1", type: "Joint", x: 35, y: 175, relative: {xy: { name:"triAddrC2", io: "En"}}},
        { name:"aec2Joint2", type: "Joint", relative: {y: { name:"triAddrC2", io: "En"}, x: { name:"aec2Joint1"}}},
        { name:"8ec2Node", type: "Node", x: 25, relative: {x: { name:"triDataC2", io: "En"}, y: { name:"aec2Joint1"}}},
        { name:"8ec2Joint", type: "Joint", relative: {y: { name:"triDataC2", io: "En"}, x: { name:"8ec2Node"}}},

        { name:"aep2Joint1", type: "Joint", x: 25, y: 200, relative: {xy: { name:"triAddrP2", io: "En"}}},
        { name:"aep2Joint2", type: "Joint", relative: {y: { name:"triAddrP2", io: "En"}, x: { name:"aep2Joint1"}}},
        { name:"8ep2Node", type: "Node", x: 25, relative: {x: { name:"triDataP2", io: "En"}, y: { name:"aep2Joint1"}}},
        { name:"8ep2Joint", type: "Joint", relative: {y: { name:"triDataP2", io: "En"}, x: { name:"8ep2Node"}}},

        { name:"EP2", type: "InlineText", text: "Execute Pulse 2", rtl: true, x: 150, relative: {xy: { name:"8ep2Node"}}},
        { name:"EC2", type: "InlineText", text: "Execute Cycle 2", rtl: true, relative: {y: { name:"8ec2Node"}, x: { name:"EP2"}}},
        { name:"EP1", type: "InlineText", text: "Execute Pulse 1", rtl: true, relative: {y: { name:"8ep1Node"}, x: { name:"EP2"}}},
        { name:"EC1", type: "InlineText", text: "Execute Cycle 1", rtl: true, relative: {y: { name:"8ec1Node"}, x: { name:"EP2"}}},

        { name:"ec1Joint2", type: "Joint", x: 40, relative: {xy: { name:"EC1"}}},
        { name:"ec1Joint1", type: "Joint", relative: {x: { name:"ec1Joint2"}, y: { name:"ep1Node"}}},

        { name:"ep1Joint2", type: "Joint", x: 15, relative: {y: { name:"EP1"}, x: { name:"ec1Joint2"}}},
        { name:"ep1Joint1", type: "Joint", relative: {x: { name:"ep1Joint2"}, y: { name:"execPulse1"}}},

        { name:"ep2Joint2", type: "Joint", x: 15, relative: {y: { name:"EP2"}, x: { name:"ep1Joint2"}}},
        { name:"ep2Joint1", type: "Joint", relative: {x: { name:"ep2Joint2"}, y: { name:"execPulse2"}}},

        { name:"ec2Joint2", type: "Joint", x: 15, relative: {y: { name:"EC2"}, x: { name:"ep2Joint2"}}},
        { name:"ec2Joint1", type: "Joint", relative: {x: { name:"ec2Joint2"}, y: { name:"ep2Node"}}},

        { comment: "Program Counter (from pcinc label"},

        { name:"pcincNode", type: "Node", relative: {x: { name:"ep1Node"}, y: { name:"pcinc"}}},
        { name:"pcincAnd", type: "AndGate", scale: 0.33, y: 30, relative: {x: { name:"ep1And"}, y: { name:"pcincNode"}}},
        { name:"pcincJoint", type: "Joint", relative: {x: { name:"pcincNode"}, y: { name:"pcincAnd", io: "A"}}},
        { name:"pcincPulseNode", type: "Node", relative: {x: { name:"epPulseNode"}, y: { name:"pcincAnd", io: "B"}}},

        { name:"triIncEn", type: "SoloTriState", text: "TRI", inputs: 1, input: true, width: 50, height: 25, x: 200, y: -12.5, relative: {xy: { name:"pcincNode"}},
                ports: [{text: "En", x: 0, y: 0.5, hidden: true}, 
                        {text: "In1", x: 0.5, y: 0, hidden: true}, {text: "Out1", x: 1, y: 0.5, hidden: true}]},

        { name:"triIncClk", type: "SoloTriState", text: "TRI", inputs: 1, input: true, width: 50, height: 25, y: -12.5, relative: {x: { name:"triIncEn"}, y: { name:"pcincAnd"}},
                ports: [{text: "En", x: 0, y: 0.5, hidden: true}, 
                        {text: "In1", x: 0.5, y: 0, hidden: true}, {text: "Out1", x: 1, y: 0.5, hidden: true}]},

        { name:"incrementEnable", type: "InlineText", text: "Increment Enable", x: 100, relative: {xy: { name:"triIncEn", io: "Out1"}}},
        { name:"programCounterClock", type: "InlineText", text: "Program Counter Clock", relative: {y: { name:"triIncClk", io: "Out1"}, x: { name:"incrementEnable"}}},

        { comment: "Instruction Fetch Logic"},

        { name:"fetchNode", type: "Node", relative: {y: { name:"fetchOr", io: "out"}, x: { name:"pcincNode"}}},
        { name:"triRamDo", type: "SoloTriState", text: "TRI", inputs: 1, input: true, width: 50, height: 25, y: -12.5, relative: {y: { name:"fetchNode"}, x: { name:"triIncEn"}},
                ports: [{text: "En", x: 0, y: 0.5, hidden: true}, 
                        {text: "In1", x: 0.5, y: 0, hidden: true}, {text: "Out1", x: 1, y: 0.5, hidden: true}]},

        { name:"ramDoEnable", type: "InlineText", text: "RAM Data Out Enable", relative: {x: { name:"incrementEnable"}, y: { name:"triRamDo", io: "Out1"}}},
        { name:"pcEnableJoint", type: "Joint", y: 30, relative: {xy: { name:"fetchNode"}}},
        { name:"programCounterEnable", type: "InlineText", text: "Program Counter Enable", relative: {y: { name:"pcEnableJoint"}, x: { name:"incrementEnable"}}},

        { name:"incdecAnd", type: "AndGate", scale: 0.33, y: -40, relative: {y: { name:"fetchNode"}, x: { name:"pcincAnd"}}},
        { name:"inst3ClkAnd", type: "AndGate", scale: 0.33, y: -60, relative: {xy: { name:"incdecAnd"}}},
        { name:"inst2ClkAnd", type: "AndGate", scale: 0.33, y: -110, relative: {xy: { name:"incdecAnd"}}},
        { name:"inst1ClkAnd", type: "AndGate", scale: 0.33, y: -160, relative: {xy: { name:"incdecAnd"}}},

        { name:"triIncDecClk", type: "SoloTriState", text: "TRI", inputs: 1, input: true, width: 50, height: 25, y: -12.5, relative: {y: { name:"incdecAnd"}, x: { name:"triIncEn"}},
                ports: [{text: "En", x: 0, y: 0.5, hidden: true}, 
                        {text: "In1", x: 0.5, y: 0, hidden: true}, {text: "Out1", x: 1, y: 0.5, hidden: true}]},

        { name:"instLatch1Clk", type: "InlineText", text: "Instruction Latch 1 Clock", relative: {y: { name:"inst1ClkAnd", io: "out"}, x: { name:"incrementEnable"}}},
        { name:"instLatch2Clk", type: "InlineText", text: "Instruction Latch 2 Clock", relative: {y: { name:"inst2ClkAnd", io: "out"}, x: { name:"incrementEnable"}}},
        { name:"instLatch3Clk", type: "InlineText", text: "Instruction Latch 3 Clock", relative: {y: { name:"inst3ClkAnd", io: "out"}, x: { name:"incrementEnable"}}},
        { name:"incdecClock", type: "InlineText", text: "Increment-Decrement Clock", relative: {y: { name:"incdecAnd", io: "out"}, x: { name:"incrementEnable"}}},
        { name:"incdecJoint", type: "Joint", relative: {x: { name:"fetchNode"}, y: { name:"incdecAnd", io: "B"}}},

        { name:"latch1Joint", type: "Joint", relative: {x: { name:"fetch1Node"}, y: { name:"inst1ClkAnd", io: "B"}}},
        { name:"latch2Joint", type: "Joint", relative: {x: { name:"fetch2Node"}, y: { name:"inst2ClkAnd", io: "B"}}},
        { name:"latch3Joint", type: "Joint", relative: {x: { name:"fetch3Node"}, y: { name:"inst3ClkAnd", io: "B"}}},

        { name:"pulseJoint", type: "Joint", relative: {x: { name:"epPulseNode"}, y: { name:"pulse"}}},
        { name:"pulseNode1", type: "Node", relative: {x: { name:"epPulseNode"}, y: { name:"inst1ClkAnd", io: "A"}}},
        { name:"pulseNode2", type: "Node", relative: {x: { name:"epPulseNode"}, y: { name:"inst2ClkAnd", io: "A"}}},
        { name:"pulseNode3", type: "Node", relative: {x: { name:"epPulseNode"}, y: { name:"inst3ClkAnd", io: "A"}}},
        { name:"pulseNode4", type: "Node", relative: {x: { name:"epPulseNode"}, y: { name:"incdecAnd", io: "A"}}},

        { comment: "Labels at bottom"},

        { name:"label370", type: "Label", text: "Cycle Decoding (page 370)", x: 175, y: 525, relative: {xy: { name:"decoder"}}},
        { name:"label367", type: "Label", text: "Fetch and Execute Determine (page 367)", x: -450, relative: {xy: { name:"label370"}}},
        { name:"label372", type: "Label", text: "Fetch and Program Counter Control Signals (pages 372 and 373)", x: 700, relative: {xy: { name:"label370"}}},
        { name:"label368", type: "Label", text: "Basic Timing (pages 368 and 373)", x: 250, relative: {xy: { name:"resetButton"}}},
    ],
    wires:
    [
        { comment: "Instruction Fetch Logic"},

        { points:[{ name:"pulse", io: "end"}, { name:"pulseJoint"}, { name:"pulseNode1"}]},
        { points:[{ name:"pulseNode1"}, { name:"inst1ClkAnd", io: "A", input: 0}]},
        { points:[{ name:"pulseNode1"}, { name:"pulseNode2"}]},
        { points:[{ name:"pulseNode2"}, { name:"inst2ClkAnd", io: "A", input: 0}]},
        { points:[{ name:"pulseNode2"}, { name:"pulseNode3"}]},
        { points:[{ name:"pulseNode3"}, { name:"inst3ClkAnd", io: "A", input: 0}]},
        { points:[{ name:"pulseNode3"}, { name:"pulseNode4"}]},
        { points:[{ name:"pulseNode4"}, { name:"incdecAnd", io: "A", input: 0}]},
        { points:[{ name:"pulseNode4"}, { name:"pcincPulseNode"}]},
        { points:[{ name:"pcincPulseNode"}, { name:"epPulseNode"}]},

        { points:[{ name:"inst1ClkAnd", io: "out"}, { name:"instLatch1Clk"}]},
        { points:[{ name:"inst2ClkAnd", io: "out"}, { name:"instLatch2Clk"}]},
        { points:[{ name:"inst3ClkAnd", io: "out"}, { name:"instLatch3Clk"}]},
        { points:[{ name:"incdecAnd", io: "out"}, { name:"triIncDecClk", io: "En", input: "enable"}]},
        { points:[{ name:"triIncDecClk", io: "Out1", output: 0}, { name:"incdecClock"}]},
        { points:[{ name:"fetchNode"}, { name:"incdecJoint"}, { name:"incdecAnd", io: "B", input: 1}]},

        { points:[{ name:"fetch1Node"}, { name:"latch1Joint"}, { name:"inst1ClkAnd", io: "B", input: 1}]},
        { points:[{ name:"fetch2Node"}, { name:"latch2Joint"}, { name:"inst2ClkAnd", io: "B", input: 1}]},
        { points:[{ name:"fetch3Node"}, { name:"latch3Joint"}, { name:"inst3ClkAnd", io: "B", input: 1}]},

        { points:[{ name:"fetchOr", io: "out"}, { name:"fetchNode"}]},
        { points:[{ name:"triRamDo", io: "Out1", output: 0}, { name:"ramDoEnable"}]},
        { points:[{ name:"fetchNode"}, { name:"triRamDo", io: "En", input: "enable"}]},
        { points:[{ name:"fetchNode"}, { name:"pcEnableJoint"}, { name:"programCounterEnable"}]},

        { comment: "Program Counter"},

        { points:[{ name:"pcinc", io: "end"}, { name:"pcincNode"}]},
        { points:[{ name:"pcincNode"}, { name:"pcincJoint"}, { name:"pcincAnd", io: "A", input: 0}]},
        { points:[{ name:"pcincPulseNode"}, { name:"pcincAnd", io: "B", input: 1}]},
        { points:[{ name:"pcincPulseNode"}, { name:"epPulseNode"}]},
        { points:[{ name:"pcincNode"}, { name:"triIncEn", io: "En", input: "enable"}]},
        { points:[{ name:"pcincAnd", io: "out"}, { name:"triIncClk", io: "En", input: "enable"}]},
        { points:[{ name:"triIncEn", io: "Out1", output: 0}, { name:"incrementEnable"}]},
        { points:[{ name:"triIncClk", io: "Out1", output: 0}, { name:"programCounterClock"}]},

        { comment: "Generation of Execute Pulse signals"},

        { points:[{ name:"execCycle1", io: "end"}, { name:"ep1Node"}]},
        { points:[{ name:"ep1Node"}, { name:"ep1Joint"}, { name:"ep1And", io: "A", input: 0}]},
        { points:[{ name:"execCycle2", io: "end"}, { name:"ep2Node"}]},
        { points:[{ name:"ep2Node"}, { name:"ep2Joint"}, { name:"ep2And", io: "B", input: 1}]},
        { points:[{ name:"epPulseNode"}, { name:"ep1And", io: "B", input: 1}]},
        { points:[{ name:"epPulseNode"}, { name:"epPulseJoint"}, { name:"ep2And", io: "A", input: 0}]},
        { points:[{ name:"ep1And", io: "out"}, { name:"execPulse1"}]},
        { points:[{ name:"ep2And", io: "out"}, { name:"execPulse2"}]},

        { points:[{ name:"ep1Node"}, { name:"ec1Joint1"}, { name:"ec1Joint2"}, { name:"EC1"}]},
        { points:[{ name:"execPulse1", io: "end"}, { name:"ep1Joint1"}, { name:"ep1Joint2"}, { name:"EP1"}]},
        { points:[{ name:"execPulse2", io: "end"}, { name:"ep2Joint1"}, { name:"ep2Joint2"}, { name:"EP2"}]},
        { points:[{ name:"ep2Node"}, { name:"ec2Joint1"}, { name:"ec2Joint2"}, { name:"EC2"}]},

        { comment: "Control signals on diode matrix tri-states"},

        { points:[{ name:"EC1", io: "end"}, { name:"8ec1Node"}]},
        { points:[{ name:"8ec1Node"}, { name:"8ec1Joint"}, { name:"triDataC1", io: "En", input: "enable"}]},
        { points:[{ name:"8ec1Node"}, { name:"aec1Joint1"}, { name:"aec1Joint2"}, { name:"triAddrC1", io: "En", input: "enable"}]},

        { points:[{ name:"EP1", io: "end"}, { name:"8ep1Node"}]},
        { points:[{ name:"8ep1Node"}, { name:"8ep1Joint"}, { name:"triDataP1", io: "En", input: "enable"}]},
        { points:[{ name:"8ep1Node"}, { name:"aep1Node1"}]},
        { points:[{ name:"aep1Node1"}, { name:"aep1Joint2"}, { name:"triAddrP1", io: "En", input: "enable"}]},

        { points:[{ name:"EC2", io: "end"}, { name:"8ec2Node"}]},
        { points:[{ name:"8ec2Node"}, { name:"8ec2Joint"}, { name:"triDataC2", io: "En", input: "enable"}]},
        { points:[{ name:"8ec2Node"}, { name:"aec2Joint1"}, { name:"aec2Joint2"}, { name:"triAddrC2", io: "En", input: "enable"}]},

        { points:[{ name:"EP2", io: "end"}, { name:"8ep2Node"}]},
        { points:[{ name:"8ep2Node"}, { name:"8ep2Joint"}, { name:"triDataP2", io: "En", input: "enable"}]},
        { points:[{ name:"8ep2Node"}, { name:"aep2Joint1"}, { name:"aep2Joint2"}, { name:"triAddrP2", io: "En", input: "enable"}]},

        { comment: "Final Decoding: Fetch Cycles" },

        { points:[{ name:"fetch1", io: "end"}, { name:"fetch1Node"}]},
        { points:[{ name:"fetch1Node"}, { name:"fetchOr", io: "1/3", input: 0}]},

        { points:[{ name:"fetch2", io: "end"}, { name:"fetch2Node"}]},
        { points:[{ name:"fetch2Node"}, { name:"fetchOr", io: "2/3", input: 1}]},

        { points:[{ name:"fetch3", io: "end"}, { name:"fetch3Node"}]},
        { points:[{ name:"fetch3Node"}, { name:"fetchOr", io: "3/3", input: 2}]},

        { comment: "Oscillator Timing"},

        { points:[{ name:"ffHalt", io: "Q|OL", output: "qbar"}, { name:"haltNode"}]},
        { points:[{ name:"haltNode"}, { name:"haltLoopJoint1"}, { name:"haltLoopJoint2"}, { name:"haltLoopJoint3"}, { name:"ffHalt", io: "D", input: "data"}]},
        { points:[{ name:"haltNode"}, { name:"haltLoopJoint4"}, { name:"oscAnd", io: "A", input: 0}]},

        { points:[{ name:"hiddenHaltNode"}, { name:"haltJoint1"}, { name:"haltJoint2"}, { name:"haltAnd", io: "B", input: 1}]},
        { points:[{ name:"aep1Node1"}, { name:"p1HaltJoint1"}, { name:"p1HaltJoint2"}, { name:"haltAnd", io: "A", input: 0}]},
        { points:[{ name:"haltAnd", io:"out"}, { name:"haltJoint3"}, { name:"haltJoint4"}, { name:"ffHalt", io: "Clk", input: "clk"}]},

        { points:[{ name:"ff1", io: "Q|OL", output: "qbar"}, { name:"ffLoopJoint1"}, { name:"ffLoopNode"}]},
        { points:[{ name:"ffLoopNode"}, { name:"ffLoopJoint2"}, { name:"ffLoopJoint3"}, { name:"ff1", io: "D", input: "data"}]},
        { points:[{ name:"ffLoopNode"}, { name:"pulseAndJoint1"}, { name:"pulseAndJoint2"}, { name:"pulseAnd", io: "B", input: 1}]},
        { points:[{ name:"ff2", io: "Q", output: "q"}, { name:"pulseAnd", io: "A", input: 0}]},
        { points:[{ name:"pulseAnd", io: "out"}, { name:"pulse"}]},

        { points:[{ name:"oscAnd", io: "out"}, { name:"oscInvNode"}]},

        { points:[{ name:"oscInvNode"}, { name:"ff1", io: "Clk", input: "clk"}]},
        { points:[{ name:"oscInvNode"}, { name:"oscInvJoint1"}, { name:"oscInv"}]},
        { points:[{ name:"oscInv", io: "out"}, { name:"oscInvJoint2"}, { name:"oscInvJoint3"}, { name:"ff2", io: "Clk", input: "clk"}]},

        { points:[{ name:"ff1", io: "Q", output: "q"}, { name:"cycleClkJoint1"}, { name:"cycleClkNode"}]},
        { points:[{ name:"cycleClkNode"}, { name:"ff2", io: "D", input: "data"}]},
        { points:[{ name:"cycleClkNode"}, { name:"cycleClkJoint2"}, { name:"counter", io: "Clk", input: "clk"}]},

        { points:[{ name:"clkButton", io: "top"}, { name:"clkJoint"}, { name:"oscAnd", io: "B", input: 1}]},

        { points:[{ name:"resetButton", io: "bottom"}, { name:"resetNode1"}]},
        { points:[{ name:"resetNode1"}, { name:"ffHalt", io: "Clear", input: "clr"}]},
        { points:[{ name:"resetNode1"}, { name:"resetNode2"}]},
        { points:[{ name:"resetNode2"}, { name:"ff1", io: "Preset", input: "pre"}]},
        { points:[{ name:"resetNode2"}, { name:"resetNode3"}]},
        { points:[{ name:"resetNode3"}, { name:"ff2", io: "Preset", input: "pre"}]},
        { points:[{ name:"resetNode3"}, { name:"resetOrJoint1"}, { name:"resetOrJoint2"}, { name:"mainResetOr", io: "B", input: 1}]},

        { comment: "From Chap23Fig15.json used for book illustration"},
    
        { points:[{ name:"resetOr2", io: "out"}, { name:"resetLoopJoint1"}, { name:"resetLoopJoint2"}, { name:"mainResetOr", io: "A", input: 0}]},
    
        { points: [{ name:"resetTriggerAnd1", io: "out"}, { name:"resetOr2", io: "A", input: 0}]},
        { points: [{ name:"resetTriggerAnd2", io: "out"}, { name:"resetOrJoint3"}, { name:"resetOrJoint4"}, { name:"resetOr2", io: "B", input: 1}]},
    
        { points:[{ name:"exec2And", io: "out"}, { name:"execCycle2"}]},
    
        { points:[{ name:"1CycleExec", io: "end"}, { name:"resetTriggerAnd1", io: "B", input: 1}]},

        { points:[{ name:"exec2Or", io: "out"}, { name:"exec2NodeB"}]},
        { points:[{ name:"exec2NodeB"}, { name:"exec2And", io: "A", input: 0}]},
        { points:[{ name:"exec2NodeB"}, { name:"exec2JointB"}, { name:"resetTriggerAnd1", io: "A", input: 0}]},
    
        { points:[{ name:"resetOr", io: "out"}, { name:"resetTriggerAnd2", io: "B", input: 1}]},

                      
        { points:[{ name:"2CycleExec", io: "end"}, { name:"exec2NodeA"}]},
        { points:[{ name:"exec2NodeA"}, { name:"exec2JointA1"}, { name:"exec2And", io: "B", input: 1}]},
        { points:[{ name:"exec2NodeA"}, { name:"exec2JointA2"}, { name:"resetTriggerAnd2", io: "A", input: 0}]},

        { points:[{ name:"1ByteFetchNot", io: "End"}, { name:"1ByteFetchNotNode"}]},
        { points:[{ name:"1ByteFetchNotNode"}, { name:"fetch2And", io: "B", input: 1}]},
        { points:[{ name:"1ByteFetchNotNode"}, { name:"1ByteFetchNotJoint2"}, { name:"pcIncAnd1", io: "B", input: 1}]},

        { points:[{ name:"exec1Or", io: "out"}, { name:"execCycle1", io: "0,0.5"}]},
    
        { points:[{ name:"1ByteFetch", io: "end"}, { name:"fetch1ByteNode1"}]},

        { points:[{ name:"fetch1ByteNode1"}, { name:"exec1And1", io: "B", input: 1}]},
        { points:[{ name:"fetch1ByteNode1"}, { name:"fetch1ByteNode2"}]},
        { points:[{ name:"fetch1ByteNode2"}, { name:"exec2And1", io: "B", input: 1}]},
        { points:[{ name:"fetch1ByteNode2"}, { name:"fetch1ByteJoint"}, { name:"resetAnd1", io: "B", input: 1}]},
    
        { points:[{ name:"2ByteFetch", io: "end"}, { name:"fetch2ByteJoint1"}, { name:"fetch2ByteNode2"}]},

        { points:[{ name:"fetch2ByteNode2"}, { name:"exec1And2", io: "B", input: 1}]},
        { points:[{ name:"fetch2ByteNode2"}, { name:"fetch2ByteNode3"}]},
        { points:[{ name:"fetch2ByteNode3"}, { name:"exec2And2", io: "B", input: 1}]},
        { points:[{ name:"fetch2ByteNode3"}, { name:"fetch2ByteJoint"}, { name:"resetAnd2", io: "B", input: 1}]},
    
        { points:[{ name:"3ByteFetch", io: "end"}, { name:"fetch3ByteNode3"}]},

        { points:[{ name:"fetch3ByteNode3"}, { name:"exec1And3", io: "B", input: 1}]},
        { points:[{ name:"fetch3ByteNode3"}, { name:"fetch3ByteNode4"}]},
        { points:[{ name:"fetch3ByteNode4"}, { name:"exec2And3", io: "B", input: 1}]},
        { points:[{ name:"fetch3ByteNode4"}, { name:"fetch3ByteJoint"}, { name:"resetAnd3", io: "B", input: 1}]},

        { points:[{ name:"fetch3ByteNode3"}, { name:"fetch3ByteNode2"}]},
        { points:[{ name:"fetch3ByteNode2"}, { name:"pcIncAnd2", io: "B", input: 1}]},
        { points:[{ name:"fetch3ByteNode2"}, { name:"fetch3ByteJoint1"}, { name:"fetch3And", io: "B", input: 1}]},

        { points:[{ name:"exec1And1", io: "out"}, { name:"exec1Joint1"}, { name:"exec1Joint2"}, { name:"exec1Or", io: "1/3"}]},
        { points:[{ name:"exec1And2", io: "out"}, { name:"exec1Or", io: "2/3"}]},
        { points:[{ name:"exec1And3", io: "out"}, { name:"exec1Joint3"}, { name:"exec1Joint4"}, { name:"exec1Or", io: "3/3"}]},
    
        { points:[{ name:"exec2And1", io: "out"}, { name:"exec2Joint1"}, { name:"exec2Joint2"}, { name:"exec2Or", io: "1/3"}]},
        { points:[{ name:"exec2And2", io: "out"}, { name:"exec2Or", io: "2/3"}]},
        { points:[{ name:"exec2And3", io: "out"}, { name:"exec2Joint3"}, { name:"exec2Joint4"}, { name:"exec2Or", io: "3/3"}]},
    
        { points:[{ name:"resetAnd1", io: "out"}, { name:"resetJoint1"}, { name:"resetJoint2"}, { name:"resetOr", io: "1/3"}]},
        { points:[{ name:"resetAnd2", io: "out"}, { name:"resetOr", io: "2/3"}]},
        { points:[{ name:"resetAnd3", io: "out"}, { name:"resetJoint3"}, { name:"resetJoint4"}, { name:"resetOr", io: "3/3"}]},
    
        { points:[{ name:"decoder", io: "2", output: 2}, { name:"dec2Node"}]},
        { points:[{ name:"dec2Node"}, { name:"fetch2And", io: "A", input: 0}]},
        { points:[{ name:"dec2Node"}, { name:"dec2Joint"}, { name:"exec1And1", io: "A", input: 0}]},
    
        { points:[{ name:"decoder", io: "3", output: 3}, { name:"dec3Node"}]},
        { points:[{ name:"dec3Node"}, { name:"pcIncAnd1", io: "A", input: 0}]},
        { points:[{ name:"dec3Node"}, { name:"dec3Joint"}, { name:"exec2And1", io: "A", input: 0}]},
    
        { points:[{ name:"decoder", io: "4", output: 4}, { name:"dec4Node1"}]},
        { points:[{ name:"dec4Node1"}, { name:"fetch3And", io: "A", input: 0}]},
        { points:[{ name:"dec4Node1"}, { name:"dec4Node2"}]},
        { points:[{ name:"dec4Node2"}, { name:"exec1And2", io: "A", input: 0}]},
        { points:[{ name:"dec4Node2"}, { name:"dec4Joint"}, { name:"resetAnd1", io: "A", input: 0}]},
    
        { points:[{ name:"decoder", io: "5", output: 5}, { name:"dec5Node"}]},
        { points:[{ name:"dec5Node"}, { name:"pcIncAnd2", io: "A", input: 0}]},
        { points:[{ name:"dec5Node"}, { name:"dec5Joint"}, { name:"exec2And2", io: "A", input: 0}]},
    
        { points:[{ name:"decoder", io: "6", output: 6}, { name:"dec6Node"}]},
        { points:[{ name:"dec6Node"}, { name:"exec1And3", io: "A", input: 0}]},
        { points:[{ name:"dec6Node"}, { name:"dec6Joint"}, { name:"resetAnd2", io: "A", input: 0}]},
    
        { points:[{ name:"decoder", io: "7", output: 7}, { name:"dec7Joint"}, { name:"exec2And3", io: "A", input: 0}]},
        { points:[{ name:"decoder", io: "8", output: 8}, { name:"dec8Joint"}, { name:"resetAnd3", io: "A", input: 0}]},
        { points: [{ name:"decoder", io: "0", output: 0}, { name:"fetch1Joint"}, { name:"fetch1"}]},
    
        { points: [{ name:"decoder", io: "1", output: 1}, { name:"pcinc1Joint"}, { name:"pcincOr", io: "2/3"}]},
        { points: [{ name:"fetch2And", io: "out"}, { name:"fetch2", io: "0,0.5"}]},
        { points: [{ name:"fetch3And", io: "out"}, { name:"fetch3", io: "0,0.5"}]},
        { points: [{ name:"pcincOr", io: "out"}, { name:"pcinc", io: "0,0.5"}]},

        { points:[{ name:"counter", io: "Q\u2083", output: 3}, { name:"decoder", io: "D\u2083", input: 3}]},
        { points:[{ name:"counter", io: "Q\u2082", output: 2}, { name:"decoder", io: "D\u2082", input: 2}]},
        { points:[{ name:"counter", io: "Q\u2081", output: 1}, { name:"decoder", io: "D\u2081", input: 1}]},
        { points:[{ name:"counter", io: "Q\u2080", output: 0}, { name:"decoder", io: "D\u2080", input: 0}]},

        { points:[{ name:"pcIncAnd1", io: "out"}, { name:"pcincJoint1"}, { name:"pcincJoint2"}, { name:"pcincOr", io: "1/3", input: 0}]},
        { points:[{ name:"pcIncAnd2", io: "out"}, { name:"pcincJoint3"}, { name:"pcincJoint4"}, { name:"pcincOr", io: "3/3", input: 2}]},
    
        { points:[{ name:"mainResetOr", io: "out"}, { name:"counter", io: "Clear", input: "clr"}]},

        { comment: "Cycle decoding stage 1 to inline labels"},
       
        { points: [{ name:"cycle1Or4Node", io: "out"}, { name:"1ByteFetchNotJoint"}, { name:"1ByteFetchNot"}]},
        { points: [{ name:"cycle1Inv2", io: "out"}, { name:"1ByteFetch"}]},
        { points: [{ name:"cycle1Or2Node", io: "out"}, { name:"3ByteFetch"}]},
        { points: [{ name:"cycle1Or3Node"}, { name:"cycle1Inv1Joint"}, { name:"2CycleExec"}]},
        { points: [{ name:"cycle1Inv1", io: "out"}, { name:"1CycleExec"}]},

        { comment: "cycle decode inlines to OR gates"},

        { points: [{ name:"mvirInline2", io: "end"}, { name:"cycle1Or1", io: "1/3", input: 0}]},
        { points: [{ name:"mvimInline2", io: "end"}, { name:"cycle1Or1", io: "2/3", input: 1}]},
        { points: [{ name:"adiInline2", io: "end"}, { name:"adiCycleNode"}]},
        { points: [{ name:"adiCycleNode"}, { name:"cycle1Or1", io: "3/3", input: 2}]},
        { points: [{ name:"adiCycleNode"}, { name:"adiCycleJoint"}, { name:"cycle1Or3", io: "1/3", input: 0}]},
        { points: [{ name:"ldaInline2", io: "end"}, { name:"cycle1Or2", io: "A", input: 0}]},
        { points: [{ name:"staInline2", io: "end"}, { name:"cycle1Or2", io: "B", input: 0}]},
        { points: [{ name:"addrInline2", io: "end"}, { name:"cycle1Or3", io: "2/3", input: 1}]},
        { points: [{ name:"addmInline2", io: "end"}, { name:"cycle1Or3", io: "3/3", input: 2}]},

        { points:[{ name:"cycle1Or3", io: "out"}, { name:"cycle1Or3Node"}]},
        { points:[{ name:"cycle1Or3Node"}, { name:"cycle1Inv1"}]},

        { points:[{ name:"cycle1Or4", io: "out"}, { name:"cycle1Or4Node"}]},
        { points:[{ name:"cycle1Or4Node"}, { name:"cycle1Inv2"}]},

        { points:[{ name:"cycle1Or1", io: "out"}, { name:"cycle1Or1Node"}]}, 
        { points:[{ name:"cycle1Or1Node"}, { name:"cycle1Or1Joint"}, { name:"cycle1Or4", io: "A", input: 0}]},
        { points:[{ name:"cycle1Or1Node"}, { name:"2ByteFetch"}]},
        { points:[{ name:"cycle1Or2", io: "out"}, { name:"cycle1Or2Node"}]},
        { points:[{ name:"cycle1Or2Node"}, { name:"cycle1Or2Joint"}, { name:"cycle1Or4", io: "B", input: 1}]},

        { comment: "decode nodes to cycle decode inlines"},

        { points:[{ name:"mvirNode"}, { name:"mvirJoint1"}, { name:"mvirJoint2"}, { name:"mvirJoint3"}, { name:"mvirInline2"}]},
        { points:[{ name:"mvimNode"}, { name:"mvimJoint1"}, { name:"mvimJoint2"}, { name:"mvimJoint3"}, { name:"mvimInline2"}]},
        { points:[{ name:"adiNode"}, { name:"adiJoint1"}, { name:"adiJoint2"}, { name:"adiJoint3"}, { name:"adiInline2"}]},
        { points:[{ name:"ldaNode"}, { name:"ldaJoint1"}, { name:"ldaJoint2"}, { name:"ldaJoint3"}, { name:"ldaInline2"}]},
        { points:[{ name:"staNode"}, { name:"staJoint1"}, { name:"staJoint2"}, { name:"staJoint3"}, { name:"staInline2"}]},
        { points:[{ name:"addrNode"}, { name:"addrJoint1"}, { name:"addrJoint2"}, { name:"addrJoint3"}, { name:"addrInline2"}]},
        { points:[{ name:"addmNode"}, { name:"addmJoint1"}, { name:"addmJoint2"}, { name:"addmJoint3"}, { name:"addmInline2"}]},

        { comment: "Simple tri-state outputs to text boxes" },

        { points:[{ name:"triAddrC1", io: "Out1", output: 0}, { name:"txtAC1-1", io: "0.1,1"}]},
        { points:[{ name:"triAddrC1", io: "Out2", output: 1}, { name:"txtAC1-2", io: "0.9,1"}]},

        { points:[{ name:"triAddrP1", io: "Out1", output: 0}, { name:"txtAP1", io: "0.5,1"}]},

        { points:[{ name:"triAddrC2", io: "Out1", output: 0}, { name:"txtAC2-1", io: "0.1,1"}]},
        { points:[{ name:"triAddrC2", io: "Out2", output: 1}, { name:"txtAC2-2", io: "0.5,1"}]},
        { points:[{ name:"triAddrC2", io: "Out3", output: 2}, { name:"txtAC2-3", io: "0.9,1"}]},

        { points:[{ name:"triAddrP2", io: "Out1", output: 0}, { name:"txtAP2", io: "0.5,1"}]},

        { points:[{ name:"triDataC1", io: "Out1", output: 0}, { name:"txtDC1-1", io: "0.1,1"}]},
        { points:[{ name:"triDataC1", io: "Out2", output: 1}, { name:"txtDC1-2", io: "0.367,1"}]},
        { points:[{ name:"triDataC1", io: "Out3", output: 2}, { name:"txtDC1-3", io: "0.633,1"}]},
        { points:[{ name:"triDataC1", io: "Out4", output: 3}, { name:"txtDC1-4", io: "0.9,1"}]},

        { points:[{ name:"triDataP1", io: "Out1", output: 0}, { name:"txtDP1-1", io: "0.1,1"}]},
        { points:[{ name:"triDataP1", io: "Out2", output: 1}, { name:"txtDP1-2", io: "0.367,1"}]},
        { points:[{ name:"triDataP1", io: "Out3", output: 2}, { name:"txtDP1-3", io: "0.633,1"}]},
        { points:[{ name:"triDataP1", io: "Out4", output: 3}, { name:"txtDP1-4", io: "0.9,1"}]},

        { points:[{ name:"triDataC2", io: "Out1", output: 0}, { name:"txtDC2", io: "0.5,1"}]},

        { points:[{ name:"triDataP2", io: "Out1", output: 0}, { name:"txtDP2", io: "0.5,1"}]},

        { comment: "Diode array output to simple tri-state inputs"},

        { points:[{ name:"diodes", io: "out0", output: 0}, { name:"triAddrC1", io: "In1", input: 0}]},
        { points:[{ name:"diodes", io: "out1", output: 1}, { name:"triAddrC1", io: "In2", input: 1}]},

        { points:[{ name:"diodes", io: "out2", output: 2}, { name:"triAddrP1", io: "In1", input: 0}]},

        { points:[{ name:"diodes", io: "out3", output: 3}, { name:"triAddrC2", io: "In1", input: 0}]},
        { points:[{ name:"diodes", io: "out4", output: 4}, { name:"triAddrC2", io: "In2", input: 1}]},
        { points:[{ name:"diodes", io: "out5", output: 5}, { name:"triAddrC2", io: "In3", input: 2}]},

        { points:[{ name:"diodes", io: "out6", output: 6}, { name:"triAddrP2", io: "In1", input: 0}]},

        { points:[{ name:"diodes", io: "out7", output: 7}, { name:"triDataC1", io: "In1", input: 0}]},
        { points:[{ name:"diodes", io: "out8", output: 8}, { name:"triDataC1", io: "In2", input: 1}]},
        { points:[{ name:"diodes", io: "out9", output: 9}, { name:"triDataC1", io: "In3", input: 2}]},
        { points:[{ name:"diodes", io: "out10", output: 10}, { name:"triDataC1", io: "In4", input: 3}]},

        { points:[{ name:"diodes", io: "out11", output: 11}, { name:"triDataP1", io: "In1", input: 0}]},
        { points:[{ name:"diodes", io: "out12", output: 12}, { name:"triDataP1", io: "In2", input: 1}]},
        { points:[{ name:"diodes", io: "out13", output: 13}, { name:"triDataP1", io: "In3", input: 2}]},
        { points:[{ name:"diodes", io: "out14", output: 14}, { name:"triDataP1", io: "In4", input: 3}]},

        { points:[{ name:"diodes", io: "out15", output: 15}, { name:"triDataC2", io: "In1", input: 0}]},

        { points:[{ name:"diodes", io: "out16", output: 16}, { name:"triDataP2", io: "In1", input: 0}]},

        { comment: "Inline texts to diode array"},

        { points:[{ name:"movrrInline", io: "end"}, { name:"diodes", io: "row0", input: 0}]},
        { points:[{ name:"movrmInline", io: "end"}, { name:"diodes", io: "row1", input: 1}]},
        { points:[{ name:"movmrInline", io: "end"}, { name:"diodes", io: "row2", input: 2}]},
        { points:[{ name:"mvirInline", io: "end"}, { name:"diodes", io: "row3", input: 3}]},
        { points:[{ name:"mvimInline", io: "end"}, { name:"diodes", io: "row4", input: 4}]},
        { points:[{ name:"addrInline", io: "end"}, { name:"diodes", io: "row5", input: 5}]},
        { points:[{ name:"addmInline", io: "end"}, { name:"diodes", io: "row6", input: 6}]},
        { points:[{ name:"adiInline", io: "end"}, { name:"diodes", io: "row7", input: 7}]},
        { points:[{ name:"inxInline", io: "end"}, { name:"diodes", io: "row8", input: 8}]},
        { points:[{ name:"dcxInline", io: "end"}, { name:"diodes", io: "row9", input: 9}]},
        { points:[{ name:"ldaInline", io: "end"}, { name:"diodes", io: "row10", input: 10}]},
        { points:[{ name:"staInline", io: "end"}, { name:"diodes", io: "row11", input: 11}]},

        { hidden: true, points: [{ name:"hltInline", io: "end"}, { name:"hiddenHaltNode"}]},
        { hidden: true, points: [{ name:"hiddenHaltNode"}, { name:"diodes", input: -1}]},

        { comment: "AND gates to nodes and inline texts"},

        { points:[{ name:"movrrAnd", io: "out"}, { name:"movrrInline"}]},
        { points:[{ name:"movrmAnd", io: "out"}, { name:"movrmInline"}]},
        { points:[{ name:"movmrAnd", io: "out"}, { name:"movmrInline"}]},
        { points:[{ name:"mvirAnd", io: "out"}, { name:"mvirNode"}]},
        { points:[{ name:"mvirNode"}, { name:"mvirInline"}]},
        { points:[{ name:"mvimAnd", io: "out"}, { name:"mvimNode"}]},
        { points:[{ name:"mvimNode"}, { name:"mvimInline"}]},
        { points:[{ name:"addrAnd", io: "out"}, { name:"addrNode"}]},
        { points:[{ name:"addrNode"}, { name:"addrInline"}]},
        { points:[{ name:"addmAnd", io: "out"}, { name:"addmNode"}]},
        { points:[{ name:"addmNode"}, { name:"addmInline"}]},
        { points:[{ name:"adiAnd", io: "out"}, { name:"adiNode"}]},
        { points:[{ name:"adiNode"}, { name:"adiInline"}]},
        { points:[{ name:"inxAnd", io: "out"}, { name:"inxInline"}]},
        { points:[{ name:"dcxAnd", io: "out"}, { name:"dcxInline"}]},
        { points:[{ name:"ldaAnd", io: "out"}, { name:"ldaNode"}]},
        { points:[{ name:"ldaNode"}, { name:"ldaInline"}]},
        { points:[{ name:"staAnd", io: "out"}, { name:"staNode"}]},
        { points:[{ name:"staNode"}, { name:"staInline"}]},
        { points:[{ name:"hltAnd", io: "out"}, { name:"hltInline"}]},

        { comment: "decoders to AND gates"},

        { points:[{ name:"hiDecode", io: "0", output: 0}, { name:"hidec0Node1"}]},
        { points:[{ name:"hidec0Node1"}, { name:"mvirAnd", io: "2/3", input: 1}]},
        { points:[{ name:"hidec0Node1"}, { name:"hidec0Node2"}]},
        { points:[{ name:"hidec0Node2"}, { name:"mvimAnd", io: "2/3", input: 1}]},
        { points:[{ name:"hidec0Node2"}, { name:"hidec0Node3"}]},
        { points:[{ name:"hidec0Node3"}, { name:"inxAnd", io: "3/3", input: 2}]},
        { points:[{ name:"hidec0Node3"}, { name:"hidec0Node4"}]},
        { points:[{ name:"hidec0Node4"}, { name:"dcxAnd", io: "3/3", input: 2}]},
        { points:[{ name:"hidec0Node4"}, { name:"hidec0Node5"}]},
        { points:[{ name:"hidec0Node5"}, { name:"ldaAnd", io: "3/3", input: 2}]},
        { points:[{ name:"hidec0Node5"}, { name:"hidec0Joint"}, { name:"staAnd", io: "3/3", input: 2}]},

        { points:[{ name:"hiDecode", io: "1", output: 1}, { name:"hidec1Joint0"}, { name:"hidec1Node1"}]},
        { points:[{ name:"hidec1Node1"}, { name:"movrrAnd", io: "1/3", input: 0}]},
        { points:[{ name:"hidec1Node1"}, { name:"hidec1Node2"}]},
        { points:[{ name:"hidec1Node2"}, { name:"movrmAnd", io: "1/3", input: 0}]},
        { points:[{ name:"hidec1Node2"}, { name:"hidec1Node3"}]},
        { points:[{ name:"hidec1Node3"}, { name:"movmrAnd", io: "1/3", input: 0}]},
        { points:[{ name:"hidec1Node3"}, { name:"hidec1Joint"}, { name:"hltAnd", io: "1/3", input: 0}]},

        { points:[{ name:"hiDecode", io: "2", output: 2}, { name:"hidec2Node"}]},
        { points:[{ name:"hidec2Node"}, { name:"addrAnd", io: "A", input: 0}]},
        { points:[{ name:"hidec2Node"}, { name:"hidec2Joint"}, { name:"addmAnd", io: "A", input: 0}]},

        { points:[{ name:"hiDecode", io: "3", output: 3}, { name:"hidec3Joint"}, { name:"adiAnd", io: "B", input: 1}]},

        { points:[{ name:"loDecode", io: "2", output: 2}, { name:"lodec2Node"}]},
        { points:[{ name:"lodec2Node"}, { name:"ldaAnd", io: "1/3", input: 0}]},
        { points:[{ name:"lodec2Node"}, { name:"lodec2Joint"}, { name:"staAnd", io: "1/3", input: 0}]},

        { points:[{ name:"loDecode", io: "3", output: 3}, { name:"lodec3Node"}]},
        { points:[{ name:"lodec3Node"}, { name:"inxAnd", io: "1/3", input: 0}]},
        { points:[{ name:"lodec3Node"}, { name:"lodec3Joint"}, { name:"dcxAnd", io: "1/3", input: 0}]},

        { points:[{ name:"loDecode", io: "6", output: 6}, { name:"lodec6Node1"}]},
        { points:[{ name:"lodec6Node1"}, { name:"lodec6Node2"}]},
        { points:[{ name:"lodec6Node1"}, { name:"memsrcNode"}]},

        { points:[{ name:"lodec6Node2"}, { name:"mvirAnd", io: "1/3", input: 0}]},
        { points:[{ name:"lodec6Node2"}, { name:"lodec6Node3"}]},
        { points:[{ name:"lodec6Node3"}, { name:"mvimAnd", io: "1/3", input: 0}]},
        { points:[{ name:"lodec6Node3"}, { name:"lodec6Joint"}, { name:"adiAnd", io: "A", input: 0}]},

        { points:[{ name:"miDecode", io: "4", output: 4}, { name:"midec4Joint"}, { name:"inxAnd", io: "2/3", input: 1}]},
        { points:[{ name:"miDecode", io: "5", output: 5}, { name:"midec5Joint"}, { name:"dcxAnd", io: "2/3", input: 1}]},
        { points:[{ name:"miDecode", io: "6", output: 6}, { name:"midec6Node"}]},
        { points:[{ name:"midec6Node"}, { name:"midec6Joint"}, { name:"staAnd", io: "2/3", input: 1}]},
        { points:[{ name:"miDecode", io: "7", output: 7}, { name:"midec7Joint"}, { name:"ldaAnd", io: "2/3", input: 1}]},

        { points:[{ name:"midec6Node"}, { name:"memdstNode"}]},
        { points:[{ name:"memdstNode"}, { name:"memdstNode1"}]},
        { points:[{ name:"memdstNode1"}, { name:"movmrAnd", io: "3/3", input: 2}]},
        { points:[{ name:"memdstNode1"}, { name:"memdstNode2"}]},
        { points:[{ name:"memdstNode2"}, { name:"mvimAnd", io: "3/3", input: 2}]},
        { points:[{ name:"memdstNode2"}, { name:"memdstJoint"}, { name:"hltAnd", io: "3/3", input: 2}]},

        { points:[{ name:"memsrcNode"}, { name:"memsrcNode1"}]},
        { points:[{ name:"memsrcNode1"}, { name:"movrmAnd", io: "2/3", input: 1}]},
        { points:[{ name:"memsrcNode1"}, { name:"memsrcNode2"}]},
        { points:[{ name:"memsrcNode2"}, { name:"addmAnd", io: "B", input: 1}]},
        { points:[{ name:"memsrcNode2"}, { name:"memsrcJoint"}, { name:"hltAnd", io: "2/3", input: 1}]},

        { points:[{ name:"memsrcNode"}, { name:"memsrcinvJoint"}, { name:"memsrcInv"}]},
        { points:[{ name:"memsrcInv", io: "out"}, { name:"memsrcinvNode0"}]},
        { points:[{ name:"memsrcinvNode0"}, { name:"memsrcinvJoint1"}, { name:"movrrAnd", io: "2/3", input: 1}]},
        { points:[{ name:"memsrcinvNode0"}, { name:"memsrcinvNode1"}]},
        { points:[{ name:"memsrcinvNode1"}, { name:"movmrAnd", io: "2/3", input: 1}]}, 
        { points:[{ name:"memsrcinvNode1"}, { name:"memsrcinvJoint2"}, { name:"addrAnd", io: "B", input: 1}]},

        { points:[{ name:"memdstNode"}, { name:"memdstinvJoint"}, { name:"memdstInv"}]},
        { points:[{ name:"memdstInv", io: "out"}, { name:"memdstinvNode0"}]},
        { points:[{ name:"memdstinvNode0"}, { name:"memdstinvJoint1"}, { name:"movrrAnd", io: "3/3", input: 2}]},
        { points:[{ name:"memdstinvNode0"}, { name:"memdstinvNode1"}]},
        { points:[{ name:"memdstinvNode1"}, { name:"movrmAnd", io: "3/3", input: 2}]}, 
        { points:[{ name:"memdstinvNode1"}, { name:"memdstinvJoint2"}, { name:"mvirAnd", io: "3/3", input: 2}]},

        { comment: "opcode spinner to decoders"},

        { points:[{ name:"opcodeSpinner", io: 7, output: 7}, { name:"opJoint71"}, { name:"opJoint72"}, { name:"hiDecode", io: "S\u2081", input: 1}]},
        { points:[{ name:"opcodeSpinner", io: 6, output: 6}, { name:"opJoint61"}, { name:"opJoint62"}, { name:"hiDecode", io: "S\u2080", input: 0}]},
        { points:[{ name:"opcodeSpinner", io: 5, output: 5}, { name:"opJoint51"}, { name:"opJoint52"}, { name:"miDecode", io: "S\u2082", input: 2}]},
        { points:[{ name:"opcodeSpinner", io: 4, output: 4}, { name:"opJoint41"}, { name:"opJoint42"}, { name:"miDecode", io: "S\u2081", input: 1}]},
        { points:[{ name:"opcodeSpinner", io: 3, output: 3}, { name:"opJoint31"}, { name:"opJoint32"}, { name:"miDecode", io: "S\u2080", input: 0}]},
        { points:[{ name:"opcodeSpinner", io: 2, output: 2}, { name:"opJoint21"}, { name:"opJoint22"}, { name:"loDecode", io: "S\u2082", input: 2}]},
        { points:[{ name:"opcodeSpinner", io: 1, output: 1}, { name:"opJoint11"}, { name:"opJoint12"}, { name:"loDecode", io: "S\u2081", input: 1}]},
        { points:[{ name:"opcodeSpinner", io: 0, output: 0}, { name:"opJoint01"}, { name:"opJoint02"}, { name:"loDecode", io: "S\u2080", input: 0}]},
   ]
}