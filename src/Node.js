class Node{
    constructor(r, c){
        this.w     = randomInRange([[-5, 5], [-5, 5], [-60, 60]]);
        this.id    = randomInt({upper: NUM_CLASSES});
        this.color = [100, 100, 100];
        this.r     = r;
        this.c     = c;
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
    shift(id){
        this.id = id;
        let available = [0, 1, 2];
        available = available.filter((v, i, a) => {return v!=id;});
        // positive shift
        this.color[id] = Math.floor(this.color[id] * (1+VISU_ADJUST));

        for(let x = 0; x < available.length; ++x){
            this.color[available[x]] = Math.floor(this.color[available[x]] * (1-VISU_ADJUST));
        }

        // clamping colors
        for(let x = 0; x < 3; ++x){
            if(this.color[x] > 255) this.color[x] = 255;
        }
    }

    /* Adjust weights for Given node */
    adjust(target){
        const N = this.w.length;
        for(let x = 0; x < N; ++x){
            this.w[x] = this.w[x] + (LEARNING_RATE*(target[x]-this.w[x]));
        }
    }

}