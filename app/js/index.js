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


//canvasObj = document.getElementById('myCanvas');

$(document).ready(function(){
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');

    $('#myCanvas').click(function(e){;
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        var newColor = $('.jscolor').val();
        console.log('X: ' + x + ',' + 'Y: ' + y);
        

        context.fillStyle = "#"+newColor;
        context.fillRect(x - 10, y - 10, 20, 20);
    });
    
});

// $('myCanvas').on('mousedown', function() {
//     shape = undefined;
//     if (nextObject === 'Circle') {
//         // TODO: create an instance of circle
//     } else if (nextObject === 'Rectangle') {
//         // TODO
//     }
// });
