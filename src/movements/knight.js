export const knightMovements = (chessGame) => {
    const allowedMoves = [];
    let knight = chessGame.selectedPiece;

    if (
        knight.toBoardPos.x <= 6 &&
        knight.toBoardPos.y >= 2 &&
        chessGame.getPieceAtBoardPos({
            x: knight.toBoardPos.x + 1,
            y: knight.toBoardPos.y - 2,
        })?.color !== knight.color
    ) {
        allowedMoves.push({
            x: knight.toBoardPos.x + 1,
            y: knight.toBoardPos.y - 2,
        });
    }
    if (
        knight.toBoardPos.x <= 6 &&
        knight.toBoardPos.y <= 5 &&
        chessGame.getPieceAtBoardPos({
            x: knight.toBoardPos.x + 1,
            y: knight.toBoardPos.y + 2,
        })?.color !== knight.color
    ) {
        allowedMoves.push({
            x: knight.toBoardPos.x + 1,
            y: knight.toBoardPos.y + 2,
        });
    }
    if (
        knight.toBoardPos.x >= 1 &&
        knight.toBoardPos.y >= 2 &&
        chessGame.getPieceAtBoardPos({
            x: knight.toBoardPos.x - 1,
            y: knight.toBoardPos.y - 2,
        })?.color !== knight.color
    ) {
        allowedMoves.push({
            x: knight.toBoardPos.x - 1,
            y: knight.toBoardPos.y - 2,
        });
    }
    if (
        knight.toBoardPos.x >= 1 &&
        knight.toBoardPos.y <= 5 &&
        chessGame.getPieceAtBoardPos({
            x: knight.toBoardPos.x - 1,
            y: knight.toBoardPos.y + 2,
        })?.color !== knight.color
    ) {
        allowedMoves.push({
            x: knight.toBoardPos.x - 1,
            y: knight.toBoardPos.y + 2,
        });
    }
    if (
        knight.toBoardPos.y <= 6 &&
        knight.toBoardPos.x >= 2 &&
        chessGame.getPieceAtBoardPos({
            x: knight.toBoardPos.x - 2,
            y: knight.toBoardPos.y + 1,
        })?.color !== knight.color
    ) {
        allowedMoves.push({
            x: knight.toBoardPos.x - 2,
            y: knight.toBoardPos.y + 1,
        });
    }
    if (
        knight.toBoardPos.y <= 6 &&
        knight.toBoardPos.x <= 5 &&
        chessGame.getPieceAtBoardPos({
            x: knight.toBoardPos.x + 2,
            y: knight.toBoardPos.y + 1,
        })?.color !== knight.color
    ) {
        allowedMoves.push({
            x: knight.toBoardPos.x + 2,
            y: knight.toBoardPos.y + 1,
        });
    }
    if (
        knight.toBoardPos.y >= 1 &&
        knight.toBoardPos.x >= 2 &&
        chessGame.getPieceAtBoardPos({
            x: knight.toBoardPos.x - 2,
            y: knight.toBoardPos.y - 1,
        })?.color !== knight.color
    ) {
        allowedMoves.push({
            x: knight.toBoardPos.x - 2,
            y: knight.toBoardPos.y - 1,
        });
    }
    if (
        knight.toBoardPos.y >= 1 &&
        knight.toBoardPos.x <= 5 &&
        chessGame.getPieceAtBoardPos({
            x: knight.toBoardPos.x + 2,
            y: knight.toBoardPos.y - 1,
        })?.color !== knight.color
    ) {
        allowedMoves.push({
            x: knight.toBoardPos.x + 2,
            y: knight.toBoardPos.y - 1,
        });
    }

    return allowedMoves;
};
