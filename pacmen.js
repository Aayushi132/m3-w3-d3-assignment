const pacMen = []; // This array holds all the pacmen

var canvas = document.getElementById("myCanvas");
/* Rresize the canvas to occupy the full page, 
   by getting the widow width and height and setting it to canvas*/
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log("width: " + canvas.width);
console.log("height: " + canvas.height);

var ctx = canvas.getContext("2d");
var ballRadius = 50;
var x = canvas.width / 2;
var y = canvas.height - 150;
var dx = 2;
var dy = -2;

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);

  // Add image to div id = game
  let game = document.getElementById("game");
  let newimg = document.createElement("img");
  newimg.style.position = "absolute";
  newimg.src = "./images/PacMan1.png";
  newimg.width = 100;

  // TODO: set position here
  newimg.style.top = position.y;
  newimg.style.left = position.x;

  // TODO add new Child image to game
  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    newimg,
  };
}

function update() {
  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
    // checkCollisions(item);
    // item.position.x -= dx;
    // item.position.y -= dy;
  });
  setTimeout(update, 20);
}

function checkCollisions(item) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // TODO: detect collision with all walls and make pacman bounce
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
    console.log("dx: " + dx);
  }
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
    console.log("dy: " + dy);
  }

  x += dx;
  y += dy;
  console.log("y: " + y);
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

//don't change this line
if (typeof module !== "undefined") {
  module.exports = { checkCollisions, update, pacMen };
}

// function drawBall() {
//   ctx.beginPath();
//   ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
//   ctx.fillStyle = "#0095DD";
//   ctx.fill();
//   ctx.closePath();
// }

// function draw() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   // drawBall();

//   if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
//     dx = -dx;
//   }
//   if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
//     dy = -dy;
//   }

//   x += dx;
//   y += dy;
// }

// setInterval(draw, 10);
