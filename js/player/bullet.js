import Sprilte from "../base/sprilte.js"
import DataBus from "../dataBus/databus"

const BULLET_IMG_SRC= "images/bullet.png"
const BULLET_IMG_WIDTH =16
const BULLET_IMG_HEIGHT=30

const __={
    speed:Symbol("speed")
}

let databus = new DataBus()

export default class Bullet extends Sprilte{
    constructor(){
        super(BULLET_IMG_SRC,BULLET_IMG_WIDTH,BULLET_IMG_HEIGHT)
    }

    init(x,y,speed){
        this.x =x
        this.y = y
        this[__.speed]= speed
        this.visible =true
    }

    update(){
        this.y-= this[__.speed]
        if(this.y<-this.height){
            databus.removeBullet(this)
           
        }
    }
}