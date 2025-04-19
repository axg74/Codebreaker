/**
 * incomplete tilemap renderer
 *
 * NOTE: not used in this project
 */

class Tilemap {
    /**
     * 
     * @param {int} mapWidth in tiles 
     * @param {int} mapHeight in tiles
     * @param {int} tileSize in pixel
     */
    constructor(mapWidth, mapHeight, tileSize) {
        this.tileSize = tileSize;
        this.mapWidth = mapWidth / tileSize;
        this.mapHeight = mapHeight / tileSize;

        this.tileLayer = [];
    }

    init() {

    }

    draw() {
        
    }
}

export default Tilemap;