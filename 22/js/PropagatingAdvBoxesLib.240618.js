// PropagatingAdvBoxesLib (c) Charles Petzold, 2024

class Bitwise extends Box
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);
        this.a = 0;
        this.b = 0;
    }

    setInput(inp, value)
    {
        switch (inp)
        {
            case "a":
                this.a = value;
                break;

            case "b":
                this.b = value;
                break;
        }
        this.setOutputs();
    }

    setOutputs()
    {
        this.output = this.operation(this.a, this.b);
        this.propagate("output", this.output);
    }

    operation(a, b)
    {
        return 0;
    }
}

class BitwiseAnd extends Bitwise
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params)
    }

    operation(a, b)
    {
        return a & b;
    }
}

class BitwiseOr extends Bitwise
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params)
    }

    operation(a, b)
    {
        return a | b;
    }
}

class BitwiseXor extends Bitwise
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params)
    }

    operation(a, b)
    {
        return a ^ b;
    }
}

class ArithmeticUnit extends Box
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params)

        this.a = 0;
        this.b = 0;
        this.f1 = false;
        this.f0 = false;
        this.ci = false;
        this.co = false;
    }

    setInput(inp, value)
    {
        switch (inp)
        {
            case "a":
                this.a = value;
                break;

            case "b":
                this.b = value;
                break;

            case "f1":
                this.f1 = value;
                break; 

            case "f0":
                this.f0 = value;
                break;

            case "ci":
                this.ci = value;
                break;
        }

        this.setOutputs();
    }

    setOutputs()
    {
        let func = (this.f1 ? 2 : 0) + (this.f0 ? 1 : 0);

        switch (func)
        {
            case 0:     // ADD
                this.output = this.a + this.b;
                this.co = this.output > 255;
                break;

            case 1:     // ADC
                this.output = this.a + this.b + (this.ci ? 1 : 0);
                this.co = this.output > 255;
                break;

            case 2:     // SUB
                this.output = this.a - this.b;
                this.co = this.output < 0;
                break;

            case 3:     // SBB
                this.output = this.a - this.b - (this.ci ? 1 : 0);
                this.co = this.output < 0;  
                break;
        }
        this.output &= 0xFF;

        this.propagate("output", this.output);
        this.propagate("co", this.co);
    }
}

class LogicUnit extends TriStateBox
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params)

        this.a = 0;
        this.b = 0;
        this.f2 = false;
        this.f1 = false;
        this.f0 = false;
        this.input = 0;
        this.output = NaN;
        this.enable = false;
    }

    setInput(inp, value)
    {
        switch (inp)
        {
            case "a":
                this.a = value;
                break;

            case "b":
                this.b = value;
                break;

            case "f2":
                this.f2 = value;
                break; 

            case "f1":
                this.f1 = value;
                break; 

            case "f0":
                this.f0 = value;
                break;
        }

        this.setOutputs();
    }

    setOutputs()
    {
        let func = (this.f2 ? 4 : 0) + (this.f1 ? 2 : 0) + (this.f0 ? 1 : 0);

        switch (func)
        {
            case 4:     // AND
                this.input = this.a & this.b;
                this.enable = true;
                break;

            case 5:     // XOR
                this.input = this.a ^ this.b;
                this.enable = true;
                break;

            case 6:     // OR
                this.input = this.a | this.b;
                this.enable = true;
                break;

            case 7:     // CMP
                this.input = this.a;
                this.enable = true;
                break;

            default:
                this.input = NaN;
                this.enable = false;
                break;
        }

        this.resetTriStates();
    }
}
