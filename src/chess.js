import { Piece } from './pieces/piece.js';
import { piecesInstances } from './pieces-instance.js';

export class ChessGame {
    pieces = piecesInstances;
    turn = 'white';
    winner = null;
    history = [];
    #selectedPiece = null;

    get selectedPiece() {
        return this.#selectedPiece;
    }

    set selectedPiece(value) {
        this.#selectedPiece = value;
    }

    get possibleMoves() {
        return this.selectedPiece?.possibleMoves(this) ?? [];
    }

    reset() {
        this.pieces = piecesInstances;
        this.turn = 'white';
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
        console.log(move);

        const piecesCopy = [...this.pieces];
        const selectedPiecePos = this.selectedPiece.pos;
        const rollBack = (rook, rookPos) => {
            this.pieces = piecesCopy;
            this.selectedPiece.pos = selectedPiecePos;
            this.selectedPiece.pristine = true;

            if (rook && rookPos) {
                rook.pristine = true;
                rook.pos = rookPos;
            }
            this.selectedPiece = null;
        };

        if (this.getPieceAtBoardPos(move)) {
            this.pieces = this.pieces.filter(
                (p) => p !== this.getPieceAtBoardPos(move)
            );
        }

        if (move.rock) {
            if (move.x > this.selectedPiece.toBoardPos.x) {
                while (this.selectedPiece.toBoardPos.x < move.x) {
                    this.selectedPiece.move({
                        x: this.selectedPiece.toBoardPos.x + 1,
                        y: this.selectedPiece.toBoardPos.y,
                    });
                    if (this.verifyCheck()) {
                        break;
                    }
                }
            } else {
                while (this.selectedPiece.toBoardPos.x > move.x) {
                    this.selectedPiece.move({
                        x: this.selectedPiece.toBoardPos.x - 1,
                        y: this.selectedPiece.toBoardPos.y,
                    });
                    if (this.verifyCheck()) {
                        break;
                    }
                }
            }
        } else {
            this.selectedPiece.move(move);
        }

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

        let rook;
        let rookPos;

        if (move.rock) {
            rook = this.getPieceAtBoardPos({
                x: move.x === 2 ? 0 : 7,
                y: this.selectedPiece.color === 'white' ? 7 : 0,
            });

            rookPos = rook.pos;

            rook.move({
                x: move.x === 2 ? 3 : 5,
                y: this.selectedPiece.color === 'white' ? 7 : 0,
            });
        }

        if (this.verifyCheck()) {
            rollBack(rook, rookPos);
        } else {
            this.addHistory(this.selectedPiece);
            this.selectedPiece = null;
            this.playTurn();
        }
    }

    addHistory(piece) {
        this.history.push([
            piece.color,
            piece.type,
            piece.pos[0],
            piece.pos[1],
        ]);
        const historyElement = document.getElementById('history');
        historyElement.innerHTML = '';

        this.history.forEach((h) => {
            const liElement = document.createElement('li');
            liElement.innerText = `${
                h[0]
            }: ${h[1].toUpperCase()}${h[2].toLowerCase()}-${h[3]}`;
            historyElement.appendChild(liElement);
        });
    }

    getPieceAtBoardPos(pos) {
        return this.pieces.find(
            (p) => p.toBoardPos.x === pos.x && p.toBoardPos.y === pos.y
        );
    }
}
