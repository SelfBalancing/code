// EmulatorEditorMenu (c) Charles Petzold, 2024

class EditorMenu
{
    constructor(editor, storage)
    {
        // Save the constructor params
        this.editor = editor;
        this.storage = storage;

        // Name of file being edited
        this.editorFilename = null;

        // Get titlebar
        this.titlebar = document.getElementById("editorTitlebar");

        // Event to dismiss submenu
        document.addEventListener("click", this.onDocumentClick.bind(this));

        // Attach handlers to custom editor events
        document.addEventListener("editorChange", this.onEditorChange.bind(this));
        document.addEventListener("editorSelectionChange", this.onEditorSelectionChange.bind(this));

        // Get the menu buttons
        this.menuFile = document.getElementById("menuFile");
        this.fileSubmenu = document.getElementById("fileSubmenu");

        this.fileNew = document.getElementById("fileNew");
        this.fileOpen = document.getElementById("fileOpen");
        this.fileSave = document.getElementById("fileSave");
        this.fileSaveAs = document.getElementById("fileSaveAs");
        this.fileInsert = document.getElementById("fileInsert");
        this.fileSaveSelection = document.getElementById("fileSaveSelection");

        // Attach handlers to the menu buttons
        // TODO: Should this be mousedown to prevent focus change? 
        this.menuFile.addEventListener("click", this.onMenuFileClick.bind(this));

        this.fileNew.addEventListener("click", this.onMenuFileNewClick.bind(this));
        this.fileOpen.addEventListener("click", this.onMenuFileOpenClick.bind(this));
        this.fileSave.addEventListener("click", this.onMenuFileSaveClick.bind(this));
        this.fileSaveAs.addEventListener("click", this.onMenuFileSaveAsClick.bind(this));
        this.fileInsert.addEventListener("click", this.onMenuFileInsertClick.bind(this));
        this.fileSaveSelection.addEventListener("click", this.onMenuFileSaveSelectionClick.bind(this));

        // Get the Query File Save dialog (message box, actually)
        // ------------------------------------------------------
        this.queryFileSaveDialog = document.getElementById("queryFileSaveDialog");
        this.queryFileSaveFilename = document.getElementById("queryFileSaveFilename");

        // Handler for closing dialog box
        this.queryFileSaveDialog.addEventListener("close", this.onQueryFileSaveDialogClose.bind(this));

        // Handlers for the three buttons in the Query File Save dialog
        document.getElementById("queryFileSaveSaveButton").addEventListener("click", 
            (() => {this.queryFileSaveDialog.close("save")}).bind(this));
        document.getElementById("queryFileSaveDontButton").addEventListener("click", 
            (() => {this.queryFileSaveDialog.close("dont")}).bind(this));
        document.getElementById("queryFileSaveCancelButton").addEventListener("click", 
            (() => {this.queryFileSaveDialog.close("cancel")}).bind(this));

        // ----------------------
        // Query Overwrite dialog 
        // ----------------------
        this.queryOverwriteDialog = document.getElementById("queryOverwriteDialog");
        this.queryOverwriteFilename = document.getElementById("queryOverwriteFilename");

        // Handler for closing dialog box
        this.queryOverwriteDialog.addEventListener("close", this.onQueryOverwriteDialogClose.bind(this));

        // Handlers for the two buttons
        document.getElementById("queryOverwriteYesButton").addEventListener("click",
            (() => {this.queryOverwriteDialog.close("yes")}).bind(this));
        
        document.getElementById("queryOverwriteNoButton").addEventListener("click",
            (() => {this.queryOverwriteDialog.close("no")}).bind(this));

        // ----------------------------------
        // Composite Open and Save dialog box
        // ----------------------------------
        this.fileDialog = document.getElementById("fileDialog");
        this.dialogHeader = document.getElementById("dialogHeader");
        this.filelist = document.getElementById("filelist");
        this.filedesc = document.getElementById("filedesc");
        this.filename = document.getElementById("filename");
        this.readOnlyWarning = document.getElementById("readOnlyWarning");
        this.fileNotFoundWarning = document.getElementById("fileNotFoundWarning");
        this.dlgOpenSaveButton = document.getElementById("dlgOpenSaveButton");

        // Handler for change of filelist and filename
        this.filelist.addEventListener("change", this.onFileListChange.bind(this));
        this.filename.addEventListener("input", this.onFileNameChange.bind(this));

        // Handler for closing dialog box
        this.fileDialog.addEventListener("close", this.onFileDialogClose.bind(this));

        // Attach handlers to the dialog box buttons


        // TODO: No, no, no, can't call close just yet!

        document.getElementById("dlgOpenSaveButton").addEventListener("click", 
            this.onOpenSaveButtonClick.bind(this));

  //      document.getElementById("dlgOpenSaveButton").addEventListener("click", 
  //          (() => {this.fileDialog.close(this.isOpenDialog ? "open" : "save")}).bind(this));

        document.getElementById("dlgCancelButton").addEventListener("click", 
            (() => {this.fileDialog.close("cancel")}).bind(this));


        this.readOnly = false;
        this.enableDisableMenuButtons();
    }

    //----------------
    // Editor changes
    //----------------
    onEditorChange()
    {
        this.isDirty = true;
        this.enableDisableMenuButtons();
    }

    onEditorSelectionChange()
    {
        this.enableDisableMenuButtons();
    }

    enableDisableMenuButtons()
    {
        let editorHasContent = this.editor.getContent().length > 0;
        let editorHasSelection = this.editor.getSelection().length > 0;

        this.fileSave.disabled = !editorHasContent || 
                                    (this.editorFilename == null) ||
                                    this.readOnly;
        this.fileSaveAs.disabled = !editorHasContent;
        this.fileSaveSelection.disabled = !editorHasContent || !editorHasSelection;
    }

    // --------------
    // Top-level menu handlers
    // --------------
    onDocumentClick(event)
    {
        this.fileSubmenu.style.display = "none";
    }

    onMenuFileClick(event)
    {
        if (this.fileSubmenu.style.display == "none")
        {
            this.fileSubmenu.style.display = "block";
            event.stopPropagation();     
        }
    }

    // --------------------------------------
    // Menu File New and query dialog handler
    // --------------------------------------
    onMenuFileNewClick(event)
    {
        this.operation = "FileNew";

        if (this.isDirty)
        {
            this.queryFileSaveFilename.innerHTML = "'" + (this.editorFilename ?? "Untitled") + "'";
            this.queryFileSaveDialog.showModal();
        }
        else
        {
            this.editor.setContent("");
            this.editorFilename = null;
            this.updateTitlebar();
            this.isDirty = false;
        }
    }

    onQueryFileSaveDialogClose(event)
    {
        switch(this.queryFileSaveDialog.returnValue)
        {
            case "save":
                this.onMenuFileSaveClick(event);
                break;

            case "dont":
                if (this.operation == "FileNew")
                {
                    this.editor.setContent("");
                    this.editorFilename = null;
                    this.updateTitlebar();
                    this.isDirty = false;
                }
                else if (this.operation == "FileOpen")
                {
                    this.initializeDialogBox(true, false, "Open File", "Open", this.editorFilename);
                }

                break;

            default:
                console.log("query cancel");
                break;
        }
    }

    // ---------------------------------------
    // Menu File Open and query dialog handler
    // ---------------------------------------
    onMenuFileOpenClick(event)
    {
        this.operation = "FileOpen";

        if (this.isDirty)
        {
            this.queryFileSaveFilename.innerHTML = "'" + (this.editorFilename ?? "Untitled") + "'";
            this.queryFileSaveDialog.addEventListener("close", this.onMenuFileOpenQueryDialogClose.bind(this));
            this.queryFileSaveDialog.showModal();
        }
        else
        {
            this.initializeDialogBox(true, false, "Open File", "Open", this.editorFilename);
        }
    }

    

    onMenuFileSaveClick(event)
    {
        this.operation = "FileSave";

        if (this.editorFilename != null)
        {
            this.storage.save(this.editorFilename, this.editor.getContent());
            this.isDirty = false;
        }
        else
        {
            this.onMenuFileSaveAsClick(event);
        }
    }

    onMenuFileSaveAsClick(event)
    {
        this.operation = "FileSaveAs";

        this.initializeDialogBox(false, false, "Save File", "Save", this.editorFilename);
    }

    onMenuFileInsertClick(event)
    {
        this.operation = "FileInsert";

        this.initializeDialogBox(true, true, "Insert File", "Open", null);
    }

    onMenuFileSaveSelectionClick(event)
    {
        this.operation = "FileSaveSelection";

        this.initializeDialogBox(false, true, "Save Selection", "Save", null);        
    }

    updateTitlebar()
    {
        this.titlebar.innerText = "Editor - " + (this.editorFilename ?? "Untitled");
    }

    //----------------------------------- 
    // Open / Save Dialog Box Support
    //-----------------------------------
 
    initializeDialogBox(isOpen, isSnippet, captionText, buttonText, filename)
    {
        this.isOpenDialog = isOpen;
        this.isSnippetDialog = isSnippet;
        this.dialogHeader.innerText = captionText;
        this.dlgOpenSaveButton.innerText = buttonText;
        this.filename.value = filename ?? "";
        this.fillFileList();
        this.enableAndDisableButton();
        this.fileDialog.showModal();
    }

    fillFileList()
    {
        // Clear the file list
        this.filelist.length = 0;  

        // Get all the keys from local storage
        let keys = this.storage.getAllKeys();

        // Enumerate through keys (i.e. "file names") and add to file list
        for (let key of keys)
        {
            let option = new Option(key);
            this.filelist.add(option);
        }
    }

    onFileListChange(event)
    {
        if (this.filelist.selectedIndex == -1)
        {
            this.filename.value = "";
        }
        else
        {
            this.filename.value = filelist.value;
            
            let text = this.storage.load(this.filename.value);
            let marker = text.indexOf("||");

            if (marker != -1)
            {
                this.filedesc.innerHTML = text.substring(0, marker);
            }
            else
            {
                this.filedesc.innerText = "";
            }

        }
    
        this.enableAndDisableButton();
    };

    onFileNameChange(event)
    {
        this.enableAndDisableButton();
    }

    enableAndDisableButton()
    {
        let filenameHasContent = this.filename.value.length > 0;

        if (this.isOpenDialog)
        {
            let fileExists = filenameHasContent && 
                        this.storage.exists(this.filename.value);

            this.dlgOpenSaveButton.disabled = !filenameHasContent ||
                                                !fileExists;

            this.fileNotFoundWarning.style.visibility = 
                filenameHasContent && !fileExists ? "visible" : "hidden";    
        }
        else
        {
            // For Save, must check if the file is read-only
            let isSelectionReadOnly = false;

            // Check if selected file is read-only
            if (filenameHasContent && this.storage.exists(this.filename.value))
            {
                let text = this.storage.load(this.filename.value);
                let index = text.indexOf("||");
    
                if (index != -1)
                {
                    isSelectionReadOnly = text.substring(0, index).includes("read-only");
                }
            }
    
            this.dlgOpenSaveButton.disabled = !filenameHasContent ||
                                                isSelectionReadOnly;

            this.readOnlyWarning.style.visibility = 
                isSelectionReadOnly ? "visible" : "hidden";                                                
        }
    }

    // In the Open / Save dialog box, the Cancel button closes the
    //  dialog via listener attached in constructor to onFileDialogClose.

    // However, the Open / Save button must be handled a little
    //  differently. If it's a Save and if the filename exists,
    //  then the queryOverwriteDialog must be invoked.

    // The Yes or No buttons from that dialog box are set in 
    //  listeners in the constuctor to close the dialog, and
    //  thus handled in the onQueryOverwriteDialogClose.

    // The Yes button closes the Open / Save dialog. The No
    //  button does not.
    onOpenSaveButtonClick(event)
    {
        if (!this.isOpenDialog &&
            this.storage.exists(this.filename.value))
        {
            this.queryOverwriteDialog.queryOverwriteFilename = this.filename.value;
            this.queryOverwriteDialog.showModal();
        }
        else
        {
            this.fileDialog.close((this.isOpenDialog ? "open" : "save") + 
                                  (this.isSnippetDialog ? "snippet" : "file"));
        }

    }
        
    onQueryOverwriteDialogClose(event)
    {
        switch(this.queryOverwriteDialog.returnValue)
        {
            case "yes":
                console.log("query overwrite Yes");
                this.fileDialog.close("save" + (this.isSnippetDialog ? "snippet" : "file"));
                break;

            case "no":
                console.log("query overwrite No");
                break;
            break;
        }
    }

    onFileDialogClose(event)
    {
        switch(this.fileDialog.returnValue)
        {
            case "openfile":
                if (this.storage.exists(this.filename.value))
                {
                    this.editorFilename = this.filename.value;
                    let text = this.storage.load(this.filename.value);
                    let marker = text.indexOf("||");
                    this.readOnly = false;
    
                    if (marker != -1)
                    {
                        this.readOnly = text.substring(0, marker).includes("read-only");
                        text = text.substring(marker + 3);
                    }

                    this.editor.setContent(text);
                    this.updateTitlebar();
                    this.enableDisableMenuButtons();
                    this.isDirty = false;
                }
                break;

            case "opensnippet":
                if (this.storage.exists(this.filename.value))
                {
                    let text = this.storage.load(this.filename.value);
                    let marker = text.indexOf("||");
    
                    if (marker != -1)
                    {
                        text = text.substring(marker + 3);
                    }

                    this.editor.insertContent(text);
                    this.enableDisableMenuButtons();
                    this.isDirty = true;
                }
             
            break;

            case "savefile":
                this.editorFilename = this.filename.value;
                let text = this.editor.getContent();
                this.storage.save(this.editorFilename, text);
                this.readOnly = false;
                this.updateTitlebar();
                this.enableDisableMenuButtons();
                this.isDirty = false;

                // We are here perhaps of a File New or File Open
                //  operation that required saving a file. Here's
                //  additional processing for those cases. 

                if (this.operation == "FileNew") // this.isFileNewOperation)
                {
                    this.editorFilename = null;
                    this.editor.setContent("");
                }
                else if (this.operation == "FileOpen")
                {
                    this.initializeDialogBox(true, "Open File", "Open", this.editorFilename);
                }
                break;

            case "savesnippet":
                let snippet = this.editor.getSelection();
                this.storage.save(this.filename.value, snippet);
                this.enableDisableMenuButtons();
                break; 

            default:
                break;
        }
    }
}