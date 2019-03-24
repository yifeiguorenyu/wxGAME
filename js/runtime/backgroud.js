import Sprilte from "../base/sprilte.js";
const screenW = window.innerWidth;
const screenH = window.innerHeight;

const BG_IMG_SRC = "images/bg.jpg";
const BG_IMG_WIDTH = screenW;
const BG_IMG_IMAGE = screenH;

export default class Background extends Sprilte {
  constructor(ctx) {
    super(BG_IMG_SRC, BG_IMG_WIDTH, BG_IMG_IMAGE);

    this.top = 0;
  }
  render(ctx) {
    ctx.drawImage(this.img, 0, this.top - this.height, this.width, this.height);
    ctx.drawImage(this.img, 0, this.top, this.width, this.height);
  }
  update() {
    this.top++;
    if (this.top > this.height) {
      this.top = 0;
    }
  }
}
