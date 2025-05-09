// Chapter23CPUCommon (c) Charles Petzold, 2024
// ©️自权的SPACE 2025 汉化
let Chapter23CPUCommon = 
{
    name: "Chapter23CPUCommon",
    
    components:
    [
        { name:"memory", type: "Memory", 

                // Used only if cpuAltMemory is set to true
                radioLabels: ["Page 380", "Pages 383–384", "Pages 384–385", "Page 386"],
        
                width: 200, height: 1150, x: 0, y:0,
                ports: [{text: "Address", y: 725}, {text: "DO", y: 100}, {text: "DI", y: 1050}, {text: "Write", y: 765}, {text: "Enable", y: 685}],
                triStates: [{ name:"do", group: "data"}],

                initialize: [0x3E, 0x88, 0xC6, 0xC4,  // program on page 318
                             0x32, 0x10, 0x00, 0x3E,
                             0x13, 0xCE, 0x09, 0x32,
                             0x11, 0x00, 0x76, 0x00],

                // Used only if cpuAltMemory is set to true
                initializeAlt: 
                [
                               [0x2E, 0x20, 0x26, 0x00,  // program on pages 380 (but with HL = 0020h)
                                0x7E, 0x23, 0x86, 0x23,
                                0x86, 0x23, 0x86, 0x23,
                                0x86, 0x23, 0x86, 0x32,
                                0x13, 0x00, 0x76, 0x00,
                                0x00, 0x00, 0x00, 0x00,
                                0x00, 0x00, 0x00, 0x00,
                                0x00, 0x00, 0x00, 0x00,
                                0x0A, 0x14, 0x1E, 0x28,  // hex equivalents of 10, 20, 30, 40, 50, 60
                                0x32, 0x3C],

                               [0x2E, 0x20, 0x26, 0x00,  // program on pages 383-384 (but with HL = 0020h, c = 06h)
                                0x0E, 0x06, 0x46, 0x79,
                                0xD6, 0x01, 0xCA, 0x15,
                                0x00, 0x4F, 0x23, 0x78,
                                0x86, 0x47, 0xC3, 0x07,
                                0x00, 0x78, 0x32, 0x1A,
                                0x00, 0x76, 0x00, 0x00,
                                0x00, 0x00, 0x00, 0x00,
                                0x0A, 0x14, 0x1E, 0x28,  // hex equivalents of 10, 20, 30, 40, 50, 60
                                0x32, 0x3C],

                               [0x2E, 0x20, 0x26, 0x00,  // program on pages 384-385 (but with HL = 0020h, c = 05h)
                                0x0E, 0x05, 0x46, 0x23,
                                0x78, 0x86, 0x47, 0x79,
                                0xD6, 0x01, 0x4F, 0xC2,
                                0x07, 0x00, 0x78, 0x32,
                                0x17, 0x00, 0x76, 0x00,
                                0x00, 0x00, 0x00, 0x00,
                                0x00, 0x00, 0x00, 0x00,
                                0x0A, 0x14, 0x1E, 0x28,  // hex equivalents of 10, 20, 30, 40, 50, 60
                                0x32, 0x3C],

                               [0x2E, 0x20, 0x26, 0x00,  // program on pages 386 (but with HL = 0020h)
                                0x06, 0x00, 0x7E, 0xFE,
                                0x00, 0xCA, 0x12, 0x00,
                                0x80, 0x47, 0x23, 0xC3,
                                0x06, 0x00, 0x78, 0x32,
                                0x17, 0x00, 0x76, 0x00,
                                0x00, 0x00, 0x00, 0x00,
                                0x00, 0x00, 0x00, 0x00,
                                0x0A, 0x14, 0x1E, 0x28,  // hex equivalents of 10, 20, 30, 40, 50, 60
                                0x32, 0x3C]
                ]
        },

        { name:"instDecoder", type: "InstructionDecoder", width: 350, height: 750, x: 925, y: 150, relative: {xy: { name:"memory"}},
                labels: [{text: "Instruction Decoder", x: 0.4, y: 0.425},
                         {text: "Cycle: {0:S}", x: 0.4, y: 0.475},
                         {text: "Opcode: {1:X2}h ({2:S})", x: 0.4, y: 0.525}],
                ports: 
                [
                        {text: "Clock", x: 0.5, y: 0}, {text: "Reset", x: 0.75, y: 0},
                        {text: "RAM Enable", x: 0, y: 0.7133}, {text: "RAM Write", x: 0, y: 0.82},

                        {text: "Latch 1 Clock", x: 0, y: 0.0267}, {text: "Latch 2 Clock", x: 0, y: 0.0667}, {text: "Latch 3 Clock", x: 0, y: 0.1067},
                        {text: "Latch 2 Enable", x: 0, y: 0.1467}, {text: "Latch 2 & 3 Enable", x: 0, y: 0.1867},
                        {text: "Opcode In", x: 0, y: 0.24},
        
                        {text: "S\u2082", x: 1, y: 0.0533}, {text: "S\u2081", x: 1, y: 0.08}, {text: "S\u2080", x: 1, y: 0.1067},
                        {text: "D\u2082", x: 1, y: 0.16}, {text: "D\u2081", x: 1, y: 0.1867}, {text: "D\u2080", x: 1, y: 0.2133},
                        {text: "RA Clock", x: 1, y: 0.2933}, {text: "RA Enable", x: 1, y: 0.32}, {text: "Accumulator Clock", x: 1, y: 0.3467}, {text: "Accumulator Enable", x: 1, y: 0.3733},
                        {text: "HL Select", x: 1, y: 0.4267}, {text: "HL Clock", x: 1, y: 0.4533}, {text: "HL Enable", x: 1, y: 0.48},

                        {text: "F\u2082", x: 1, y: 0.76}, {text: "F\u2081", x: 1, y: 0.7867}, {text: "F\u2080", x: 1, y: 0.8133},
                        {text: "ALU Clock", x: 1, y: 0.8533}, {text: "ALU Enable", x: 1, y: 0.88}, 

                        // Only for enhanced version
                        {text: "CY Flag", x: 1, y: 0.92}, {text: "Z Flag", x: 1, y: 0.9467}, {text: "S Flag", x: 1, y: 0.9733},

                        {text: "PC Clock", x: 0, y: 0.5667}, {text: "PC Enable", x: 0, y: 0.6}, {text: "PC Reset", x: 0, y: 0.6333},

                        {text: "Increment-Decrement Clock", x: 0, y: 0.9}, {text: "Increment Enable", x: 0, y: 0.9333}, {text: "Decrement Enable", x: 0, y: 0.9667}
                ]},

        { name:"instLatch", type: "InstructionLatches", width: 500, height: 200, x: -575, relative: {xy: { name:"instDecoder"}},
                labels: [{text: "Instruction Latches", x: 0.5, y: 0.25},
                        {text: "Latch 1 = {0:X2}h", x: 0.5, y: 0.40}, {text: "Latch 2 = {1:X2}h", x: 0.5, y: 0.55}, {text: "Latch 3 = {2:X2}h", x: 0.5, y: 0.7}],
                ports: [{text: "In", x: 0.5, y: 0}, 
                        {text: "Latch 1 Clock", x: 1, y: 0.1}, {text: "Latch 2 Clock", x: 1, y: 0.25}, {text: "Latch 3 Clock", x: 1, y: 0.4},
                        {text: "Latch 2 Enable", x: 1, y: 0.55}, {text: "Latch 2 & 3 Enable", x: 1, y: 0.7},
                        {text: "Latch 1 Out", x: 1, y: 0.9}, {text: "Latch 2 Out", x: 0.25, y: 1}, {text: "Latches 2 & 3 Out", x: 0.5, y: 1}]
                        ,
                triStates: [{ name:"l2out", group: "data"}, { name:"l23out", group: "addr"}]
        
        },

        { name:"regArray", type: "RegisterArray", width: 500, height: 400, x: 425, relative: {xy: { name:"instDecoder"}},
                labels: [{text: "Register Array", x: 0.5, y: 0.45},
                         {text: "A = {7:X2}h", x: 0.5, y: 0.55},
                         {text: "B = {0:X2}h", x: 0.5, y: 0.6},
                         {text: "C = {1:X2}h", x: 0.5, y: 0.65},
                         {text: "D = {2:X2}h", x: 0.5, y: 0.7},
                         {text: "E = {3:X2}h", x: 0.5, y: 0.75},
                         {text: "H = {4:X2}h", x: 0.5, y: 0.8},
                         {text: "L = {5:X2}h", x: 0.5, y: 0.85},
                         {text: "Source = {8:S}", x: 0.16, y: 0.15}, {text: "Destination = {9:S}", x: 0.20, y: 0.35},],
                ports: [{text: "In", x: 0.5, y: 0}, {text: "In 16", x: 1, y: 0.25}, 
                        {text: "Accumulator", x: 0.33, y: 1}, {text: "Out", x: 0.67, y: 1}, {text: "Out 16", x: 1, y: 0.75},
                        {text: "S\u2082", x: 0, y: 0.1}, {text: "S\u2081", x: 0, y: 0.15}, {text: "S\u2080", x: 0, y: 0.2},
                        {text: "D\u2082", x: 0, y: 0.3}, {text: "D\u2081", x: 0, y: 0.35}, {text: "D\u2080", x: 0, y: 0.4},
                        {text: "RA Clock", x: 0, y: 0.55}, {text: "RA Enable", x: 0, y: 0.6}, {text: "Accumulator Clock", x: 0, y: 0.65}, {text: "Accumulator Enable", x: 0, y: 0.7},
                        {text: "HL Select", x: 0, y: 0.8}, {text: "HL Clock", x: 0, y: 0.85}, {text: "HL Enable", x: 0, y: 0.9}] ,
                triStates: [{ name:"out", group: "data"}, { name:"out16", group: "addr"}]
        
        },

        { name:"alu", type: "ArithmeticLogicUnit", width: 500, height: 200, y: 550, relative: {xy: { name:"regArray"}},
                labels: [{text: "Arithmetic Logic Unit", x: 0.5, y: 0.40}, {text: "Function = {0:S}", x: 0.20, y: 0.2},
                         {text: "Result: {1:X2}", x: 0.5, y: 0.55}],
                ports: [{text: "A", x: 0.33, y: 0}, {text: "B", x: 0.67, y: 0}, {text: "Out", x: 0.5, y: 1}, 
                        {text: "F\u2082", x: 0, y: 0.1}, {text: "F\u2081", x: 0, y: 0.2}, {text: "F\u2080", x: 0, y: 0.3},
                        {text: "Clock", x: 0, y: 0.45}, {text: "Enable", x: 0, y: 0.55}, 

                        // Only for enhanced version
                        {text: "CY Flag", x: 0, y: 0.7}, {text: "Z Flag", x: 0, y: 0.8}, {text: "S Flag", x: 0, y: 0.9}] ,
                
                triStates: [{ name:"out", group: "data"}]
        },

        { name:"progCounter", type: "ProgramCounter", width: 500, height: 100, y: 400, relative: {xy: { name:"instLatch"}},
                ports: [{text: "In", x: 0.5, y: 0}, {text: "Out", x: 0.5, y: 1},
                        {text: "Clock", x: 1, y: 0.25}, {text: "Enable", x: 1, y: 0.5}, {text: "Reset", x: 1, y: 0.75}],
                labels: [{text: "Program Counter", x: 0.5, y: 0.35},
                         {text: "Value = {0:X4}h", x: 0.5, y: 0.65}],
                triStates: [{ name:"output", group: "addr"}]},


        { name:"incDec", type: "IncrementerDecrementer", width: 500, height: 100, y: 250, relative: {xy: { name:"progCounter"}},
                ports: [{text: "In", x: 0.5, y: 0}, {text: "Out", x: 0.5, y: 1},
                        {text: "Clock", x: 1, y: 0.25}, {text: "Increment Enable", x: 1, y: 0.5}, {text: "Decrement Enable", x: 1, y: 0.75}],
                labels: [{text: "Incrementer-Decrementer", x: 0.5, y: 0.35},
                         {text: "Latched Value = {0:X4}h", x: 0.5, y: 0.65}],
                triStates: [{ name:"output", group: "addr"}]},

        { name:"clockButton", type: "MomentaryButton", y: -150, relative: {xy: { name:"instDecoder", io: "Clock"}}},
        { name:"resetButton", type: "MomentaryButton", x: 200, relative: {xy: { name:"clockButton"}}},
        { name:"resetJoint1", type: "Joint", y: 25, relative: {xy: { name:"resetButton", io: "bottom"}}},
        { name:"resetJoint2", type: "Joint", relative: {y: { name:"resetJoint1"}, x: { name:"instDecoder", io: "Reset"}}},

        { name:"reset", type: "Label", text: "Reset", y: -50, relative: {xy: { name:"resetButton"}}},
        { name:"clock", type: "Label", text: "Clock", relative: {x: { name:"clockButton"}, y: { name:"reset"}}},

        { comment: "Data Bus Nodes"},
        
        { name:"dataBusNode1", type: "DataPathNode", top: true, x: 75, relative: {xy: { name:"memory", io: "DO"}}},
        { name:"dataBusNode2", type: "DataPathNode", top: true, relative: {y: { name:"dataBusNode1"}, x: { name:"instLatch", io: "In"}}},
        { name:"dataBusNode4", type: "DataPathNode", right: true, bottom: true, y: 50, relative: {xy: { name:"instLatch", io: "Latch 2 Out"}}},
        { name:"dataBusNode3", type: "DataPathNode", left: true, bottom: true, relative: {x: { name:"dataBusNode1"}, y: { name:"dataBusNode4"}}},
        { name:"dataBusNode5", type: "DataPathNode", top: true, relative: {y: { name:"dataBusNode2"}, x: { name:"regArray", io: "In"}}},
        { name:"dataBusNode6", type: "DataPathNode", top: true, right: true, x: 650, relative: {x: { name:"regArray"}, y: { name:"dataBusNode5"}}},
        { name:"dataBusNode8", type: "DataPathNode", left: true, y: 75, relative: {xy: { name:"regArray", io: "Out"}}},
        { name:"dataBusNode7", type: "DataPathNode", right: true, relative: {x: { name:"dataBusNode6"}, y: { name:"dataBusNode8"}}},
        { name:"dataBusNode10", type: "DataPathNode", bottom: true, relative: {x: { name:"alu", io: "Out"}, y: { name:"memory", io: "DI"}}},
        { name:"dataBusNode9", type: "DataPathNode", bottom: true, right: true, relative: {x: { name:"dataBusNode7"}, y: { name:"dataBusNode10"}}},

        { comment: "Address Bus Node"},

        { name:"addrBusNode1", type: "DataPathNode16", top: true, right: true, x: 75, relative: {xy: { name:"regArray", io: "In 16"}}},
        { name:"addrBusNode2", type: "DataPathNode16", right: true, relative: {x: { name:"addrBusNode1"}, y: { name:"regArray", io: "Out 16"}}},
        { name:"addrBusNode4", type: "DataPathNode16", bottom: true, y: 75, relative: {xy: { name:"incDec", io: "Out"}}},
        { name:"addrBusNode3", type: "DataPathNode16", right: true, bottom: true, relative: {x: { name:"addrBusNode2"}, y: { name:"addrBusNode4"}}},
        { name:"addrBusNode5", type: "DataPathNode16", left: true, bottom: true, x: -75, relative: {x: { name:"incDec"}, y: { name:"addrBusNode4"}}},
        { name:"addrBusNode6", type: "DataPathNode16", right: true, y: 75, relative: {xy: { name:"progCounter", io: "Out"}}},
        { name:"addrBusNode7", type: "DataPathNode16", relative: {x: { name:"addrBusNode5"}, y: { name:"addrBusNode6"}}},
        { name:"addrBusNode8", type: "DataPathNode16", right: true, y: -75, relative: {xy: { name:"progCounter", io: "In"}}},
        { name:"addrBusNode9", type: "DataPathNode16", top: true, left: true, relative: {x: { name:"addrBusNode7"}, y: { name:"addrBusNode8"}}},

    ],
    wires:
    [
        
        { points:[{ name:"clockButton", io: "bottom"}, { name:"instDecoder", io: "Clock", input: "clock"}], arrow: "end"},
        { points:[{ name:"resetButton", io: "bottom"}, { name:"resetJoint1"}, { name:"resetJoint2"}, { name:"instDecoder", io: "Reset", input: "reset"}], arrow: "end"},

        { comment: "From Instruction Decoder to RAM"},

        { points:[{ name:"instDecoder", io: "RAM Write", output: "ramwr"}, { name:"memory", io: "Write", input: "write"}], arrow: "end"},
        { points:[{ name:"instDecoder", io: "RAM Enable", output: "ramen"}, { name:"memory", io: "Enable", input: "enable"}], arrow: "end"},

        { comment: "Data Bus Connections"},

        { points:[{ name:"memory", io: "DO", output: "do"}, { name:"dataBusNode1", io: "left"}], wide: true, end: "none"},
        { points:[{ name:"dataBusNode1", io: "right"}, { name:"dataBusNode2", io: "left"}], wide: true, beg: "none", end: "none"},
        { points:[{ name:"instLatch", io: "Latch 2 Out", output: "l2out"}, { name:"dataBusNode4", io: "top"}], wide: true, end: "none"},
        { points:[{ name:"dataBusNode4", io: "left"}, { name:"dataBusNode3", io: "right"}], wide: true, beg: "none", end: "none"},
        { points:[{ name:"dataBusNode3", io: "top"}, { name:"dataBusNode1", io: "bottom"}], wide: true, beg: "none", end: "none"},
        { points:[{ name:"dataBusNode2", io: "bottom"}, { name:"instLatch", io: "In", input: "input"}], wide: true, beg: "none"},
        { points:[{ name:"dataBusNode2", io: "right"}, { name:"dataBusNode5", io: "left"}], wide: true, beg: "none", end: "none"},
        { points:[{ name:"dataBusNode5", io: "bottom"}, { name:"regArray", io: "In", input: "input"}], wide: true, beg: "none"},
        { points:[{ name:"dataBusNode5", io: "right"}, { name:"dataBusNode6", io: "left"}], wide: true, beg: "none", end: "none"},
        { points:[{ name:"dataBusNode6", io: "bottom"}, { name:"dataBusNode7", io: "top"}], wide: true, beg: "none", end: "none"},
        { points:[{ name:"regArray", io: "Out", output: "out"}, { name:"dataBusNode8", io: "top"}], wide: true, end: "none"},
        { points:[{ name:"dataBusNode8", io: "bottom"}, { name:"alu", io: "B", input: "b"}], wide: true, beg: "none"},
        { points:[{ name:"regArray", io: "Accumulator", output: "acc"}, { name:"alu", io: "A", input: "a"}], wide: true},
        { points:[{ name:"dataBusNode8", io: "right"}, { name:"dataBusNode7", io: "left"}], wide: true, beg: "none", end: "none"},
        { points:[{ name:"dataBusNode7", io: "bottom"}, { name:"dataBusNode9", io: "top"}], wide: true, beg: "none", end: "none"},
        { points:[{ name:"dataBusNode9", io: "left"}, { name:"dataBusNode10", io: "right"}], wide: true, beg: "none", end: "none"},
        { points:[{ name:"alu", io: "Out", output: "output"}, { name:"dataBusNode10", io: "top"}], wide: true, end: "none"},
        { points:[{ name:"dataBusNode10", io: "left"}, { name:"memory", io: "DI", input: "di"}], wide: true, beg: "none"},

        { comment: "Address Bus Connections"},

        { points:[{ name:"regArray", io: "Out 16", output: "out16"}, { name:"addrBusNode2", io: "left"}], wide16: true, end: "none", chars: 0},
        { points:[{ name:"addrBusNode2", io: "top"}, { name:"addrBusNode1", io: "bottom"}], wide16: true, beg: "none", end: "none", chars: 0},
        { points:[{ name:"addrBusNode1", io: "left"}, { name:"regArray", io: "In 16", input: "input16"}], wide16: true, beg: "none", chars: 0},
        { points:[{ name:"addrBusNode2", io: "bottom"}, { name:"addrBusNode3", io: "top"}], wide16: true, beg: "none", end: "none", chars: 0},
        { points:[{ name:"incDec", io: "Out", output: "output"}, { name:"addrBusNode4", io: "top"}], wide16: true, end: "none", chars: 0},
        { points:[{ name:"addrBusNode4", io: "right"}, { name:"addrBusNode3", io: "left"}], wide16: true, beg: "none", end: "none", chars: 4},
        { points:[{ name:"addrBusNode4", io: "left"}, { name:"addrBusNode5", io: "right"}], wide16: true, beg: "none", end: "none", chars: 4},
        { points:[{ name:"progCounter", io: "Out", output: "output"}, { name:"addrBusNode6", io: "top"}], wide16: true, end: "none", chars: 0},
        { points:[{ name:"addrBusNode6", io: "bottom"}, { name:"incDec", io: "In", input: "input"}], wide16: true, beg: "none", chars: 0},
        { points:[{ name:"addrBusNode5", io: "top"}, { name:"addrBusNode7", io: "bottom"}], wide16: true, beg: "none", end: "none", chars: 0},
        { points:[{ name:"addrBusNode6", io: "left"}, { name:"addrBusNode7", io: "right"}], wide16: true, beg: "none", end: "none", chars: 4},
        { points:[{ name:"instLatch", io: "Latches 2 & 3 Out", output: "l23out"}, { name:"addrBusNode8", io: "top"}], wide16: true, end: "none", chars: 0},
        { points:[{ name:"addrBusNode8", io: "bottom"}, { name:"progCounter", io: "In", input: "input"}], wide16: true, beg: "none", chars: 0},
        { points:[{ name:"addrBusNode8", io: "left"}, { name:"addrBusNode9", io: "right"}], wide16: true, beg: "none", end: "none", chars: 4},
        { points:[{ name:"addrBusNode9", io: "bottom"}, { name:"addrBusNode7", io: "top"}], wide16: true, beg: "none", end: "none", chars: 0},
        { points:[{ name:"addrBusNode7", io: "left"}, { name:"memory", io: "Address", input: "addr"}], wide16: true, beg: "none", chars: 0},

        { comment: "From Instruction Decoder to Instruction Latches"},

        { points:[{ name:"instDecoder", io: "Latch 1 Clock", output: "l1clk"}, { name:"instLatch", io: "Latch 1 Clock", input: "l1Clock"}], arrow: "end"},
        { points:[{ name:"instDecoder", io: "Latch 2 Clock", output: "l2clk"}, { name:"instLatch", io: "Latch 2 Clock", input: "l2Clock"}], arrow: "end"},
        { points:[{ name:"instDecoder", io: "Latch 3 Clock", output: "l3clk"}, { name:"instLatch", io: "Latch 3 Clock", input: "l3Clock"}], arrow: "end"},
        { points:[{ name:"instDecoder", io: "Latch 2 Enable", output: "l2en"}, { name:"instLatch", io: "Latch 2 Enable", input: "l2Enable"}], arrow: "end"},
        { points:[{ name:"instDecoder", io: "Latch 2 & 3 Enable", output: "l23en"}, { name:"instLatch", io: "Latch 2 & 3 Enable", input: "l23Enable"}], arrow: "end"},

        { comment: "And back"},

        { points:[{ name:"instLatch", io: "Latch 1 Out", output: "l1Out"}, { name:"instDecoder", io: "Opcode In", input: "opcode"}], wide: true},

        { comment: "From Instruction Decoder to Register Array"},

        { points:[{ name:"instDecoder", io: "S\u2082", output: "s2"}, { name:"regArray", io: "S\u2082", input: "s2"}], arrow: "end"},
        { points:[{ name:"instDecoder", io: "S\u2081", output: "s1"}, { name:"regArray", io: "S\u2081", input: "s1"}], arrow: "end"},
        { points:[{ name:"instDecoder", io: "S\u2080", output: "s0"}, { name:"regArray", io: "S\u2080", input: "s0"}], arrow: "end"},

        { points:[{ name:"instDecoder", io: "D\u2082", output: "d2"}, { name:"regArray", io: "D\u2082", input: "d2"}], arrow: "end"},
        { points:[{ name:"instDecoder", io: "D\u2081", output: "d1"}, { name:"regArray", io: "D\u2081", input: "d1"}], arrow: "end"},
        { points:[{ name:"instDecoder", io: "D\u2080", output: "d0"}, { name:"regArray", io: "D\u2080", input: "d0"}], arrow: "end"},

        { points:[{ name:"instDecoder", io: "RA Clock", output: "raclk"}, { name:"regArray", io: "RA Clock", input: "clock"}], arrow: "end"},
        { points:[{ name:"instDecoder", io: "RA Enable", output: "raen"}, { name:"regArray", io: "RA Enable", input: "enable"}], arrow: "end"},
        { points:[{ name:"instDecoder", io: "Accumulator Clock", output: "accclk"}, { name:"regArray", io: "Accumulator Clock", input: "accClock"}], arrow: "end"},
        { points:[{ name:"instDecoder", io: "Accumulator Enable", output: "accen"}, { name:"regArray", io: "Accumulator Enable", input: "accEnable"}], arrow: "end"},

        { points:[{ name:"instDecoder", io: "HL Select", output: "hlsel"}, { name:"regArray", io: "HL Select", input: "hlsel"}], arrow: "end"},
        { points:[{ name:"instDecoder", io: "HL Clock", output: "hlclk"}, { name:"regArray", io: "HL Clock", input: "hlclk"}], arrow: "end"},
        { points:[{ name:"instDecoder", io: "HL Enable", output: "hlen"}, { name:"regArray", io: "HL Enable", input: "hlen"}], arrow: "end"},

        { comment: "From Instruction Decoder to ALU"},

        { points:[{ name:"instDecoder", io: "F\u2082", output: "f2"}, { name:"alu", io: "F\u2082", input: "f2"}], arrow: "end"},
        { points:[{ name:"instDecoder", io: "F\u2081", output: "f1"}, { name:"alu", io: "F\u2081", input: "f1"}], arrow: "end"},
        { points:[{ name:"instDecoder", io: "F\u2080", output: "f0"}, { name:"alu", io: "F\u2080", input: "f0"}], arrow: "end"},

        { points:[{ name:"instDecoder", io: "ALU Clock", output: "aluclk"}, { name:"alu", io: "Clock", input: "clock"}], arrow: "end"},
        { points:[{ name:"instDecoder", io: "ALU Enable", output: "aluen"}, { name:"alu", io: "Enable", input: "enable"}], arrow: "end"},

        { comment: "From Instruction Decoder to PC"},

        { points:[{ name:"instDecoder", io: "PC Clock", output: "pcclk"}, { name:"progCounter", io: "Clock", input: "clock"}], arrow: "end"},
        { points:[{ name:"instDecoder", io: "PC Enable", output: "pcen"}, { name:"progCounter", io: "Enable", input: "enable"}], arrow: "end"},
        { points:[{ name:"instDecoder", io: "PC Reset", output: "pcreset"}, { name:"progCounter", io: "Reset", input: "reset"}], arrow: "end"},

        { comment: "From Instruction Decoder to Increment-Decrement"},

        { points:[{ name:"instDecoder", io: "Increment-Decrement Clock", output: "idclk"}, { name:"incDec", io: "Clock", input: "clock"}], arrow: "end"},
        { points:[{ name:"instDecoder", io: "Increment Enable", output: "incen"}, { name:"incDec", io: "Increment Enable", input: "incEnable"}], arrow: "end"},
        { points:[{ name:"instDecoder", io: "Decrement Enable", output: "decen"}, { name:"incDec", io: "Decrement Enable", input: "decEnable"}], arrow: "end"},
      
    ]
}