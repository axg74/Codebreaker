class GameBoard {
    /**
     * game board dimensions
     */
    #pinCountHorizontal = 5;
    #pinCountVertical = 12;

    /**
     * number of colored pins and control pins
     */
    #coloredPinCount = 8;
    #controlPinCount = 2;

    /**
     * size of the colored pins and control pins
     */
    #coloredPinSize = 8;
    #controlPinSize = 4;

    /**
     * control pin types
     */
    #controlPinNone = -1;
    #controlPinWhite = 0;
    #controlPinBlack = 1;

    /**
     * image sources for the colored pins
     */
    #coloredPinSource = [];

    /**
     * image sources for the colored hovered pins
     */
    #coloredPinHoverSource = [];

    /**
     * image sources for the control pins
     */
    #controlPinSource = [];

    /**
     * available pins for the player
     */
    #availablePins = [];

    /**
     * pins which the player has to guess
     */
    #guessingPins = [];

    /**
     * data structure for the game board
     */
    #data = [];

    /**
     * data structure for the validated color code
     */
    #validatedData = [];

    /**
     * current-selected color
     */
    #currentSelectedColor;

    /**
     * current line
     */
    #currentLine;

    #state = 0;
    #state_player = 1;
    #state_validateColorCode = 2;
    #state_newGame = 3;
    #state_codeOk = 4;
    /**
     * renderer and sprite atlas dependency injection
     */
    #renderer = null;
    #spriteAtlas = null;

    constructor(renderer, spriteAtlas) {
        this.#renderer = renderer;
        this.#spriteAtlas = spriteAtlas;

        this.#initImageSources();
        this.#initNewGame();
    }

    /**
     * init a new game round
     */
    #initNewGame() {
        this.#currentSelectedColor = 0;
        this.#currentLine = this.#pinCountVertical - 1;
        this.#state = this.#state_player;

        this.#initData();
        this.#initAvailablePins();
        this.#initGuessingPins();
    }

    /**
     * init an empty data structure for the game board
     */
    #initData()  {
        this.#data = [];
        this.#validatedData = [];

        for (let y = 0; y < this.#pinCountVertical; y++) {
            let row = [];
            let row2 = [];

            for (let x = 0; x < this.#pinCountHorizontal; x++) {
                row.push(-1);
                row2.push(-1);
            }

            this.#data.push(row);
            this.#validatedData.push(row2);
        }
    }

    /**
     * shuffle an array randomly
     *
     * @param {array} inData
     * @returns {array}
     */
    #shuffleArray(inData) {
        let outData =  inData;

        inData.forEach( (item, index) => {
            const destIndex = Math.floor(Math.random() * inData.length);

            if (index !== destIndex) {
                const tmp = outData[destIndex];
                outData[destIndex] = item;
                outData[index] = tmp;
            }
        });

        return outData;
    }

    /**
     * init the available pins for the player
     */
    #initAvailablePins() {
        this.#availablePins = [];

        for (let i = 1; i < this.#coloredPinCount + 1; i++) {
            this.#availablePins.push(i);
        }
    }

    /**
     * init the pins which the player has to guess shuffled randomly
     *
     * @returns {array}
     */
    #initGuessingPins() {
        this.#guessingPins = [];

        for (let i = 0; i < this.#pinCountHorizontal; i++) {
            let inserted = true;

            while(inserted) {
                const pin = Math.floor(Math.random() * this.#coloredPinCount) + 1;

                if (!this.#guessingPins.includes(pin)) {
                    this.#guessingPins.push(pin);
                    inserted = false;
                }
            }
        }

        for (let i = 0; i < Math.random() * 1000 + 100; i++) {
            this.#guessingPins = this.#shuffleArray(this.#guessingPins);
        }
    }

    /**
     * init the image sources for the colored pins and control pins
     */
    #initImageSources() {
        this.#coloredPinSource = [];
        this.#coloredPinHoverSource = [];

        for (let i = 0; i < this.#coloredPinCount + 1; i++) {
            this.#coloredPinSource.push({
                x: i * this.#coloredPinSize,
                y: 0,
                size: this.#coloredPinSize
            });

            this.#coloredPinHoverSource.push({
                x: i * this.#coloredPinSize,
                y: 16,
                size: this.#coloredPinSize
            });
        }

        this.#controlPinSource = [];
        const xOffset = 72;

        for (let i = 0; i < this.#controlPinCount + 1; i++) {
            this.#controlPinSource.push({
                x: xOffset + (i * this.#controlPinSize),
                y: 0,
                size: this.#controlPinSize
            });
        }
    }

    /**
     * draw pin
     *
     * @param {object} source
     * @param {number} x
     * @param {number} y
     */
    drawPin(source, x, y) {
        this.#renderer.drawSubImage(this.#spriteAtlas,
                                    x, y,
                                    source.size, source.size,
                                    source.x, source.y);
    }

    /**
     * draw the restart button and listen for a mouse click
     *
     * TODO: reimplement this in a button manager
     */
    #waitForRestart() {
        const button = {
            x:14, y:154,
            width: 31, height: 16,
            sourceX: 160, sourceY: 0
        };

        this.#renderer.drawSubImage(this.#spriteAtlas,
            button.x, button.y,
            button.width,button.height,
            button.sourceX, button.sourceY);

        const mouseX = this.#renderer.getMouseX();
        const mouseY = this.#renderer.getMouseY();
        const mouseLeftButton = this.#renderer.getMouseLeftButton();

        if (mouseX >= button.x && mouseX <= button.x + button.width &&
            mouseY >= button.y && mouseY <= button.y + button.height) {

            this.#renderer.setMousePointerToPointer();

            if (mouseLeftButton) {
                this.#initNewGame();
            }
        }
    }

    /**
     * draw the game board
     */
    draw() {
        this.#renderer.setMousePointerToDefault();

        this.#drawColoredPins();
        this.#drawPinsSelector();

        if (this.#state === this.#state_codeOk) {
            this.#drawGuessingPins();
            this.#waitForRestart();
        }
    }

    /**
     * Updates the current state of the game and performs necessary actions based on the state.
     */
    update() {
        switch(this.#state) {
            case this.#state_player:
                this.#checkCompleted();
                break;

            case this.#state_validateColorCode:
                this.#validateColorCode();
                break;

            case this.#state_newGame:
                this.#initNewGame();
                break;

            case this.#state_codeOk:
//                this.#state = this.#state_newGame;
                break;
        }
    }

    /**
     * draw the pins which the player has to guess
     */
    #drawGuessingPins() {
        this.#guessingPins.forEach( (pin, index) => {
            const xp = (index * (this.#coloredPinSize + 4)) + 64;
            this.drawPin(this.#coloredPinSource[pin], xp, 12);
        });
    }

    /**
     * draw the pin selector where the player can pick up a colored pin.
     */
    #drawPinsSelector() {
        let source;
        const coloredPinOffsetX = 54;
        const y = 158;

        const mouseX = this.#renderer.getMouseX();
        const mouseY = this.#renderer.getMouseY();

        this.#availablePins.forEach( (pin, x) => {
            const xp = (x * (this.#coloredPinSize + 2)) + coloredPinOffsetX;
            source = this.#coloredPinSource[x + 1];

            if (mouseX >= xp && mouseX <= xp + this.#coloredPinSize &&
                mouseY >= y && mouseY <= y + this.#coloredPinSize) {

                this.#renderer.setMousePointerToPointer();

                if (this.#renderer.getMouseLeftButton()) {
                    source = this.#coloredPinHoverSource[x + 1];
                    this.#currentSelectedColor = x;
                }
            }

            if (this.#currentSelectedColor === x) {
                source = this.#coloredPinHoverSource[x + 1];
            }

            this.drawPin(source, xp, y);
        });

        // draw border
        this.#renderer.drawSubImage(this.#spriteAtlas,
            coloredPinOffsetX - 2, y - 2,
            81, 11,
            96, 19);
    }

    /**
     * draws a control pin
     */
    #drawControlPin(x, y, controlPinOffsetX, controlPinOffsetY) {
        const xp = x * (this.#controlPinSize + 4) + controlPinOffsetX;
        const yp = y * (this.#coloredPinSize + 2) + controlPinOffsetY + 2;

        let pin = this.#validatedData[y][x] + 1;
        this.drawPin(this.#controlPinSource[pin], xp, yp);
    }

    /**
     * draw the colored pins
     * left side the colored pins to check the correctness of the selected pins
     * right side the colored pins which the player sets
     */
    #drawColoredPins() {
        const controlPinOffsetX = 16;
        const coloredPinOffsetX = 64;
        const coloredPinOffsetY = 24;

        const mouseX = this.#renderer.getMouseX();
        const mouseY = this.#renderer.getMouseY();

        for (let y = 0; y < this.#pinCountVertical; y++) {

            // draw numbers 1-12 beside the control pins
            this.#renderer.drawSubImage(this.#spriteAtlas,
                controlPinOffsetX - 12, 2 + coloredPinOffsetY + (y * (this.#controlPinSize + 6)),
                8, 5,
                Math.abs(y - 11) * 8, 24);

            this.#renderer.drawSubImage(this.#spriteAtlas,
                controlPinOffsetX - 2, coloredPinOffsetY + (y * (this.#controlPinSize + 6)),
                40, 8,
                96, 0);

            this.#renderer.drawSubImage(this.#spriteAtlas,
                coloredPinOffsetX - 2, coloredPinOffsetY + (y * (this.#coloredPinSize + 2)) - 2,
                59, 11,
                96, 8);

            for (let x = 0; x < this.#pinCountHorizontal; x++) {
                let source;

                // colored player pins
                const xpc = x * (this.#coloredPinSize + 4) + coloredPinOffsetX;
                const ypc = y * (this.#coloredPinSize + 2) + coloredPinOffsetY;

                // check if the mouse is hovering over a colored pin
                if (y === this.#currentLine &&
                    mouseX >= xpc && mouseY >= ypc &&
                    mouseX <= xpc + this.#coloredPinSize && mouseY <= ypc + this.#coloredPinSize
                ) {
                    this.#renderer.setMousePointerToPointer();

                    // set pin on the game board
                    if (this.#renderer.getMouseLeftButton()) {
                        this.#setPin(x, y, this.#currentSelectedColor + 1);
                    }

                    source = this.#coloredPinSource[this.#currentSelectedColor + 1];
                }

                const pin = this.#data[y][x];

                // empty pin on the game board
                if (pin < 0) {
                    // empty pin on the game board
                    source = this.#coloredPinSource[0];
                }

                // highlight the current line on the game board
                if (pin < 0 && y === this.#currentLine) {
                    source = {x: 88, y: 0, size: this.#coloredPinSize};
                }

                // colored pin on the game board
                if (pin > 0) {
                    source = this.#coloredPinSource[pin];
                }

                this.drawPin(source, xpc, ypc);
                this.#drawControlPin(x, y, controlPinOffsetX, coloredPinOffsetY);

            }
        }

        for (let x = 0; x < this.#pinCountHorizontal; x++) {
            // draw numbers 1-5
            this.#renderer.drawSubImage(this.#spriteAtlas,
                2 + coloredPinOffsetX + (x * 12), 2 + coloredPinOffsetY + ((this.#controlPinSize + 6) * this.#pinCountVertical),
                8, 5,
                (4 - x) * 8, 24);
        }
    }

    /**
     * set a colored pin to the game board
     *
     * @param {number} x
     * @param {number} y
     * @param {number} pin-index
     */
    #setPin(x, y, pinIndex) {
        if (x < 0 || y < 0 ||
            x > this.#pinCountHorizontal || y > this.#pinCountVertical ||
            this.#data[y].includes(pinIndex) || this.#data[y][x] !== -1) return;

        if (this.#data[y][x] === -1) {
            this.#data[y][x] = pinIndex;
        }
    }

    /**
     * check if the current line of the game board is completed
     */
    #checkCompleted() {
        if (!this.#data[this.#currentLine].includes(-1))  {
            this.#state = this.#state_validateColorCode;

            if (this.#currentLine <= 0) {
                // TODO: implement a game over screen
                console.log("game over")
            }
        }
    }

    /**
     * validate the entered color code
     */
    #validateColorCode() {
        let matchedCount = 0;

        for (let x = 0; x < this.#pinCountHorizontal; x++) {
            const pin = this.#data[this.#currentLine][x];
            const controlPin = this.#guessingPins[x];

            // check for colors that matched
            if (pin === controlPin) {
                this.#validatedData[this.#currentLine][x] = this.#controlPinBlack;
                matchedCount++;
            } else if (this.#guessingPins.includes(pin)) {
                // check for included colors, but not at the correct position
                this.#validatedData[this.#currentLine][x] = this.#controlPinWhite;
            }
        }

        this.#state = this.#state_player;
        if (matchedCount === this.#pinCountHorizontal) {
            this.#state = this.#state_codeOk;
        }

        this.#currentLine--;
    }
}

export default GameBoard;
