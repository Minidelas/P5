class Cuadrado {
  constructor(x, y, distx, disty) {
    this.x = x;
    this.y = y;
    this.distx = distx;
    this.disty = disty;
    this.openU = false;
    this.openD = false;
    this.openR = false;
    this.openL = false;
    this.touched = false;
    this.visited = false;
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

  isOpenUp(){
    return this.openU;
  }

  isOpenDown(){
    return this.openD;
  }

  isOpenRight(){
    return this.openR;
  }

  isOpenLeft(){
    return this.openL;
  }

  touch() {
    this.touched = true;
  }

  isTouched() {
    return this.touched;
  }

  isVisited() {
    return this.visited;
  }

  setVisited(){
    this.visited = true;
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
        this.openU = true;
      break;
      case 'd':
        line(this.x+this.distx-1, this.y+this.disty,   this.x+1,            this.y+this.disty   );
        this.openD = true;
      break;
      case 'l':
        line(this.x,              this.y+this.disty-1, this.x,              this.y+1            );
        this.openL = true;
      break;
      case 'r':
        line(this.x+this.distx,   this.y+1,            this.x+this.distx,   this.y+this.disty-1 );
        this.openR = true;
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

  drawEllipse() {
    noStroke();
    fill(color('#75A0C7'));
    ellipse(
      this.x + Math.floor(this.distx/2),
      this.y + Math.floor(this.disty/2),
      this.distx - 5
    );
  }
}
