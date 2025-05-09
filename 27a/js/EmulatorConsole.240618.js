// EmulatorConsole (c) Charles Petzold, 2024

class ConsoleIO
{
    constructor(element)
    {
        this.txtbox = element;
        this.txtbox.addEventListener("keydown", this.txtboxKeyDown.bind(this));

        this.clearButton = document.getElementById("clearConsoleButton");
        this.clearButton.addEventListener("click", this.onClearClick.bind(this));

        this.fifo = [];

        this.charCallback = null;
        this.bufferCallback = null;
    }

    txtboxKeyDown(event)
    {
        if (event.key.length == 1)
        {
            this.fifo.push(event.key);
        }
        else if (event.key == "Tab")
        {
            this.fifo.push("\t");
        }
        else if (event.key == "Enter")
        {
            this.fifo.push("\n");
        }

        // TODO: Process Delete and Backspace!

        event.preventDefault();

        if (this.fifo.length > 0 && this.charCallback != null)
        {
            let ch = this.fifo.shift();
            this.charCallback(ch);
            this.charCallback = null;
        }

        if (this.fifo.length > 0 && this.bufferCallback != null)
        {
            this.addCharToBuffer();
        }
    }

    readChar(callback)
    {
        this.txtbox.focus();

        if (this.fifo.length > 0)
        {
            let ch = this.fifo.shift();
            callback(ch);
        }
        else
        {
            this.charCallback = callback;
        }
    }

    writeChar(ch)
    {
        this.txtbox.value += String.fromCharCode(ch);
    }

    writeString(str)
    {
        for (let ch of str)
        {
            if (ch == '$')
                break;

            this.writeChar(ch);  
        }
    }

    readString(length, callback)
    {
        this.txtbox.focus();

        this.bufferString = [];
        this.bufferLength = length;
        this.bufferCallback = callback;

        this.addCharToBuffer()
    }

    addCharToBuffer()
    {
        while (this.fifo.length > 0)
        {
            let ch = this.fifo.shift();

            if (ch != "\n")
            {
                this.bufferString.push(ch);
                this.bufferLength--;
            }
            
            this.txtbox.value += ch;

            if (this.bufferLength == 0 || ch == "\n")
            {
                this.bufferCallback(this.bufferString.join(""), this.bufferString.length);
                this.bufferCallback = null;
                return true;
            }
        }
        return false;
    }

    onClearClick()
    {
        this.fifo = [];
        this.txtbox.value = "";
    }

}