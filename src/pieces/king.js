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

        return possibleMoves.filter(
            (m) =>
                Math.max(m.x, this.toBoardPos.x) -
                    Math.min(m.x, this.toBoardPos.x) <=
                    1 &&
                Math.max(m.y, this.toBoardPos.y) -
                    Math.min(m.y, this.toBoardPos.y) <=
                    1
        );
    }
}
