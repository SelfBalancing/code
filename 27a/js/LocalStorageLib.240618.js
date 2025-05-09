// LocalStorageLib (c) Charles Petzold, 2024

class LocalStorageWrapper
{
    constructor()
    {
        this.initialize();
    }

    getAllKeys()
    {
        let numKeys = localStorage.length;
        let keys = [];

        for (let index = 0; index < numKeys; index++)
        {
            let key = localStorage.key(index);

            if (key.endsWith(".asm"))
            {
                key = key.slice(0, -4);
                keys.push(key);
            }
        }

        keys.sort();

        return keys;
    }

    save(key, value)
    {
        localStorage.setItem(key + ".asm", value);
    }

    load(key)
    {
        return localStorage.getItem(key + ".asm");
    }

    exists(key)
    {
        return this.load(key) != null;
    }

    initialize()
    {
        // TODO: Remove this!
    //    localStorage.clear();

        this.updateFile('Code page 318: Add 16-bit numbers.asm',
        [
            "<b>Chapter 21, page 318</b><br /><br />",
            "This is the assembly language version of the ",
            "machine code program shown on page 318, with comments.<br /><br />",
            "It adds two 16-bit numbers together with a ",
            "combination of immediate instructions and TK.<br /><br />",
            "This file is read-only.",
            "||",
            "MVI A,88h   ; Move next byte into CPU",
            "ADI 0C4h    ; Add next byte to value in CPU",
            "STA 0010h   ; Store result in address 0010h",
            "MVI A,13h   ; Move next byte into CPU",
            "ACI 09h     ; Add next byte to value in CPU",
            "STA 0011h   ; Store result in address 0010h",
            "HLT         ; Halt",
            "DB 0",
            "DB 0        ; Place to store result",
            "DB 0"
        ].join('\n'));

        this.updateFile('Code page 340: Add byte with register.asm', 
        [
            "<b>Chapter 22, page 340</b><br /><br />",
            "This program accesses a byte stored at memory ",
            "location 2044h, adds 33h to it, and stores ", 
            "the result back in 2044h.<br /><br />",
            'An ORG ("origin") statement has been added ',
            "to identify the memory location, and a DB",
            '("data byte") statement to initialize the value.<br /><br />',
            "This file is read-only.",
            "||",
            "LDA 2044h",
            "MVI B,33h",
            "ADD B",
            "STA 2044h",
            "HLT",
            "ORG 2044h", 
            "DB 66h      ; Source and destination of addition"
        ].join('\n'));

        this.updateFile('Code page 341: Add byte with immediate instruction.asm', 
        [
            "<b>Chapter 22, page 341</b><br /><br />",
            "This program accesses a byte stored at memory ",
            "location 2044h, adds 33h to it, and stores ", 
            "the result back in 2044h.<br /><br />",
            'An ORG ("origin") statement has been added ',
            "to identify the memory location, and a DB",
            '("data byte") statement to initialize the value.<br /><br />',
            "This file is read-only.",
            "||",
            "LDA 2044h",
            "ADI 33h",
            "STA 2044h",
            "HLT",
            "ORG 2044h", 
            "DB 66h      ; Source and destination of addition"
        ].join('\n'));
        
        this.updateFile('Code page 343: Add byte with indirect addressing.asm',  
        [
            "<b>Chapter 22, page 343</b><br /><br />",
            "This program accesses a byte stored at memory ",
            "location 2044h, adds 33h to it, and stores ", 
            "the result back in 2044h.<br /><br />",
            'An ORG ("origin") statement has been added ',
            "to identify the memory location, and a DB",
            '("data byte") statement to initialize the value.<br /><br />',
            "This file is read-only.",
            "||",
            "MVI H, 20h",
            "MVI L, 44h",
            "MOV A,M",
            "ADI 33h",
            "MOV M,A",
            "HLT",
            "ORG 2044h",
            "DB 66h      ; Source and destination of addition"
        ].join('\n'));

        this.updateFile('Code page 349: Add list of bytes.asm', 
        [
            "<b>Chapter 22, page 349</b><br /><br />",
            "This program adds five bytes stored at address 1000h.<br /><br />",
            'An ORG ("origin") statement has been added ',
            "to identify the memory location of the source of these bytes, and a DB",
            '("data byte") statement to initialize the five values.<br /><br />',
            "This file is read-only.",
            "||",
            "MVI L, 00h",
            "MVI H, 10h",
            "MOV A, M",
            "INX HL",
            "ADD M",
            "INX HL",
            "ADD M",
            "INX HL",
            "ADD M",
            "INX HL",
            "ADD M",
            "STA 0011h",
            "HLT",
            "ORG 0011h",
            "DB 00h",
            "ORG 1000h",
            "DB 11h, 22h, 33h, 44h, 55h   ; List of bytes to add"
        ].join('\n'));
        
        this.updateFile('Code page 359: Add bytes.asm', 
        [
            "<b>Chapter 23, page 359</b><br /><br />",
            "A short program that simply demonstrates different byte ",
            "of instructions.<br /><br />",
            "This file is read-only.",
            "||",
            "MVI A, 27h",
            "MOV B,A",
            "ADI 61h",
            "ADD B",
            "STA 000Ah",
            "HLT",
            "DB 0       ; Place where sum is stored"
        ].join('\n'));

        this.updateFile('Code page 377: Add list of bytes.asm', 
        [
            "<b>Chapter 23, page 377</b><br /><br />",
            "This program is identical to the one on page 349. ",
            "It adds five bytes stored at address 1000h.<br /><br />",
            'An ORG ("origin") statement has been added ',
            "to identify the memory location of the source of these bytes, and a DB",
            '("data byte") statement to initialize the five values.<br /><br />',
            "This file is read-only.",
            "||",
            "MVI L, 00h",
            "MVI H, 10h",
            "MOV A, M",
            "INX HL",
            "ADD M",
            "INX HL",
            "ADD M",
            "INX HL",
            "ADD M",
            "INX HL",
            "ADD M",
            "STA 0011h",
            "HLT",
            "ORG 0011h",
            "DB 00h",
            "ORG 1000h",
            "DB 11h, 22h, 33h, 44h, 55h   ; List of bytes to add"
        ].join('\n'));

        this.updateFile('Code page 380: Add list of bytes.asm', 
        [
            "<b>Chapter 24, page 380</b><br /><br />",
            "This program is identical to the ones on page 349 and 377. ",
            "It adds five bytes stored at address 1000h.<br /><br />",
            'An ORG ("origin") statement has been added ',
            "to identify the memory location of the source of these bytes, and a DB",
            '("data byte") statement to initialize the five values.<br /><br />',
            "This file is read-only.",
            "||",
            "MVI L, 00h",
            "MVI H, 10h",
            "MOV A, M",
            "INX HL",
            "ADD M",
            "INX HL",
            "ADD M",
            "INX HL",
            "ADD M",
            "INX HL",
            "ADD M",
            "STA 0011h",
            "HLT",
            "ORG 0011h",
            "DB 00h",
            "ORG 1000h",
            "DB 11h, 22h, 33h, 44h, 55h   ; List of bytes to add"
        ].join('\n'));

        this.updateFile('Code page 381: Add bytes with unending loop.asm',
        [
            "<b>Chapter 24, page 381</b><br /><br />",
            "This program adds a list of bytes using a loop. ",
            'But since there\'s no code to stop the loop, it will run "forever." ',
            "Press the <b>Break</b> key to stop it.<br /><br />",
            'An ORG ("origin") statement has been added ',
            "to identify the memory location of the source of these bytes, and a DB",
            '("data byte") statement to initialize the five values.<br /><br />',
            "This file is read-only.",
            "||",
            "MVI L, 00h",
            "MVI H, 10h",
            "MOV A, M",
            "INX HL",
            "ADD M",
            "JMP 0005h",
            "ORG 1000h",
            "DB 11h, 22h, 33h, 44h, 55h   ; List of bytes to add"
        ].join('\n'));

        this.updateFile('Code page 383-384: Add fixed number of bytes.asm',
        [
            "<b>Chapter 244, pages 383-384</b><br /><br />",
            "This program adds 200 bytes and stores the result in ",
            "memory location 001Ah.<br /><br />",
            'An ORG ("origin") statement has been added ',
            "to identify the memory location of the source of these bytes, and DB ",
            '("data byte") statements to initialize the 200 values.',
            "To prevent overflow, they've all been initialized to 1.",
            "The sum is 200 or C8h.<br /><br />",
            "This file is read-only.",
            "||",
            "MVI L, 00h         ; Initialization",
            "MVI H, 10h",
            "MVI C, 200",
            "MOV B, M",
            "",
            "MOV A, C           ; Repeated instructions",
            "SUI 1",
            "JZ 0015h",
            "MOV C, A",
            "INX HL",
            "MOV A, B",
            "ADD M",
            "MOV B, A",
            "JMP 0007h",
            "",
            "MOV A, B           ; Conclusion",
            "STA 001Ah",
            "HLT",
            "",
            "DB 0               ; Place where sum is stored",
            "",
            "ORG 1000h",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1"
        ].join('\n'));

        this.updateFile('Code page 384-385: Add fixed number of bytes.asm',
        [
            "<b>Chapter 244, pages 384-385</b><br /><br />",
            "This program shows an alternative approach to adding 200 bytes ", 
            "and storing the result in memory location 0017h.<br /><br />",
            'An ORG ("origin") statement has been added ',
            "to identify the memory location of the source of these bytes, and DB ",
            '("data byte") statements to initialize the 200 values.',
            "To prevent overflow, they've all been initialized to 1.",
            "The sum is 200 or C8h.<br /><br />",
            "This file is read-only.",
            "||",
            "MVI L, 00h         ; Initialization",
            "MVI H, 10h",
            "MVI C, 199",
            "MOV B, M",
            "",
            "INX HL             ; Repeated instructions",
            "MOV A, B",
            "ADD M",
            "MOV B, A",
            "MOV A, C",
            "SUI 1",
            "MOV C, A",
            "JNZ 0007h",
            "",
            "MOV A, B           ; Conclusion",
            "STA 0017h",
            "HLT",
            "",
            "DB 0               ; Place where sum is stored",
            "",
            "ORG 1000h",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1"
        ].join('\n'));

        this.updateFile('Code page 386: Add bytes with sentinel.asm',
        [
            "<b>Chapter 24, pages 386</b><br /><br />",
            "This program includes labels. ",
            "It adds 100 bytes delimited by a sentinel, ", 
            "and stores the result in a location identified by a label.<br /><br />",
            'An ORG ("origin") statement has been added ',
            "to identify the memory location of the source of these bytes, and DB ",
            '("data byte") statements to initialize the 100 values.',
            "The sum is 100 or 64h.<br /><br />",
            "This file is read-only.",
            "||",
            "Start:    MVI L, 00h      ; Initialization",
            "          MVI H, 10h",
            "          MVI B, 00h",
            "",
            "Loop:     MOV A, M        ; Repeated instructions",
            "          CPI 00h",
            "          JZ End",
            "          ADD B",
            "          MOV B, A",
            "          INX HL",
            "          JMP Loop",
            "",
            "End:      MOV A, B        ; Conclusion",
            "          STA Result",
            "          HLT",
            "",
            "Result:   DB 0",
            "",
            "          ORG 1000h",
            "          DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "          DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "          DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "          DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "          DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "          DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "          DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "          DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "          DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "          DB 1, 1, 1, 1, 1, 1, 1, 1, 1, 1",
            "          DB 0",
        ].join('\n'));

        this.updateFile('Code page 390-391: Slow Multiply.asm',
        [
            "<b>Chapter 24, pages 390-391</b><br /><br />",
            "This program muliplies two bytes for a 32-bit result ",
            "stored in HL. It uses a simple but slow approach to ",
            "multiplication.<br /><br />",
            "This file is read-only.",
            "||",
            "Start:    MVI B, 0D1h     ; Set B to multiplicand",
            "          MVI C, 84h      ; Set C to multiplier",
            "          MVI H, 00h      ; Initialize HL to zero",
            "          MVI L, 00h",
            "Loop:     MOV A, B        ; Check if B is zero",
            "          CPI 00h",
            "          JZ Done         ; All finished if so",
            "          MOV A, L        ; Add C to HL",
            "          ADD C",
            "          MOV L, A",
            "          MOV A, H",
            "          ACI 00h",
            "          MOV H, A",
            "          MOV A, B        ; Decrement B",
            "          SBI 01h",
            "          MOV B, A",
            "          JMP Loop        ; Repeat calculation",
            "Done:     HLT             ; HL contains result"
        ].join('\n'));

        this.updateFile('Code page 393-394: Fast Multiply.asm',
        [
            "<b>Chapter 24, pages 393-394</b><br /><br />",
            "This program muliplies two bytes for a 32-bit result ",
            "stored in HL. It uses a more complex but faster approach to ",
            "multiplication.<br /><br />",
            "This file is read-only.",
            "||",
            "Start:    MVI D, 0D1h     ; Multiplicand",
            "          MVI C, 84h      ; Set multiplier in BC",
            "          MVI B, 00h",
            "          MVI E, 01h      ; Bit tester",
            "          MVI H, 00h      ; Use HL for 2-byte result",
            "          MVI L, 00h",
            "Loop:     MOV A, D",
            "          ANA E           ; Test if bit is 0 or 1",
            "          JZ Skip",
            "          MOV A, L        ; Add BC to HL",
            "          ADD C",
            "          MOV L, A",
            "          MOV A, H",
            "          ADC B",
            "          MOV H, A",
            "Skip:     MOV A, C        ; Double BC, the multiplier",
            "          ADD C",
            "          MOV C, A",
            "          MOV A, B",
            "          ADC B",
            "          MOV B, A",
            "          MOV A, E        ; Double E, the bit tester",
            "          ADD E",
            "          MOV E, A",
            "          JNZ Loop",
            "Done:     HLT             ; HL contains result"
        ].join('\n'));

        this.updateFile('Code page 396-398: Subroutines demonstration.asm',
        [
            "<b>Chapter 24, pages 396-398</b><br /><br />",
            "This program demonstrates subroutines that convert a hexadecimal ",
            "byte to two bytes of ASCII.<br /><br />",
            "A JMP instruction has been added at address 0000h, and a HLT ",
            "instruction at 0628h.<br /><br />",
            "This file is read-only.",
            "||",
            "          JMP Convert",
            "",
            "          ORG 0623h",
            "Convert:  MVI A, 5Bh      ; Byte to convert to ASCII",
            "          CALL ToAscii",
            "          HLT             ; Result in HL",
            "",
            "          ORG 14F8h",
            "ToAscii:  MOV B, A",
            "          ANI 0Fh",
            "          CALL Digit",
            "          MOV L, A",
            "          MOV A, B",
            "          RRC",
            "          RRC",
            "          RRC",
            "          RRC",
            "          ANI 0Fh",
            "          CALL Digit",
            "          MOV H,A",
            "          RET",
            "",
            "          ORG 1532h",
            "Digit:    CPI 0Ah",
            "          JC Number",
            "          ADI 07h",
            "Number:   ADI 30h",
            "          RET"
        ].join('\n'));

        this.updateFile('Code page 426: PROGRAM1.ASM.asm',
        [
            "<b>Chapter 27, page 426</b><br /><br />",
            'This is the basic 8080 Assembly Language CP/M "Hello, world"',
            "program, enhanced just a bit from the version shown in ",
            "the book.<br /><br />",
            "This file is read-only.",
            "||",
            "          ORG 0100h",
            "          LXI DE, Text",
            "          MVI C, 9",
            "          CALL 5",
            "          RET",
            "Text:     DB 'Hello, world!$'",
            "          END",
        ].join('\n'));

        this.updateFile("Test CP/M Console Calls.asm",  

`<b>Test CP/M Console Calls</b><br /><br />
This program tests all the CP/M calls
supported by the emulator. It is in lowercase
just for some variety.<br /><br />
This file is read-only.
||
          org 0100h           ; Required for CP/M programs

cpm       equ 5               ; Rather than call 5, can use call cpm

; Test CP/M Console Output
; ------------------------

          lxi hl, message     ; Set to address of message
msgloop:  mov a, m            ; Get byte at HL
          cpi '$'             ; check if it's the end
          jz finishmsg        ; If so, jump
          mov e, a            ; Set E to character
          mvi c, 2            ; Set C to 2 for Console Output
          call cpm              ; Make CP/M call
          inx hl              ; Increment HL
          jmp msgloop         ; Jump to get the next character
finishmsg:

; Test CP/M Output String
; -----------------------

askname:                      ; Label is used later in program
          lxi de, enquiry     ; Set up for string output
          mvi c, 9
          call cpm            ; Display the string

; Test CP/M Buffered Input
; ------------------------

          lxi de, buffer      ; Set up for buffered input
          mvi c, 10
          call cpm

; Another Output String
; ---------------------
          lxi de, response
          mvi c, 9
          call cpm             ; Display the string

; Now display what the user typed
; -------------------------------

          lxi hl, buffer
          mov d, m            ; Number of characters
echoloop: mov a, d            ; Get the character count
          cpi 0               ; Check if it's zero
          jz finishecho       ; If so, exit the loop
          dcr d               ; Decrement the count
          inx hl              ; Increment the pointer
          mov e, m            ; Get the next character
          mvi c, 2
          call cpm            ; Display it
          jmp echoloop
finishecho:

; Some more single character outputs
; ----------------------------------
            
          mvi e, 10           ; line feed
          mvi c, 2
          call cpm
          call cpm

; Another string output
; ---------------------
            
          lxi de, again
          mvi c, 9
          call cpm

; Single character input
; ----------------------

          mvi c, 1
          call cpm            ; On return, A is character

          ani 0DFh            ; Make it a capital ("Code" page 326)
          cpi 'Y'             ; Check if it's a Yes
          jnz finish          ; Go to the end

          mvi e, 10           ; Display two more line feeds
          mvi c, 2
          call cpm
          call cpm

          lxi hl, buffer      ; Restore maximum character count
          mvi m, 0FFh
            
          jmp askname         ; Jump back up near the top

; A good-bye message
; ------------------

finish:   lxi de, goodbye
          mvi c, 9
          call cpm

; Terminate program
; -----------------
          mvi c, 0
          call cpm      

message:  db 'Hello, world!', 10, 10, '$'         ; Notice line feed characters
enquiry:  db 'Please enter your name: $'
buffer:   db 0ffh                                 ; maximum of 255 characters
          ds 0ffh                                 ; space for 255 characters
response: db 'Your name is $'
again:    db 'Would you like to play again? (Y/N) $'
goodbye:  db 10, 10, 'Bye bye!', 10, 10, '$'`);

        this.updateFile("Test Suite.asm",
        [
            "<b>Test Suite</b><br /><br />",
            "This is a program found on the internet that tests ",
            "an 8080 processor emulation. Much of the support ",
            "for aspects of Intel's implementation of 8080 Assembly Language was ",
            "based on this program.<br /><br />",
            "This file is read-only.",
            "||",
        ].join('\n') + '\n' + testSuite);

        this.updateFile("Test Suite Lowercase.asm", 
        [
            "<b>Test Suite (lower case)</b><br /><br />",
            "This is the same as the Test Suite except",
            "entirely in lowercase for additional testing.<br /><br />",
            "This file is read-only.",
            "||",
        ].join('\n') + '\n' + testsuite);
    }

    updateFile(key, value)
    {
        localStorage.setItem(key, value);
    }
}