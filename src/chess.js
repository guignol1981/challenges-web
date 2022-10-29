import { Piece } from './piece.js';

export class Chess {
    pieces = [
        new Piece('p', 'white', ['A', 2]),
        new Piece('p', 'white', ['B', 2]),
        new Piece('p', 'white', ['C', 2]),
        new Piece('p', 'white', ['D', 2]),
        new Piece('p', 'white', ['E', 2]),
        new Piece('p', 'white', ['F', 2]),
        new Piece('p', 'white', ['G', 2]),
        new Piece('p', 'white', ['H', 2]),
        new Piece('r', 'white', ['A', 1]),
        new Piece('k', 'white', ['B', 1]),
        new Piece('b', 'white', ['C', 1]),
        new Piece('q', 'white', ['D', 1]),
        new Piece('K', 'white', ['E', 1]),
        new Piece('b', 'white', ['F', 1]),
        new Piece('k', 'white', ['G', 1]),
        new Piece('r', 'white', ['H', 1]),
        new Piece('p', 'black', ['A', 7]),
        new Piece('p', 'black', ['B', 7]),
        new Piece('p', 'black', ['C', 7]),
        new Piece('p', 'black', ['D', 7]),
        new Piece('p', 'black', ['E', 7]),
        new Piece('p', 'black', ['F', 7]),
        new Piece('p', 'black', ['G', 7]),
        new Piece('p', 'black', ['H', 7]),
        new Piece('r', 'black', ['A', 8]),
        new Piece('k', 'black', ['B', 8]),
        new Piece('b', 'black', ['C', 8]),
        new Piece('q', 'black', ['D', 8]),
        new Piece('K', 'black', ['E', 8]),
        new Piece('b', 'black', ['F', 8]),
        new Piece('k', 'black', ['G', 8]),
        new Piece('r', 'black', ['H', 8]),
    ];

    getPiecePosToBoardPos(pos) {
        return this.pieces.find(
            (p) => p.toBoardPos.x === pos.x && p.toBoardPos.y === pos.y
        );
    }
}
