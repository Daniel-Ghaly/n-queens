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
  var solution = new Board({'n': n});
  var rows = solution.rows();
  var counter = 0;
  if (n === counter) {
    return board;
  }
  for (var i = 0; i < rows.length; i++) {
    var currentRow = rows[i];
    for (var j = 0; j < currentRow.length; j++) {
      if (i === j) {
        currentRow[j] = 1;
      }
    }
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(rows));
  return rows;
};
// 2. An array of arrays (a matrix). To create a populated board of size n:
// [ [<val>,<val>,<val>...], [<val>,<val>,<val>...], [<val>,<val>,<val>...] ] - Where each <val> is whatever value you want at that location on the board		EXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])
// // return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
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

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  //counter
  //make a new board
  var newBoard = new Board({n: n});
  //row variable for board.rows()
  //var rows = newBoard.rows();
  var solutionFound = false;
  var conflicts = function(rows) {
    if (rows === n) {
      solutionFound = true;
      console.log('we found:', JSON.stringify(newBoard.rows()));
      return newBoard.rows();
    }
    for (var col = 0; col < newBoard.attributes.n; col++) {
      newBoard.togglePiece(rows, col);
      if (!newBoard.hasAnyQueenConflictsOn(rows, col)) {
        conflicts(rows + 1);
      }
      if (solutionFound) {
        return;
      }
      newBoard.togglePiece(rows, col);
    }
  };
  conflicts(0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(newBoard.rows()));
  return newBoard.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};