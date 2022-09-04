import { Camera } from "../../camera/camera.js";
import { Draw } from "../../draw/draw.js";
import { Vec2 } from "../../geometry/geometry.js";
import { Particle } from "../../particle/particle.js";
import { ParticleModel } from "../particleModel.js";

export class SnowModel extends ParticleModel {

    constructor() {
        super();
        this.force.y = 0.3;
    }

    update(particle: Particle): void {
        super.update(particle);
    }

    render(particle: Particle, draw: Draw, worldScale: number, camera: Camera): void {

        let p = new Vec2(
            (particle.point.x - camera.VPos.x) * worldScale,
            (particle.point.y - camera.VPos.y) * worldScale
        );
        draw.circle(p, 1.2, 255, 255, 255)
    }
}