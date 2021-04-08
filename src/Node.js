class Node{
    constructor(r, c){
        this.w     = randomInRange([[-5, 5], [-5, 5], [-60, 60]]);
        this.id    = randomInt({upper: NUM_CLASSES});
        this.color = [100, 100, 100];
        this.r     = r;
        this.c     = c;
    }

    get weights() { return this.w; }
    /* Draw this node at pos r,c with its color */
    draw(){
        fill(this.color);
        //stroke(this.color);
        rect(this.r*CELL_SIZE, this.c*CELL_SIZE, 
                    CELL_SIZE, CELL_SIZE);
    }
}