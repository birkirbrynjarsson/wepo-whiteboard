class Shape {
    constructor(startX, startY, endX, endY, color, lineWidth) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.color = color;
        this.lineWidth = lineWidth;
    }
    endPoints(x, y){
        this.endX = x;
        this.endY = y;
    }
}

class Pen extends Shape {
    constructor(startX, startY, color, lineWidth) {
        super(startX, startY, startX, startY, color, lineWidth);
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
    constructor(startX, startY, endX, endY, color, lineWidth) {
        super(startX, startY, endX, endY, color, lineWidth);
        this.w = this.endX - this.startX;
        this.h = this.endY - this.startY;
        this.offsetX = (this.w < 0) ? this.w : 0;
        this.offsetY = (this.h < 0) ? this.h : 0;
        this.width = Math.abs(this.w);
        this.height = Math.abs(this.h);
    }

    endPoints(x, y) {
        super.endPoints(x, y);
        this.w = this.endX - this.startX;
        this.h = this.endY - this.startY;
        this.offsetX = (this.w < 0) ? this.w : 0;
        this.offsetY = (this.h < 0) ? this.h : 0;
        this.width = Math.abs(this.w);
        this.height = Math.abs(this.h);
    }
    
    draw(context) {              
        context.beginPath();
        
        // context.fillStyle = this.color;
        // context.fill();
        context.lineWidth = this.lineWidth;
        // context.strokeStyle = this.color;
        // context.stroke();
        context.strokeStyle = '#'+this.color;
        context.strokeRect(this.startX + this.offsetX, this.startY + this.offsetY, this.width, this.height);
    }
}

class Circle extends Shape {
    constructor(startX, startY, endX, endY, color, lineWidth) {
        super(startX, startY, endX, endY, color, lineWidth);
        this.radiusX = (this.endX - this.startX) * 0.5;
        this.radiusY = (this.endY - this.startY) * 0.5;
        this.centerX = this.startX + this.radiusX;
        this.centerY = this.startY + this.radiusY;
        this.step = 0.01;
        this.a = this.step;
        this.pi2 = Math.PI * 2 - this.step;
    }

    endPoints(x, y) {
        super.endPoints(x,y);
        this.radiusX = (this.endX - this.startX) * 0.5;
        this.radiusY = (this.endY - this.startY) * 0.5;
        this.centerX = this.startX + this.radiusX;
        this.centerY = this.startY + this.radiusY;
        this.step = 0.01;
        this.a = this.step;
        this.pi2 = Math.PI * 2 - this.step;
    }

    draw(context) {
        context.beginPath();
        context.moveTo(this.centerX + this.radiusX * Math.cos(0),
                       this.centerY + this.radiusY * Math.sin(0));
        for(; this.a < this.pi2; this.a += this.step) {
            context.lineTo(this.centerX + this.radiusX * Math.cos(this.a),
                           this.centerY + this.radiusY * Math.sin(this.a));
        }
        context.closePath();
        // context.lineWidth = this.lineWidth;
        context.strokeStyle = "#"+this.color;
        context.stroke();
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

class Line extends Shape {
    constructor(startX, startY, endX, endY, color, lineWidth) {
        super(startX, startY, endX, endY, color, lineWidth);
    }
    draw(context) {
        context.beginPath();
        context.moveTo(this.startX, this.startY);
        context.lineTo(this.endX, this.endY)
        context.lineWidth = this.lineWidth;
        context.strokeStyle = "#"+this.color;
        context.stroke(); 
    }
}