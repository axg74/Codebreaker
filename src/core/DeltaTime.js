/**
 * delta time logic
 */

class DeltaTime  {
    constructor() {
        this.lastDeltaTime = performance.now();
        this.dt = 0;

        this.init();
    }

    init() {
        this.dt = 0;
     
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                this.dt = 0;
                this.lastDeltaTime = 0;
            } else {
                this.lastDeltaTime = performance.now();
                this.dt = 0;
            }
        });
    }

    update(newTime) {
        this.dt = (newTime - this.lastDeltaTime) / 1000;
       // this.dt = 1.0 / 60.0;
        this.lastDeltaTime = newTime;
    }
};

export default DeltaTime;