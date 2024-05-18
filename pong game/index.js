const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = 300;
const canvasHeight = 150;
const scoreLeft = document.querySelector(".score_left");
const scoreRight = document.querySelector(".score_right");
const startButton = document.querySelector(".new_game");

const radius = 5;
let ballPosX = 50;
let ballPosY = 50;
let paddlePosYR = 10;
let paddlePosYL = 10;
let paddlePosXR = 10;
let paddlePosXL = 280;
let ballSpeedX = 1;
let ballSpeedY = 1;
let paddleSpeed = 5;
const interval = 20;
let leftScore = 0;
let rightScore = 0;
let gameInterval;

// rendering all elements

const renderBg = () => {
  ctx.fillStyle = "#0661b2";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // net
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(canvasWidth / 2, 0);
  ctx.lineTo(canvasWidth / 2, canvasHeight);
  ctx.stroke();
};

const renderBall = (x, y) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = "red";
  ctx.fill();
};

const renderPaddleR = () => {
  ctx.fillStyle = "white";
  ctx.fillRect(paddlePosXR, paddlePosYR, 10, 40);
};

const renderPaddleL = () => {
  ctx.fillStyle = "white";
  ctx.fillRect(paddlePosXL, paddlePosYL, 10, 40);
};

// moving paddles

const changePaddlePosYR = (goingUp) => {
  goingUp ? (paddlePosYR -= paddleSpeed) : (paddlePosYR += paddleSpeed);
};

const changePaddlePosYL = (goingUp) => {
  goingUp ? (paddlePosYL -= paddleSpeed) : (paddlePosYL += paddleSpeed);
};

const handleKeyDownR = (event) => {
  const key = event.key;
  if (key === "w") {
    changePaddlePosYR(true);
  } else if (key === "s") {
    changePaddlePosYR(false);
  }
};

const handleKeyDownL = (event) => {
  const key = event.key;
  if (key === "o") {
    changePaddlePosYL(true);
  } else if (key === "l") {
    changePaddlePosYL(false);
  }
};

document.addEventListener("keydown", handleKeyDownR);
document.addEventListener("keydown", handleKeyDownL);

// changing ball position

const changeBallPos = () => {
  ballPosX += ballSpeedX;
  ballPosY += ballSpeedY;

  //bounce of left and right walls
  // if (ballPosX - radius < 0 || ballPosX > canvasWidth) {
  //   ballSpeedX = -ballSpeedX;
  // }
  //bounce of top and bottom walls
  if (ballPosY - radius < 0 || ballPosY > canvasHeight) {
    ballSpeedY = -ballSpeedY;
  }

  // collision with paddles
  if (
    ballPosX - radius < paddlePosXR + 10 &&
    ballPosX + radius > paddlePosXR &&
    ballPosY + radius > paddlePosYR &&
    ballPosY - radius < paddlePosYR + 40
  ) {
    ballSpeedX = -ballSpeedX;
  }

  if (
    ballPosX + radius > paddlePosXL &&
    ballPosX - radius < paddlePosXL + 10 &&
    ballPosY + radius > paddlePosYL &&
    ballPosY - radius < paddlePosYL + 40
  ) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballPosX - radius < 0) {
    rightScore++;
    scoreRight.textContent = rightScore;
    resetBall();
  } else if (ballPosX + radius > canvasWidth) {
    leftScore++;
    scoreLeft.textContent = leftScore;
    resetBall();
  }
};

const resetBall = () => {
  ballPosX = canvasWidth / 2;
  ballPosY = canvasHeight / 2;
  ballSpeedX = ballSpeedX > 0 ? -1 : 1;
  ballSpeedY = 1;
};

const resetScore = () => {
  scoreRight.textContent = 0;
  scoreLeft.textContent = 0;
};

// rendering whole game

const renderImage = () => {
  renderBg();
  renderPaddleR();
  renderPaddleL();
  renderBall(ballPosX, ballPosY);
  changeBallPos();
};

startButton.addEventListener("click", () => {
  if (gameInterval) {
    clearInterval(gameInterval);
  }
  resetBall();
  resetScore();
  gameInterval = setInterval(() => {
    renderImage();
  }, interval);
});
