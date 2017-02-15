class Npc {
  constructor(grid, color, name) {
    this.grid = grid;
    this.color = color;
    this.name = name;
    this.posxAct = Math.floor(random(rows));
    this.posyAct = Math.floor(random(columns));
    this.grid.drawEllipse(this.posxAct,this.posyAct);
    this.actived = false;
  }

  availMove() {
    var result = false;
    try {
      if (this.posyAct >= 0
        && this.grid.cuadricula[this.posxAct][this.posyAct - 1]) {
          result = true;
      }
    } catch (e) {}
    try {
      if (this.posyAct <= rows - 1
        && this.grid.cuadricula[this.posxAct][this.posyAct + 1]) {
          result = true;
      }
    } catch (e) {}
    try {
      if (this.posxAct >= 0
        && this.grid.cuadricula[this.posxAct - 1][this.posyAct]) {
          result = true;
      }
    } catch (e) {}
    try {
      if (this.posxAct <= columns - 1
        && this.grid.cuadricula[this.posxAct + 1][this.posyAct]) {
          result = true;
      }
    } catch (e) {}
    return result;
  }
}
