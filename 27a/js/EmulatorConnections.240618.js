// EmulatorConnections (c) Charles Petzold, 2024
// ©️自权的SPACE 2025 汉化

// Initialize local storage and get all keys
let storage = new LocalStorageWrapper(); 

// Get all HTML elements
let asmEditBox = document.getElementById("asmeditbox");
let assembleBtn = document.getElementById("assembleBtn");

let consoleTextBox = document.getElementById("consoleTextBox");

let messageArea = document.getElementById("messageArea");
let notificationMessage = document.getElementById("notificationMessage");

// Create classes for Editor, File System, Assembler Memory, and Output
let editor = new Editor(asmEditBox);

document.addEventListener("editorChange", (event) =>
{
    let editorHasContent = editor.getContent().length > 0;
    assembleBtn.disabled = !editorHasContent;

})

let editorMenu = new EditorMenu(editor, storage);

let errorMessage = document.getElementById("errorMessage");

let codelist= document.getElementById("codelist");
let assembler = new I8080Assembler();

// This class assembles the machine code and lists the bytes in the codelist element
let memory = new AssemblerMemory(assembler, codelist);

let memblock = new Array(65536);

let consoleIO = new ConsoleIO(consoleTextBox);
let emulator = new I8080Emulator(memblock, memory, consoleIO);
let cpu = new CPU(emulator, memory);
cpu.disable();

// Assemble Button
assembleBtn.addEventListener("click", (event) =>
{
    cpu.disable();
    let success = memory.assemble(editor.getContent());

    if (success)
    {
        let codes = assembler.machineCode;
        memblock.fill(0);

        for (let i = 0; i < codes.length; i++)
        {
            memblock[i] = codes[i];
        }

        emulator.setInitialPC(assembler.instructions[0].pc)
        emulator.reset();
        
        cpu.enable();
        cpu.reset();

        errorMessage.innerHTML = "\xA0";
    }
    else
    {
        // TODO: WHY ISN'T MEMORY CLEARED? 

        let error = assembler.error;

        if (error.line != undefined)
        {
            errorMessage.innerHTML = "Error at line " + (error.line + 1) + ": " + error.message;
            editor.selectLine(error.line);
        }
        else
        {
            errorMessage.innerHTML = "Error: " + error.message;
        }

        errorMessage.style.color = "#FF0000";
    }
}); 





