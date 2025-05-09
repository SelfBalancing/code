// PropagatingSemiconductorsLib (c) Charles Petzold, 2024

// for the Dot Matrix Clock
class NumericDiodeMatrix extends ComplexPropagator
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);

        this.separation = 20;
        this.diagonal = 12
        this.addlNumSep = 10;
        this.dotRadius = 2;
        this.currentCol = 0;

        this.diodes = [
            [ 0,1,1,1,0, 0,0,1,0,0, 0,1,1,1,0, 1,1,1,1,1, 0,0,0,1,0, 1,1,1,1,1, 0,0,1,1,0, 1,1,1,1,1, 0,1,1,1,0, 0,1,1,1,0 ],
            [ 1,0,0,0,1, 0,1,1,0,0, 1,0,0,0,1, 0,0,0,1,0, 0,0,1,1,0, 1,0,0,0,0, 0,1,0,0,0, 0,0,0,0,1, 1,0,0,0,1, 1,0,0,0,1 ],
            [ 1,0,0,1,1, 0,0,1,0,0, 0,0,0,0,1, 0,0,1,0,0, 0,1,0,1,0, 1,1,1,1,0, 1,0,0,0,0, 0,0,0,1,0, 1,0,0,0,1, 1,0,0,0,1 ],
            [ 1,0,1,0,1, 0,0,1,0,0, 0,0,0,1,0, 0,0,0,1,0, 1,0,0,1,0, 0,0,0,0,1, 1,1,1,1,0, 0,0,1,0,0, 0,1,1,1,0, 0,1,1,1,1 ],
            [ 1,1,0,0,1, 0,0,1,0,0, 0,0,1,0,0, 0,0,0,0,1, 1,1,1,1,1, 0,0,0,0,1, 1,0,0,0,1, 0,1,0,0,0, 1,0,0,0,1, 0,0,0,0,1 ],
            [ 1,0,0,0,1, 0,0,1,0,0, 0,1,0,0,0, 1,0,0,0,1, 0,0,0,1,0, 1,0,0,0,1, 1,0,0,0,1, 0,1,0,0,0, 1,0,0,0,1, 0,0,0,1,0 ],
            [ 0,1,1,1,0, 0,1,1,1,0, 1,1,1,1,1, 0,1,1,1,0, 0,0,0,1,0, 0,1,1,1,0, 0,1,1,1,0, 0,1,0,0,0, 0,1,1,1,0, 0,1,1,0,0 ]
        ];
    }

    getCoordinates(io)
    {
        let pt = {x:0, y:0};

        if (io != undefined)
        {
            if (io.startsWith("out"))
            {
                let row = parseInt(io.substr(3));
                pt.x = 49 * this.separation + 9 * this.addlNumSep + this.diagonal;
                pt.y = (row + 1) * this.separation - this.diagonal;
            }
            else if (io.startsWith("col"))
            {
                let col = parseInt(io.substr(3));
                pt.x = col * this.separation + Math.floor(col / 5) * this.addlNumSep;
                pt.y = 7 * this.separation;
            }
        }

        return this.xformLocal(pt);
    }

    setInput(col, value)
    {
        if (value)
        {
            if (col != this.currentCol)
            {
                // Avoid glitches by turning currentCol off and propagate false to rows
                this.renderCol(this.currentCol, this.white, 2);
                this.renderCol(this.currentCol, this.black, 1);

                for (let row = 0; row < 7; row++)
                {
                    if (this.diodes[row][this.currentCol] != 0)
                    {
                        this.propagate("out" + row, false);
                    }
                }

                // Turn new col on and propagate true to rows
                this.renderCol(col, this.white, 2);
                this.renderCol(col, this.red, 1);

                for (let row = 0; row < 7; row++)
                {
                    if (this.diodes[row][col] != 0)
                    {
                        this.propagate("out" + row, true);
                    }
                }

                this.currentCol = col;
            }
        }
    }

    // only called initially
    render()
    {
        for (let col = 0; col < 50; col++)
        {
            this.renderCol(col, this.black, 1);
        }
    }

    renderCol(col, color, strokeWidth)
    {
        this.ctx.save();
        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;
        this.ctx.lineWidth = strokeWidth;

        // Shortcut for no local matrix and global translation only
        let pt = {x:this.globalMatrix.e, y:this.globalMatrix.f};

        let didVert = false;

        for (let row = 0; row < 7; row++)
        {
            let code = this.diodes[row][col];

            if (this.diodes[row][col] != 0)
            {
                let x = pt.x + col * this.separation + Math.floor(col / 5) * this.addlNumSep;
                let y = pt.y + (row + 1) * this.separation;

                // Line
                if (!didVert)
                {
                    this.ctx.beginPath();
                    this.ctx.moveTo(x, y);
                    this.ctx.lineTo(x, pt.y + 7 * this.separation);
                    this.ctx.stroke();
                    didVert = true;
                }

                // Dot
                this.ctx.beginPath();
                this.ctx.arc(x, y, this.dotRadius, 0, radians(360));
                this.ctx.fill();
            
                // Diode
                this.ctx.beginPath();
                this.ctx.moveTo(x, y);
                this.ctx.lineTo(x + 4, y - 4);
                this.ctx.lineTo(x + 6, y - 2);
                this.ctx.lineTo(x + 8, y - 8);
                this.ctx.lineTo(x + 2, y - 6);
                this.ctx.lineTo(x + 4, y - 4);

                this.ctx.moveTo(x + 10, y - 6);
                this.ctx.lineTo(x + 6, y - 10);

                this.ctx.moveTo(x + 8, y - 8);
                this.ctx.lineTo(x + this.diagonal, y - this.diagonal);

                // Render horizontal
                this.ctx.lineTo(pt.x + 49 * this.separation + 9 * this.addlNumSep + this.diagonal, y - this.diagonal);
                this.ctx.stroke();

                for (let xcol = col; xcol < 50; xcol++)
                {
                    // Dot
                    if (this.diodes[row][xcol] != 0)
                    {
                        let x = pt.x + xcol * this.separation + Math.floor(xcol / 5) * this.addlNumSep;
                        this.ctx.beginPath();
                        this.ctx.arc(x + 12, y - 12, this.dotRadius, 0, radians(360));
                        this.ctx.fill();
                    }
                }
            }
        }
        this.ctx.restore();
    }
}

class InstructionDiodeMatrix extends ComplexPropagator
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);

        this.vertSeparation = 40;   
        this.horzSeparation = 50;
        this.size = 24;
        this.dotRadius = 2;
        this.groupSeparation = 50;

        this.diodes = 
        [
            // this.diodes[row, grp, col]

            // 000 = no dot, no diode
            // 001 = diode with no dots
            // 011 = diode with dot out but no dot in because last in row
            // 101 = diode with dot in but no dot out because top in col
            // 111 = diode with dots in and out 

            // Address Bus --------------  Data Bus ---------------------------
            // EC1    EP1  EC2        EP2  EC1           EP1           EC2  EP2
            [ [0, 0], [0], [0, 0, 0], [0], [5, 0, 0, 0], [1, 0, 0, 0], [0], [0] ],  // MOV r,r
            [ [5, 0], [0], [0, 0, 0], [0], [0, 5, 0, 0], [3, 0, 0, 0], [0], [0] ],  // MOV r,M
            [ [7, 0], [0], [0, 0, 0], [0], [7, 0, 0, 0], [0, 1, 0, 0], [0], [0] ],  // MOV M,r
            [ [0, 0], [0], [0, 0, 0], [0], [0, 0, 5, 0], [3, 0, 0, 0], [0], [0] ],  // MVI r,data
            [ [7, 0], [0], [0, 0, 0], [0], [0, 0, 7, 0], [0, 3, 0, 0], [0], [0] ],  // MVI M,data
            [ [0, 0], [0], [0, 0, 0], [0], [7, 0, 0, 0], [0, 0, 5, 0], [5], [1] ],  // ADD r,...
            [ [7, 0], [0], [0, 0, 0], [0], [0, 7, 0, 0], [0, 0, 7, 0], [7], [3] ],  // ADD M,...
            [ [0, 0], [0], [0, 0, 0], [0], [0, 0, 7, 0], [0, 0, 7, 0], [7], [3] ],  // ADI data,...
            [ [7, 0], [5], [5, 5, 0], [1], [0, 0, 0, 0], [0, 0, 0, 0], [0], [0] ],  // INX HL
            [ [7, 0], [7], [7, 0, 5], [3], [0, 0, 0, 0], [0, 0, 0, 0], [0], [0] ],  // DCX HL
            [ [0, 2], [0], [0, 0, 0], [0], [0, 7, 0, 0], [0, 0, 0, 1], [0], [0] ],  // LDA addr
            [ [0, 7], [0], [0, 0, 0], [0], [0, 0, 0, 5], [0, 3, 0, 0], [0], [0] ]   // STA addr
        ];

        this.currentRow = -1;
    }

    getCoordinates(io)
    {
        let pt = {x: 0, y: 0};

        if (io != undefined)
        {
            if (io.startsWith("row"))
            {
                let row = parseInt(io.substr(3));
                pt.x = 0;
                pt.y = row * this.vertSeparation;
            }

            if (io.startsWith("out"))
            {
                let out = parseInt(io.substr(3));

                pt.y = this.vertSeparation * this.diodes.length;
                pt.x = this.size;

                let grp = 0;
                let col = 0;

                for (let i = 0; i < out; i++)
                {
                    pt.x += this.horzSeparation;

                    if (++col == this.diodes[0][grp].length)
                    {
                        col = 0;
                        grp++;
                        pt.x += this.groupSeparation;
                    }
                }
            }
        }
        return this.xformLocal(pt);
    }

    setInput(row, value)
    {
        if (value)  
        {
            if (row != this.currentRow)
            {
                this.colorAndPropagate(this.currentRow, false);
                this.colorAndPropagate(row, true);

                this.currentRow = row;
            }
        }
        else
        {
            this.colorAndPropagate(row, false);
        }
    }

    colorAndPropagate(row, state)
    {
        if (row == -1)
            return;
        
        if (state)
        {
            this.renderRow(row, this.white, 2);
            this.renderRow(row, this.red, 1);
        }
        else
        {
            this.renderRow(row, this.white, 2);
            this.renderRow(row, this.black, 1);
        }

        for (let grp = 0; grp < this.diodes[row].length; grp++)
        {
            for (let col = 0; col < this.diodes[row][grp].length; col++)
            {
                if (this.diodes[row][grp][col] != 0)
                {
                    let out = this.grpColToOut(grp, col);
                    this.propagate(out, state);
                }
            }
        }
    }

    grpColToOut(group, column)
    {
        let out = 0;

        for (let grp = 0; grp < this.diodes[0].length; grp++)
        {
            for (let col = 0; col < this.diodes[0][grp].length; col++)
            {
                if (grp == group && col == column)
                    break;

                out++;
            }
            if (grp == group)
                break;
        }

        return out;
    }

    render()
    {
        for (let row = 0; row < this.diodes.length; row++)
        {
            this.renderRow(row, this.black, 1)
        }
    }

    renderRow(row, color, strokeWidth)
    {
        this.ctx.save();
        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;
        this.ctx.lineWidth = strokeWidth;

        // Shortcut for local and global translation only
        let pt = {x: this.globalMatrix.e + this.localMatrix.e, 
                  y: this.globalMatrix.f + this.localMatrix.f};
        let y = pt.y + row * this.vertSeparation;
        let x = pt.x;

        let lastDotx = pt.x;

        for (let grp = 0; grp < this.diodes[row].length; grp++)
        {
            for (let col = 0; col < this.diodes[row][grp].length; col++)
            {
                if (this.diodes[row][grp][col] != 0)
                {
                    if ((this.diodes[row][grp][col] & 0x04) != 0)
                    {
                        // In-Dot at upper left
                        this.ctx.beginPath();
                        this.ctx.arc(x, y, this.dotRadius, 0, radians(360));
                        this.ctx.fill();
                    }

                    if (lastDotx != x)
                    {
                        this.ctx.beginPath();
                        this.ctx.moveTo(lastDotx, y);
                        this.ctx.lineTo(x, y);
                        this.ctx.stroke();
                    }
    
                    this.ctx.save();
                    this.ctx.translate(x, y);
                    this.ctx.scale(this.size / 6, this.size / 6);

                    // Diode
                    this.ctx.beginPath();
                    this.ctx.moveTo(0, 0);
                    this.ctx.lineTo(2, 2);
                    this.ctx.lineTo(3, 1);
                    this.ctx.lineTo(4, 4);
                    this.ctx.lineTo(1, 3);
                    this.ctx.lineTo(2, 2);

                    this.ctx.moveTo(5, 3);
                    this.ctx.lineTo(3, 5);

                    this.ctx.moveTo(4, 4);
                    this.ctx.lineTo(6, 6);

                    this.ctx.restore();
                    this.ctx.stroke();

                    lastDotx = x;

                    // Now go down the column
                    let rowDown = row; 
                    let xDown = x + this.size;
                    let yDown = y + this.size;
                    let lastDoty = yDown;

                    while (rowDown < this.diodes.length)
                    {
                        if ((this.diodes[rowDown][grp][col] & 0x02) != 0)
                        {
                            // Out Dot at lower right
                            this.ctx.beginPath();
                            this.ctx.arc(xDown, yDown, this.dotRadius, 0, radians(360));
                            this.ctx.fill();

                            if (lastDoty != y)
                            {
                                this.ctx.beginPath();
                                this.ctx.moveTo(xDown, lastDoty);
                                this.ctx.lineTo(xDown, yDown);
                                this.ctx.stroke();
                            }
                            lastDoty = yDown;
                        }
                        rowDown ++;
                        yDown += this.vertSeparation;
                    }

                    yDown -= this.size; 

                    if (lastDoty != yDown)
                    {
                        this.ctx.beginPath();
                        this.ctx.moveTo(xDown, lastDoty);
                        this.ctx.lineTo(xDown, yDown);
                        this.ctx.stroke();
                    }
                }

                x += this.horzSeparation;
            }
            x += this.groupSeparation;
        }
        this.ctx.restore();
    }
}

class DotMatrixDisplay extends ComplexPropagator
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);

        this.cols = [false, false, false, false, false];
        this.rows = [false, false, false, false, false, false, false];

        this.leds = 
        [
            [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]
        ];

        this.radius = 15;
        this.separation = 36;
        this.width = 5 * this.separation;
        this.height = 7 * this.separation;

        // TK Where is the time being cleared?
        setInterval(this.fadeOutAnimation.bind(this), 30);
    }

    fadeOutAnimation()
    {
        for (let row = 0; row < 7; row++)
        for (let col = 0; col < 5; col++)
        {
            this.leds[row][col] *= 0.95;
        }

        this.render();
    }

    setInput(num, value)
    {
        // Row coming from NumericDiodeMatrix via wire
        if (num >= 0)
        {
            this.rows[num] = value;
        }

        // Column coming from Transistor via wire
        else
        {
            let col = Math.abs(num) - 1;
            this.cols[col] = value;

            if (value)
            {
                for (let row = 0; row < 7; row++)
                {
                    this.leds[row][col] = (this.rows[row] && this.cols[col]) ? 255 : 0;
                }
            }

            this.render();
        }
    }

    // io like "row3" or "col2"
    getCoordinates(io)
    {
        let pt = {x:0, y:0};

        if (io != undefined)
        {
            if (io.startsWith("row"))
            {
                let row = parseInt(io.substr(3));
                pt.y = (row + 0.5) * this.separation;
            }
            else if (io.startsWith("col"))
            {
                let col = parseInt(io.substr(3));
                pt.x = (col + 0.5) * this.separation;
                pt.y = this.height;
            }
        }

        return this.xformLocal(pt);
    }

    render()
    {
        this.ctx.save();
        this.applyGlobalTransform();
        this.applyLocalTransform();

        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.width, this.height);
        this.ctx.strokeStyle = this.black;
        this.ctx.stroke();

        for (let row = 0; row < 7; row++)
        {
            let y = (row + 0.5) * this.separation;

            for (let col = 0; col < 5; col++)
            {
                let x = (col + 0.5) * this.separation;

                this.ctx.clearRect(x - this.radius - 1, y - this.radius - 1, 
                                   2 * this.radius + 2, 2 * this.radius + 2);
                
                this.ctx.beginPath();
                this.ctx.moveTo(x + this.radius, y);
                this.ctx.arc(x, y, this.radius, 0, radians(360));
                
                let val = 255 - Math.floor(this.leds[row][col]);
                this.ctx.fillStyle = `rgb(255, ${val}, ${val})`;
                this.ctx.fill();

                this.ctx.strokeStyle = this.black;
                this.ctx.stroke();
            }
        }
        this.ctx.restore();
    }
}

// for "sink" = true, a bit of cheating here by propagating base to collector for the LED display
class Transistor extends ComplexPropagator
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);

        this.radius = 25;
        this.center = {x: 0, y: 0};
        this.ptB = {x: -this.radius, y: 0};
        this.base = {x: -10, y:0};
        this.baseLength = 30;
        this.baseOffset = 5;
        this.angle = Math.PI * 22.5 / 180;
        this.ptC = {x: this.radius * Math.sin(this.angle), y: -this.radius * Math.cos(this.angle)};
        this.ptE = {x: this.radius * Math.sin(this.angle), y: this.radius * Math.cos(this.angle)};

        this.B = false;
        this.C = false;
        this.E = false;
    }

    getCoordinates(io)
    {
        let pt = {x:0, y:0};

        if (io != undefined)
        {
            switch (io)
            {
                case "B": pt = this.ptB; break;
                case "C": pt = this.ptC; break;
                case "E": pt = this.ptE; break;
            }

            if (io.startsWith("row"))
            {
                let row = parseInt(io.substr(3));
                pt.y = (row + 0.5) * this.separation;
            }
            else if (io.startsWith("col"))
            {
                let col = parseIn(io.substr(3));
                pt.x = (col + 0.5) * this.separation;
            }
        }

        pt = this.xformLocal(pt);

        return pt;
    }

    setInput(num, value)
    {
        if (this.propertyMap.has("sink") && this.propertyMap.get("sink"))
        {
            this.output = value;
            this.B = value;
            this.C = value;
            this.E = value;

            this.propagate("C", value);
            this.propagate("E", value);

            this.render();
        }
        else
        {
            if (num == "B")
            {
                this.B = value;
            }
            if (num == "C")
            {
                this.C = value;
            }

            this.E = this.B && this.C;
            this.output = this.E;
            this.propagate("E", this.output);
            this.render();
        }
    }

    render()
    {
        this.ctx.save();

        // White to erase, then black or red
        this.colorRender(true);
        this.colorRender(false);

        this.ctx.restore();
    }

    colorRender(erase)
    {
        this.ctx.lineWidth = erase ? 2 : 1;

        // base
        this.ctx.save();
        this.applyGlobalTransform();
        this.applyLocalTransform();

        this.ctx.beginPath();
        this.ctx.moveTo(this.base.x, this.base.y - this.baseLength / 2);
        this.ctx.lineTo(this.base.x, this.base.y + this.baseLength / 2);
        
        this.ctx.moveTo(this.base.x, this.base.y);
        this.ctx.lineTo(this.ptB.x, this.base.y);
        this.ctx.restore();

        this.ctx.strokeStyle = erase ? this.white : (this.B ? this.red : this.black);
        this.ctx.stroke();
        
        // collector
        this.ctx.save();
        this.applyGlobalTransform();
        this.applyLocalTransform();

        this.ctx.beginPath();
        this.ctx.moveTo(this.base.x, this.base.y - this.baseOffset);
        this.ctx.lineTo(this.ptC.x, this.ptC.y);
        this.ctx.restore();

        this.ctx.strokeStyle = erase ? this.white : (this.C ? this.red : this.black);
        this.ctx.stroke();

        // emitter
        this.ctx.save();
        this.applyGlobalTransform();
        this.applyLocalTransform();

        this.ctx.beginPath();
        this.ctx.moveTo(this.base.x, this.base.y + this.baseOffset);
        this.ctx.lineTo(this.ptE.x, this.ptE.y);
        this.ctx.restore();

        this.ctx.strokeStyle = erase ? this.white : (this.E ? this.red : this.black);
        this.ctx.stroke();

        // Arrowheads
        this.ctx.save();
        this.applyGlobalTransform();
        this.applyLocalTransform();

        this.ctx.beginPath();
        this.drawArrow(this.ptE, {x: this.base.x, y: this.base.y + this.baseOffset}, 10, 25);
        this.ctx.restore();

        this.ctx.fillStyle =  erase ? this.white : (this.E ? this.red : this.black);
        this.ctx.fill();

        // circle
        this.ctx.save();
        this.applyGlobalTransform();
        this.applyLocalTransform();

        this.ctx.beginPath();
        this.ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
        this.ctx.restore();

        this.ctx.strokeStyle = erase ? this.white : this.black;
        this.ctx.stroke();
    }

    drawArrow(ptLast, ptPrev, arrowLength, arrowAngle)
    {
        let xVector = ptPrev.x - ptLast.x;
        let yVector = ptPrev.y - ptLast.y;
        let length = Math.sqrt(xVector * xVector + yVector * yVector);
        xVector /= length;
        yVector /= length;

        let ptArrow1 = this.arrowPoint({x:xVector, y:yVector}, arrowAngle);
        let x1 = ptLast.x + arrowLength * ptArrow1.x;
        let y1 = ptLast.y + arrowLength * ptArrow1.y;

        let ptArrow2 = this.arrowPoint({x:xVector, y:yVector}, -arrowAngle);
        let x2 = ptLast.x + arrowLength * ptArrow2.x;
        let y2 = ptLast.y + arrowLength * ptArrow2.y;

        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(ptLast.x, ptLast.y);
        this.ctx.lineTo(x2, y2);
        this.ctx.closePath();
    }

    arrowPoint(vector, arrowAngle)
    {
        let x = vector.x * Math.cos(radians(arrowAngle)) - vector.y * Math.sin(radians(arrowAngle));
        let y = vector.x * Math.sin(radians(arrowAngle)) + vector.y * Math.cos(radians(arrowAngle));
        return {x:x, y:y}
    }
}