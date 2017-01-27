class Shape {
    constructor(startX, startY, endX, endY, color, width) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.color = color;
        this.width = width;
    }

    endPoints(x, y){
        this.endX = x;
        this.endY = y;
    }

/*    doStuff() {
        //
    }*/
}

class Pen extends Shape {
    constructor(startX, startY, color, width) {
        super(startX, startY, startX, startY, color, width);
    }

    doStuff() {
        super.doStuff();
    }

    draw(context) {
            // var mouse = {x: 0, y: 0};
	        // var last_mouse = {x: 0, y: 0};
	
            // /* Mouse Capturing Work */
            // //settings.canvas.addEventListener('mousemove', function(e) {
            // $('#myCanvas').mousemove(function(e) {
            //     last_mouse.x = mouse.x;
            //     last_mouse.y = mouse.y;
                
            //     mouse.x = e.pageX - this.offsetLeft;
            //     mouse.y = e.pageY - this.offsetTop;
            // }, false);
	
	
            // /* Drawing on Paint App */
            // context.lineWidth = this.width;
            // context.lineJoin = 'round';
            // context.lineCap = 'round';
            // context.strokeStyle = '#'+this.color;
            // // settings.canvas.style.cursor = "crosshair";
            
            // settings.canvas.addEventListener('mousedown', function(e) {
            //     settings.canvas.addEventListener('mousemove', onPaint, false);
            // }, false);
            
            // settings.canvas.addEventListener('mouseup', function() {
            //     settings.canvas.removeEventListener('mousemove', onPaint, false);
            // }, false);
            
            // var onPaint = function() {
            //     ctx.beginPath();
            //     ctx.moveTo(last_mouse.x, last_mouse.y);
            //     ctx.lineTo(mouse.x, mouse.y);
            //     ctx.closePath();
            //     ctx.stroke();
            // };     
    }       
}

class Rectangle extends Shape {
    constructor(startX, startY, color, width) {
        super(startX, startY, startX, startY, color, width);
    }
    


    doStuff() {
        super.doStuff();
    }

    draw(context) {
        context.strokeStyle = '#'+this.color;
        context.lineWidth = this.width;
        context.strokeRect(this.startX, this.startY, this.endX, this.endY);
    }
}

class Circle extends Shape {
    constructor(startX, startY, color, width) {
        super(startX, startY, startX, startY, color, width);
    }

    doStuff() {
        super.doStuff();
    }

    draw(context) {
        context.beginPath( );
        context.arc( this.startX, this.startY, 70, 0, 2 * Math.PI, false );
        // check out the parameters here
        context.strokeStyle = "#"+this.color;
        context.lineWidth = this.width;
        context.stroke( );
        console.log(this.color);
    }
}

class Text extends Shape {
    constructor(text, fontSize, font) {
        super();
        this.text = text;
        this.fontSize = fontSize;
        this.font = font;
    }
}