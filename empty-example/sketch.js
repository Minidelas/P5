var alto = 400;
var ancho = 400;

var x_const = alto * 0.25;
var y_const = alto * 0.75;
var l_const = ancho * 0.25;
var j_const = ancho * 0.75;

var a = l_const;
var b = x_const;

function setup() {
  createCanvas(ancho, alto);
}

function draw() {
  drawCircle(200, 200, 150, 3);
}

function radar() {
  background(0, 0, 0, 255);

  if (a === l_const && b >= x_const && b < y_const) {
    b++; b++; b++; b++;
  } else if (b === y_const && a >= l_const && a < j_const) {
    a++; a++; a++; a++;
  } else if (a === j_const && b <= y_const && b > x_const) {
    b--; b--; b--; b--;
  } else if (b === x_const && a <= j_const && a > l_const) {
    a--; a--; a--; a--;
  }

  stroke(255, 0, 0, 255);
  line(a, b, ancho * 0.5, alto * 0.5);
  // line(l, height*0.75, j, height * 0.25);

  fill(0, 255, 0, 0);
  stroke(0, 255, 0);
  rect(width*0.25, height*0.25, width*0.5, height*0.5);

  fill(0, 0, 0, 0);
  stroke(0, 255, 0);
  ellipse(width*0.5, height*0.5, width*0.5, height*0.5);
}

function drawCircle(x, y, radius, level) {
  var tt = 126 * level/4.0;
  fill(tt);
  ellipse(x, y, radius*2, radius*2);
  if(level > 1) {
    level = level - 1;
    drawCircle(x - radius/2, y - radius/2, radius/3, level);
    drawCircle(x - radius/2, y + radius/2, radius/3, level);
    drawCircle(x + radius/2, y - radius/2, radius/3, level);
    drawCircle(x + radius/2, y + radius/2, radius/3, level);
  }
}
