export class ParticleModel {
    update(particle) {
        particle.point.x += particle.velocity.x;
        particle.point.y += particle.velocity.y;
    }
    ;
}
