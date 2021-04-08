/* Hyperparameters */
const CELL_SIZE    = 30;
const ROWS         = 21;
const COLS         = 21;
const HEIGHT       = ROWS * CELL_SIZE;
const WIDTH        = COLS * CELL_SIZE;
const NUM_CLASSES  = 3; // possible ids 0, 1, 2
const frame_buffer = 60;

let frame          = 0;

/* p5.js bootstrapping */
function setup(){
    createCanvas(WIDTH, HEIGHT);
    createLattice();
    drawLattice(); // initial lattice drawing
}

/* ran once per frame modulo frame_buffer */
function draw(){//p5.js update loop
    frame++;
    if(frame % frame_buffer) return;
    drawLattice();
}
