 (function draw() {
  var canvas = document.getElementById('clock');
  
  if (canvas.getContext) {
    var c2d=canvas.getContext('2d');
    c2d.clearRect(0,0,460,460);
    c2d.fillStyle="#000000"; //color fill for hour text
  }})