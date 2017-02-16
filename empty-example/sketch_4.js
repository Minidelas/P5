const distx = 10;
const disty = 10;
const width = 900;
const height = 900;
var rows = Math.round(height/disty);
var columns = Math.round(width/distx);
var iniciar = false;
var solving = false;

var g;

function setup() {
  noLoop();
  createCanvas(width + 1, height + 1);
  background(255);
  g = new Grid(distx, disty, columns, rows);
  g.dibujar();

  r1 = new Runner(g, '#ffffff', 'generador');
  // r2 = new Runner(g, '#8ADF39', 'verde');
  // r3 = new Runner(g, 'blue', 'azul');
  // r4 = new Runner(g, 'yellow', 'amarillo');
}

function reset() {
  iniciar = false;
  solving = false;
  noLoop();
  setup();
}

function stop() {
  iniciar = false;
  solving = false;
  noLoop();
}

function start() {
  iniciar = true;
  loop();
}

function solve() {
  s1 = new Solver(g, '#C7E4C1');
  // s2 = new Solver(g, '#C7E4C1');
  solving = true;
  iniciar = false;
  loop();
}

function draw() {
  if (iniciar) {
    for (var i = 0; i < 1000; i++) {
      r1.mazeIt();
      // r2.mazeIt();
      // r3.mazeIt();
      // r4.mazeIt();
    }
  }

  if (solving) {
    for (var i = 0; i < 20; i++) {
      // s1.solveLHand();
      // s2.solveLHand();
      s1.solveDiagonal();
    }
  }
}

function mouseClicked() {
  if(mouseX >= 0
  && mouseX < width
  && mouseY >= 0
  && mouseY < height) {
    g.clickSquare(
      Math.floor(mouseX/distx),
      Math.floor(mouseY/disty)
    );
  }
}
