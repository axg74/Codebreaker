/**
 * simple sprite pooling manager
 *
 * NOTE: not used in this project
 */

import CanvasRenderer from "./CanvasRenderer";

class SpritePool {
    constructor(SpriteClass, image, amount) {
        this.pool = [];

        for (let i = 0; i < amount; i++) {
            const sprite = new SpriteClass();
            sprite.disable();
            sprite.setImage(image);
            sprite.setPos(i * 1, i * 2);
            this.pool.push(sprite);
        }
    }

    getSprite() {
        return this.pool.find(sprite => !sprite.isActive());
    }

    draw(renderer) {
        this.pool.forEach( (sprite) => {
            if (sprite.isActive()) {
                renderer.drawSubImage(sprite.getImage(), sprite.x, sprite.y, sprite.width, sprite.height, sprite.sourceX, sprite.sourceY)
            }
        });
    }

    update(dt, gameWidth, gameHeight) {
        this.pool.forEach( (sprite) => {
            if (sprite.isActive()) {
                sprite.update(dt, gameWidth, gameHeight);
            }
        });
    }
}

export default SpritePool;