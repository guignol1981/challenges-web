import { Piece } from './piece.js';

export class King extends Piece {
    type = 'K';

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

        pos = { ...this.toBoardPos };
        obstacle = false;
        while (pos.y > 0 && pos.x > 0 && !obstacle) {
            pos.y--;
            pos.x--;
            obstacle = chessGame.getPieceAtBoardPos(pos);

            if (!obstacle || obstacle.color !== this.color) {
                possibleMoves.push({ ...pos });
            }
        }

        pos = { ...this.toBoardPos };
        obstacle = false;
        while (pos.y < 8 && pos.x < 8 && !obstacle) {
            pos.y++;
            pos.x++;
            obstacle = chessGame.getPieceAtBoardPos(pos);

            if (!obstacle || obstacle.color !== this.color) {
                possibleMoves.push({ ...pos });
            }
        }

        pos = { ...this.toBoardPos };
        obstacle = false;
        while (pos.x < 8 && pos.y > 0 && !obstacle) {
            pos.x++;
            pos.y--;
            obstacle = chessGame.getPieceAtBoardPos(pos);
            if (!obstacle || obstacle.color !== this.color) {
                possibleMoves.push({ ...pos });
            }
        }

        pos = { ...this.toBoardPos };
        obstacle = false;
        while (pos.x > 0 && pos.y < 8 && !obstacle) {
            pos.x--;
            pos.y++;
            obstacle = chessGame.getPieceAtBoardPos(pos);
            if (!obstacle || obstacle.color !== this.color) {
                possibleMoves.push({ ...pos });
            }
        }

        const leftPristineRook = chessGame.pieces.find(
            (p) =>
                p.color === this.color &&
                p.type === 'r' &&
                p.pristine &&
                p.toBoardPos.x < this.toBoardPos.x
        );
        const rightPristineRook = chessGame.pieces.find(
            (p) =>
                p.color === this.color &&
                p.type === 'r' &&
                p.pristine &&
                p.toBoardPos.x > this.toBoardPos.x
        );
        if (
            leftPristineRook &&
            this.pristine &&
            [
                { x: this.toBoardPos.x - 1, y: this.toBoardPos.y },
                { x: this.toBoardPos.x - 2, y: this.toBoardPos.y },
                { x: this.toBoardPos.x - 3, y: this.toBoardPos.y },
            ].every((pos) => !chessGame.getPieceAtBoardPos(pos))
        ) {
            possibleMoves.push({
                x: this.toBoardPos.x - 2,
                y: this.toBoardPos.y,
                rock: true,
            });
        }

        if (
            rightPristineRook &&
            this.pristine &&
            [
                { x: this.toBoardPos.x + 1, y: this.toBoardPos.y },
                { x: this.toBoardPos.x + 2, y: this.toBoardPos.y },
            ].every((pos) => !chessGame.getPieceAtBoardPos(pos))
        ) {
            possibleMoves.push({
                x: this.toBoardPos.x + 2,
                y: this.toBoardPos.y,
                rock: true,
            });
        }

        return possibleMoves.filter(
            (m) =>
                m.rock ||
                (Math.max(m.x, this.toBoardPos.x) -
                    Math.min(m.x, this.toBoardPos.x) <=
                    1 &&
                    Math.max(m.y, this.toBoardPos.y) -
                        Math.min(m.y, this.toBoardPos.y) <=
                        1)
        );
    }
}
