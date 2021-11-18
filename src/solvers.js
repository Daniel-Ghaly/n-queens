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



window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme
  var newBoard = new Board({n: n});
  var rows = newBoard.rows();
  for (var i = 0; i < rows.length; i++) {
    rows[i][i] = 1;
  }
  return rows;
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(rows));
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
var countNRooksSolutions = function(n) {
  var result = 1;
  var start = 1;
  while (start <= n) {
    result = start * result;
    start += 1;
  }
  console.log('Number of solutions for ' + n + ' rooks:', result);
  return result;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
