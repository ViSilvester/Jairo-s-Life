import { Draw } from "../draw/draw.js";
import { Vec2 } from "../geometry/geometry.js";

export class Terrain {


    ground: Array<Vec2> = [];
    baseGroundLevel: number;

    constructor(baseGroundLevel: number) {
        this.baseGroundLevel = baseGroundLevel;
    }

    create(): void {
        var lastValue = 0;
        for (var i = 0; i < 10; i++) {

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


    render(draw: Draw, worldScale: number): void {

        for (var i = 0; i < this.ground.length - 1; i++) {

            let p1 = new Vec2(
                this.ground[i].x * worldScale,
                draw.height - (this.ground[i].y + this.baseGroundLevel) * worldScale
            );
            let p2 = new Vec2(
                this.ground[i + 1].x * worldScale,
                draw.height - (this.ground[i + 1].y + this.baseGroundLevel) * worldScale
            );
            let p3 = new Vec2(
                this.ground[i + 1].x * worldScale,
                draw.height
            );
            let p4 = new Vec2(
                this.ground[i].x * worldScale,
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