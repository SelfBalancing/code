// PropagatingMemory (c) Charles Petzold, 2024

class Memory extends TriStateBox 
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);

        // unique names if multiple canvas elements on page (e.g. Chapter 20)
        this.memoryDivId = this.canvas.id + "Memory";   

        this.width = NaN;
        this.height = NaN;
        this.isBuilt = false;

        this.memSize = 1024; 
        this.contents = [];
        this.portMap = new Map();

        // For multiple programs in Chapter 24
        this.radioLabels = null;
        this.programs = null;

        this.addr = 0;
        this.di = 0;
        this.enable = true;
    }

    setProperty(prop, val)
    {
        super.setProperty(prop, val);

        switch (prop)
        {
            case "width":
                this.width = val;
                break;

            case "height":
                this.height = val;
                break;

            case "initialize":
                if (!this.params.cpuAltMemory)
                {
                    this.contents = val;

                    if (this.isBuilt)
                    {
                        this.initializeContents();
                    }
                }
                break;

            case "initializeAlt":
                if (this.params.cpuAltMemory)
                {
                    this.programs = val;
                    this.contents = this.programs[0];

                    if (this.isBuilt)
                    {
                        this.initializeContents();
                    }
                }
                break;

            case "ports":
                for (let index = 0; index < val.length; index++)
                {
                    this.portMap.set(val[index].text, {x:0, y:val[index].y});
                }

                if (this.isBuilt)
                {
                    this.initializePorts();
                }
                break;

            case "radioLabels":
                if (this.params.cpuAltMemory)
                {
                    this.radioLabels = val;
                }
                break;
        }

        if (!isNaN(this.width) && !isNaN(this.height) &&
            (!this.params.cpuAltMemory || this.radioLabels != null) &&
            !this.isBuilt)
        {
            this.buildHtml();
            this.initializeContents();
            this.initializePorts();
            this.isBuilt = true;
        } 
    }

    buildHtml()
    {
        let origin = this.xformGlobal(0, 0);
        origin = this.xformLocal(origin);

        let parent = this.canvas.parentNode;

        let div = document.createElement("div");
        div.id = this.memoryDivId; 

        div.style.position = "absolute";
        div.style.left = (origin.x + 10) + "px";        // Adjust for left-margin on canvas
        div.style.top = origin.y + "px";
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.border = "1px solid black";
        parent.appendChild(div);

        let pHead = document.createElement("p");
        pHead.innerText = "1K MEMORY"; 
        pHead.style.fontSize = "150%";
        pHead.style.textAlign = "center";
        pHead.style.fontWeight = "bold";
        pHead.marginTop = "0px 0px 15px 0px";
        div.appendChild(pHead);

        if (this.radioLabels != null)
        {
            for (let index = 0; index < this.radioLabels.length; index++)
            {
                let radio = document.createElement("input");
                radio.type = "radio";
                radio.id = index;
                radio.name = "programs";
                radio.value = this.radioLabels[index];
                radio.checked = index == 0;
                radio.style.marginLeft = "15px";
                radio.addEventListener("change", this.radioOnChange.bind(this));
                div.appendChild(radio);

                let label = document.createElement("label");
                label.for = index;
                label.innerText = this.radioLabels[index];
                div.appendChild(label);

                div.appendChild(document.createElement("br"));
            }

            div.appendChild(document.createElement("br"));
        }

        let form = document.createElement("form");
        div.appendChild(form);

        // Create ListBox and add to form
        this.listbox = document.createElement("select");
        this.listbox.size = 20;
        this.listbox.style.fontFamily = "Roboto Mono";
        this.listbox.style.width = "65%";
        this.listbox.style.marginLeft = "10px";
        this.listbox.style.paddingLeft = "10px";
        this.listbox.addEventListener("change", this.listboxOnChange.bind(this));
        form.appendChild(this.listbox);

        this.selectedIndex = -1;

        // Create change area
        this.changeArea = document.createElement("p");
        this.changeArea.style.marginLeft = "10px";
        this.changeArea.style.marginTop = "15px";
        this.changeArea.hidden = true;
        form.appendChild(this.changeArea);

        this.changeArea.append("Change byte at ");
        this.changeAddr = document.createElement("span");
        this.changeAddr.style.fontFamily = "Roboto Mono";

        this.changeArea.appendChild(this.changeAddr);
        this.changeArea.append(":");
        this.changeArea.appendChild(document.createElement("br"));

        this.changeByte = document.createElement("input");
        this.changeByte.type = "text";
        this.changeByte.style.marginTop = "5px";
        this.changeByte.style.width = "40px";
        this.changeByte.style.fontFamily = "Roboto Mono";
        this.changeByte.addEventListener("input", this.changeByteChange.bind(this));
        this.changeArea.appendChild(this.changeByte);
        this.changeArea.append(" ");

        this.writeButton = document.createElement("input");
        this.writeButton.type = "button";
        this.writeButton.value = "Write";
        this.writeButton.addEventListener("click", this.writeButtonClick.bind(this));
        this.changeArea.appendChild(this.writeButton);

        this.errorMessage = document.createElement("p");
        this.errorMessage.style.color = "red";
        this.errorMessage.style.margin = "5px";
        this.errorMessage.hidden = true;
        this.errorMessage.innerText = "Value must be a hexadecimal number between 00 and FF!";
        div.appendChild(this.errorMessage);
    }

    initializeContents()
    {
        this.listbox.length = 0;

        // Fill up rest of memory
        while (this.contents.length < this.memSize)
        {
            this.contents.push(0);
        }

        // Transfer to listbox
        for (let index = 0; index < this.contents.length; index++)
        {
            let option = document.createElement("option");
            option.text = this.hexContent(index);
            this.listbox.add(option, index);
        }
    }

    initializePorts()
    {
        let mem = document.getElementById(this.memoryDivId);
        let style = getComputedStyle(mem);
        let width = parseInt(style.width);

        for (let [txt, coords] of this.portMap)
        {
            let pt = coords;

            let p = document.createElement("p");
            p.style.position = "absolute";
            p.style.textAlign = "right";
            p.style.right = "0px";                  // to align on right edge
            p.style.marginRight = "5px";            // but not flush
            p.style.marginTop = "0px";              // to get rid of default
            p.style.top = (pt.y - 12) + "px";       // to vertically center

            let text = document.createTextNode(txt);
            p.appendChild(text);
            mem.appendChild(p);
        }
    }

    getCoordinates(io)
    {
        let pt = {x:0, y:0};

        if (io == undefined || !this.portMap.has(io))
        {
            pt = super.getCoordinates(io);
        }
        else
        {
            let port = this.portMap.get(io);
            pt = {x: port.x, y: port.y};

            let mem = document.getElementById(this.memoryDivId);
            let style = getComputedStyle(mem);
            pt.x += parseInt(style.width);

            pt = this.xformLocal(pt);
        }

        return pt;
    }

    setInput(inp, value)
    {
        if (!this.isBuilt)
            return;

        switch (inp)            
        {
            case "addr":
                if (isNaN(value))
                    return; 

                this.addr = (value % this.memSize);
                this.listbox.selectedIndex = value;

                if (this.triStateMap.size == 0)
                {
                    this.propagate("do", this.contents[value]);         // Here's where data out is propagated!
                }
                break;

            case "di":
                this.di = value % 256;
                break;

            case "enable":
                this.enable = value;
                break;                

            case "write":
                if (value)
                {
                    this.contents[this.addr] = this.di;

                    this.listbox.remove(this.addr);
                    let option = document.createElement("option");
                    option.text = this.hexContent(this.addr);
                    this.listbox.add(option, this.addr);
                    this.listbox.selectedIndex = this.addr;

                    if (this.triStateMap.size == 0)
                    {
                        this.propagate("do", this.di);                  // Here as well! 
                    }
                }
                break;
        }

        if (inp != "di")
        {
            this.propagateTriStates("data", this.enable, this.contents[this.addr]);
        }
    }
    listboxOnChange()
    {
        this.selectedIndex = this.listbox.selectedIndex;

        if (this.selectedIndex == -1)
        {
            this.changeArea.hidden = true;
        }
        else
        {
            this.changeArea.hidden = false;
            this.changeAddr.innerHTML = this.hex(this.selectedIndex);
            this.changeByte.value = this.hex(this.contents[this.selectedIndex], 2);
            this.errorMessage.hidden = true;
        }
    }

    radioOnChange(event)
    {
        this.contents = this.programs[event.target.id];
        this.initializeContents()
    }

    changeByteChange()
    {
        let isValid = this.convertFromHex(this.changeByte.value) != -1;
        this.errorMessage.hidden = isValid;
        this.writeButton.disabled = !isValid;
    }

    writeButtonClick()
    {
        let val = this.changeByte.value;
        let byte = this.convertFromHex(val);

        this.changeByte.value = this.hex(byte, 2);

        this.contents[this.selectedIndex] = byte;
        this.listbox.remove(this.selectedIndex);

        let option = document.createElement("option");
        option.text = this.hexContent(this.selectedIndex);
        this.listbox.add(option, this.selectedIndex);
        this.listbox.selectedIndex = this.selectedIndex;
    }

    convertFromHex(str)
    {
        let length = str.length;

        if (str[length - 1] == "H" || str[length - 1] == "h")
        {
            str.substring(0, length - 1);
            length--;
        }

        let value = 0;

        for (let i = 0; i < length; i++)
        {
            let digit = parseInt(str[i], 16);

            if (isNaN(digit))
                return -1;

            value = 16 * value + digit;                
        }

        return value < 256 ? value : -1;
    }

    hexContent(addr)
    {
        return this.hex(addr, 4) + ": " + this.hex(this.contents[addr], 2);
    }

    hex(val, pad = 4)
    {
        return val.toString(16).toUpperCase().padStart(pad, "0") + "h";
    }
}
