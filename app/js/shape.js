class Shape {
    constructor(startX, startY, endX, endY, col, width) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.col = col;
        this.width = width;
    }
/*    doStuff() {
        //
    }*/
}

class Pen extends Shape {
    constructor(startX, startY, color) {
        super(startX, startY, color);
    }

    doStuff() {
        super.doStuff();
    }

    draw(context) {

    }       
}

class Rectangle extends Shape {
    constructor(startX, startY, col, drawing) {
        super(startX, startY, col, drawing);
    }
    
    doStuff() {
        super.doStuff();
    }

    draw(context) {
        context.fillStyle = '#'+this.col;
        context.strokeRect(this.startX, this.startY, 50, 50);
        //console.log('x: ' + this.startX, 'y: ' + this.startY);
        console.log(this.col);
    }
}

class Circle extends Shape {
    constructor(startX, startY, color) {
        super(startX, startY, color);
    }

    doStuff() {
        super.doStuff();
    }

    draw(context) {
        context.beginPath( );
        context.arc( this.startX, this.startY, 70, 0, 2 * Math.PI, false );
        // check out the parameters here
        context.fillStyle = "#"+this.color;
        context.fill( );
        context.lineWidth = 5;
        context.strokeStyle = "black";
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