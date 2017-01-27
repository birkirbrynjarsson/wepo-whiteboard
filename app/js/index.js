var settings = {
    canvas: document.getElementById('myCanvas'),
    nextShape:  "pen",
    nextColor:  000000,
    nextFont:   'Arial',
    fontSize:   12,
    thickness:  1,
    startX:     0,
    startY:     0,
    endX:       0,
    endY:       0,
    isDrawing: false,
}


// settings.nextShape = $('input[name="shape"]:checked').val();
// settings.nextColor = $('.jscolor').val();

var ctx = settings.canvas.getContext('2d');
settings.canvas.style.cursor = "crosshair";
settings.canvas.width = screen.width;
settings.canvas.height = screen.height;


$(document).ready(function(){

      //thickness range Slider 
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

    
    $('#toolbar').mousedown(function(){
        settings.nextColor = $('.jscolor').val();
    });

    $('#myCanvas').mousedown(function(e){
        
        settings.nextShape = $('input[name="shape"]:checked').val();
        settings.nextColor = $('.jscolor').val();
        var color = settings.nextColor;
        console.log(settings.nextColor);
        var x = e.pageX;
        var y = e.pageY;
        
        if(settings.nextShape === 'pen') {
            shape = new Pen(x, y, settings.nextColor);
        }
        else if(settings.nextShape === 'rectangle') {
            shape = new Rectangle(x, y, color, settings.isDrawing);
        }
        else if(settings.nextShape === 'line') {
            shape = new Line()
        }
        else if(settings.nextShape === 'circle') {
            shape = new Circle(x, y, settings.nextColor);
        }
        else if(settings.nextShape === 'text') {

        }
        
        shape.draw(ctx);

        // if(settings.nextShape === 'pen'){
        //     x.draw();
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
        //     ctx.lineWidth = 1;
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
        // else if(shape === 'line') {    
                
        // }
        // else if(shape === 'circle') {

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
