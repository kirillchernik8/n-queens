/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findAnySolution = function (row, n, board, method, callback) {
  if (row === board.rows().length) {
    return callback();
  }
  for (let i = 0; i < board.rows().length; i++) {
    board.togglePiece(row, i);

    if (!board[method]()) {
      let result = findAnySolution(row + 1, n, board, method, callback)
      if (result) {
        return result;
      }
    }
    board.togglePiece(row, i)
  }
}




window.findNRooksSolution = function (n) {
  let board = new Board({
    n: n
  });

  let solution = findAnySolution(0, n, board, 'hasAnyRooksConflicts', function () {
    return _.map(board.rows(), (row) => {
      return row.slice()
    })
  })

  console.log("Single solution for " + n + " rooks:", JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var solutionCount = 0;
  let board = new Board({
    n: n
  }) //fixme
  findAnySolution(0, n, board, 'hasAnyRooksConflicts', function () {
    solutionCount++
  });

  console.log("Number of solutions for " + n + " rooks:", solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  //fixme
  let board = new Board({n: n});

  let solution = findAnySolution(0, n, board, 'hasAnyQueensConflicts', function () {
    return _.map(board.rows(), (row) => {
      return row.slice()
    })
  })

  solution = solution || board.rows()
  console.log("Single solution for " + n + " queens:", JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = 0;
  let board = new Board({
    n: n
  }) //fixme
  findAnySolution(0, n, board, 'hasAnyQueensConflicts', function () {
    solutionCount++
  });

  console.log("Number of solutions for " + n + " queens:", solutionCount);
  return solutionCount;
};