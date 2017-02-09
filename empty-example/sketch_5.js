const distx = 25;
const disty = 25;
const width = 500;
const height = 500;
var rows = Math.round(height/disty);
var columns = Math.round(width/distx);

var g;

function setup() {
  createCanvas(width + 1, height + 1);
  background(255);
  g = new Grid(distx, disty, columns, rows);
  g.dibujar();
}

function draw() {
  if(mouseIsPressed
    && mouseX >= 0
    && mouseX < width
    && mouseY >= 0
    && mouseY < height) {
    g.clickSquare(Math.floor(mouseX/distx), Math.floor(mouseY/disty));
  }
}

function mouseClicked() {
  if(mouseX >= 0
  && mouseX < width
  && mouseY >= 0
  && mouseY < height) {
    g.clickSquare(Math.floor(mouseX/distx), Math.floor(mouseY/disty));
  }
}
