export class Piece {
    type;
    constructor(color, pos, moves) {
        this.color = color;
        this.pos = pos;
        this.moves = moves;
    }

    get toBoardPos() {
        return {
            x: 'ABCDEFGH'.split('').indexOf(this.pos[0]),
            y: 8 - this.pos[1],
        };
    }

    setPosWithBoardPos(boardPos) {
        this.pos = ['ABCDEFGH'.split('')[boardPos.x], 8 - boardPos.y];
    }

    possibleMoves() {}
}
