console.log("hello");

class PianoKey {
    constructor (htmlDiv, soundFile) {
        this.htmlDiv = htmlDiv;
        this.htmlDiv.addEventListener("click", (event) => {this.trigger()});

        this.soundFile = soundFile;
    }

    trigger () {
        this.htmlDiv.classList.add("key-active");

        this.soundFile.currentTime = 0;
        this.soundFile.play();
    }

    release () {
        this.htmlDiv.classList.remove("key-active");
        setTimeout(() => {
            this.htmlDiv.style.transition = "";
        }, 10);

    }
}

class KeyHandler {
    static keysPressed = new Set();

    static noteMap = {
        "a": new PianoKey(document.getElementById("c-sine"), new Audio("audio/c-sine.mp3")),
        "s": new PianoKey(document.getElementById("d-sine"), new Audio("audio/d-sine.mp3")),
        "d": new PianoKey(document.getElementById("e-sine"), new Audio("audio/e-sine.mp3")),

        "j": new PianoKey(document.getElementById("kick"), new Audio("audio/kick.mp3")),
        "k": new PianoKey(document.getElementById("snare"), new Audio("audio/snare.mp3")),
        "l": new PianoKey(document.getElementById("hat"), new Audio("audio/hat.mp3"))
    }

    static onKeyDown (key) {
        if (KeyHandler.keysPressed.has(key)) {
            return;
        }

        if (!KeyHandler.noteMap.hasOwnProperty(key)) {
            return;
        }

        KeyHandler.keysPressed.add(key);
        KeyHandler.noteMap[key].trigger();
    }
    
    static onKeyUp (key) {
        KeyHandler.noteMap[key].release();
        KeyHandler.keysPressed.delete(key);
    }
}

window.addEventListener("keydown", (event) => {
    KeyHandler.onKeyDown(event.key);
});

window.addEventListener("keyup", (event) => {
    KeyHandler.onKeyUp(event.key);
});
