import { Gameplay } from '../../client/app/interfaces/Gameplay';

export class GameplayUtils {
  gameplayObject: Gameplay = {};
  moveCount: number = 0;
  chipInnaRowCount: number = 1;

  /**
   * Sets the gameplay object to blank state with gameId set
   * @param {string} gameId - MongoId of the Game that is being played.
   */
  newGame(gameId?: string): Gameplay {
    this.gameplayObject.game = gameId || '';
    this.gameplayObject.playerGreenMoves = [];
    this.gameplayObject.playerGreyMoves = [];
    this.gameplayObject.gameGrid = [
      ['empty', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'empty', 'empty'],
    ];
    this.gameplayObject.winner = 'playing';
    this.moveCount = 0;
    return this.gameplayObject;
  }
  /**
   * Calculates the move, pushes move to the right player and sets the winner.
   * @param {number} columnNumber
   */
  moveMade(columnNumber: number) {

    let move = this.calcMove(columnNumber);
    let moveColor = 'green';

    if (this.moveCount === 0 || this.moveCount % 2 === 0) {
      this.gameplayObject.playerGreenMoves.push(move);
      moveColor = 'green';
    } else {
      this.gameplayObject.playerGreyMoves.push(move);
      moveColor = 'grey';
    }
    this.gameplayObject.gameGrid[move.x][move.y] = moveColor;
    this.moveCount++;

    let isWinner = this.theWinnerIs();
    if (isWinner !== 'playing') {
      this.gameplayObject.winner = isWinner;
    }
    return this.gameplayObject;
  };

  /**
   * Calculates the move coords based on the column
   * @param {number} columnNumber calculates the row based on the column passed and the number of moves in this column so far.
   * @return {PlayerMove} move coordinates
   */
  private calcMove(columnNumber: number) {
    if (this.moveCount === 0) {
      return { x: columnNumber, y: 4 };
    }

    let numberOfMovesInColumn = 0;
    let row = 0;

    this.gameplayObject.playerGreenMoves
      .forEach(move => {
        if (move.x === columnNumber) numberOfMovesInColumn++;
      });
    this.gameplayObject.playerGreyMoves
      .forEach(move => {
        if (move.x === columnNumber) numberOfMovesInColumn++;
      });

    switch (numberOfMovesInColumn) {
      case 0:
        row = 4;
        break;
      case 1:
        row = 3;
        break;
      case 2:
        row = 2;
        break;
      case 3:
        row = 1;
        break;
      case 4:
        row = 0;
        break;
      default:
        break;
    };
    return { x: columnNumber, y: row };
  }

  private theWinnerIs() {
    if (this.gameplayObject.playerGreenMoves.length < 4) {
      return 'playing';
    }
    return this.theWinner();
  }

  private theWinner() {
    let winner = 'playing';
    this.gameplayObject.gameGrid
      .some((column, columnidx, colRowArray) => {
        return column
          .some((chip, rowidx, chipColArray) => {
            let checkRowIndex = rowidx;
            let checkColIndex = columnidx;
            // if this is an empty chip
            if (chip === 'empty') {
              winner = 'playing';
              return false;
            }
            if (
              this.rowCheck(chip, checkRowIndex, chipColArray) ||
              this.colCheck(chip, checkColIndex, rowidx, colRowArray) ||
              this.diagCheck(chip, checkColIndex, rowidx, colRowArray)
            ) {
              winner = chip;
              return true;
            } else if (this.gameplayObject.playerGreenMoves.length + this.gameplayObject.playerGreyMoves.length === 35) {
              winner = 'tie';
              return true;
            }
            return false;
          });
      });
    return winner;
  };

  private rowCheck(chip: string, rowidx: number, array: string[]) {
    while (
      this.chipInnaRowCount < 4 &&
      chip === array[rowidx + 1]
    ) {
      rowidx++;
      this.chipInnaRowCount++;
    }
    // We have a winner
    if (this.chipInnaRowCount >= 4) {
      return true;
    }
    // No win, reset
    this.chipInnaRowCount = 1;
    return false;
  };

  private colCheck(chip: string, colidx: number, rowidx: number, array: string[][]) {
    while (
      this.chipInnaRowCount < 4 &&
      chip === array[colidx + 1][rowidx]
    ) {
      colidx++;
      this.chipInnaRowCount++;
    }
    // We have a winner
    if (this.chipInnaRowCount >= 4) {
      return true;
    }
    // No win, reset
    this.chipInnaRowCount = 1;
    return false;
  };

  private diagCheck = (chip: string, colidx: number, rowidx: number, array: string[][]) => {
    // Diagonal Up
    while (
      colidx + 1 < 7 &&
      rowidx + 1 < 5 &&
      this.chipInnaRowCount < 4 &&
      chip === array[colidx + 1][rowidx + 1]
    ) {
      colidx++;
      rowidx++;
      this.chipInnaRowCount++;
    }
    // We have a winner
    if (this.chipInnaRowCount >= 4) {
      return true;
    }
    // No win, reset
    this.chipInnaRowCount = 1;

    // Diagonal Down
    while (
      colidx + 1 < 7 &&
      rowidx - 1 > -1 &&
      this.chipInnaRowCount < 4 &&
      chip === array[colidx + 1][rowidx - 1]
    ) {
      colidx++;
      rowidx--;
      this.chipInnaRowCount++;
    }
    // We have a winner
    if (this.chipInnaRowCount >= 4) {
      return true;
    }
    // No win, reset
    this.chipInnaRowCount = 1;
    return false;
  };
}
