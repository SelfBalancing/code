// PropagatingCpuBoxesLib.js (c) Charles Petzold, 2024

class CpuBox extends TriStateBox
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);

        this.labelMap = new Map();
        this.labelFont = "bold 18px " + this.fontFamily;
    }

    setProperty(prop, value)
    {
        switch(prop)
        {
            case "labels":
                let labels = value;

                for (let label of labels)
                {
                     this.labelMap.set(label.text, {x: label.x, y:label.y, hidden: label.hidden});        
                }
                break;

            default:
                super.setProperty(prop, value);
                break;
        }
    }

    render()
    {
        this.ctx.save();
        this.applyGlobalTransform();
        this.applyLocalTransform();

        // Clear area first
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.restore();

        // Then let base class do its thing
        super.render();

        // Now do the labels
        for (let [text, coords] of this.labelMap)
        {
            if (coords.hidden)
                continue; 

            // Resolve formatting variables    
            let displayText = text;
            let leftBrace = 0;

            while ((leftBrace = displayText.indexOf("{", leftBrace)) != -1)
            {
                // Assumes one digit index
                let index = parseInt(displayText.substr(leftBrace + 1, 1));
                let rtBrace = displayText.indexOf("}", leftBrace);
                let format = displayText.substr(leftBrace + 3, rtBrace - leftBrace - 3);
                let str = null;

                if (format == "S")
                {
                    str = this.getLabelString(index);
                }
                else
                {
                    let num = this.getLabelNumber(index)

                    if (!isNaN(num))
                    {   
                        switch (format)
                        {
                            case "X2":
                                str = num.toString(16).toUpperCase().padStart(2, "0");
                                break;

                            case "X4":
                                str = num.toString(16).toUpperCase().padStart(4, "0");
                                break;
                        }
                    }
                    else
                    {
                        str = null;
                    }
                }
                if (str == null)
                {
                    displayText = "";
                    break;
                }

                displayText = displayText.replace(displayText.substr(leftBrace, rtBrace - leftBrace + 1), str);
                leftBrace++;
            }

            this.ctx.save();
            this.ctx.font = this.labelFont;
            this.ctx.fillStyle = "#000000";

            let pt = {x:this.width * coords.x, y:this.height * coords.y};
            pt = this.xformGlobal(pt.x, pt.y);
            pt = this.xformLocal(pt);
            this.centerText(displayText, pt.x, pt.y);

            this.ctx.restore();
        }
    }

    getLabelString(index)
    {
        return null;
    }

    getLabelNumber(index)
    {
        return NaN;
    }
}

class InstructionDecoder extends CpuBox
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);

        this.cyFlag = false;
        this.zFlag = false;
        this.sFlag = false;
    
        this.fetchSignals = ["pcen", "ramen"];
        this.fetchPulseSignals = [["idclk", "l1clk"], ["idclk", "l2clk"], ["idclk", "l3clk"]];
        this.incrementSignals = ["incen"];
        this.incrementPulseSignals = ["pcclk"];

        this.resetSignals = [
                            "l1clk", "l2clk", "l3clk", "l2en", "l23en",
                            "pcclk", "pcen", 
                            "ramen", "ramwr",
                            "idclk", "incen", "decen",
                            "raclk", "raen", "accclk", "accen",
                            "hlsel", "hlclk", "hlen",
                            "aluclk", "aluen"    
                            ];

        this.cycleSignals = [];
        this.pulseSignals = [];

        this.cycleLabels = ["Fetch 1", "Fetch 1 Pulse", "Fetch 1", 
                            "PC Increment", "PC Increment Pulse", "PC Increment", 
                            "Fetch 2", "Fetch 2 Pulse", "Fetch 2", 
                            "PC Increment", "PC Increment Pulse", "PC Increment", 
                            "Fetch 3", "Fetch 3 Pulse", "Fetch 3", 
                            "PC Increment", "PC Increment Pulse", "PC Increment", 
                            "Execute 1", "Execute 1 Pulse", "Execute 1", 
                            "Execute 2", "Execute 2 Pulse", "Execute 2"];

        this.reset();
    }

    reset()
    {
        this.clock = false;         // true for up; false for down
        this.clockCount = NaN;      // 0, 1, 2, 3 for clock ups and downs during cycle

        this.opcode = NaN;                          
        this.operations = null;

        this.beginExecution = true;
        this.isFetch = false;
        this.isIncrement = false;
        this.isExecute = false;
        this.fetchNumber = 0;
        this.executeNumber = 0;

        this.signalOut(this.resetSignals, false);
    }

    setInput(inp, value)
    {
        switch(inp)
        {
            case "clock":
                if (this.clock != value)            // only process transitions
                {
                    this.processClock(value);       // value is true for up transition; false for down
                    this.clock = value;
                }
                break;

            case "reset":
                if (value)          // up transition
                {
                    this.reset();
                }

                this.propagate("pcreset", value)
                
                break;

            case "opcode":
                this.opcode = value;

                if (!isNaN(this.opcode))
                {
                    this.operations = this.getOperations(this.opcode);

                    this.propagate("s0", (this.opcode & 1) != 0);
                    this.propagate("s1", (this.opcode & 2) != 0);
                    this.propagate("s2", (this.opcode & 4) != 0);

                    this.propagate("d0", (this.opcode & 8) != 0);
                    this.propagate("d1", (this.opcode & 16) != 0);
                    this.propagate("d2", (this.opcode & 32) != 0);

                    this.propagate("f0", (this.opcode & 8) != 0);
                    this.propagate("f1", (this.opcode & 16) != 0);
                    this.propagate("f2", (this.opcode & 32) != 0);
                }
                else
                {
                    this.propagate("s0", false);
                    this.propagate("s1", false);
                    this.propagate("s2", false);

                    this.propagate("d0", false);
                    this.propagate("d1", false);
                    this.propagate("d2", false);

                    this.propagate("f0", false);
                    this.propagate("f1", false);
                    this.propagate("f2", false);                
                }

                break;

            case "cyflag":
                this.cyFlag = value;
                break;

            case "zflag":
                this.zFlag = value;
                break;

            case "sflag":
                this.sFlag = value;
                break;
        }
        this.render();
    }

    processClock(upTransition)
    {
        if (upTransition)
        {
            if (isNaN(this.clockCount))
            {
                this.beginExecution = true;

                this.clockCount = 0;
                this.opcode = NaN;

                this.isFetch = false;
                this.isIncrement = false;
                this.isExecute = false;

                this.fetchNumber = 0;
                this.executeNumber = 0;
            }
            else
            {
                this.clockCount++;
            }
        }
        else // down transition
        {
            this.clockCount++;
        }

        this.clockCount %= 4;

        // clockCount is: 0 (beginning of cycle), 1 (nothing to be done), 2 (pulse), 3 (after pulse)

        switch (this.clockCount)
        {
            case 0:
                this.signalOut(this.cycleSignals, false);     // turn off signals from last cycle

                if (this.beginExecution)
                {
                    this.beginExecution = false;
                    this.isFetch = true;
                    this.fetchNumber = 0;           // meaning the first fetch
                }
                else if (this.isFetch)
                {
                    this.isFetch = false;
                    this.isIncrement = true;        // PC increment
                }
                else if (this.isIncrement)
                {
                    this.isIncrement = false;

                    if (++this.fetchNumber == this.operations.fetchCount)       // no more fetch cycles
                    {
                        this.isExecute = true;
                        this.executeNumber = 0;
                    }
                    else
                    {
                        this.isFetch = true;
                    }
                }
                else if (this.isExecute)
                {
                    if (++this.executeNumber == this.operations.executeCount)      // no more execution cycles
                    {
                        this.isExecute = false;
                        this.isFetch = true;
                        this.fetchNumber = 0;
                    }
                }

                if (this.isFetch)
                    this.cycleSignals = this.fetchSignals;

                else if (this.isIncrement)
                {
                    // Don't increment the Program Counter if the opCode is HLT!
                    this.cycleSignals = this.opcode == 0x76 ? ["pcen"] : this.incrementSignals;
                }

                else if (this.isExecute)
                    this.cycleSignals = this.executeNumber == 0 ? this.operations.ec1 : this.operations.ec2;

                this.signalOut(this.cycleSignals, true);
                break;

            case 1:
                break;

            case 2:
                if (this.isFetch)
                    this.pulseSignals = this.fetchPulseSignals[this.fetchNumber];

                else if (this.isIncrement)
                {
                    // Don't increment the Program Counter if the opCode is HLT!
                    this.pulseSignals = this.opcode == 0x76 ? ["pcclk"] : this.incrementPulseSignals;
                }

                else if (this.isExecute)
                    this.pulseSignals = this.executeNumber == 0 ? this.operations.ep1 : this.operations.ep2;

                this.signalOut(this.pulseSignals, true);
                break;
                
            case 3:
                this.signalOut(this.pulseSignals, false);
                break;
        }

        this.render();          // to update labels
    }

    signalOut(array, state)
    {
        array.forEach(signal => this.propagate(signal, state)); 
    }

    getLabelString(index)
    {
        let returnValue = null;

        switch (index)
        {
            case 0:
                if (!this.beginExecution)
                {
                    let cycleLabelIndex = 0;
                    
                    if (this.isFetch || this.isIncrement)
                        cycleLabelIndex = 6 * this.fetchNumber;

                    if (this.isIncrement)
                        cycleLabelIndex += 3;

                    if (this.isExecute)
                        cycleLabelIndex = 18 + 3 * this.executeNumber;

                    cycleLabelIndex += this.clockCount - (this.clockCount > 0 ? 1 : 0);
                    returnValue = this.cycleLabels[cycleLabelIndex];
                }
                break;

            case 2:     // opcode description
                if (this.isFetch && this.fetchNumber == 0 && this.clockCount < 2)
                {
                    returnValue = null;
                }
                else 
                {
                    returnValue = opcodeMnemonics[this.opcode];
                }
                break;
        }

        return returnValue;
    }

    getLabelNumber(index)
    {
        let returnValue = NaN;

        if (!(this.isFetch && this.fetchNumber == 0 && this.clockCount < 2))
        {
            returnValue = this.opcode;
        }

        return returnValue;
    }

    // Only implemented opcodes
    getOperations(opcode)
    {
        let ops = {fetchCount: 1, executeCount: 1, ec1: [], ep1: [], ec2: [], ep2: []};

        let movgrp = (opcode & 0xC0) == 0x40;
        let algrp = (opcode & 0xC0) == 0x80;
        let memsrc = (opcode & 0x07) == 0x06;
        let memdst = (opcode & 0x38) == 0x30;
        let mvigrp = (opcode & 0xC7) == 0x06;
        let ADI = (opcode & 0xC7) == 0xC6; 
        let INX = opcode == 0x23;
        let DCX = opcode == 0x2B;
        let LDA = opcode == 0x3A;
        let STA = opcode == 0x32;

        let MOVrr = movgrp && !memsrc && !memdst;
        let MOVrm = movgrp && memsrc && !memdst;
        let MOVmr = movgrp && memdst && !memsrc;
        let HLT = movgrp && memsrc && memdst;       // Not used in code
        let MVIr = mvigrp && !memdst;
        let MVIm = mvigrp && memdst;
        let ADDr = algrp && !memsrc;
        let ADDm = algrp && memsrc;

        // Jump instructions only implemented when this.params.cpuIncludeJumps
        // So set them to false initially
        let JMP = false;
        let JNZ = false;
        let JZ = false;
        let JNC = false;
        let JC = false;
        let JP = false;
        let JM = false;
        let PCHL = false;

        let jmpgrp = false;
        let conditionalJump = false;

        if (this.params.cpuIncludeJumps)
        {
            JMP = opcode == 0xC3;
            JNZ = opcode == 0xC2;
            JZ = opcode == 0xCA;
            JNC = opcode == 0xD2;
            JC = opcode == 0xDA;
            JP = opcode == 0xF2;
            JM = opcode == 0xFA;
            PCHL = opcode == 0xE9;

            jmpgrp = JMP || JNZ || JZ || JNC || JC || JP || JM;
            conditionalJump = (JNZ && !this.zFlag) || 
                              (JZ && this.zFlag) ||
                              (JNC && !this.cyFlag) ||
                              (JC && this.cyFlag) ||
                              (JP && !this.sFlag) ||
                              (JM && this.sFlag);
        }

        if (MVIr || MVIm || ADI)
            ops.fetchCount = 2;

        if (LDA || STA || jmpgrp)
            ops.fetchCount = 3;
            
        if (ADI || ADDr || ADDm || INX || DCX)
            ops.executeCount = 2;      

        // Address Bus -- page 374
        if (MOVrm || MOVmr || MVIm || ADDm || INX || DCX)
            ops.ec1.push("hlen");

        if (LDA || STA)
            ops.ec1.push("l23en");

        if (INX || DCX)
        {
            ops.ec1.push("hlsel");
            ops.ep1.push("idclk");
            ops.ep2.push("hlclk");
        }
            
        if (INX)
            ops.ec2.push("incen");
            
        if (DCX)
            ops.ec2.push("decen");

        // Address Bus additionals for jumps -- page 389
        if (JMP || conditionalJump)
            ops.ec1.push("l23en");

        if (PCHL)
            ops.ec1.push("hlen");

        if (JMP || conditionalJump || PCHL)
            ops.ep1.push("pcclk");

        // Data Bus -- pages 375 and 376
        if (MOVrr)
        {
            ops.ec1.push("raen");                    
            ops.ep1.push("raclk");
        }

        if (MOVrm)
        {
            ops.ec1.push("ramen");
            ops.ep1.push("raclk");
        }

        if (MOVmr)
        {
            ops.ec1.push("raen");
            ops.ep1.push("ramwr");
        }

        if (MVIr)
        {
            ops.ec1.push("l2en");
            ops.ep1.push("raclk");
        }

        if (MVIm)
        {
            ops.ec1.push("l2en");
            ops.ep1.push("raclk");
        }

        if (ADDr)
        {
            ops.ec1.push("raen");
            ops.ep1.push("aluclk");
        }

        if (ADDm)
        {
            ops.ec1.push("ramen");
            ops.ep1.push("aluclk");
        }

        if (ADI)
        {
            ops.ec1.push("l2en");
            ops.ep1.push("aluclk");
        }

        if (LDA)
        {
            ops.ec1.push("ramen");
            ops.ep1.push("accclk");
        }

        if (STA)
        {
            ops.ec1.push("accen");
            ops.ep1.push("ramwr");
        }

        if (ADDr || ADDm || ADI)
        {
            ops.ec2.push("aluen");
            ops.ep2.push("accclk");
        }

        return ops;
    }
}

class InstructionLatches extends CpuBox
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);
        
        this.input = NaN;

        this.l1Clock = false;
        this.l2Clock = false;
        this.l3Clock = false;

        this.latch1 = 0;
        this.latch2 = 0;
        this.latch3 = 0;

        this.enable2 = false;
        this.enable23 = false;
    }

    render()
    {
        super.render();
        this.propagate("l1Out", this.latch1);
    }

    getLabelNumber(index)
    {
        let returnValue = NaN;

        switch (index)
        {
            case 0: returnValue = this.latch1;  break;
            case 1: returnValue = this.latch2;  break;
            case 2: returnValue = this.latch3;  break; 
        }

        return returnValue;
    }

    setInput(inp, value)
    {
        switch(inp)
        {
            case "input": 
                this.input = value;
                break; 

            case "l1Clock": 
                if (!this.l1Clock & value)
                {
                    this.latch1 = this.input;
                }
                this.l1Clock = value;
                break;

            case "l2Clock":
                if (!this.l2Clock & value)
                {
                    this.latch2 = this.input;
                }
                this.l2Clock = value;
                break;

            case "l3Clock":
                if (!this.l3Clock & value)
                {
                    this.latch3 = this.input;
                }
                this.l3Clock = value;
                break;

            case "l2Enable":
                this.enable2 = value;
                break;

            case "l23Enable":
                this.enable23 = value;
                break; 
        }

        this.propagate("l1Out", this.latch1);

        if (inp != "input")
        {
            this.propagateTriStates("data", this.enable2, this.latch2);
            this.propagateTriStates("addr", this.enable23, (this.latch3 << 8) || this.latch2);
        }

        this.render();
    }
}

class ProgramCounter extends CpuBox
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);

        this.input = NaN;
        this.latch = 0;
        this.enable = false;
        this.clock = false;
    }

    getLabelNumber(index)
    {
        if (index == 0)
            return this.latch; 
    }

    setInput(inp, value)
    {
        switch (inp)
        {
            case "input":
                this.input = value;
                break;

            case "clock":
                if (!this.clock && value)       // upward transition
                {
                    this.latch = this.input;
                }
                this.clock = this.value;
                break;

            case "enable":
                this.enable = value;
                break;

            case "reset":
                this.latch = 0;
                break;
        }
        this.render();

        if (inp != "input")
        {
            this.propagateTriStates("addr", this.enable, this.latch);
        }
    }
}

class IncrementerDecrementer extends CpuBox
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);

        this.input = NaN;
        this.latch = 0;
        this.clock = false;
        this.incrementEnable = false;
        this.decrementEnable = false;
    }

    getLabelNumber(index)
    {
        if (index == 0)
            return this.latch; 
    }    
    
    setInput(inp, value)
    {
        switch (inp)
        {
            case "input":
                this.input = value;
                break;

            case "clock":
                if (!this.clock & value)    // upward transition
                {
                    this.latch = this.input;
                }
                this.clock = value;
                break;
                
            case "incEnable":
                this.incrementEnable = value;
                break;

            case "decEnable":
                this.decrementEnable = value;
                break;
        }

        if (inp != "input")
        {
            this.propagateTriStates("addr", this.incrementEnable, (this.latch + 1) % 65536);

            if (!this.incrementEnable)      // so doesn't undo the previous call
                this.propagateTriStates("addr", this.decrementEnable, (this.latch - 1) % 65536);
        }
        this.render;
    }
}

class RegisterArray extends CpuBox
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);

        this.input = 0;
        this.input16 = 0;

        this.registers = [0, 0, 0, 0, 0, 0, 0, 0];
        this.selectSrc = 0;      // NaN;
        this.selectDst = 0;     // NaN;

        this.clock = false;
        this.enable = false;
        this.accClock = false;
        this.accEnable = false;

        this.hlSelect = false;
        this.hlClock = false;
        this.hlEnable = false;
    }

    getLabelNumber(index)
    {
        return this.registers[index]; 
    }

    getLabelString(index)
    {
        let regs = ["B", "C", "D", "E", "H", "L", "M", "A"];

        // TODO CHECK IF NaN!
        if (index == 8)
            return regs[this.selectSrc];

        if (index == 9)
            return regs[this.selectDst];            
    }

    setInput(inp, value)
    {
        switch (inp)
        {
            case "input":
                this.input = value;
                break;

            case "input16":
                this.input16 = value;
                break; 

            case "s2": if (!isNaN(value)) { this.selectSrc &= 3; this.selectSrc |= value << 2; } break;
            case "s1": if (!isNaN(value)) { this.selectSrc &= 5; this.selectSrc |= value << 1; } break;
            case "s0": if (!isNaN(value)) { this.selectSrc &= 6; this.selectSrc |= value; } break;

            case "d2": if (!isNaN(value)) { this.selectDst &= 3; this.selectDst |= value << 2; } break;
            case "d1": if (!isNaN(value)) { this.selectDst &= 5; this.selectDst |= value << 1; } break;
            case "d0": if (!isNaN(value)) { this.selectDst &= 6; this.selectDst |= value; } break;

            case "clock":
                if (!this.clock & value)      // upward transition
                {
                    this.registers[this.selectDst] = this.input;
                }
                this.clock = value;
                break;

            case "enable":
                this.enable = value;
                break;

            case "accClock":
                if (!this.accClock & value)
                {
                    this.registers[7] = this.input;
                }
                this.accClock = value;
                break;

            case "accEnable":
                this.accEnable = value;
                break;

            case "hlsel":
               this.hlSelect = value;
                break;

            case "hlclk":
                if (!this.hlClock & value)
                {
                    this.registers[4] = this.input16 >> 8;
                    this.registers[5] = this.input16 & 255;
                }
                this.hlClock = value;
                break;

            case "hlen":
                this.hlEnable = value;
                break;
        }

        this.propagate("acc", this.registers[7]);

        if (inp != "input" && inp != "input16")
        {
            this.propagateTriStates("data", this.accEnable, this.registers[7]);

            if (!this.accEnable)        // so doesn't undo the previous call
                this.propagateTriStates("data", this.enable, this.registers[this.selectSrc]);

            this.propagateTriStates("addr", this.hlEnable, (this.registers[4] << 8) || this.registers[5]);
        }

        this.render();
    }
}

class ArithmeticLogicUnit extends CpuBox
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);

        this.A = 0;
        this.B = 0;

        // Preliminary calculation for display
        this.prelim = {result: 0, cyFlag: false, zFlag: false, sFlag: false};

        // Latched values
        this.result = 0;
        this.cyFlag = false;
        this.zFlag = false;
        this.sFlag = false;

        this.function = 0;

        this.clock = false;
        this.enable = false;
    }

    getLabelString(index)
    {
        let returnResult = null;
        
        if (index == 0)
            returnResult = ["ADD", "ADC", "SUB", "SBB", "ANA", "XRA", "ORA", "CMP"][this.function]; 

        return returnResult;
    }

    getLabelNumber(index)
    {
        let returnResult = NaN;

        if (index == 1)
            returnResult = this.prelim.result;

        return returnResult;            
    }

    setInput(inp, value)
    {
        switch (inp)
        {
            case "a":
                this.A = value;
                this.calc = this.calculate();
                break;

            case "b":
                this.B = value;
                this.calc = this.calculate();
                break;                

            case "f2": if (!isNaN(value)) { this.function &= 3; this.function |= value << 2;  this.calculate(); } break;
            case "f1": if (!isNaN(value)) { this.function &= 5; this.function |= value << 1;  this.calculate(); } break;
            case "f0": if (!isNaN(value)) { this.function &= 6; this.function |= value;  this.calculate(); } break;

            case "clock":
                if (!this.clock & value)      // upward transition
                {
                    this.result = this.prelim.result;
                    this.cyFlag = this.prelim.cyFlag;
                    this.zFlag = this.prelim.zFlag;
                    this.sFlag = this.prelim.sFlag; 
                }
                this.clock = value;
                break;

            case "enable":
                this.enable = value;
                break;
        }

        this.propagate("cyflag", this.cyFlag);
        this.propagate("zflag", this.zFlag);
        this.propagate("sflag", this.sFlag);

        if (inp != "b")
        {
            this.propagateTriStates("data", this.enable, this.result);
        }

        this.render();
    }

    calculate()
    {
        switch (this.function)
        {
            case 0:     // ADD
                let add = this.A + this.B
                this.prelim.result = 255 & add;
                this.prelim.cyFlag = add > 255;
                break;

            case 1:     // ADC
                let adc = this.A + this.B + this.cyFlag;
                this.prelim.result = 255 & adc;
                this.prelim.cyFlag = adc > 255;
                break;

            case 2:     // SUB
                let sub = this.A - this.B;
                this.prelim.result = 255 & sub;
                this.prelim.cyFlag = sub < 0;
                break;

            case 3:     // SBB
                let sbb = this.A - this.B - this.cyFlag;
                this.prelim.result = 255 & sbb;
                this.prelim.cyFlag = sbb < 0;
                break;

            case 4:     // ANA
                this.prelim.result = this.A & this.B;
                this.prelim.cyFlag = false;
                break;
                
            case 5:     // XRA
                this.prelim.result = this.A ^ this.B;
                this.prelim.cyFlag = false;
                break;

            case 6:     // ORA
                this.prelim.result = this.A | this.B;
                this.prelim.cyFlag = false;
                break;

            case 7:     // CMP
                let cmp = this.A - this.B;
                this.prelim.result = this.A;
                this.prelim.cyFlag = cmp < 0;
                this.prelim.zFlag = cmp == 0;
                break;
        }

        if (this.function != 7)
            this.prelim.zFlag = this.prelim.result == 0;

        this.prelim.sFlag = this.prelim.result > 127;
    }
}