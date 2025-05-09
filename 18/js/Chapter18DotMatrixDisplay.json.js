// Chapter18DotMatrixDisplay (c) Charles Petzold, 2024

let Chapter18DotMatrixDisplay = 
{
    name: "Chapter18DotMatrixDisplay",
    transform: { x: 10, y: 70, scale: 1, rotate: 0 },
    wireCurveRadius: 5,
    nodeRadius: 3,
    propagationDelay: 0,
    components:
    [
        { name: "enable0", type: "External", file: "Chapter18DotMatrixEnable", scale: 0.2, x:   0, y: 200},
        { name: "enable1", type: "External", file: "Chapter18DotMatrixEnable", scale: 0.2, x: 110, y: 200},
        { name: "enable2", type: "External", file: "Chapter18DotMatrixEnable", scale: 0.2, x: 220, y: 200},
        { name: "enable3", type: "External", file: "Chapter18DotMatrixEnable", scale: 0.2, x: 330, y: 200},
        { name: "enable4", type: "External", file: "Chapter18DotMatrixEnable", scale: 0.2, x: 440, y: 200},
        { name: "enable5", type: "External", file: "Chapter18DotMatrixEnable", scale: 0.2, x: 550, y: 200},
        { name: "enable6", type: "External", file: "Chapter18DotMatrixEnable", scale: 0.2, x: 660, y: 200},
        { name: "enable7", type: "External", file: "Chapter18DotMatrixEnable", scale: 0.2, x: 770, y: 200},
        { name: "enable8", type: "External", file: "Chapter18DotMatrixEnable", scale: 0.2, x: 880, y: 200},
        { name: "enable9", type: "External", file: "Chapter18DotMatrixEnable", scale: 0.2, x: 990, y: 200},

        { name: "bcd", type: "External", file: "Chapter18BcdGenerator", x:900, y:600},
        { name: "decode", type: "External", file: "Chapter18ColumnDecoder", scale: 1.75, x: 375, y: 700},

        { name: "matrix", type: "NumericDiodeMatrix" },
        { name: "display", type: "DotMatrixDisplay", x: 1150, y:-58},

        { name: "trans0", type: "Transistor", sink:true, scale: 0.5, x:-5, y:20, relative: {xy: { name: "display", io: "col0" }}},
        { name: "trans1", type: "Transistor", sink:true, scale: 0.5, x:-5, y:20, relative: {xy: { name: "display", io: "col1" }}},
        { name: "trans2", type: "Transistor", sink:true, scale: 0.5, x:-5, y:20, relative: {xy: { name: "display", io: "col2" }}},
        { name: "trans3", type: "Transistor", sink:true, scale: 0.5, x:-5, y:20, relative: {xy: { name: "display", io: "col3" }}},
        { name: "trans4", type: "Transistor", sink:true, scale: 0.5, x:-5, y:20, relative: {xy: { name: "display", io: "col4" }}},

        { name: "gndTrans0", type: "Ground", y: 10, relative: {xy: { name:"trans0", io: "E"}}},
        { name: "gndTrans1", type: "Ground", y: 10, relative: {xy: { name:"trans1", io: "E"}}},
        { name: "gndTrans2", type: "Ground", y: 10, relative: {xy: { name:"trans2", io: "E"}}},
        { name: "gndTrans3", type: "Ground", y: 10, relative: {xy: { name:"trans3", io: "E"}}},
        { name: "gndTrans4", type: "Ground", y: 10, relative: {xy: { name:"trans4", io: "E"}}},

        { name: "jtTrans01", type: "Joint", x: -5, relative: {xy: { name:"trans0", io: "B"}}},
        { name: "jtTrans00", type: "Joint", relative: {x: { name:"jtTrans01"}, y: { name:"enable9.node0"}}},
        { name: "jtTrans11", type: "Joint", x: -5, relative: {xy: { name:"trans1", io: "B"}}},
        { name: "jtTrans10", type: "Joint", relative: {x: { name:"jtTrans11"}, y: { name:"enable9.node1"}}},
        { name: "jtTrans21", type: "Joint", x: -5, relative: {xy: { name:"trans2", io: "B"}}},
        { name: "jtTrans20", type: "Joint", relative: {x: { name:"jtTrans21"}, y: { name:"enable9.node2"}}},
        { name: "jtTrans31", type: "Joint", x: -5, relative: {xy: { name:"trans3", io: "B"}}},
        { name: "jtTrans30", type: "Joint", relative: {x: { name:"jtTrans31"}, y: { name:"enable9.node3"}}},
        { name: "jtTrans41", type: "Joint", x: -5, relative: {xy: { name:"trans4", io: "B"}}},
        { name: "jtTrans40", type: "Joint", relative: {x: { name:"jtTrans41"}, y: { name:"enable9.node4"}}},


        { name: "jtAnd00", type: "Joint", y: -25, relative: {xy: { name:"bcd.decoder.and0", io: "out"}}},
        { name: "jtAnd01", type: "Joint", relative: { y: { name:"jtAnd00"}, x: { name:"enable0.nodeCommon4"}}},

        { name: "jtAnd10", type: "Joint", y: -40, relative: {xy: { name:"bcd.decoder.and1", io: "out"}}},
        { name: "jtAnd11", type: "Joint", relative: { y: { name:"jtAnd10"}, x: { name:"enable1.nodeCommon4"}}},

        { name: "jtAnd20", type: "Joint", y: -55, relative: {xy: { name:"bcd.decoder.and2", io: "out"}}},
        { name: "jtAnd21", type: "Joint", relative: { y: { name:"jtAnd20"}, x: { name:"enable2.nodeCommon4"}}},

        { name: "jtAnd30", type: "Joint", y: -70, relative: {xy: { name:"bcd.decoder.and3", io: "out"}}},
        { name: "jtAnd31", type: "Joint", relative: { y: { name:"jtAnd30"}, x: { name:"enable3.nodeCommon4"}}},

        { name: "jtAnd40", type: "Joint", y: -85, relative: {xy: { name:"bcd.decoder.and4", io: "out"}}},
        { name: "jtAnd41", type: "Joint", relative: { y: { name:"jtAnd40"}, x: { name:"enable4.nodeCommon4"}}},

        { name: "jtAnd50", type: "Joint", y: -100, relative: {xy: { name:"bcd.decoder.and5", io: "out"}}},
        { name: "jtAnd51", type: "Joint", relative: { y: { name:"jtAnd50"}, x: { name:"enable5.nodeCommon4"}}},

        { name: "jtAnd60", type: "Joint", y: -115, relative: {xy: { name:"bcd.decoder.and6", io: "out"}}},
        { name: "jtAnd61", type: "Joint", relative: { y: { name:"jtAnd60"}, x: { name:"enable6.nodeCommon4"}}},

        { name: "jtAnd70", type: "Joint", y: -130, relative: {xy: { name:"bcd.decoder.and7", io: "out"}}},
        { name: "jtAnd71", type: "Joint", relative: { y: { name:"jtAnd70"}, x: { name:"enable7.nodeCommon4"}}},

        { name: "jtAnd80", type: "Joint", y: -145, relative: {xy: { name:"bcd.decoder.and8", io: "out"}}},
        { name: "jtAnd81", type: "Joint", relative: { y: { name:"jtAnd80"}, x: { name:"enable8.nodeCommon4"}}},

        { name: "jtAnd90", type: "Joint", y: -160, relative: {xy: { name:"bcd.decoder.and9", io: "out"}}},
        { name: "jtAnd91", type: "Joint", relative: { y: { name:"jtAnd90"}, x: { name:"enable9.nodeCommon4"}}},

        { name: "jtSelAnd00", type: "Joint", y: -25, relative: {xy: { name:"decode.and0", io: "out"}}},
        { name: "jtSelAnd01", type: "Joint", relative: {y: { name:"jtSelAnd00"}, x: { name:"enable0.node0"}}},

        { name: "jtSelAnd10", type: "Joint", y: -40, relative: {xy: { name:"decode.and1", io: "out"}}},
        { name: "jtSelAnd11", type: "Joint", relative: {y: { name:"jtSelAnd10"}, x: { name:"enable0.node1"}}},

        { name: "jtSelAnd20", type: "Joint", y: -55, relative: {xy: { name:"decode.and2", io: "out"}}},
        { name: "jtSelAnd21", type: "Joint", relative: {y: { name:"jtSelAnd20"}, x: { name:"enable0.node2"}}},

        { name: "jtSelAnd30", type: "Joint", y: -70, relative: {xy: { name:"decode.and3", io: "out"}}},
        { name: "jtSelAnd31", type: "Joint", relative: {y: { name:"jtSelAnd30"}, x: { name:"enable0.node3"}}},

        { name: "jtSel40", type: "Joint", y: -15, relative: {y: { name:"jtSelAnd30"}, x: { name:"decode.inv2InvNode"}}},
        { name: "jtSel41", type: "Joint", relative: {y: { name:"jtSel40"}, x: { name:"enable0.node4"}}}
    ],
    wires: 
    [
        { points:[{ name:"bcd.decoder.and0", io: "out"}, { name:"jtAnd00"}, { name:"jtAnd01"}, { name:"enable0.nodeCommon4"}]},
        { points:[{ name:"bcd.decoder.and1", io: "out"}, { name:"jtAnd10"}, { name:"jtAnd11"}, { name:"enable1.nodeCommon4"}]},
        { points:[{ name:"bcd.decoder.and2", io: "out"}, { name:"jtAnd20"}, { name:"jtAnd21"}, { name:"enable2.nodeCommon4"}]},
        { points:[{ name:"bcd.decoder.and3", io: "out"}, { name:"jtAnd30"}, { name:"jtAnd31"}, { name:"enable3.nodeCommon4"}]},
        { points:[{ name:"bcd.decoder.and4", io: "out"}, { name:"jtAnd40"}, { name:"jtAnd41"}, { name:"enable4.nodeCommon4"}]},
        { points:[{ name:"bcd.decoder.and5", io: "out"}, { name:"jtAnd50"}, { name:"jtAnd51"}, { name:"enable5.nodeCommon4"}]},
        { points:[{ name:"bcd.decoder.and6", io: "out"}, { name:"jtAnd60"}, { name:"jtAnd61"}, { name:"enable6.nodeCommon4"}]},
        { points:[{ name:"bcd.decoder.and7", io: "out"}, { name:"jtAnd70"}, { name:"jtAnd71"}, { name:"enable7.nodeCommon4"}]},
        { points:[{ name:"bcd.decoder.and8", io: "out"}, { name:"jtAnd80"}, { name:"jtAnd81"}, { name:"enable8.nodeCommon4"}]},
        { points:[{ name:"bcd.decoder.and9", io: "out"}, { name:"jtAnd90"}, { name:"jtAnd91"}, { name:"enable9.nodeCommon4"}]},

        { points:[{ name:"enable0.node0"}, { name:"enable1.node0"}]},
        { points:[{ name:"enable1.node0"}, { name:"enable2.node0"}]},
        { points:[{ name:"enable2.node0"}, { name:"enable3.node0"}]},
        { points:[{ name:"enable3.node0"}, { name:"enable4.node0"}]},
        { points:[{ name:"enable4.node0"}, { name:"enable5.node0"}]},
        { points:[{ name:"enable5.node0"}, { name:"enable6.node0"}]},
        { points:[{ name:"enable6.node0"}, { name:"enable7.node0"}]},
        { points:[{ name:"enable7.node0"}, { name:"enable8.node0"}]},
        { points:[{ name:"enable8.node0"}, { name:"enable9.node0"}]},

        { points:[{ name:"enable0.node1"}, { name:"enable1.node1"}]},
        { points:[{ name:"enable1.node1"}, { name:"enable2.node1"}]},
        { points:[{ name:"enable2.node1"}, { name:"enable3.node1"}]},
        { points:[{ name:"enable3.node1"}, { name:"enable4.node1"}]},
        { points:[{ name:"enable4.node1"}, { name:"enable5.node1"}]},
        { points:[{ name:"enable5.node1"}, { name:"enable6.node1"}]},
        { points:[{ name:"enable6.node1"}, { name:"enable7.node1"}]},
        { points:[{ name:"enable7.node1"}, { name:"enable8.node1"}]},
        { points:[{ name:"enable8.node1"}, { name:"enable9.node1"}]},

        { points:[{ name:"enable0.node2"}, { name:"enable1.node2"}]},
        { points:[{ name:"enable1.node2"}, { name:"enable2.node2"}]},
        { points:[{ name:"enable2.node2"}, { name:"enable3.node2"}]},
        { points:[{ name:"enable3.node2"}, { name:"enable4.node2"}]},
        { points:[{ name:"enable4.node2"}, { name:"enable5.node2"}]},
        { points:[{ name:"enable5.node2"}, { name:"enable6.node2"}]},
        { points:[{ name:"enable6.node2"}, { name:"enable7.node2"}]},
        { points:[{ name:"enable7.node2"}, { name:"enable8.node2"}]},
        { points:[{ name:"enable8.node2"}, { name:"enable9.node2"}]},

        { points:[{ name:"enable0.node3"}, { name:"enable1.node3"}]},
        { points:[{ name:"enable1.node3"}, { name:"enable2.node3"}]},
        { points:[{ name:"enable2.node3"}, { name:"enable3.node3"}]},
        { points:[{ name:"enable3.node3"}, { name:"enable4.node3"}]},
        { points:[{ name:"enable4.node3"}, { name:"enable5.node3"}]},
        { points:[{ name:"enable5.node3"}, { name:"enable6.node3"}]},
        { points:[{ name:"enable6.node3"}, { name:"enable7.node3"}]},
        { points:[{ name:"enable7.node3"}, { name:"enable8.node3"}]},
        { points:[{ name:"enable8.node3"}, { name:"enable9.node3"}]},

        { points:[{ name:"enable0.node4"}, { name:"enable1.node4"}]},
        { points:[{ name:"enable1.node4"}, { name:"enable2.node4"}]},
        { points:[{ name:"enable2.node4"}, { name:"enable3.node4"}]},
        { points:[{ name:"enable3.node4"}, { name:"enable4.node4"}]},
        { points:[{ name:"enable4.node4"}, { name:"enable5.node4"}]},
        { points:[{ name:"enable5.node4"}, { name:"enable6.node4"}]},
        { points:[{ name:"enable6.node4"}, { name:"enable7.node4"}]},
        { points:[{ name:"enable7.node4"}, { name:"enable8.node4"}]},
        { points:[{ name:"enable8.node4"}, { name:"enable9.node4"}]},

        { points: [{ name:"decode.and0", io: "out"}, { name:"jtSelAnd00"}, { name:"jtSelAnd01"}, { name:"enable0.node0"}]},
        { points: [{ name:"decode.and1", io: "out"}, { name:"jtSelAnd10"}, { name:"jtSelAnd11"}, { name:"enable0.node1"}]},
        { points: [{ name:"decode.and2", io: "out"}, { name:"jtSelAnd20"}, { name:"jtSelAnd21"}, { name:"enable0.node2"}]},
        { points: [{ name:"decode.and3", io: "out"}, { name:"jtSelAnd30"}, { name:"jtSelAnd31"}, { name:"enable0.node3"}]},

        { points: [{ name:"decode.inv2InvNode"}, { name:"jtSel40"}, { name:"jtSel41"}, { name:"enable0.node4"}]},

        { points: [{ name:"enable0.and0", io: "out"}, { name:"matrix", io: "col0", input: 0 }]},
        { points: [{ name:"enable0.and1", io: "out"}, { name:"matrix", io: "col1", input: 1 }]},
        { points: [{ name:"enable0.and2", io: "out"}, { name:"matrix", io: "col2", input: 2 }]},
        { points: [{ name:"enable0.and3", io: "out"}, { name:"matrix", io: "col3", input: 3 }]},
        { points: [{ name:"enable0.and4", io: "out"}, { name:"matrix", io: "col4", input: 4 }]},

        { points: [{ name:"enable1.and0", io: "out"}, { name:"matrix", io: "col5", input: 5 }]},
        { points: [{ name:"enable1.and1", io: "out"}, { name:"matrix", io: "col6", input: 6 }]},
        { points: [{ name:"enable1.and2", io: "out"}, { name:"matrix", io: "col7", input: 7 }]},
        { points: [{ name:"enable1.and3", io: "out"}, { name:"matrix", io: "col8", input: 8 }]},
        { points: [{ name:"enable1.and4", io: "out"}, { name:"matrix", io: "col9", input: 9 }]},

        { points: [{ name:"enable2.and0", io: "out"}, { name:"matrix", io: "col10", input: 10 }]},
        { points: [{ name:"enable2.and1", io: "out"}, { name:"matrix", io: "col11", input: 11 }]},
        { points: [{ name:"enable2.and2", io: "out"}, { name:"matrix", io: "col12", input: 12 }]},
        { points: [{ name:"enable2.and3", io: "out"}, { name:"matrix", io: "col13", input: 13 }]},
        { points: [{ name:"enable2.and4", io: "out"}, { name:"matrix", io: "col14", input: 14 }]},

        { points: [{ name:"enable3.and0", io: "out"}, { name:"matrix", io: "col15", input: 15 }]},
        { points: [{ name:"enable3.and1", io: "out"}, { name:"matrix", io: "col16", input: 16 }]},
        { points: [{ name:"enable3.and2", io: "out"}, { name:"matrix", io: "col17", input: 17 }]},
        { points: [{ name:"enable3.and3", io: "out"}, { name:"matrix", io: "col18", input: 18 }]},
        { points: [{ name:"enable3.and4", io: "out"}, { name:"matrix", io: "col19", input: 19 }]},

        { points: [{ name:"enable4.and0", io: "out"}, { name:"matrix", io: "col20", input: 20 }]},
        { points: [{ name:"enable4.and1", io: "out"}, { name:"matrix", io: "col21", input: 21 }]},
        { points: [{ name:"enable4.and2", io: "out"}, { name:"matrix", io: "col22", input: 22 }]},
        { points: [{ name:"enable4.and3", io: "out"}, { name:"matrix", io: "col23", input: 23 }]},
        { points: [{ name:"enable4.and4", io: "out"}, { name:"matrix", io: "col24", input: 24 }]},

        { points: [{ name:"enable5.and0", io: "out"}, { name:"matrix", io: "col25", input: 25 }]},
        { points: [{ name:"enable5.and1", io: "out"}, { name:"matrix", io: "col26", input: 26 }]},
        { points: [{ name:"enable5.and2", io: "out"}, { name:"matrix", io: "col27", input: 27 }]},
        { points: [{ name:"enable5.and3", io: "out"}, { name:"matrix", io: "col28", input: 28 }]},
        { points: [{ name:"enable5.and4", io: "out"}, { name:"matrix", io: "col29", input: 29 }]},

        { points: [{ name:"enable6.and0", io: "out"}, { name:"matrix", io: "col30", input: 30 }]},
        { points: [{ name:"enable6.and1", io: "out"}, { name:"matrix", io: "col31", input: 31 }]},
        { points: [{ name:"enable6.and2", io: "out"}, { name:"matrix", io: "col32", input: 32 }]},
        { points: [{ name:"enable6.and3", io: "out"}, { name:"matrix", io: "col33", input: 33 }]},
        { points: [{ name:"enable6.and4", io: "out"}, { name:"matrix", io: "col34", input: 34 }]},

        { points: [{ name:"enable7.and0", io: "out"}, { name:"matrix", io: "col35", input: 35 }]},
        { points: [{ name:"enable7.and1", io: "out"}, { name:"matrix", io: "col36", input: 36 }]},
        { points: [{ name:"enable7.and2", io: "out"}, { name:"matrix", io: "col37", input: 37 }]},
        { points: [{ name:"enable7.and3", io: "out"}, { name:"matrix", io: "col38", input: 38 }]},
        { points: [{ name:"enable7.and4", io: "out"}, { name:"matrix", io: "col39", input: 39 }]},

        { points: [{ name:"enable8.and0", io: "out"}, { name:"matrix", io: "col40", input: 40 }]},
        { points: [{ name:"enable8.and1", io: "out"}, { name:"matrix", io: "col41", input: 41 }]},
        { points: [{ name:"enable8.and2", io: "out"}, { name:"matrix", io: "col42", input: 42 }]},
        { points: [{ name:"enable8.and3", io: "out"}, { name:"matrix", io: "col43", input: 43 }]},
        { points: [{ name:"enable8.and4", io: "out"}, { name:"matrix", io: "col44", input: 44 }]},

        { points: [{ name:"enable9.and0", io: "out"}, { name:"matrix", io: "col45", input: 45 }]},
        { points: [{ name:"enable9.and1", io: "out"}, { name:"matrix", io: "col46", input: 46 }]},
        { points: [{ name:"enable9.and2", io: "out"}, { name:"matrix", io: "col47", input: 47 }]},
        { points: [{ name:"enable9.and3", io: "out"}, { name:"matrix", io: "col48", input: 48 }]},
        { points: [{ name:"enable9.and4", io: "out"}, { name:"matrix", io: "col49", input: 49 }]},

        { points: [{ name:"matrix", io: "out0", output:"out0"}, { name:"display", io: "row0", input: 0 }]},
        { points: [{ name:"matrix", io: "out1", output:"out1"}, { name:"display", io: "row1", input: 1 }]},
        { points: [{ name:"matrix", io: "out2", output:"out2"}, { name:"display", io: "row2", input: 2 }]},
        { points: [{ name:"matrix", io: "out3", output:"out3"}, { name:"display", io: "row3", input: 3 }]},
        { points: [{ name:"matrix", io: "out4", output:"out4"}, { name:"display", io: "row4", input: 4 }]},
        { points: [{ name:"matrix", io: "out5", output:"out5"}, { name:"display", io: "row5", input: 5 }]},
        { points: [{ name:"matrix", io: "out6", output:"out6"}, { name:"display", io: "row6", input: 6 }]},

        { points: [{ name:"enable9.node0"}, { name:"jtTrans00"}, { name:"jtTrans01"}, { name:"trans0", io: "B", input: "B"}]},
        { points: [{ name:"enable9.node1"}, { name:"jtTrans10"}, { name:"jtTrans11"}, { name:"trans1", io: "B", input: "B"}]},
        { points: [{ name:"enable9.node2"}, { name:"jtTrans20"}, { name:"jtTrans21"}, { name:"trans2", io: "B", input: "B"}]},
        { points: [{ name:"enable9.node3"}, { name:"jtTrans30"}, { name:"jtTrans31"}, { name:"trans3", io: "B", input: "B"}]},
        { points: [{ name:"enable9.node4"}, { name:"jtTrans40"}, { name:"jtTrans41"}, { name:"trans4", io: "B", input: "B"}]},

        { points: [{ name:"trans0", io: "E", output: "E"}, { name:"gndTrans0"}]},
        { points: [{ name:"trans1", io: "E", output: "E"}, { name:"gndTrans1"}]},
        { points: [{ name:"trans2", io: "E", output: "E"}, { name:"gndTrans2"}]},
        { points: [{ name:"trans3", io: "E", output: "E"}, { name:"gndTrans3"}]},
        { points: [{ name:"trans4", io: "E", output: "E"}, { name:"gndTrans4"}]},

        { points: [{ name:"trans0", io: "C", output: "C"}, { name:"display", io: "col0", input: -1 }]},
        { points: [{ name:"trans1", io: "C", output: "C"}, { name:"display", io: "col1", input: -2 }]},
        { points: [{ name:"trans2", io: "C", output: "C"}, { name:"display", io: "col2", input: -3 }]},
        { points: [{ name:"trans3", io: "C", output: "C"}, { name:"display", io: "col3", input: -4 }]},
        { points: [{ name:"trans4", io: "C", output: "C"}, { name:"display", io: "col4", input: -5 }]}
    ]
}
