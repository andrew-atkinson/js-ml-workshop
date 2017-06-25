//Start off with what passes the first test.
function KNN(kSize) {
  this.kSize = kSize;
  this.points = [];
}


KNN.prototype.train = function(num) {
  num.forEach((ele) => {
    this.points.push([
      ele[0], ele[1]
    ]);
  });
}


KNN.prototype._distance = function(vectorOne, vectorTwo) {
  // console.log("single", this);
  return this._euclideanNorm(this._vectorSub(vectorOne, vectorTwo));
};


KNN.prototype._distances = function(vec, arr) {
  return arr.map((ele) => [this._distance(vec, ele[0]), [ele[1]]]);
};


KNN.prototype._euclideanNorm = function(arr) {
  return Math.sqrt(arr.reduce(function(old, n) {
    return old + n * n;
  }, 0));
}


KNN.prototype._vectorSub = function(arrOne, arrTwo) {
  return arrOne.map(function(_, index) {
    return arrOne[index] - arrTwo[index];
  });
}

KNN.prototype._sorted = function(arr) {
  let sortArr = arr.sort((a, b) => a[0] - b[0]);
  let returnArr = [];
  for (var i = 0; i < sortArr.length; i++) {
    returnArr.push(sortArr[i][1]);
  }
  return returnArr;
};

KNN.prototype._majority = function(k, sortedArr) {
  let partialArr = sortedArr.slice(k);
  let majority = partialArr.reduce(function(acc, curr) {
    if (!acc[curr]) {
      acc[curr] = 1;
    } else {
      acc[curr] += 1;
    }
    return acc;
  }, {});

  return Object.keys(majority).reduce(function(a, b) {
    return parseInt(a) > parseInt(b) ? parseInt(a) : parseInt(b);
  });
};

module.exports = KNN
