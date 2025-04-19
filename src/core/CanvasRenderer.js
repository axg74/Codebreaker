/**
 * this class provides methods for HTML5 canvas rendering
 */

import Util from './Util';

class CanvasRenderer {
    #mouseX;
    #mouseY;
    #mouseLeftButton;

    constructor(width, height, scale) {
        this._max_canvas_width = 1920;
        this._max_canvas_height = 1080;
        this._max_canvas_scale = 12;

        this.setWidth(width);
        this.setHeight(height);
        this.setScale(scale);

        // create offscreen canvas element (not scaled)
        this._offScreenCanvasId = 'game_canvas_offscreen';
        this._offScreenCanvas = this.createCanvas(this._offScreenCanvasId, this._width, this._height);
        this._offScreenCtx = this.get2DCanvasContext(this._offScreenCanvas);

        // create canvas element
        this._gameCanvasId = 'game_canvas';
        this._ctx = null;
        this._canvas = document.getElementById(this._gameCanvasId);
        this._canvas.width = this._width * this._scale;
        this._canvas.height = this._height * this._scale;
        this._ctx = this.get2DCanvasContext(this._canvas);

        this.#initMouse();
    }

    cls(clearColorInHex) {
        this._offScreenCtx.fillStyle = clearColorInHex;
        this._offScreenCtx.fillRect(0, 0, this._width * this._scale, this._height * this._scale);
    }

    setColor(colorInHex) {
        this._offScreenCtx.fillStyle = colorInHex;
    }

    /**
     * draws a sprite to the offscreen canvas
     */
    drawSprite(sprite, spritesheet) {
        if (sprite.active) {
            this._offScreenCtx.imageSmoothingEnabled = false;

            this._offScreenCtx.drawImage(
                spritesheet,
                sprite.sourceX,
                sprite.sourceY,
                sprite.width,
                sprite.height,
                Math.floor(sprite.x),
                Math.floor(sprite.y),
                sprite.width,
                sprite.height
            );
        }
    }
      
    /**
     * draws an image to the offscreen canvas
     * 
     * @param {HTMLImageElement} image
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {number} sourceX
     * @param {number} sourceY
     */
    drawSubImage(image, x, y, width, height, sourceX, sourceY) {
        this._offScreenCtx.imageSmoothingEnabled = false;

        this._offScreenCtx.drawImage(
            image,
            sourceX,
            sourceY,
            width,
            height,
            x,
            y,
            width,
            height
        );
    }

    /**
     * draws a tilegrid over the whole screen for debugging purpose
     * 
     * @param {integer} tileSize in pixel 
     */
    drawTileGrid(tileSize) {
        this.setColor('#050');
        
        for (let yt = 0; yt < this._height / tileSize; yt++) {
            for (let xt = 0; xt < this._width / tileSize; xt++) {
                this.drawSubImage(this._engineGfx, xt * tileSize, yt * tileSize, tileSize, tileSize, 8, 0)
            }
        }
    }

    /**
     * draws the offscreen canvas to the visible canvas
     */
    present() {
        this._ctx.imageSmoothingEnabled = false;
        this._ctx.drawImage(this._offScreenCanvas, 0, 0, this._width, this._height,
                            0, 0, this._width * this._scale, this._height * this._scale);        
    }

    /**
     * create a canvas HTML element
     * 
     * @param {string} id 
     * @param {int} width 
     * @param {int} height 
     * @returns 
     */
    createCanvas(id, width, height) {
        const canvas = document.createElement('canvas');
        canvas.id = id;
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }

    get2DCanvasContext(canvasElement) {
        return canvasElement.getContext('2d');
    }

    setWidth(width) {
        this._width = width;
        Util.isSet(this._width, 'no canvas width is set!')
        Util.isInRange(this._width, 0, this._max_canvas_width);
    }

    setHeight(height) {
        this._height = height;
        Util.isSet(this._height, 'no canvas height is set!')
        Util.isInRange(this._height, 0, this._max_canvas_height);
    }

    setScale(scale) {
        this._scale = scale;
        Util.isSet(this._scale, 'no canvas scale is set!')
        Util.isInRange(this._scale, 1, this._max_canvas_scale);
    }

    /**
     * init mouse handler for getting the mouse position within the canvas
     * and listen for mouse button events
     *
     * @param {HTMLCanvasElement} canvasElement
     *
     */
    #initMouse() {
        this.#mouseX = 0;
        this.#mouseY = 0;

        this._canvas.addEventListener('mousemove', (event) => {
            const rect = this._canvas.getBoundingClientRect();
            this.#mouseX = Math.floor((event.clientX - rect.x) / this._scale);
            this.#mouseY = Math.floor((event.clientY - rect.y) / this._scale);

            if (this.#mouseX < 0) this.#mouseX = 0;
            if (this.#mouseY < 0) this.#mouseY = 0;
            if (this.#mouseX > this._width) this.#mouseX = this._width;
            if (this.#mouseY > this._height) this.#mouseY = this._height;
        });

        this.#mouseLeftButton = false;

        this._canvas.addEventListener('mousedown', (event) => {
            if (event.button === 0) {
                this.#mouseLeftButton = true;
            }
        });

        this._canvas.addEventListener('mouseup', (event) => {
            if (event.button === 0) {
                this.#mouseLeftButton = false;
            }
        });
    }

    /**
     * get the mouse position within the canvas
     *
     * @returns {number} {x, y}
     */
    getMouseX() {
        return this.#mouseX;
    }

    /**
     * get the mouse position within the canvas
     *
     * @returns {number} {x, y}
     */
    getMouseY() {
        return this.#mouseY;
    }

    /**
     * get the mouse left button state
     *
     * @returns {boolean}
     */
    getMouseLeftButton() {
        return this.#mouseLeftButton;
    }

    /**
     * set the mouse pointer to the pointer style
     */
    setMousePointerToPointer() {
        this.#setMousePointerStyle('pointer');
    }

    /**
     * set the mouse pointer to the default style
     */
    setMousePointerToDefault() {
        this.#setMousePointerStyle('default');
    }

    #setMousePointerStyle(style) {
        this._canvas.style.cursor = style;
    }
}

export default CanvasRenderer;
