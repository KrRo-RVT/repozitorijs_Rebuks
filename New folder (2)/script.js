let score = 0;
let workPower = 1;
let autoWork = 0;
let coffeeCost = 15;
let keyboardCost = 50;
let assistantCost = 100;
let casinoActive = false;
let casinoTimeLeft = 30;
let currentBackground = 0;
let previousBackground = "";

const scoreText = document.getElementById("score");
const workBtn = document.getElementById("workBtn");
const coffeeBtn = document.getElementById("coffeeUpgrade");
const keyboardBtn = document.getElementById("keyboardUpgrade");
const assistantBtn = document.getElementById("assistantUpgrade");
const coffeeCostText = document.getElementById("coffeeCost");
const keyboardCostText = document.getElementById("keyboardCost");
const assistantCostText = document.getElementById("assistantCost");
const spinBtn = document.getElementById("spinBtn");
const slotMachine = document.getElementById("slotMachine");
const casinoMessage = document.getElementById("casinoMessage");
const casinoTimer = document.getElementById("casinoTimer");
const symbols = ["💼", "☕", "📄", "💰", "⌨️"];
const backgrounds = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTikl0TFyoYX2I1mIre_3agfFgjSPlU8k2icQ&s",
  "https://www.shutterstock.com/image-photo/table-casino-direct-perspective-camera-600nw-2649615425.jpg"
];

workBtn.addEventListener("click", () => {
  score += workPower;
  updateGame();
});

coffeeBtn.addEventListener("click", () => {
  if (score >= coffeeCost) {
    score -= coffeeCost;
    workPower += 1;

    coffeeCost = Math.floor(coffeeCost * 1.5);

    updateGame();
  }
});

keyboardBtn.addEventListener("click", () => {
  if (score >= keyboardCost) {
    score -= keyboardCost;
    workPower += 5;

    keyboardCost = Math.floor(keyboardCost * 1.7);

    updateGame();
  }
});

assistantBtn.addEventListener("click", () => {
  if (score >= assistantCost) {
    score -= assistantCost;
    autoWork += 1;

    assistantCost = Math.floor(assistantCost * 2);

    updateGame();
  }
});

setInterval(() => {
  score += autoWork;
  updateGame();
}, 1000);

function updateGame() {
  scoreText.textContent = score;

  coffeeCostText.textContent = coffeeCost;
  keyboardCostText.textContent = keyboardCost;
  assistantCostText.textContent = assistantCost;
}

setInterval(() => {

  previousBackground = document.body.style.backgroundImage;
  casinoActive = true;
  casinoTimeLeft = 30;

  spinBtn.disabled = false;

  casinoMessage.textContent =
    "🎰 Kazino ir atvērts!";

  const casinoCountdown = setInterval(() => {

    casinoTimer.textContent =
      "Atlikušais laiks: " + casinoTimeLeft + "s";

    casinoTimeLeft--;

    if (casinoTimeLeft < 0) {

      clearInterval(casinoCountdown);

      casinoActive = false;

      spinBtn.disabled = true;

      casinoTimer.textContent = "";

      casinoMessage.textContent =
        "Kazino aizvērts.";

      document.body.style.backgroundImage = previousBackground;
    }

  }, 1000);

}, 60000);

spinBtn.addEventListener("click", () => {

  if (!casinoActive) return;

  let bet = parseInt(document.getElementById("betAmount").value);

  if (isNaN(bet) || bet < 5) {
    casinoMessage.textContent = "❌ Minimālā likme ir 5!";
    return;
  }

  if (score < bet) {
    casinoMessage.textContent = "❌ Nepietiek darba punktu!";
    return;
  }

  score -= bet;

  const s1 = symbols[Math.floor(Math.random() * symbols.length)];
  const s2 = symbols[Math.floor(Math.random() * symbols.length)];
  const s3 = symbols[Math.floor(Math.random() * symbols.length)];

  slotMachine.textContent = `${s1} ${s2} ${s3}`;

  if (s1 === s2 && s2 === s3) {

    let win = bet * 10;
    score += win;

    casinoMessage.textContent = `🎉 JACKPOT! +${win}`;

    casinoActive = false;
    spinBtn.disabled = true;

  }

  else if (s1 === s2 || s2 === s3 || s1 === s3) {

    let win = bet * 3;
    score += win;

    casinoMessage.textContent = `✨ Laba veiksme! +${win}`;

  }

  else {

    casinoMessage.textContent = "😢 Nekas neizkrita...";

  }

  updateGame();

});

setInterval(() => {

  currentBackground++;

  if (currentBackground >= backgrounds.length) {
    currentBackground = 0;
  }

  document.body.style.backgroundImage =
    `url('${backgrounds[currentBackground]}')`;

}, 60000);