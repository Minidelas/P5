const distx = 25;
const disty = 25;
const width = 400;
const height = 400;
var rows = Math.round(height/disty);
var columns = Math.round(width/distx);

var g;

var posx = 0;
var posy = 0;

class Grid {
  constructor(width, height, distx, disty) {
    this.columnas = columns;
    this.filas = rows;
    this.cuadricula = new Array();
    this.posxAct = 0;
    this.posyAct = 0;
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

  availMove() {
    var result = false;
    try {
      if (g.posyAct >= 0
        && g.cuadricula[g.posxAct][g.posyAct - 1]
        && !g.cuadricula[g.posxAct][g.posyAct - 1].isTouched()) {
          result = true;
      }
    } catch (e) {

    }

    try {
      if (g.posyAct <= rows - 1
        && g.cuadricula[g.posxAct][g.posyAct + 1]
        && !g.cuadricula[g.posxAct][g.posyAct + 1].isTouched()) {
          result = true;
      }
    } catch (e) {

    }

    try {
      if (g.posxAct >= 0
        && g.cuadricula[g.posxAct - 1][g.posyAct]
        && !g.cuadricula[g.posxAct - 1][g.posyAct].isTouched()) {
          result = true;
      }
    } catch (e) {

    }

    try {
      if (g.posxAct <= columns - 1
        && g.cuadricula[g.posxAct + 1][g.posyAct]
        && !g.cuadricula[g.posxAct + 1][g.posyAct].isTouched()) {
          result = true;
      }
    } catch (e) {

    }
    return result;
  }

  mazeIt() {
    var moves = ['u', 'd', 'r', 'l'];
    if(!this.everyOneTouched()) {
      if (this.availMove()) {
        move(moves[Math.floor(random(4))], this);
      } else {
        this.cuadricula[this.posxAct][this.posyAct].drawBack();
        var lm = this.cuadricula[this.posxAct][this.posyAct].lastMove();
        this.posxAct = lm.x;
        this.posyAct = lm.y;
        this.cuadricula[this.posxAct][this.posyAct].drawCurrent();
      }
    } else {
      this.cuadricula[this.posxAct][this.posyAct].drawBack();
      this.cuadricula[0][0].join('l');
      this.cuadricula[this.cuadricula.length-1][this.cuadricula[this.cuadricula.length-1].length-1].join('r');
      noLoop();
    }
  }

}

class Cuadrado {
  constructor(x, y, distx, disty) {
    this.x = x;
    this.y = y;
    this.distx = distx;
    this.disty = disty;
    this.touched = false;
    this.lastIndex = {
      x: null,
      y: null
    };
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

  setLastMove(x,y) {
    this.lastIndex.x = x;
    this.lastIndex.y = y;
  }

  lastMove() {
    return this.lastIndex;
  }

  dibujar() {
    stroke(0);
    line(this.x,            this.y,            this.x+this.distx, this.y);            // ARRIBA
    line(this.x+this.distx, this.y,            this.x+this.distx, this.y+this.disty); // DERECHA
    line(this.x+this.distx, this.y+this.disty, this.x,            this.y+this.disty); // ABAJO
    line(this.x,            this.y+this.disty, this.x,            this.y);            // IZQUIERDA
  }

  join(direction) {
    stroke(color('#75A0C7'));
    fill(color('#75A0C7'));
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
      noStroke();
      fill(color('#75A0C7'));
      rect(
        this.x + 1,
        this.y + 1,
        this.distx - 1,
        this.disty - 1
      );
    }
  }

  drawCurrent(){
    noStroke();
    fill(color('#1C5B93'));
    rect(
      this.x + 1,
      this.y + 1,
      this.distx - 1,
      this.disty - 1
    );
  }

  drawBack() {
    noStroke();
    fill(color('#75A0C7'));
    rect(
      this.x + 1,
      this.y + 1,
      this.distx - 1,
      this.disty - 1
    );
  }
}

function move(dir, g) {
  var validMove = false;
  var move = {
    x: g.posxAct,
    y: g.posyAct
  };
  switch (dir) {
    case 'u':
    try {
      if (g.posyAct > 0
        && g.cuadricula[g.posxAct][g.posyAct - 1]
        && !g.cuadricula[g.posxAct][g.posyAct - 1].isTouched()) {
          g.cuadricula[g.posxAct][g.posyAct].touch();
          g.cuadricula[g.posxAct][g.posyAct].join(dir);
          g.posyAct--;
          g.cuadricula[g.posxAct][g.posyAct].join('d');
          validMove = true;
        }
    } catch (e) {
    }
    break;

    case 'd':
    try {
      if (g.posyAct < rows - 1
        && g.cuadricula[g.posxAct][g.posyAct + 1]
        && !g.cuadricula[g.posxAct][g.posyAct + 1].isTouched()) {
          g.cuadricula[g.posxAct][g.posyAct].touch();
          g.cuadricula[g.posxAct][g.posyAct].join(dir);
          g.posyAct++;
          g.cuadricula[g.posxAct][g.posyAct].join('u');
          validMove = true;
      }
    } catch (e) {
    }
    break;

    case 'l':
    try {
      if (g.posxAct > 0
        && g.cuadricula[g.posxAct - 1][g.posyAct]
        && !g.cuadricula[g.posxAct - 1][g.posyAct].isTouched()) {
          g.cuadricula[g.posxAct][g.posyAct].touch();
          g.cuadricula[g.posxAct][g.posyAct].join(dir);
          g.posxAct--;
          g.cuadricula[g.posxAct][g.posyAct].join('r');
          validMove = true;
        }
    } catch (e) {
    }
    break;

    case 'r':
    try {
      if (g.posxAct < columns - 1
        && g.cuadricula[g.posxAct + 1][g.posyAct]
        && !g.cuadricula[g.posxAct + 1][g.posyAct].isTouched()) {
          g.cuadricula[g.posxAct][g.posyAct].touch();
          g.cuadricula[g.posxAct][g.posyAct].join(dir);
          g.posxAct++;
          g.cuadricula[g.posxAct][g.posyAct].join('l');
          validMove = true;
        }
    } catch (e) {
    }
    break;

  }

  if (validMove) {
    g.cuadricula[g.posxAct][g.posyAct].drawCurrent();
    g.cuadricula[g.posxAct][g.posyAct].touch();
    g.cuadricula[g.posxAct][g.posyAct].setLastMove(move.x, move.y);
  }

  return validMove;
}

function setup() {
  createCanvas(width + 1, height + 1);
  background(255);
  g = new Grid(width, height, distx, disty);
  g.dibujar();
}

function draw() {
  g.mazeIt();
}
