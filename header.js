class MusicPlayer {
    constructor() {
        this.players = document.getElementsByTagName("audio"); //////grabbing all the things it needs
        this.playButtons = document.getElementsByClassName("playPauseButton");
        this.times = document.getElementsByClassName("time");
        this.seekers = document.getElementsByClassName("seeker");
    }
    
    play(id) {
        for( var i = 0; i < this.players.length; i+=1) {
            if (!this.players[i].paused) { ///pauses any other music players when you tell one to play
                this.pause(i);
            }
        }
        this.players[id].play();
        this.playButtons[id].value = "⏸"; //sets the button to the pause icon
    }
    pause(id) {
        this.players[id].pause();
        this.playButtons[id].value = "▶️"; // sets the button to the play icon
    }
    playPause(id) {
        if (this.players[id].paused) { //toggles the paused state
            this.play(id);
        } else {
            this.pause(id);
        }
    }
    update() {
        for( var i = 0; i < this.players.length; i+=1) {
            ///generates the text saying how much time is remaining
            this.times[i].innerHTML = 
                (Math.floor(this.players[i].currentTime/60)).toString() + ":" + (Math.floor(this.players[i].currentTime%60)).toString().padStart(2,0) + " / " +
                (Math.floor(this.players[i].duration/60)).toString() + ":" + (Math.floor(this.players[i].duration%60)).toString().padStart(2,0);
            
            this.seekers[i].value = this.players[i].currentTime; ///sets the seeker slider to the right position
            
            if (this.players[i].ended && this.players[i+1].currentTime == 0) { //detects if a player is done and then switches to the next player
                this.pause(i);
                this.play(i+1);   
            }
            
        }
    }
    seek(id) {
        if (!this.seekers[id].initialized) { //"initializes" the seeker
            this.seekers[id].max = this.players[id].duration;
            this.seekers[id].initialized = true;
        }
        this.players[id].currentTime = this.seekers[id].value; //actually sets the player position when you seek
    }
    
}

let musicPlayer = new MusicPlayer();

setInterval(tick, 1000/20);

function tick() {
    musicPlayer.update(); //runs the update function 20 times a second
}

