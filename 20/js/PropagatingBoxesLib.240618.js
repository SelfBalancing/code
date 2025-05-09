// PropagatingBoxesLib (c) Charles Petzold, 2024

class Box extends ComplexPropagator
{
    constructor(layout, canvas, ctx, id, params)
    {
       super(layout, canvas, ctx, id, params); 

       this.text = "";
       this.width = 100;
       this.height = 100;
       this.portMap = new Map();
       this.output = 0;
    }

    setProperty(prop, value)
    {
        switch(prop)
        {
            case "text":
                this.text = value;
                break;

            case "width":
                this.width = value;
                break;

            case "height":
                this.height = value;
                break;

            case "ports":
                let ports = value;

                for (let port of ports)
                {
                    // For the CPU in Chapter 23
                    if (this.params.cpuIncludeJumps || (port.text != "CY Flag" && port.text != "Z Flag" && port.text != "S Flag"))
                    {
                        this.portMap.set(port.text, {x: port.x, y:port.y, edge: port.edge, hidden: port.hidden});        
                    }
                }
                break;

            default:
                super.setProperty(prop, value);
                break;
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
            pt.x = port.x * this.width;
            pt.y = port.y * this.height;

            pt = this.xformLocal(pt);
        }

        return pt;
    }

    render()
    {
        this.ctx.save();

        this.applyGlobalTransform();
        this.applyLocalTransform();

        // When render is called multiple times, this avoids the 
        //  anti-aliased text from bunching up.
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(this.width, 0);
        this.ctx.lineTo(this.width, this.height);
        this.ctx.lineTo(0, this.height);
        this.ctx.closePath();

        this.ctx.restore();

        this.ctx.save();
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        this.ctx.restore();

        this.ctx.save();
        this.ctx.font = "bold 16px " + this.fontFamily;
        this.ctx.fillStyle = "#000000";

        let pt = {x:this.width / 2, y:this.height / 2};
        pt = this.xformGlobal(pt.x, pt.y);
        pt = this.xformLocal(pt);

        this.centerText(this.text, pt.x, pt.y);
        this.ctx.restore();

        for (let [text, coords] of this.portMap)
        {
            if (coords.hidden)
                continue; 

            this.ctx.save();
            this.ctx.font = "16px " + this.fontFamily;
            this.ctx.fillStyle = "#000000";

            let pt = {x:this.width * coords.x, y:this.height * coords.y};
            pt = this.xformGlobal(pt.x, pt.y);
            pt = this.xformLocal(pt);

            if (coords.edge)
            {
                let delta = coords.x == 0 ? 7 : -7;

                this.ctx.beginPath();
                this.ctx.moveTo(pt.x, pt.y - 6);
                this.ctx.lineTo(pt.x + delta, pt.y);
                this.ctx.lineTo(pt.x, pt.y + 6);
                this.ctx.lineWidth = 1;
                this.ctx.stroke();

                pt.x += delta;
            }

            if (coords.x == 0)
            {
                this.ctx.textAlign = "left";
                pt.x += 2;
            }
            else if (coords.x == 1)
            {
                this.ctx.textAlign = "right";
                pt.x -= 2;
            }
            else
            {
                this.ctx.textAlign = "center";
            }

            if (coords.y == 0)
            {
                this.ctx.textBaseline = "top";
                pt.y += 2;
            }
            else if (coords.y == 1)
            {
                this.ctx.textBaseline = "bottom";
            }
            else
            {
                this.ctx.textBaseline = "middle";
            }

            text = text.replace("|OL", "\u0305");
            this.ctx.fillText(text, pt.x, pt.y);
            this.ctx.restore();
        }
    }
}

class TriStateBox extends Box
{
    constructor(layout, canvas, ctx, id, params)
    {
       super(layout, canvas, ctx, id, params); 
       this.triStateMap = new Map();
    }

    setProperty(prop, value)
    {
        if (prop == "triStates")
        {
            let triStates = value;

            for (let triState of triStates)
            {
                // Save the output name and the group in the local triStateMap
                this.triStateMap.set(triState.name, triState.group);

                // Add this box and the output name to the global triStateMap;
                let map = this.params.triStateMap;

                if (map.has(triState.group))
                {
                    map.get(triState.group).buffers.push({ box:this, name:triState.name });
                }
                else
                {
                    map.set(triState.group, {buffers: [{ box:this, name:triState.name }], active: null});   
                }
            }
        }
        else
        {
            super.setProperty(prop, value);
        }
    }

    propagateTriStates(group, enable, input)
    {
//        console.log("propagateTriStates this:", this, "group:", group, "enable:", enable, "input:", input);

        let groupInfo = this.params.triStateMap.get(group);
        let changed = false;
        let output = NaN;

        if (enable)
        {
            groupInfo.active = this;
            output = input;
            changed = true;
        }

        // TODO: This is a problem with Increment/Decrement because two calls coming through
        else if (groupInfo.active == this)      
        {
            groupInfo.active = null;
            changed = true;
        }

        if (changed)
        {
            for (let buffer of groupInfo.buffers)
            {
                buffer.box.setGroupOutput(group, output);
            }
        }

        return output;      // TODO: needed? 
    }

    // Used in Chapter 22
    resetTriStates()
    {
        if (this.triStateMap != null)
        {
            for (let [name, group] of this.triStateMap)
            {
                let groupInfo = this.params.triStateMap.get(group);
                let spreadAround = false;

                // These 'enable' and 'output" names are normal, but this might be overridden
                if (this.enable == true)
                {
                    groupInfo.active = this;
                    this.output = this.input;
                    spreadAround = true;
                }
                else if (groupInfo.active == this)
                {
                    groupInfo.active = null;
                    this.output = NaN; 
                    spreadAround = true; 
                }

                if (spreadAround)
                {
                    for (let buffer of groupInfo.buffers) 
                    {
                        buffer.box.setGroupOutput(group, this.output);
                    }
                }
            }
        }
    }

    setGroupOutput(group, value)
    {
        for (let [name, grp] of this.triStateMap)
        {
            if (grp == group)
            {
                this.propagate(name, value);
            }
        }
    }
}

class TriStateBuffer extends TriStateBox
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);
        this.input = 0;
        this.enable = false;
    }

    setInput(inp, value)
    {
        switch (inp)
        {
            case "input":
                this.input = value;
                break;

            case "enable":
                this.enable = value;
                break;
        }

        this.resetTriStates();
    }
}

class TriState16SplitIn extends TriStateBox
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);
        this.input = 0;
        this.enable = false;
    }

    setInput(inp, value)
    {
        switch (inp)
        {
            case "inputlo":
                this.input = (0x0FF00 & this.input) | value;
                break;

            case "inputhi":
                this.input = (0x0FF & this.input) | (value << 8);
                break; 

            case "enable":
                this.enable = value;
                break;
        }

        this.resetTriStates();
    }
}

class TriState16SplitOut extends TriStateBox
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);
        this.input = 0;
        this.enable = false;
    }

    setInput(inp, value)
    {
        switch (inp)
        {
            case "input":
                this.input = value;
                break;

            case "enable":
                this.enable = value;
                break;
        }

        for (let [name, group] of this.triStateMap)
        {
            if (name.includes("lo"))
                this.propagateTriStates(group, this.enable, this.input & 0x0FF);
            
            if (name.includes("hi"))
                this.propagateTriStates(group, this.enable, this.input >> 8);
        }
    }

    setOutputFromName(name, value)
    {
        {
            this.propagate(name, value); 
        }
    }
}


// Doesn't need to participate in tri-state logic because it's not attached to anything else (as in Instruction Decoder)
class SoloTriState extends Box
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);
        this.enable = false;
        this.numInputs = 0;

        this.inputs = [];
        this.outputs = [];
    }

    setProperty(prop, value)
    {
        super.setProperty(prop, value);

        if (prop == "inputs")
        {
            this.numInputs = value;
        }

        // Special case for PC Increment in CPU control signals
        if (prop == "input")
        {
            this.inputs[0] = value;
        }
    }

    setInput(inp, value)
    {
        if (inp == "enable")
        {
            this.enable = value;
        }

        if (Number.isInteger(inp))
        {
            this.inputs[inp] = value;
        }

        this.inputs.forEach((value, index) => this.outputs[index] = this.enable && value);
        this.outputs.forEach((value, index) => this.propagate(index, value));
    }
}

class FlipFlop extends Box
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);

        this.clr = false;
        this.pre = false;
        this.data = false;
        this.clk = false;
        this.q = false;
        this.qbar = true;
    }

    setProperty(prop, value)
    {
        super.setProperty(prop, value);

        if (prop == "preset" && value)
        {
           this.setInput("pre", true); 
           this.setInput("pre", false);
        }
    }

    setInput(inp, value)
    {
        switch (inp)
        {
            case "clr":
                if (this.clr != value)
                {
                    this.clr = value;
                    
                    if (this.clr && this.pre)
                    {
                        this.q = true;
                        this.qbar = true;
                    }
                    else if (this.clr)
                    {
                        this.q = false;
                        this.qbar = true;
                    }
                }
                break;

            case "pre":
                if (this.pre != value)
                {
                    this.pre = value;

                    if (this.clr && this.pre)
                    {
                        this.q = true;
                        this.qbar = true;
                    }
                    else if (this.pre)
                    {
                        this.q = true;
                        this.qbar = false;
                    }
                }
                break;

            case "data":
                this.data = value;
                break;
                
            case "clk":
                if (!this.pre && !this.clr && this.clk != value)
                {
                    this.clk = value;

                    if (this.clk)   // ie, upward transition
                    {
                        this.q = this.data;
                        this.qbar = !this.data;
                    }
                }
                break;
        }

        this.propagate("q", this.q);
        this.propagate("qbar", this.qbar);
    }
}

class Counter extends Box
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);

        this.clr = false;
        this.clk = false;
    }

    setProperty(prop, value)
    {
        super.setProperty(prop, value);

        if (prop == "initial")
        {
           this.output = value; 
        }
    }

    setInput(inp, value)
    {
        switch (inp)
        {
            case "clr":
                if (this.clr != value)
                {
                    this.clr = value;

                    if (this.clr)
                    {
                        this.output = 0;               
                        this.propagateAll();
                    }
                }
                break;

            case "clk":
                if (!this.clr && this.clk != value)
                {
                    this.clk = value;

                    if (this.clk)   
                    {
                        this.output = (this.output + 1) % 65536;
                        this.propagateAll();
                    }
                }
                break;
        }
    }

    propagateAll()
    {
        this.propagate("output", this.output);

        // For connection to decoders
        if (isNaN(this.output))             // TODO: No longer possible
        {
            this.propagate(0, false);
            this.propagate(1, false);
            this.propagate(2, false);
            this.propagate(3, false);
        }
        else
        {
            this.propagate(0, (this.output & 0x0001) == 0x0001);
            this.propagate(1, (this.output & 0x0002) == 0x0002);
            this.propagate(2, (this.output & 0x0004) == 0x0004);
            this.propagate(3, (this.output & 0x0008) == 0x0008);
        }
    }
}

class Oscillator extends Box
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);
        this.previousTrigger = 0;

        window.requestAnimationFrame(this.animator.bind(this));
    }

    animator(timestamp)
    {
        if (timestamp - this.previousTrigger > 500)
        {
            this.output = !this.output;
            this.propagate("output", this.output);
            this.previousTrigger = timestamp;
        }

        window.requestAnimationFrame(this.animator.bind(this));
    }
}

class Adder extends Box
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);
        this.a = 0;
        this.b = 0;
        this.ci = false;
        this.co = false;
    }

    setInput(inp, value)
    {
        value = isNaN(value) ? 0 : value;

        switch (inp)
        {
            case "ci":
                this.ci = value;
                break;

            case "a":
                this.a = value % 256;
                break;

            case "b":
                this.b = value % 256;
                break;
        }

        let sum = this.a + this.b + (this.ci ? 1 : 0);
        this.co = sum > 255;
        this.output = sum - (this.co ? 256 : 0); 

        this.propagate("sum", this.output);
        this.propagate("co", this.co);
    }
}

class Latch extends Box
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);
        this.clk = 0;
        this.clr = 0;
        this.input = 0;

        // extra input and output for Carry (Chapter 20 Three-Byte Adder)
        this.xi = false;
        this.xo = false;

        // extra input and output for flags (Chapter 21 ALU)
        this.si = false;
        this.so = false;

        this.zi = false;
        this.zo = false;

        this.ci = false;
        this.co = false;
    }

    setInput(inp, value)
    {
        switch (inp)
        {
            case "input":
                this.input = value;
                break;

            case "xi":
                this.xi = value;
                break;

            case "si":
                this.si = value;
                break;

            case "zi":
                this.zi = value;
                break;

            case "ci":
                this.ci = value;
                break;

            case "clr":
                if (this.clr != value)
                {
                    this.clr = value;

                    if (this.clr)
                    {
                        this.output = 0; 
                        this.xo = false;
                        this.so = false;
                        this.zo = false;
                        this.co = false;              
                        this.propagateAll();
                    }
                }
                break;

            case "clk":
                if (!this.clr && this.clk != value)
                {
                    this.clk = value;

                    if (this.clk)   // ie, upward transition
                    {
                        this.output = this.input;
                        this.xo = this.xi;
                        this.so = this.si;
                        this.zo = this.zi;
                        this.co = this.ci;
                        this.propagateAll();
                    }
                }
                break;
        }
        this.propagateAll(); 
    }

    propagateAll()
    {
        this.propagate("output", this.output);
        this.propagate('xo', this.xo);
        this.propagate("so", this.so);
        this.propagate("zo", this.zo);
        this.propagate("co", this.co);

        // For individuals (such as Chapter 20 instruction latch and Chapter 22 Incrementer Decrementer) 
        if (this.propertyMap.has("outputs"))
        {
            let count = this.propertyMap.get("outputs");

            for (let i = 0; i < count; i++)
            {
                this.propagate(i, (this.output & (1 << i)) != 0);
            }
        }

        // For notifications for DynamicDecimal
        this.notifyAll();
    }
}

class OnesComplement extends Box
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);
        this.input = 0;
        this.inv = false;
    }

    setInput(inp, value)
    {
        switch (inp)
        {
            case "input":
                this.input = value;
                break;

            case "inv":
                this.inv = value;
                break;
        }
        
        this.output = this.inv ? (255 - this.input) : this.input;
        this.propagate("output", this.output);
    }
}

// Uses triStateMap object of params.
//      key is a group, probably identified by single letter, e.g. "a"
//      value is object with two properties: 
//          buffers: all the tri-state buffers in the group
//          active: the enabled tri-state buffer or null

// TODO: Is this still active? 
class OrigTriStateBuffer extends Box
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);
        this.input = 0;
        this.enable = false;
        this.group = NaN;

        // For carry in and out in Chapter 20 Triple-Byte Adder
        this.xi = false;
        this.xo = false;
    }

    setProperty(prop, value)
    {
        if (prop == "group")
        {
            this.group = value;
            let map = this.params.triStateMap;

            if (map.has(this.group))
            {
                map.get(this.group).buffers.push(this); 
            }
            else
            {
                map.set(this.group, {buffers: [this], active: null});
            }

            return;
        }
        
        super.setProperty(prop, value);
    }        

    setInput(inp, value)
    {
        switch (inp)
        {
            case "input":
                this.input = value;
                break;

            case "xi":
                this.xi = value;
                break;                

            case "enable":
                this.enable = value;
                break;

            default:
                if (Number.isInteger(inp))
                {
                    let bit = 1 << inp;
                    this.input &= ~bit;
                    this.input |= value ? bit : 0;
                }
        }

        let group = this.params.triStateMap.get(this.group);

        if (this.enable == true)
        {
            this.output = this.input;
            this.xo = this.xi; 
            
            group.active = this;
        }
        else if (group.active == this)
        {
            group.active = null;
        }

        for (let buffer of group.buffers) 
        {
            buffer.sweeper(this.group);
        }
    }

    sweeper(group)
    {
        let active = this.params.triStateMap.get(group).active;

        if (active == null)
        {
            this.output = NaN;
            this.xo = NaN;
        }
        else
        {
            this.output = active.output;
            this.xo = active.xo;
        }

        this.propagate("output", this.output);
        this.propagate("xo", this.xo);
    }
}

class TwoToFourDecoder extends Box
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);
        this.inp0 = false;
        this.inp1 = false;
        this.out0 = true;
        this.out1 = false;
        this.out2 = false;
        this.out3 = false;
    }

    setInput(inp, value)
    {
        switch (inp)
        {
            case 0:
                this.inp0 = value;
                break;

            case 1:
                this.inp1 = value;
                break;
        }

        this.out0 = !this.inp0 && !this.inp1;
        this.propagate(0, this.out0);

        this.out1 = this.inp0 && !this.inp1;
        this.propagate(1, this.out1);

        this.out2 = !this.inp0 && this.inp1;
        this.propagate(2, this.out2);

        this.out3 = this.inp0 && this.inp1;
        this.propagate(3, this.out3);
    }
}

class ThreeToEightDecoder extends Box
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);
        this.sel0 = false;
        this.sel1 = false;
        this.sel2 = false;
        this.inp = true;
        this.out0 = false;
        this.out1 = false;
        this.out2 = false;
        this.out3 = false;
        this.out4 = false;
        this.out5 = false;
        this.out6 = false;
        this.out7 = false;
    }

    setInput(inp, value)
    {
        switch (inp)
        {
            case 0:
                this.sel0 = value;
                break;

            case 1:
                this.sel1 = value;
                break;

            case 2:
                this.sel2 = value;
                break;

            case "inp":
                this.inp = value;
                break;
        }

        this.out0 = this.inp && !this.sel2 && !this.sel1 && !this.sel0;
        this.propagate(0, this.out0);

        this.out1 = this.inp && !this.sel2 && !this.sel1 && this.sel0;
        this.propagate(1, this.out1);

        this.out2 = this.inp && !this.sel2 && this.sel1 && !this.sel0;
        this.propagate(2, this.out2);

        this.out3 = this.inp && !this.sel2 && this.sel1 && this.sel0;
        this.propagate(3, this.out3);

        this.out4 = this.inp && this.sel2 && !this.sel1 && !this.sel0;
        this.propagate(4, this.out4);

        this.out5 = this.inp && this.sel2 && !this.sel1 && this.sel0;
        this.propagate(5, this.out5);

        this.out6 = this.inp && this.sel2 && this.sel1 && !this.sel0;
        this.propagate(6, this.out6);

        this.out7 = this.inp && this.sel2 && this.sel1 && this.sel0;
        this.propagate(7, this.out7);
    }
}

class FourToSixteenDecoder extends Box
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);
        this.sel0 = false;
        this.sel1 = false;
        this.sel2 = false;
        this.sel3 = false;

        this.inp = true;

        this.out0 = false;
        this.out1 = false;
        this.out2 = false;
        this.out3 = false;
        this.out4 = false;
        this.out5 = false;
        this.out6 = false;
        this.out7 = false;
        this.out8 = false;
        this.out9 = false;
        this.outA = false;
        this.outB = false;
        this.outC = false;
        this.outD = false;
        this.outE = false;
        this.outF = false;
    }

    setInput(inp, value)
    {
        switch (inp)
        {
            case 0:
                this.sel0 = value;
                break;

            case 1:
                this.sel1 = value;
                break;

            case 2:
                this.sel2 = value;
                break;

            case 3:
                this.sel3 = value;
                break;
    
            case "inp":
                this.inp = value;
                break;
        }

        this.out0 = this.inp && !this.sel3 && !this.sel2 && !this.sel1 && !this.sel0;
        this.propagate(0, this.out0);

        this.out1 = this.inp && !this.sel3 && !this.sel2 && !this.sel1 && this.sel0;
        this.propagate(1, this.out1);

        this.out2 = this.inp && !this.sel3 && !this.sel2 && this.sel1 && !this.sel0;
        this.propagate(2, this.out2);

        this.out3 = this.inp && !this.sel3 && !this.sel2 && this.sel1 && this.sel0;
        this.propagate(3, this.out3);

        this.out4 = this.inp && !this.sel3 && this.sel2 && !this.sel1 && !this.sel0;
        this.propagate(4, this.out4);

        this.out5 = this.inp && !this.sel3 && this.sel2 && !this.sel1 && this.sel0;
        this.propagate(5, this.out5);

        this.out6 = this.inp && !this.sel3 && this.sel2 && this.sel1 && !this.sel0;
        this.propagate(6, this.out6);

        this.out7 = this.inp && !this.sel3 && this.sel2 && this.sel1 && this.sel0;
        this.propagate(7, this.out7);

        this.out8 = this.inp && this.sel3 && !this.sel2 && !this.sel1 && !this.sel0;
        this.propagate(8, this.out8);

        this.out9 = this.inp && this.sel3 && !this.sel2 && !this.sel1 && this.sel0;
        this.propagate(9, this.out9);

        this.outA = this.inp && this.sel3 && !this.sel2 && this.sel1 && !this.sel0;
        this.propagate(10, this.outA);

        this.outB = this.inp && this.sel3 && !this.sel2 && this.sel1 && this.sel0;
        this.propagate(11, this.outB);

        this.outC = this.inp && this.sel3 && this.sel2 && !this.sel1 && !this.sel0;
        this.propagate(12, this.outC);

        this.outD = this.inp && this.sel3 && this.sel2 && !this.sel1 && this.sel0;
        this.propagate(13, this.outD);

        this.outE = this.inp && this.sel3 && this.sel2 && this.sel1 && !this.sel0;
        this.propagate(14, this.outE);

        this.outF = this.inp && this.sel3 && this.sel2 && this.sel1 && this.sel0;
        this.propagate(15, this.outF);    
    }
}
