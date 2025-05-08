// PropagatingRelayLib (c) Charles Petzold, 2024

class Relay extends Component
{
    constructor(layout, canvas, ctx, id, params)
    {
        super(layout, canvas, ctx, id, params);

        this.id = id;
        
        // true if current is flowing through the electromagnet coils, set by setConducting
        this.isCoilConducting = false;

        // true if the bar is drawn towards the electromagnet
        this.isTriggered = false;

        // These are set during getCoordinates to render the wires to the edge
        this.isOut0Visible = false;
        this.isOut1Visible = false;

        this.isPivotTopVisible = false;
        this.isPivotSideVisible = false;

        // These are set externally by setConducting
        this.isOut0Conducting = false;
        this.isOut1Conducting = false;
    }

    notifyChange(func)
    {
        this.notifyFunc = func;
    }

    getCoordinates(io, wireConnect = false)
    {
        let pt = { x: 0, y: 0 };

        switch(io)
        {
            case "pivot": 
                pt = { x:20, y:0 }; 

                if (wireConnect)
                {
                    this.isPivotTopVisible = true;
                    this.render();
                }
                break;

            case "pivotSide":
                pt = { x:0, y:15 };

                if (wireConnect)
                {
                    this.isPivotSideVisible = true;
                    this.render();
                }

                break; 

            case "out0": 
                pt = { x:100, y:10}; 
                
                if (wireConnect)
                {
                    this.isOut0Visible = true;
                    this.render();
                }    
                break;

            case "out1": 
                pt = { x:100, y:30};
                
                if (wireConnect)
                {
                    this.isOut1Visible = true;
                    this.render();
                }
                break;

            case "coilIn": 
                pt = {x:0, y:45}; 
                break;

            case "coilOut": 
                pt = {x:15, y:100}; 
                break;
        }

        return this.xformLocal(pt);
    }

    // Do nothing for this propagating function, 
    //  although could be implemented for propagating by 
    //  replacing setConducting
    setInput(num, value)
    {

    }

    setConducting(type, isConducting)
    {
        switch (type)
        {
            case 0:
                if (this.isCoilConducting != isConducting)
                {
                    this.isCoilConducting = isConducting;
                    setTimeout(this.setTriggered.bind(this), this.params.propagationDelay);
                }
                break;

            case 1:
                this.isOut0Conducting = isConducting;
                break;

            case 2:
                this.isOut1Conducting = isConducting;
                break;
        }
    }

    setTriggered()
    {
        if (this.isTriggered != this.isCoilConducting)
        {
            this.isTriggered = this.isCoilConducting;
            this.render();

            if (this.notifyFunc != undefined)
            {
                this.notifyFunc(this.id);                
            }
        }
    }

    render()
    {
        const side = 100;

        this.ctx.save();
        this.applyGlobalTransform();
        this.applyLocalTransform();

        // Erase to white
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.fillRect(0, 0, side, side);

        // Draw outline
        this.ctx.strokeStyle = "#000000";
        this.ctx.lineWidth = 2 / this.scale;     // Note!
        this.ctx.strokeRect(0, 0, side, side);

        // Draw bar
        this.ctx.strokeStyle = (this.isOut0Conducting || this.isOut1Conducting) ? "#FF0000" : "#808080";
        this.ctx.lineWidth = 6;
        this.ctx.lineCap = "round"
        this.ctx.beginPath();
        this.ctx.moveTo(20, 15);

        if (this.isTriggered)
        {
            this.ctx.quadraticCurveTo(50, 15, 80, 27);
        }
        else
        {
            this.ctx.lineTo(85, 15);
        }
        this.ctx.stroke();

        // Draw dots for lever
        this.ctx.fillStyle = "#000000";
        this.ctx.beginPath();
        this.ctx.arc(20, 15, 2, 0, radians(360));
        this.ctx.fill();

        this.ctx.fillStyle = this.isOut0Conducting ? "#FF0000" : "#000000";
        this.ctx.beginPath();
        this.ctx.arc(75, 10, 2, 0, radians(360));
        this.ctx.fill();

        this.ctx.fillStyle = this.isOut1Conducting ? "#FF0000" : "#000000";
        this.ctx.beginPath();
        this.ctx.arc(75, 30, 2, 0, radians(360));
        this.ctx.fill();

        // Wires from edges to those dots
        this.ctx.lineWidth = 1; //  / this.scale; 

        // V input wire
        this.ctx.strokeStyle = (this.isOut0Conducting || this.isOut1Conducting) ? "#FF0000" : "#808080";
        this.ctx.beginPath();

        if (this.isPivotTopVisible)
        {
            this.ctx.moveTo(20, 15);
            this.ctx.lineTo(20, 0);
        }
        if (this.isPivotSideVisible)
        {
            this.ctx.moveTo(20, 15);
            this.ctx.lineTo(0, 15);
        }
        this.ctx.stroke();

        // Output wires
        if (this.isOut0Visible)
        {
            this.ctx.strokeStyle = this.isOut0Conducting ? "#FF0000" : "#808080";
            this.ctx.beginPath();
            this.ctx.moveTo(75, 10);
            this.ctx.lineTo(100, 10);
            this.ctx.stroke();
        }

        if (this.isOut1Visible)
        {
            this.ctx.strokeStyle = this.isOut1Conducting ? "#FF0000" : "#808080";
            this.ctx.beginPath();
            this.ctx.moveTo(75, 30);
            this.ctx.lineTo(100, 30);
            this.ctx.stroke();
        }

        // Magnetic bar
        this.ctx.beginPath();
        this.ctx.moveTo(35, 43);
        this.ctx.ellipse(50, 66.8, 50, 25, 0, -1.875, -1.266);
        this.ctx.lineTo(65, 90); 
        this.ctx.ellipse(50, 66.2, 50, 25, 0, 1.266, 1.875);
        this.ctx.closePath();

        this.ctx.strokeStyle = "#000000";
        this.ctx.lineWidth = 2 / this.scale; 
        this.ctx.stroke();

        // Coils
        this.ctx.strokeStyle = this.isCoilConducting ? "#FF0000": "#000000";
        this.ctx.lineWidth = 1 / this.scale;

        this.ctx.beginPath();
        this.ctx.moveTo(0, 45);
        this.ctx.lineTo(35, 45);
        this.ctx.stroke();                   // only last stroke needed

        for (var i = 0; i < 18; i++)
        {
            this.ctx.beginPath();            // only first beginPath needed
            this.ctx.moveTo(35, 47 + i * 2);
            this.ctx.ellipse(50, 47.9 + i * 2, 17, 3, -0.035, -2.644, -0.48, true);
            this.ctx.stroke();
        }

        // Last coil
        this.ctx.beginPath();
        this.ctx.moveTo(50, 87);
        this.ctx.ellipse(50.25, 84, 17, 3, -0.035, 1.592, -0.514, true);
        this.ctx.stroke();

        // Now the wire to the edge
        this.ctx.beginPath();
        this.ctx.moveTo(50, 87);
        this.ctx.arcTo(15, 87, 15, 100, 20 / 1.5);
        this.ctx.lineTo(15, 100);
        this.ctx.stroke();

        this.ctx.restore();
    }
}