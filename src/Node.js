class Node{
    constructor(r, c){
        this.w     = randomInRange([[-5, 5], [-5, 5], [-60, 60]]);
        this.id    = randomInt({upper: NUM_CLASSES});
        this.color = [100, 100, 100];
        this.r     = r;
        this.c     = c;
        this.idx = idx(r, c);
    }

    /* Fetch this Node's weight vector */
    get weights() { return this.w; }

    /* Draw this node at pos r,c with its color */
    draw(){
        fill(this.color);
        stroke(this.color);
        rect(this.r*CELL_SIZE, this.c*CELL_SIZE, 
                    CELL_SIZE, CELL_SIZE);
    }

    /* Shift color of Node to be more like id by margin of VISU_ADJUST */
    shift(id, amnt){
        this.id = id;
        let available = [0, 1, 2];
        available = available.filter((v, i, a) => {return v!=id;});
        // positive shift
        this.color[id] = Math.floor(this.color[id] * (1+amnt));

        for(let x = 0; x < available.length; ++x){
            this.color[available[x]] = Math.floor(this.color[available[x]] * (1-amnt));
        }

        // clamping colors
        for(let x = 0; x < 3; ++x){
            if(this.color[x] > 255) this.color[x] = 255;
        }
    }

    /* Adjust weights for Given node */
    adjust(target, label, amnt, topological_neighbourhood, visited){
        /* If Node already visited or top. neighbourhood lt 0 */
        if(visited.has(this.idx) || topological_neighbourhood < 0) return;
        /* add to Set */
        visited.add(this.idx);

        /* Adjust ourselves */
        const N = this.w.length;
        for(let x = 0; x < N; ++x){
            this.w[x] = this.w[x] + (LEARNING_RATE*(target[x]-this.w[x]));
        }
        this.shift(label, amnt);

        /* Adjust neighbours */
        let neighbours = getNeighbours(this.idx);
        for(let x = 0; x < neighbours.length; ++x){
            neighbours[x].adjust(this.weights, label, amnt*GAMMA, topological_neighbourhood-1, visited);
        }
    }

}