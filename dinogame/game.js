let dino;
let obstacles = [];
let score = 0;
let gameSpeed = 6;
let isGameOver = false;

function setup() {
    createCanvas(800, 400);
    dino = new Dino();
}

function draw() {
    if (isGameOver) {
        gameOverScreen();
    } else {
        background(255);
        textSize(32);
        fill(0);
        text("Score: " + score, 10, 30);

        // Check for collision and game over
        if (dino.hits(obstacles)) {
            gameOver();
        }

        // Generate obstacles
        if (frameCount % 60 === 0) {
            let r = random(1);
            if (r < 0.5) {
                obstacles.push(new Cactus());
            } else {
                obstacles.push(new Pterodactyl());
            }
        }

        // Update and show obstacles
        for (let i = obstacles.length - 1; i >= 0; i--) {
            obstacles[i].update();
            obstacles[i].show();

            if (obstacles[i].offscreen()) {
                obstacles.splice(i, 1);
                score++;
            }
        }

        dino.show();
        dino.update();
    }
}

function keyPressed() {
    if (key === ' ' || keyCode === UP_ARROW) {
        if (!dino.isJumping) {
            dino.jump();
        }
    }
}

function gameOver() {
    isGameOver = true;
}

function gameOverScreen() {
    textSize(48);
    fill(0);
    text("Game Over", width / 2 - 120, height / 2);
    textSize(32);
    text("Press 'R' to restart", width / 2 - 120, height / 2 + 40);
    if (keyIsDown(82)) {
        // 'R' key
        resetGame();
    }
}

function resetGame() {
    isGameOver = false;
    dino = new Dino();
    obstacles = [];
    score = 0;
}
