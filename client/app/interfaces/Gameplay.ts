export interface PlayerMove {
  x: number;
  y: number;
}

export interface Gameplay {
  _id?: string;
  game?: string;
  playerGreenMoves?: PlayerMove[];
  playerGreyMoves?: PlayerMove[];
  gameGrid?: string[][];
  winner?: string;
}