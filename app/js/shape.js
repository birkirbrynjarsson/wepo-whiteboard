class Shape {
    constructor(startX, startY, endX, endY, color, lineWidth) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.color = color;
        this.lineWidth = lineWidth;
    }
    
    endPoints(x, y) {
        this.endX = x;
        this.endY = y;
    }

    draw(context, mouseIsDown) {
        // nana
    }

    moveTo(x, y) {
        var xDiff = x - this.startX;
        var yDiff = y - this.startY;
        this.startX += xDiff;
        this.endX += xDiff;
        this.startY += yDiff;
        this.endY += yDiff;
    }

    isWithin(x, y){
        var lX = this.endX > this.startX ? this.startX : this.endX;
        var hX = this.endX > this.startX ? this.endX : this.startX;
        var lY = this.endY > this.startY ? this.startY : this.endY;
        var hY = this.endY > this.startY ? this.endY : this.startY;
        if(lX <= x && x <= hX && lY <= y && y <= hY){
            return true;
        }
        return false;
    }
}

class Pen extends Shape {
    constructor(startX, startY, color, lineWidth, drawing) {
        super(startX, startY, undefined, undefined, color, lineWidth);
        this.points = new Array();
        this.points.push([startX, startY]);
        this.i = 0;
        this.drawing = drawing; // Boolean, are we painters or are we dancers
    }

    endPoints(x, y) {
        this.points.push([x, y]);
    }

    isWithin(x, y){
        var lX = this.points[0][0];
        var hX = this.points[0][0];
        var lY = this.points[0][1];
        var hY = this.points[0][1];

        for(var j = 0; j < this.points.length; j++){
            lX = this.points[j][0] < lX ? this.points[j][0] : lX;
            hX = this.points[j][0] > hX ? this.points[j][0] : hX;
            lY = this.points[j][0] < lY ? this.points[j][0] : lY;
            hY = this.points[j][0] > hY ? this.points[j][0] : hY;
        }

        if(lX <= x && x <= hX && lY <= y && y <= hY){
            return true;
        }
        return false;
    }

    moveTo(x,y){
        var xDiff = x - this.points[0][0];
        var yDiff = y - this.points[0][1];
        for(var j = 0; j < this.points.length; j++){
            this.points[j][0] += xDiff;
            this.points[j][1] += yDiff;
        }
    }

    draw(context, mouseIsDown) {
        context.strokeStyle = '#' + this.color;
        context.lineJoin = 'round';
        context.lineWidth = this.lineWidth;
        if (!mouseIsDown) {
            this.i = 0;
        }
        for (; this.i < this.points.length; this.i++) {
            context.beginPath();
            if (this.points[this.i] && this.i) {
                context.moveTo(this.points[this.i - 1][0], this.points[this.i - 1][1]); // Move back 1 point
            } else {
                context.moveTo(this.points[this.i][0], this.points[this.i][1]); // First point
            }
            context.lineTo(this.points[this.i][0], this.points[this.i][1]);
            context.closePath();
            context.stroke();
        }
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
        context.lineWidth = this.lineWidth;
        context.strokeStyle = '#' + this.color;
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
        this.pi2 = Math.PI * 2 - this.step;
    }

    endPoints(x, y) {
        super.endPoints(x, y);
        this.radiusX = (this.endX - this.startX) * 0.5;
        this.radiusY = (this.endY - this.startY) * 0.5;
        this.centerX = this.startX + this.radiusX;
        this.centerY = this.startY + this.radiusY;
        this.step = 0.01;
        this.pi2 = Math.PI * 2 - this.step;
    }

    moveTo(x, y){
        var xDiff = x - this.startX;
        var yDiff = y - this.startY;
        this.startX += xDiff;
        this.endX += xDiff;
        this.startY += yDiff;
        this.endY += yDiff;
        this.endPoints(this.endX, this.endY);
    }

    draw(context) {
        context.beginPath();
        context.moveTo(this.centerX + this.radiusX * Math.cos(0),
            this.centerY + this.radiusY * Math.sin(0));
        for (var a = this.step; a < this.pi2; a += this.step) {
            context.lineTo(this.centerX + this.radiusX * Math.cos(a),
                this.centerY + this.radiusY * Math.sin(a));
        }
        context.closePath();
        context.lineWidth = this.lineWidth;
        context.strokeStyle = "#" + this.color;
        context.stroke();
    }
}

class Text extends Shape {
    constructor(startX, startY, color, font, fontSize, text) {
        super(startX, startY, startX, startY, color, lineWidth);
        this.text = text;
        this.fontSize = fontSize;
        this.font = font;
    }

    isWithin(x,y){
        if((this.startX - 10) < x && x < (this.startX + this.text.length*2)){
            if((this.startY - 10) < y && y < (this.startY + this.fontSize)){
                return true;
            } 
        }
        return false;
    }

    draw(context) {
        context.font = this.fontSize + "px " + this.font;
        context.fillStyle = '#' + this.color;
        context.fillText(this.text, this.startX, this.startY);
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
        context.strokeStyle = "#" + this.color;
        context.stroke();
    }
}