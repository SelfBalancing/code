// I8080Assembler (c) Charles Petzold, 2024

class I8080Assembler
{
    constructor()
    {
    }

    // Input is an array of strings, each string a statement
    setSource(src)
    {
        this.src = src;
    }

    // Returns true for success and false for failure
    assemble()
    {
        // Available externally after assembly is competed
        this.machineCode = new Array(65536).fill(0);
        this.instructions = [];
        this.error = null;

        // For internal use
        this.equsMap = new Map();       // equ statements
        this.labelsMap = new Map();     // labels
        this.pc = 0;                    // program counter

        // Basic checks for bad input
        if (this.src == undefined)
        {
            this.error = {message: "No program source has been set"};
            return false;
        }
            
        if (this.src == null)
        {
            this.error = {message: "Program source is null"};
            return false;
        }

        if (!Array.isArray(this.src))
        {
            this.error = {message: "Program source must be an array of strings"};
            return false;
        }

        if (this.src.count == 0)
        {
            this.error = {message: "The program source code array is empty"};
            return false;
        }

        // Parse individual lines
        for (let lineNum = 0; lineNum < this.src.length; lineNum++)
        {
            // An instruction can have several properties:
            //      error: if defined indicates a parsing error
            //      linenum: set at the end of this loop
            //      codes: an array of byte opcodes
            //      byteExpression: an expression that resolves to a byte (as in MVI)
            //      wordExpression: an expression that resolves to a word (as in JMP)
            //      byteValues: an array of byte expressions (as in DB)
            //      wordValues: an array of word expressions (as in DW)
            let instruction = this.parse(this.src[lineNum]);

            // A null instruction object indicates an empty line
            if (instruction == null)
                continue;
            
            // An error property indicates a parsing error
            if (instruction.error != undefined)
            {
                this.error = {line: lineNum, message: instruction.error};
                return false;
            }

            // Set the lineNum property
            instruction.lineNum = lineNum;

            // Save the instruction objects in an array
            this.instructions.push(instruction);
        }

        // Resolve expressions by inserting values or address in machine code bytes
        for (let inst = 0; inst < this.instructions.length; inst++)
        {
            // Instructions such as MVI that reference a byte value
            if (this.instructions[inst].byteExpression != undefined)
            {
                let result = this.evaluateByteExpression(this.instructions[inst].byteExpression);

                if (result.error != undefined)
                {
                    this.error = { line: this.instructions[inst].lineNum, message: result.error };
                    return false;
                }

                this.instructions[inst].codes[1] = result.value;
            }

            // Instructions such as JMP that reference a word value
            else if (this.instructions[inst].wordExpression != undefined)
            {
                let result = this.evaluateWordExpression(this.instructions[inst].wordExpression);

                if (result.error != undefined)
                {
                    this.error = { line: this.instructions[inst].lineNum, message: result.error };
                    return false;
                }

                this.instructions[inst].codes[1] = 255 & result.value;
                this.instructions[inst].codes[2] = 255 & (result.value >> 8);
            }

            // DB statement for multiple byte values
            else if (this.instructions[inst].byteValues != undefined)
            {
                let bytes = this.instructions[inst].byteValues;

                for (let i = 0; i < bytes.length; i++)
                {
                    let result = this.evaluateByteExpression(bytes[i]);

                    if (result.error != undefined)
                    {
                        this.error = { line: this.instructions[inst].lineNum, message: result.error };
                        return false;
                    }

                    this.instructions[inst].codes[i] = result.value;
                }
            }

            // DW statement for multiple word values 
            else if (this.instructions[inst].wordValues != undefined)
            {
                let words = this.instructions[inst].wordValues;

                for (let i = 0; i < words.length; words++)
                {
                    let result = this.evaluateWordExpression(words[i]);

                    if (result.error != undefined)
                    {
                        this.error = { line: this.instructions[inst].lineNum, message: result.error };
                        return false;
                    }

                    this.instructions[inst].codes[2 * i] = 255 & result.value;
                    this.instructions[inst].codes[2 * i + 1] = 255 & (result.value >> 8);
                }
            }
        }

        // Loop through instructions again to generate machine code
        for (let inst = 0; inst < this.instructions.length; inst++)
        {
            for (let code = 0; code < this.instructions[inst].codes.length; code++)
            {
                let pc = this.instructions[inst].pc;
                this.machineCode[pc + code] = this.instructions[inst].codes[code]; 
            }
        }

        return true;
    }

    // Parse each line into machine code bytes with possible unresolved bytes and words
    // Returns an instruction object
    parse(line)
    {
        if (typeof line !== "string")
        {
            return {error: "Line is not a string"};
        }

        // Get rid of semicolon comments    
        let semicolon = line.indexOf(";");

        if (semicolon != -1)
        {
            line = line.substring(0, semicolon);
        }

        // Check for anything left
        line = line.trim();

        if (line.length == 0)
            return null; 
        
        // Replace tabs with spaces for easier indexOf calls
        line = line.replace("\t", " ");

        // Check for EQU 
        let equ = line.split(/\s+/);        // split on one or more spaces

        if (equ.length > 1 && equ[1].toUpperCase() == "EQU")
        {
            if (equ.length != 3)
            {
                return { error: "EQU directive must have value"};
            }

            let label = equ[0];

            let result = this.evaluateWordExpression(equ[2]);

            this.equsMap.set(label, result.value);
            return null;
        }

        if (line.charAt(0) == ":")
            return {error: "Line cannot begin with colon"};

        // Check for label
        let label = null;            
        let colon = line.indexOf(":");

        if (colon != -1)
        {
            label = line.substring(0, colon).trim();        // Allows space before colon. Is that right?

            if (!this.checkLegalLabel(label))
                return {error: "\"" + label + "\" is not a legal label"};

            // A line with only a label
            if (label != null)
            {
                if (this.labelsMap.has(label))
                {
                    return { error: "Duplicate label"};
                    
                }
    
                this.labelsMap.set(label, this.pc);
            }

            line = line.substring(colon + 1).trim();
    
            if (line.length == 0)
            {
                return { labelDef: label, codes: []};
            }
        }

        // Extract the mnemonic
        let space = line.indexOf(" ");
        if (space == -1)
            space = line.length;

        // Store the mnemonic in uppercase to ease comparisons
        let mnemonic = line.substring(0, space).toUpperCase();

        // Extract the arguments
        let args = line.substring(space + 1).trim();
        let arg1 = null;
        let arg2 = null;

        if (args.length > 0)
        {
            let comma = args.indexOf(",");

            if (comma == -1)
            {
                arg1 = args;
            }
            else
            {
                arg1 = args.substring(0, comma).trim();
                arg2 = args.substring(comma + 1).trim();
            }
        }

        // Use an instruction object to save results from each line        
        let instruction = null;
        let result = {};

        switch (mnemonic)       // uppercase
        {
            // Directives
            case "CPU":
                if (arg1 == null || arg2 != null)
                {
                    instruction = {error: "Instruction requires one argument"};
                    break;
                }

                let cpu = this.evaluateNumber(arg1); // .numericValue(arg1, 16);

                if (cpu.error != undefined || cpu.value != 8080)
                {
                    instruction = { error: "Argument of CPU directive must be 8080"};
                }
                break;

                // TODO!!!!

            case "END":
                break;

            case "ORG":
                if (arg1 == null || arg2 != null)
                {
                    instruction = {error: "Instruction requires one argument"};
                    break;
                }

                result = this.evaluateNumber(arg1); // numericValue(arg1, 16);

                if (result.error != undefined)
                {
                    instruction = { error: "Argument must be a word value"};
                    break;
                }

                this.pc = result.value;
    
                instruction = {org: result.value, codes: []};
                break;

                // TODO: Check if empty!!!

            case "DW":
                if (args.length == 0)
                {
                    instruction = { error: "Instruction requires at least one argument" };
                    return;
                }

                let wordVals = args.split(',');
                instruction = { codes: new Array(2 * wordVals.length).fill(0), wordValues: wordVals };
                break;
    
            case "DB":
                if (args.length == 0)
                {
                    instruction = { error: "Instruction requires at least one argument" };
                    return;
                }

                // The function doesn't split if the comma is in a string!
                let tokens = this.splitCommas(args); // args.split(',');
                let byteVals = [];

                for (let i = 0; i < tokens.length; i++)
                {
                    let token = tokens[i].trim();

                    if (token.length > 2 && 
                            (token[0] == "\'" && token[token.length - 1] == "\'") ||
                            (token[0] == "\"" && token[token.length - 1] == "\""))
                    {
                        for (let i = 1; i < token.length - 1; i++)
                        {
                            byteVals.push("\'" + token[i] + "\'");
                        }
                    }
                    else
                    {
                        byteVals.push(token);
                    }
                }

                instruction = { codes: new Array(byteVals.length).fill(0), byteValues: byteVals };
                break;

            case "DS":
                if (arg1 == null | arg2 != null)
                {
                    instruction = {error: "Instruction requires one argument"};
                    break;
                }
    
                result = this.evaluateNumber(arg1); // numericValue(arg1, 16);
    
                if (result.error != undefined)
                {
                    instruction = { error: "Argument must be a numeric value"};
                    break;
                }
        
                instruction = { codes: new Array(result.value).fill(0) };
                break;

            // Data Transfer Group
            case "MOV":
                instruction = this.twoArgRegOrM(0x40, arg1, arg2);
                break;

            case "MVI":
                instruction = this.twoArgRegData(0x06, arg1, arg2);
                break;

            case "LXI":
                instruction = this.twoArgRpData(0x01, arg1, arg2);
                break;

            case "LDA":
                instruction = this.addrOrLabel(0x3A, arg1, arg2);
                break;

            case "STA":
                instruction = this.addrOrLabel(0x32, arg1, arg2);
                break;

            case "LHLD":
                instruction = this.addrOrLabel(0x2A, arg1, arg2);
                break;            

            case "SHLD":
                instruction = this.addrOrLabel(0x22, arg1, arg2);
                break;          
            
            case "LDAX":
                instruction = this.rpBcOrDe(0x0A, arg1, arg2);
                break;

            case "STAX":
                instruction = this.rpBcOrDe(0x02, arg1, arg2);
                break;

            case "XCHG":
                instruction = this.noArgs(0xEB, arg1, arg2);
                break;
    
            // Arithmetic and Logical Group
            case "ADD":
            case "ADC":
            case "SUB":
            case "SBB":                
            case "ANA":
            case "XRA":
            case "ORA":
            case "CMP":
                instruction = this.srcRegOrM(0x80 | (["ADD", "ADC", "SUB", "SBB", "ANA", "XRA", "ORA", "CMP"].indexOf(mnemonic) << 3), arg1, arg2);
                break;

            case "ADI":
            case "ACI":
            case "SUI":
            case "SBI":
            case "ANI":
            case "XRI":
            case "ORI":
            case "CPI":
                instruction = this.immByte(0xC6 | (["ADI", "ACI", "SUI", "SBI", "ANI", "XRI", "ORI", "CPI"].indexOf(mnemonic) << 3), arg1, arg2);
                break;

            // Arithmetic Group
            case "INR":
                instruction = this.dstRegOrM(0x04, arg1, arg2);
                break;
                
            case "DCR":
                instruction = this.dstRegOrM(0x05, arg1, arg2);
                break;

            case "INX":
                instruction = this.dstRp(0x03, arg1, arg2);
                break;

            case "DCX":
                instruction = this.dstRp(0x0B, arg1, arg2);
                break;

            case "DAD":
                instruction = this.dstRp(0x09, arg1, arg2);
                break;

            case "DAA":
                instruction = this.noArgs(0x27, arg1, arg2);
                break;

            // Logical Group
            case "RLC":
                instruction = this.noArgs(0x07, arg1, arg2);
                break;
                
            case "RRC":
                instruction = this.noArgs(0x0F, arg1, arg2);
                break;
                
            case "RAL":
                instruction = this.noArgs(0x17, arg1, arg2);
                break;

            case "RAR":
                instruction = this.noArgs(0x1F, arg1, arg2);
                break;
                
            case "CMA":
                instruction = this.noArgs(0x2F, arg1, arg2);
                break;
                
            case "CMC":
                instruction = this.noArgs(0x3F, arg1, arg2);
                break;

            case "STC":
                instruction = this.noArgs(0x37, arg1, arg2);
                break;
   
            // Branch Group
            case "JMP":
                instruction = this.addrOrLabel(0xC3, arg1, arg2);
                break;

            case "JNZ":
            case "JZ":
            case "JNC":
            case "JC":
            case "JPO":
            case "JPE":
            case "JP":
            case "JM":
                instruction = this.addrOrLabel(0xC2 | (["JNZ", "JZ", "JNC", "JC", "JPO", "JPE", "JP", "JM"].indexOf(mnemonic) << 3), arg1, arg2);
                break;

            case "CALL":
                instruction = this.addrOrLabel(0xCD, arg1, arg2);
                break;

            case "CNZ":
            case "CZ":
            case "CNC":
            case "CC":
            case "CPO":
            case "CPE":
            case "CP":
            case "CM":
                instruction = this.addrOrLabel(0xC4 | (["CNZ", "CZ", "CNC", "CC", "CPO", "CPE", "CP", "CM"].indexOf(mnemonic) << 3), arg1, arg2);
                break;

            case "RET":
                instruction = this.noArgs(0xC9, arg1, arg2);
                break;
        
            case "RNZ":
            case "RZ":
            case "RNC":
            case "RC":
            case "RPO":
            case "RPE":
            case "RP":
            case "RM":
                instruction = this.noArgs(0xC0 | (["RNZ", "RZ", "RNC", "RC", "RPO", "RPE", "RP", "RM"].indexOf(mnemonic) << 3), arg1, arg2);
                break;
        
            case "RST":
                instruction = this.restartNum(0xC7, arg1, arg2);
                break;

            case "PCHL":
                instruction = this.noArgs(0xE9, arg1, arg2);
                break;

            // Stack, I/O, and Machine Control Group
            case "PUSH":
                instruction = this.pushPop(0xC5, arg1, arg2);
                break;

            case "POP":
                instruction = this.pushPop(0xC1, arg1, arg2);
                break;
    
            case "XTHL":
                instruction = this.noArgs(0xE3, arg1, arg2);
                break;

            case "SPHL":
                instruction = this.noArgs(0xF9, arg1, arg2);
                break;
                
            case "IN":
                instruction = this.ioPort(0xDB, arg1, arg2);
                break;
                
            case "OUT":
                instruction = this.ioPOrt(0xD3, arg1, arg2);
                break;

            case "EI":
                instruction = this.noArgs(0xFB, arg1, arg2);
                break;
                
            case "DI":
                instruction = this.noArgs(0xF3, arg1, arg2);
                break;
                
            case "HLT":
                instruction = this.noArgs(0x76, arg1, arg2);
                break;
                
            case "NOP":
                instruction = this.noArgs(0x00, arg1, arg2);
                break;

            default:
                instruction = {error: "Instruction not recognized"};
                break;                
        }

        if (instruction != null && instruction.error == undefined)
        {
            instruction.pc = this.pc;
            this.pc += instruction.codes.length;

            if (label != null)
            {
                // This is now solely for EmulatorMemory to display
                instruction.labelDef = label;
            }
        }

        return instruction;
    }

    // Used for DB. Similar to split(",") but doesn't split strings apart
    splitCommas(args)
    {
        let tokens = [];
        let inQuote = false;
        let tokenStart = 0;

        for (let i = 0; i < args.length; i++)
        {
            if (args[i] == "'")
                inQuote ^= true;

            else if (args[i] == "," && !inQuote)
            {
                tokens.push(args.substring(tokenStart, i))
                tokenStart = i + 1;
            }
        }

        tokens.push(args.substring(tokenStart, args.length));

        return tokens;
    }

    // No arguments
    noArgs(opcode, arg1, arg2)
    {
        if (arg1 != null || arg2 != null)
            return {error: "Instruction has no arguments"};

        return {codes: [opcode]};
    }

    // MOV instructions
    twoArgRegOrM(opcode, arg1, arg2)
    {
        if (arg1 == null || arg2 == null)
            return {error: "Instruction requires two arguments"};

        let dst = this.regOrM(arg1);
        if (dst == -1)
            return {error: "First argument must be register or memory"};

        let src = this.regOrM(arg2);
        if (src == -1)
            return {error: "Second argument must be register or memory"};

        opcode |= (dst << 3) | src;            

        return {codes: [opcode]};
    }

    // MVI instructions
    twoArgRegData(opcode, arg1, arg2)
    {
        if (arg1 == null || arg2 == null)
            return {error: "Instruction requires two arguments"};

        let dst = this.regOrM(arg1);

        if (dst == -1)
            return {error: "First argument must be register or memory"};

        opcode |= dst << 3;

        return {codes: [opcode, 0], byteExpression: arg2};
    } 
    
    // LXI instructions
    twoArgRpData(opcode, arg1, arg2)
    {
        if (arg1 == null || arg2 == null)
            return {error: "Instruction requires two arguments"};

        let dst = this.regPair(arg1);

        if (dst == -1)
            return {error: "First argument must be register pair"};

        opcode |= dst << 4;   

        return { codes: [opcode, 0, 0], wordExpression: arg2 };
    }

    // LDA, STA, LHLD, SHLF, JMP, CALL, etc
    addrOrLabel(opcode, arg1, arg2)
    {
        if (arg1 == null || arg2 != null)
            return {error: "Instruction requires one argument"};

        return {codes: [opcode, 0, 0, /* result.lo, result.hi */ ], wordExpression: arg1 }; /// result.label};
    }

    // LDAX and STAX
    rpBcOrDe(opcode, arg1, arg2)
    {
        if (arg1 == null || arg2 != null)
            return {error: "Instruction requies one argument"};

        let rp = this.regPair(arg1);

        if (rp != 0 && rp != 1)
            return {error: "Argument must be register pair B (BC) or D (DE)"};

        opcode |= rp << 4;            

        return {codes: [opcode]};            
    }

    // ADD, etc
    srcRegOrM(opcode, arg1, arg2)
    {
        if (arg1 == null || arg2 != null)
            return {error: "Instruction requies one argument"};

        let src = this.regOrM(arg1);
        if (src == -1)
            return {error: "Argument must be a register or memory"};

        opcode |= src;            

        return {codes:[opcode]};            
    }

    // ADI, etc
    immByte(opcode, arg1, arg2)
    {
        if (arg1 == null || arg2 != null)
            return {error: "Instruction requies one argument"};

        return {codes:[opcode, 0], byteExpression: arg1};            
    }

    // INR, DCR
    dstRegOrM(opcode, arg1, arg2)
    {
        if (arg1 == null || arg2 != null)
            return {error: "Instruction requies one argument"};

        let dst = this.regOrM(arg1);
        if (dst == -1)
            return {error: "Argument must be a register or memory"};

        opcode |= dst << 3;            

        return {codes:[opcode]};            
    }

    // INX, DCX, DAD
    dstRp(opcode, arg1, arg2)
    {
        if (arg1 == null || arg2 != null)
            return {error: "Instruction requies one argument"};

        let dst = this.regPair(arg1);
        if (dst == -1)
            return {error: "Argument must be a register pair"};

        opcode |= dst << 4;            

        return {codes:[opcode]};            
    }

    // TODO: restartNum, ioPort 

    pushPop(opcode, arg1, arg2)
    {
        if (arg1 == null || arg2 != null)
            return { error: "Instruction requires one argument"};

        let pair = this.pushPopPair(arg1);

        if (pair == -1)
            return { error: "Argument must be a register pair or PSW"};

        opcode |= pair << 4;

        return { codes: [opcode]};
    }

    regOrM(arg)
    {
        return "BCDEHLMA".indexOf(arg.toUpperCase());
    }

    regPair(arg)
    {
        return ["B", "D", "H", "SP", "BC", "DE", "HL", "SP"].indexOf(arg.toUpperCase()) % 4;
    }

    pushPopPair(arg)
    {
        return ["B", "D", "H", "PSW", "BC", "DE", "HL"].indexOf(arg.toUpperCase()) % 4;
    }
   
    checkLegalLabel(label)
    {
        let legal = true;

        for (let i = 0; i < label.length; i++)
        {
            let char = label.charAt(i)

            if (i == 0)
                legal &= this.isAlpha(char) || char == "@" || char == "?";
            else
                legal &= this.isAlphaNumeric(char);                
        }

        return legal;
    }

    isAlpha(char)
    {
        return (char >= "A" && char <= "Z") ||
               (char >= 'a' && char <= 'z');
    }

    isNumeric(char)
    {
        return char >= "0" && char <= "9";
    }

    isAlphaNumeric(char)
    {
        return this.isAlpha(char) || this.isNumeric(char);
    }

    evaluateByteExpression(str)
    {
        let result = this.evaluateExpression(str);

        if (result.error == undefined && (result.value > 255 || result.value < -128))
        {
            result.error = "Evaluated result does not fit in byte";
        }

        return result;
    }

    evaluateWordExpression(str)
    {
        let result = this.evaluateExpression(str);

        if (result.error == undefined && (result.value > 65535 || result.value < -32768))
        {
            result.error = "Evaluated result does not fit in word";
        }

        return result;
    }

    // TODO: Implement $

    // Based on Intel 8080 Assembly Language Programming Manual, pages 9 - 12
    evaluateExpression(str)
    {
        // First check for single character in quotation marks.
        //  Otherwise the parsing is messed up.
        // Let's hope there are no characters in larger expressions.
        if (str.length == 3 && 
                (str[0] == "\'" && str[2] == "\'") ||
                (str[0] == "\"" && str[2] == "\""))
        {
            return { value: str.charCodeAt(1) };
        }

        // Surround symbol operators by spaces for easy parsing
        str = str.replace("$", " $ ");
        str = str.replace("(", " ( ");
        str = str.replace(")", " ) ");
        str = str.replace("+", " + ");
        str = str.replace("-", " - ");
        str = str.replace("*", " * ");
        str = str.replace("/", " / ");
        str = str.replace("%", " % ");
        str = str.replace("!", " ! ");
        str = str.replace("&", " & ");
        str = str.replace("|", " | ");
        str = str.replace("^", " ^ ");
        str = str.replace(">", " > ");
        str = str.replace("<", " < ");

        // Trim to eliminate spaces at beginning and end
        str = str.trim();            

        // Break expression into tokens
        let tokens = str.split(/\s+/);      // split on one or more spaces
        let result = {};

        for (let index = 0; index < tokens.length; index++)
        {
            // Replace word operations with symbols
            switch (tokens[index].toUpperCase())
            {
                case "MOD": tokens[index] = "%"; break;
                case "NOT": tokens[index] = "!"; break;
                case "AND": tokens[index] = "&"; break;
                case "OR": tokens[index] = "!"; break;
                case "XOR": tokens[index] = "^"; break;
                case "SHR": tokens[index] = ">"; break;
                case "SHL": tokens[index] = "<"; break;
            }

            if (this.isOperation(tokens[index]))
                ;

            // Check if a number. It must begin with 0 through 9!
            else if (this.isNumeric(tokens[index][0]))
            {
                result = this.evaluateNumber(tokens[index]);

                if (result.error == undefined)
                {
                    tokens[index] = result.value;    
                }
            }

            // Finally, check if a EQU or a label
            else
            {
                if (!this.checkLegalLabel(tokens[index]))
                {
                    result = { error: tokens[index] + " is not a legal label"};
                }
                else
                {
                    if (this.equsMap.has(tokens[index]))
                    {
                        tokens[index] = this.equsMap.get(tokens[index]);
                    }
                    else if (this.labelsMap.has(tokens[index]))
                    {
                        tokens[index] = this.labelsMap.get(tokens[index]);
                    }
                    else
                    {
                        result = { error: tokens[index] + " is not an EQU or a label"};
                    }
                }
            }

            if (result.error != undefined)
                return result;
        }

        // At this point, all the tokens are either one-character operations or numbers.
        // However, that doesn't necessarily imply that the expression is syntactically correct.

        // If tokens.length == 1, we're basically done
        if (tokens.length == 1 && !isNaN(tokens[0]))
        {
            result.value = tokens[0];
        }
        else
        {
            result = this.reduceExpression(tokens);
        }
       
        return result;
    }

    // This function is recursive for dealing with parentheses
    reduceExpression(tokens)
    {
        let result = { value: 0, error: undefined};

        // First, do the parentheses
        for (let leftIndex = 0; leftIndex < tokens.length; leftIndex++)
        {
            if (tokens[leftIndex] == "(")
            {
                // Find the next right parenthesis
                let rightIndex = leftIndex + 1;
                while (rightIndex < tokens.length)
                {
                    if (tokens[rightIndex] == ")")
                    {
                        if (rightIndex == leftIndex + 1)
                        {
                            result.error = "Parentheses are empty";
                            break;
                        }

                        let parenResult = this.reduceExpression(tokens.slice(leftIndex + 1, rightIndex));

                        if (parenResult.error != undefined)
                        {
                            result.error = parenResult.error;
                            break;
                        }
                        
                        tokens.splice(leftIndex, rightIndex - leftIndex + 1, parenResult.value);
                        break;
                    }
                    rightIndex++;
                }

                if (rightIndex == tokens.length)
                    result.error = "Matching right parenthesis not found";
            }

            if (result.error != undefined)
                break;
        }

        if (result.error != undefined)
            return result;

        // After parentheses, there are five groups of ordered operations
        let orderedOps = [ "*/%<>", "+-", "!", "&", "|^"];

        for (const opGroup of orderedOps)
        {
            let calcResult = {};

            do
            {
                calcResult = this.calculate(tokens, opGroup);

                if (calcResult.error != undefined)
                {
                    result.error = calcResult.error;
                    break;
                }
            }
            while (tokens.length > 1 && calcResult.repeat);

            if (result.error != undefined)
                break;
        }

        // At this point, tokens.length should equal 1 and should be a number. 
        //  If not, something has gone wrong.
        if (result.error == undefined && tokens.length == 1 && !isNaN(tokens[0]))
            result.value = tokens[0]

        return result;
    }

    // This function process only one operation and then returns.
    // If it process an operation, result.repeat is set to true 
    //  because there might be another.
    // No value is returned. Only the tokens array is modified.
    calculate(tokens, ops)
    {
        let result = { error: undefined, repeat: false };

        for (let index = 0; index < tokens.length; index++)
        {
            if (ops.indexOf(tokens[index]) != -1)
            {
                let op = tokens[index];
                let leftNum = index != 0 ? tokens[index - 1] : NaN;
                let rightNum = index != tokens.length - 1 ? tokens[index + 1] : NaN;

                if (("*/%<>&|^".indexOf(op) != -1) && isNaN(leftNum) && isNaN(rightNum))
                {
                    result.error = op + " is a binary operation and must be surrounded by values";
                    return result;
                }

                // TODO: The implicit assumption is that unary operators always appear by themselves.
                // In theory, it's possible to have an expression like a - + - b, 
                //  in which case the unary operators should be evaluated by right to left.
                if (("+-!".indexOf(op) != -1) && isNaN(rightNum))
                {
                    result.error = op + " must be followed by a number";
                    return result;
                }

                if (op == "!" && !isNaN(leftNum))
                {
                    result.error = op + " is a unary operation and must not be preceded by a number";
                    return result;
                }

                let value = 0;

                // Binary operations
                if (!isNaN(leftNum) && !isNaN(rightNum))
                {
                    switch(op)
                    {
                        case "*": value = leftNum * rightNum; break;
                        case "/": value = Math.floor(leftNum / rightNum); break;
                        case "%": value = leftNum % rightNum; break;
                        case "<": value = leftNum >> rightNum; break;
                        case ">": value = leftNum << rightNum; break;
                        case "+": value = leftNum + rightNum; break;
                        case "-": value = leftNum - rightNum; break;
                        case "&": value = leftNum & rightNum; break;
                        case "|": value = leftNum | rightNum; break;
                        case "^": value = leftNum ^ rightNum; break;
                    }

                    // Replace two numbers and operation with calculated value
                    tokens.splice(index - 1, 3, value);
                }
                
                // Unary operations
                else if (!isNaN(rightNum.IsNaN))
                {
                    switch (op)
                    {
                        case "+": value = rightNum; break;
                        case "-": value = -rightNum; break;
                        case "!": value = !rightNum; break;
                    }

                    // Replace operation and one number with calculated value
                    tokens.splice(index, 2, value);
                }

                result.repeat = true;
                break;
            }
        }
        return result;
    }

    isOperation(str)
    {
        return (str.length == 1 && "$()+-*/%!&|^<>".indexOf(str) != -1)
    }

    evaluateNumber(str)
    {
        let radix = 10;

        // Check if there's a radix indication at the tail end
        let lastChar = str[str.length - 1];
        let stripLast = true;

        switch (lastChar.toUpperCase())
        {
            case "H":
                radix = 16;
                break;

            case "D":
                break;

            case "O":
                radix = 8;
                break;

            case "B":
                radix = 2;
                break;

            default:
                stripLast = false;
        }

        if (stripLast)
        {
            str = str.substring(0, str.length - 1);
        }

        let result = {};        // TODO: { value: 0, error: undefined}, then use these members
        let value = 0;

        for (let ch of str)
        {
            value *= radix;

            switch (radix)
            {
                case 2:
                    if (ch >= "0" && ch <= "1")
                    {
                        value += parseInt(ch, 2);
                    }
                    else
                    {
                        result = { error: "Binary digits must be 0 or 1" };
                    }
                    break;

                case 8:
                    if (ch >= "0" && ch <= "7")
                    {
                        value += parseInt(ch, 8);
                    }
                    else
                    {
                        result = { error: "Octal digits must be between 0 and 7" };
                    }
                    break;

                case 10:
                    if (ch >= "0" && ch <= "9")
                    {
                        value += parseInt(ch);
                    }
                    else
                    {
                        result = { error: "Decimal digits must be between 0 and 9" };
                    }
                    break;

                case 16:
                    if ((ch >= 0 && ch <= "9") || (ch >= "A" && ch <= "F") || (ch >= "a" && ch <= "f"))
                    {
                        value += parseInt(ch, 16);
                    }
                    else
                    {
                        result = { error: "Hexadecimal digits must be between 0 and F" };
                    }
                    break;
            }

            if (result.error != undefined)
            {
                result.error = str + " is not a number: " + result.error;
                break;
            }
        }

        if (result.error == undefined)
            result = { value: value };

        return result;
    }
}