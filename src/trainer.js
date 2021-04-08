let epoch = 1; // starting epoch (episode)

/* Train network with training data */
function train(){
    const N = training_data.length, M = training_data[0].length;
    // go through each vector in training_data
    for(let x = 0; x < N; ++x){
        let inp = [...training_data[x]].splice(0, M-1);
        let label = training_data[x][training_data[x].length-1];
        let winner = compete(inp);
        let neighbours = getNeighbours(winner.idx);
        network[winner.idx].shift(label);
        network[winner.idx].adjust(inp);
        for(let y = 0; y < neighbours.length; ++y){
            neighbours[y].adjust(network[winner.idx].weights);
            neighbours[y].shift(label);
        }
    }
}