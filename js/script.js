const board = document.getElementById("board");
const diceResult = document.getElementById("diceResult");
const scoreDisplay = document.getElementById("score");
const questionContainer = document.getElementById("questionContainer");
const questionText = document.getElementById("questionText");
const questionForm = document.getElementById("questionForm");
const feedback = document.getElementById("feedback");
const gameOverMessage = document.getElementById("gameOverMessage");
let playerPosition = 0;
let score = 0;

const questions = {
  3: {
    question: "Qual é a capital do Brasil?",
    options: ["Rio de Janeiro", "Brasília", "São Paulo"],
    answer: "Brasília",
  },
  7: { question: "Quanto é 5 + 3?", options: ["7", "8", "9"], answer: "8" },
  12: {
    question: "Quem escreveu Dom Quixote?",
    options: ["Shakespeare", "Cervantes", "Machado de Assis"],
    answer: "Cervantes",
  },
  5: {
    question: "Qual é o maior planeta do sistema solar?",
    options: ["Terra", "Marte", "Júpiter"],
    answer: "Júpiter",
  },
  9: {
    question: "Quem pintou a Mona Lisa?",
    options: ["Van Gogh", "Da Vinci", "Picasso"],
    answer: "Da Vinci",
  },
  14: {
    question: "Qual é o elemento químico representado pelo símbolo 'O'?",
    options: ["Oxigênio", "Ouro", "Ósmio"],
    answer: "Oxigênio",
  },
  17: {
    question: "Qual é a moeda oficial do Japão?",
    options: ["Dólar", "Euro", "Iene"],
    answer: "Iene",
  },
  20: {
    question: "Em que ano o homem pisou na Lua pela primeira vez?",
    options: ["1965", "1969", "1972"],
    answer: "1969",
  },
  22: {
    question: "Quem descobriu a penicilina?",
    options: ["Pasteur", "Fleming", "Curie"],
    answer: "Fleming",
  },
  24: {
    question: "Qual é o animal terrestre mais rápido?",
    options: ["Leão", "Guepardo", "Cavalo"],
    answer: "Guepardo",
  },
};

function createBoard() {
  for (let i = 1; i <= 24; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    if (questions[i]) cell.classList.add("question-cell");
    cell.textContent = i;
    cell.setAttribute("id", "cell-" + i);
    board.appendChild(cell);
  }
  updatePlayerPosition();
}

function rollDice() {
  let roll = Math.floor(Math.random() * 7);
  diceResult.textContent = roll;
  movePlayer(roll);
}

function movePlayer(roll) {
  playerPosition += roll;
  if (playerPosition >= 24) {
    playerPosition = 24;
    gameOverMessage.textContent = `Game Over! Pontuação final: ${score}`;
    gameOverMessage.style.display = "block";
  }
  updatePlayerPosition();

  if (questions[playerPosition]) {
    askQuestion(questions[playerPosition]);
  }
}

function updatePlayerPosition() {
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
  const playerCell = document.getElementById("cell-" + playerPosition);
  if (playerCell) {
    playerCell.innerHTML = "<span class='player'>P</span>";
  }
}

function askQuestion(questionObj) {
  questionText.textContent = questionObj.question;
  questionForm.innerHTML = "";
  feedback.textContent = "";
  questionObj.options.forEach((option) => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="quiz" value="${option}"> ${option}`;
    questionForm.appendChild(label);
  });
  questionContainer.style.display = "block";
}
