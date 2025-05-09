// EmulatorMemory (c) Charles Petzold, 2024

class AssemblerMemory
{
    
    constructor(assembler, codelist)
    {
        this.assembler = assembler;     // I8080Assembler for converting ASM file to machine code
        this.codelist = codelist;       // HTML select element for displaying memory (addresses and machine code)
    }

    assemble(asm)
    {
        // Clear the codelist regardless of the success of the assembly
        this.codelist.length = 0;

        // Split lines of assembly language program into array
        asm = asm.replace(/\r\n/g,"\n").split('\n');

        // Pass it to assembler
        this.assembler.setSource(asm);
        let success = this.assembler.assemble();

        if (success)
        {
            // For inserting blank lines if PC skip
            let trackpc = this.assembler.instructions[0].pc;

            this.codelist.length = 0;
            //   let index = 0;
            let needAddr = true;

            for (let instruction of this.assembler.instructions)
            {
                // Get line of assembly language
                let line = asm[instruction.lineNum];

                // Clean it up a bit by eliminating comments
                let semicolon = line.indexOf(";");

                if (semicolon != -1)
                {
                    line = line.substring(0, semicolon);
                }

                // The HTML option element collapses spaces so replace them with non-breakers
                while (line.includes(" "))
                    line = line.replace(" ", "\xA0");

                // Display hex addresses only at start and in special cases
                if (instruction.labelDef != undefined)
                    needAddr = true;

                if (instruction.org != undefined)
                    needAddr = true; 

                // This is an instruction with a label but no code bytes
                if (instruction.codes.length == 0 && instruction.labelDef != undefined)
                {
                    let text = "\xA0".repeat(16) + line;

                    let option = new Option(text, -1);
                    codelist.add(option);
                }

                // For all instructions with code bytes
                if (instruction.codes.length > 0)
                {
                    let needInst = true;

                    if (trackpc != instruction.pc)
                    {
                        // Insert blank line
                        codelist.add(new Option(" ", -1));
                        trackpc = instruction.pc;
                    }

                    trackpc += instruction.codes.length;

                    for (let code of instruction.codes)
                    {
                        let text = "";

                        // Possibly display the hexadecimal address
                        if (needAddr)
                        {
                            text = this.hex(instruction.pc, 4) + ":" + "\xA0".repeat(1);
                            needAddr = false;
                        }
                        else
                        {
                            text = "\xA0".repeat(7);
                        }

                        // The hexadecimal machine code
                        text += this.hex(code, 2);

                        // Possibly display the instruction
                        if (needInst)
                        {
                            // Attach it to item 
                            if (line.length > 0)
                            {
                                text += "\xA0".repeat(5) + line;
                            }
                            
                            needInst = false;
                        }

                        let option = new Option(text, instruction.pc.toString());
                        this.codelist.add(option);

                    }
                }
            }
                
            // Add blank line for stack separation
            codelist.add(new Option(" ", -1));
        }
        else
        {    
            console.log(assembler.error);
        }

        return success;
    }

    insertByte(addr, byte)
    {
        let options = this.codelist.options;
        let foundIt = false;
        let higherIndex = 0;

        for (let i = 0; i < options.length; i++)
        {
            if (higherIndex == 0 &&
                options[i].value > addr)        // TODO: Does this need to be converted to numbers? 
                {
                    higherIndex = i;
                }

            if (options[i].value == addr)
            {
                let text = options[i].text;

                if (text.length >= 10)
                    text = text.substring(0, 7) + this.hex(byte, 2) + text.substring(10);

                options[i].text = text;
                foundIt = true;
            }
        }

        // This is generally for inserting stack values
        if (!foundIt)
        {
            let text = this.hex(addr, 4) + ":" + "\xA0".repeat(1) + this.hex(byte, 2);
            let option = new Option(text, addr);

            if (higherIndex == 0)
            {
                this.codelist.add(option)
            }
            else
            {
                this.codelist.add(option, options[higherIndex]);
            }
        }
    }

    selectAddress(pc)
    {
        let options = this.codelist.options;

        for (let i = 0; i < this.codelist.options.length; i++)
        {
            if (this.codelist.options[i].value == pc)
            {
                this.codelist.options[i].selected = true;
                break;
            }
        }
    }

    hex(val, pad)
    {
        return val.toString(16).toUpperCase().padStart(pad, "0") + "h";
    }

}
