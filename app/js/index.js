class Shape {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    doStuff() {
        //
    }
}

class Rectangle extends Shape {
    constructor() {
        super();
    }
    doStuff() {
        super.doStuff();
    }
}

canvasObj = document.getElementById('myCanvas');

$('myCanvas').on('mousedown', function() {
    shape = undefined;
    if (nextObject === 'Circle') {
        // TODO: create an instance of circle
    } else if (nextObject === 'Rectangle') {
        // TODO
    }
});