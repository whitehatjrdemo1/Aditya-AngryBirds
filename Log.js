class Log extends BaseClass {
  constructor(x, y, height, angle) {
    super(x, y, 20, height, angle);
    this.image = loadImage("sprites/wood2.png");
    Matter.Body.setAngle(this.body, angle);
  }
  recreate(x, y, height, angle) {
    super.recreate(x, y, 20, height);
    Matter.Body.setAngle(this.body, angle);
  }
}
