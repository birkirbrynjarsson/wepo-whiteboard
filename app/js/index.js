var canvas, dummyCanvas, context, dummyContext, toolbar, undo, redo;
var shape;
var selection = false;
var mouseIsDown = false;

function init() {
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

    undo = new Array();
    redo = new Array();

    // Initialize Toolbar
    loadToolbar();

    // RangeSlider
    var rangeSlider = function() {
        var slider = $('.range-slider'),
            range = $('.range-slider__range'),
            value = $('.range-slider__value');
        slider.each(function() {
            value.each(function() {
                var value = $(this).prev().attr('value');
                $(this).html(value);
            });
            range.on('input', function() {
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
    toolbar.text = $('#txt').val();

}

function undoAction() {
    if (undo.length > 0) {
        redo.push(undo.pop());
        context.clearRect(0, 0, canvas.width, canvas.height);
        undo.forEach(function(x) {
            x.draw(context, mouseIsDown);
        });
    }

}

function redoAction() {
    if (redo.length > 0) {
        undo.push(redo.pop());
        context.clearRect(0, 0, canvas.width, canvas.height);
        undo.forEach(function(x) {
            x.draw(context, mouseIsDown);
        });
    }
}

function reDraw(context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    undo.forEach(function(x) {
        x.draw(context, false);
    });
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    undo = [];
    redo = [];
}

function mouseDown(event) {
    mouseIsDown = true;
    loadToolbar();
    var pos = getMousePos(dummyCanvas, event);

    if (toolbar.shape === 'pen') {
        shape = new Pen(pos.x, pos.y, toolbar.color, toolbar.lineWidth);
    } else if (toolbar.shape === 'rectangle') {
        shape = new Rectangle(pos.x, pos.y, pos.x, pos.y, toolbar.color, toolbar.lineWidth);
    } else if (toolbar.shape === 'line') {
        shape = new Line(pos.x, pos.y, pos.x, pos.y, toolbar.color, toolbar.lineWidth);
    } else if (toolbar.shape === 'circle') {
        shape = new Circle(pos.x, pos.y, pos.x, pos.y, toolbar.color, toolbar.lineWidth);
    } else if (toolbar.shape === 'text') {
        shape = new Text(pos.x, pos.y, toolbar.color, toolbar.font, toolbar.fontSize, toolbar.text);
    } else if (toolbar.shape === 'select') {
        selection = true;
        shape = null;
        for (var i = undo.length - 1; i >= 0; i--) {
            console.log(undo[i]);
            if (undo[i].isWithin(pos.x, pos.y)) {
                shape = undo[i];
                undo.splice(i, 1);
                console.log(shape);
                reDraw(context);
                break;
            }
        }
    }
    if (shape !== null) {
        shape.draw(dummyContext, mouseIsDown);
    }
}

function mouseMove(event) {
    if (mouseIsDown && shape !== null) {
        var pos = getMousePos(dummyCanvas, event);
        if (selection) {
            shape.moveTo(pos.x, pos.y);
        } else {
            shape.endPoints(pos.x, pos.y);
        }
        if (toolbar.shape !== 'pen') {
            dummyContext.clearRect(0, 0, dummyCanvas.width, dummyCanvas.height);
        }
        shape.draw(dummyContext, mouseIsDown);
        if (selection) {
            shape.draw(dummyContext, false);
        }
    }
}

function mouseUp(event) {
    if (mouseIsDown && shape !== null) {
        mouseIsDown = false;
        var pos = getMousePos(canvas, event);
        if (selection) {
            shape.moveTo(pos.x, pos.y);
        } else {
            shape.endPoints(pos.x, pos.y);
        }
        dummyContext.clearRect(0, 0, canvas.width, canvas.height);
        shape.draw(context, mouseIsDown);
        undo.push(shape);
        redo = [];
        selection = false;
    }
}

$(document).ready(function() {
    init();
    // Listeners
    dummyCanvas.addEventListener('mousedown', mouseDown);
    dummyCanvas.addEventListener('mousemove', mouseMove);
    dummyCanvas.addEventListener('mouseup', mouseUp);

    $('#toolbar').click(function() {
        loadToolbar();
    });

    $('#undoBtn').click(function() {
        undoAction();
    });

    $('#redoBtn').click(function() {
        redoAction();
    });

    $('#clearBtn').click(function() {
        clearCanvas();
    });

    $('#defaultColors > button').click(function() {
        var newColor = $(this).attr('value');
        $('.jscolor').val(newColor);
        $('#colorPicker').css('background-color', '#' + newColor);
    });

    $('#saveBtn').click(function() {

    });
});