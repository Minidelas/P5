const distx = 10;
const disty = 10;
const width = 900;
const height = 900;
var rows = Math.round(height/disty);
var columns = Math.round(width/distx);
var iniciar = false;

var g;

function setup() {
  noLoop();
  createCanvas(width + 1, height + 1);
  background(255);
  g = new Grid(distx, disty, columns, rows);
  g.dibujar();

  r1 = new Runner(g, '#F93F3F', 'rojo');
  r2 = new Runner(g, '#8ADF39', 'verde');
  r3 = new Runner(g, 'blue', 'azul');
  r4 = new Runner(g, 'yellow', 'amarillo');
}

function reset() {
  iniciar = false;
  noLoop();
  setup();
}

function stop() {
  iniciar = false;
  noLoop();
}

function start() {
  iniciar = true;
  loop();
}

function draw() {
  if (iniciar) {
    for (var i = 0; i < 50; i++) {
      r1.mazeIt();
      r2.mazeIt();
      r3.mazeIt();
      r4.mazeIt();
    }
  }
}
