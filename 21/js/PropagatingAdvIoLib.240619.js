// PropagatingAdvioLib (c) Charles Petzold, 2024

class HexSpinner extends ComplexPropagator
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);

        this.output = 0;

        this.width = 160;
        this.fontSize = Math.round(0.7 * this.width / 2);
        this.initialize();

        // Pointer stuff
        this.pointerId = -1;
        this.pointerSpinButton = null;
        canvas.addEventListener("pointerdown", this.pointerDown.bind(this));
        canvas.addEventListener("pointerup", this.pointerUp.bind(this));
        canvas.addEventListener("lostpointercapture", this.lostPointerCapture.bind(this));
    }

    initialize()
    {
        this.height = this.width / 2;
        this.digits = 2;
        this.max = 256;

        this.spinButtons = [];
        this.spinButtons.push(new SpinButton(-2 * this.width / 4, -this.height / 2, this.width / 4, this.height / 2, false, 16));
        this.spinButtons.push(new SpinButton(     this.width / 4, -this.height / 2, this.width / 4, this.height / 2, false, 1));
        this.spinButtons.push(new SpinButton(-2 * this.width / 4, 0,                this.width / 4, this.height / 2, true, -16));
        this.spinButtons.push(new SpinButton(     this.width / 4, 0,                this.width / 4, this.height / 2, true, -1));
    }

    setOutputs()
    {
        this.propagateAll();
    }

    setProperty(key, value)
    {
        super.setProperty(key, value);

        if (key == "value")
        {
            this.output = value;
            this.render();
            this.propagateAll();
        }
    }

    getCoordinates(io)
    {
        let pt = { x: 0, y: 0 };
        let span = this.width - this.height;

        switch(io)
        {
            case "right": pt = { x:this.width / 2, y:0}; break;
            case "bottom": pt = { x:0, y:this.height / 2}; break;
            case "left": pt = {x:-this.width / 2, y:0}; break;

            // For instruction decoder
            case 0: pt = {x: 3.5 * span / 8, y: this.height / 2}; break;
            case 1: pt = {x: 2.5 * span / 8, y: this.height / 2}; break;
            case 2: pt = {x: 1.5 * span / 8, y: this.height / 2}; break;
            case 3: pt = {x: 0.5 * span / 8, y: this.height / 2}; break;
            case 4: pt = {x: -0.5 * span / 8, y: this.height / 2}; break;
            case 5: pt = {x: -1.5 * span / 8, y: this.height / 2}; break;
            case 6: pt = {x: -2.5 * span / 8, y: this.height / 2}; break;
            case 7: pt = {x: -3.5 * span / 8, y: this.height / 2}; break;
        }

        return this.xformLocal(pt);
    }

    pointerDown(event)
    {
        for (let i = 0; i < this.spinButtons.length; i++)
        {
            let spinButton = this.spinButtons[i];
            let ul = {x: spinButton.x, y: spinButton.y};
            let lr = {x: spinButton.x + spinButton.width, y: spinButton.y + spinButton.height};

            if (this.hittest(event.offsetX, event.offsetY, ul, lr))
            {
                spinButton.pressed = true;
                this.render();

                this.canvas.setPointerCapture(event.pointerId);
                this.pointerId = event.pointerId;
                this.pointerSpinButton = spinButton;
            }
        }
    }

    pointerUp(event)
    {
        if (event.pointerId == this.pointerId)
        {
            this.pointerSpinButton.pressed = false;
            this.output = (this.output + this.pointerSpinButton.increment + this.max) % this.max;
            this.render();
            this.propagateAll();

            this.canvas.releasePointerCapture(this.pointerId);
            this.pointerId = -1;
        }
    }

    lostPointerCapture(event)
    {
        if (event.pointerId == this.pointerId)
        {
            this.pointerSpinButton.pressed = false;
            this.render();

            this.pointerId = -1;
        }
    }

    propagateAll()
    {
        this.propagate("output", this.output);

        for (let i = 0; i < 8; i++)
        {
            this.propagate(i, (this.output & (1 << i)) == 0 ? false : true);
        }

        this.notifyAll();
    }

    render()
    {
        this.ctx.save();
        this.applyGlobalTransform();
        this.applyLocalTransform();

        // Erase background and stroke border
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.strokeStyle = "#000000";
        this.ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        this.ctx.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);

        this.spinButtons.forEach(v => {v.render(this.ctx)});

        // Text in the center area
        this.ctx.fillStyle = "#000000";
        this.ctx.font = this.fontSize + "px " + this.fontFamily;
        this.ctx.fillStyle = "#000000";

        this.centerText(hexPad(this.output, this.digits), 0, 0);

        this.ctx.restore();            
    }
}

class WordSpinner extends HexSpinner
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);
    }

    initialize()
    {
        this.height = this.width;
        this.digits = 4;
        this.max = 65536;

        this.spinButtons = [];
        this.spinButtons.push(new SpinButton(-2 * this.width / 4, -this.height / 2, this.width / 4, this.height / 4, false, 4096));
        this.spinButtons.push(new SpinButton(    -this.width / 4, -this.height / 2, this.width / 4, this.height / 4, false, 256));
        this.spinButtons.push(new SpinButton(                  0, -this.height / 2, this.width / 4, this.height / 4, false, 16));
        this.spinButtons.push(new SpinButton(     this.width / 4, -this.height / 2, this.width / 4, this.height / 4, false, 1));

        this.spinButtons.push(new SpinButton(-2 * this.width / 4,  this.height / 4, this.width / 4, this.height / 4, true, -4096));
        this.spinButtons.push(new SpinButton(    -this.width / 4,  this.height / 4, this.width / 4, this.height / 4, true, -256));
        this.spinButtons.push(new SpinButton(                  0,  this.height / 4, this.width / 4, this.height / 4, true, -16));
        this.spinButtons.push(new SpinButton(     this.width / 4,  this.height / 4, this.width / 4, this.height / 4, true, -1));
    }

}

// The arrow button used in HexSpinner and WordSpinner
class SpinButton
{
    constructor(x, y, width, height, direction, increment)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.direction = direction;
        this.increment = increment;

        this.pressed = false;
    }

    render(ctx)
    {
        ctx.save();
        ctx.translate(this.x, this.y);

        // Erase background 
        ctx.fillStyle = this.pressed ? "#000000": "#FFFFFF";
        ctx.fillRect(0, 0, this.width, this.height);

        // Draw arrow
        let yPoint = (this.direction ? 4 : 1) * this.height / 5;

        ctx.fillStyle = this.pressed ? "#FFFFFF" : "#000000";
        ctx.beginPath();
        ctx.moveTo(this.width / 2, yPoint);
        ctx.lineTo(4 * this.width / 5, this.height - yPoint);
        ctx.lineTo(this.width / 5, this.height - yPoint);
        ctx.closePath();
        ctx.fill();

        // Stroke border
        ctx.strokeStyle = "#000000";
        ctx.strokeRect(0, 0, this.width, this.height);

        ctx.restore();
    }
}

// Used in Chapter 10 Encoder
class CircularSlider extends ComplexPropagator
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);

        this.value = 0;             // integral values
        this.slidePosition = 0;     // fractional values

        // Drawing values
        this.radius = 180;
        this.dotRadius = 5;
        this.startAngle = 30;
        this.angleRange = 180 - 2 * this.startAngle;
        this.barWidth = 5 * this.dotRadius;

        // Pointer values
        this.pointerDown = false;
        this.xPointer = 0;
        this.yPointer = 0;

        canvas.addEventListener("pointerdown", this.onPointerDown.bind(this));
        canvas.addEventListener("pointermove", this.onPointerMove.bind(this)); 
        canvas.addEventListener("pointerup", this.onPointerUp.bind(this)); 
    }

    onPointerDown(event)
    {
        // Mouse coordinates relative to canvas
        this.xPointer = event.offsetX;
        this.yPointer = event.offsetY;

        // Mouse coordinates relative to component where pivot point == (0, 0)
        let point = this.translateCanvasToComponent(this.xPointer, this.yPointer);

        // Reverse rotate the point based on the current slide position
        let angle = this.contactAngle(this.slidePosition);
        let radians = -Math.PI * angle / 180;

        let x = point.x * Math.cos(radians) - point.y * Math.sin(radians);
        let y = point.x * Math.sin(radians) + point.y * Math.cos(radians);

        // Test if it's within the dimension of the slider bar
        if (x > 0 && 
            x < this.radius && 
            y > -this.barWidth / 2 &&
            y < this.barWidth / 2)
        {
            this.pointerDown = true;
            this.canvas.setPointerCapture(event.pointerId);
        }
    };

    onPointerMove (event)
    {
        if (this.pointerDown)
        {
            this.xPointer += event.movementX;
            this.yPointer += event.movementY;

            let point = this.translateCanvasToComponent(this.xPointer, this.yPointer);

            let radians = Math.atan2(point.x, point.y);
            let angle = 180 * radians / Math.PI;

            this.slidePosition = 7 * (angle + 2 * this.startAngle) / this.angleRange;
            this.slidePosition = Math.max(-0.35, Math.min(7.35, this.slidePosition));

            // Possibly output new value
            if (this.value != Math.round(this.slidePosition))
            {
                this.propagate(this.value.toString(), false);
                this.propagate("V", false);

                this.value = Math.round(this.slidePosition);

                this.propagate(this.value.toString(), true);
                this.propagate("V", this.value != 0);
            }

            this.render();
        }
    };

    onPointerUp (event)
    {
        this.pointerDown = false;
        this.render();
    };

    translateCanvasToComponent(x, y)
    {
        // Assume no scaling or rotation of component or layout
        x -= this.localMatrix.e + this.globalMatrix.e;
        y -= this.localMatrix.f + this.globalMatrix.f;

        return {x:x, y:y};
    }

    getCoordinates(io)
    {
        let point = {x: 0, y: 0};

        if (io != null && io != undefined)
        {
            let i = parseInt(io);
            point = this.contactPoint(i);
        }

        return this.xformLocal(point);
    }

    render()
    {
        this.ctx.save();
        this.applyGlobalTransform();
        this.applyLocalTransform();

        // Clear whole sweep area
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.arc(0, 0, this.radius + 1, radians(5), radians(175));
        this.ctx.closePath();

        this.ctx.rect(-1.5 * this.barWidth, -this.barWidth, 3 * this.barWidth, 1.5 * this.barWidth);

        this.ctx.fill();

        let isConducting = this.value != 0;
        
        // Draw 8 contact points
        for (let i = 0; i < 8; i++)
        {
           let beg = this.contactAngle(i - 0.3);
           let end = this.contactAngle(i + 0.3);

           this.ctx.beginPath();
           this.ctx.arc(0, 0, this.radius, radians(beg), radians(end), true);
           this.ctx.lineCap = "round";
           this.ctx.lineWidth = 2 * this.dotRadius;
           this.ctx.strokeStyle = (isConducting && this.value == i) ? "#FF0000" : "#000000";
           this.ctx.stroke();
        }

        // Draw sliding bar
        this.ctx.fillStyle = isConducting ? "#FF0000" : "#808080"

        this.ctx.save();
        this.ctx.rotate(radians(this.contactAngle(this.slidePosition)));

        this.ctx.beginPath();
        this.ctx.moveTo(-this.barWidth / 2, -this.barWidth / 2);
        this.ctx.lineTo(this.radius - this.barWidth / 2, -this.barWidth / 2);
        this.ctx.arcTo(this.radius, -this.barWidth / 2, this.radius, 0, this.barWidth / 2);
        this.ctx.arcTo(this.radius, this.barWidth / 2, this.radius - this.barWidth / 2, this.barWidth / 2, this.barWidth / 2);
        this.ctx.lineTo(-this.barWidth / 2, this.barWidth / 2);
        this.ctx.closePath();

        this.ctx.fill();
        this.ctx.restore();

        // Draw swivel point
        this.ctx.fillStyle = "#000000";
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.dotRadius, 0, radians(360));
        this.ctx.fill();

        // Draw wire
        this.ctx.strokeStyle = isConducting ? "#FF0000" : "#000000";
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(-40, 0);
        this.ctx.stroke();

        this.ctx.restore();
    }

    contactPoint(i)
    {
        let angle = this.contactAngle(i);
        return {x: this.radius * Math.cos(2 * Math.PI * angle / 360),
                y: this.radius * Math.sin(2 * Math.PI * angle / 360)};
    }

    contactAngle(i)
    {
        return this.startAngle + (7 - i) * this.angleRange / 7;
    }
}


class SevenSegment extends Component
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);

        this.valueMap = new Map();
        this.valueMap.set("a", false);
        this.valueMap.set("b", false);
        this.valueMap.set("c", false);
        this.valueMap.set("d", false);
        this.valueMap.set("e", false);
        this.valueMap.set("f", false);
        this.valueMap.set("g", false);

        this.SEGMENT = 100;
        this.WIDTH = 20;
        this.POINT = 10;
        this.GAP = 2;
    }

    getCoordinates(io)
    {
        let pt = { x: 0, y: 0 };

        if (io != undefined && io.length == 1)
        {
            switch (io)
            {
                case "a": 
                    pt.x = -this.SEGMENT / 2; 
                    pt.y = -this.SEGMENT - 2 * this.GAP;
                    break;

                case "b": 
                    pt.x = this.SEGMENT / 2 + this.WIDTH / 2 + this.GAP;
                    pt.y = -this.SEGMENT / 2;
                    break;

                case "c": 
                    pt.x = this.SEGMENT / 2 + this.WIDTH / 2 + this.GAP;
                    pt.y = this.SEGMENT / 2;
                    break;

                case "d": 
                    pt.x = 0; 
                    pt.y = this.SEGMENT + this.WIDTH / 2 + 2 * this.GAP;
                    break;

                case "e": 
                    pt.x = -this.SEGMENT / 2 + -this.WIDTH / 2;
                    pt.y = this.SEGMENT / 2;
                    break;

                case "f": 
                    pt.x = -this.SEGMENT / 2 + -this.WIDTH / 2;
                    pt.y = -this.SEGMENT / 2;
                    break;

                case "g": 
                    pt.x = this.SEGMENT / 2; 
                    pt.y = 0;
                    break;

            }
        }

        return this.xformLocal(pt);
    }

    setInput(key, value) 
    {
        this.valueMap.set(key, value);
        this.render();
    }

    render()
    {
        this.ctx.save();

        this.applyGlobalTransform();
        this.applyLocalTransform();

        this.horz(0, -this.SEGMENT - 2 * this.GAP, this.valueMap.get("a"));
        this.horz(0, 0, this.valueMap.get("g"));
        this.horz(0, this.SEGMENT + 2 * this.GAP, this.valueMap.get("d"));

        this.vert(-this.SEGMENT / 2 - this.GAP, -this.SEGMENT / 2 - this.GAP, this.valueMap.get("f"));
        this.vert(this.SEGMENT / 2 + this.GAP, -this.SEGMENT / 2 - this.GAP, this.valueMap.get("b"));
        this.vert(-this.SEGMENT / 2 - this.GAP, this.SEGMENT / 2 + this.GAP, this.valueMap.get("e"));
        this.vert(this.SEGMENT / 2 + this.GAP, this.SEGMENT / 2 + this.GAP, this.valueMap.get("c"));

        this.ctx.restore();
    }

    horz(x, y, isRed)
    {
        this.ctx.beginPath();
        this.ctx.moveTo(x - this.SEGMENT / 2, y);
        this.ctx.lineTo(x - this.SEGMENT / 2 + this.POINT, y - this.WIDTH / 2);
        this.ctx.lineTo(x + this.SEGMENT / 2 - this.POINT, y - this.WIDTH / 2);
        this.ctx.lineTo(x + this.SEGMENT / 2, y);
        this.ctx.lineTo(x + this.SEGMENT / 2 - this.POINT, y + this.WIDTH / 2);
        this.ctx.lineTo(x - this.SEGMENT / 2 + this.POINT, y + this.WIDTH / 2);
        this.ctx.closePath();

        this.ctx.fillStyle = isRed ? "#FF0000": "#FFFFFF";
        this.ctx.fill()

        this.ctx.strokeStyle = "#000000";
        this.ctx.stroke();
    }

    vert(x, y, isRed)
    {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y - this.SEGMENT / 2);
        this.ctx.lineTo(x - this.WIDTH / 2, y - this.SEGMENT / 2 + this.POINT);
        this.ctx.lineTo(x - this.WIDTH / 2, y + this.SEGMENT / 2 - this.POINT);
        this.ctx.lineTo(x, y + this.SEGMENT / 2);
        this.ctx.lineTo(x + this.WIDTH / 2, y + this.SEGMENT / 2 - this.POINT);
        this.ctx.lineTo(x + this.WIDTH / 2, y - this.SEGMENT / 2 + this.POINT);
        this.ctx.closePath();

        this.ctx.fillStyle = isRed ? "#FF0000": "#FFFFFF";
        this.ctx.fill()

        this.ctx.strokeStyle = "#000000";
        this.ctx.stroke();
    }
}


class NixieTube extends Component
{
    constructor(layout, canvas, ctx, id, params)          
    {
        super(layout, canvas, ctx, id, params);

        this.values = [false, false, false, false, false, false, false, false, false, false];

        this.WIDTH = 50;
        this.HEIGHT = 125;
        this.FONTSIZE = 150;
    }

    getCoordinates(io)
    {
        let pt = { x: 0, y: 0 };

        if (io != undefined && io.length == 1)
        {
            let i = parseInt(io, 10);
            pt.x = (i - 4.5) * this.WIDTH / 10;
            pt.y = 0;
        }

        return this.xformLocal(pt);
    }

    setInput(num, value) 
    {
        this.values[num] = value;
        this.render();
    }

    render()
    {
        this.ctx.save();

        this.applyGlobalTransform();
        this.applyLocalTransform();

        this.ctx.beginPath();
        this.ctx.moveTo(this.WIDTH / 2, 0);
        this.ctx.lineTo(this.WIDTH / 2, -this.HEIGHT);
        this.ctx.arc(0, -this.HEIGHT, this.WIDTH / 2, radians(0), radians(-180), true);
        this.ctx.lineTo(-this.WIDTH / 2, 0);

        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.fill();

        this.ctx.strokeStyle = "#000000";
        this.ctx.lineWidth = 2; 
        this.ctx.stroke();

        // Special font for numbers.
        this.ctx.font = "lighter " + this.FONTSIZE + "px Helvetica";

        for (let i = 9; i >= 0; i--)
        {
            let num = i.toString();

            this.ctx.save();
            this.ctx.scale(0.6, 1);
            this.ctx.globalAlpha = this.values[i] ? 1 : 0.05;
            this.ctx.fillStyle = this.values[i] ? "#FF0000" : "#000000";
            this.centerText(num, 0, -this.HEIGHT / 2 - this.WIDTH / 4);
            this.ctx.restore();
        }

        this.ctx.beginPath();
        this.ctx.moveTo(-this.WIDTH / 2, -3);
        this.ctx.lineTo(this.WIDTH / 2, -3);
        this.ctx.lineWidth = 6;
        this.ctx.lineCap = "square";
        this.ctx.strokeStyle = "#000000";
        this.ctx.stroke();

        this.ctx.restore();

    }
}

class TextBox extends SinglePropagator
{
    constructor(layout, canvas, ctx, id, params)          
    {
        super(layout, canvas, ctx, id, params);

        // Defaults
        this.text = "?";
        this.width = 100;
        this.horzAlign = "center";          // also: "left" or "right"
        this.font = "14px " + this.fontFamily;
        this.attach = { x: 0.5, y: 0} ;
    }

    setProperty(key, value)
    {
        super.setProperty(key, value);

        switch (key)
        {
            case "text": this.text = value.trim();  break;
            case "width": this.width = value;  break;
            case "horzAlign": this.horzAlign = value;  break;
            case "font": this.font = value;  break;
            case "attach":                                      // y value not being used!
                let nums = value.split(",");
                let x = parseFloat(nums[0]);
                let y = parseFloat(nums[1]);
                this.attach = {x: x, y: y};
                break;
        }
    }

    getCoordinates(io)
    {
        let pt = { x: 0, y: 0 };
        return this.xformLocal(pt);
    }

    setInput(num, value)
    {
        this.output = value;
        this.propagate();
        this.render();
    }

    render()
    {
        this.ctx.save();
        this.applyGlobalTransform();
        this.applyLocalTransform();

        this.ctx.font = this.font;
        let metrics = this.ctx.measureText(" ");
        let lineSpace = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;

        this.ctx.textAlign = this.horzAlign; 
        this.ctx.textBaseline = "top";

        let lines = [];
        this.wordwrap(lines, this.text);

        // Set x and translation for horizontal alignment and attach coordinate
        let x = 0;

        switch (this.horzAlign)
        {
            case "left": 
                this.ctx.translate(-this.attach.x * this.width, 0);
                x = 0;  
                break;

            case "center": 
                x = -this.width / 2; 
                this.ctx.translate((0.5 - this.attach.x) * this.width, 0); 
                break;

            case "right": 
                x = -this.width; 
                this.ctx.translate((1 - this.attach.x) * this.width, 0); 
                break;
        }

        // Clear the rectangle
        // TODO: Width needs to be based on maximum text width if can't wrap a line
        this.ctx.clearRect(x, 0, this.width, lines.length * lineSpace);

        // Display the text
        this.ctx.fillStyle = this.output ? "#FF0000" : "#000000";
        let y = 0;

        lines.forEach((line) => 
        {
            this.ctx.fillText(line, 0, y);
            y += lineSpace;
        });

        this.ctx.restore();
    }

    wordwrap(lines, text, pos)
    {
        if (pos == undefined)
            pos = text.length;

        let ss = text.substring(0, pos);            
       
        if (this.ctx.measureText(ss).width < this.width || ss.indexOf(" ") == -1)
        {
            lines.push(ss);

            if (pos < text.length)
                this.wordwrap(lines, text.substring(pos + 1));
        }
        else
        {
            pos = text.lastIndexOf(" ", pos - 1);
            this.wordwrap(lines, text, pos);
        }
    }
}
