const canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');
const button = document.getElementById("ready-button");

let frames = 0;
const floorHeight = 70;
let enemies = [];
let eggoCoins = [];
let requestId;
let gameStart = false;
let score = 0;

canvas.style.background = "black";

// Add audio to game
const audio = new Audio();
audio.src = "media/game.mp3";
audio.loop = true;
const eggoSound = new Audio();
eggoSound.src = "media/coin.wav";
const demodogSound = new Audio();
demodogSound.src = "media/eat.wav";
const gameOverSound = new Audio();
gameOverSound.src = "media/lost.wav";
const jumpSound = new Audio();
jumpSound.src = "media/jump.wav";

// Add background
class Background {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.image = new Image();
    this.image.src = 'images/Background copy.png'
  }

  draw() {
    if (this.x < -canvas.width) this.x = 0;
    this.x--;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x + canvas.width, this.y, this.width, this.height);
  }
}

// Add player
class Dustin {
  constructor() {
    this.width = 77;
    this.height = 92;
    this.x = 120;
    this.y = canvas.height - (this.height + floorHeight);
    this.jumping = false;
    this.firstJump = false;
    this.y_velocity = 0;
    this.x_velocity = 0;
    this.image = new Image();
    this.image.src = "images/PixelArt (7).png";
  }

  //Add collision
  collision(item) {
    const itemWidth = item.width - 20;
    const dustinWidth = this.width - 17;
    return (
      this.x < item.x + itemWidth &&
      this.x + dustinWidth > item.x &&
      this.y < item.y + item.height &&
      this.y + this.height > item.y
    );
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

const controller = {
  left:false,
  right:false,
  up:false,
  keyListener: function(event) {
    const key = (event.type == "keydown") ? true : false;

    switch(event.keyCode) {
      case 32: // space key
        restart();
      break;
      case 37: // left key
        controller.left = key;
      break;
      case 38: // up key
        jumpSound.play();
        controller.up = key;
      break;
      case 39: // right key
        controller.right = key;
      break;
    }
  }
};

// Add Demodogs
class Demodogs {
  constructor(param) {
    this.param = param;
    this.distance = 1000;
    this.width = 80;
    this.height = 80;
    this.x = canvas.width;
    this.y = canvas.height - (this.height * 1.8);
    this.image = new Image();
    this.image.src = "images/PixelArt.png";
  }

  draw() {
    if (frames % 7) {
      this.x -= 4;
    }
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

const dustin = new Dustin();
const enemy = new Demodogs();
const background = new Background();

function generateEnemies() {
  const random = Math.floor(Math.random() * 2) + 1;

  if (random === 1) {
    console.log('spawn');
    const enemy = new Demodogs(1000);
    enemies = [...enemies, enemy];
  }
}

function drawingEnemies() {
  enemies.forEach(enemy => {
    enemy.draw();
    if (dustin.collision(enemy)) {
      stop();
    }
  });
}

setInterval(() => {
  if (gameStart) {
    generateEnemies();
  }
}, 2000);


setInterval(() => {
  if (gameStart) {
    generateCoins();
  }
}, 1000);

function update() {
  frames++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.draw();
  dustin.draw();
  drawingEnemies();
  drawingCoins();

  if (controller.up && dustin.jumping == false) {
    dustin.y_velocity -= 60;
    dustin.jumping = true;
  }

  if (controller.left) {
    dustin.x_velocity -= 0.5;
  }

  if (controller.right) {
    dustin.x_velocity += 0.5;
  }

  dustin.x += dustin.x_velocity;
  dustin.y += dustin.y_velocity + 18; // gravity
  dustin.x_velocity *= 0.9;// friction
  dustin.y_velocity *= 0.9;// friction

  // dustin is on floor
  if (dustin.y > canvas.height - (dustin.height + floorHeight)) {
    dustin.jumping = false;
    dustin.y = canvas.height - (dustin.height + floorHeight);
    dustin.y_velocity = 0;
  }

  if (requestId) {
    requestAnimationFrame(update);
  }
}

// Ready button
function start() {
  button.style.display = 'none';
  requestId = requestAnimationFrame(update);
  audio.play();
  gameStart = true;
}

// //Game over
function gameOver() {
  audio.pause();
  audio.currentTime = 0;
  button.style.display = 'block';
  requestId = undefined;
  gameStart = false;
  ctx.font = "100px Courier New";
  ctx.fillStyle = "red";
  ctx.textAlign = "start";
  ctx.fillText("Game Over", 350, 115,);
}

function restart() {
  enemies = [];
  dustin.y = 30;
  frames = 0;
  enemies = [];
  eggoCoins = [];
  start();
}

function stop() {
  audio.pause();
  audio.currentTime = 0;
  demodogSound.play();
  gameOverSound.play();
  requestId = undefined;
  setTimeout (function() {
    gameOver()
  }, 3600);
}

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);

// Add Eggo coins
class Eggos {
  constructor() {
    this.x = canvas.width;
    this.y = canvas.height - (floorHeight * 4.5);
    this.width = 60;
    this.height = 60;
    this.image = new Image();
    this.image.src = "images/STGame-Eggo.png";
  }

  grab() {
    this.width = 0;
    this.height = 0;
  }

  draw() {
    if (frames % 7) {
      this.x -= 7;
    }
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

const coins = new Eggos();

function generateCoins() {
  const random = Math.floor(Math.random() * 3) + 1;
  if (random === 1) {
    const coins = new Eggos();
    eggoCoins = [...eggoCoins, coins];
  }
}

function drawingCoins() {
  eggoCoins.forEach(coin => {
    coin.draw();
    if (dustin.collision(coin)) {
      score += 1;
      eggoSound.play();
      coin.grab();
    }
  });
}
