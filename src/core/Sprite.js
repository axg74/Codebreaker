/**
 * sprite class implementation
 */

class Sprite {
    constructor(idType, x, y) {
        this.active = true;
        this.idType = idType;

        // position
        this.x = x;
        this.y = y;

        // source image
        this.image = null;

        // source X/Y and size of the sprite within the spritesheet
        this.sourceX = 0;
        this.sourceY = 0;
        this.width = 0;
        this.height = 0;
        
        this.xOffset = 0;
        this.yOffset = 0;
        
        // collision rect (hitbox)
        this.collisionHitbox = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };

        // properties for animation
        this.frameIndex = 0;
        this.frameSpeed = 0;
        this.frameCount = 0;
        
        // speed movement
        this.speedX = 0;
        this.speedY = 0;
        
        // direction 1/-1
        this.dirX = 0;
        this.dirY = 0;
        this.oldDirX = 0;
        this.oldDirY = 0;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    /**
     * set hitbox properties for rectangular collision detection
     * 
     * @param {number} xV - xOffset
     * @param {number} yV - yOffset
     * @param {number} widthV - box width from xOffset
     * @param {number} heightV - box height from yOffset
     */
    setHitbox(xV, yV, widthV, heightV) {
        this.collisionHitbox = {
            x: xV,
            y: yV,
            width: widthV,
            height: heightV
        };
    }

    setSize(width, height) {
        this.width = width;
        this.height = height;
    }
    setSource(x, y) {
        this.sourceX = x;
        this.sourceY = y;
    }
    
    getImage() {
        return this.image;
    }

    setImage(img) {
        this.image = img;
    }

    setSpeed(x, y) {
        this.speedX = x;
        this.speedY = y;
    }

    setPos(x, y) {
        this.x = x;
        this.y = y;
    }
    
    disable() {
        this.active = false;
    }

    enable() {
        this.active = true;
    }

    isActive() {
        return this.active;
    }

    isOutOfScreen(gameWidth, gameHeight) {
        return this.x < 0 || this.y < 0 || this.x > gameWidth || this.y > gameHeight;
    }
}

export default Sprite;