export const bishopMovements = (chessGame) => {
    const allowedMoves = [];
    let bishop = chessGame.selectedPiece;
    let pos = { ...bishop.toBoardPos };
    let obstacle = false;

    while (pos.y > 0 && pos.x > 0 && !obstacle) {
        pos.y--;
        pos.x--;
        obstacle = chessGame.getPieceAtBoardPos(pos);

        if (!obstacle || obstacle.color !== bishop.color) {
            allowedMoves.push({ ...pos });
        }
    }

    pos = { ...bishop.toBoardPos };
    obstacle = false;
    while (pos.y < 8 && pos.x < 8 && !obstacle) {
        pos.y++;
        pos.x++;
        obstacle = chessGame.getPieceAtBoardPos(pos);

        if (!obstacle || obstacle.color !== bishop.color) {
            allowedMoves.push({ ...pos });
        }
    }

    pos = { ...bishop.toBoardPos };
    obstacle = false;
    while (pos.x < 8 && pos.y > 0 && !obstacle) {
        pos.x++;
        pos.y--;
        obstacle = chessGame.getPieceAtBoardPos(pos);
        if (!obstacle || obstacle.color !== bishop.color) {
            allowedMoves.push({ ...pos });
        }
    }

    pos = { ...bishop.toBoardPos };
    obstacle = false;
    while (pos.x > 0 && pos.y < 8 && !obstacle) {
        pos.x--;
        pos.y++;
        obstacle = chessGame.getPieceAtBoardPos(pos);
        if (!obstacle || obstacle.color !== bishop.color) {
            allowedMoves.push({ ...pos });
        }
    }
    return allowedMoves;
};
