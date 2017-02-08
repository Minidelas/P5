class Runner {
  constructor (grid, color, name) {
    this.grid = grid;
    this.color = color;
    this.posxAct = Math.floor(random(rows));
    this.posyAct = Math.floor(random(columns));
    this.counter = 1;
    this.name = name;
    this.finished = false;
    this.resume = true;
  }

  mazeIt() {
    var moves = ['u', 'd', 'r', 'l'];
    if(!this.grid.everyOneTouched()) {
      if (this.availMove()) {
        this.move(moves[Math.floor(random(4))], this.grid);
      } else if(!this.finished){
        try {
          var lm = this.grid.cuadricula[this.posxAct][this.posyAct].lastMove();
          this.posxAct = lm.x;
          this.posyAct = lm.y;
        } catch (e) {
          this.finished = true;
        }
      }
    } else {
      this.finished = true;
      noLoop();
    }

    if (this.resume && this.finished) {
      console.log("movimientos: " + this.name + " " + this.counter);
      this.resume = false;
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
      this.counter++;
    }

    return validMove;
  }
}
