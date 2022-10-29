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
        const allowedMoves = [];
        if (!this.selectedPiece) return allowedMoves;

        switch (this.selectedPiece.type) {
            case 'p': {
                if (this.selectedPiece.color === 'white') {
                    const pristine = this.selectedPiece.toBoardPos.y === 6;

                    if (
                        this.getPieceAtBoardPos({
                            x: this.selectedPiece.toBoardPos.x + 1,
                            y: this.selectedPiece.toBoardPos.y - 1,
                        })?.color === 'black'
                    ) {
                        allowedMoves.push({
                            x: this.selectedPiece.toBoardPos.x + 1,
                            y: this.selectedPiece.toBoardPos.y - 1,
                        });
                    }

                    if (
                        this.getPieceAtBoardPos({
                            x: this.selectedPiece.toBoardPos.x - 1,
                            y: this.selectedPiece.toBoardPos.y - 1,
                        })?.color === 'black'
                    ) {
                        allowedMoves.push({
                            x: this.selectedPiece.toBoardPos.x - 1,
                            y: this.selectedPiece.toBoardPos.y - 1,
                        });
                    }

                    let obstacle;
                    for (
                        let index = 1;
                        index < (pristine ? 2 : 1) + 1;
                        index++
                    ) {
                        obstacle = this.getPieceAtBoardPos({
                            x: this.selectedPiece.toBoardPos.x,
                            y: this.selectedPiece.toBoardPos.y - index,
                        });

                        if (obstacle) break;

                        allowedMoves.push({
                            x: this.selectedPiece.toBoardPos.x,
                            y: this.selectedPiece.toBoardPos.y - index,
                        });
                    }
                } else {
                    const pristine = this.selectedPiece.toBoardPos.y === 1;

                    if (
                        this.getPieceAtBoardPos({
                            x: this.selectedPiece.toBoardPos.x + 1,
                            y: this.selectedPiece.toBoardPos.y + 1,
                        })?.color === 'white'
                    ) {
                        allowedMoves.push({
                            x: this.selectedPiece.toBoardPos.x + 1,
                            y: this.selectedPiece.toBoardPos.y + 1,
                        });
                    }

                    if (
                        this.getPieceAtBoardPos({
                            x: this.selectedPiece.toBoardPos.x - 1,
                            y: this.selectedPiece.toBoardPos.y + 1,
                        })?.color === 'white'
                    ) {
                        allowedMoves.push({
                            x: this.selectedPiece.toBoardPos.x - 1,
                            y: this.selectedPiece.toBoardPos.y + 1,
                        });
                    }

                    let obstacle;
                    for (
                        let index = 1;
                        index < (pristine ? 2 : 1) + 1;
                        index++
                    ) {
                        obstacle = this.getPieceAtBoardPos({
                            x: this.selectedPiece.toBoardPos.x,
                            y: this.selectedPiece.toBoardPos.y + index,
                        });

                        if (obstacle) break;

                        allowedMoves.push({
                            x: this.selectedPiece.toBoardPos.x,
                            y: this.selectedPiece.toBoardPos.y + index,
                        });
                    }
                }
                return allowedMoves;
            }
            case 'r': {
                let pos = { ...this.selectedPiece.toBoardPos };
                let obstacle = false;
                while (pos.y > 0 && !obstacle) {
                    pos.y--;
                    obstacle = this.getPieceAtBoardPos(pos);

                    if (
                        !obstacle ||
                        obstacle.color !== this.selectedPiece.color
                    ) {
                        allowedMoves.push({ ...pos });
                    }
                }

                pos = { ...this.selectedPiece.toBoardPos };
                obstacle = false;
                while (pos.y < 8 && !obstacle) {
                    pos.y++;
                    obstacle = this.getPieceAtBoardPos(pos);

                    if (
                        !obstacle ||
                        obstacle.color !== this.selectedPiece.color
                    ) {
                        allowedMoves.push({ ...pos });
                    }
                }

                pos = { ...this.selectedPiece.toBoardPos };
                obstacle = false;
                while (pos.x < 8 && !obstacle) {
                    pos.x++;
                    obstacle = this.getPieceAtBoardPos(pos);
                    if (
                        !obstacle ||
                        obstacle.color !== this.selectedPiece.color
                    ) {
                        allowedMoves.push({ ...pos });
                    }
                }

                pos = { ...this.selectedPiece.toBoardPos };
                obstacle = false;
                while (pos.x > 0 && !obstacle) {
                    pos.x--;
                    obstacle = this.getPieceAtBoardPos(pos);
                    if (
                        !obstacle ||
                        obstacle.color !== this.selectedPiece.color
                    ) {
                        allowedMoves.push({ ...pos });
                    }
                }
                return allowedMoves;
            }
            case 'b': {
                let pos = { ...this.selectedPiece.toBoardPos };
                let obstacle = false;
                while (pos.y > 0 && !obstacle) {
                    pos.y--;
                    obstacle = this.getPieceAtBoardPos(pos);

                    if (
                        !obstacle ||
                        obstacle.color !== this.selectedPiece.color
                    ) {
                        allowedMoves.push({ ...pos });
                    }
                }

                pos = { ...this.selectedPiece.toBoardPos };
                obstacle = false;
                while (pos.y < 8 && !obstacle) {
                    pos.y++;
                    obstacle = this.getPieceAtBoardPos(pos);

                    if (
                        !obstacle ||
                        obstacle.color !== this.selectedPiece.color
                    ) {
                        allowedMoves.push({ ...pos });
                    }
                }

                pos = { ...this.selectedPiece.toBoardPos };
                obstacle = false;
                while (pos.x < 8 && !obstacle) {
                    pos.x++;
                    obstacle = this.getPieceAtBoardPos(pos);
                    if (
                        !obstacle ||
                        obstacle.color !== this.selectedPiece.color
                    ) {
                        allowedMoves.push({ ...pos });
                    }
                }

                pos = { ...this.selectedPiece.toBoardPos };
                obstacle = false;
                while (pos.x > 0 && !obstacle) {
                    pos.x--;
                    obstacle = this.getPieceAtBoardPos(pos);
                    if (
                        !obstacle ||
                        obstacle.color !== this.selectedPiece.color
                    ) {
                        allowedMoves.push({ ...pos });
                    }
                }
                return allowedMoves;
            }
        }
    }

    getPieceAtBoardPos(pos) {
        return this.pieces.find(
            (p) => p.toBoardPos.x === pos.x && p.toBoardPos.y === pos.y
        );
    }
}
