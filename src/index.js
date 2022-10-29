import { Chess } from './chess.js';
import { piecesSprites } from './sprites-map.js';
const boardCanvas = document.getElementById('boardCanvas');
const piecesCanvas = document.getElementById('piecesCanvas');
const hudCanvas = document.getElementById('hudCanvas');

const SQUARE_SIZE = boardCanvas.width / 8;
const sprites = { white: {}, black: {} };
const chessGame = new Chess();

const drawBoard = () => {
    const ctx = boardCanvas.getContext('2d');
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
    const ctx = piecesCanvas.getContext('2d');

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

const loadSprites = () => {
    return Promise.all(
        piecesSprites.map(
            (ps) =>
                new Promise((res) => {
                    ps.sprite.onload = () => res();
                    ps.sprite.src = `./sprites/${ps.file}`;
                })
        )
    );
};

const draw = () => {
    drawBoard();
    drawPieces();
};

const start = async () => {
    await loadSprites();
    draw();
};

start();

const cursorPosToBoardPos = (event) => {
    const rect = boardCanvas.getBoundingClientRect();

    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    if (x < 0 || y < 0 || x > boardCanvas.width || y > boardCanvas.height)
        return;

    x = Math.floor(x / SQUARE_SIZE);
    y = Math.floor(y / SQUARE_SIZE);

    return { x, y };
};

addEventListener('click', (event) => {
    const mouseBoardPos = cursorPosToBoardPos(event);

    if (!mouseBoardPos) return;

    const selectedPiece = chessGame.getPieceAtBoardPos(mouseBoardPos);

    if (selectedPiece) {
        selectedPiece.selected = !selectedPiece.selected;
    }
});
