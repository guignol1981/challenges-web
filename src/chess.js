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
        if (this.verifyMate()) {
            alert(this.turn, ' mate!');
        }
    }

    verifyCheck(pieces) {
        const allOppenentMoves = pieces
            .filter((p) => p.color !== this.turn)
            .map((p) => p.possibleMoves(this))
            .flat();

        const king = pieces.find(
            (p) => p.type === 'K' && p.color === this.turn
        );

        const check = !!allOppenentMoves.some(
            (om) => om.x === king.toBoardPos.x && om.y == king.toBoardPos.y
        );

        return check;
    }

    verifyMate() {
        const turnPieces = this.pieces.filter((p) => p.color === this.turn);

        const mate = turnPieces.every((piece) => {
            piece.possibleMoves(this).every((move) => {
                const piecesCopy = [...this.pieces];

                if (this.getPieceAtBoardPos(move)) {
                    piecesCopy = piecesCopy.filter(
                        (piece) => piece !== this.getPieceAtBoardPos(move)
                    );
                }

                return this.verifyCheck(piecesCopy);
            });
        });

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

        if (this.verifyCheck(this.pieces)) {
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
