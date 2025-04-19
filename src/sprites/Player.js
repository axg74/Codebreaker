/**
 * every game has a player sprite object
 */

import Sprite from './../core/Sprite';
import Keyboard from '../core/KeyboardInput';

const Player = {
    sprite: null,
    shootDelay: 0,

    init: function() {
        this.sprite = new Sprite();
        this.sprite.enable();
        this.sprite.setSize(24, 14);
        this.sprite.setSource(48, 16);
        this.sprite.setPos(1.25, 2);
        this.sprite.setSpeed(80, 80);
        this.shootDelay = 0;
    },

    isShooting: function() {
        if (Keyboard.key.fireA && this.shootDelay < 0) {
            this.shootDelay = 4;
            return true;
        }

        return false;
    },

    update: function(dt, gameWidth, gameHeight) {
        this.shootDelay -= 30 * dt;

        this.sprite.dirX = 0;
        this.sprite.dirY = 0;

        if (Keyboard.key.left) {
            this.sprite.dirX = -1;
        }

        if (Keyboard.key.right) {
            this.sprite.dirX = 1;
        }

        if (Keyboard.key.up) {
            this.sprite.dirY = -1;
        }

        if (Keyboard.key.down) {
            this.sprite.dirY = 1;
        }

        this.sprite.x += this.sprite.dirX * this.sprite.speedX * dt;
        this.sprite.y += this.sprite.dirY * this.sprite.speedY * dt;

        if (this.sprite.x < 0) this.sprite.x = 0;
        if (this.sprite.y < 0) this.sprite.y = 0;
        if (this.sprite.x + this.sprite.width > gameWidth) this.sprite.x = gameWidth - this.sprite.width;
        if (this.sprite.y + this.sprite.height > gameHeight) this.sprite.y = gameHeight - this.sprite.height;
    }
}

export default Player;
