// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // might need to call this with the call method to bind 'this' correctly
      // Input is a board as this
      // what's rowIndex?
      // console.log("rowIndex:");
      // console.log(rowIndex);
      // Output: lets assume boolean
      if (_.reduce(this.rows()[rowIndex], function(memo, num) { return memo + num; }) > 1) {
        return true;
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // 'this' is the board array
      var board = this.rows();
      for (var i = 0; i < board.length; i++) {
        if (this.hasRowConflictAt(i)) { return true; }
      }

      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // Input this board and colIndex
      var board = this.rows();
      /*
      * Iterate through columns first
      */
      var sum = 0;
      for (var i = 0; i < board.length; i++) {
        sum = sum + board[i][colIndex];
      }
      return sum > 1 ? true : false;
      // Output boolean

    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var board = this.rows();

      for (var i = 0; i < board.length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }

      return false;
    },


    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // assume number of diagonals is n*2 - 3
      // start with one corner and iterate from there
      // first corner is last row (skip)
      // for each diagonal
      // add all values from this row to last row
      // iterate through to get sum for each diagonal
      // until we reach top right corner (first row)

      // Input: assume first row of the major diagonal.
      // add values from starting position to row n-1
      // output boolean, true if sume > 1
      var board = this.rows();
      var sum = 0;
      // console.log("board is " + board);
      // console.log("majorDiag thing " + majorDiagonalColumnIndexAtFirstRow);
      var curCol, curRow;

      if (majorDiagonalColumnIndexAtFirstRow >= 0) {
        curCol = majorDiagonalColumnIndexAtFirstRow;
        curRow = 0;
        // iterate until last column
        while (curCol < board.length) {
          sum = sum + board[curRow][curCol];
          curCol++;
          curRow++;
        }
      } else {
        curCol = 0;
        curRow = -majorDiagonalColumnIndexAtFirstRow;

        while (curRow < board.length) {
          sum = sum + board[curRow][curCol];
          curCol++;
          curRow++;
        }
      }

      return sum > 1 ? true : false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var board = this.rows();
      // assume number of diagonals is n*2 - 3

      // Iterate through first row diagonals
      // From row 0 col 0 to row 0 col n-1
      for (var i = 0; i < board.length; i++) {
        // checkDiagonal
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      // From row 1 to row n-1
      for (var i = 0; i < board.length; i++) {
        if (this.hasMajorDiagonalConflictAt(-i)) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // minorDiag thing always positive
      // We know this, n, and columnindexatfirstrow
      // rows first
      var board = this.rows();
      var sum = 0;
      var curCol, curRow;
      if (minorDiagonalColumnIndexAtFirstRow >= board.length - 1) {
        curRow = minorDiagonalColumnIndexAtFirstRow - (board.length - 1);
        curCol = board.length - 1;
        while (curRow < board.length) {
          sum += board[curRow][curCol];
          curRow++;
          curCol--;
        }
      } else {
        curRow = 0;
        curCol = minorDiagonalColumnIndexAtFirstRow;
        while (curCol >= 0) {
          sum += board[curRow][curCol];
          curRow++;
          curCol--;
        }
      }

      return sum > 1 ? true : false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var board = this.rows();

      for (var i = 0; i < board.length; i++) {
        // checkDiagonal
        if (this.hasMinorDiagonalConflictAt(i + (board.length - 1))) {
          return true;
        }
      }

      for (var i = 0; i < board.length - 1; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }


      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
