import Pool from "../base/pool"

let instance
export default class DataBus{
    constructor(){
        if(instance){
            return instance
        }
        instance =this
       this.restart()
    }
    removeBullet(bullet){
       var temp= this.bullets.shift()
        this.pool.recover("bullet",bullet)
    }

    //回收敌机
    removeEnemy(enemy){
        let temp = this.enemys.shift()
        this.pool.recover("enemy",enemy)
    }

    //初始
    restart(){
        this.pool = new Pool()
        this.bullets=[]
        this.enemys =[]
        this.animations =[]
        this.frame  = 0
        this.score =0
        this.gameover = false
    }
}