export const rookMovements = (chessGame) => {
    const allowedMoves = [];
    const rook = chessGame.selectedPiece;
    let pos = { ...rook.toBoardPos };
    let obstacle = false;
    while (pos.y > 0 && !obstacle) {
        pos.y--;
        obstacle = chessGame.getPieceAtBoardPos(pos);

        if (!obstacle || obstacle.color !== rook.color) {
            allowedMoves.push({ ...pos });
        }
    }

    pos = { ...rook.toBoardPos };
    obstacle = false;
    while (pos.y < 8 && !obstacle) {
        pos.y++;
        obstacle = chessGame.getPieceAtBoardPos(pos);

        if (!obstacle || obstacle.color !== rook.color) {
            allowedMoves.push({ ...pos });
        }
    }

    pos = { ...rook.toBoardPos };
    obstacle = false;
    while (pos.x < 8 && !obstacle) {
        pos.x++;
        obstacle = chessGame.getPieceAtBoardPos(pos);
        if (!obstacle || obstacle.color !== rook.color) {
            allowedMoves.push({ ...pos });
        }
    }

    pos = { ...rook.toBoardPos };
    obstacle = false;
    while (pos.x > 0 && !obstacle) {
        pos.x--;
        obstacle = chessGame.getPieceAtBoardPos(pos);
        if (!obstacle || obstacle.color !== rook.color) {
            allowedMoves.push({ ...pos });
        }
    }
    return allowedMoves;
};
