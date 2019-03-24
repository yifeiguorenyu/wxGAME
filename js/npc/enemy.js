import DataBus from "../dataBus/databus";
import Animation from "../base/animation"

const Enemy_IMG_SRC = "images/enemy.png";
const Enemy_IMG_WIDTH = 60;
const Enemy_IMG_HEIGHT = 60;

let dataBus = new DataBus();
const __ = {
  speed: Symbol("speed")
};

function rnd(start, end) {
  let num = Math.random() * (end - start) + start;

  return num;
}

export default class Enemy extends Animation {
  constructor() {
    super(Enemy_IMG_SRC, Enemy_IMG_WIDTH, Enemy_IMG_HEIGHT);
    this.initExplosionAnimation()
  }

  init(speed) {
    this.x = rnd(0, window.innerWidth - Enemy_IMG_WIDTH);
    this.y = -Enemy_IMG_HEIGHT;
    this[__.speed] = speed;
    this.visible = true;
  }

  update() {
    this.y += this[__.speed];
    if (this.y > window.innerHeight) {
      dataBus.removeEnemy(this);
    }
  }

  //初始化    爆炸
  initExplosionAnimation(){
     let img = []
     const IMG_COUNT =19
     let imgSrc="images/explosion"
     for(let i=0;i<IMG_COUNT;i++){
        let src = imgSrc+(i+1)+".png"
        img.push(src)
     }
     this.explosionImage(img)
  }

}
