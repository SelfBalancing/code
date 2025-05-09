// I8080Emulator (c) Charles Petzold, 2024

class I8080Emulator
{
    constructor(memblock, memory, console)         
    {
        this.memblock = memblock;   // 64K byte array
        this.memory = memory;       // Listbox for user's view
        this.console = console;     // Console for CP/M I/O calls

        this.cpu = null;            // Set by EmulatorCPU

        this.fetchCount = 
        [
            1, 3, 1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 2, 1,     // 00 - 0F
            0, 3, 1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 2, 1,     // 10 - 1F
            0, 3, 3, 1, 1, 1, 2, 1, 0, 1, 3, 1, 1, 1, 2, 1,     // 20 - 2F
            0, 3, 3, 1, 1, 1, 2, 1, 0, 1, 3, 1, 1, 1, 2, 1,     // 30 - 3F
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,     // 40 - 4F
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,     // 50 - 5F
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,     // 60 - 6F
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,     // 70 - 7F
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,     // 80 - 8F
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,     // 90 - 9F
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,     // A0 - AF
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,     // B0 - BF
            1, 1, 3, 3, 3, 1, 2, 1, 1, 1, 3, 0, 3, 3, 2, 1,     // C0 - CF
            1, 1, 3, 2, 3, 1, 2, 1, 1, 0, 3, 2, 3, 0, 2, 1,     // D0 - DF
            1, 1, 3, 1, 3, 1, 2, 1, 1, 1, 3, 1, 3, 0, 2, 1,     // E0 - EF
            1, 1, 3, 1, 3, 1, 2, 1, 1, 1, 3, 1, 3, 0, 2, 1      // F0 - FF
        ];

        this.opcode = 0;
        this.inst2 = 0;
        this.inst3 = 0;

        this.reset(false);
    }

    setInitialPC(pc)
    {
        this.initialPC = pc;
        this.isCPM = this.initialPC == 0x0100;            
    }

    reset(fromButton)
    {
        this.PC = this.initialPC;
        this.SP = fromButton ? 0x0FFFE : 0 ;
        this.A = 0;
        this.B = 0;
        this.C = 0;
        this.D = 0;
        this.E = 0;
        this.H = 0;
        this.L = 0;
        this.Flags = 0;

        if (this.isCPM && !fromButton)
        {
            this.push(0);
        }
    }

    next(callback)
    {
        this.nextCallback = callback;

        // For CP/M programs, stop when PC is zero.
        if (this.isCPM && this.PC == 0)
        {
            this.halted();
            return false;
        }

        // Special handling of CP/M calls
        if (this.isCPM && this.PC == 5)
        {
            // Used in 9 and 10
            let ptr = this.fuse(this.D, this.E);
            let terminate = false;

            switch (this.C)
            {
                case 0:
                    terminate = true;
                    this.halted();
                    break;

                case 1:
                    this.okCallCallback = false;
                    this.console.readChar(this.readCharCallback.bind(this));
                    break;

                // Write character to console
                case 2:
                    this.console.writeChar(this.E);
                    break;

                case 9:
                    while (this.memblock[ptr] != 0x24)
                    {
                        this.console.writeChar(this.memblock[ptr++])
                    }
                    break;

                case 10:
                    this.okCallCallback = false; 
                    this.readBufferPtr = ptr;
                    this.console.readString(this.memblock[ptr], this.readBufferCallback.bind(this));
                    break;
            }

            if (this.okCallCallback)
            {
                this.PC = terminate ? 0 : this.pop();
                this.nextCallback();
            }
        }
        else
        {
            this.fetch();

            if (this.opcode == "0x76")
            {
                this.PC -= 1;
                return false;           // TODO: Move this to callback ???
            }

            this.execute();
        }

        return true;                // TODO: Move this to callback ???         
    }

    fetch()
    {
        // TODO: Fix
        {
            this.opcode = this.memblock[this.PC];
            this.PC = this.inx(this.PC);

            this.inst2 = 0;
            this.inst3 = 0;
            let count = this.fetchCount[this.opcode];

            if (count > 1)
            {
                this.inst2 = this.memblock[this.PC];
                this.PC = this.inx(this.PC);
            }
            if (count > 2)
            {
                this.inst3 = this.memblock[this.PC];
                this.PC = this.inx(this.PC);
            }
        }
    }

    // Used for CP/M read console    
    readCharCallback(char)
    {
        this.A = this.L = char.charCodeAt();
        this.PC = this.pop();
        this.nextCallback();
    }

    readBufferCallback(str, length)
    {
        this.storeByteInMemory(this.readBufferPtr, length);

        for (let i = 0; i < str.length; i++)
            this.storeByteInMemory(this.readBufferPtr + i + 1, str[i].charCodeAt());
    
        this.PC = this.pop();
        this.nextCallback();
    }

    execute()
    {
        let data = this.inst2;
        let addr = this.fuse(this.inst3, this.inst2);

        let psw = this.fuse(this.A, this.Flags);
        let bc = this.fuse(this.B, this.C);
        let de = this.fuse(this.D, this.E);
        let hl = this.fuse(this.H, this.L);

        let cy = (this.Flags & 0x01) != 0;
        let p = (this.Flags & 0x04) != 0;
        let ac = (this.Flags & 0x10) != 0;
        let z = (this.Flags & 0x40) != 0;
        let s = (this.Flags & 0x80) != 0;

        this.okCallCallback = true;

        switch(this.opcode)
        {
            case 0x00: break;                               // NOP
            case 0x01: this.B = this.hi(addr); 
                       this.C = this.lo(addr); break;       // LXI B,d16
            case 0x02: this.storeByteInMemory(bc, this.A); break;        // STAX B
            case 0x03: bc = this.inx(bc);
                       this.B = this.hi(bc);
                       this.C = this.lo(bc); break;         // INX B
            case 0x04: this.B = this.inr(this.B); break;    // INR B
            case 0x05: this.B = this.dcr(this.B); break;    // DCR B
            case 0x06: this.B = data; break;                // MVI B,d8
            case 0x07: this.A *= 2;
                       cy = this.A & 0x100;
                       this.A &= 0xFF; 
                       this.A |= (cy ? 1 : 0);
                       this.setcy(cy);
                       break;                               // RLC
            case 0x08: break;                               // unassigned
            case 0x09: this.dad(hl, bc); break;             // DAD B
            case 0x0A: this.A = this.memblock[bc]; break;   // LDAX B
            case 0x0B: bc = this.dcx(bc);
                       this.B = this.hi(bc);
                       this.C = this.lo(bc); break;         // DCX B
            case 0x0C: this.C = this.inr(this.C); break;    // INR C
            case 0x0D: this.C = this.dcr(this.C); break;    // DCR C
            case 0x0E: this.C = data; break;                // MVI C,d8
            case 0x0F: cy = this.A & 0x01; 
                       this.A /= 2;
                       this.A |= (cy ? 0x80 : 0);
                       this.setcy(cy);
                       break;                               // RRC
            case 0x10: break;                               // unassigned
            case 0x11: this.D = this.hi(addr); 
                       this.E = this.lo(addr); break;       // LXI D,d16
            case 0x12: this.storeByteInMemory(de, this.A); break;        // STAX D
            case 0x13: de = this.inx(de);
                       this.D = this.hi(de);
                       this.E = this.lo(de); break;         // INX D
            case 0x14: this.D = this.inr(this.D); break;    // INR D
            case 0x15: this.D = this.dcr(this.D); break;    // DCR D
            case 0x16: this.D = data; break;                // MVI D,data
            case 0x17: this.A *= 2;
                       this.A |= (cy ? 0x01 : 0);
                       cy = this.A & 0x100;
                       this.A &= 0xFF; 
                       this.setcy(cy);
                       break;                               // RAL
            case 0x18: break;                               // unassigned
            case 0x19: this.dad(hl, de); break;             // DAD D
            case 0x1A: this.A = this.memblock[de]; break;        // LDAX DE
            case 0x1B: de = this.dcx(de);
                       this.D = this.hi(de);
                       this.E = this.lo(de); break;         // DCX D
            case 0x1C: this.E = this.inr(this.E); break;    // INR E
            case 0x1D: this.E = this.dcr(this.E); break;    // DCR E
            case 0x1E: this.E = data; break;                // MVI E,d8
            case 0x1F: let newcy = (this.A & 0x01) != 0;
                       this.A /= 2;
                       this.A |= (cy ? 0x80 : 0);
                       cy = newcy;
                       this.setcy(cy);
                       break;                               // RAR
            case 0x20: break;                               // unassigned (RIM)
            case 0x21: this.H = this.hi(addr); 
                       this.L = this.lo(addr); break;       // LXI H,d16
            case 0x22: this.storeByteInMemory(addr, this.L); 
                       this.storeByteInMemory(addr+1, this.H); break;    // SHLD
            case 0x23: hl = this.inx(hl);
                       this.H = this.hi(hl); 
                       this.L = this.lo(hl); break;         // INX HL
            case 0x24: this.H = this.inr(this.H); break;    // INR H
            case 0x25: this.H = this.dcr(this.H); break;    // DCR H
            case 0x26: this.H = data; break;                // MVI H,data
            case 0x27: if (ac || ((this.A & 15) > 9))
                           this.A += 6;
                       if (cy || (((this.A >> 4) & 15) > 9))
                           this.A += 0x60;
                       cy = (this.A & 0x100) != 0;
                       this.A &= 255;
                       ac = false;              // TODO
                       this.setFlags(this.A, cy, ac);
                       break;                             // DAA
            case 0x28: break;                               // unassigned
            case 0x29: this.dad(hl, hl);  break;                               // DAD H    
            case 0x2A: this.L = this.memblock[addr];
                       this.H = this.memblock[addr+1]; break;    // LHLD addr
            case 0x2B: hl = this.dcx(hl);
                       this.H = this.hi(hl); 
                       this.L = this.lo(hl); break;         // DCX HL
            case 0x2C: this.L = this.inr(this.L); break;    // INR L
            case 0x2D: this.L = this.dcr(this.L); break;    // DCR L
            case 0x2E: this.L = data; break;                // MVI L,data
            case 0x2F: this.A ^= 255; break;       // CMA
            case 0x30: break;                               // unassigned (SIM)
            case 0x31: this.SP = addr; break;               // LXI SP,addr
            case 0x32: this.storeByteInMemory(addr, this.A); break;      // STA addr
            case 0x33: this.SP = this.inx(this.SP); break;  // INX SP
            case 0x34: this.storeByteInMemory(hl, this.inr(this.memblock[hl])); break;    // INR M
            case 0x35: this.storeByteInMemory(hl, this.dcr(this.memblock[hl])); break;    // DCR M
            case 0x36: this.storeByteInMemory(hl, data); break;          // MVI M,data
            case 0x37: this.setcy(true); break;             // STC

            case 0x38: break;                               // unassigned
            case 0x39: this.dad(hl, sp); break;             // DAD SP
            case 0x3A: this.A = this.memblock[addr]; break;      // LDA addr
            case 0x3B: this.SP = this.dcx(this.SP); break;  // DCX SP
            case 0x3C: this.A = this.inr(this.A); break;    // INR A
            case 0x3D: this.A = this.dcr(this.A); break;    // DCR A
            case 0x3E: this.A = data; break;                // MVI A,data
            case 0x3F: this.setcy(!this.getcy()); break;      // CMC

            case 0x40: this.B = this.B; break;        // MOV B,B
            case 0x41: this.B = this.C; break;        // MOV B,C
            case 0x42: this.B = this.D; break;        // MOV B,D
            case 0x43: this.B = this.E; break;        // MOV B,E
            case 0x44: this.B = this.H; break;        // MOV B,H
            case 0x45: this.B = this.L; break;        // MOV B,L
            case 0x46: this.B = this.memblock[hl]; break;  // MOV B,M
            case 0x47: this.B = this.A; break;        // MOV B,A

            case 0x48: this.C = this.B; break;        // MOV C,B
            case 0x49: this.C = this.C; break;        // MOV C,C
            case 0x4A: this.C = this.D; break;        // MOV C,D
            case 0x4B: this.C = this.E; break;        // MOV C,E
            case 0x4C: this.C = this.H; break;        // MOV C,H
            case 0x4D: this.C = this.L; break;        // MOV C,L
            case 0x4E: this.C = this.memblock[hl]; break;    // MOV C,M
            case 0x4F: this.C = this.A; break;        // MOV C,A

            case 0x50: this.D = this.B; break;        // MOV D,B
            case 0x51: this.D = this.C; break;        // MOV D,C
            case 0x52: this.D = this.D; break;        // MOV D,D
            case 0x53: this.D = this.E; break;        // MOV D,E
            case 0x54: this.D = this.H; break;        // MOV D,H
            case 0x55: this.D = this.L; break;        // MOV D,L
            case 0x56: this.D = this.memblock[hl]; break;  // MOV D,M
            case 0x57: this.D = this.A; break;        // MOV D,A

            case 0x58: this.E = this.B; break;        // MOV E,B
            case 0x59: this.E = this.C; break;        // MOV E,C
            case 0x5A: this.E = this.D; break;        // MOV E,D
            case 0x5B: this.E = this.E; break;        // MOV E,E
            case 0x5C: this.E = this.H; break;        // MOV E,H
            case 0x5D: this.E = this.L; break;        // MOV E,L
            case 0x5E: this.E = this.memblock[hl]; break;  // MOV E,M
            case 0x5F: this.E = this.A; break;        // MOV E,A

            case 0x60: this.H = this.B; break;        // MOV H,B
            case 0x61: this.H = this.C; break;        // MOV H,C
            case 0x62: this.H = this.D; break;        // MOV H,D
            case 0x63: this.H = this.E; break;        // MOV H,E
            case 0x64: this.H = this.H; break;        // MOV H,H
            case 0x65: this.H = this.L; break;        // MOV H,L
            case 0x66: this.H = this.memblock[hl]; break;  // MOV H,M
            case 0x67: this.H = this.A; break;        // MOV H,A

            case 0x68: this.L = this.B; break;        // MOV H,B
            case 0x69: this.L = this.C; break;        // MOV H,C
            case 0x6A: this.L = this.D; break;        // MOV H,D
            case 0x6B: this.L = this.E; break;        // MOV H,E
            case 0x6C: this.L = this.H; break;        // MOV H,H
            case 0x6D: this.L = this.L; break;        // MOV H,L
            case 0x6E: this.L = this.memblock[hl]; break;  // MOV H,M
            case 0x6F: this.L = this.A; break;        // MOV H,A

            case 0x70: this.storeByteInMemory(hl, this.B); break;  // MOV M,B
            case 0x71: this.storeByteInMemory(hl, this.C); break;  // MOV M,C
            case 0x72: this.storeByteInMemory(hl, this.D); break;  // MOV M,D
            case 0x73: this.storeByteInMemory(hl, this.E); break;  // MOV M,E
            case 0x74: this.storeByteInMemory(hl, this.H); break;  // MOV M,H
            case 0x75: this.storeByteInMemory(hl, this.L); break;  // MOV M,L
            case 0x76: --this.PC; this.halted(); break;              // HLT
            case 0x77: this.storeByteInMemory(hl, this.A); break;  // MOV M,A

            case 0x78: this.A = this.B; break;        // MOV A,B
            case 0x79: this.A = this.C; break;        // MOV A,C
            case 0x7A: this.A = this.D; break;        // MOV A,D
            case 0x7B: this.A = this.E; break;        // MOV A,E
            case 0x7C: this.A = this.H; break;        // MOV A,H
            case 0x7D: this.A = this.L; break;        // MOV A,L
            case 0x7E: this.A = this.memblock[hl]; break;  // MOV A,M
            case 0x7F: this.A = this.A; break;        // MOV A,A

            case 0x80: this.A = this.add(this.A, this.B, false); break;   // ADD B
            case 0x81: this.A = this.add(this.A, this.C, false); break;   // ADD C
            case 0x82: this.A = this.add(this.A, this.D, false); break;   // ADD D
            case 0x83: this.A = this.add(this.A, this.E, false); break;   // ADD E
            case 0x84: this.A = this.add(this.A, this.H, false); break;   // ADD H
            case 0x85: this.A = this.add(this.A, this.L, false); break;   // ADD L
            case 0x86: this.A = this.add(this.A, this.memblock[hl], false); break;   // ADD M
            case 0x87: this.A = this.add(this.A, this.A, false); break;   // ADD A

            case 0x88: this.A = this.add(this.A, this.B, cy); break;   // ADC B
            case 0x89: this.A = this.add(this.A, this.C, cy); break;   // ADC C
            case 0x8A: this.A = this.add(this.A, this.D, cy); break;   // ADC D
            case 0x8B: this.A = this.add(this.A, this.E, cy); break;   // ADC E
            case 0x8C: this.A = this.add(this.A, this.H, cy); break;   // ADC H
            case 0x8D: this.A = this.add(this.A, this.L, cy); break;   // ADC L
            case 0x8E: this.A = this.add(this.A, this.memblock[hl], cy); break;   // ADC M
            case 0x8F: this.A = this.add(this.A, this.A, cy); break;   // ADC A

            case 0x90: this.A = this.sub(this.A, this.B, false); break;   // SUB B
            case 0x91: this.A = this.sub(this.A, this.C, false); break;   // SUB C
            case 0x92: this.A = this.sub(this.A, this.D, false); break;   // SUB D
            case 0x93: this.A = this.sub(this.A, this.E, false); break;   // SUB E
            case 0x94: this.A = this.sub(this.A, this.H, false); break;   // SUB H
            case 0x95: this.A = this.sub(this.A, this.L, false); break;   // SUB L
            case 0x96: this.A = this.sub(this.A, this.memblock[hl], false); break;   // SUB M
            case 0x97: this.A = this.sub(this.A, this.A, false); break;   // SUB A

            case 0x98: this.A = this.sub(this.A, this.B, cy); break;   // SBB B
            case 0x99: this.A = this.sub(this.A, this.C, cy); break;   // SBB C
            case 0x9A: this.A = this.sub(this.A, this.D, cy); break;   // SBB D
            case 0x9B: this.A = this.sub(this.A, this.E, cy); break;   // SBB E
            case 0x9C: this.A = this.sub(this.A, this.H, cy); break;   // SBB H
            case 0x9D: this.A = this.sub(this.A, this.L, cy); break;   // SBB L
            case 0x9E: this.A = this.sub(this.A, this.memblock[hl], cy); break;   // SBB M
            case 0x9F: this.A = this.sub(this.A, this.A, cy); break;   // SBB A

            case 0xA0: this.A = this.and(this.A, this.B); break;            // ANA B
            case 0xA1: this.A = this.and(this.A, this.C); break;            // ANA C
            case 0xA2: this.A = this.and(this.A, this.D); break;            // ANA D
            case 0xA3: this.A = this.and(this.A, this.E); break;            // ANA E
            case 0xA4: this.A = this.and(this.A, this.H); break;            // ANA H
            case 0xA5: this.A = this.and(this.A, this.L); break;            // ANA L
            case 0xA6: this.A = this.and(this.A, this.memblock[hl]); break;      // ANA M
            case 0xA7: this.A = this.and(this.A, this.A); break;            // ANA A

            case 0xA8: this.A = this.xor(this.A, this.B); break;            // XRA B
            case 0xA9: this.A = this.xor(this.A, this.C); break;            // XRA C
            case 0xAA: this.A = this.xor(this.A, this.D); break;            // XRA D
            case 0xAB: this.A = this.xor(this.A, this.E); break;            // XRA E
            case 0xAC: this.A = this.xor(this.A, this.H); break;            // XRA H
            case 0xAD: this.A = this.xor(this.A, this.L); break;            // XRA L
            case 0xAE: this.A = this.xor(this.A, this.memblock[hl]); break;      // XRA M
            case 0xAF: this.A = this.xor(this.A, this.A); break;            // XRA A

            case 0xB0: this.A = this.or(this.A, this.B); break;             // ORA B
            case 0xB1: this.A = this.or(this.A, this.C); break;             // ORA C
            case 0xB2: this.A = this.or(this.A, this.D); break;             // ORA D
            case 0xB3: this.A = this.or(this.A, this.E); break;             // ORA E
            case 0xB4: this.A = this.or(this.A, this.H); break;             // ORA H
            case 0xB5: this.A = this.or(this.A, this.L); break;             // ORA L
            case 0xB6: this.A = this.or(this.A, this.memblock[hl]); break;       // ORA M
            case 0xB7: this.A = this.or(this.A, this.A); break;             // ORA A

            case 0xB8: this.sub(this.A, this.B, false); break;              // CMP B
            case 0xB9: this.sub(this.A, this.C, false); break;              // CMP C
            case 0xBA: this.sub(this.A, this.D, false); break;              // CMP D
            case 0xBB: this.sub(this.A, this.E, false); break;              // CMP E
            case 0xBC: this.sub(this.A, this.H, false); break;              // CMP H
            case 0xBD: this.sub(this.A, this.L, false); break;              // CMP L
            case 0xBE: this.sub(this.A, this.memblock[hl], false); break;   // CMP M
            case 0xBF: this.sub(this.A, this.A, false); break;              // CMP A

            case 0xC0: if (!z) this.PC = this.pop(); break;                 // RNZ
            case 0xC1: bc = this.pop(); 
                       this.B = this.hi(bc); 
                       this.C = this.lo(bc); break;                         // POP BC
            case 0xC2: if (!z) this.PC = addr; break;                       // JNZ
            case 0xC3: this.PC = addr; break;                               // JMP
            case 0xC4: if (!z) this.call(addr); break;                      // CNZ
            case 0xC5: this.push(bc); break;                                // PUSH BC
            case 0xC6: this.A = this.add(this.A, data, false); break;       // ADI data
            case 0xC7: this.call(0); break;                                 // RST 0

            case 0xC8: if (z) this.PC = this.pop(); break;                  // RZ
            case 0xC9: this.PC = this.pop(); break;                         // RET                
            case 0xCA: if (z) this.PC = addr; break;                        // JZ
            case 0xCB: break;                                               // unassigned
            case 0xCC: if (z) this.call(addr); break;                       // CZ
            case 0xCD: this.call(addr); break;                              // CALL
            case 0xCE: this.A = this.add(this.A, data, cy); break;          // ACI data
            case 0xCF: this.call(8); break;                                 // RST 1

            case 0xD0: if (!cy) this.PC = this.pop(); break;                 // RNC
            case 0xD1: de = this.pop(); 
                       this.D = this.hi(de); 
                       this.E = this.lo(de); break;                         // POP DE
            case 0xD2: if (!cy) this.PC = addr; break;                      // JNC
            case 0xD3: break;                                               // * OUT data
            case 0xD4: if (!cy) this.call(addr); break;                     // CNC addr
            case 0xD5: this.push(de); break;                                // PUSH DE
            case 0xD6: this.A = this.sub(this.A, data, false); break;       // SUI data
            case 0xD7: this.call(16); break;                                // RST 2

            case 0xD8: if (cy) this.PC = this.pop(); break;                 // RC
            case 0xD9: break;                                               // unassigned
            case 0xDA: if (cy) this.PC = addr; break;                             // JC
            case 0xDB: break;                                               // * IN d8
            case 0xDC: if (cy) this.call(addr); break;                      // CC
            case 0xDD: break;                                               // unassigned
            case 0xDE: this.A = this.sub(this.A, data, cy); break;          // SBI data
            case 0xDF: this.call(24); break;                                // RST 3

            case 0xE0: if (!p) this.PC = this.pop(); break;                 // RPO
            case 0xE1: hl = this.pop(); 
                       this.H = this.hi(hl); 
                       this.L = this.lo(hl); break;                         // POP DE
            case 0xE2: if (!p) this.PC = addr; break;                       // JPO
            case 0xE3: let newhl = this.pop();
                       this.push(hl);
                       this.H = this.hi(newhl);
                       this.L = this.lo(newhl); break;                      // XTHL
            case 0xE4: if (!p) this.call(addr); break;                      // CPO
            case 0xE5: this.push(hl); break;                                // PUSH HL
            case 0xE6: this.A = this.and(this.A, data); break;              // ANI data
            case 0xE7: this.call(32); break;                                // RST 4

            case 0xE8: if (p) this.PC = this.pop(); break;                  // RPE
            case 0xE9: this.PC = hl; break;                                 // PCHL
            case 0xEA: if (p) this.PC = addr; break;                        // JPE
            case 0xEB: this.D = this.hi(hl);
                       this.E = this.lo(hl)
                       this.H = this.hi(de);
                       this.L = this.lo(de); break;                         // XCHG
            case 0xEC: if (p) this.call(addr); break;                       // CPE
            case 0xED: break;                                               // unassigned
            case 0xEE: this.A = this.xor(this.A, data); break;              // XRI data
            case 0xEF: this.call(40); break;                                // RST 5

            case 0xF0: if (!s) this.PC = this.pop(); break;                      // RP
            case 0xF1: psw = this.pop(); 
                       this.A = this.hi(psw); 
                       this.Flags = this.lo(psw); break;                    // POP PSW
            case 0xF2: if (!s) this.PC = addr; break;                       // JP
            case 0xF3: break;                                               // * DI
            case 0xF4: if (!s) this.call(addr); break;                      // CP
            case 0xF5: this.push(psw); break;                               // PUSH PSW
            case 0xF6: this.A = this.or(this.A, data); break;               // ORI data
            case 0xF7: this.call(48); break;                                // RST 6

            case 0xF8: if (s) this.PC = this.pop(); break;                       // RM
            case 0xF9: this.SP = hl; break;                            // SPHL
            case 0xFA: if (s) this.PC = addr; break;                        // JM
            case 0xFB: break;                                               // * EI
            case 0xFC: if (s) this.call(addr); break;                       // CM
            case 0xFD: break;                                               // unassigned
            case 0xFE: this.sub(this.A, data, false); break;                // CPI data
            case 0xFF: this.call(56); break;                                // RST 7
        }

        // TODO: Think this is no longer needed here!

        // This flag will be set to false for reading console input
        if (this.okCallCallback)
        {
            this.nextCallback();           // TODO: Pass true or false for halt ? 
        }
    }

    fuse(hi, lo)
    {
        return 256 * hi + lo;
    }

    hi(n)
    {
        return 255 & (n >> 8);
    }

    lo(n)
    {
        return 255 & n;
    }

    storeByteInMemory(addr, byte)
    {
        // This is the memory that the emulator is using
        this.memblock[addr] = byte;

        // This is the memory that the user sees in the Memory list
        this.memory.insertByte(addr, byte);
    }

    push(data16)
    {
        this.SP = this.dcx(this.SP);
        this.storeByteInMemory(this.SP, this.hi(data16));
        this.SP = this.dcx(this.SP);
        this.storeByteInMemory(this.SP, this.lo(data16));
    }

    pop()
    {
        let lo = this.memblock[this.SP];
        this.SP = this.inx(this.SP);
        let hi = memblock[this.SP];
        this.SP = this.inx(this.SP);
        return this.fuse(hi, lo);
    }

    call(addr)
    {
        this.push(this.PC);
        this.PC = addr; 
    }

    add(n1, n2, carry)
    {
        let ac = (((n1 & 15) + (n2 & 15) + (carry ? 1 : 0)) & 16) != 0;
        let sum = n1 + n2 + (carry ? 1 : 0);

        let cy = (sum & 256) != 0;
        sum &= 255;
        
        this.setFlags(sum, cy, ac);
        return sum;
    }

    sub(n1, n2, carry)
    {
        let ac = (((n1 & 15) - (n2 & 15) - (carry ? 1 : 0)) & 16) != 0;
        let diff = n1 - n2 - (carry ? 1 : 0);

        let cy = (diff & 256) != 0;
        diff &= 255;

        this.setFlags(diff, cy, ac);
        return diff;
    }

    and(n1, n2)
    {
        let res = n1 & n2;
        let cy = false;
        let ac = ((n1 | n2) & 0x80) != 0;

        this.setFlags(res, cy, ac);

        return res;
    }

    xor(n1, n2)
    {
        let res = n1 ^ n2;
        let cy = false;
        let ac = false;

        this.setFlags(res, cy, ac);

        return res;
    }

    or(n1, n2)
    {
        let res = n1 | n2;
        let cy = false;
        let ac = false;

        this.setFlags(res, cy, ac);

        return res;
    }
    inx(num)
    {
        return 65535 & (num + 1);
    }

    dcx(num)
    {
        return 65535 & (num - 1);
    }

    inr(num)
    {
        let cy = this.getcy();             // retain existing CY flag
        let ac = (((num & 15) + 1) & 16) != 0;

        num = 255 & (num + 1);
        this.setFlags(num, cy, ac);
        return num;
    }

    dcr(num)
    {
        let cy = this.getcy();
        let ac = (((num & 15) + 15) & 16) != 0;

        num = 255 & (num - 1);
        this.setFlags(num, cy, ac);
        return num;
    }

    setFlags(num, cy, ac)
    {
        let z = num == 0;
        let s = (num & 128) != 0;
        let p = this.parity(num);

        this.Flags = (cy ? 0x01 : 0) |
                     (p ? 0x04 : 0) |
                     (ac ? 0x10 : 0) |
                     (z ? 0x40 : 0) |
                     (s ? 0x80 : 0);
    }

    parity(n)
    {
        let count = 0;

        for (let i = 0; i < 8; i++)
        {
            count += n & 1;
            n >>= 1;
        }

        return (count & 1) != 1;
    }

    dad(hl, rp)
    {
        hl += rp;
        this.setcy((65536 & hl) != 0);
        hl &= 65535;
        this.H = this.hi(hl);
        this.L = this.lo(hl);
    }

    setcy(val)
    {
        if (val)
            this.Flags |= 0x01;
        else
            this.Flags &= 0xFE;
    }

    getcy()
    {
        return (this.Flags & 0x01) != 0;
    }

    halted()
    {
        this.cpu.halted();
    }
}

