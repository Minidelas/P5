var distx = 40;
var disty = 40;
var width = 400;
var height = 400;
var g;
var c;

var posx = 0;
var posy = 0;

class Grid {
  constructor(width, height, distx, disty) {
    this.columnas = width/distx;
    this.filas = height/disty;
    this.cuadricula = new Array();
    for (var i = 0; i < this.columnas; i++) {
      this.cuadricula[i] = new Array();
      for (var j = 0; j < this.filas; j++) {
        this.cuadricula[i][j] = new Cuadrado(i*distx, j*disty, distx, disty);
      }
    }
  }

  dibujar() {
    for (var i = 0; i < this.columnas; i++) {
      for (var j = 0; j < this.filas; j++) {
        this.cuadricula[i][j].dibujar();
      }
    }
  }

  mazeIt() {
    var moves = ['u', 'd', 'r', 'l'];
    while (!everyOneTouched()) {

    }
  }

  everyOneTouched() {
    for (var i = 0; i < this.cuadricula.length; i++) {
      for (var j = 0; j < this.cuadricula[i].length; j++) {
        if(!this.cuadricula[i][j].isTouched()){
          return false;
        }
      }
    }
    return true;
  }
}

class Cuadrado {
  constructor(x, y, distx, disty) {
    this.x = x;
    this.y = y;
    this.distx = distx;
    this.disty = disty;
    this.touched = false;
    this.lastMove = null;
  }

  posX() {
    return this.x;
  }

  posY() {
    return this.y;
  }

  touch() {
    this.touched = true;
  }

  isTouched() {
    return this.touched;
  }

  dibujar() {
    stroke(0);
    line(this.x,            this.y,            this.x+this.distx, this.y);            // ARRIBA
    line(this.x+this.distx, this.y,            this.x+this.distx, this.y+this.disty); // DERECHA
    line(this.x+this.distx, this.y+this.disty, this.x,            this.y+this.disty); // ABAJO
    line(this.x,            this.y+this.disty, this.x,            this.y);            // IZQUIERDA
  }

  join(direction) {
    stroke(255);
    switch (direction) {
      case 'u':
        line(this.x,            this.y,            this.x+this.distx, this.y);
      break;
      case 'd':
        line(this.x+this.distx, this.y+this.disty, this.x,            this.y+this.disty);
      break;
      case 'l':
        line(this.x,            this.y+this.disty, this.x,            this.y);
      break;
      case 'r':
        line(this.x+this.distx, this.y,            this.x+this.distx, this.y+this.disty);
      break;
    }
    if (this.touched) {
      fill(color(0, 0, 255));
      stroke(0);
      rect(
        this.x + 1,
        this.y + 1,
        this.distx - 2,
        this.disty - 2
      );
    }
  }
}

function move(dir) {
  switch (dir) {
    case 'u':
    if (posy > 0) {
      c.touch();
      c.join(dir);
      posy--;
      c = g.cuadricula[posx][posy];
      c.join('d');
    }
    break;
    case 'd':
    if (posy < 10) {
      c.touch();
      c.join(dir);
      posy++;
      c = g.cuadricula[posx][posy];
      c.join('u');
    }
    break;
    case 'l':
    if (posx > 0) {
      c.touch();
      c.join(dir);
      posx--;
      c = g.cuadricula[posx][posy];
      c.join('r');
    }
    break;
    case 'r':
    if (posx < 10) {
      c.touch();
      c.join(dir);
      posx++;
      c = g.cuadricula[posx][posy];
      c.join('l');
    }
    break;
  }

}

function setup() {
  createCanvas(401, 401);
  // translate(40, 40);
  background(255);
  g = new Grid(width, height, distx, disty);
  g.dibujar();
  c = g.cuadricula[posx][posy];
}

function draw() {

}
