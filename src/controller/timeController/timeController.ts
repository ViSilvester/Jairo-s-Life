import { EnumTime } from "../skyController/enumTime.js";

export class TimeController {
    lastTime: number;
    dia: number;
    hora: number;
    minuto: number;

    constructor() {
        this.lastTime = Date.now().valueOf();
        this.dia = 0;
        this.hora = 0;
        this.minuto = 0;
    }

    getDayTime() {

        if (this.hora >= 6 && this.hora < 18) {
            return EnumTime.day;
        }
        if (this.hora >= 18 || this.hora < 6) {
            return EnumTime.night;
        }
        return EnumTime.day;
    }


    update() {
        const timeNow = Date.now().valueOf();
        const diff = timeNow - this.lastTime;

        if (diff > 100) {
            this.minuto++;
            this.lastTime = timeNow;
        }
        if (this.minuto == 60) {
            this.minuto = 0;
            this.hora++;
        }
        if (this.hora == 24) {
            this.hora = 0;
            this.dia++;
        }

        // console.log(this.dia, this.hora, this.minuto);

    }
}