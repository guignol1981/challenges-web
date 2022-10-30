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

    reset() {
        this.pieces = piecesInstances;
        this.turn = white;
    }

    playTurn() {
        this.turn = this.turn === 'white' ? 'black' : 'white';
        if (this.verifyMate()) {
            alert(this.turn === 'white' ? 'black win' : 'white win');
            this.reset();
        }
    }

    verifyCheck() {
        const allOppenentMoves = this.pieces
            .filter((p) => p.color !== this.turn)
            .map((p) => p.possibleMoves(this))
            .flat();

        const king = this.pieces.find(
            (p) => p.type === 'K' && p.color === this.turn
        );

        const check = !!allOppenentMoves.some(
            (om) => om.x === king.toBoardPos.x && om.y == king.toBoardPos.y
        );

        return check;
    }

    verifyMate() {
        const piecesCopy = [...this.pieces].map((p) =>
            Object.assign(Object.create(Object.getPrototypeOf(p)), p)
        );

        const turnPieces = this.pieces.filter((p) => p.color === this.turn);

        const mate = turnPieces.every((piece) => {
            const pieceCopy = Object.assign(
                Object.create(Object.getPrototypeOf(piece)),
                piece
            );

            return piece.possibleMoves(this).every((move) => {
                piece.pos = pieceCopy.pos;

                const target = this.getPieceAtBoardPos(move);

                if (target) {
                    this.pieces = this.pieces.filter((p) => p !== target);
                }

                piece.move(move);

                const check = this.verifyCheck();

                if (target) this.pieces.push(target);

                return check;
            });
        });

        this.pieces = piecesCopy;

        return mate;
    }

    movePiece(move) {
        if (this.selectedPiece.color !== this.turn) return;

        const piecesCopy = [...this.pieces];
        const selectedPiecePos = this.selectedPiece.pos;

        if (this.getPieceAtBoardPos(move)) {
            this.pieces = this.pieces.filter(
                (p) => p !== this.getPieceAtBoardPos(move)
            );
        }

        this.selectedPiece.move(move);

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

        if (this.verifyCheck()) {
            this.pieces = piecesCopy;
            this.selectedPiece.pos = selectedPiecePos;
            this.selectedPiece = null;
        } else {
            this.selectedPiece = null;
            this.playTurn();
        }
    }

    getPieceAtBoardPos(pos) {
        return this.pieces.find(
            (p) => p.toBoardPos.x === pos.x && p.toBoardPos.y === pos.y
        );
    }
}
