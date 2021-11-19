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
      var row = this.rows()[rowIndex];
      // iterate across spaces in row to find potential conflicts
      var counter = 0;
      for (var i = 0; i < row.length; i++) {
        var space = row[i];
        if (space === 1) {
          counter++;
        }
      }
      if (counter > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // go through each row and check if conflict using above f()
      for (var i = 0; i < this.rows().length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // go over all spaces of column colIndex
      var counter = 0;
      for (var i = 0; i < this.attributes.n; i++) {
        if (this.attributes[i][colIndex] === 1) {
          counter++;
        }
        if (counter > 1) {
          return true;
        }
      }

      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      for (var i = 0; i < this.attributes.n; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var counter = 0;
      var boardSize = this.get('n');
      // var startingIndex = 2 - this.rows().length;
      var rowIndex = 0;
      var colIndex = majorDiagonalColumnIndexAtFirstRow;

      while (colIndex < boardSize && rowIndex < boardSize) {
        var row = this.get(rowIndex);
        if (row[colIndex] === 1) {

          counter++;
        }
        // console.log (this.get(rowIndex));

        colIndex++;
        rowIndex++;
      }

      if (counter > 1) {
        return true;
      }
      return false;


      // mjD = -1
      // i =0, row[-1+ abs(i)]

      // [0, 0, 0, 0],
      // [1, 0, 0, 0],
      // [0, 0, 0, 0],
      // [0, 0, 1, 0];



      // for majorDiagonalColumnIndexAtFirstRow = 0
      // i = 0, check row[mjD+i]    --> row = [1,0,0,0]
      // i = 1, check row[i]        --> row = [0,1,0,0]
      // i = 2, check row[i]        --> row = [0,0,1,0]
      // i = 3, check row[i]        --> row = [0,0,0,1]


      // for majorDiagonalColumnIndexAtFirstRow = 0
      // i = 0, check row[mjD+i]    --> row = [0,0,0,0]
      // i = 1, check row[i]        --> row = [1,0,0,0]
      // i = 2, check row[i]        --> row = [0,1,0,0]
      // i = 3, check row[i]        --> row = [0,0,1,0]


      // for majorDiagonalColumnIndexAtFirstRow = 0
      // i = 0, check row[mjD+i]    --> row = [0,0,0,0]
      // i = 1, check row[i]        --> row = [0,0,0,0]
      // i = 2, check row[i]        --> row = [1,0,0,0]
      // i = 3, check row[i]        --> row = [0,1,0,0]

      // for majorDiagonalColumnIndexAtFirstRow = 0
      // i = 0, check row[mjD+i]    --> row = [0,0,0,0]
      // i = 1, check row[i]        --> row = [0,0,0,0]
      // i = 2, check row[i]        --> row = [0,0,0,0]
      // i = 3, check row[i]        --> row = [1,0,0,0]


      // ** all of above just for majorDiagonalColumnIndexAtFirstRow = 0

      // now = 1...

      // for majorDiagonalColumnIndexAtFirstRow = 1
      // i = 0, check row[mjD+i]    --> row = [0,1,0,0]
      // i = 1, check row[1]          --> row = [0,0,1,0]
      // i = 2, check row[2]          --> row = [0,0,0,1]
      // i = 3, check row[3]          --> row = [0,0,0,0]










      // for majorDiagonalColumnIndexAtFirstRow = 2
      // i = 0, check row[0]    --> row = [0,0,1,0]
      // i = 1, check row[1]    --> row = [0,0,0,1]
      // i = 2, check row[2]    --> row = [0,0,0,0]
      // i = 3, check row[3]    --> row = [0,0,0,0]
      // }
      // if (counter > 1) {
      //   return true;
      // }
      // return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var startingIndex = 2 - this.rows().length;
      for (var i = startingIndex; i < this.rows().length; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var counter = 0;
      var rowIndex = 0;
      var colIndex = minorDiagonalColumnIndexAtFirstRow;
      var boardSize = this.get('n');
      while (colIndex >= 0 && rowIndex < boardSize) {
        var row = this.get(rowIndex);
        if (row[colIndex] === 1) {
          counter ++;
        }
        colIndex--;
        rowIndex++;
      }
      if (counter > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var startingIndex = this.get('n') + (this.get('n') - 2);
      for (var i = startingIndex; i > 0; i--) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
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

