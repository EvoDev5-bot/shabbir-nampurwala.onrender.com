const rulesBtn = document.querySelector("#rules");

const rulesDiv = document.querySelector("#rulesBox");

const rulesCrossBtn = document.querySelector("#topPartOfRules img");

rulesBtn.addEventListener("click", rulesBtnClickHandler);

rulesCrossBtn.addEventListener("click", rulesCrossBtnClickHandler);

const rockPaperScissorsButtons = document.querySelectorAll(".option");

let playerOption = null;

let i = 0;

let rand = null;

let score = 0;

document.querySelector("#drawMsg button").addEventListener("click", reset);

const winnersList = [
  {
    chosen: 0,
    win: 2,
  },
  {
    chosen: 1,
    win: 0,
  },
  {
    chosen: 2,
    win: 1,
  },
];

rockPaperScissorsButtons.forEach((element, index) => {
  element.addEventListener("click", function () {
    playerOption = index;
    stageTwo();
  });
});

function rulesBtnClickHandler() {
  rulesDiv.style.display = "flex";
}

function rulesCrossBtnClickHandler() {
  rulesDiv.style.display = "none";
}

function stageTwo() {
  document.querySelector("#theTriangle").style.display = "none";
  document.querySelector("#stageTwo").style.display = "flex";

  switch (playerOption) {
    case 0:
      document
        .querySelector("#stageTwo #rock img")
        .setAttribute("src", "./images/icon-paper.svg");
      document.querySelector("#stageTwo #rock").setAttribute("id", "paper");
      break;
    case 1:
      document
        .querySelector("#stageTwo #rock img")
        .setAttribute("src", "./images/icon-scissors.svg");
      document.querySelector("#stageTwo #rock").setAttribute("id", "scissors");
      break;
    case 2:
      break;
  }
  i = 0;
  var next = setInterval(function () {
    i++;
    if (i == 3) {
      stageThree();
      clearInterval(next);
    }
  }, 100);
}

function stageThree() {
  rand = Math.floor(Math.random() * 3);
  document.querySelector("#stageTwo #circle").setAttribute("class", "option");

  switch (rand) {
    case 0:
      document.querySelector("#stageTwo #circle").setAttribute("id", `paper`);

      if (playerOption == 0) {
        document.querySelectorAll(
          "#stageTwo #paper"
        )[1].innerHTML += `        <div id="before">
          <div id="after"><img src="./images/icon-paper.svg">"           </div>
        </div>`;
      } else {
        document.querySelector(
          "#stageTwo #paper"
        ).innerHTML += `        <div id="before">
          <div id="after"><img src="./images/icon-paper.svg">
            </div>
        </div>`;
      }
      break;
    case 1:
      document
        .querySelector("#stageTwo #circle")
        .setAttribute("id", `scissors`);

      if (playerOption == 1) {
        document.querySelectorAll(
          "#stageTwo #scissors"
        )[1].innerHTML += `        <div id="before">
          <div id="after"><img src="./images/icon-scissors.svg">            </div>
        </div>`;
      } else {
        document.querySelector(
          "#stageTwo #scissors"
        ).innerHTML += `        <div id="before">
          <div id="after"><img src="./images/icon-scissors.svg">            </div>
        </div>`;
      }
      break;
    case 2:
      document.querySelector("#stageTwo #circle").setAttribute("id", `rock`);

      if (playerOption == 2) {
        document.querySelectorAll(
          "#stageTwo #rock"
        )[1].innerHTML += `        <div id="before">
          <div id="after"><img src="./images/icon-rock.svg">
             </div>
        </div> `;
      } else {
        document.querySelector(
          "#stageTwo #rock"
        ).innerHTML += `        <div id="before">
          <div id="after"><img src="./images/icon-rock.svg">
             </div>
        </div>`;
      }
      break;
  }

  stageFour();
}

function stageFour() {
  document.querySelector("#drawMsg").style.display = "flex";
  winnersList.forEach((element) => {
    if (element.chosen == playerOption) {
      if (element.win == rand) {
        switch (playerOption) {
          case 0:
            document.querySelector("#stageTwo #paper").classList.add("win");
            break;
          case 1:
            document.querySelector("#stageTwo #scissors").classList.add("win");
            break;
          case 2:
            document.querySelector("#stageTwo #rock").classList.add("win");
            break;
        }
        document.querySelector("#drawMsg h1").innerText = "YOU WIN";
        score++;
        setScore();
      } else if (element.chosen != rand) {
        switch (rand) {
          case 0:
            document.querySelector("#stageTwo #paper").classList.add("win");
            break;
          case 1:
            document.querySelector("#stageTwo #scissors").classList.add("win");
            break;
          case 2:
            document.querySelector("#stageTwo #rock").classList.add("win");
            break;
        }
        document.querySelector("#drawMsg h1").innerText = "YOU LOSE";
      } else {
        document.querySelector("#drawMsg h1").innerText = "ITS A DRAW";
      }
    }
  });
}

function reset() {
  document.querySelector("#drawMsg").style.display = "none";
  try {
    document.querySelector("#stageTwo #paper").classList.remove("win");
    document.querySelector("#stageTwo #scissors").classList.remove("win");
    document.querySelector("#stageTwo #rock").classList.remove("win");
    document.querySelector("#stageTwo #paper img").setAttribute("src", "");
    document.querySelector("#stageTwo #scissors img").setAttribute("src", "");
    document.querySelector("#stageTwo #rock img").setAttribute("src", "");
    console.log("hi");
  } catch (err) {}

  if (playerOption != rand) {
    switch (rand) {
      case 0:
        document
          .querySelector("#stageTwo #paper")
          .classList.forEach((elem) =>
            document.querySelector("#stageTwo #paper").classList.remove(elem)
          );
        document.querySelector("#stageTwo #paper").setAttribute("id", "circle");
        break;

      case 1:
        document
          .querySelector("#stageTwo #scissors")
          .classList.forEach((elem) =>
            document.querySelector("#stageTwo #scissors").classList.remove(elem)
          );
        document
          .querySelector("#stageTwo #scissors")
          .setAttribute("id", "circle");
        break;

      case 2:
        document
          .querySelector("#stageTwo #rock")
          .classList.forEach((elem) =>
            document.querySelector("#stageTwo #rock").classList.remove(elem)
          );
        document.querySelector("#stageTwo #rock").setAttribute("id", "circle");
        break;
    }
  } else {
    switch (rand) {
      case 0:
        document
          .querySelectorAll("#stageTwo #paper")[1]
          .classList.forEach((elem) =>
            document
              .querySelectorAll("#stageTwo #paper")[1]
              .classList.remove(elem)
          );
        document
          .querySelectorAll("#stageTwo #paper")[1]
          .setAttribute("id", "circle");
        break;

      case 1:
        document
          .querySelectorAll("#stageTwo #scissors")[1]
          .classList.forEach((elem) =>
            document
              .querySelectorAll("#stageTwo #scissors")[1]
              .classList.remove(elem)
          );
        document
          .querySelectorAll("#stageTwo #scissors")[1]
          .setAttribute("id", "circle");
        break;

      case 2:
        document
          .querySelectorAll("#stageTwo #rock")[1]
          .classList.forEach((elem) =>
            document
              .querySelectorAll("#stageTwo #rock")[1]
              .classList.remove(elem)
          );
        document
          .querySelectorAll("#stageTwo #rock")[1]
          .setAttribute("id", "circle");
        break;
    }
  }

  switch (playerOption) {
    case 0:
      document
        .querySelector("#stageTwo #paper img")
        .setAttribute("src", "./images/icon-rock.svg");
      document.querySelector("#stageTwo #paper").setAttribute("id", "rock");
      break;
    case 1:
      document
        .querySelector("#stageTwo #scissors img")
        .setAttribute("src", "./images/icon-rock.svg");
      document.querySelector("#stageTwo #scissors").setAttribute("id", "rock");
      break;
    case 2:
      break;
  }

  document.querySelector("#theTriangle").style.display = "flex";
  document.querySelector("#stageTwo").style.display = "none";
  document.querySelector("#stageTwo #circle").innerHTML = "";

  rand = null;
  playerOption = null;
}

function setScore() {
  document.querySelector("#score h1").innerText = score;
}

setScore();
