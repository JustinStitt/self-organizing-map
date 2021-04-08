/* Hyperparameters */
const NUM_CLASSES   = 3; // possible ids 0, 1, 2
const LEARNING_RATE = .2;
const TOPOLOGICAL_NEIGHBOURHOOD = .3;

const VISU_ADJUST   = .10; // how much to adjust color

/* setup parameters */
const CELL_SIZE    = 30;
const ROWS         = 21;
const COLS         = 21;
const HEIGHT       = ROWS * CELL_SIZE;
const WIDTH        = COLS * CELL_SIZE;
const BACKGROUND_COLOR = [255,0,255]
const FRAME_BUFFER = 60;

let frame          = 0;

/* p5.js bootstrapping */
function setup(){
    createCanvas(WIDTH, HEIGHT);
    createLattice();
    drawLattice();       // initial lattice drawing
    parseTrainingData(); // training_data.js
}

/* ran once per frame modulo frame_buffer */
function draw(){//p5.js update loop
    frame++;
    if(frame % FRAME_BUFFER) return;
    background(BACKGROUND_COLOR);
    drawLattice();
}
