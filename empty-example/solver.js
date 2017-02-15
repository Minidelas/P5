class Solver {
  constructor(grid, color) {
    this.grid = grid;
    this.color = color;
    // this.posxAct = Math.floor(random(this.grid.filas));
    // this.posyAct = Math.floor(random(this.grid.columnas));
    this.posxAct = 0;
    this.posyAct = 0;
    this.path = [];
    this.grid.cuadricula[this.grid.finalX][this.grid.finalY].drawCustom('#545994');
    this.grid.cuadricula[this.posxAct][this.posyAct].drawCustom('#FF8E3B');
  }

  solve() {
    if (!this.grid.isExit(this.posxAct, this.posyAct)) {
      this.grid.setVisited(this.posxAct, this.posyAct);

      if (this.canGoLeft()) {
        this.path.push({x: this.posxAct, y: this.posyAct});
        this.grid.cuadricula[this.posxAct][this.posyAct].drawCustom(this.color);
        this.posxAct--;
      } else if (this.canGoUp()) {
        this.path.push({x: this.posxAct, y: this.posyAct});
        this.grid.cuadricula[this.posxAct][this.posyAct].drawCustom(this.color);
        this.posyAct--;
      } else if (this.canGoRight()) {
        this.path.push({x: this.posxAct, y: this.posyAct});
        this.grid.cuadricula[this.posxAct][this.posyAct].drawCustom(this.color);
        this.posxAct++;
      } else if (this.canGoDown()) {
        this.path.push({x: this.posxAct, y: this.posyAct});
        this.grid.cuadricula[this.posxAct][this.posyAct].drawCustom(this.color);
        this.posyAct++;
      } else {
        if (this.path.length === 0) {
          noLoop();
          // break;  // no more path for backtracking, exit (aka no solution for maze)
        } else {
          this.grid.cuadricula[this.posxAct][this.posyAct].drawCustom('#ffffff');
          var last = this.path.pop();
          this.posxAct = last.x;
          this.posyAct = last.y;
        }
      }
    }
  }

  canGoLeft() {
    try {
      return this.grid.cuadricula[this.posxAct][this.posyAct].isOpenLeft() &&
      !this.grid.cuadricula[this.posxAct - 1][this.posyAct].isVisited();
    } catch (e) {
      return false;
    }
  }

  canGoUp() {
    try {
      return this.grid.cuadricula[this.posxAct][this.posyAct].isOpenUp() &&
      !this.grid.cuadricula[this.posxAct][this.posyAct - 1].isVisited();
    } catch (e) {
      return false;
    }
  }

  canGoRight() {
    try {
      return this.grid.cuadricula[this.posxAct][this.posyAct].isOpenRight() &&
      !this.grid.cuadricula[this.posxAct + 1][this.posyAct].isVisited();
    } catch (e) {
      return false;
    }
  }

  canGoDown(){
    try {
      return this.grid.cuadricula[this.posxAct][this.posyAct].isOpenDown() &&
      !this.grid.cuadricula[this.posxAct][this.posyAct + 1].isVisited();
    } catch (e) {
      return false;
    }
  }
}
