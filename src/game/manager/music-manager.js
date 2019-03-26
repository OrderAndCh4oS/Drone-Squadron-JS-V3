import music from '../assets/audio/music';

export default class MusicManager {

    constructor() {
        this.current_track = 0;
        this.sounds = {};
        this.songs = music;
        this.loop = 0;
        this.maxloop = 4;
        this.loadSounds();
        this.createMainAudio();
        this.listenToMusic();
    }

    static load(sound) {
        let a = document.createElement('audio');
        a.src = sound;

        return a;
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
            this.audio.src = this.playlist[0];
            this.audio.play();
        };
    }

    loadSounds() {
        for(let sound in this.sounds) {
            if(this.sounds.hasOwnProperty(sound)) {
                this.sounds[sound] = MusicManager.load(this.sounds[sound]);
            }
        }
    }

    listenToMusic() {
        this.playlist = this.songs;
        this.audio.src = this.songs[0];
        this.audio.play();
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
