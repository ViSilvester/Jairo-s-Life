
import { Camera } from "../../model/camera/camera.js";
import { Draw } from "../../model/draw/draw.js";
import { geometryUtils, Vec2, Vec3 } from "../../model/geometry/geometry.js";
import { Particle } from "../../model/particle/particle.js";
import { ParticleModel } from "../../model/particleModel/particleModel.js";
import { RainModel } from "../../model/particleModel/rainModel/rainModel.js";
import { SnowModel } from "../../model/particleModel/snowModel/snowModel.js";
import { SkyController } from "../skyController/skyController.js";
import { enumWeater } from "./enum_weather.js";

export class WeatherController {

    particles: Array<Particle>;
    wind: Vec2;
    targetWind: Vec2;
    currentWeather!: enumWeater;
    currentModel!: ParticleModel;
    spawnRate!: number;
    spawnQuantity!: number;
    turbulenceRange!: number;
    skyController: SkyController;
    windInterpolationLevel = 1;
    utils = new geometryUtils();


    constructor() {
        this.wind = new Vec2(0, 0);
        this.targetWind = this.wind;
        this.skyController = new SkyController(enumWeater.snow);
        this.particles = [];
        this.setWeather(enumWeater.snow);
    }

    setWeather(weather: enumWeater) {

        this.currentWeather = weather;
        switch (weather) {
            case enumWeater.snow:
                this.currentModel = new SnowModel();
                this.spawnRate = 0.1;
                this.spawnQuantity = 20;
                this.turbulenceRange = 0.025;
                break;
            case enumWeater.rain:
                this.currentModel = new RainModel();
                this.spawnRate = 0.5;
                this.spawnQuantity = 50;
                this.turbulenceRange = 0;
                break;
            case enumWeater.sun:
                this.currentModel = new RainModel();
                this.spawnRate = 0;
                this.spawnQuantity = 0;
                break;
        }
    }

    spawn(worldWidth: number, camera: Camera): void {

        if (Math.random() < this.spawnRate) {

            const quantity = (Math.random() + 0.5) * this.spawnQuantity;

            if (this.particles.length >= 3000) {
                this.particles.splice(0, quantity);
            }

            for (var i = 0; i < quantity; i++) {


                var rx = camera.VPos.x + (Math.random() * worldWidth * 3) - (worldWidth);
                var ry = camera.VPos.y - (Math.random() * 10)
                var rtx = (Math.random() - 0.5) * this.turbulenceRange;
                var rty = (Math.random() - 0.5) * this.turbulenceRange;

                this.particles.push(
                    new Particle(
                        rx,
                        ry,
                        new Vec2(rtx, rty),
                        this.currentModel
                    )
                )
            }
        }
    }

    update(camera: Camera): void {

        if (Math.random() < 0.001) {
            const n = Math.random() * 2;
            if (n < 0.3) {
                this.setWeather(enumWeater.snow)
            }
            else if (n < 0.6) {
                this.setWeather(enumWeater.rain)
            }
            else if (n < 0.9) {
                this.setWeather(enumWeater.sun)
            }
        }


        this.skyController.update(this.currentWeather);

        for (var i = 0; i < this.particles.length; i++) {
            if (this.particles[i].point.y - camera.VPos.y > 55) {
                this.particles.splice(i, 1);
                i--;
            }
        }

        if (this.windInterpolationLevel < 1) {
            this.wind = this.utils.interpolateVec2(
                this.wind,
                this.targetWind,
                this.windInterpolationLevel
            );
            this.windInterpolationLevel += 0.001;
        }

        this.currentModel.setForce(
            new Vec2(
                this.wind.x,
                this.currentModel.force.y
            )
        );

        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
        }
    }

    setWind(wind: Vec2) {

        if (wind.x != this.wind.x && wind.x != this.wind.x) {
            this.targetWind = wind;
            this.windInterpolationLevel = 0;
        }

    }

    render(draw: Draw, worldScale: number, camera: Camera) {
        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].render(draw, worldScale, camera);
        }
    }

}