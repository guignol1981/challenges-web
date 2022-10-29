import { bishopMovements } from './movements/bishop.js';
import { kingMovements } from './movements/king.js';
import { knightMovements } from './movements/knight.js';
import { pawnMovements } from './movements/pawn.js';
import { queenMovements } from './movements/queen.js';
import { rookMovements } from './movements/rook.js';
import { Piece } from './piece.js';
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
        return this.selectedPiece?.moves(this) ?? [];
    }

    playTurn() {
        this.turn = this.turn === 'white' ? 'black' : 'white';
        this.verifyMate();
    }

    verifyMate() {
        const allOppenentMoves = this.pieces
            .filter((p) => p.color !== this.turn)
            .map((p) => {
                switch (p.type) {
                    case 'p':
                        return pawnMovements(this);
                    case 'r':
                        return rookMovements(this);
                    case 'k':
                        return knightMovements(this);
                    case 'b':
                        return bishopMovements(this);
                    case 'q':
                        return queenMovements(this);
                    case 'K':
                        return kingMovements(this);
                }
            })
            .flat();

        console.log(allOppenentMoves);
    }

    movePiece(move) {
        if (this.selectedPiece.color !== this.turn) return;

        if (this.getPieceAtBoardPos(move)) {
            this.pieces = this.pieces.filter(
                (p) => p !== this.getPieceAtBoardPos(move)
            );
        }

        this.selectedPiece.setPosWithBoardPos(move);
        if (
            this.selectedPiece.type === 'p' &&
            (this.selectedPiece.pos[1] === 8 || this.selectedPiece.pos[1] === 1)
        ) {
            this.pieces.splice(
                this.pieces.findIndex((p) => p === this.selectedPiece),
                1,
                new Piece('q', this.selectedPiece.color, this.selectedPiece.pos)
            );
        }

        this.selectedPiece = null;
        this.playTurn();
    }

    getPieceAtBoardPos(pos) {
        return this.pieces.find(
            (p) => p.toBoardPos.x === pos.x && p.toBoardPos.y === pos.y
        );
    }
}
