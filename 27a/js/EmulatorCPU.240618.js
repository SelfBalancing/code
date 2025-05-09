// EmulatorCPU (c) Charles Petzold, 2024

// TODO: Include button handling from EmulatorConnections? 

class CPU
{
    constructor(emulator, memory)
    {
        this.emulator = emulator;                   // instance of I8080Emulator class loaded with 64K byte array
        this.memory = memory;                       // instance of EmulatorMemory class accessing codelist element

        this.emulator.cpu = this;                   // Set cpu property in emulator!

        // HTML Table cells for displaying CPU state
        this.pc = document.getElementById("pc");
        this.sp = document.getElementById("sp");
        this.a = document.getElementById("a");
        this.b = document.getElementById("b");
        this.c = document.getElementById("c");
        this.d = document.getElementById("d");
        this.e = document.getElementById("e");
        this.h = document.getElementById("h");
        this.l = document.getElementById("l");
        this.f = document.getElementById("f");              // byte value
        this.flags = document.getElementById("flags");      // labels

        // Get buttons
        this.runButton = document.getElementById("runButton");
        this.stepButton = document.getElementById("stepButton");
        this.breakButton = document.getElementById("breakButton");
        this.resetButton = document.getElementById("resetButton");

        // TODO: Already have core of reset function.

        this.stepButton.addEventListener("click", this.onStepClick.bind(this));
        this.runButton.addEventListener("click", this.onRunClick.bind(this));
        this.breakButton.addEventListener("click", this.onBreakClick.bind(this));
        this.resetButton.addEventListener("click", this.onResetClick.bind(this));

        this.breakNow = false;
    }

    disable()
    {
        this.resetButton.disabled = true;
        this.runButton.disabled = true;
        this.stepButton.disabled = true;
        this.breakButton.disabled = true;
    }

    enable()
    {
        this.resetButton.disabled = false;
        this.runButton.disabled = false;
        this.stepButton.disabled = false;
        this.breakButton.disabled = true;
    }
    
    // Button handlers
    onResetClick(event)
    {
        this.reset();
    }

    

    onStepClick(event)
    {
        this.stepButton.disabled = true;
        this.runButton.disabled = true;
    
        this.step(() =>
        {
            this.stepButton.disabled = false;
            this.runButton.disabled = false;    
        });
    };
    
    onRunClick(event)
    {
        this.stepButton.disabled = true;
        this.runButton.disabled = true;
        this.breakButton.disabled = false;
        this.resetButton.disabled = true; 
    
        this.runStep();
    };

    onBreakClick(event)
    {
        this.breakNow = true;
    }
   
    runStep()
    {
        // Breaking out of the animation
        if (this.breakNow)
        {
            this.breakNow = false;
            this.stepButton.disabled = false;
            this.runButton.disabled = false;
            this.breakButton.disabled = true;
            this.resetButton.disabled = false;
            return;
        }
        
        this.step(()=>
        {
            setTimeout(this.runStep.bind(this), 10);
        });
    }

    halted()
    {
        this.disable();
        this.resetButton.disabled = false;
    }

    reset()
    {
        this.emulator.reset(true);

        this.runButton.disabled = false;
        this.stepButton.disabled = false;
        this.breakButton.disabled = true;

        this.updateTable();
    }

    updateTable()
    {
        this.fill(this.pc, emulator.PC, 4);
        this.fill(this.sp, emulator.SP, 4);
        this.fill(this.a, emulator.A, 2);
        this.fill(this.b, emulator.B, 2);
        this.fill(this.c, emulator.C, 2);
        this.fill(this.d, emulator.D, 2);
        this.fill(this.e, emulator.E, 2);
        this.fill(this.h, emulator.H, 2);
        this.fill(this.l, emulator.L, 2);
        this.fill(this.f, emulator.Flags, 2);

        let flags = emulator.Flags;

        this.flags.innerHTML = ((flags & 0x80) != 0 ? "S\xA0" : "\xA0\xA0") +
                               ((flags & 0x40) != 0 ? "Z\xA0" : "\xA0\xA0") +
                               ((flags & 0x10) != 0 ? "AC\xA0" : "\xA0\xA0\xA0") +
                               ((flags & 0x04) != 0 ? "P\xA0" : "\xA0\xA0") +
                               ((flags & 0x01) != 0 ? "CY" : "\xA0\xA0");

        // Select current PC address in memory display
        this.memory.selectAddress(emulator.PC);
    }

    fill(element, value, pad)
    {
        element.innerHTML = this.hex(value, pad);
    }

    hex(value, pad)
    {
        return value.toString(16).toUpperCase().padStart(pad, "0") + "h";
    }

    step(callback)
    {
        this.stepCallback = callback;
        this.emulator.next(this.finishStep.bind(this));
    }

    finishStep()
    {
        this.updateTable();
        this.stepCallback();
    }
}