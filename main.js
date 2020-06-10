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
      this.bodies = this.bodies.concat(new Log(this, gameSize), new Snake(this, gameSize))
      this.bodies = this.bodies.concat(new Otter(this, gameSize))
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
        let startingXPosition = this.otter.center.x - this.otter.size.x / 2
        let startingYPosition = this.otter.center.y - this.otter.size.y / 2
        
        let imageUrl = new Image()
        imageUrl.src = '../images/otter.png'
        context.drawImage(imageUrl, startingXPosition, startingYPosition)
    }

    drawEnemies (context, gameSize) {
        for (let body of bodies) {
            body.update (context)
        }
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

    drawSnake (context, gameSize) {
        let startingX = this.snake.center.x - this.snake.size.x / 2
        let startingY = this.snake.center.y - this.snake.size.y 

        let imageUrl = new Image()
        imageUrl.src = '../images/snake.png'
        context.drawImage(imageUrl, startingX, startingY)

        
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
        let ychange = Math.floor(Math.random()*6)
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
    
    // generateStart (gameSize) {
    //     let startingPositionOptions = ['Top']
    //     let startPosition = startingPositionOptions[Math.floor(Math.random () * startingPositionOptions.length)]

    //     if (startPosition ===  'Top') {
    //         return {x: Math.random() * gameSize.x, y: 0 - this.size.y, dir: 'D'}
    //     }
    // }
    
    update () {
        console.log('enermy update called')

        // this.startPosition
       
        let ychange = Math.floor(Math.random()*6)
        this.center.y += ychange
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