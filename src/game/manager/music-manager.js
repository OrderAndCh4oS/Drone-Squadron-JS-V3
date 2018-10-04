import s1 from '../music/8-Bit-Mayhem.mp3'; // Sorry for this strange things. I don't like them
import s2 from '../music/80s-Space.mp3'; // But i know only one way how to add files is webpack
// Not counting just putting the row source of the file
// There are a few songs more, but I think you'll create a better way of adding files, so I won't add anymore

export default class MusicManager {

    constructor(songs) {

        // Vars
        // If you don't like that lists of sounds and songs are there, you can add them there like params when MusicManager's init happens

        this.sounds = {

            // "piu": "sounds/piu" -- If you want to play: this.play( "piu" );

        };

        this.songs = [

            s1,
            s2,

        ];

        this.loop = 0; // current loop number
        this.maxloop = 4; // MAGIC NUMBER ( I't how many times song plays before changing )

        //

        this.loadSounds();
        this.createMainAudio(); // Audio stream for songs ( BG )
        this.listenToMusic();

        //console.log( this.songs ); CHECK THIS
        //console.log( this.audio ); MEDIA ERROR 4 ( NOT SUPPORTED FORMAT )

    }

    loadSounds() {

        for(let sound in this.sounds) {

            this.sounds[sound] = MusicManager.load(this.sounds[sound]);

        }

    }

    createMainAudio() {

        this.audio = document.createElement('audio');

        this.audio.onended = () => {

            this.loop++;

            if(this.loop > this.maxloop) {

                this.playlist.shift();

            }

            if(!this.playlist.length) { this.playlist = this.songs; }

            this.dom.currentTime = 0;
            this.audio.src = this.playlist[0];
            this.audio.play();

        };

    }

    listenToMusic() {

        this.playlist = this.songs;
        this.audio.src = this.playlist[0];
        this.audio.play();

    }

    static load(sound) {

        let a = document.createElement('audio');
        a.src = sound;

        return a;

    }

    // Just syntactic sugar

    start() {
        this.audio.fastSeek(0);
        this.audio.play();
    };

    stop() {
        this.audio.pause();
        this.audio.fastSeek(0);
    }

    play(sound) {

        this.sounds[sound].play();

    }

}
