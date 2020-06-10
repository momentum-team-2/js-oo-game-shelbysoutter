/* eslint-disable prefer-const, no-unused-vars */
/* globals Keyboarder */

class Game {
    constructor () {
      let canvas = document.querySelector('#pixel-run')
      let context = canvas.getContext('2d')
      let gameSize = {x: canvas.width, y: canvas.height}

      this.otter = new Otter (gameSize)
      this.log = new Log (gameSize)
      this.snake = new Snake (gameSize)
    //   this.fish = new Fish (gameSize)

      this.bodies = []
      // add the enemies to the array
      this.bodies = this.bodies.concat(new Log(this, context), new Snake(this, gameSize))
    //   this.bodies = this.bodies.concat(new Log (this, gameSize))
      
      let animate = () => {
          this.update ()
          this.drawOtter(context, gameSize)
          this.drawLog(context, gameSize)
          this.drawSnake(context, gameSize)
        //   this.drawFish(context, gameSize)
          requestAnimationFrame(animate)
      }
      animate ()
    }

    drawOtter (context, gameSize) {
        context.clearRect(0, 0, gameSize.x, gameSize.y)
        context.fillStyle = 'black'
        let startingXPosition = this.otter.center.x - this.otter.size.x / 2
        let startingYPosition = this.otter.center.y - this.otter.size.y / 2
        let otterWidth = this.otter.size.x
        let otterHeight = this.otter.size.y
        context.fillRect(startingXPosition, startingYPosition, otterWidth, otterHeight)
        // context.fillRect(0, 50, 30, 30)
    }

    draw (context, gameSize) {
        for (let body of bodies) {
            body.update ()
        }
    }

    update () {
        this.otter.update ()
        // this.log.update ()
    }

    drawLog (context) {
        context.fillStyle = 'red'
        let startingX = this.log.center.x - this.log.size.x / 2
        let startingY = this.log.center.y - this.log.size.y 
        let logWidth = this.log.size.x
        let logHeight = this.log.size.y
        context.fillRect(startingX, startingY, logWidth, logHeight)
        // context.fillRect(0, 0, 30, 30)
    }

    update () {
        this.log.update ()
    }

    drawSnake (context) {
        context.fillStyle = 'blue'
        let startingX = this.snake.center.x - this.snake.size.x / 2
        let startingY = this.snake.center.y - this.snake.size.y 
        let snakeWidth = this.snake.size.x
        let snakeHeight = this.snake.size.y
        context.fillRect(startingX, startingY, snakeWidth, snakeHeight)
    }

    // drawFish (context, gameSize) {
    //     context.fillStyle = 'green'
    //     let startingX = this.fish.center.x - this.fish.size.x / 2
    //     let startingY = this.fish.center.y - this.fish.size.y 
    //     let fishWidth = this.fish.size.x
    //     let fishHeight = this.fish.size.y
    //     context.fillRect(startingX, startingY, fishWidth, fishHeight)
    // }


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
    }
    update () {
        let ychange = Math.floor(Math.random()*10)
        this.center.y += ychange
    }
    // add movement
   
}

// Snake (enemy 2)
class Snake {
    constructor (gameSize) {
        this.size = { x: 25, y: 25 }
        this.center = { x: gameSize.x / 1.5, y: gameSize.y - this.size.y * 23 }
    }
    update () {
        this.snake.update ()
    }
    // add movement
}

// Fish (bonus life)

// class Fish {
//     constructor (gameSize) {
//         this.size = { x: 30, y: 30 }
//         this.center = { x: gameSize.x / 3, y: gameSize.y - this.size.y * 19 }
//     }
//     update () {
//         this.fish.update ()
//     }

// Collision function



let game = new Game()