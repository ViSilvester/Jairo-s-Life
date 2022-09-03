import { Draw } from "../draw/draw.js";
import { geometryUtils, Vec2 } from "../geometry/geometry.js";

export class Player {
    pos: Vec2;
    vel: Vec2;
    radius: number;
    prePos: Vec2;
    private requestedVel: Vec2;
    private hasRequestAdd: boolean = false;
    isInGround: boolean = false;

    constructor(pos: Vec2, vel: Vec2, radius: number) {
        this.pos = pos;
        this.radius = radius;
        this.vel = vel;
        this.prePos = new Vec2(pos.x, pos.y);
        this.requestedVel = new Vec2(0, 0);
    }

    requestAddVel(vel: Vec2) {
        this.hasRequestAdd = true;
        this.requestedVel = vel;
    }

    render(draw: Draw, worldScale: number) {
        var p = new Vec2(
            this.pos.x * worldScale,
            this.pos.y * worldScale
        );
        draw.circle(p, this.radius * worldScale, 255, 0, 0);
    }

    update(world: Array<Vec2>) {

        // bkp

        this.prePos = new Vec2(this.pos.x, this.pos.y);

        // Aplica forças

        if (this.hasRequestAdd) {
            this.hasRequestAdd = false;
            this.vel.x += this.requestedVel.x;
            this.vel.y += this.requestedVel.y;
        }

        this.vel.y += 0.01;

        if (this.vel.y > 0.5) {
            this.vel.y = 0.5;
        }
        this.pos.y += this.vel.y;


        // Atualiza posição

        // detecção de colisão

        var p1 = new Vec2(this.pos.x, this.pos.y);
        var p2 = new Vec2(this.pos.x, this.pos.y + this.radius);
        var geoUtils = new geometryUtils();

        for (var i = 0; i < world.length; i += 2) {
            var result = new Vec2(0, 0);
            if (geoUtils.intersect(p1, p2, world[i], world[i + 1], result)) {
                var vecFromColPt = new Vec2(
                    this.pos.x - result.x,
                    this.pos.y - result.y
                )
                var unitVec = geoUtils.vetorUnit(vecFromColPt);
                unitVec.x *= this.radius;
                unitVec.y *= this.radius;

                this.pos.x = result.x + unitVec.x;
                this.pos.y = result.y + unitVec.y;

                this.isInGround = true;
            }
        }

        this.pos.x += this.vel.x;

        // reseta forças

        this.vel.x = 0;

    }
}   