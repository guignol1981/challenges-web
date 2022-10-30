import { Piece } from './piece.js';

export class Rook extends Piece {
    type = 'r';

    possibleMoves(chessGame) {
        const possibleMoves = [];
        let pos = { ...this.toBoardPos };
        let obstacle = false;
        while (pos.y > 0 && !obstacle) {
            pos.y--;
            obstacle = chessGame.getPieceAtBoardPos(pos);

            if (!obstacle || obstacle.color !== this.color) {
                possibleMoves.push({ ...pos });
            }
        }

        pos = { ...this.toBoardPos };
        obstacle = false;
        while (pos.y < 8 && !obstacle) {
            pos.y++;
            obstacle = chessGame.getPieceAtBoardPos(pos);

            if (!obstacle || obstacle.color !== this.color) {
                possibleMoves.push({ ...pos });
            }
        }

        pos = { ...this.toBoardPos };
        obstacle = false;
        while (pos.x < 8 && !obstacle) {
            pos.x++;
            obstacle = chessGame.getPieceAtBoardPos(pos);
            if (!obstacle || obstacle.color !== this.color) {
                possibleMoves.push({ ...pos });
            }
        }

        pos = { ...this.toBoardPos };
        obstacle = false;
        while (pos.x > 0 && !obstacle) {
            pos.x--;
            obstacle = chessGame.getPieceAtBoardPos(pos);
            if (!obstacle || obstacle.color !== this.color) {
                possibleMoves.push({ ...pos });
            }
        }

        const king = chessGame.pieces.find(
            (p) => p.color === this.color && p.type === 'K'
        );
        if (this.pristine && king.pristine) {
            let canRock = true;
            if (king.toBoardPos.x > this.toBoardPos.x) {
                for (
                    let index = 1;
                    index < king.toBoardPos.x - this.toBoardPos.x;
                    index++
                ) {
                    if (
                        chessGame.getPieceAtBoardPos({
                            x: this.toBoardPos.x + index,
                            y: this.toBoardPos.y,
                        })
                    ) {
                        canRock = false;
                        break;
                    }
                }

                if (canRock) {
                    possibleMoves.push({
                        x: 3,
                        y: this.toBoardPos.y,
                        rock: true,
                    });
                }
            } else {
                for (
                    let index = 1;
                    index < this.toBoardPos.x - king.toBoardPos.x;
                    index++
                ) {
                    if (
                        chessGame.getPieceAtBoardPos({
                            x: this.toBoardPos.x - index,
                            y: this.toBoardPos.y,
                        })
                    ) {
                        canRock = false;
                        break;
                    }
                }
                if (canRock) {
                    possibleMoves.push({
                        x: 5,
                        y: this.toBoardPos.y,
                        rock: true,
                    });
                }
            }
        }

        return possibleMoves;
    }
}
