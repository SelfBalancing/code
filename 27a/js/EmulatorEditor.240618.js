// EmulatorEditor (c) Charles Petzold, 2024

class Editor
{
    constructor(element)
    {
        this.txtbox = element;
        this.txtbox.addEventListener("keydown", this.txtboxKeyDown.bind(this));
        this.txtbox.addEventListener("input", this.txtboxChange.bind(this));

        // Not supported in many browsers (https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement/selectionchange_event)
        // this.txtbox.addEventListener("selectionchange", this.txtboxSelectionChange.bind(this));

        // Use these events to implement selection-change
        this.txtbox.addEventListener("keyup", this.txtboxCheckSelection.bind(this));
        this.txtbox.addEventListener("mousemove", this.txtboxCheckSelection.bind(this));
        this.txtbox.addEventListener("mouseup", this.txtboxCheckSelection.bind(this));

        // Use these variables to implement selection-change
        this.selectionStart = this.txtbox.selectionStart;
        this.selectionEnd = this.txtbox.selectionEnd;

        // Define two custom events
        this.changeEvent = new Event("editorChange");
        this.selectionchangeEvent = new Event("editorSelectionChange");
    }

    txtboxKeyDown(event)
    {
        // Trap Tab keys to allow easy indentation
        if (event.key == "Tab")
        {
            event.preventDefault();
            this.deleteSelection();

            let str = this.txtbox.value;
            let sel = this.txtbox.selectionStart;

            // Search backwards for the first end of line (ASCII 10)
            let i = sel - 1;
            let index = 0;

            while (i >= 0)
            {
                if (str.charCodeAt(i) == 10)
                    break;

                i--;
                index++;                            
            }

            let num = 10 - index % 10;

            str = str.substring(0, sel) + ' '.repeat(num) + str.substring(sel, str.length);
            this.txtbox.value = str;
            this.txtbox.selectionStart = sel + num;
            this.txtbox.selectionEnd = sel + num;
        }
    }

    txtboxCheckSelection(event)
    {
        // Fire selectionChange event when the selection changes
        if (this.selectionStart != this.txtbox.selectionStart ||
            this.selectionEnd != this.txtbox.selectionEnd)
        {
            document.dispatchEvent(this.selectionchangeEvent);

            this.selectionStart = this.txtbox.selectionStart;
            this.selectionEnd = this.txtbox.selectionEnd;
        }
    }

    txtboxChange()
    {
        document.dispatchEvent(this.changeEvent);
    }

    setContent(text)
    {
        this.txtbox.value = text;
        this.txtboxChange();
    }

    insertContent(text)
    {
        let str = this.txtbox.value;
        let beg = this.txtbox.selectionStart;
        let end = this.txtbox.selectionEnd;

        str = str.substring(0, beg) + text + str.substring(end, str.length);

        this.txtbox.value = str;
        this.txtbox.selectionEnd += text.length;
    }

    getContent()
    {
        return this.txtbox.value;
    }

    getSelection()
    {
        return this.txtbox.value.substring(this.txtbox.selectionStart, this.txtbox.selectionEnd)
    }

    deleteSelection()
    {
        let str = this.txtbox.value;
        let beg = this.txtbox.selectionStart;
        let end = this.txtbox.selectionEnd;

        // If characters are selected, delete them
        if (end > beg)
        {
            str = str.substring(0, beg) + str.substring(end, str.length);
            this.txtbox.value = str;
            this.txtbox.selectionStart = beg;
            this.txtbox.selectionEnd = beg;
        }
    }

    selectLine(lineNum)         // zero-based line number
    {
        let lineIndices = this.indexLines();

        this.txtbox.selectionStart = lineIndices[lineNum];
        this.txtbox.selectionEnd = lineIndices[lineNum + 1];
        this.txtbox.focus();
    }

    indexLines()
    {
        let str = this.txtbox.value;
        let lineIndices = [0];
        let eol = false;

        for (let index = 0; index < str.length; index++)
        {
            let ch = str[index];

            if (eol)
            {
                lineIndices.push(index);
                eol = false;
            }

            eol = ch == "\r" || ch == "\n";

            if (eol && ch == "\r" && index + 1 < str.length && str[index + 1] == "\n")
                index++
        }

        lineIndices.push(str.length);
        return lineIndices;
    }
}
