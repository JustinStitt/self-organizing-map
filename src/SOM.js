/* Hyperparameters */
const NUM_CLASSES   = 3; // possible ids 0, 1, 2
let LEARNING_RATE   = .6; // tendency to learn
const TOPOLOGICAL_NEIGHBOURHOOD = 2; // DFS limit for neighbours
const GAMMA   = .5;   // how much should neighbours change color relative to target
const EPSILON = 0.01; // stopping threshhold... learning is all but gone

const VISU_ADJUST   = .10; // how much to adjust color

/* setup parameters */
const CELL_SIZE    = 40;
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
    train();
    drawLattice();
}
