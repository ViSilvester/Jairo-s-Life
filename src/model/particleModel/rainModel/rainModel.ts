import { Camera } from "../../camera/camera.js";
import { Draw } from "../../draw/draw.js";
import { Vec2 } from "../../geometry/geometry.js";
import { Particle } from "../../particle/particle.js";
import { ParticleModel } from "../particleModel.js";

export class RainModel extends ParticleModel {

    constructor() {
        super();
        this.force.y = 0.8;
    }

    render(particle: Particle, draw: Draw, worldScale: number, camera: Camera): void {
        let p1 = new Vec2(
            (particle.point.x - (particle.velocity.x + this.force.x) - camera.VPos.x) * worldScale,
            (particle.point.y - (particle.velocity.y + this.force.y) - camera.VPos.y) * worldScale
        );
        let p2 = new Vec2(
            (particle.point.x - camera.VPos.x) * worldScale,
            (particle.point.y - camera.VPos.y) * worldScale
        );
        draw.line(p1, p2, 200, 200, 255);
    }

}