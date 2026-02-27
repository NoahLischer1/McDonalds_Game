// Variablen definieren (gemäss Theorie: const für DOM-Elemente, let für veränderliche Werte)
const eagle = document.getElementById("eagle");
const ufo = document.getElementById("ufo");
const scoreElement = document.getElementById("score");

let score = 0;
let isGameOver = false;

// Damit du nur einmal pro Hindernis Punkte bekommst
let passedThisUfo = false;

function fly() {
  if (isGameOver) return;

  eagle.classList.add("fly-animation");
  setTimeout(() => eagle.classList.remove("fly-animation"), 800); // länger in der Luft
}

document.addEventListener("keypress", () => {
  if (isGameOver) return;
  if (!eagle.classList.contains("fly-animation")) fly();
});

function gameOver() {
  isGameOver = true;

  // UFO "einfrieren"
  const ufoLeft = window.getComputedStyle(ufo).getPropertyValue("left");
  ufo.style.animation = "none";
  ufo.style.left = ufoLeft;

  alert("Game Over! Score: " + score);
}

setInterval(() => {
  if (isGameOver) return;

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

  // Collision (ähnliche Logik wie vorher, nur neue Namen)
  if (ufoLeft < 65 && ufoLeft > 0 && eagleTop > 150) {
    gameOver();
    return;
  }

  // Score: doppelt so schnell => +2 pro erfolgreich übersprungenem UFO
  if (ufoLeft < 0 && !passedThisUfo) {
    score += 2;
    scoreElement.innerText = score;
    passedThisUfo = true;
  }
}, 50);
