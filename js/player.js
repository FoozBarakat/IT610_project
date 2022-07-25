export class Player {
  //pass the game as reference datatype, passing the entire game object it will not create a copy it will just point to it
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91;
    this.x = 0;
    this.y = this.game.height - this.height;
    this.image = document.getElementById("player");
    this.speed = 0;
    this.maxSpeed = 10;
    this.vy = 0; // vertical speed
    this.weight = 1; // to make it jump
  }

  update(input) {
    // horizental movment
    this.x += this.speed;
    if (input.includes("ArrowRight")) this.speed = this.maxSpeed;
    else if (input.includes("ArrowLeft")) this.speed = -this.maxSpeed;
    else this.speed = 0; // stop movment

    // stop moving outside the of the game area
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;

    // vertical movment
    if (input.includes("ArrowUp") && this.onGround()) this.vy -= 20;
    this.y += this.vy;
    if (!this.onGround()) this.vy += this.weight;
    else this.vy = 0; // stop virical movment
  }

  draw(context) {
    context.fillStyle = "#fff";
    context.fillRect(this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  onGround() {
    return this.y >= this.game.height - this.height;
  }
}
