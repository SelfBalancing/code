// PropagatingGatesLib (c) Charles Petzold, 2024

class Gate extends SinglePropagator
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);

        this.lineWidth = 2 / Math.sqrt(this.maxScale);
        this.circleTipRadius = 12.5;

    }

    // For gates, delay the propagation 
    propagate()
    {
        if (this.propertyMap.has("noPropagationDelay") && this.propertyMap.get("noPropagationDelay"))
        {
            super.propagate();
        }
        else
        {
            setTimeout(super.propagate.bind(this), this.params.propagationDelay);
        }
    }

    render()
    {
        this.ctx.save();
        this.applyGlobalTransform();
        this.applyLocalTransform();

        this.createPath();      // defined in derived classes
        this.ctx.restore();

        this.ctx.save();

        // Erase first
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = "white";
        this.ctx.stroke();

        // Then draw
        this.ctx.lineWidth = 1; 
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();

        this.ctx.restore();
    }
}

// Base class for Buffer and Inverter
class OneInputGate extends Gate
{
    constructor(layout, canvas, ctx, id, params) 
    {
        super(layout, canvas, ctx, id, params);

        this.input = false;
    }

    setInput(num, value) 
    {
        this.input = value;
        let output = this.calcOutput(); 

        if (output != this.output)
        {
            this.output = output;
            this.propagate();
        }
    }

    calcOutput()
    {

    }
}

class Buffer extends OneInputGate
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);
        this.output = this.calcOutput();
    }

    getCoordinates(io)
    {
        let pt = { x: 0, y: 0 };

        switch(io)
        {
            case "out": pt = { x:this.getTip(), y:0}; break;
        }

        return this.xformLocal(pt);
    }

    calcOutput()
    {
        return this.input;
    }

    getTip()
    {
        return Math.sqrt(100 * 100 - 50 * 50);
    }

    createPath()
    {
        this.ctx.beginPath();
        this.ctx.moveTo(0, -50);
        this.ctx.lineTo(this.getTip(), 0);
        this.ctx.lineTo(0, 50);
        this.ctx.closePath();
    }

}

class Inverter extends Buffer
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);
    }

    propagate()
    {
        if (this.propertyMap.has("propagationDelay"))
        {
            this.params.propagationDelay = this.propertyMap.get("propagationDelay");
        }

        super.propagate();
    }

    calcOutput()
    {
        return !this.input;
    }

    createPath()
    {
        super.createPath();

        // Circle on tip
        let tip = super.getTip();

        this.ctx.moveTo(tip + 2 * this.circleTipRadius, 0);
        this.ctx.arc(tip + this.circleTipRadius, 0, this.circleTipRadius, 0, radians(360));
    }

    getCoordinates(io)
    {
        let pt = { x: 0, y: 0 };

        switch(io)
        {
            case "out": pt = { x:this.getTip() + 2 * this.circleTipRadius, y:0}; break;
        }

        return this.xformLocal(pt);
    }
}


// Parent class to AND, OR, NAND, NOR
class TwoInputGate extends Gate
{
    constructor(layout, canvas, ctx, id, params) 
    {
        super(layout, canvas, ctx, id, params);

        // values of two inputs
        this.input = [ false, false ];

        // where wires are to be connected
        this.ptA = { x: 0, y: 0 };
        this.ptB = { x: 0, y: 0 };
        this.ptOut = { x: 0, y: 0 };
    }

    setProperty(key, value)
    {
        super.setProperty(key, value);

        if (key == "inputs")
        {
            let inputs = this.propertyMap.get("inputs");
            for (let i = 0; i < inputs; i++)
            {
                this.input[i] = false;
            }
        }
    }

    getCoordinates(io)
    {
        let pt = {x:0, y:0};

        if (io == undefined || !io.includes("/"))
        {
            switch(io)
            {
                case "out": pt = this.ptOut; break;
                case "A": pt = this.ptA; break;
                case "B": pt = this.ptB; break;
            }
        }
        else
        {
            let parts = io.split("/");
            let num = parts[0];
            let den = parts[1];

            pt.y = 100 * (2 * num - 1) / (2 * den) - 50;
            pt.x = this.getXfromY(pt.y);
        }

        return this.xformLocal(pt);
    }

    getXfromY(y)
    {
        return 0;
    }

    setInput(num, value) 
    {
        this.input[num] = value;
        var output = this.calcOutput(); 

        if (output != this.output)
        {
            this.output = output;
            this.propagate();

            this.notifyAll();
        }
    }

}

class AndGate extends TwoInputGate
{
    constructor(layout, canvas, ctx, id, params) 
    {
        super(layout, canvas, ctx, id, params);

        this.ptA = { x: 0, y:-25 };
        this.ptB = { x: 0, y:25 };
        this.ptOut = { x: 125, y: 0 };
    }

    createPath()
    {
        this.ctx.beginPath();

        this.ctx.moveTo(0, 50);
        this.ctx.lineTo(0, -50);
        this.ctx.lineTo(75, -50);
        this.ctx.arc(75, 0, 50, radians(270), radians(90));
        this.ctx.closePath();
    }

    calcOutput()
    {
        if (!this.propertyMap.has("inputs"))
        {
            return this.input[0] && this.input[1];    
        }

        let inputs = this.propertyMap.get("inputs");
        let val = true;

        for (let i = 0; i < inputs; i++)
        {
            val &&= this.input[i];
        }

        return val;
    }
}

class OrGate extends TwoInputGate
{
    constructor(layout, canvas, ctx, id, params) 
    {
        super(layout, canvas, ctx, id, params);

        this.ptA = { x: - 4, y: -25 };
        this.ptB = { x: - 4, y: 25 };
        this.ptOut = { x: 125, y: 0 };
    }

    getXfromY(y)
    {
        return Math.sqrt(Math.pow(100, 2) - Math.pow(y, 2)) - 100;
    }


    createPath()
    {
        this.ctx.beginPath();

        this.ctx.moveTo(-13.5, -50);
        this.ctx.arc(-100, 0, 100, radians(-30), radians(30));
        this.ctx.lineTo(38.5, 50);
        this.ctx.arc(38.5, -50, 100, radians(90), radians(30), true);
        this.ctx.arc(38.5, 50, 100, radians(330), radians(270), true);
        this.ctx.closePath();

    }

    calcOutput()
    {
        if (!this.propertyMap.has("inputs"))
        {
            return this.input[0] || this.input[1];    
        }

        let inputs = this.propertyMap.get("inputs");
        let val = false;

        for (let i = 0; i < inputs; i++)
        {
            val ||= this.input[i];
        }

        return val;
    }
}

// Used in Chapter19MemoryCell
class OrNode extends OrGate
{
    constructor(layout, canvas, ctx, id, params) 
    {
        super(layout, canvas, ctx, id, params);
        this.nodeRadius = this.params.nodeRadius;
    }

    render()
    {
        let pt = this.xformLocal({x:0, y:0});
        pt = this.xformGlobal(pt.x, pt.y);

        this.ctx.save();
        this.ctx.fillStyle = this.output ?"#FF0000" : "#000000";

        this.ctx.beginPath();
        this.ctx.arc(pt.x, pt.y, this.nodeRadius, 0, radians(360));
        this.ctx.fill();
    
        this.ctx.restore();
    }
}

class NandGate extends AndGate
{
    constructor(layout, canvas, ctx, id, params) 
    {
        super(layout, canvas, ctx, id, params);
        this.output = true;
        this.ptOut = { x: 125 + 2 * this.circleTipRadius, y: 0 };
    }

    createPath()
    {
        super.createPath();

        // Circle on tip
        this.ctx.moveTo(125 + 2 * this.circleTipRadius, 0);
        this.ctx.arc(125 + this.circleTipRadius, 0, this.circleTipRadius, 0, radians(360));

    }

    calcOutput()
    {
        return !super.calcOutput();
    }
}

class NorGate extends OrGate
{
    constructor(layout, canvas, ctx, id, params) 
    {
        super(layout, canvas, ctx, id, params);
        this.output = true;
        this.ptOut = { x: 125 + 2 * this.circleTipRadius, y: 0 };
    }

    createPath()
    {
        super.createPath();

        // Circle on tip
        this.ctx.moveTo(125 + 2 * this.circleTipRadius, 0);
        this.ctx.arc(125 + this.circleTipRadius, 0, this.circleTipRadius, 0, radians(360));
    }

    calcOutput()
    {
        return !super.calcOutput();
    }
}

class XorGate extends OrGate
{
    constructor(layout, canvas, ctx, id, params) 
    {
        super(layout, canvas, ctx, id, params);
    }

    createPath()
    {
        super.createPath();

        // Extra curved line
        let xOffset = -15;
        this.ctx.moveTo(-13.5 + xOffset, -50);
        this.ctx.arc(-100 + xOffset, 0, 100, radians(-30), radians(30));
    }

    calcOutput()
    {
        return this.input[0] != this.input[1];  
    }
}
