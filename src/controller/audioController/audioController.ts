export class AudioController {

    snowMusic = new Audio("../../../assets/snow_theme.mp3");
    isPlaying = false;

    playSnowMusic() {
        if (!this.isPlaying) {
            this.snowMusic.play();
        }
    }

}