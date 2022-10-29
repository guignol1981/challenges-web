import { bishopMovements } from './movements/bishop.js';
import { pawnMovements } from './movements/pawn.js';
import { rookMovements } from './movements/rook.js';
import { piecesInstances } from './pieces-instance.js';

export class ChessGame {
    pieces = piecesInstances;
    turn = 'white';
    winner = null;
    movesHistory = [];
    #_selectedPiece = null;

    get selectedPiece() {
        return this.#_selectedPiece;
    }

    set selectedPiece(value) {
        this.#_selectedPiece = value;
    }

    get allowedMoves() {
        if (!this.selectedPiece) return [];

        switch (this.selectedPiece.type) {
            case 'p':
                return pawnMovements(this);

            case 'r':
                return rookMovements(this);

            case 'b':
                return bishopMovements(this);
        }
    }

    getPieceAtBoardPos(pos) {
        return this.pieces.find(
            (p) => p.toBoardPos.x === pos.x && p.toBoardPos.y === pos.y
        );
    }
}
