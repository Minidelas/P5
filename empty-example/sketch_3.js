var probabilidad = 0.5;
var pasos = 200;
var rango = 10;
var posX = 0;
var posY = 0;
var meta = {
  x: 500,
  y: 500
};

var aux = new Array(200);
var distancia = calcularDistanciaAMeta(0, 0);

class Minion {
  constructor(x, y, preMoves) {
    this.x = x;
    this.y = y;
    this.movements = [];
    if (preMoves.length > 0) {
      this.preMoves = preMoves;
    } else {
      this.preMoves = new Array(200);
    }
  }

  posX() {
    return this.x;
  }

  posY() {
    return this.y;
  }

  arrayMovements() {
    return this.movements;
  }

  move() {
    for (var i = 0; i < pasos - 1; i++) {
      var movement = {
        x: 0,
        y: 0
      };

      if(this.preMoves[i] && this.preMoves[i] !== null){
        if((Math.random() + probabilidad) >= 1){
          this.x += this.preMoves[i].x;
          movement.x = this.preMoves[i].x;
          this.y += this.preMoves[i].y;
          movement.y = this.preMoves[i].y;
        } else{
          movement = regularMove();
          this.x += movement.x;
          this.y += movement.y;
        }
      } else {
        movement = regularMove();
        this.x += movement.x;
        this.y += movement.y;
      }

      posX = movement.x;
      posY = movement.y;
      // redraw();
      this.movements.push(movement);
    }
  }
};

function regularMove() {
  var movement = {
    x: getRandomIntInclusive(-rango, rango),
    y: getRandomIntInclusive(-rango, rango)
  };
  return movement;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calcularDistanciaAMeta(x, y) {
  var width = meta.x - x;
  var height = meta.y - y;
  return Math.sqrt((width*width) + (height*height));
}

function start() {
  var ganador;
  var winNum;
  // for (var i = 0; i < 100; i++) {
    minion = new Minion(0, 0, aux);
    minion.move();
    var distAux = calcularDistanciaAMeta(minion.posX(), minion.posY());

    // fill(184,134,11, 0);
    if (distAux < distancia) {
      // console.log("Minion " + i);
      // console.log("ha llegado a x:" + minion.posX() + " y:" + minion.posY());

      stroke(0);
      fill(38,159,56);


      aux = minion.arrayMovements();
      distancia = distAux;
      // console.log("se acerca");
      // console.log(distancia);
      // probabilidad += 0.001;
      ganador = minion;
      // winNum = i;
      ellipse(minion.posX(), minion.posY(), 5, 5);
    }
  // }

  console.log("Minion ganador " + winNum, ganador);
}

function setup() {
  createCanvas(1000, 1000);
  // noLoop();

  stroke(0);
  fill(0,255,0);
  ellipse(meta.x, meta.y, 5, 5);
  push();
}

function draw() {
  // fill(0,0,255);
  // ellipse(posX, posY, 5, 5);
  start();
}
