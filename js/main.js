import Background from "./runtime/backgroud";
import Music from "./runtime/music.js";
import Player from "./player/index";
import DataBus from "./dataBus/databus.js";
import Enemy from "./npc/enemy.js";
import GameInfo from "./runtime/gameInfo";

let ctx = canvas.getContext("2d");
let databus = new DataBus();

export default class Main {
  constructor() {
    this.restart();
    this.id = 0;
  }

  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.backgroud.render(ctx);
    this.draw();
    this.player.drawToCanvas(ctx);
    databus.animations.forEach(item => {
      if (item.playing) {
        item.anirender(ctx);
      }
    });
    this.gameinfo.drawInfo(ctx);
  }

  update() {
    if (databus.gameover) {
      this.gameinfo.drawfinish(ctx);
      if (!this.istouch) {
        this.istouch = true;
        this.touchHandle();
      }

      return;
    }
    this.backgroud.update();
    this.createEnemy();
    if (databus.frame % 10 == 0) {
      this.music.playshootbgm();
      this.player.shoot();
    }
    databus.bullets.concat(databus.enemys).forEach(item => {
      item.update();
    });
    this.bang();
  }

  loop() {
    databus.frame++;
    this.id = requestAnimationFrame(() => {
      this.render();
      this.update();
      this.loop();
    });
  }

  draw() {
    //绘制子弹和飞机
    databus.bullets.concat(databus.enemys).forEach(item => {
      item.drawToCanvas(ctx);
    });
  }
  //绘制敌机
  createEnemy() {
    if (databus.frame % 30 == 0) {
      let enemy = databus.pool.checkpollDicNum("enemy", Enemy);
      enemy.init(6);
      databus.enemys.push(enemy);
    }
  }

  //全局碰撞检测
  bang() {
    //检测子弹和敌机的碰撞
    databus.bullets.forEach(bullet => {
      for (let i = 0; i < databus.enemys.length; i++) {
        let enemy = databus.enemys[i];
        var isbang = enemy.isbang(bullet);
        if (isbang) {
          enemy.playExplosion();
          this.music.playboombgm();
          bullet.visible = false;
          databus.score++;
        }
      }
    });

    //检测飞机和敌机的碰撞
    for (let i = 0; i < databus.enemys.length; i++) {
      let enemy = databus.enemys[i];
      let isbang = enemy.isbang(this.player);
      if (isbang) {
        databus.gameover = true;
      }
    }
  }

  //重新开始
  touchHandle() {
    canvas.addEventListener("touchstart", e => {
      e.preventDefault();
      let x = e.touches[0].clientX;
      let y = e.touches[0].clientY;
      let posXY = this.gameinfo.posXY;
      if (
        x > posXY.startX &&
        x < posXY.endX &&
        y > posXY.startY &&
        y < posXY.endY
      ) {
        this.restart()
      }
    });
  }

  //初始haunt
  restart() {
    databus.restart();

    canvas.removeEventListener("touchstart", () => {
      this.touchHandle;
    });

    this.istouch = false;
    this.backgroud = new Background(ctx);
    this.music = new Music();
    this.player = new Player();
    this.gameinfo = new GameInfo();

    //清空上一次的动画
    window.cancelAnimationFrame(this.id);
    this.loop();
  }
}
