let network = Array(); // network of Nodes

/* Create NxN grid/map/lattice of Nodes*/
function createLattice(){
    for(let r = 0; r < ROWS; ++r){
        for(let c = 0; c < COLS; ++c){
            network.push(new Node(r, c));
        }
    }
}

/* Invoke draw on each Node in network */
function drawLattice(){
    for(let x = 0; x < network.length; ++x){
        network[x].draw();
    }
}

/* Network competes to find Node with smallest dist. from input */
function compete(inp){
    let _best = -1, _dist = Number.MAX_SAFE_INTEGER;
    let n = network.length;

    /* Iterate through network searching for better competitor */
    for(let x = 0; x < n; ++x){
        let dist = simplifiedEuclideanDistance(inp, network[x].weights);
        if(dist < _dist){
            _dist = dist;
            _best = x;
        }
    }

    if(_best == -1) throw new Error("Competition Flaw");

    /* 
        return an object that holds best node's index 
        and the relative distance from the input
    */
    return {idx: _best, distance: _dist};
}


/* Return an array of neighbouring Nodes to Node(r,c) */
function getNeighbours(i){
    let neighbours = Array();
    let r = Math.floor(i / ROWS);
    let c = i % COLS;
    /* Interpolate 2D to 1D coords */
    const idx = (_r, _c) => { return _r * ROWS + _c };

    if(r + 1 < ROWS) neighbours.push(network[idx(r+1,c)]); // NORTH
    if(r - 1 >= 0)   neighbours.push(network[idx(r-1,c)]); // SOUTH
    if(c + 1 < COLS) neighbours.push(network[idx(r,c+1)]); // EAST
    if(c - 1 >= 0)   neighbours.push(network[idx(r,c-1)]); // WEST

    // min 2 neighbours (if r,c is corner)
    return neighbours;
}

/*
0 1 2
3 4 5
6 7 8

*/
