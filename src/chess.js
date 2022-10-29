import { Piece } from './pieces/piece.js';
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

    get possibleMoves() {
        return this.selectedPiece?.possibleMoves(this) ?? [];
    }

    playTurn() {
        this.turn = this.turn === 'white' ? 'black' : 'white';
        this.verifyMate();
    }

    verifyMate() {
        const allOppenentMoves = this.pieces
            .filter((p) => p.color !== this.turn)
            .map((p) => p.possibleMoves(this))
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
