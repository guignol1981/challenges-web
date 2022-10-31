import { ChessGame } from './chess.js';
import { cursorPosToBoardPos } from './pointer-utils.js';
import { loadSprites, piecesSprites } from './sprites-map.js';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const SQUARE_SIZE = canvas.width / 8;
const chessGame = new ChessGame();

const drawBoard = () => {
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

const drawPieces = () => {
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

const drawHud = () => {
    if (chessGame.selectedPiece) {
        ctx.fillStyle = '#1893d76e';
        ctx.fillRect(
            chessGame.selectedPiece.toBoardPos.x * SQUARE_SIZE,
            chessGame.selectedPiece.toBoardPos.y * SQUARE_SIZE,
            SQUARE_SIZE,
            SQUARE_SIZE
        );

        chessGame.possibleMoves.forEach((am) => {
            if (am.rock) {
                ctx.fillStyle = 'red';
            } else {
                ctx.fillStyle = '#22cd3791';
            }
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBoard();
    drawPieces();
    drawHud();
};

addEventListener('click', (event) => {
    const mouseBoardPos = cursorPosToBoardPos(event, canvas);

    if (!mouseBoardPos) return;

    const moveTo = chessGame.possibleMoves.find(
        (am) => am.x === mouseBoardPos.x && am.y === mouseBoardPos.y
    );

    if (moveTo) {
        chessGame.movePiece(moveTo);
        return;
    }

    const selectedPiece = chessGame.getPieceAtBoardPos(mouseBoardPos);

    if (selectedPiece && selectedPiece.color !== chessGame.turn) {
        return;
    }

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
