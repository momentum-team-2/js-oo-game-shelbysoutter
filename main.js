/* eslint-disable prefer-const, no-unused-vars */
/* globals Keyboarder */

class Game {
    constructor () {
      let canvas = document.querySelector('#pixel-run')
      let context = canvas.getContext('2d')
      let gameSize = {x: canvas.width, y: canvas.height}

      this.tickCount = 0
      this.otter = new Otter (gameSize)
      this.log = new Log (gameSize)
      this.snake = new Snake (gameSize)
    //   this.fish = new Fish (gameSize)

      this.bodies = []
      // add the enemies to the array
      this.bodies = this.bodies.concat(createEnemy(this))
      this.bodies = this.bodies.concat(new Otter(this, gameSize))
    //   this.bodies = this.bodies.concat(new Log (this, gameSize))
      
      let animate = () => {
        this.tickCount += 1
        this.tickCount % 60
        if (this.tickCount === 0) {
              this.bodies = this.bodies.concat(createEnemy(this))
              console.log('animate')
          } 
          this.update ()
          
        // for (let body of this.bodies) {
        //     if (body instanceof Otter === true ) {
        //         this.drawOtter(context, gameSize)
        //     } else if (body instanceof Snake === true) {
        //         this.drawSnake(context, gameSize)
        //     } else if (body instanceof Log === true) {
        //         this.drawLog(context, gameSize)
        //     }
        // }
          this.drawOtter(context, gameSize)
          this.drawLog(context, gameSize)
          this.drawSnake(context, gameSize)

        requestAnimationFrame(animate)
      }
      animate ()
    }

    // update () {
    //     let noCollision = (b1) => {
    //         return this.bodies.filter(function (b2) { return contact(b1, b2)}.length === 0)
    //     }
    //     this.bodies = this.bodies.filter(noCollision)
    //     for (let i=0; i < this.bodies.lenth; i++) {
    //         this.bodies[i].update()
    //     }
    // }


    drawOtter (context, gameSize) {
        context.clearRect(0, 0, gameSize.x, gameSize.y)
        let startingXPosition = this.otter.center.x - this.otter.size.x / 2
        let startingYPosition = this.otter.center.y - this.otter.size.y / 2
        
        let imageUrl = new Image()
        imageUrl.src = '../images/otter.png'
        context.drawImage(imageUrl, startingXPosition, startingYPosition)
    }


    update () {
        this.otter.update ()
        this.log.update ()
        this.snake.update ()
    }

    drawLog (context) {
        let startingX = this.log.center.x - this.log.size.x / 2
        let startingY = this.log.center.y - this.log.size.y 

        let imageUrl = new Image()
        imageUrl.src = '../images/log.png'
        context.drawImage(imageUrl, startingX, startingY)

    }

    drawSnake (context) {
        let startingX = this.snake.center.x - this.snake.size.x / 2
        let startingY = this.snake.center.y - this.snake.size.y 

        let imageUrl = new Image()
        imageUrl.src = '../images/snake.png'
        context.drawImage(imageUrl, startingX, startingY)

        
    }
}

// Otter (player)
class Otter {
    constructor (gameSize) {
        this.size = { x: 35, y: 35 }
        this.center = { x: gameSize.x / 2, y: gameSize.y - this.size.y}
        this.keyboarder = Keyboarder
    }

    update () {
        if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
            this.center.x += 2
          } else if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
            this.center.x -= 2
        }
    }
}

// Log (enemy 1)
class Log {
    constructor (gameSize) {
        this.size = { x: 25, y: 25 }
        this.center = { x: gameSize.x / 2, y: gameSize.y - this.size.y * 23 }
        this.moveY = 0
        this.speedY = Math.random() * 4
    }
    update () {
        if (this.moveY < -10 || this.moveY > 600) {
            this.speedY += -this.speedY
        }
        
        // let ychange = Math.floor(Math.random()*6)
        this.center.y += this.speedY
        this.moveY += this.speedY

    }
}

// Snake (enemy 2)
class Snake {
    constructor (gameSize) {
        this.size = { x: 25, y: 25 }
        this.center = { x: gameSize.x / 1.5, y: gameSize.y - this.size.y * 23 }
        this.moveY = 0
        this.speedY = Math.random() * 4
    }
    update () {
        if (this.moveY < -10 || this.moveY > 600) {
            this.speedY += -this.speedY
        }
       
        let ychange = Math.floor(Math.random()*6)
        this.center.y += ychange
    }
}

function createEnemy (game) {
    let enemy = []
    for (let i = 0; i < 1; i++) {
        let x = Math.random() * 300
        let y = -80
        enemy.push (new Snake(game, {x: x, y: y}), new Log(game, {x: x, y: y}))
    }
    return enemy
}

// Collision function
function contact (b1, b2) {
    return !(
        b1 === b2 ||
            b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x / 2 ||
            b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y / 2 ||
            b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x / 2 ||
            b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y / 2 
    )
}


let game = new Game
// window.addEventListener('load', function () {
//     new Game()
// })

// const newGame = document.querySelector('#start')
// newGame.addEventListener('submit', function ()) {
//     new Game ()
// }