class Shape {
    constructor(startX, startY, endX, endY, color, width) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.color = color;
        this.width = width;
    }
/*    doStuff() {
        //
    }*/
}

class Rectangle extends Shape {
    constructor() {
        super();
    }
}

class Circle extends Shape {
    constructor() {
        super();
    }
/*    doStuff() {
        super.doStuff();
    }*/
}

class Text extends Shape {
    constructor(text, fontSize, font) {
        super();
        this.text = text;
        this.fontSize = fontSize;
        this.font = font;
    }
}