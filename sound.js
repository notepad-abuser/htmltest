console.log("hello");

class KeyHandler {
    static keysPressed = new Set();

    static noteMap = {
        "a": new Audio("audio/c-sine.mp3"),
        "s": new Audio("audio/d-sine.mp3"),
        "d": new Audio("audio/e-sine.mp3"),

        "j": new Audio("audio/kick.mp3"),
        "k": new Audio("audio/snare.mp3"),
        "l": new Audio("audio/hat.mp3")
    }

    static onKeyDown (key) {
        if (KeyHandler.keysPressed.has(key)) {
            return;
        }

        if (!KeyHandler.noteMap.hasOwnProperty(key)) {
            return;
        }

        KeyHandler.keysPressed.add(key);

        const audio = KeyHandler.noteMap[key];
        audio.currentTime = 0;
        audio.play();
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