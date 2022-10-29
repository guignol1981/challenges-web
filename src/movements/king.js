import { queenMovements } from './queen.js';

export const kingMovements = (chessGame) => {
    const allowedMoves = [];
    const king = chessGame.selectedPiece;

    return queenMovements(chessGame).filter(
        (m) =>
            Math.max(m.x, king.toBoardPos.x) -
                Math.min(m.x, king.toBoardPos.x) <=
                1 &&
            Math.max(m.y, king.toBoardPos.y) -
                Math.min(m.y, king.toBoardPos.y) <=
                1
    );
};
