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

  // make board of size n
  // make rowsToAvoid
  // make colsToAvoid
  // place first at x,y
  // place second one at x+1, y until no more x
  // continue through y+1, x+1
  // until number of pieces = n
  // or we reach max x max y

//   Rather than setting or getting object properties directly with plain JavaScript, Backbone provides the get and set methods. Play with the getters and setters that Backbone provides
// example: board.get(3) will return the 3rd row of the instance board (assuming that instance exists)

//    togglePiece: function(rowIndex, colIndex) {} toggles value at position
//  _isInBounds: function(rowIndex, colIndex) {} returns if rowIndex and colIndex within range of the board
// hasAnyRooksConflicts
  var solution = new Board({n: n});

  var rowsToAvoid = [];
  var colsToAvoid = [];
  var x = 0;
  var y = 0;
  var piecesOnBoard = 0;

  while (piecesOnBoard < n) {
    solution.togglePiece(x, y);
    rowsToAvoid.push(x);
    colsToAvoid.push(y);
    piecesOnBoard++;
    x++;
    y++;
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  console.log("solution: ");
  console.log(solution.rows());
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var x = 0;
  var y = 0;


  // fresh board
  do {
    var rowsToAvoid = [];
    var colsToAvoid = [];
    var piecesOnBoard = 0;


    var firstPiece = [x, y];
    var solution = new Board({n: n});
    solution.togglePiece(x, y);
    rowsToAvoid.push(x);
    colsToAvoid.push(y);
    piecesOnBoard++;
    // var boardLength = solution.rows().length;
    for (var i = 0; i < n; i++ ) {

      // iterate through columns on one row
      if (_.contains(rowsToAvoid, i)) {
        continue;
      }
      for (var j = 0; j < n; j++) {
        if (_.contains(colsToAvoid, j)) {
          // alert(solution.rows().length);
          continue;
        }
        // place piece
        solution.togglePiece(i, j);
        rowsToAvoid.push(i);
        colsToAvoid.push(j);
        piecesOnBoard++;
      }
    }

    // Increment next first position on board
    if (piecesOnBoard === n ) {
      solutionCount++;
    }
    if (x === n - 1 && y < n - 1) {
      //  at end of row
      x = 0;
      y++;
    } else {
      x++;
    }

  } while (solution._isInBounds(x, y));
  /*
  // iterate through board

    // Check location is not in rowsToAvoid and colsToAvoid
    // Place next piece
    // incrementing
    // end of loop
  // Check if pieces on board is n; if so increment solution
  */


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
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
