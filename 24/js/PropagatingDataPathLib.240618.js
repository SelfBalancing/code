// PropagatingDataPath (c) Charles Petzold, 2024

class DataPath extends SinglePropagator
{
    constructor(layout, canvas, ctx, id, params, points, 
                numChars = 2, beg = "close", end = "arrow", 
                wide16 = false, pos = undefined, nudge = 0)
    {
        super(layout, canvas, ctx, id, params);

        this.output = NaN;
        this.points = points;
        this.numChars = numChars;
        this.beginType = beg;       // or "arrow" (not implemented) or "none"
        this.endType = end;         // or "close" or "none"
        this.wide16 = wide16;
        this.pos = pos;             // position of text value 
        this.nudge = nudge;

        this.dataPathWidth = params.dataPathWidth * (wide16 ? 2 : 1);

        this.alreadyRendered = false;
    }

    setInput(num, value)
    {
        if (isNaN(value) && isNaN(this.output))
            return;

        if (typeof(value) === "boolean")
            return;

        if (value != this.output)
        {
            this.output = value;

            if (/* !isNaN(this.output) && */ !this.doNotPropagate)
            {
                this.propagate();
            }

            // Avoid re-rendering if there are no characters to be displayed
            //  This avoids foreground/background problems with overlapping thin wires
            if (!this.alreadyRendered || this.numChars > 0)
            {
                this.render();
            }
        }
    }

    render()
    {
        let fontsize = 16;

        let pts = this.points;

        // The logic to display values can be moved to end if the width of the data path is not affected
        let valueShowPoints = [];
        let verticalValueShow = false;

        if (this.numChars != 0)
        {
            // Find points for data value
            let maxLength = 0;

            // Find maximum horizontal component of data path
            for (let i = 0; i < pts.length - 1; i++)
            {
                if (pts[i].y == pts[i + 1].y)
                {
                    let length = Math.abs(pts[i].x - pts[i + 1].x);
                    if (length > 20) 
                    {
                        maxLength = length;
                        valueShowPoints.push ({x: (pts[i].x + pts[i + 1].x) / 2, y: pts[i].y});
                    }
                }
            }

            // Uh oh -- no horizontal component of data path, so find maximum vertical
            if (maxLength == 0)
            {
                for (let i = 0; i < pts.length - 1; i++)
                {
                    if (pts[i].x == pts[i + 1].x)
                    {
                        let length = Math.abs(pts[i].y - pts[i + 1].y);
                        if (length > 20) 
                        {
                            maxLength = length;
                            valueShowPoints.push({x: pts[i].x, y: (pts[i].y + pts[i + 1].y) / 2});
                        }
                    }
                }
                verticalValueShow = true;
            }
        }

        // Draw closed wide line 
        this.createWideLinePath(pts, true);

        // erase interior
        this.ctx.save();
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.fill();
        this.ctx.restore();

        // Draw possibly open wide line
        this.createWideLinePath(pts, false);

        // stroke outline
        this.ctx.save();
        this.ctx.strokeStyle = "#000000";
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.stroke();
        this.ctx.restore();

        if (this.numChars != 0 && !isNaN(this.output))
        {
            // Display data value
            this.ctx.save();
            this.applyGlobalTransform();

            this.ctx.fillStyle = "#000000";

            for (let i = 0; i < valueShowPoints.length; i++)
            {
                let hexVal = this.output.toString(16).toUpperCase().padStart(this.numChars, "0") + "h";

                if (!verticalValueShow)
                {
                    let x = valueShowPoints[i].x + this.nudge;
                    let y = valueShowPoints[i].y;

                    if (this.pos != undefined)
                    {
                        x = pts[this.pos >= 0 ? 0 : 1].x + this.pos;
                    }

                    this.ctx.font = fontsize + "px " + this.fontFamily;
                    this.centerText(hexVal, x, y);
                }
                else
                {
                    let x = valueShowPoints[i].x;
                    let y = valueShowPoints[i].y + this.nudge

                    // Assumes only one segment of wide line
                    if (this.pos != undefined)
                    {
                        y = pts[this.pos >= 0 ? 0 : 1].y + this.pos; 
                    }

                    hexVal = hexVal.substr(0, hexVal.length - 1);
                    this.ctx.font = (fontsize - 3) + "px " + this.fontFamily;
                    this.centerText(hexVal, x, y);
                }
            }
            this.ctx.restore();
        }

        this.alreadyRendered = true;
    }

    createWideLinePath(pts, alwaysClose)
    {
        let width = this.dataPathWidth;
        let arrow = 18;
        let flang = 8;

        let ptsR = [];
        let ptsL = [];
        let prevAngle = 0;

        // Loop does not include last point!
        for (let i = 0; i < pts.length - 1; i++)
        {
            let vector = this.createNormalizedVector(pts[i], pts[i + 1]);

            let angle = 180 * Math.atan2(vector.y, vector.x) / Math.PI;
            let rightNorm = {x:-vector.y, y:vector.x};      // rotate 90 degrees clockwise
            let leftNorm = {x:vector.y, y:-vector.x};       // rotate 90 degrees counter-clockwise
            let right = this.multiplyVector(width / 2, rightNorm);
            let left = this.multiplyVector(width / 2, leftNorm);

            let ptR = {x: pts[i].x + right.x, y: pts[i].y + right.y};
            let ptL = {x: pts[i].x + left.x, y: pts[i].y + left.y};
       
            // For points other than first, must adjust for corner
            if (i > 0)
            {
                let vectorCorner = this.multiplyVector(-width / 2, vector);

                if ((angle - prevAngle + 360) % 360 < 180)
                {
                    ptR.x -= vectorCorner.x;
                    ptR.y -= vectorCorner.y;

                    ptL.x += vectorCorner.x;
                    ptL.y += vectorCorner.y;
                }
                else
                {
                    ptR.x += vectorCorner.x;
                    ptR.y += vectorCorner.y;

                    ptL.x -= vectorCorner.x;
                    ptL.y -= vectorCorner.y;
                }
            }

            // Add points to arrays
            ptsR.push(ptR);
            ptsL.push(ptL);

            // Save previous angle for next iteration
            prevAngle = angle;

            if (i == pts.length - 2)
            {
                let lastPoint = pts[pts.length - 1];

                if (this.endType != "arrow")
                {
                    ptR = this.multiplyVector(width / 2, rightNorm);
                    ptR.x += lastPoint.x;
                    ptR.y += lastPoint.y;
                    ptsR.push(ptR);

                    ptL = this.multiplyVector(width / 2, leftNorm);
                    ptL.x += lastPoint.x;
                    ptL.y += lastPoint.y;
                    ptsL.push(ptL);
                }

                // Do the arrow at the final point
                else if (this.endType == "arrow")
                {
                    let vectorArrow = this.multiplyVector(arrow, vector);

                    ptR = this.multiplyVector(width / 2, rightNorm);
                    ptR.x += lastPoint.x - vectorArrow.x;
                    ptR.y += lastPoint.y - vectorArrow.y;
                    ptsR.push(ptR);

                    ptL = this.multiplyVector(width / 2, leftNorm);
                    ptL.x += lastPoint.x - vectorArrow.x;
                    ptL.y += lastPoint.y - vectorArrow.y;
                    ptsL.push(ptL);

                    let pt = this.multiplyVector(flang, rightNorm);
                    pt.x += ptR.x;
                    pt.y += ptR.y;
                    ptsR.push(pt);

                    pt = this.multiplyVector(flang, leftNorm);
                    pt.x += ptL.x;
                    pt.y += ptL.y;
                    ptsL.push(pt);

                    // Adjust just a bit so point doesn't overlfow
                    ptsR.push({x: lastPoint.x - vector.x, y: lastPoint.y - vector.y});
                }
            }
        }

        // Assemble path from both lists
        this.ctx.save();
        this.applyGlobalTransform();

        this.ctx.beginPath();

        // This is the only effect of this function argument:
        //  the path is closed for purposes of filling but not stroking.                
        if (alwaysClose || (this.beginType == "close" && this.endType == "none"))
        {
            this.ctx.moveTo(ptsL[ptsL.length - 1].x, ptsL[ptsL.length - 1].y);

            for (let i = ptsL.length - 2; i >= 0; i--)
                this.ctx.lineTo(ptsL[i].x, ptsL[i].y);  
    
            for (let i = 0; i < ptsR.length; i++)
                this.ctx.lineTo(ptsR[i].x, ptsR[i].y);
        }
        else if (this.beginType == "none" && this.endType == "none")
        {
            this.ctx.moveTo(ptsR[0].x, ptsR[0].y);

            for (let i = 1; i < ptsR.length; i++)
                this.ctx.lineTo(ptsR[i].x, ptsR[i].y);

            this.ctx.moveTo(ptsL[0].x, ptsL[0].y);

            for (let i = 1; i < ptsL.length; i++)
                this.ctx.lineTo(ptsL[i].x, ptsL[i].y);
        }

        else
        {
            this.ctx.moveTo(ptsR[0].x, ptsR[0].y);

            for (let i = 1; i < ptsR.length; i++)
                this.ctx.lineTo(ptsR[i].x, ptsR[i].y);

            for (let i = ptsL.length - 1; i >= 0; i--)
            {
                this.ctx.lineTo(ptsL[i].x, ptsL[i].y);  
            }
            
            if (this.beginType == "close")
                this.ctx.closePath();
        }

        this.ctx.restore();
    }

    createNormalizedVector(pt0, pt1)
    {
        let vector = {x: pt1.x - pt0.x, y: pt1.y - pt0.y};
        let length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
        vector.x /= length;
        vector.y /= length;
        return vector;
    }

    multiplyVector(mult, vector)
    {
        let v = {x:0, y:0};
        v.x = vector.x * mult;
        v.y = vector.y * mult;
        return v;
    }
}

class DataPathNode extends MultiPropagator
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);

        this.output = NaN;
        this.dataPathWidth = params.dataPathWidth; 
    }

    getCoordinates(io)
    {
        let pt = { x: 0, y: 0 };

        switch(io)
        {
            case "top": pt = { x: 0, y: -this.dataPathWidth / 2 }; break;
            case "left": pt = { x: -this.dataPathWidth / 2, y: 0 }; break;
            case "right": pt = { x: this.dataPathWidth / 2, y: 0 }; break;
            case "bottom": pt = { x: 0, y: this.dataPathWidth / 2 }; break;
        }

        return this.xformLocal(pt);
    }

    setInput(num, value)
    {
        if (isNaN(value) && isNaN(this.output))
            return;

        if (value != this.output)
        {
            this.output = value;

            if (!this.doNotPropagate)
            {
                this.propagate();
            }
            this.render();
        }
    }

    // Copied from MultiPropagator and modified
    propagate()
    {
        for (let i = 0; i < this.destinations.length; i++)
        {
            let dest = this.destinations[i].dest;
            let num = this.destinations[i].num;

            // In virtually all cases, dest is a DataPath and num is 0, so:
            if (num == 0)
            {
                dest.setInput(0, this.output);    
            }
            // But if num is not zero (as in the ALU for the sign bit), then it's "bitx" and dest is a WireArray.
            else
            {
                let bit = Number(num.substr(3));
                let mask = 1 << bit;
                dest.setInput(0, (this.output & mask) != 0); 
            }
        }
    }

    render()
    {
        this.ctx.save();
        this.applyGlobalTransform();
        this.applyLocalTransform();

        this.ctx.beginPath();

        if (this.propertyMap.has("bottom") && this.propertyMap.get("bottom"))
        {
            this.ctx.moveTo(-this.dataPathWidth / 2, this.dataPathWidth / 2);
            this.ctx.lineTo(this.dataPathWidth / 2, this.dataPathWidth / 2);
        }

        if (this.propertyMap.has("top") && this.propertyMap.get("top"))
        {
            this.ctx.moveTo(-this.dataPathWidth / 2, -this.dataPathWidth / 2);
            this.ctx.lineTo(this.dataPathWidth / 2, -this.dataPathWidth / 2);
        }

        if (this.propertyMap.has("right") && this.propertyMap.get("right"))
        {
            this.ctx.moveTo(this.dataPathWidth / 2, -this.dataPathWidth / 2);
            this.ctx.lineTo(this.dataPathWidth / 2, this.dataPathWidth / 2);
        }

        if (this.propertyMap.has("left") && this.propertyMap.get("left"))
        {
            this.ctx.moveTo(-this.dataPathWidth / 2, -this.dataPathWidth / 2);
            this.ctx.lineTo(-this.dataPathWidth / 2, this.dataPathWidth / 2);
        }

        this.ctx.restore();

        this.ctx.save();
        this.ctx.strokeStyle = "#000000";
        this.ctx.stroke();
        this.ctx.restore();
    }
}

class DataPathNode16 extends DataPathNode
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);
        this.dataPathWidth *= 2;
    }
}

class DataNorGate extends NorGate
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);
        this.input = 0;
        this.output = true;
    }
    
    setInput(num, value) 
    {
        this.input = value;
        let output = this.input == 0; 

        if (output != this.output)
        {
            this.output = output;
            this.propagate();
        }
    }
}

