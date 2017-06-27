/**
 * 
 */

  
  function draw() {
  var canvas = document.getElementById('clock');
  
  if (canvas.getContext) {
    var c2d=canvas.getContext('2d');
    c2d.clearRect(0,0,460,460);
    c2d.fillStyle="#000000"; //color fill for hour text
    
    //Define gradients for 3D / shadow effect
    var grad1=c2d.createLinearGradient(0,0,300,300);
    grad1.addColorStop(0,"#D83040");
    grad1.addColorStop(1,"#801020");
    var grad2=c2d.createLinearGradient(0,0,300,300);
    grad2.addColorStop(0,"#801020");
    grad2.addColorStop(1,"#D83040");
    //*/
    c2d.font="lighter 20px Arial";
    c2d.textBaseline="middle";
    c2d.textAlign="center";
    c2d.lineWidth=0.5;
    c2d.save();
        

    ///*Outer bezel
    //c2d.strokeStyle=grad1;
    c2d.lineWidth=1;
    c2d.beginPath();
    
    var default_bezel_position = 30
    var bezel_position = $("#bezel_position_slider").slider("value");
    
    
    c2d.arc(160,160,default_bezel_position + bezel_position,0,Math.PI*2,true);
    //c2d.shadowOffsetX=4;
    //c2d.shadowOffsetY=4;
    //c2d.shadowColor="rgba(0,0,0,0.6)";
    //c2d.shadowBlur=6;
    c2d.stroke();//*/
    c2d.fillStyle = "white"
    c2d.fill()
    
    ///*Inner bezel
    c2d.fillStyle = "#000"
    c2d.restore();
    //c2d.strokeStyle=grad2;
    c2d.lineWidth=1;
    c2d.beginPath();
    var inner_bezel_position = $("#inner_bezel_position_slider").slider("value");

    c2d.arc(160,160,default_bezel_position + inner_bezel_position,0,Math.PI*2,true);
    c2d.stroke();
    
    var hours_colour = $("#font_colour").val();
    
    
    c2d.fillStyle= hours_colour; //color fill for hour text
    c2d.strokeStyle="#000";//*/
    
    //
    c2d.save();
    c2d.translate(160,160);//*/
    
     
    //Markings/Numerals
    for (i=1;i<=60;i++) {
    
      ang=Math.PI/30*i;
      sang=Math.sin(ang);
      cang=Math.cos(ang);
      //If modulus of divide by 5 is zero then draw an hour marker/numeral
      if (i % 5 === 0) {
     
       var hour_tick_thickness = $("#hour_tick_thickness_slider").slider("value");
       if (hour_tick_thickness == 0){
       }else{
         //console.log(tickLength);
          c2d.lineWidth = hour_tick_thickness; //hour ticks
          
          var distance_from_centre = $("#hour_tick_position_slider").slider("value");
          var length = distance_from_centre + $("#hour_tick_length_slider").slider("value");
          sx=sang * distance_from_centre;
          sy=cang * -distance_from_centre;
          ex=sang * length;
          ey=cang * -length;
          
          c2d.beginPath();
          c2d.moveTo(sx,sy);
          c2d.lineTo(ex,ey);
          c2d.stroke();
        }
        
        
        var hours_distance_from_centre = $("#hours_position_slider").slider("value");
        nx=sang * hours_distance_from_centre;//distance from centre
        ny=cang * -hours_distance_from_centre;//distance from centre
        
        //"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica
        
        //100 = light , 700 = bold
        var hours_fontsize = $("#hours_fontsize_slider").slider("value");
        var hours_fontweight = $("#hours_fontweight_slider").slider("value");
        var hours_font = $("#font-family").val();
        
        var hours_fontsize_text = hours_fontweight + " " + hours_fontsize + "px " + '"' + hours_font + '"';
        
        c2d.font = hours_fontsize_text
        c2d.fillText(i/5,nx,ny);
       
        //Else this is a minute marker
      } else {
      
        var minute_tick_thickness = $("#minute_tick_thickness_slider").slider("value");
        if (minute_tick_thickness == 0){
          //Don't draw
        }else{
          c2d.lineWidth= minute_tick_thickness ; //minute ticks
          
          var distance_from_centre = $("#minute_tick_position_slider").slider("value");
          var length = distance_from_centre + $("#minute_tick_length_slider").slider("value");
          sx=sang * distance_from_centre;
          sy=cang * -distance_from_centre;
          ex=sang * length;
          ey=cang * -length;
          c2d.beginPath();
          c2d.moveTo(sx,sy);
          c2d.lineTo(ex,ey);
          c2d.stroke();
     }
      }
      
    }
    //Fetch the current time
    var ampm="AM";
    var now=new Date();
    var t = now.toLocaleTimeString();
    var hrs=now.getHours();
    var min=now.getMinutes();
    var sec=now.getSeconds();
    c2d.strokeStyle="#000";
    
    //Draw AM/PM indicator
    if (hrs>=12) ampm="PM";
    //c2d.lineWidth=1;
    //c2d.strokeRect(21,-14,44,27);
    c2d.font='normal 20px "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica';
    c2d.fillText(ampm,43,0);
    
    c2d.lineWidth=6;
    c2d.save();
    
    
    //Draw clock pointers but this time rotate the canvas rather than
    //calculate x/y start/end positions.
    
    //Draw hour hand
    c2d.rotate(Math.PI/6*(hrs+(min/60)+(sec/3600)));
    c2d.beginPath();
    var hour_hand_thickness = $("#hour_hand_thickness_slider").slider("value");
    var hour_hand_length = $("#hour_hand_length_slider").slider("value");
    
    c2d.lineWidth=hour_hand_thickness;
    c2d.moveTo(0,2); //second param, sticky out back bit
    c2d.lineTo(0,-hour_hand_length); //hand length
    c2d.stroke();
    c2d.restore();
    c2d.save();
    
    //Draw minute hand
    c2d.rotate(Math.PI/30*(min+(sec/60)));
    c2d.beginPath();
    var minute_hand_thickness = $("#minute_hand_thickness_slider").slider("value");
    var minute_hand_length = $("#minute_hand_length_slider").slider("value");
    c2d.lineWidth=minute_hand_thickness;
    c2d.moveTo(0,2); //second param 
    
    c2d.lineTo(0,-minute_hand_length);//hand length
    c2d.stroke();
    c2d.restore();
    c2d.save();
    
    //Draw second hand
    c2d.rotate(Math.PI/30*sec);
    c2d.strokeStyle="#E33";
    c2d.beginPath();
    c2d.lineWidth=2;
    //c2d.lineCap="round";
    c2d.lineJoin="miter";
    c2d.miterLimit=2;
    c2d.moveTo(0,10); //sticky out back bit
    c2d.lineTo(0,-98);//hand length
    c2d.lineTo(0,-110);//hand length
    c2d.stroke();
    c2d.restore();
    
    //Additional restore to go back to state before translate
    //Alternative would be to simply reverse the original translate
    c2d.restore( );
    
    window.setInterval(function(){draw()},1000);
  }
}


  

    
 $(document).ready(function() {
	 
    loadFonts();
    
    //http://www.jqueryscript.net/text/Easy-Google-Web-Font-Selector-With-jQuery-Fontselect.html
     $('#font')
       .fontselect(	{
    	   lookahead: 200,
    	   api: '//fonts.googleapis.com/css?family='
    		 })
    .change(function(){
	    // replace + signs with spaces for css
	    var font = $(this).val().replace(/\+/g, ' ');
	    // split font into family and weight
	    font = font.split(':');
	    // set family on paragraphs
	    $('#font-family').css('font-family', font[0]).val(font[0]);
    
    	});

     $("#minute_hand_length_slider").slider({
  	  	step:1,
  	    range: "max",
  	    min: 0,
  	    max: 200,
  	    value: $('input.minute_hand_length').val(), 
  	    slide: function(event, ui) {
  	      $(".minute_hand_length").val(ui.value);
  	    }
  	  });
  	$(".minute_hand_length").val($("#minute_hand_length_slider").slider("value"));
  	
     $("#hour_hand_length_slider").slider({
 	  	step:1,
 	    range: "max",
 	    min: 0,
 	    max: 200,
 	    value: $('input.hour_hand_length').val(), 
 	    slide: function(event, ui) {
 	      $(".hour_hand_length").val(ui.value);
 	    }
 	  });
 	$(".hour_hand_length").val($("#hour_hand_length_slider").slider("value"));

	$("#hour_tick_thickness_slider").slider({
	  	step:1,
	    range: "max",
	    min: 0,
	    max: 20,
	    value: $('input.hour_tick_thickness').val(), 
	    slide: function(event, ui) {
	      $(".hour_tick_thickness").val(ui.value);
	    }
	  });
	$(".hour_tick_thickness").val($("#hour_tick_thickness_slider").slider("value"));
    
    $("#hour_tick_length_slider").slider({
	  	step:1,
	    range: "max",

	    min: 3,
	    max: 50,
	    value: $('input.hour_tick_length').val(), 
	    slide: function(event, ui) {
	      $(".hour_tick_length").val(ui.value);
	    }
	  });
	$(".hour_tick_length").val($("#hour_tick_length_slider").slider("value"));
    
    
    $("#hour_tick_position_slider").slider({
	  	step:1,
	    range: "max",
	    min: 50,
	    max: 250,
	    value: $('input.hour_tick_position').val(), 
	    slide: function(event, ui) {
	      $(".hour_tick_position").val(ui.value);
	    }
	  });
	$(".hour_tick_position").val($("#hour_tick_position_slider").slider("value"));
    
    /* minute TICKS */
     
    $("#minute_tick_length_slider").slider({
	  	step:1,
	    range: "max",
	    min: 1,
	    max: 50,
	    value: $('input.minute_tick_length').val(), 
	    slide: function(event, ui) {
	      $(".minute_tick_length").val(ui.value);
	    }
	  });
	$(".minute_tick_length").val($("#minute_tick_length_slider").slider("value"));
    
    $("#minute_tick_thickness_slider").slider({
	  	step:1,
	    range: "max",
	    min: 0,
	    max: 20,
	    value: $('input.minute_tick_thickness').val(), //подгрузка значения в слайдер при перезагрузке страницы
	    slide: function(event, ui) {
	      $(".minute_tick_thickness").val(ui.value);
	    }
	  });
	$("minute_tick_thickness").val($("#minute_tick_thickness_slider").slider("value"));
    
    
      $("#minute_tick_position_slider").slider({
	  	step:1,
	    range: "max",
	    min: 10,
	    max: 150,
	    value: $('input.minute_tick_position').val(), 
	    slide: function(event, ui) {
	      $(".minute_tick_position").val(ui.value);
	    }
	  });
	$(".minute_tick_position").val($("#minute_tick_position_slider").slider("value"));
    
	$("#minute_hand_thickness_slider").slider({
	  	step:1,
	    range: "max",
	    min: 0,
	    max: 100,
        value: $('input.minute_hand_thickness').val(), 
	    slide: function(event, ui) {
	      $(".minute_hand_thickness").val(ui.value);
	    }
	  }); 
	$(".minute_hand_thickness").val($("#minute_hand_thickness_slider").slider("value"));
	
    /* hours */
	
	$("#hour_hand_thickness_slider").slider({
	  	step:1,
	    range: "max",
	    min: 0,
	    max: 100,
        value: $('input.hour_hand_thickness').val(), 
	    slide: function(event, ui) {
	      $(".hour_hand_thickness").val(ui.value);
	    }
	  }); 
	$(".hour_hand_thickness").val($("#hour_hand_thickness_slider").slider("value"));
	
     $("#hours_fontsize_slider").slider({
	  	step:1,
	    range: "max",
	    min: 9,
	    max: 200,
        value: $('input.hours_fontsize').val(), 
	    slide: function(event, ui) {
	      $(".hours_fontsize").val(ui.value);
	    }
	  }); 
	$(".hours_fontsize").val($("#hours_fontsize_slider").slider("value"));
    
     $("#hours_fontweight_slider").slider({
	  	step:100,
	    range: "max",
	    min: 100,
	    max: 900,
        value: $('input.hours_fontweight').val(), 
	    slide: function(event, ui) {
	      $(".hours_fontweight").val(ui.value);
	    }
	  }); 
	$(".hours_fontweight").val($("#hours_fontweight_slider").slider("value"));
    
     $("#hours_position_slider").slider({
	  	step:1,
	    range: "max",
	    min: 10,
	    max: 250,
        value: $('input.hours_position').val(), 
	    slide: function(event, ui) {
	      $(".hours_position").val(ui.value);
	    }
	  }); 
	$(".hours_position").val($("#hours_position_slider").slider("value"));
    
    
    /* Bezels */
      $("#bezel_position_slider").slider({
	  	step:1,
	    range: "max",
	    min: 10,
	    max: 128,
	    value: $('input.bezel_position').val(), 
	    slide: function(event, ui) {
	      $(".bezel_position").val(ui.value);
	    }
	  });
	$(".bezel_position").val($("#bezel_position_slider").slider("value"));
    
     $("#inner_bezel_position_slider").slider({
	  	step:1,
	    range: "max",
	    min: 50,
	    max: 250,
	    value: $('input.inner_bezel_position').val(), 
	    slide: function(event, ui) {
	      $(".inner_bezel_position").val(ui.value);
	    }
	  });
	$(".inner_bezel_position").val($("#inner_bezel_position_slider").slider("value"));
    
    $("#font_colour").spectrum({
    color: "#ECC",
    showInput: true,
    className: "full-spectrum",
    showInitial: true,
    showPalette: true,
    showSelectionPalette: true,
    maxSelectionSize: 10,
    preferredFormat: "hex",
    localStorageKey: "spectrum.demo",
    move: function (color) {
        
    },
    show: function () {
    
    },
    beforeShow: function () {
    
    },
    hide: function () {
    
    },
    change: function() {
        //alert($(this).val());
    },
    palette: [
        ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
        "rgb(204, 204, 204)", "rgb(217, 217, 217)","rgb(255, 255, 255)"],
        ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
        "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"], 
        ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)", 
        "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)", 
        "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)", 
        "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)", 
        "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)", 
        "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
        "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
        "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
        "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)", 
        "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
    ]
});

    draw();

});