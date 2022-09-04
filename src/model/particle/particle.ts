import { Camera } from "../camera/camera.js";
import { Draw } from "../draw/draw.js";
import { Vec2 } from "../geometry/geometry.js";
import { ParticleModel } from "../particleModel/particleModel.js";

export class Particle {
    point: Vec2;
    velocity: Vec2;
    private model: ParticleModel;

    constructor(x: number, y: number, velocity: Vec2, model: ParticleModel) {
        this.point = new Vec2(x, y);
        this.velocity = velocity;
        this.model = model;
    }

    update() {
        this.model.update(this);
    }

    render(draw: Draw, worldScale: number, camera: Camera) {
        this.model.render(this, draw, worldScale, camera);
    }
}