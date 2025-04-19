/**
 * @GameEngine
 */

import GameBoard from './GameBoard';
import CanvasRenderer from './core/CanvasRenderer';
import Loader from './core/Loader';
import DeltaTime from './core/DeltaTime';
// import Tilemap from './core/Tilemap';
import Keyboard from './core/KeyboardInput';
import SpritePool from './core/SpritePool';

/**
 * @UserImplementation
 */
// import Player from './sprites/Player';
// import PlayerBullets from './sprites/PlayerBullets';

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

      //  this.tilemap = new Tilemap(this.gameWidth, this.gameHeight, 16);
      //  console.log(this.tilemap);

       // Player.init();
       // this.playerBulletPool = new SpritePool(PlayerBullets, this.spriteSheet, 10);

        // const sprite = this.playerBulletPool.getSprite();
    },

    /**
     * @userImplementation
     * 
     * preload game data like image, sounds or JSON
     */
    preload: async function() {
        // load all graphics
        this.spriteAtlas = await Loader.image('spriteatlas.png');

    //    this.tileSheet = await Loader.image('tiles1.png');

        // load all Tiled tilemaps
        this.tileMapDataJSON = [];
    //    this.tileMapDataJSON.push(await Loader.json('maps/1.json'));
    //    console.log(this.tileMapDataJSON[0]);
    },

    /**
     * update the game logic
     * 
     * @userImplementation
     * @param {float} dt delta time value
     */
    update: function(dt) {
        this.gameboard.update();

        /*
        Player.update(dt, this.gameWidth, this.gameHeight);

        if(Player.isShooting()) {
            let bullet = this.playerBulletPool.getSprite();
            if (typeof bullet !== 'undefined') {
                bullet.init(Player.sprite.getX() + 16, Player.sprite.getY() + 5);
            }
        }

        this.playerBulletPool.update(dt, this.gameWidth, this.gameHeight);
         */
    },
    
    /**
     * @userImplementation
     * 
     * game draw function
     */
    draw: function() {
        this.renderer.cls('#050');
//        this.renderer.drawTileGrid(this.tilemap.tileSize);
 //       this.tilemap.draw();

        // draw all sprites
    //    this.playerBulletPool.draw(this.renderer);
    //    this.renderer.drawSprite(Player.sprite, this.spriteSheet);

        this.gameboard.draw();
        this.renderer.present();
    },

    /**
     * @GameEngine

    * init the game and start the game loop
     */
    run: async function() {
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
         * init game specific things
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
