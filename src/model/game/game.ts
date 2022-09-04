import { InputController } from "../../controller/inputController/inputController.js";
import { WeatherController } from "../../controller/weatherController/weatherController.js";
import { Camera } from "../camera/camera.js";
import { Draw } from "../draw/draw.js";
import { Vec2 } from "../geometry/geometry.js";
import { Player } from "../player/player.js";
import { Terrain } from "../terrain/terrain.js";


export class Game {

    draw: Draw;
    terrain: Terrain;
    worldScale: number;
    weatherController: WeatherController;
    inputController: InputController;
    player: Player;
    camera: Camera;
    worldlimit = 1000000;


    constructor() {

        this.player = new Player(new Vec2(25, 0), new Vec2(0, 0), 1);
        this.draw = new Draw();
        this.terrain = new Terrain(40);
        this.worldScale = 10;
        this.weatherController = new WeatherController();
        this.inputController = new InputController(this);
        this.camera = new Camera(
            this.player.pos,
            this.draw.width / this.worldScale,
            this.draw.height / this.worldScale,
            this.worldlimit
        );
    }

    create(): void {
        // vento randomico
        this.weatherController.setWind(new Vec2((Math.random() - 0.5) * 0.25, 0));
        // Cria chão
        this.terrain.create();
        // Ouve teclado
        this.inputController.listen();

    }

    update(): void {

        this.inputController.update();

        if (Math.random() < 0.001) {
            this.weatherController.setWind(
                new Vec2((Math.random() - 0.5) * 0.25, 0)
            );
        }
        this.weatherController.spawn(this.draw.width / this.worldScale, this.camera);
        this.weatherController.update(this.camera);
        this.camera.update(this.player.pos);
        this.player.update(this.terrain.getTerrainVertices(this.camera),);

    }

    render(): void {

        this.draw.fillBackgroudColor(
            this.weatherController.skyController.getCurrentColor().x,
            this.weatherController.skyController.getCurrentColor().y,
            this.weatherController.skyController.getCurrentColor().z
        );


        this.weatherController.render(this.draw, this.worldScale, this.camera);
        this.terrain.render(this.draw, this.worldScale, this.camera);
        this.player.render(this.draw, this.worldScale, this.camera);
    }


    gameLoop(): void {
        this.update();
        this.render();
        requestAnimationFrame(() => { this.gameLoop() })

    }
}