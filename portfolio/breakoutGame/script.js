const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let z = 0;

let isPadNarrow = false;

bricksCount = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 70;

const reqBricks = Math.floor((canvas.width - 400) / 120);

const colors = ["red", "pink", "indigo", "blue", "yellow", "orange"];

let isPadWide = false;

let rand;

let gameOn = true;

let impactMusic = new Audio("impact-sound-effect-8-bit-retro-151796.mp3");

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

let layers = Math.ceil((canvas.height - 400) / 100);

for (let q = 0; q < layers * reqBricks - 6; q++) {
  colors.push(colors[z]);
  z++;
}

let score = 0;

let hitBricks = [];

let bricks = [];

let currentBrickX = 200;
let currentBrickY = 120;

let ballOneIn = true;
let ballTwoIn = false;

let ball = {
  x: 200,
  y: canvas.height - 200,
  size: 20,
  dx: 8,
  dy: -8 * (3 / 4),
};

let ball2 = {
  x: 500,
  y: canvas.height - 200,
  size: 20,
  dx: 8,
  dy: -8 * (3 / 4),
};

let pad = {
  h: 10,
  w: 250,
  x: 200,
  speed: 10,
  y: canvas.height - 100,
  dx: 0,
};

let imagePlus = {
  h: 64,
  w: 64,
  x: Math.floor(Math.random() * (canvas.width - 40)) + 20,
  y: -100,
  dy: 0,
  speed: 10,
  imageURL: new Image(),
};

let imageWide = {
  h: 64,
  w: 64,
  x: Math.floor(Math.random() * (canvas.width - 40)) + 20,
  y: -100,
  dy: 0,
  speed: 10,
  imageURL: new Image(),
};

let imageNarrow = {
  h: 64,
  w: 64,
  x: Math.floor(Math.random() * (canvas.width - 40)) + 20,
  y: -100,
  dy: 0,
  speed: 10,
  imageURL: new Image(),
};

function reset() {
  imagePlus = {
    h: 64,
    w: 64,
    x: Math.floor(Math.random() * (canvas.width - 40)) + 20,
    y: -100,
    dy: 0,
    speed: 10,
    imageURL: new Image(),
  };

  pad = {
    h: 10,
    w: 250,
    x: 200,
    speed: 10,
    y: canvas.height - 100,
    dx: 0,
  };

  ball2 = {
    x: 500,
    y: canvas.height - 200,
    size: 20,
    dx: 8,
    dy: -8 * (3 / 4),
  };

  ball = {
    x: 200,
    y: canvas.height - 200,
    size: 20,
    dx: 8,
    dy: -8 * (3 / 4),
  };

  gameOn = true;
  score = 0;

  hitBricks = [];

  bricks = [];

  currentBrickX = 200;
  currentBrickY = 120;

  ballOneIn = true;
  ballTwoIn = false;
}

imagePlus.imageURL.src = "icons8-plus-64.png";
imageWide.imageURL.src = "icons8-wide-16.png";
imageNarrow.imageURL.src = "icons8-merge-vertical-30.png";

function drawCircle() {
  ctx.fillStyle = "lime";
  ctx.beginPath();
  ctx.moveTo(ball.x + ball.size, ball.y);
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fill();
}

function drawCircle2() {
  ctx.fillStyle = "skyblue";
  ctx.beginPath();
  ctx.moveTo(ball2.x + ball2.size, ball2.y);
  ctx.arc(ball2.x, ball2.y, ball2.size, 0, Math.PI * 2);
  ctx.fill();
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.x - ball.size <= 0) {
    ball.dx = Math.abs(ball.dx);
  }
  if (ball.x + ball.size >= canvas.width) {
    ball.dx = Math.abs(ball.dx) * -1;
  }

  if (ball.y - ball.size <= 0) {
    ball.dy *= -1;
  }

  if (ball.y + ball.size >= canvas.height) {
    if (ballTwoIn) {
      ball.y = Infinity;
      ballOneIn = false;
    } else {
      ball.dy *= -1;
      hitBricks = [];
      score = 0;
    }
  }
  if (
    ball.x + ball.size >= pad.x &&
    ball.x <= pad.x + pad.w &&
    ball.y + ball.size >= pad.y &&
    ball.y <= pad.y + pad.h
  ) {
    ball.dy *= -1;
    impactMusic.play();
    if (ball.x > pad.x && ball.x < pad.x + pad.w / 2 - 50) {
      ball.dx *= -1;
    } else if (ball.x > pad.x && ball.x > pad.x + pad.w / 2 + 50) {
      ball.dx = ball.dx * -1;
    }
  }
}

function moveBall2() {
  ball2.x += ball2.dx;
  ball2.y += ball2.dy;

  if (ball2.x - ball2.size <= 0) {
    ball2.dx = Math.abs(ball2.dx);
  }
  if (ball2.x + ball2.size >= canvas.width) {
    ball2.dx = Math.abs(ball2.dx) * -1;
  }

  if (ball2.y - ball2.size <= 0) {
    ball2.dy *= -1;
  }

  if (ball2.y + ball2.size >= canvas.height) {
    if (ballOneIn) {
      ball2.y = Infinity;
      ballTwoIn = false;
    } else {
      ball.y = 700;
      ball.x = 200;
      ballTwoIn = false;
      ballOneIn = true;
      score = 0;
      hitBricks = [];
    }
  }
  if (
    ball2.x + ball2.size >= pad.x &&
    ball2.x <= pad.x + pad.w &&
    ball2.y + ball2.size >= pad.y &&
    ball2.y <= pad.y + pad.h
  ) {
    ball2.dy *= -1;
    impactMusic.play();
    if (ball2.x > pad.x && ball2.x < pad.x + pad.w / 2 - 50) {
      ball2.dx *= -1;
    } else if (ball2.x > pad.x && ball2.x > pad.x + pad.w / 2 + 50) {
      ball2.dx = ball2.dx * -1;
    }
  }
}

function drawPad() {
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.fillRect(pad.x, pad.y, pad.w, pad.h);
  ctx.fill();
}

function movePad() {
  handlePadCollisions();
  pad.x += pad.dx;
}

function handlePadCollisions() {
  if (pad.x + pad.w < 0) {
    pad.x = canvas.width;
  } else if (pad.x > canvas.width) {
    pad.x = -1 * pad.w;
  }
}

function keyDown(e) {
  if (e.key == "ArrowRight" || e.key == "Right" || e.key == "d") {
    moveRight();
  }
  if (e.key == "ArrowLeft" || e.key == "Left" || e.key == "a") {
    moveLeft();
  }
}

function keyUp(e) {
  if (
    e.key == "ArrowLeft" ||
    e.key == "Left" ||
    e.key == "ArrowRight" ||
    e.key == "Right" ||
    e.key == "d" ||
    e.key == "a"
  ) {
    pad.dx = 0;
  }
}

function moveRight() {
  pad.dx = pad.speed;
}

function moveLeft() {
  pad.dx = -1 * pad.speed;
}

function createLayerOfBricks() {
  for (let x = 0; x < reqBricks; x++) {
    bricksCount++;
    bricks.push({
      x: currentBrickX,
      y: currentBrickY,
      h: 20,
      w: 110,
      hit: false,
      color: colors[bricksCount],
    });
    currentBrickX += 120;
  }

  currentBrickY += 100;
  currentBrickX = 200;
}

function drawBricks() {
  for (let y = 0; y < layers; y++) {
    createLayerOfBricks();
  }

  bricksCount = 0;

  hitBricks.forEach((hitBrickIndex) => {
    bricks.splice(hitBrickIndex, 1);
  });

  bricks.forEach((brick) => {
    ctx.fillStyle = brick.color;
    ctx.beginPath();
    ctx.fillRect(brick.x, brick.y, brick.w, brick.h);
    ctx.fill();
  });

  currentBrickX = 200;
  currentBrickY = 120;
}

function detectBrickCollision() {
  bricks.forEach((brick, index) => {
    if (
      ball.x + ball.size >= brick.x &&
      ball.x <= brick.x + brick.w &&
      ball.y + ball.size >= brick.y &&
      ball.y <= brick.y + brick.h
    ) {
      //   ball.y += brick.h;s
      ball.dy *= -1;
      hitBricks.push(index);
      impactMusic.play();
      score += 1;
    }
  });
}

function detectBrickCollision2() {
  bricks.forEach((brick, index) => {
    if (
      ball2.x + ball2.size >= brick.x &&
      ball2.x <= brick.x + brick.w &&
      ball2.y + ball2.size >= brick.y &&
      ball2.y <= brick.y + brick.h
    ) {
      //   ball2.y += brick.h;s
      ball2.dy *= -1;
      hitBricks.push(index);
      impactMusic.play();
      score += 1;
    }
  });
}

function win() {
  document.querySelector("h2").innerText =
    "You Win! Click anywhere to play again";
  gameOn = false;
}

function drawRed() {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.moveTo(pad.x - 50 + pad.w / 2, pad.y);
  ctx.fillRect(pad.x - 50 + pad.w / 2, pad.y, 100, pad.h);
  ctx.fill();
}

function drawImage() {
  ctx.beginPath();
  ctx.moveTo(imagePlus.x, imagePlus.y);
  ctx.drawImage(
    imagePlus.imageURL,
    imagePlus.x,
    imagePlus.y,
    imagePlus.w,
    imagePlus.h
  );
}

function moveImage() {
  imagePlus.y += imagePlus.dy;

  if (
    imagePlus.x + imagePlus.w >= pad.x &&
    imagePlus.x <= pad.x + pad.w &&
    imagePlus.y + imagePlus.h >= pad.y &&
    imagePlus.y <= pad.y + pad.h
  ) {
    ball2.x = pad.x;
    ball2.y = canvas.height - 200;
    imagePlus.y = -100;
    imagePlus.dy = 0;
    ballTwoIn = true;
    ball2.dy = Math.abs(ball2.dy) * -1;
  }

  if (imagePlus.y >= canvas.height + 5) {
    imagePlus.y = -100;
    imagePlus.dy = 0;
  }
}

function drawImageWide() {
  ctx.beginPath();
  ctx.moveTo(imageWide.x, imageWide.y);
  ctx.drawImage(
    imageWide.imageURL,
    imageWide.x,
    imageWide.y,
    imageWide.w,
    imageWide.h
  );

  //   imageWide.x = Math.floor(Math.random() * canvas.width) - 40 + 20;
}

function moveImageWide() {
  imageWide.y += imageWide.dy;

  if (
    imageWide.x + imageWide.w >= pad.x &&
    imageWide.x <= pad.x + pad.w &&
    imageWide.y + imageWide.h >= pad.y &&
    imageWide.y <= pad.y + pad.h
  ) {
    imageWide.x = Math.floor(Math.random() * (canvas.width - 40)) - 20;
    imageWide.y = -100;
    imageWide.dy = 0;
    pad.w += 120;
    pad.x -= 60;
    isPadWide = true;
    setTimeout(function () {
      pad.w -= 120;
      pad.x += 60;
      isPadWide = false;
    }, 15000);
  }

  if (imageWide.y >= canvas.height + 5) {
    imageWide.y = -100;
    imageWide.dy = 0;
  }
}

function drawImageNarrow() {
  ctx.beginPath();
  ctx.moveTo(imageNarrow.x, imageNarrow.y);
  ctx.drawImage(
    imageNarrow.imageURL,
    imageNarrow.x,
    imageNarrow.y,
    imageNarrow.w,
    imageNarrow.h
  );

  //   imageNarrow.x = Math.floor(Math.random() * canvas.width) - 40 + 20;
}

function moveImageNarrow() {
  imageNarrow.y += imageNarrow.dy;

  if (
    imageNarrow.x + imageNarrow.w >= pad.x &&
    imageNarrow.x <= pad.x + pad.w &&
    imageNarrow.y + imageNarrow.h >= pad.y &&
    imageNarrow.y <= pad.y + pad.h
  ) {
    imageNarrow.x = Math.floor(Math.random() * (canvas.width - 40)) - 20;
    imageNarrow.y = -100;
    imageNarrow.dy = 0;
    pad.w -= 80;
    pad.x += 40;
    isPadWide = true;
    setTimeout(function () {
      pad.w += 80;
      pad.x -= 40;
      isPadWide = false;
    }, 15000);
  }

  if (imageNarrow.y >= canvas.height + 5) {
    imageNarrow.y = -100;
    imageNarrow.dy = 0;
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  i = Math.floor(Math.random() * 500);

  if (gameOn) {
    drawPad();
    drawRed();
    movePad();

    drawImage();
    moveImage();

    drawImageWide();
    moveImageWide();

    drawBricks();
    detectBrickCollision();

    if (ballOneIn) {
      drawCircle();
      moveBall();
    }

    if (ballTwoIn) {
      detectBrickCollision2();
      drawCircle2();
      moveBall2();
    }

    bricks = [];

    if (i == 0) {
      switch (Math.floor(Math.random() * 3)) {
        case 0:
          if (!ballTwoIn) {
            imagePlus.dy = imagePlus.speed;
          }
          break;

        case 1:
          if (!isPadWide) {
            imageWide.dy = imageWide.speed;
          }
          break;

        case 2:
          if (!isPadNarrow) {
            imageNarrow.dy = imageNarrow.speed;
          }
      }
    }
    document.querySelector("h2").innerText = "Score: " + score;
  }

  if (score / layers == reqBricks) {
    document.querySelector("h2").innerText = "You Win! Refresh to start again";

    win();
  }

  requestAnimationFrame(update);
}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

document.addEventListener("click", function () {
  if (!gameOn) {
    reset();
  }
});

update();

//EXTRA FEATURES

function increaseBallSpeed() {
  if (ball.dx >= 10) {
    ball.dx = 10;
    ball.dy = 10 * (4 / 5);
  }
  ball.dx *= 1.2;
  ball.dy *= 1.2;
}

function decreaseBallSpeed() {
  if (ball.dx <= 3 && ball.dx >= -3) {
    ball.dx = 3;
    ball.dy = 3 * (4 / 5);
  }
  ball.dx /= 1.2;
  ball.dy /= 1.2;
}

function increasePadSpeed() {
  if (pad.speed >= 70) {
    pad.speed = 70;
  }
  pad.speed *= 1.2;
}

function decreasePadSpeed() {
  if (pad.speed <= 0.5) {
    pad.speed = 0.5;
  }
  pad.speed /= 1.2;
}

function decreaseBallSize() {
  if (ball.size <= 3.8) {
    ball.size = 3.8;
  }
  ball.size /= 1.1;
}

function increaseBallSize() {
  if (ball.size >= 100) {
    ball.size = 100;
  }
  ball.size *= 1.1;
}

function decreasePadSize() {
  if (pad.w <= 60) {
    pad.w = 60;
  }
  pad.w /= 1.1;
}

function increasePadSize() {
  if (pad.w >= 300) {
    pad.w = 300;
  }
  pad.w *= 1.1;
}

document.addEventListener("keydown", hi);

function hi() {
  ball.dx = 0;
  ball.dy = 0;
  ball2.dx = 0;
  ball2.dy = 0;
}

// document
//   .querySelectorAll("button")[0]
//   .addEventListener("click", increaseBallSpeed);

// document
//   .querySelectorAll("button")[1]
//   .addEventListener("click", decreaseBallSpeed);

// document
//   .querySelectorAll("button")[2]
//   .addEventListener("click", increasePadSpeed);

// document
//   .querySelectorAll("button")[3]
//   .addEventListener("click", decreasePadSpeed);

// document
//   .querySelectorAll("button")[5]
//   .addEventListener("click", increaseBallSize);

// document
//   .querySelectorAll("button")[6]
//   .addEventListener("click", decreaseBallSize);

// document
//   .querySelectorAll("button")[7]
//   .addEventListener("click", increasePadSize);

// document
//   .querySelectorAll("button")[8]
//   .addEventListener("click", decreasePadSize);

// document.querySelectorAll("button")[4].addEventListener("click", function () {
//   if (layers < 12) {
//     layers += 1;
//   }
// });

// document.querySelectorAll("button")[9].addEventListener("click", function () {
//   if (layers > 1) {
//     layers -= 1;
//   }
// });

//TO BE ACCESIBLE ON TOUCHSCREEN ALSO

document.addEventListener("mousemove", function (e) {
  pad.x = e.clientX;
  e.preventDefault;
});

let BgMusic = new Audio("chase-8-bit-73312.mp3");
BgMusic.loop = true;
BgMusic.play();
