class Grid {
  constructor(distx, disty, columns, rows) {
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

  clickSquare(i, j) {
    if (!this.cuadricula[i][j].isTouched()){
      this.cuadricula[i][j].touch();
      this.cuadricula[i][j].drawCustom('black');
    }
  }
}
