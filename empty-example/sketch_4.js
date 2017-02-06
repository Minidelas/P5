const distx = 5;
const disty = 5;
const width = 800;
const height = 800;
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
    this.posxAct = Math.floor(random(this.filas));
    this.posyAct = Math.floor(random(this.columnas));
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

}

class Runner {
  constructor (grid, color) {
    this.grid = grid;
    this.color = color;
    this.posxAct = Math.floor(random(rows));
    this.posyAct = Math.floor(random(columns));
  }

  mazeIt() {
    var moves = ['u', 'd', 'r', 'l'];
    if(!this.grid.everyOneTouched()) {
      if (this.availMove()) {
        this.move(moves[Math.floor(random(4))], this.grid);
      } else {
        // this.grid.cuadricula[this.posxAct][this.posyAct].drawCustom(this.color);
        try {
          var lm = this.grid.cuadricula[this.posxAct][this.posyAct].lastMove();
          this.posxAct = lm.x;
          this.posyAct = lm.y;
        } catch (e) {}
        // this.grid.cuadricula[this.posxAct][this.posyAct].drawCurrent();
      }
    } else {
      // this.grid.cuadricula[this.posxAct][this.posyAct].drawCustom(this.color);
      // this.grid.cuadricula[0][0].join('l');
      // this.grid.cuadricula[0][0].drawCustom('#F93F3F');
      // this.grid.cuadricula[this.grid.cuadricula.length-1][this.grid.cuadricula[this.grid.cuadricula.length-1].length-1].join('r');
      // this.grid.cuadricula[this.grid.cuadricula.length-1][this.grid.cuadricula[this.grid.cuadricula.length-1].length-1].drawCustom('#8ADF39');
      noLoop();
    }
  }

  availMove() {
    var result = false;
    try {
      if (this.posyAct >= 0
        && this.grid.cuadricula[this.posxAct][this.posyAct - 1]
        && !this.grid.cuadricula[this.posxAct][this.posyAct - 1].isTouched()) {
          result = true;
      }
    } catch (e) {

    }

    try {
      if (this.posyAct <= rows - 1
        && this.grid.cuadricula[this.posxAct][this.posyAct + 1]
        && !this.grid.cuadricula[this.posxAct][this.posyAct + 1].isTouched()) {
          result = true;
      }
    } catch (e) {

    }

    try {
      if (this.posxAct >= 0
        && this.grid.cuadricula[this.posxAct - 1][this.posyAct]
        && !this.grid.cuadricula[this.posxAct - 1][this.posyAct].isTouched()) {
          result = true;
      }
    } catch (e) {

    }

    try {
      if (this.posxAct <= columns - 1
        && this.grid.cuadricula[this.posxAct + 1][this.posyAct]
        && !this.grid.cuadricula[this.posxAct + 1][this.posyAct].isTouched()) {
          result = true;
      }
    } catch (e) {

    }
    return result;
  }

  move(dir) {
    var validMove = false;
    var move = {
      x: this.posxAct,
      y: this.posyAct
    };
    switch (dir) {
      case 'u':
      try {
        if (this.posyAct > 0
          && this.grid.cuadricula[this.posxAct][this.posyAct - 1]
          && !this.grid.cuadricula[this.posxAct][this.posyAct - 1].isTouched()) {
            this.grid.cuadricula[this.posxAct][this.posyAct].touch();
            this.grid.cuadricula[this.posxAct][this.posyAct].join(dir, this.color);
            this.posyAct--;
            this.grid.cuadricula[this.posxAct][this.posyAct].join('d', this.color);
            validMove = true;
          }
      } catch (e) {
      }
      break;

      case 'd':
      try {
        if (this.posyAct < rows - 1
          && this.grid.cuadricula[this.posxAct][this.posyAct + 1]
          && !this.grid.cuadricula[this.posxAct][this.posyAct + 1].isTouched()) {
            this.grid.cuadricula[this.posxAct][this.posyAct].touch();
            this.grid.cuadricula[this.posxAct][this.posyAct].join(dir, this.color);
            this.posyAct++;
            this.grid.cuadricula[this.posxAct][this.posyAct].join('u', this.color);
            validMove = true;
        }
      } catch (e) {
      }
      break;

      case 'l':
      try {
        if (this.posxAct > 0
          && this.grid.cuadricula[this.posxAct - 1][this.posyAct]
          && !this.grid.cuadricula[this.posxAct - 1][this.posyAct].isTouched()) {
            this.grid.cuadricula[this.posxAct][this.posyAct].touch();
            this.grid.cuadricula[this.posxAct][this.posyAct].join(dir, this.color);
            this.posxAct--;
            this.grid.cuadricula[this.posxAct][this.posyAct].join('r', this.color);
            validMove = true;
          }
      } catch (e) {
      }
      break;

      case 'r':
      try {
        if (this.posxAct < columns - 1
          && this.grid.cuadricula[this.posxAct + 1][this.posyAct]
          && !this.grid.cuadricula[this.posxAct + 1][this.posyAct].isTouched()) {
            this.grid.cuadricula[this.posxAct][this.posyAct].touch();
            this.grid.cuadricula[this.posxAct][this.posyAct].join(dir, this.color);
            this.posxAct++;
            this.grid.cuadricula[this.posxAct][this.posyAct].join('l', this.color);
            validMove = true;
          }
      } catch (e) {
      }
      break;

    }

    if (validMove) {
      this.grid.cuadricula[this.posxAct][this.posyAct].drawCustom(this.color);
      this.grid.cuadricula[this.posxAct][this.posyAct].touch();
      this.grid.cuadricula[this.posxAct][this.posyAct].setLastMove(move.x, move.y);
    }

    return validMove;
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

  join(direction, colorAux) {
    stroke(color(colorAux));
    fill(color(colorAux));
    switch (direction) {
      case 'u':
        line(this.x+1,            this.y,              this.x+this.distx-1, this.y              );
      break;
      case 'd':
        line(this.x+this.distx-1, this.y+this.disty,   this.x+1,            this.y+this.disty   );
      break;
      case 'l':
        line(this.x,              this.y+this.disty-1, this.x,              this.y+1            );
      break;
      case 'r':
        line(this.x+this.distx,   this.y+1,            this.x+this.distx,   this.y+this.disty-1 );
      break;
    }
    if (this.touched) {
      noStroke();
      fill(color(colorAux));
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

  drawCustom(hex) {
    noStroke();
    fill(color(hex));
    rect(
      this.x + 1,
      this.y + 1,
      this.distx - 1,
      this.disty - 1
    );
  }
}

function setup() {
  createCanvas(width + 1, height + 1);
  background(255);
  g = new Grid(width, height, distx, disty);
  g.dibujar();

  r1 = new Runner(g, '#F93F3F');
  r2 = new Runner(g, '#8ADF39');
  r3 = new Runner(g, 'blue');
  r4 = new Runner(g, 'black');
}

function draw() {
  for (var i = 0; i < 50; i++) {
    r1.mazeIt();
    r2.mazeIt();
    r3.mazeIt();
    r4.mazeIt();
  }
}
