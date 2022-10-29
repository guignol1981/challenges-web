import { bishopMovements } from './bishop.js';
import { rookMovements } from './rook.js';

export const queenMovements = (chessGame) => {
    return bishopMovements(chessGame).concat(rookMovements(chessGame));
};
