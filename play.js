const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let requestId;
let enemies = [];
let frames = 0;
const gravity = 0.1;
const button = document.querySelector("button");

//Add audio to game

const audio = new Audio();
audio.src = "media/game.mp3";
audio.loop = true;

ctx.font = "30px Avenir";

function start() {
  button.disabled = true;
  audio.play();
  requestId = requestAnimationFrame(update);
}
//Add background

class Background {
  constructor() {
      this.x = 0
      this.y = 0
      this.width = canvas.width
      this.height = canvas.height
      this.image = new Image()
      this.image.src = 'images/Background copy.png'
  }

  draw() {
    if (this.x < -canvas.width) this.x = 0;
    // restamos en x para moverlo
    this.x--;
    // en caso de alcanzar el final de la imagen reseteamos x
    if (this.x < -canvas.width) {
      this.x = 0;
    }
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height); 
    // dibujamos una segunda imagen al final de la primera
    ctx.drawImage(this.image, this.x + canvas.width, this.y, this.width, this.height); 
  }
}

// Add player 

class Dustin {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.vy = 2;
    this.userPull = 0;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = "images/PixelArt (7).png";
  }

  //Add collision

  collision(item) {
    return (
      this.x < item.x + item.width &&
      this.x + this.width > item.x &&
      this.y < item.y + item.height &&
      this.y + this.height > item.y
    );
  }

  // rise() {
  //   this.y -= 30;
  // }

  draw() {
    // if (this.y <= 212) this.y += 2;
    this.vy = this.vy + (gravity - this.userPull);
    if (this.y + this.height < canvas.height) {
      this.y += this.vy; 
    } else {
      gameOver();
    }
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

// Add Demodogs

class Demodogs {
  constructor() {
    this.x = canvas.width;
    this.y = 490;
    this.width = 80;
    this.height = 80;
    this.image = new Image();
    this.image.src = "images/PixelArt.png";
  }

  draw() {
    if (frames % 10) {
      this.x -= 4;
    } 
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

const dustin = new Dustin(110, 460, 80, 100);
const enemy = new Demodogs();
const background = new Background();

function generateEnemies() {
  if (frames % 100 == 0 || frames % 60 == 0 || frames % 170 == 0) {
    const enemy = new Demodogs();
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

function update() {
  frames++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.draw();
  dustin.draw();
  generateEnemies();
  drawingEnemies();
  if (!requestId) gameOver();
  if (requestId) {
    requestId = requestAnimationFrame(update);
  }
}

function start() {
  button.disabled = true;
  audio.play();
  requestId = requestAnimationFrame(update);
}

// function stop() {
//   background.gameOver();
//   requestId = undefined;
// }

//Game over

function gameOver() {
  audio.pause();
  button.disabled = false;
  button.onclick = restart;
  requestId = undefined;
  ctx.font = "100px Courier New";
  ctx.fillStyle = "red";
  ctx.textAlign = "start";
  ctx.fillText("Game Over", 350, 115,);
}

function restart() {
  dustin.y = 40;
  audio.currentTime = 0;
  start();
}

start();

// Move player

document.onkeydown = function(e) {
  if (e.keyCode === 82) {
    restart();
  }
  if (e.keyCode == 32) {
    dustin.userPull = 0.3;
  }
};

document.onkeyup = function(e) {
  if (e.keyCode == 32) {
    dustin.userPull = 0;
  }
};

button.onclick = start;


