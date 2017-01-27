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
    constructor(startX, startY, color) {
        super(startX, startY, startX, startY, color);
    }
    


    doStuff() {
        super.doStuff();
    }

    draw(context) {
        context.strokeStyle = '#'+this.color;
        context.strokeRect(this.startX, this.startY, this.endX, this.endY);
    }
}

class Circle extends Shape {
    constructor(startX, startY, color) {
        super(startX, startY, startX, startY, color);
    }

    doStuff() {
        super.doStuff();
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