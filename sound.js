console.log("hello");

class PianoKey {
    constructor (htmlDiv, soundFile) {
        this.htmlDiv = htmlDiv;
        this.soundFile = soundFile;
    }

    trigger () {
        //this.htmlDiv.dispatchEvent(new Event("click"));
        const event = new Event("mouseenter", {
            bubbles: true,    // optional, wenn Event nach oben propagieren soll
            cancelable: true
        });
        this.htmlDiv.dispatchEvent(event);

        this.soundFile.currentTime = 0;
        this.soundFile.play();
    }
}

class KeyHandler {
    static keysPressed = new Set();

    /*aaa
    static noteMap = {
        "a": new Audio("audio/c-sine.mp3"),
        "s": new Audio("audio/d-sine.mp3"),
        "d": new Audio("audio/e-sine.mp3"),

        "j": new Audio("audio/kick.mp3"),
        "k": new Audio("audio/snare.mp3"),
        "l": new Audio("audio/hat.mp3")
    }
    */

    static noteMap = {
        "a": new PianoKey(document.getElementById("c-sine"), new Audio("audio/c-sine.mp3"))
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
        KeyHandler.keysPressed.delete(key);
    }
}

window.addEventListener("keydown", (event) => {
    KeyHandler.onKeyDown(event.key);
});

window.addEventListener("keyup", (event) => {
    KeyHandler.onKeyUp(event.key);
});

const cKey = document.getElementById("c-sine");
console.log(cKey)
cKey.addEventListener("click", ()=>{console.log("clicked")})
cKey.addEventListener("mouseenter", () => {console.log("mouseenter")})