// Variablen definieren
const eagle = document.getElementById("eagle");
const ufo = document.getElementById("ufo");
const scoreElement = document.getElementById("score");
const startButton = document.getElementById("startButton");

let score = 0;
let isGameOver = false;
let isGameStarted = false;

// Damit du nur einmal pro Hindernis Punkte bekommst
let passedThisUfo = false;

// Spiel anfangs stoppen
ufo.style.animation = "none";

function fly() {
  if (isGameOver || !isGameStarted) return;

  eagle.classList.add("fly-animation");
  setTimeout(() => eagle.classList.remove("fly-animation"), 800);
}

document.addEventListener("keypress", () => {
  if (isGameOver || !isGameStarted) return;
  if (!eagle.classList.contains("fly-animation")) fly();
});

startButton.addEventListener("click", startGame);

function startGame() {
  console.log("Start Button wurde geklickt");

  if (isGameStarted) return;

  isGameStarted = true;
  isGameOver = false;
  score = 0;
  scoreElement.innerText = score;
  passedThisUfo = false;

  // UFO wieder starten
  ufo.style.animation = "ufoMove 1.33s infinite linear";

  // Optional: Button ausblenden
  startButton.style.display = "none";
}

function gameOver() {
  isGameOver = true;
  isGameStarted = false;

  // UFO einfrieren
  const ufoLeft = window.getComputedStyle(ufo).getPropertyValue("left");
  ufo.style.animation = "none";
  ufo.style.left = ufoLeft;

  // Start Button wieder anzeigen
  startButton.style.display = "inline-block";

  alert("Game Over! Score: " + score);
}

setInterval(() => {
  if (isGameOver || !isGameStarted) return;

  const eagleTop = parseInt(
    window.getComputedStyle(eagle).getPropertyValue("top")
  );
  const ufoLeft = parseInt(
    window.getComputedStyle(ufo).getPropertyValue("left")
  );

  // Reset wenn neues UFO von rechts startet
  if (ufoLeft > 500) {
    passedThisUfo = false;
  }

  // Collision
  if (ufoLeft < 65 && ufoLeft > 0 && eagleTop > 150) {
    gameOver();
    return;
  }

  // Score
  if (ufoLeft < 0 && !passedThisUfo) {
    score += 2;
    scoreElement.innerText = score;
    passedThisUfo = true;
  }
}, 50);
