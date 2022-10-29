import { Piece } from './piece.js';

export class Bishop extends Piece {
    type = 'b';

    possibleMoves(chessGame) {
        const possibleMoves = [];
        let pos = { ...this.toBoardPos };
        let obstacle = false;

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
        return possibleMoves;
    }
}
