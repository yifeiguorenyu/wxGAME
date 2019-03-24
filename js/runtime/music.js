export default class Music{
    constructor(){
        this.bgm = new Audio()
        this.bgm.src="audio/bgm.mp3"
        this.bgm.loop = true

        this.shootbgm = new Audio()
        this.shootbgm.src ="audio/bullet.mp3"

        this.boombgm = new Audio()
        this.boombgm.src ="audio/bullet.mp3"

        this. playbgm()
    }
    playbgm(){
        this.bgm.play()
    }
    playshootbgm(){
        this.shootbgm.play()
        this.shootbgm.currentTime =0
    }
    playboombgm(){
        this.boombgm.play()
        this.boombgm.currentTime =0
    }
}