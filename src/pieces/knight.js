import { Piece } from './piece.js';

export class Knight extends Piece {
    type = 'k';

    possibleMoves(chessGame) {
        const possibleMoves = [];

        if (
            this.toBoardPos.x <= 6 &&
            this.toBoardPos.y >= 2 &&
            chessGame.getPieceAtBoardPos({
                x: this.toBoardPos.x + 1,
                y: this.toBoardPos.y - 2,
            })?.color !== this.color
        ) {
            possibleMoves.push({
                x: this.toBoardPos.x + 1,
                y: this.toBoardPos.y - 2,
            });
        }
        if (
            this.toBoardPos.x <= 6 &&
            this.toBoardPos.y <= 5 &&
            chessGame.getPieceAtBoardPos({
                x: this.toBoardPos.x + 1,
                y: this.toBoardPos.y + 2,
            })?.color !== this.color
        ) {
            possibleMoves.push({
                x: this.toBoardPos.x + 1,
                y: this.toBoardPos.y + 2,
            });
        }
        if (
            this.toBoardPos.x >= 1 &&
            this.toBoardPos.y >= 2 &&
            chessGame.getPieceAtBoardPos({
                x: this.toBoardPos.x - 1,
                y: this.toBoardPos.y - 2,
            })?.color !== this.color
        ) {
            possibleMoves.push({
                x: this.toBoardPos.x - 1,
                y: this.toBoardPos.y - 2,
            });
        }
        if (
            this.toBoardPos.x >= 1 &&
            this.toBoardPos.y <= 5 &&
            chessGame.getPieceAtBoardPos({
                x: this.toBoardPos.x - 1,
                y: this.toBoardPos.y + 2,
            })?.color !== this.color
        ) {
            possibleMoves.push({
                x: this.toBoardPos.x - 1,
                y: this.toBoardPos.y + 2,
            });
        }
        if (
            this.toBoardPos.y <= 6 &&
            this.toBoardPos.x >= 2 &&
            chessGame.getPieceAtBoardPos({
                x: this.toBoardPos.x - 2,
                y: this.toBoardPos.y + 1,
            })?.color !== this.color
        ) {
            possibleMoves.push({
                x: this.toBoardPos.x - 2,
                y: this.toBoardPos.y + 1,
            });
        }
        if (
            this.toBoardPos.y <= 6 &&
            this.toBoardPos.x <= 5 &&
            chessGame.getPieceAtBoardPos({
                x: this.toBoardPos.x + 2,
                y: this.toBoardPos.y + 1,
            })?.color !== this.color
        ) {
            possibleMoves.push({
                x: this.toBoardPos.x + 2,
                y: this.toBoardPos.y + 1,
            });
        }
        if (
            this.toBoardPos.y >= 1 &&
            this.toBoardPos.x >= 2 &&
            chessGame.getPieceAtBoardPos({
                x: this.toBoardPos.x - 2,
                y: this.toBoardPos.y - 1,
            })?.color !== this.color
        ) {
            possibleMoves.push({
                x: this.toBoardPos.x - 2,
                y: this.toBoardPos.y - 1,
            });
        }
        if (
            this.toBoardPos.y >= 1 &&
            this.toBoardPos.x <= 5 &&
            chessGame.getPieceAtBoardPos({
                x: this.toBoardPos.x + 2,
                y: this.toBoardPos.y - 1,
            })?.color !== this.color
        ) {
            possibleMoves.push({
                x: this.toBoardPos.x + 2,
                y: this.toBoardPos.y - 1,
            });
        }

        return possibleMoves;
    }
}
