import { Player } from "./player.js";
import { InputHandler } from "./inputHandler.js";
import { Background } from "./background.js";

// load event to wait for all dependent resourse such as stylesheets and image to be fully loaded and avalibale before ot run
window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 80;
      this.speed = 0;
      this.maxSpeed = 6;
      this.player = new Player(this);
      this.input = new InputHandler();
      this.background = new Background(this);
    }

    update(deltaTime) {
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
    }

    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
    }
  }

  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;

  const animate = (timeStamp) => {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  };

  animate(0);
});
