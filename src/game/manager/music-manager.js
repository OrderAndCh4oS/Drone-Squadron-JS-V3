import music from '../music';

export default class MusicManager {

    constructor() {
        this.sounds = {};
        this.songs = music;
        this.loop = 0;
        this.maxloop = 4;
        this.loadSounds();
        this.createMainAudio();
        this.listenToMusic();
    }

    loadSounds() {
        for(let sound in this.sounds) {
            if(this.sounds.hasOwnProperty(sound)) {
                this.sounds[sound] = this.load(this.sounds[sound]);
            }
        }
    }

    createMainAudio() {
        this.audio = document.createElement('audio');
        this.audio.onended = () => {
            this.loop++;
            if(this.loop > this.maxloop) {
                this.playlist.shift();
            }
            if(!this.playlist.length) {
                this.playlist = this.songs;
            }
            // this.dom.currentTime = 0;
            this.audio.src = this.playlist[0];
            this.audio.play();
        };
    }

    listenToMusic() {
        this.playlist = this.songs;
        this.audio.src = this.playlist[0];
        this.audio.play();
    }

    load(sound) {
        let a = document.createElement('audio');
        a.src = sound;

        return a;
    }

    start() {
        this.audio.currentTime = 0;
        this.audio.play();
    }

    stop() {
        this.audio.pause();
    }

    play(sound) {
        this.sounds[sound].play();
    }
}
