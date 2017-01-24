canvasObj = document.getElementById('myCanvas');

canvasObj.width = window.innerWidth;
canvasObj.height = window.innerHeight;

window.onresize = function() {
    var image = context.getImageData(0,0, canvas.width, canvas.height);
    canvasObj.width = window.innerWidth;
    canvasObj.height = window.innerHeight;
    context.putImageData(image, 0,0);
}

$(document).ready(function(){
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');

    $('#myCanvas').mousedown(function(e){
        
        var shape = $('input[name="shape"]:checked').val();
        var x = e.pageX;
        var y = e.pageY;
        var color = $('.jscolor').val();
        
        if(shape === 'pen'){
           	var mouse = {x: 0, y: 0};
	        var last_mouse = {x: 0, y: 0};
	
            /* Mouse Capturing Work */
            canvas.addEventListener('mousemove', function(e) {
                last_mouse.x = mouse.x;
                last_mouse.y = mouse.y;
                
                mouse.x = e.pageX - this.offsetLeft;
                mouse.y = e.pageY - this.offsetTop;
            }, false);
	
	
            /* Drawing on Paint App */
            ctx.lineWidth = 1;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#'+color;
            canvas.style.cursor = "crosshair";
            
            canvas.addEventListener('mousedown', function(e) {
                canvas.addEventListener('mousemove', onPaint, false);
            }, false);
            
            canvas.addEventListener('mouseup', function() {
                canvas.removeEventListener('mousemove', onPaint, false);
            }, false);
            
            var onPaint = function() {
                ctx.beginPath();
                ctx.moveTo(last_mouse.x, last_mouse.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.closePath();
                ctx.stroke();
            };
                
        }else if(shape === 'rectangle'){
           
        }else if(shape === 'circle'){

        }

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
