const themeToggler = document.querySelector("#toggle div");

const noBtns = document.querySelectorAll(".noBtn");

const signBtns = document.querySelectorAll(".sign");

const answerField = document.querySelector("#answer");

const del = document.querySelector("#del");

const reset = document.querySelector("#reset");

del.addEventListener("click", function () {
  answerField.innerText = answerField.innerText.substring(
    0,
    answerField.innerText.length - 1
  );
});

del.addEventListener("click", function () {
  answerField.innerText = "";

  currentNo = null;
  currentSign = null;
  x;
});

document.querySelector("#equal").addEventListener("click", calculate);

let currentNo = null;

let currentSign = null;

let special = false;

noBtns.forEach((element) => {
  element.addEventListener("click", function () {
    if (special == true) {
      answerField.innerText = "";
      special = false;
    }
    answerField.innerText += element.innerText;
  });
});

signBtns.forEach((element) => {
  element.addEventListener(
    "click",
    signClickHandler.bind(null, element.innerText)
  );
});

themeToggler.addEventListener("click", toggle);

themeSwitcher = 1;

function toggle() {
  if (themeSwitcher == 1) {
    themeToggler.style.setProperty("--value", "translateX(30px)");
    themeSwitcher = 2;
  } else if (themeSwitcher == 2) {
    themeToggler.style.setProperty("--value", "translateX(60px)");
    themeSwitcher = 3;
  } else if (themeSwitcher == 3) {
    themeToggler.style.setProperty("--value", "translateX(0px)");
    themeSwitcher = 1;
  }

  modeSwitcher();
}

function signClickHandler(sign) {
  if (currentNo == null) {
    currentNo = Number(answerField.innerText);

    currentSign = sign;

    answerField.innerText = "";
  } else {
    calculate();

    currentNo = Number(answerField.innerText);

    currentSign = sign;

    special = true;
  }

  answerField.innerText = answerField.innerText.replace(
    "Infinity",
    "Number too large"
  );
  answerField.innerText = answerField.innerText.replace(
    "NaN",
    "Number too large"
  );

  if (answerField.innerText.length > 10) {
    answerField.style.fontSize = "2rem";
  } else {
    answerField.style.fontSize = "3rem";
  }
}

function calculate() {
  switch (currentSign) {
    case "+":
      answerField.innerText = currentNo + Number(answerField.innerText);
      break;
    case "-":
      answerField.innerText = currentNo - Number(answerField.innerText);
      break;
    case "x":
      answerField.innerText = currentNo * Number(answerField.innerText);
      break;
    case "/":
      answerField.innerText = currentNo / Number(answerField.innerText);
      break;
  }

  answerField.innerText = answerField.innerText.replace(
    "Infinity",
    "Number too large"
  );
  answerField.innerText = answerField.innerText.replace(
    "NaN",
    "Number too large"
  );

  if (answerField.innerText.length > 10) {
    answerField.style.fontSize = "2rem";
  } else {
    answerField.style.fontSize = "3rem";
  }
}

function modeSwitcher() {
  if (themeSwitcher == 2) {
    document.body.classList.add("bodyT2");
    answerField.classList.add("answerT2");
    noBtns.forEach((element) => {
      element.classList.add("noBtnsT2");
    });
    signBtns.forEach((element) => {
      element.classList.add("signBtnsT2");
    });
    del.classList.add("delResetT2");
    reset.classList.add("delResetT2");
    reset.parentNode.classList.add("buttonsT2");
    document.querySelector("#equal").classList.add("equalT2");
    themeToggler.classList.add("themeSwitcherT2");
  }
  if (themeSwitcher == 3) {
    document.body.classList.remove("bodyT2");
    answerField.classList.remove("answerT2");
    noBtns.forEach((element) => {
      element.classList.remove("noBtnsT2");
    });
    signBtns.forEach((element) => {
      element.classList.remove("signBtnsT2");
    });
    del.classList.remove("delResetT2");
    reset.classList.remove("delResetT2");
    reset.parentNode.classList.remove("buttonsT2");
    document.querySelector("#equal").classList.remove("equalT2");
    themeToggler.classList.remove("themeSwitcherT2");

    document.body.classList.add("bodyT3");
    answerField.classList.add("answerT3");
    noBtns.forEach((element) => {
      element.classList.add("noBtnsT3");
    });
    signBtns.forEach((element) => {
      element.classList.add("signBtnsT3");
    });
    del.classList.add("delResetT3");
    reset.classList.add("delResetT3");
    reset.parentNode.classList.add("buttonsT3");
    document.querySelector("#equal").classList.add("equalT3");
    themeToggler.classList.add("themeSwitcherT3");
  }
  if (themeSwitcher == 1) {
    document.body.classList.remove("bodyT3");
    answerField.classList.remove("answerT3");
    noBtns.forEach((element) => {
      element.classList.remove("noBtnsT3");
    });
    signBtns.forEach((element) => {
      element.classList.remove("signBtnsT3");
    });
    del.classList.remove("delResetT3");
    reset.classList.remove("delResetT3");
    reset.parentNode.classList.remove("buttonsT3");
    document.querySelector("#equal").classList.remove("equalT3");
    themeToggler.classList.remove("themeSwitcherT3");
  }
}
