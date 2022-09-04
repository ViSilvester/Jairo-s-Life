import { Vec2 } from "../geometry/geometry.js";

export class Camera {

    pos: Vec2;
    VPos: Vec2;
    offsetX: number;
    offsetY: number;
    worldLimit: number;

    constructor(target: Vec2, worldWidth: number, worldHeight: number, worldLimit: number) {
        this.pos = target;
        this.offsetX = worldWidth / 2;
        this.offsetY = (worldHeight / 2) + 10;
        this.VPos = new Vec2(this.pos.x - this.offsetX, this.pos.y - this.offsetY);
        this.worldLimit = worldLimit;
    }

    update(target: Vec2) {
        this.pos.x = target.x;
        this.pos.y = target.y;

        if (this.pos.x - this.offsetX < 0) {
            this.pos.x = this.offsetX;
        }

        if (this.pos.x + this.offsetX > this.worldLimit) {
            this.pos.x = this.worldLimit - this.offsetX;
        }

        this.VPos.x = this.pos.x - this.offsetX;
        this.VPos.y = this.pos.y - this.offsetY;


    }

}