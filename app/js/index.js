var canvas, dummyCanvas, context, dummyContext, toolbar, layers;
var shape;
var mouseIsDown = false;

function init(){
    // Initialize Canvas
    dummyCanvas = document.getElementById('dummyCanvas');
    dummyContext = dummyCanvas.getContext('2d');
    dummyCanvas.height = screen.height;
    dummyCanvas.width = screen.width;
    dummyCanvas.style.cursor = 'crosshair';

    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
    canvas.style.cursor = 'crosshair';
    canvas.width = screen.width;
    canvas.height = screen.height;
    
    layers = new Array();

    // Initialize Toolbar
    loadToolbar();

    // RangeSlider
    var rangeSlider = function(){
        var slider = $('.range-slider'),
        range = $('.range-slider__range'),
        value = $('.range-slider__value');
        slider.each(function(){
            value.each(function(){
                var value = $(this).prev().attr('value');
                $(this).html(value);
            });
            range.on('input', function(){
                $(this).next(value).html(this.value);
            });
        });
    };
    rangeSlider();
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function loadToolbar() {
    toolbar.shape = $('input[name="shape"]:checked').val();
    toolbar.color = $('.jscolor').val();
    toolbar.font = $('#fontP').val();
    toolbar.fontSize = $('#fontS').val();
    toolbar.lineWidth = $('#lineWidth').val();
}

function mouseDown(event){
    mouseIsDown = true;
    loadToolbar();
    var pos = getMousePos(dummyCanvas, event);
    
    console.log(toolbar);
    if(toolbar.shape === 'pen') {
        shape = new Pen(pos.x, pos.y, toolbar.color);
    }
    else if(toolbar.shape === 'rectangle') {
        shape = new Rectangle(pos.x, pos.y, pos.x, pos.y, toolbar.color, toolbar.lineWidth);
    }
    else if(toolbar.shape === 'line') {
        shape = new Line();
    }
    else if(toolbar.shape === 'circle') {
        shape = new Circle(pos.x, pos.y, toolbar.color, toolbar.lineWidth);
    }
    else if(toolbar.shape === 'text') {

    }
    // dummyContext.clearRect(0, 0, canvas.width, canvas.height);
    console.log(shape);
    shape.draw(dummyContext);
}

function mouseMove(event){
    if (mouseIsDown) {
        var pos = getMousePos(dummyCanvas, event);
        shape.endPoints(pos.x, pos.y);
        dummyContext.clearRect(0, 0, dummyCanvas.width, dummyCanvas.height);
        shape.draw(dummyContext);
    }
}

function mouseUp(event){
    if (mouseIsDown) {
        mouseIsDown = false;
        var pos = getMousePos(canvas, event);
        shape.endPoints(pos.x, pos.y);
        dummyContext.clearRect(0, 0, canvas.width, canvas.height);
        shape.draw(context);
        
    }
}

$(document).ready(function(){

    init();

    // Listeners
    dummyCanvas.addEventListener('mousedown', mouseDown);
    dummyCanvas.addEventListener('mousemove', mouseMove);
    dummyCanvas.addEventListener('mouseup', mouseUp);


    $('#toolbar').click(function(){
        loadToolbar();
    });

    $('#myCanvas').mousedown(function(e){

        var x = e.pageX;
        var y = e.pageY;

        var shape;
        
        if(settings.nextShape === 'pen') {
            shape = new Pen(x, y, settings.nextColor, settings.thickness);
        }
        else if(settings.nextShape === 'rectangle') {
            shape = new Rectangle(x, y, settings.nextColor, settings.thickness);
        }
        else if(settings.nextShape === 'line') {
            shape = new Line()
        }
        else if(settings.nextShape === 'circle') {
            shape = new Circle(x, y, settings.nextColor, settings.thickness);
        }
        else if(settings.nextShape === 'text') {

        }


        shape.draw(ctx);
        // $('#myCanvas').mousemove(function(e){
        //     shape.endPoints(e.pageX, e.pageY);

        // });
        
        

        // if(settings.nextShape === 'pen'){

        //     var mouse = {x: 0, y: 0};
	    //     var last_mouse = {x: 0, y: 0};
	
        //     /* Mouse Capturing Work */
        //     settings.canvas.addEventListener('mousemove', function(e) {
        //         last_mouse.x = mouse.x;
        //         last_mouse.y = mouse.y;
                
        //         mouse.x = e.pageX - this.offsetLeft;
        //         mouse.y = e.pageY - this.offsetTop;
        //     }, false);
	
	
        //     /* Drawing on Paint App */
        //     ctx.lineWidth = settings.thickness;
        //     ctx.lineJoin = 'round';
        //     ctx.lineCap = 'round';
        //     ctx.strokeStyle = '#'+settings.color;
        //     settings.canvas.style.cursor = "crosshair";
            
        //     settings.canvas.addEventListener('mousedown', function(e) {
        //         settings.canvas.addEventListener('mousemove', onPaint, false);
        //     }, false);
            
        //     settings.canvas.addEventListener('mouseup', function() {
        //         settings.canvas.removeEventListener('mousemove', onPaint, false);
        //     }, false);
            
        //     var onPaint = function() {
        //         ctx.beginPath();
        //         ctx.moveTo(last_mouse.x, last_mouse.y);
        //         ctx.lineTo(mouse.x, mouse.y);
        //         ctx.closePath();
        //         ctx.stroke();
        //     };     
        // }
        


    });

    $('#myCanvas').mouseup(function(e){
        var x = e.pageX;
        var y = e.pageY;
        
        
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

     /*   var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        var newColor = $('.jscolor').val();
        console.log('X: ' + x + ',' + 'Y: ' + y);
        

        context.fillStyle = '#'+newColor;
        context.fillRect(x - 10, y - 10, 20, 20);*/
        /*context.clearRect(0, 0, 1280, 960);*/
