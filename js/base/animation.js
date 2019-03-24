import Sprite from "../base/sprilte";
import DataBus from "../dataBus/databus";

let datatbus = new DataBus();

const __ = {
  timer: Symbol("timer")
};

export default class Animation extends Sprite {
  constructor(imgSrc, width, height) {
    super(imgSrc, width, height);
    this.imgList = [];
    this.count = 0;
    this.index = 0;
    this.interval = 1000 / 60;
    this[__.timer] = null;
    datatbus.animations.push(this);
  }
  explosionImage(imgList) {
    imgList.forEach(element => {
      let img = new Image();
      img.src = element;
      this.imgList.push(img);
    });
    this.count = this.imgList.length;
  }

  //播放爆炸动画
  playExplosion() {
    this.visible = false;
    this.playing = true;
    this[__.timer] = setInterval(() => {
      this.frameplay();
    }, this.interval);
  }

  //控制当前
  frameplay() {
    if (this.index == this.count - 1) {
      this.index = 0;
      this.stop();
    }
    this.index++;
  }

  //停止定时器
  stop() {
    this.playing = false;
    clearInterval(this[__.timer]);
  }

  //绘制爆炸
  anirender(ctx) {
    ctx.drawImage(
      this.imgList[this.index],
      this.x,
      this.y,
      this.width * 1.2,
      this.height * 1.2
    );
  }
}
