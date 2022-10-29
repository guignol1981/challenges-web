import { Piece } from './piece.js';

export class Pawn extends Piece {
    type = 'p';

    possibleMoves(chessGame) {
        const possibleMoves = [];

        if (this.color === 'white') {
            const pristine = this.toBoardPos.y === 6;

            if (
                chessGame.getPieceAtBoardPos({
                    x: this.toBoardPos.x + 1,
                    y: this.toBoardPos.y - 1,
                })?.color === 'black'
            ) {
                possibleMoves.push({
                    x: this.toBoardPos.x + 1,
                    y: this.toBoardPos.y - 1,
                });
            }

            if (
                chessGame.getPieceAtBoardPos({
                    x: this.toBoardPos.x - 1,
                    y: this.toBoardPos.y - 1,
                })?.color === 'black'
            ) {
                possibleMoves.push({
                    x: this.toBoardPos.x - 1,
                    y: this.toBoardPos.y - 1,
                });
            }

            let obstacle;
            for (let index = 1; index < (pristine ? 2 : 1) + 1; index++) {
                obstacle = chessGame.getPieceAtBoardPos({
                    x: this.toBoardPos.x,
                    y: this.toBoardPos.y - index,
                });

                if (obstacle) break;

                possibleMoves.push({
                    x: this.toBoardPos.x,
                    y: this.toBoardPos.y - index,
                });
            }
        } else {
            const pristine = this.toBoardPos.y === 1;

            if (
                chessGame.getPieceAtBoardPos({
                    x: this.toBoardPos.x + 1,
                    y: this.toBoardPos.y + 1,
                })?.color === 'white'
            ) {
                possibleMoves.push({
                    x: this.toBoardPos.x + 1,
                    y: this.toBoardPos.y + 1,
                });
            }

            if (
                chessGame.getPieceAtBoardPos({
                    x: this.toBoardPos.x - 1,
                    y: this.toBoardPos.y + 1,
                })?.color === 'white'
            ) {
                possibleMoves.push({
                    x: this.toBoardPos.x - 1,
                    y: this.toBoardPos.y + 1,
                });
            }

            let obstacle;
            for (let index = 1; index < (pristine ? 2 : 1) + 1; index++) {
                obstacle = chessGame.getPieceAtBoardPos({
                    x: this.toBoardPos.x,
                    y: this.toBoardPos.y + index,
                });

                if (obstacle) break;

                possibleMoves.push({
                    x: this.toBoardPos.x,
                    y: this.toBoardPos.y + index,
                });
            }
        }
        return possibleMoves;
    }
}
