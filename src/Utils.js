/* Generate vector of random floats each in inclusive bounds -- bounds[i] */
function randomInRange(bounds){
    let dims = bounds.length;
    let _w = Array(dims);
    for(let x = 0; x < dims; ++x){
        [lmin, lmax] = bounds[x]; // structured binding 
        _w[x] = Math.random() * (lmax - lmin) + lmin;
    }
    return _w;
}

/* Generate random integer in range [lower, upper) */
function randomInt({lower = 0, upper = 0}){
    return Math.floor(Math.random() * (upper - lower) + lower);
}

/* Return distance between two points in euclidean space (no sq. root op) */
function simplifiedEuclideanDistance(p1, p2){
    if(p1.length != p2.length){
        throw new Error("Dimensionality Error");
    }

    let dist = 0, n = p1.length;

    for(let x = 0; x < n; ++x){
        dist += (p1[x] - p2[x])**2
    }

    return dist;
}