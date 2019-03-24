import Sprilte from "../base/sprilte.js";
import Pool from "../base/pool"
import Bullet from  "./bullet.js"
import DataBus from "../dataBus/databus.js"

const screenW = window.innerWidth;
const screenH = window.innerHeight;

const BG_IMG_SRC = "images/hero.png";
const BG_IMG_WIDTH = 80;
const BG_IMG_HEIGHT = 80;

let databus = new DataBus()

export default class Plane extends Sprilte {
  constructor() {
    super(BG_IMG_SRC, BG_IMG_WIDTH, BG_IMG_HEIGHT);
    this.init();
    this.initEvent();
    this.bullet = []
    this.touched = false;
  }
  init() {
    this.x = screenW / 2 - this.width / 2;
    this.y = screenH - this.height - 30;
  }

  initEvent() {
    canvas.addEventListener("touchstart", e => {
      e.preventDefault();
      let x = e.touches[0].clientX;
      let y = e.touches[0].clientY;
      if (this.ischeckedPalne(x, y)) {
        this.touched = true;
        this.setPoint(x,y)
      }
    });
    canvas.addEventListener("touchmove", e => {
      e.preventDefault();
      let x = e.touches[0].clientX;
      let y = e.touches[0].clientY;
      if (this.touched) {
        this.setPoint(x,y)
      }
    });
    canvas.addEventListener("touchend", e => {
      e.preventDefault();
      this.touched = false
    });
  }
//是否有点到
  ischeckedPalne(x, y) {
    return (
      x > this.x &&
      x < this.x + this.width &&
      y > this.y &&
      y < this.y + this.width
    );
  }
//设置x y
  setPoint(x,y){
    let disX = x - this.width/2
    let disY = y -this.height/2
    if(disX<0){
        disX=0
    }else if(disX>screenW-this.width){
        disX=screenW-this.width
    }
    if(disY<0){
        disY=0
    }else if(disY>screenH-this.height){
        disY=screenH-this.height
    }
    this.x = disX
    this.y = disY
    
  }
  //

  //子弹发射的方法
  shoot(){
    let bullet =databus.pool.checkpollDicNum("bullet",Bullet)
    let bulletX = this.x +this.width/2 -bullet.width/2
    let bulletY = this.y +20
    bullet.init(bulletX,bulletY,10)
    databus.bullets.push(bullet)
  }
}


