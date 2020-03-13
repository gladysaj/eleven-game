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
      this.imagen.src = 'images/background.png'
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

  if (requestId) {
    requestId = requestAnimationFrame(update);
  }
}

function start() {
  requestId = requestAnimationFrame(update);
}

start();



/* Event listener */
/*addEventListener('keydown', function(event){
  if(event.keyCode === 32){
      marioPerez.y -= 80;
  }
}) */