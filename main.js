/* eslint-disable prefer-const, no-unused-vars */
/* globals Keyboarder */

class Game {
    constructor () {
      let canvas = document.querySelector('#pixel-run')
      let context = canvas.getContext('2d')
      let gameSize = {x: canvas.width, y: canvas.height}

      this.tickCount = 0
      this.otter = new Otter (gameSize)
     

      this.bodies = []
    
      this.bodies = this.bodies.concat(new Otter(this, gameSize))
      this.bodies = this.bodies.concat(createEnemy(this))
      
      let animate = () => {
        this.update ()
        this.tickCount += 1
        this.tickCount %= 60
        if (this.tickCount === 0) {
              this.bodies = this.bodies.concat(createEnemy(this))
              console.log('animate')
        } 
          
          
        for (let body of this.bodies) {
            if (body instanceof Otter === true ) {
                this.drawOtter(context, gameSize)
            } else if (body instanceof Snake === true) {
                this.drawSnake(context, gameSize, body)
            } else if (body instanceof Log === true) {
                this.drawLog(context, gameSize, body)
            }
        }

        requestAnimationFrame(animate)
      }
      animate ()
    }

    update () {
        console.log('whell')
        let isColliding = (otter) => {
            return this.bodies.filter(function (b2) { return contact(otter, b2)}).length > 0
        }
        for (let i=1; i < this.bodies.length; i++) {
            if (isColliding(this.bodies[0]), this.bodies[i]) {
                console.log('COLLISION COMMENCED')
            }
        }
        for (let i=0; i < this.bodies.length; i++) {
            this.bodies[i].update()
            
        }
    }


    drawOtter (context, gameSize) {
        context.clearRect(0, 0, gameSize.x, gameSize.y)
        let startingXPosition = this.otter.center.x - this.otter.size.x / 2
        let startingYPosition = this.otter.center.y - this.otter.size.y / 2
        
        let imageUrl = new Image()
        imageUrl.src = '../images/otter.png'
        context.drawImage(imageUrl, startingXPosition, startingYPosition)
    }


    // update () {
    //     this.otter.update()
    //     for (let body of this.bodies) {
    //         body.update()
    //     }
    // }

    drawLog (context, gameSize, log) {
        let startingX = log.center.x - log.size.x / 2
        let startingY = log.center.y - log.size.y 

        let imageUrl = new Image()
        imageUrl.src = '../images/log.png'
        context.drawImage(imageUrl, startingX, startingY)

    }

    drawSnake (context, gameSize, snake) {
        let startingX = snake.center.x - snake.size.x / 2
        let startingY = snake.center.y - snake.size.y 

        let imageUrl = new Image()
        imageUrl.src = '../images/snake.png'
        context.drawImage(imageUrl, startingX, startingY)

        
    }
}

// Otter (player)
class Otter {
    constructor (gameSize) {
        this.size = { x: 40, y: 40 }
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
        this.center = { x: Math.random() * gameSize.x, y: 0 }
        this.moveY = 0
        this.speedY = Math.random() * 5
    }
    update () {
        if (this.moveY < -10 || this.moveY > 650) {
            this.speedY += -this.speedY
        }
        
        // let ychange = Math.floor(Math.random()*6)
        this.center.y += this.speedY
        this.moveY += this.speedY

    }
}

// Snake (enemy 2)
class Snake {
    constructor (center) {
        this.size = { x: 25, y: 25 }
        this.center = center
        this.moveY = 0
        this.speedY = Math.random() * 5
    }
    update () {
        if (this.moveY < -10 || this.moveY > 650) {
            this.speedY += -this.speedY
        }
       
        let ychange = Math.floor(Math.random()*6)
        this.center.y += ychange
    }
}

function createEnemy () {
    let enemy = []
    for (let i = 0; i < 1; i++) {
        let x = Math.random() * 400
        let y = -10
        enemy.push (new Snake({x: x, y: y}), new Log({x: x, y: y}))
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

const newGame = document.querySelector('#start')
newGame.addEventListener('click', function () {
    new Game ()
})
    