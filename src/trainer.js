let epoch = 1; // starting epoch (episode)

/* Train network with training data */
function train(){
    if(LEARNING_RATE < EPSILON) return; // training done
    const N = training_data.length, M = training_data[0].length;
    // go through each vector in training_data
    for(let x = 0; x < N; ++x){
        /* Create slice & copy of training data */
        let inp = [...training_data[x]].splice(0, M-1);

        /* Last column is label (correct answer) */
        let label = training_data[x][training_data[x].length-1] - 1;

        /* Competition */
        let winner = compete(inp);

        /* Invoke recursive func to adjust all in top. neigh. no repeats */
        network[winner.idx].adjust(inp, label, VISU_ADJUST, 
                                TOPOLOGICAL_NEIGHBOURHOOD, new Set());
    }
    epoch += 1;

    /* after epoch, update learning rate hyperparameter */
    LEARNING_RATE *= 1 - epoch/100;
}

/* Ask trained model to predict id of given target */
function predict(target){
    let winner = compete(target);
    return network[winner.idx].id + 1;
}

/* Test for accuracy given labels */
function test(targets, labels){
    let predictions = Array();
    for(let x = 0; x < targets.length; ++x){
        predictions.push(predict(targets[x]));;
    }
    if(predictions.length != labels.length) throw new Error("Prediction Error");

    let correct = 0;
    for(let x = 0; x < predictions.length; ++x){
        if(predictions[x] == labels[x]) correct += 1;
    }

    /* Ratio of correct to total... accuracy */
    return correct/predictions.length;
}