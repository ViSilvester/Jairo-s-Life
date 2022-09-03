import { Game } from "../../model/game/game.js";
import { Vec2 } from "../../model/geometry/geometry.js";
import { enumWeater } from "../weatherController/enum_weather.js";

export class InputController {

    private game: Game;
    private keys: Map<string, string> = new Map();

    constructor(game: Game) {
        this.game = game;
    }

    listen(): void {
        addEventListener("keydown", (ev) => { this.handleKeyDown(ev) });
        addEventListener("keyup", (ev) => { this.handleKeyUp(ev) })
    }

    private handleKeyDown(ev: KeyboardEvent): void {
        if (ev.repeat) {
            return;
        }
        this.keys.set(ev.key, ev.key);
        switch (ev.key) {
            case " ":
                if (this.game.player.isInGround) {
                    this.game.player.requestAddVel(new Vec2(0, -1));
                    this.game.player.isInGround = false;
                }
                break;
        }
    }

    private handleKeyUp(ev: KeyboardEvent): void {
        if (ev.repeat) {
            return;
        }
        this.keys.delete(ev.key);
    }

    update() {

        var keyList = Array.from(this.keys);

        for (var i = 0; i < keyList.length; i++) {
            switch (keyList[i][1]) {
                case "1":
                    this.game.weatherController.setWeather(enumWeater.snow);
                    break;
                case "2":
                    this.game.weatherController.setWeather(enumWeater.rain);
                    break;
                case "3":
                    this.game.weatherController.setWeather(enumWeater.sun);
                    break;
                case "d":
                    this.game.player.vel.x = 0.5;
                    break;
                case "a":
                    this.game.player.vel.x = -0.5;
                    break;
            }
        }


    }

}