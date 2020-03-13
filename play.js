const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let requestId;

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

  if (requestId) {
    requestId = requestAnimationFrame(update);
  }
}

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
    this.image2 = new Image();
    this.image2.src = "images/PixelArt (6).png";
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


