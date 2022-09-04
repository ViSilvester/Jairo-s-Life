import { geometryUtils, Vec3 } from "../../model/geometry/geometry.js";
import { TimeController } from "../timeController/timeController.js";
import { enumWeater } from "../weatherController/enum_weather.js";
import { EnumTime } from "./enumTime.js";

export class SkyController {

    private currentColor: Vec3;
    private targetColor: Vec3;
    private interpolationLevel: number;
    private utils = new geometryUtils()
    private timeController = new TimeController();
    private colorMap!: Map<enumWeater, Map<EnumTime, Vec3>>
    private weather: enumWeater;
    private time: EnumTime;

    constructor(weather: enumWeater,) {

        this.colorMap = new Map();
        this.setUpColorMap();
        this.time = this.timeController.getDayTime();
        this.weather = weather;
        this.currentColor = this.colorMap.get(weather)!.get(this.time)!;
        this.targetColor = this.colorMap.get(weather)!.get(this.time)!;
        this.interpolationLevel = 0;


    }

    setUpColorMap() {
        const snow = new Map([
            [EnumTime.day, new Vec3(100, 100, 100)],
            [EnumTime.night, new Vec3(10, 10, 20)]
        ]);

        const rain = new Map([
            [EnumTime.day, new Vec3(50, 50, 50)],
            [EnumTime.night, new Vec3(10, 10, 20)]
        ]);

        const sun = new Map([
            [EnumTime.day, new Vec3(100, 120, 255)],
            [EnumTime.night, new Vec3(30, 30, 50)]
        ]);

        this.colorMap.set(enumWeater.snow, snow);
        this.colorMap.set(enumWeater.rain, rain);
        this.colorMap.set(enumWeater.sun, sun);


    }

    setSkyByWeatherAndTime(weather: enumWeater, time: EnumTime) {
        this.setTargetColor(this.colorMap.get(weather)!.get(time)!)
    }


    setTargetColor(color: Vec3) {
        this.interpolationLevel = 0;
        this.targetColor = color;
    }

    getCurrentColor() {
        return this.currentColor;
    }

    getTargetColor() {
        return this.targetColor;
    }

    update(weather: enumWeater) {

        this.timeController.update();

        if (
            weather != this.weather
            ||
            this.timeController.getDayTime() != this.time
        ) {
            this.weather = weather;
            this.time = this.timeController.getDayTime()
            this.setSkyByWeatherAndTime(weather, this.time);
        }


        if (this.currentColor.x != this.targetColor.x
            &&
            this.currentColor.y != this.targetColor.y
            &&
            this.currentColor.z != this.targetColor.z
            &&
            this.interpolationLevel <= 1) {

            this.currentColor = this.utils.interpolateVec3(
                this.currentColor,
                this.targetColor,
                this.interpolationLevel
            );
            this.interpolationLevel += 0.00001
        }
    }

}