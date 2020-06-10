const Keyboarder = {
  keyState: {},
  isDown: function (keyCode) {
    return this.keyState[keyCode] === true
  },
  on: function (keyCode, callback) {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === keyCode) {
        callback()
      }
    })
  }
}

window.addEventListener('keydown', function (e) {
  Keyboarder.keyState[e.keyCode] = true
})

window.addEventListener('keyup', function (e) {
  Keyboarder.keyState[e.keyCode] = false
})

Keyboarder.KEYS = { LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40, S: 83 }




// CRC:

// 1. Player
// shoot bullets up
// move left and right
// collision with enemies, bonus

// Collaborators:
// enemy 1 & 2
// bonus square

// 2. Enemy 1
// fall down
// collision with player (kill player)
// die if hit by bullets

// Collaborators:
// player
// bullets

// 3. Enemy 2

// 4. Bonus square
// fall down
// collision with player (give player bullets)

// Collaborators:
// player

// 5. Bullets
// shoot upwards
// change from 1 - 2 - 3 depending on bonus square
// collision with enemies (kills)

//Collaborators:
// enemies