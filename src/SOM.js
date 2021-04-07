/* Hyperparameters */
const CELL_SIZE = 12;
const ROWS      = 45;
const COLS      = 75;
const HEIGHT    = ROWS * CELL_SIZE;
const WIDTH     = COLS * CELL_SIZE;
let frame_buffer = 60;
let frame        = 0;


/* p5.js bootstrapping */
function setup(){
    createCanvas(WIDTH, HEIGHT);
}

/* ran once per frame modulo frame_buffer */
function draw(){//p5.js update loop
    fill('GREEN')
    rect(30, 120, 50, 150);
    frame++;
}
