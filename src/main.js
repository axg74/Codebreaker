/**
 * @GameEngine
 */

import CanvasRenderer from './core/CanvasRenderer';
import Loader from './core/Loader';
import DeltaTime from './core/DeltaTime';
import Keyboard from './core/KeyboardInput';

/**
 * @UserImplementation
 */
import GameBoard from './GameBoard';

const Game = {
    /**
     * @GameEngine
     * 
     * game size and scaling
     */
    gameWidth: 160,
    gameHeight: 176,
    gameScale: 4,

    /**
     * @GameEngine
     * window size
     */
    windowWidth: 0,
    windowHeight: 0,

    /**
     * @GameEngine
     * x&y-offset to center the game on the screen
     */
    viewPort: {
        offsetX: 0,
        offsetY: 0,
    },

    /**
     * @RendererImplementation
     */
    renderer: null,

    /**
     * @TilemapImplementation
     */
    tilemap: null,

    /**
     * @GameboyImplementation
     */
    gameboard: null,

    /**
     * @DeltaTimeImplementation
     */
    deltaTime: null,

    /**
     * @HTMLImageElement spritesheet for all game sprites
     */
    spriteAtlas: null,

    /**
     * @HTMLImageElement tilesheet for all tile graphics
     */
    tileSheet: null,

    /**
     * @array of preloaded Tiled tilemaps in JSON format
     */
    tileMapDataJSON: null,

    /**
     * @array of all player bullets
     */
    playerBulletPool: null,

    /**
     * @userImplementation
     * 
     * init the game
     */
    init: function() {
        this.gameboard = new GameBoard(this.renderer, this.spriteAtlas);
    },

    /**
     * @userImplementation
     * 
     * preload game data like image, sounds or JSON
     */
    preload: async function() {
        this.spriteAtlas = await Loader.image('spriteatlas.png');
    },

    /**
     * update the game logic
     * 
     * @userImplementation
     * @param {float} dt delta time value
     */
    update: function(dt) {
        this.gameboard.update();
    },
    
    /**
     * @userImplementation
     * 
     * game draw function
     */
    draw: function() {
        this.renderer.cls('#050');
        this.gameboard.draw(this.viewPort);
        this.renderer.present();
    },

    /**
     * @GameEngine
     *
     * init the window
     */
    getWindowSize: function() {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
    },

    /**
     * @GameEngine
     *
     * calculate the game scale based on the window size
     */
    calcGameScale: function() {
        this.gameScale = Math.ceil(this.windowWidth / this.gameWidth);
        if (this.gameScale < 1) this.gameScale = 1;
    },

    /**
     * @GameEngine
     * calculate the viewport offset to center the game on the screen
     */
    calcViewportOffset: function() {
        this.viewPort.offsetX = Math.floor((((this.windowWidth - (98 * this.gameScale))) / this.gameScale) / 2);
        this.viewPort.offsetY = Math.floor((((this.gameHeight * this.gameScale) - this.windowHeight) / this.gameScale) / 2);
    },

    /**
     * @GameEngine
     *
     */
    setViewport: function() {
        this.getWindowSize();
        this.calcGameScale();
        this.calcViewportOffset();
    },

    /**
     * @GameEngine
    * init the game and start the game loop
     */
    run: async function() {
        /**
         * @GameEngine
         *
         * get window size and calculate the game scale
         */
        this.setViewport();

        /** add event listener for window resize
         */
        window.addEventListener('resize', () => {
            this.setViewport();
        });

        /**
         * @GameEngine
         * 
         * init renderer
         */
        this.renderer = new CanvasRenderer(this.gameWidth, this.gameHeight, this.gameScale);

        /**
         * @GameEngine
         * 
         * init delta time logic
         */
        this.deltaTime = new DeltaTime();

        /**
         * @UserImplementation
         * 
         * preload all data
         */
        await this.preload();

        /**
         * @UserImplementation
         * 
         * init game-specific stuff
         */
        this.init();

        /**
         * @GameEngine
         * 
         * init keyboard controller
         */
        Keyboard.init();

        /**
         * @GameEngine
         * 
         * start the game loop
         */
        window.requestAnimationFrame(Game.loop);
    },

    /**
     * @GameEngine
     * 
     * common game loop
     */
    loop: function(newTime) {
        Game.deltaTime.update(newTime);
        Game.update(Game.deltaTime.dt);
        Game.draw();
        window.requestAnimationFrame(Game.loop);
    },
};

Game.run();
