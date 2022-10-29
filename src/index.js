import { ChessGame } from './chess.js';
import { cursorPosToBoardPos } from './pointer-utils.js';
import { loadSprites, piecesSprites } from './sprites-map.js';
const boardCanvas = document.getElementById('boardCanvas');
const piecesCanvas = document.getElementById('piecesCanvas');
const hudCanvas = document.getElementById('hudCanvas');

const SQUARE_SIZE = boardCanvas.width / 8;
const chessGame = new ChessGame();

const drawBoard = (ctx) => {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (j % 2) {
                if (i % 2) {
                    ctx.fillStyle = '#fae8a8';
                } else {
                    ctx.fillStyle = '#135f4b';
                }
            } else {
                if (i % 2) {
                    ctx.fillStyle = '#135f4b';
                } else {
                    ctx.fillStyle = '#fae8a8';
                }
            }

            ctx.fillRect(
                SQUARE_SIZE * j,
                SQUARE_SIZE * i,
                SQUARE_SIZE,
                SQUARE_SIZE
            );
        }
    }
};

const drawPieces = (ctx) => {
    chessGame.pieces.forEach((piece) => {
        const { sprite } = piecesSprites.find(
            (ps) => ps.type === piece.type && ps.color === piece.color
        );
        ctx.drawImage(
            sprite,
            0,
            0,
            sprite.width,
            sprite.height,
            piece.toBoardPos.x * SQUARE_SIZE,
            piece.toBoardPos.y * SQUARE_SIZE,
            SQUARE_SIZE,
            SQUARE_SIZE
        );
    });
};

const drawHud = (ctx) => {
    if (chessGame.selectedPiece) {
        ctx.fillStyle = '#1893d76e';
        ctx.fillRect(
            chessGame.selectedPiece.toBoardPos.x * SQUARE_SIZE,
            chessGame.selectedPiece.toBoardPos.y * SQUARE_SIZE,
            SQUARE_SIZE,
            SQUARE_SIZE
        );

        ctx.fillStyle = '#22cd3791';
        chessGame.allowedMoves.forEach((am) => {
            ctx.fillRect(
                am.x * SQUARE_SIZE,
                am.y * SQUARE_SIZE,
                SQUARE_SIZE,
                SQUARE_SIZE
            );
        });
    }
};

const draw = () => {
    const boardCtx = boardCanvas.getContext('2d');
    const piecesCtx = piecesCanvas.getContext('2d');
    const hudCtx = hudCanvas.getContext('2d');

    [boardCtx, piecesCtx, hudCtx].forEach((ctx) =>
        ctx.clearRect(0, 0, boardCanvas.width, boardCanvas.height)
    );

    drawBoard(boardCtx);
    drawPieces(piecesCtx);
    drawHud(hudCtx);
};

addEventListener('click', (event) => {
    const mouseBoardPos = cursorPosToBoardPos(event, SQUARE_SIZE);

    if (!mouseBoardPos) return;

    const moveTo = chessGame.allowedMoves.find(
        (am) => am.x === mouseBoardPos.x && am.y === mouseBoardPos.y
    );

    if (moveTo) {
        chessGame.selectedPiece.setPosWithBoardPos(mouseBoardPos);
        chessGame.selectedPiece = null;
        return;
    }

    const selectedPiece = chessGame.getPieceAtBoardPos(mouseBoardPos);

    chessGame.selectedPiece = selectedPiece ?? null;
});

const update = () => {};

let oldTimeStamp = 0;
const gameloop = (timeStamp) => {
    // let deltatime = (timeStamp - oldTimeStamp) / 1000;

    // oldTimeStamp = timeStamp;

    // let fps = Math.round(1 / deltatime);

    // console.log(fps);

    draw();
    update();
    requestAnimationFrame(gameloop);
};

const start = async () => {
    await loadSprites();
    gameloop();
};

start();
