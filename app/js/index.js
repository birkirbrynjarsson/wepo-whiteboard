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
    undo = new Array();
    redo = new Array();

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

function undoAction(){
    if(undo.length > 0){
        redo.push(undo.pop());
        context.clearRect(0, 0, canvas.width, canvas.height);
        undo.forEach(function(x){
            x.draw(context, mouseIsDown);
        });
    }

}

function redoAction(){
    if(redo.length > 0){
        undo.push(redo.pop());
        context.clearRect(0, 0, canvas.width, canvas.height);  
        undo.forEach(function(x){
            x.draw(context, mouseIsDown);
        });
    }
}

function mouseDown(event){
    mouseIsDown = true;
    loadToolbar();
    var pos = getMousePos(dummyCanvas, event);

    if(toolbar.shape === 'pen') {
        shape = new Pen(pos.x, pos.y, toolbar.color, toolbar.lineWidth);
    }
    else if(toolbar.shape === 'rectangle') {
        shape = new Rectangle(pos.x, pos.y, pos.x, pos.y, toolbar.color, toolbar.lineWidth);
    }
    else if(toolbar.shape === 'line') {
        shape = new Line(pos.x, pos.y, pos.x, pos.y, toolbar.color, toolbar.lineWidth);
    }
    else if(toolbar.shape === 'circle') {
        shape = new Circle(pos.x, pos.y, pos.x, pos.y, toolbar.color, toolbar.lineWidth);
    }
    else if(toolbar.shape === 'text') {

    }
    // dummyContext.clearRect(0, 0, canvas.width, canvas.height);
    shape.draw(dummyContext, mouseIsDown);
}

function mouseMove(event){
    if (mouseIsDown) {
        var pos = getMousePos(dummyCanvas, event);
        shape.endPoints(pos.x, pos.y);
        if(toolbar.shape !== 'pen'){
            dummyContext.clearRect(0, 0, dummyCanvas.width, dummyCanvas.height);
        }
        shape.draw(dummyContext, mouseIsDown);
    }
}

function mouseUp(event){
    if (mouseIsDown) {
        mouseIsDown = false;
        var pos = getMousePos(canvas, event);
        shape.endPoints(pos.x, pos.y);
        dummyContext.clearRect(0, 0, canvas.width, canvas.height);
        shape.draw(context, mouseIsDown);
        undo.push(shape);
        redo = [];
        
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

    $('#undoBtn').click(function(){
        undoAction();
    });

    $('#redoBtn').click(function(){
        redoAction();
    });

});
