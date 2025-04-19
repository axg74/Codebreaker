const KeyboardInput = {
    key: {
        left: false,
        right: false,
        up: false,
        down: false,
        fireA: false,
        fireB: false,
        escape: false,
    },

    init: function() {
        document.addEventListener("keydown", (event) => {
            this.setKeyboard(event, true);
        });
        
            document.addEventListener("keyup", (event) => {
            this.setKeyboard(event, false);
        });

        this.reset();
    },

    setKeyboard: function (event, flag) {
        switch (event.key) {
          case "ArrowLeft":
            this.key.left = flag;
            break;
          case "ArrowRight":
            this.key.right = flag;
            break;
          case "ArrowUp":
            this.key.up = flag;
            break;
          case "ArrowDown":
            this.key.down = flag;
            break;
          case "Escape":
            this.key.espace = flag;
            break;
          case "d":
            this.key.fireA = flag;
            break;
          case "f":
            this.key.fireB = flag;
            break;
        }
    },

    reset: function () {
        this.key.left = false;
        this.key.right = false;
        this.key.up = false;
        this.key.down = false;
        this.key.escape = false;
        this.key.fireA = false;
        this.key.fireB = false;
    },
}

export default KeyboardInput;