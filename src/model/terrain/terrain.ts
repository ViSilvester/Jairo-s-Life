import { Camera } from "../camera/camera.js";
import { Draw } from "../draw/draw.js";
import { Vec2 } from "../geometry/geometry.js";

export class Terrain {


    ground: Array<Vec2> = [];
    baseGroundLevel: number;
    groundSize = 1000000;

    constructor(baseGroundLevel: number) {
        this.baseGroundLevel = baseGroundLevel;
    }

    create(): void {
        var lastValue = this.baseGroundLevel;
        for (var i = 0; i < this.groundSize / 10; i++) {

            var value = Math.random() * 5;
            if (Math.random() >= 0.5) {
                value *= -1;
            }
            this.ground.push(
                new Vec2(
                    i * 10,
                    lastValue + value
                )
            )
            lastValue = lastValue + value;
        }
    }

    getTerrainVertices(camera: Camera): Array<Vec2> {
        var vertices: Array<Vec2> = [];

        const start = Math.floor((camera.pos.x / 10));
        const end = Math.floor((camera.pos.x / 10) + 10);

        for (var i = start + 1; i < end; i++) {
            vertices.push(this.ground[i - 1]);
            vertices.push(this.ground[i]);
        }
        return vertices;
    }


    render(draw: Draw, worldScale: number, camera: Camera): void {

        const start = Math.floor(camera.VPos.x / 10);
        const end = Math.floor((camera.VPos.x / 10) + 9);



        for (var i = start; i < end; i++) {

            let p1 = new Vec2(
                (this.ground[i].x - camera.VPos.x) * worldScale,
                (this.ground[i].y - camera.VPos.y) * worldScale
            );
            let p2 = new Vec2(
                (this.ground[i + 1].x - camera.VPos.x) * worldScale,
                (this.ground[i + 1].y - camera.VPos.y) * worldScale
            );
            let p3 = new Vec2(
                (this.ground[i + 1].x - camera.VPos.x) * worldScale,
                draw.height
            );
            let p4 = new Vec2(
                (this.ground[i].x - camera.VPos.x) * worldScale,
                draw.height
            );

            let shape = [
                p1, p2, p3, p4
            ]

            // draw.line(
            //     p1,
            //     p2
            // )

            draw.fillShape(shape, 100, 50, 0);
        }
    }

}