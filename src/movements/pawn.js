export const pawnMovements = (chessGame) => {
    const allowedMoves = [];
    let pawn = chessGame.selectedPiece;

    if (pawn.color === 'white') {
        const pristine = pawn.toBoardPos.y === 6;

        if (
            chessGame.getPieceAtBoardPos({
                x: pawn.toBoardPos.x + 1,
                y: pawn.toBoardPos.y - 1,
            })?.color === 'black'
        ) {
            allowedMoves.push({
                x: pawn.toBoardPos.x + 1,
                y: pawn.toBoardPos.y - 1,
            });
        }

        if (
            chessGame.getPieceAtBoardPos({
                x: pawn.toBoardPos.x - 1,
                y: pawn.toBoardPos.y - 1,
            })?.color === 'black'
        ) {
            allowedMoves.push({
                x: pawn.toBoardPos.x - 1,
                y: pawn.toBoardPos.y - 1,
            });
        }

        let obstacle;
        for (let index = 1; index < (pristine ? 2 : 1) + 1; index++) {
            obstacle = chessGame.getPieceAtBoardPos({
                x: pawn.toBoardPos.x,
                y: pawn.toBoardPos.y - index,
            });

            if (obstacle) break;

            allowedMoves.push({
                x: pawn.toBoardPos.x,
                y: pawn.toBoardPos.y - index,
            });
        }
    } else {
        const pristine = pawn.toBoardPos.y === 1;

        if (
            chessGame.getPieceAtBoardPos({
                x: pawn.toBoardPos.x + 1,
                y: pawn.toBoardPos.y + 1,
            })?.color === 'white'
        ) {
            allowedMoves.push({
                x: pawn.toBoardPos.x + 1,
                y: pawn.toBoardPos.y + 1,
            });
        }

        if (
            chessGame.getPieceAtBoardPos({
                x: pawn.toBoardPos.x - 1,
                y: pawn.toBoardPos.y + 1,
            })?.color === 'white'
        ) {
            allowedMoves.push({
                x: pawn.toBoardPos.x - 1,
                y: pawn.toBoardPos.y + 1,
            });
        }

        let obstacle;
        for (let index = 1; index < (pristine ? 2 : 1) + 1; index++) {
            obstacle = chessGame.getPieceAtBoardPos({
                x: pawn.toBoardPos.x,
                y: pawn.toBoardPos.y + index,
            });

            if (obstacle) break;

            allowedMoves.push({
                x: pawn.toBoardPos.x,
                y: pawn.toBoardPos.y + index,
            });
        }
    }
    return allowedMoves;
};
