/**
 * a shootable object for the player
 */

import Sprite from './../core/Sprite';

class PlayerBullets extends Sprite {
    constructor() {
        super(0, 0, 0);
        this.setSource(48, 0);
        this.setSize(16, 8);
        this.setSpeed(400, 0);
    }

    init(x, y) {
        this.enable();
        this.setPos(x, y);
    }

    update(dt, gameWidth, gameHeight) {
        this.x += this.speedX * dt;

        if (this.isOutOfScreen(gameWidth, gameHeight)) {
            this.disable();
        }
    }
}

export default PlayerBullets;