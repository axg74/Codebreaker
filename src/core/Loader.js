/**
 * some functions for loading assets like images, JSON-data structures
 *
 * TODO: refactoring to a class
 */

const Loader = {
    assetsPath: '/assets/',
    imgPath: 'img/',

    /**
     * load an image from a URL
     * @param {*} url 
     * @returns {HTMLImgeElement}
     */
    async image(url) {
        try {
            const response = await fetch(this.assetsPath + this.imgPath + url);
            const data = await response.blob();
            const blobUrl = URL.createObjectURL(data);
            const img = new Image();

            img.src = blobUrl;
            return img;
        }
        catch(error) {
            console.error(error);
        }
    },

    /**
     * load JSON data from a URL
     * 
     * @param {string} url 
     * @returns {JSON Object}
     */
    async json(url) {
        try {
            const response = await fetch(this.assetsPath + url);
            const json = await response.json();

            return json;
        }
        catch(error) {
            console.error(error);
        }
    }
};

export default Loader;