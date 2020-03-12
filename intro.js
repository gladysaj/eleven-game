function play() {
  document.getElementById('player').play();
  document.getElementById('video').play();
  document.getElementById('start-button').style.display = "none";
}

setTimeout(() => {
  document.getElementById('home-button').style.visibility = "visible";
}, 10 * 1000);