/* Hyperparameters */
const NUM_CLASSES   = 3; // possible ids 0, 1, 2
let LEARNING_RATE   = .6; // tendency to learn
const TOPOLOGICAL_NEIGHBOURHOOD = 2; // DFS limit for neighbours
const GAMMA   = .5;   // how much should neighbours change color relative to target
const EPSILON = 0.01; // stopping threshhold... learning is all but gone

const VISU_ADJUST   = .20; // how much to adjust color

/* setup parameters */
const CELL_SIZE    = 20;
const ROWS         = 21;
const COLS         = 21;
const HEIGHT       = ROWS * CELL_SIZE;
const WIDTH        = COLS * CELL_SIZE;
const BACKGROUND_COLOR = [255,0,255]
const FRAME_BUFFER = 60;

let frame          = 0;

/* p5.js bootstrapping */
function setup(){
    let canv = createCanvas(WIDTH, HEIGHT);
    canv.parent("canvas__wrapper");
    createLattice();
    drawLattice();       // initial lattice drawing
    parseTrainingData(); // training_data.js
    createDiv('speed: ');
    fSlider = createSlider(0, FRAME_BUFFER, 
        FRAME_BUFFER/1.5, 1);
    document.getElementById("data__entry").value = RAW_TRAINING_DATA;
}

/* Display epoch on screen */
function drawEpoch(){
    textSize(25);
    stroke('WHITE');
    fill('BLACK');
    let msg = "epoch: " + epoch.toString();
    if(trained) msg = "trained";
    text(msg, WIDTH - 150, HEIGHT - 15);
}

function drawIndex(idx){
    textSize(20);
    stroke('WHITE');
    fill('BLACK');
    let msg = 'idx: ' + idx.toString();
    text(msg, WIDTH - 120, HEIGHT - 55);
}

let trainer;

/* ran once per frame modulo frame_buffer */
function draw(){//p5.js update loop
    if(frame == 0) trainer = train();
    frame++;
    if(frame % (FRAME_BUFFER - fSlider.value())) return;
    background(BACKGROUND_COLOR);
    let idx = trainer.next().value;
    drawLattice();
    drawEpoch();
    if(!trained) drawIndex(idx);
}
