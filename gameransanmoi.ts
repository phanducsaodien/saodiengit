<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Snake Game</title>
  <style>
    body {
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #222;
      color: #fff;
      font-family: Arial, sans-serif;
    }
    canvas {
      border: 2px solid #fff;
      background-color: #000;
    }
  </style>
</head>
<body>
<canvas id="gameCanvas" width="400" height="400"></canvas>
<script>
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  const gridSize = 20; // Size of each grid square
  const rows = canvas.height / gridSize;
  const cols = canvas.width / gridSize;

  let snake = [{ x: 10, y: 10 }]; // Snake starts with one segment
  let food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
  let direction = { x: 0, y: 0 }; // Snake starts stationary
  let nextDirection = { x: 0, y: 0 };
  let score = 0;

  function drawGrid() {
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function drawSnake() {
    ctx.fillStyle = "#0f0";
    for (let segment of snake) {
      ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    }
  }

  function drawFood() {
    ctx.fillStyle = "#f00";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
  }

  function moveSnake() {
    direction = nextDirection;

    // Calculate the new head position
    const newHead = {
      x: (snake[0].x + direction.x + cols) % cols,
      y: (snake[0].y + direction.y + rows) % rows,
    };

    // Check for collisions with the snake itself
    if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
      alert(`Game Over! Your score: ${score}`);
      resetGame();
      return;
    }

    // Add the new head to the snake
    snake.unshift(newHead);

    // Check if the snake eats the food
    if (newHead.x === food.x && newHead.y === food.y) {
      score++;
      food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
    } else {
      snake.pop(); // Remove the last segment if no food is eaten
    }
  }

  function resetGame() {
    snake = [{ x: 10, y: 10 }];
    food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
    direction = { x: 0, y: 0 };
    nextDirection = { x: 0, y: 0 };
    score = 0;
  }

  function gameLoop() {
    drawGrid();
    drawSnake();
    drawFood();
    moveSnake();

    setTimeout(gameLoop, 100); // Adjust speed here
  }

  window.addEventListener("keydown", e => {
    const keyDirection = {
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
    };

    if (keyDirection[e.key]) {
      const newDirection = keyDirection[e.key];
      if (snake.length === 1 || newDirection.x !== -direction.x && newDirection.y !== -direction.y) {
        nextDirection = newDirection;
      }
    }
  });

  gameLoop();
</script>
</body>
</html>