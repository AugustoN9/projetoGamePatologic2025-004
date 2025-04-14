let currentPosition = 0;
      let startTime = null;
      let timerInterval = null;

      function startGame() {
        if (currentPosition === 0) {
          startTime = Date.now();
          timerInterval = setInterval(updateTimer, 1000);
        }
        rollDice();
      }

      function rollDice() {
        let steps = Math.floor(Math.random() * 6) + 1;
        document.getElementById("diceResult").innerText = "Valor: " + steps;
        movePlayer(steps);
      }

      function movePlayer(steps) {
        let newPosition = currentPosition + steps;
        if (newPosition > 25) newPosition = 25;

        let targetCell = document.getElementById(`cell-${newPosition}`);
        let player = document.getElementById("player");

        if (targetCell) {
          let rect = targetCell.getBoundingClientRect();
          let parentRect = document
            .querySelector(".container")
            .getBoundingClientRect();
          player.style.left = rect.left - parentRect.left + "px";
          player.style.top = rect.top - parentRect.top + "px";
          currentPosition = newPosition;
          document.getElementById("currentPositionDisplay").innerText =
            "Posição Atual: " + currentPosition;
        }
        if (currentPosition === 25) {
          clearInterval(timerInterval);
          alert(
            "Parabéns! Você completou o jogo em " +
              document.getElementById("timer").innerText
          );
        }
      }

      function updateTimer() {
        if (startTime) {
          let elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
          document.getElementById("timer").innerText =
            "Tempo: " + elapsedSeconds + "s";
        }
      }