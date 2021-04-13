let epoch = 0; // starting epoch (episode)
let trained = false;
let pwinner = -1;

/* Train network with training data */
function* train(){
    if(LEARNING_RATE < EPSILON) {trained = true; return;}; // training done
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
        yield;
    }
    epoch += 1;
    /* after epoch, update learning rate hyperparameter */
    LEARNING_RATE *= 1 - epoch/12;
    yield* train();
}

/* When html <button/> is pressed */
function predictWilderButton(){
    // fetch wilder input data
    let x = document.getElementById("wilder__input1").value;
    let y = document.getElementById("wilder__input2").value;
    let z = document.getElementById("wilder__input3").value;

    if(x == "" || y == "" || z == "") throw new Error("Wilder Input Error.");

    // create wilder vector given string data
    let wilder_vector = [parseFloat(x), parseFloat(y), parseFloat(z)];
    // get prediction from trained model
    let prediction = predict(wilder_vector);
    document.getElementById('wilder__prediction').innerHTML = "Prediction: " + prediction.toString();
    console.log('prediction: ', prediction);
}

/* Ask trained model to predict id of given target */
function predict(target){
    // toggle off previous winner display
    if(pwinner != -1) network[pwinner].winner = false;
    let winner = compete(target);
    network[winner.idx].winner = true;
    // set new previous winner
    pwinner = winner.idx;
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