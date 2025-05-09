// Chapter19SixteenByEightRam (c) Charles Petzold, 2024

let Chapter19SixteenByEightRam = 
{
    name: "Chapter19SixteenByEightRam",
    transform: { x: 90, y: 300, scale: 1, rotate: 0 },
    wireCurveRadius: 5,
    nodeRadius: 3,
    propagationDelay: 0,
    components:
        [
            { name:"array", type: "External", file: "Chapter19SixteenByEightArray", x:600},
            { name:"decoder", type: "External", file: "Chapter19FourToSixteenDecoder",  rotate: -90, x: 340, y: 1850, relative: {xy: { name:"array.byteF.decoderBNode"}}},

            { name:"switch7", type: "DigitButton", y: -225, relative: {xy: { name:"array.byte0.bit7.nor1"}}},
            { name:"switch6", type: "DigitButton", relative: {x: { name:"array.byte0.bit6.nor1"}, y:{ name:"switch7"}}},
            { name:"switch5", type: "DigitButton", relative: {x: { name:"array.byte0.bit5.nor1"}, y:{ name:"switch7"}}},
            { name:"switch4", type: "DigitButton", relative: {x: { name:"array.byte0.bit4.nor1"}, y:{ name:"switch7"}}},
            { name:"switch3", type: "DigitButton", relative: {x: { name:"array.byte0.bit3.nor1"}, y:{ name:"switch7"}}},
            { name:"switch2", type: "DigitButton", relative: {x: { name:"array.byte0.bit2.nor1"}, y:{ name:"switch7"}}},
            { name:"switch1", type: "DigitButton", relative: {x: { name:"array.byte0.bit1.nor1"}, y:{ name:"switch7"}}},
            { name:"switch0", type: "DigitButton", relative: {x: { name:"array.byte0.bit0.nor1"}, y:{ name:"switch7"}}},

            { name:"sw7Joint1", type: "Joint", y: 25, relative: {xy: { name:"switch7", io: "bottom"}}},
            { name:"sw7Joint2", type: "Joint", relative: {y: { name:"sw7Joint1"}, x: { name:"array.byte0.bit7.buttonNode"}}},

            { name:"sw6Joint1", type: "Joint", relative: {x: { name:"switch6", io: "bottom"}, y: { name:"sw7Joint1"}}},
            { name:"sw6Joint2", type: "Joint", relative: {y: { name:"sw6Joint1"}, x: { name:"array.byte0.bit6.buttonNode"}}},

            { name:"sw5Joint1", type: "Joint", relative: {x: { name:"switch5", io: "bottom"}, y: { name:"sw7Joint1"}}},
            { name:"sw5Joint2", type: "Joint", relative: {y: { name:"sw5Joint1"}, x: { name:"array.byte0.bit5.buttonNode"}}},

            { name:"sw4Joint1", type: "Joint", relative: {x: { name:"switch4", io: "bottom"}, y: { name:"sw7Joint1"}}},
            { name:"sw4Joint2", type: "Joint", relative: {y: { name:"sw4Joint1"}, x: { name:"array.byte0.bit4.buttonNode"}}},

            { name:"sw3Joint1", type: "Joint", relative: {x: { name:"switch3", io: "bottom"}, y: { name:"sw7Joint1"}}},
            { name:"sw3Joint2", type: "Joint", relative: {y: { name:"sw3Joint1"}, x: { name:"array.byte0.bit3.buttonNode"}}},

            { name:"sw2Joint1", type: "Joint", relative: {x: { name:"switch2", io: "bottom"}, y: { name:"sw7Joint1"}}},
            { name:"sw2Joint2", type: "Joint", relative: {y: { name:"sw2Joint1"}, x: { name:"array.byte0.bit2.buttonNode"}}},

            { name:"sw1Joint1", type: "Joint", relative: {x: { name:"switch1", io: "bottom"}, y: { name:"sw7Joint1"}}},
            { name:"sw1Joint2", type: "Joint", relative: {y: { name:"sw1Joint1"}, x: { name:"array.byte0.bit1.buttonNode"}}},

            { name:"sw0Joint1", type: "Joint", relative: {x: { name:"switch0", io: "bottom"}, y: { name:"sw7Joint1"}}},
            { name:"sw0Joint2", type: "Joint", relative: {y: { name:"sw0Joint1"}, x: { name:"array.byte0.bit0.buttonNode"}}},

            { name:"swLabel7", type: "Label", text: "Bit 7", y: -50, relative: {xy: { name:"switch7"}}},
            { name:"swLabel6", type: "Label", text: "Bit 6", relative: {x: { name:"switch6"}, y: { name:"swLabel7"}}},
            { name:"swLabel5", type: "Label", text: "Bit 5", relative: {x: { name:"switch5"}, y: { name:"swLabel7"}}},
            { name:"swLabel4", type: "Label", text: "Bit 4", relative: {x: { name:"switch4"}, y: { name:"swLabel7"}}},
            { name:"swLabel3", type: "Label", text: "Bit 3", relative: {x: { name:"switch3"}, y: { name:"swLabel7"}}},
            { name:"swLabel2", type: "Label", text: "Bit 2", relative: {x: { name:"switch2"}, y: { name:"swLabel7"}}},
            { name:"swLabel1", type: "Label", text: "Bit 1", relative: {x: { name:"switch1"}, y: { name:"swLabel7"}}},
            { name:"swLabel0", type: "Label", text: "Bit 0", relative: {x: { name:"switch0"}, y: { name:"swLabel7"}}},

            { name:"switchW", type: "MomentaryButton", relative: {x:{ name:"array.byte0.writeANode"}, y: { name:"switch7"}}},
            { name:"swLabelW", type: "Label", text: "Write", relative: {x: { name:"switchW"}, y: { name:"swLabel7"}}},

            { name:"light7", type: "BitLight", y: 100, relative: {xy: { name:"switch7"}}},
            { name:"light6", type: "BitLight", relative: {x: { name:"switch6"}, y:{ name:"light7"}}},
            { name:"light5", type: "BitLight", relative: {x: { name:"switch5"}, y:{ name:"light7"}}},
            { name:"light4", type: "BitLight", relative: {x: { name:"switch4"}, y:{ name:"light7"}}},
            { name:"light3", type: "BitLight", relative: {x: { name:"switch3"}, y:{ name:"light7"}}},
            { name:"light2", type: "BitLight", relative: {x: { name:"switch2"}, y:{ name:"light7"}}},
            { name:"light1", type: "BitLight", relative: {x: { name:"switch1"}, y:{ name:"light7"}}},
            { name:"light0", type: "BitLight", relative: {x: { name:"switch0"}, y:{ name:"light7"}}},

            { name:"lt7Joint1", type: "Joint", y: 25, relative: {xy: { name:"light7", io: "bottom"}}},
            { name:"lt7Joint2", type: "Joint", relative: {y: { name:"lt7Joint1"}, x: { name:"array.byte0.bit7.emitterNode"}}},

            { name:"lt6Joint1", type: "Joint", relative: {x: { name:"light6", io: "bottom"}, y: { name:"lt7Joint1"}}},
            { name:"lt6Joint2", type: "Joint", relative: {y: { name:"lt6Joint1"}, x: { name:"array.byte0.bit6.emitterNode"}}},

            { name:"lt5Joint1", type: "Joint", relative: {x: { name:"light5", io: "bottom"}, y: { name:"lt7Joint1"}}},
            { name:"lt5Joint2", type: "Joint", relative: {y: { name:"lt5Joint1"}, x: { name:"array.byte0.bit5.emitterNode"}}},
            
            { name:"lt4Joint1", type: "Joint", relative: {x: { name:"light4", io: "bottom"}, y: { name:"lt7Joint1"}}},
            { name:"lt4Joint2", type: "Joint", relative: {y: { name:"lt4Joint1"}, x: { name:"array.byte0.bit4.emitterNode"}}},
            
            { name:"lt3Joint1", type: "Joint", relative: {x: { name:"light3", io: "bottom"}, y: { name:"lt7Joint1"}}},
            { name:"lt3Joint2", type: "Joint", relative: {y: { name:"lt3Joint1"}, x: { name:"array.byte0.bit3.emitterNode"}}},
            
            { name:"lt2Joint1", type: "Joint", relative: {x: { name:"light2", io: "bottom"}, y: { name:"lt7Joint1"}}},
            { name:"lt2Joint2", type: "Joint", relative: {y: { name:"lt2Joint1"}, x: { name:"array.byte0.bit2.emitterNode"}}},
            
            { name:"lt1Joint1", type: "Joint", relative: {x: { name:"light1", io: "bottom"}, y: { name:"lt7Joint1"}}},
            { name:"lt1Joint2", type: "Joint", relative: {y: { name:"lt1Joint1"}, x: { name:"array.byte0.bit1.emitterNode"}}},
            
            { name:"lt0Joint1", type: "Joint", relative: {x: { name:"light0", io: "bottom"}, y: { name:"lt7Joint1"}}},
            { name:"lt0Joint2", type: "Joint", relative: {y: { name:"lt0Joint1"}, x: { name:"array.byte0.bit0.emitterNode"}}},

            { name:"switchA0", type: "DigitButton", relative: {x: { name:"decoder.node0"}, y: { name:"switchW"}}},
            { name:"switchA1", type: "DigitButton", x: -75, relative: {xy: { name:"switchA0"}}},
            { name:"switchA2", type: "DigitButton", x: -75, relative: {xy: { name:"switchA1"}}},
            { name:"switchA3", type: "DigitButton", x: -75, relative: {xy: { name:"switchA2"}}},

            { name:"swLabelA0", type: "Label", text: "A0", relative: {x: { name:"switchA0"}, y: { name:"swLabelW"}}},
            { name:"swLabelA1", type: "Label", text: "A1", relative: {x: { name:"switchA1"}, y: { name:"swLabelW"}}},
            { name:"swLabelA2", type: "Label", text: "A2", relative: {x: { name:"switchA2"}, y: { name:"swLabelW"}}},
            { name:"swLabelA3", type: "Label", text: "A3", relative: {x: { name:"switchA3"}, y: { name:"swLabelW"}}},

            { name:"jointA1", type: "Joint", relative: {x: { name:"switchA1"}, y: { name:"decoder.node1"}}},
            { name:"jointA2", type: "Joint", relative: {x: { name:"switchA2"}, y: { name:"decoder.node2"}}},
            { name:"jointA3", type: "Joint", relative: {x: { name:"switchA3"}, y: { name:"decoder.node3"}}},

            { name:"addr0", type: "Label", text: "0000:", x: 40, y: 65, relative: {xy: { name:"decoder.and0"}}},
            { name:"addr1", type: "Label", text: "0001:", y: 65, relative: {y: { name:"decoder.and1"}, x: { name:"addr0"}}},
            { name:"addr2", type: "Label", text: "0010:", y: 65, relative: {y: { name:"decoder.and2"}, x: { name:"addr0"}}},
            { name:"addr3", type: "Label", text: "0011:", y: 65, relative: {y: { name:"decoder.and3"}, x: { name:"addr0"}}},
            { name:"addr4", type: "Label", text: "0100:", y: 65, relative: {y: { name:"decoder.and4"}, x: { name:"addr0"}}},
            { name:"addr5", type: "Label", text: "0101:", y: 65, relative: {y: { name:"decoder.and5"}, x: { name:"addr0"}}},
            { name:"addr6", type: "Label", text: "0110:", y: 65, relative: {y: { name:"decoder.and6"}, x: { name:"addr0"}}},
            { name:"addr7", type: "Label", text: "0111:", y: 65, relative: {y: { name:"decoder.and7"}, x: { name:"addr0"}}},
            { name:"addr8", type: "Label", text: "1000:", y: 65, relative: {y: { name:"decoder.and8"}, x: { name:"addr0"}}},
            { name:"addr9", type: "Label", text: "1001:", y: 65, relative: {y: { name:"decoder.and9"}, x: { name:"addr0"}}},
            { name:"addrA", type: "Label", text: "1010:", y: 65, relative: {y: { name:"decoder.andA"}, x: { name:"addr0"}}},
            { name:"addrB", type: "Label", text: "1011:", y: 65, relative: {y: { name:"decoder.andB"}, x: { name:"addr0"}}},
            { name:"addrC", type: "Label", text: "1100:", y: 65, relative: {y: { name:"decoder.andC"}, x: { name:"addr0"}}},
            { name:"addrE", type: "Label", text: "1101:", y: 65, relative: {y: { name:"decoder.andD"}, x: { name:"addr0"}}},
            { name:"addrE", type: "Label", text: "1110:", y: 65, relative: {y: { name:"decoder.andE"}, x: { name:"addr0"}}},
            { name:"addrF", type: "Label", text: "1111:", y: 65, relative: {y: { name:"decoder.andF"}, x: { name:"addr0"}}},

            { name: "buttonsNum", type: "DynamicDecimal", text: "0", hexOnly: true, x: 150, relative: { xy: { name:"switch0" }}, 
                digits: {0: "switch0", 1: "switch1", 2: "switch2", 3: "switch3", 
                            4: "switch4", 5: "switch5", 6: "switch6", 7: "switch7"}},

            { name: "lightNums", type: "DynamicDecimal", text: "0", hexOnly: true, relative: { x:{ name:"buttonsNum"}, y: { name:"light0" }}, 
                digits: {0: "light0", 1: "light1", 2: "light2", 3: "light3", 
                            4: "light4", 5: "light5", 6: "light6", 7: "light7"}},
            
            { name: "num0", type: "DynamicDecimal", text: "0", hexOnly: true, relative: { x: { name:"buttonsNum"}, y: { name:"array.byte0.bit0.trans" }}, 
                    digits: {0: "array.byte0.bit0.nor1", 1: "array.byte0.bit1.nor1", 
                                2: "array.byte0.bit2.nor1", 3: "array.byte0.bit3.nor1", 
                                4: "array.byte0.bit4.nor1", 5: "array.byte0.bit5.nor1", 
                                6: "array.byte0.bit6.nor1", 7: "array.byte0.bit7.nor1"}},

            { name: "num1", type: "DynamicDecimal", text: "0", hexOnly: true, relative: { x: { name:"buttonsNum"}, y: { name:"array.byte1.bit0.trans" }}, 
                    digits: {0: "array.byte1.bit0.nor1", 1: "array.byte1.bit1.nor1", 
                                2: "array.byte1.bit2.nor1", 3: "array.byte1.bit3.nor1", 
                                4: "array.byte1.bit4.nor1", 5: "array.byte1.bit5.nor1", 
                                6: "array.byte1.bit6.nor1", 7: "array.byte1.bit7.nor1"}},

            { name: "num2", type: "DynamicDecimal", text: "0", hexOnly: true, relative: { x: { name:"buttonsNum"}, y: { name:"array.byte2.bit0.trans" }}, 
                    digits: {0: "array.byte2.bit0.nor1", 1: "array.byte2.bit1.nor1", 
                                2: "array.byte2.bit2.nor1", 3: "array.byte2.bit3.nor1", 
                                4: "array.byte2.bit4.nor1", 5: "array.byte2.bit5.nor1", 
                                6: "array.byte2.bit6.nor1", 7: "array.byte2.bit7.nor1"}},                  

            { name: "num3", type: "DynamicDecimal", text: "0", hexOnly: true, relative: { x: { name:"buttonsNum"}, y: { name:"array.byte3.bit0.trans" }}, 
                    digits: {0: "array.byte3.bit0.nor1", 1: "array.byte3.bit1.nor1", 
                                2: "array.byte3.bit2.nor1", 3: "array.byte3.bit3.nor1", 
                                4: "array.byte3.bit4.nor1", 5: "array.byte3.bit5.nor1", 
                                6: "array.byte3.bit6.nor1", 7: "array.byte3.bit7.nor1"}},                  
            
            { name: "num4", type: "DynamicDecimal", text: "0", hexOnly: true, relative: { x: { name:"buttonsNum"}, y: { name:"array.byte4.bit0.trans" }}, 
                    digits: {0: "array.byte4.bit0.nor1", 1: "array.byte4.bit1.nor1", 
                                2: "array.byte4.bit2.nor1", 3: "array.byte4.bit3.nor1", 
                                4: "array.byte4.bit4.nor1", 5: "array.byte4.bit5.nor1", 
                                6: "array.byte4.bit6.nor1", 7: "array.byte4.bit7.nor1"}},
            
            { name: "num5", type: "DynamicDecimal", text: "0", hexOnly: true, relative: { x: { name:"buttonsNum"}, y: { name:"array.byte5.bit0.trans" }}, 
                    digits: {0: "array.byte5.bit0.nor1", 1: "array.byte5.bit1.nor1", 
                                2: "array.byte5.bit2.nor1", 3: "array.byte5.bit3.nor1", 
                                4: "array.byte5.bit4.nor1", 5: "array.byte5.bit5.nor1", 
                                6: "array.byte5.bit6.nor1", 7: "array.byte5.bit7.nor1"}},
            
            { name: "num6", type: "DynamicDecimal", text: "0", hexOnly: true, relative: { x: { name:"buttonsNum"}, y: { name:"array.byte6.bit0.trans" }}, 
                                digits: {0: "array.byte6.bit0.nor1", 1: "array.byte6.bit1.nor1", 
                                            2: "array.byte6.bit2.nor1", 3: "array.byte6.bit3.nor1", 
                                            4: "array.byte6.bit4.nor1", 5: "array.byte6.bit5.nor1", 
                                            6: "array.byte6.bit6.nor1", 7: "array.byte6.bit7.nor1"}},                  
            
            { name: "num7", type: "DynamicDecimal", text: "0", hexOnly: true, relative: { x: { name:"buttonsNum"}, y: { name:"array.byte7.bit0.trans" }}, 
                                digits: {0: "array.byte7.bit0.nor1", 1: "array.byte7.bit1.nor1", 
                                            2: "array.byte7.bit2.nor1", 3: "array.byte7.bit3.nor1", 
                                            4: "array.byte7.bit4.nor1", 5: "array.byte7.bit5.nor1", 
                                            6: "array.byte7.bit6.nor1", 7: "array.byte7.bit7.nor1"}},

            { name: "num8", type: "DynamicDecimal", text: "0", hexOnly: true, relative: { x: { name:"buttonsNum"}, y: { name:"array.byte8.bit0.trans" }}, 
                                            digits: {0: "array.byte8.bit0.nor1", 1: "array.byte8.bit1.nor1", 
                                                        2: "array.byte8.bit2.nor1", 3: "array.byte8.bit3.nor1", 
                                                        4: "array.byte8.bit4.nor1", 5: "array.byte8.bit5.nor1", 
                                                        6: "array.byte8.bit6.nor1", 7: "array.byte8.bit7.nor1"}},
                        
            { name: "num9", type: "DynamicDecimal", text: "0", hexOnly: true, relative: { x: { name:"buttonsNum"}, y: { name:"array.byte9.bit0.trans" }}, 
                                            digits: {0: "array.byte9.bit0.nor1", 1: "array.byte9.bit1.nor1", 
                                                        2: "array.byte9.bit2.nor1", 3: "array.byte9.bit3.nor1", 
                                                        4: "array.byte9.bit4.nor1", 5: "array.byte9.bit5.nor1", 
                                                        6: "array.byte9.bit6.nor1", 7: "array.byte9.bit7.nor1"}},
                        
            { name: "numA", type: "DynamicDecimal", text: "0", hexOnly: true, relative: { x: { name:"buttonsNum"}, y: { name:"array.byteA.bit0.trans" }}, 
                                            digits: {0: "array.byteA.bit0.nor1", 1: "array.byteA.bit1.nor1", 
                                                        2: "array.byteA.bit2.nor1", 3: "array.byteA.bit3.nor1", 
                                                        4: "array.byteA.bit4.nor1", 5: "array.byteA.bit5.nor1", 
                                                        6: "array.byteA.bit6.nor1", 7: "array.byteA.bit7.nor1"}},                  
                        
            { name: "numB", type: "DynamicDecimal", text: "0", hexOnly: true, relative: { x: { name:"buttonsNum"}, y: { name:"array.byteB.bit0.trans" }}, 
                                            digits: {0: "array.byteB.bit0.nor1", 1: "array.byteB.bit1.nor1", 
                                                        2: "array.byteB.bit2.nor1", 3: "array.byteB.bit3.nor1", 
                                                        4: "array.byteB.bit4.nor1", 5: "array.byteB.bit5.nor1", 
                                                        6: "array.byteB.bit6.nor1", 7: "array.byteB.bit7.nor1"}},                  

            { name: "numC", type: "DynamicDecimal", text: "0", hexOnly: true, relative: { x: { name:"buttonsNum"}, y: { name:"array.byteC.bit0.trans" }}, 
                                                        digits: {0: "array.byteC.bit0.nor1", 1: "array.byteC.bit1.nor1", 
                                                                    2: "array.byteC.bit2.nor1", 3: "array.byteC.bit3.nor1", 
                                                                    4: "array.byteC.bit4.nor1", 5: "array.byteC.bit5.nor1", 
                                                                    6: "array.byteC.bit6.nor1", 7: "array.byteC.bit7.nor1"}},
                                    
            { name: "numD", type: "DynamicDecimal", text: "0", hexOnly: true, relative: { x: { name:"buttonsNum"}, y: { name:"array.byteD.bit0.trans" }}, 
                                                        digits: {0: "array.byteD.bit0.nor1", 1: "array.byteD.bit1.nor1", 
                                                                    2: "array.byteD.bit2.nor1", 3: "array.byteD.bit3.nor1", 
                                                                    4: "array.byteD.bit4.nor1", 5: "array.byteD.bit5.nor1", 
                                                                    6: "array.byteD.bit6.nor1", 7: "array.byteD.bit7.nor1"}},
                                    
            { name: "numE", type: "DynamicDecimal", text: "0", hexOnly: true, relative: { x: { name:"buttonsNum"}, y: { name:"array.byteE.bit0.trans" }}, 
                                                        digits: {0: "array.byteE.bit0.nor1", 1: "array.byteE.bit1.nor1", 
                                                                    2: "array.byteE.bit2.nor1", 3: "array.byteE.bit3.nor1", 
                                                                    4: "array.byteE.bit4.nor1", 5: "array.byteE.bit5.nor1", 
                                                                    6: "array.byteE.bit6.nor1", 7: "array.byteE.bit7.nor1"}},                  
                                    
            { name: "numF", type: "DynamicDecimal", text: "0", hexOnly: true, relative: { x: { name:"buttonsNum"}, y: { name:"array.byteF.bit0.trans" }}, 
                digits: {0: "array.byteF.bit0.nor1", 1: "array.byteF.bit1.nor1", 
                            2: "array.byteF.bit2.nor1", 3: "array.byteF.bit3.nor1", 
                            4: "array.byteF.bit4.nor1", 5: "array.byteF.bit5.nor1", 
                            6: "array.byteF.bit6.nor1", 7: "array.byteF.bit7.nor1"}}                
                                                                        
    ],
    wires: [

        { points:[{ name:"switchA0", io: "bottom"}, { name:"decoder.node0"}]},
        { points:[{ name:"switchA1", io: "bottom"}, { name:"jointA1"}, { name:"decoder.node1"}]},
        { points:[{ name:"switchA2", io: "bottom"}, { name:"jointA2"}, { name:"decoder.node2"}]},
        { points:[{ name:"switchA3", io: "bottom"}, { name:"jointA3"}, { name:"decoder.node3"}]},

        { points:[{ name:"decoder.and0", io: "out"}, { name:"array.byte0.decoderBNode"}]},
        { points:[{ name:"decoder.and1", io: "out"}, { name:"array.byte1.decoderBNode"}]},
        { points:[{ name:"decoder.and2", io: "out"}, { name:"array.byte2.decoderBNode"}]},
        { points:[{ name:"decoder.and3", io: "out"}, { name:"array.byte3.decoderBNode"}]},
        { points:[{ name:"decoder.and4", io: "out"}, { name:"array.byte4.decoderBNode"}]},
        { points:[{ name:"decoder.and5", io: "out"}, { name:"array.byte5.decoderBNode"}]},
        { points:[{ name:"decoder.and6", io: "out"}, { name:"array.byte6.decoderBNode"}]},
        { points:[{ name:"decoder.and7", io: "out"}, { name:"array.byte7.decoderBNode"}]},
        { points:[{ name:"decoder.and8", io: "out"}, { name:"array.byte8.decoderBNode"}]},
        { points:[{ name:"decoder.and9", io: "out"}, { name:"array.byte9.decoderBNode"}]},
        { points:[{ name:"decoder.andA", io: "out"}, { name:"array.byteA.decoderBNode"}]},
        { points:[{ name:"decoder.andB", io: "out"}, { name:"array.byteB.decoderBNode"}]},
        { points:[{ name:"decoder.andC", io: "out"}, { name:"array.byteC.decoderBNode"}]},
        { points:[{ name:"decoder.andD", io: "out"}, { name:"array.byteD.decoderBNode"}]},
        { points:[{ name:"decoder.andE", io: "out"}, { name:"array.byteE.decoderBNode"}]},
        { points:[{ name:"decoder.andF", io: "out"}, { name:"array.byteF.decoderBNode"}]},

        { points:[{ name:"switch7", io: "bottom"}, { name:"sw7Joint1"}, { name:"sw7Joint2"}, { name:"array.byte0.bit7.buttonNode"}]},
        { points:[{ name:"switch6", io: "bottom"}, { name:"sw6Joint1"}, { name:"sw6Joint2"}, { name:"array.byte0.bit6.buttonNode"}]},
        { points:[{ name:"switch5", io: "bottom"}, { name:"sw5Joint1"}, { name:"sw5Joint2"}, { name:"array.byte0.bit5.buttonNode"}]},
        { points:[{ name:"switch4", io: "bottom"}, { name:"sw4Joint1"}, { name:"sw4Joint2"}, { name:"array.byte0.bit4.buttonNode"}]},
        { points:[{ name:"switch3", io: "bottom"}, { name:"sw3Joint1"}, { name:"sw3Joint2"}, { name:"array.byte0.bit3.buttonNode"}]},
        { points:[{ name:"switch2", io: "bottom"}, { name:"sw2Joint1"}, { name:"sw2Joint2"}, { name:"array.byte0.bit2.buttonNode"}]},
        { points:[{ name:"switch1", io: "bottom"}, { name:"sw1Joint1"}, { name:"sw1Joint2"}, { name:"array.byte0.bit1.buttonNode"}]},
        { points:[{ name:"switch0", io: "bottom"}, { name:"sw0Joint1"}, { name:"sw0Joint2"}, { name:"array.byte0.bit0.buttonNode"}]},

        { points:[{ name:"switchW", io: "bottom"}, { name:"array.byte0.writeANode"}]},

        { points:[{ name:"array.byte0.bit7.emitterNode"}, { name:"lt7Joint2"}, { name:"lt7Joint1"}, { name:"light7", io: "bottom"}]},
        { points:[{ name:"array.byte0.bit6.emitterNode"}, { name:"lt6Joint2"}, { name:"lt6Joint1"}, { name:"light6", io: "bottom"}]},
        { points:[{ name:"array.byte0.bit5.emitterNode"}, { name:"lt5Joint2"}, { name:"lt5Joint1"}, { name:"light5", io: "bottom"}]},
        { points:[{ name:"array.byte0.bit4.emitterNode"}, { name:"lt4Joint2"}, { name:"lt4Joint1"}, { name:"light4", io: "bottom"}]},
        { points:[{ name:"array.byte0.bit3.emitterNode"}, { name:"lt3Joint2"}, { name:"lt3Joint1"}, { name:"light3", io: "bottom"}]},
        { points:[{ name:"array.byte0.bit2.emitterNode"}, { name:"lt2Joint2"}, { name:"lt2Joint1"}, { name:"light2", io: "bottom"}]},
        { points:[{ name:"array.byte0.bit1.emitterNode"}, { name:"lt1Joint2"}, { name:"lt1Joint1"}, { name:"light1", io: "bottom"}]},
        { points:[{ name:"array.byte0.bit0.emitterNode"}, { name:"lt0Joint2"}, { name:"lt0Joint1"}, { name:"light0", io: "bottom"}]}
    ]
}
