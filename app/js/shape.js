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
}

class Pen extends Shape {
    constructor(startX, startY, color) {
        super(startX, startY, color);
    }

    draw(context) {

    }       
}

class Rectangle extends Shape {
    constructor(startX, startY, endX, endY, color) {
        super(startX, startY, endX, endY, color);
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
        // context.rect(this.startX + this.offsetX, this.startY + this.offsetY, this.width, this.height);
        // context.fillStyle = this.color;
        // context.fill();
        // context.lineWidth = this.lineWidth;
        // context.strokeStyle = this.color;
        // context.stroke();
        // context.strokeStyle = '#'+this.color;
        context.strokeRect(this.startX + this.offsetX, this.startY + this.offsetY, this.width, this.height);
    }
}

class Circle extends Shape {
    constructor(startX, startY, color) {
        super(startX, startY, startX, startY, color);
    }

    draw(context) {
        context.beginPath( );
        context.arc( this.startX, this.startY, 70, 0, 2 * Math.PI, false );
        // check out the parameters here
        context.strokeStyle = "#"+this.color;
        context.lineWidth = 5;
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