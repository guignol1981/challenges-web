export class Piece {
    selected = false;

    constructor(type, color, pos) {
        this.type = type;
        this.color = color;
        this.pos = pos;
    }

    get toBoardPos() {
        return {
            x: 'ABCDEFGH'.split('').indexOf(this.pos[0]),
            y: 8 - this.pos[1],
        };
    }
}
