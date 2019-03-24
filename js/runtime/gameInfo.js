import DataBus from "../dataBus/databus";

let anis = new Image();
anis.src = "images/Common.png";

let databus = new DataBus();
export default class Gameinfo {
  constructor() {
    this.posXY = {};
  }

  drawInfo(ctx) {
    ctx.fillStyle = "#fff";
    ctx.font = "30px Arial";
    ctx.fillText(databus.score, 20, 30);
  }
  //游戏结束
  drawfinish(ctx) {
    ctx.drawImage(
      anis,
      0,
      0,
      119,
      108,
      window.innerWidth / 2 - 150,
      window.innerHeight / 2 - 100,
      300,
      300
    );
    ctx.fillStyle = "#ffffff";
    ctx.font = "30px Arial";
    ctx.fillText(
      "游戏结束",
      window.innerWidth / 2 - 60,
      window.innerHeight / 2 - 50
    );
    ctx.fillText(
      "得分" + databus.score,
      window.innerWidth / 2 - 60,
      window.innerHeight / 2 + 20
    );
    ctx.drawImage(
      anis,
      120,
      6,
      39,
      24,
      window.innerWidth / 2 - 60,
      window.innerHeight / 2 + 40,
      120,
      40
    );
    ctx.fillText(
      "重新开始",
      window.innerWidth / 2 - 60,
      window.innerHeight / 2 + 120
    );

    this.posXY = {
      startX: (window.innerWidth / 2 - 60),
      startY: (window.innerHeight / 2 + 4),
      endX:(window.innerWidth / 2 - 60 + 120),
      endY: (window.innerHeight / 2 + 40 + 40)
    };
  }
}
