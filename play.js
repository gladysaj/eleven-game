
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let requestId;
let enemies = [];

class Background{
  constructor(){
      this.x = 0
      this.y = 0
      this.width = canvas.width
      this.height = canvas.height
      this.imagen = new Image()
      this.imagen.src = 'images/Background copy.png'
  }

  draw(){
    // restamos en x para moverlo
    this.x--;
    // en caso de alcanzar el final de la imagen reseteamos x
    if(this.x < -canvas.width) this.x = 0;
    ctx.drawImage(this.imagen,this.x,this.y,this.width,this.height); 
  // dibujamos una segunda imagen al final de la primera
   ctx.drawImage(this.imagen,this.x + this.width,this.y,this.width,this.height); 
 }
}

const background = new Background();

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.draw();
  dustin.draw();
  enemy.draw();

  if (requestId) {
    requestId = requestAnimationFrame(update);
  }
}

addEventListener("keydown", e => {
  if (e.keyCode === 32) {
    dustin.y -= 20;
  }
  if (e.keyCode === 39) {
    dustin.x += 10;
  }
  if (e.keyCode === 37) {
    dustin.x -= 20;
  }
});

function start() {
  requestId = requestAnimationFrame(update);
}

start();

// Add player 

class Dustin {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image1 = new Image();
    this.image1.src = "images/PixelArt (7).png";
    this.image = this.image1;
  }

  draw() {
    if (this.y <= 212) this.y += 2;
    if (frames % 10 === 0) {
      this.image = this.image === this.image1 ? this.image2 : this.image1;
    }
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

const dustin = new Dustin(110, 460, 80, 100);

//Add Demo-dogs

class Enemy {
  constructor() {
    this.x = canvas.width;
    this.y = 232;
    this.width = 80;
    this.height = 80;
    this.image = new Image();
    this.image.src = "images/PixelArt.png";
  }

  draw() {
    if (frames % 10) this.x -= 5;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

const enemy = new Enemy();


