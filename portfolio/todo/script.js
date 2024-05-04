let checkboxes = document.querySelectorAll(".checkbox");

const itemsDiv = document.querySelector("#items");

let itemsCount = 1;

checkboxes[0].parentNode.style.marginBottom = "35px";

checkboxes[0].parentNode.style.marginTop = "20px";

let notCheckedItems = [];
let checkedItems = [];

notCheckedItems.splice(0, 1);

let itemsToShow = 1;

const topImg = document.querySelector("#topImg");

const darkLightModeSwitch = document.querySelector("#topPart img");

let modeSwitcher = true;

let mobileVersion;

darkLightModeSwitch.addEventListener("click", switchModes);

window.onload = mediaQueryForResponsivity();
window.addEventListener("resize", mediaQueryForResponsivity());

document.querySelector("#showAll").addEventListener("click", function () {
  itemsToShow = 1;
  showItems(itemsToShow);
  document.querySelector("#showAll").style.color = "blue";
  document.querySelector("#showActive").style.color = "";
  document.querySelector("#showCompleted").style.color = "";
});

document.querySelector("#showActive").addEventListener("click", function () {
  itemsToShow = 2;
  showItems(itemsToShow);
  document.querySelector("#showActive").style.color = "blue";
  document.querySelector("#showAll").style.color = "";
  document.querySelector("#showCompleted").style.color = "";
});

document.querySelector("#showCompleted").addEventListener("click", function () {
  itemsToShow = 3;
  showItems(itemsToShow);
  document.querySelector("#showCompleted").style.color = "blue";
  document.querySelector("#showActive").style.color = "";
  document.querySelector("#showAll").style.color = "";
});

document
  .querySelector("#clearCompleted")
  .addEventListener("click", clearCompleted);

function checkboxEventAdder() {
  checkboxes = document.querySelectorAll(".checkbox");

  notCheckedItems = [];

  checkboxes.forEach((element) => {
    notCheckedItems.push(element);
    if (element == checkboxes[0]) {
      element.addEventListener(
        "click",
        checkboxesClickHandler.bind(null, element, true)
      );
    } else {
      element.addEventListener(
        "click",
        checkboxesClickHandler.bind(null, element, false)
      );
    }

    if (element != checkboxes[0]) {
      element.parentNode.addEventListener("mouseover", function () {
        this.childNodes[5].style.display = "block";
      });

      element.parentNode.addEventListener("mouseout", function () {
        this.childNodes[5].style.display = "none";
      });

      element.parentNode.childNodes[5].addEventListener("click", function () {
        console.log("hg");
        deleteListItem(element.parentNode);
      });
    }
  });

  notCheckedItems.splice(0, 1);

  document.querySelector("#itemsMenuBottomBar p").innerText =
    notCheckedItems.length + ` items left`;
}
function checkboxesClickHandler(element, isAddCheckbox) {
  element.childNodes[1].classList.toggle("checkImage");

  element.classList.toggle("check");

  element.parentElement.childNodes[3].classList.toggle("checkedItem");

  if (isAddCheckbox) {
    console.log("add");
  } else {
    if (element.classList.contains("check")) {
      notCheckedItems.splice(
        notCheckedItems.findIndex((item) => item == element),
        1
      );

      checkedItems.push(element);
    } else {
      checkedItems.splice(
        notCheckedItems.findIndex((item) => item == element),
        1
      );

      notCheckedItems.push(element);
    }
  }

  document.querySelector("#itemsMenuBottomBar p").innerText =
    notCheckedItems.length + ` items left`;
}

function addListItem() {
  itemsCount++;
  itemsDiv.innerHTML +=
    ` <div class="listItem" id="listItem` +
    itemsCount +
    `">
      <div class="listItemCheckbox checkbox" id="listItemCheckbox` +
    itemsCount +
    `">
        <div id="checkImage"></div>
      </div>

      <p>` +
    checkboxes[0].parentElement.childNodes[3].value +
    `</p>
    <img class='crossImg' src="images/icon-cross.svg">
    </div>`;

  checkboxes[0].parentElement.childNodes[3].value = "";

  checkboxEventAdder();

  if (modeSwitcher == false) {
    document
      .querySelector("#listItem" + itemsCount)
      .classList.toggle("listItemsDM");
  }

  itemsCount++;
}

function deleteListItem(element) {
  itemsCount--;
  element.parentElement.removeChild(element);

  checkboxEventAdder();
  checkboxEventAdder();
}

checkboxes[0].parentElement.childNodes[3].addEventListener(
  "keydown",
  function (event) {
    if (event.key == "Enter") {
      addListItem();
    }
  }
);

function showCompleted() {
  notCheckedItems.forEach((element) => {
    element.parentElement.style.display = "none";
  });

  checkedItems.forEach((element) => {
    element.parentElement.style.display = "flex";
  });
}

function showActive() {
  checkedItems.forEach((element) => {
    element.parentElement.style.display = "none";
  });

  notCheckedItems.forEach((element) => {
    element.parentElement.style.display = "flex";
  });
}

function showAll() {
  notCheckedItems.forEach((element) => {
    element.parentElement.style.display = "flex";
  });

  checkedItems.forEach((element) => {
    element.parentElement.style.display = "flex";
  });
}

function showItems(category) {
  switch (category) {
    case 1:
      showAll();
      break;
    case 2:
      showActive();
      break;
    case 3:
      showCompleted();
      break;
  }
}

function clearCompleted() {
  checkedItems.forEach((element) => {
    element.parentNode.parentNode.removeChild(element.parentNode);
  });

  checkedItems = [];
}

function switchModes() {
  if (modeSwitcher) {
    darkLightModeSwitch.setAttribute("src", "images/icon-sun.svg");
    topImg.setAttribute("src", "./images/bg-desktop-dark.jpg");
    modeSwitcher = false;
  } else {
    darkLightModeSwitch.setAttribute("src", "images/icon-moon.svg");
    topImg.setAttribute("src", "./images/bg-desktop-light.jpg");
    modeSwitcher = true;
  }

  document.body.classList.toggle("bodyDM");
  checkboxes.forEach((element, index) => {
    element.parentNode.classList.toggle("listItemsDM");
    if (index != 0) {
      element.parentNode.parentNode.classList.toggle("listItemsDM");
    }
  });
  document
    .querySelector("#itemsMenuBottomBar")
    .classList.toggle("itemsMenuBottomBarDM");
  document
    .querySelector("#allActiveCompletedButtons")
    .classList.toggle("allActiveCompletedButtonsDM");
  document
    .querySelector("#clearCompleted")
    .classList.toggle("clearCompletedDM");
}
function mediaQueryForResponsivity() {
  if (window.matchMedia("(max-width:610px)").matches) {
    document
      .querySelector("main")
      .appendChild(document.querySelector("#allActiveCompletedButtons"));
    console.log("hi");
    mobileVersion = true;
  }
  if (mobileVersion == true) {
    if (!window.matchMedia("(max-width:610px)").matches) {
      document
        .querySelector("#itemsMenuBottomBar")
        .appendChild("#allActiveCompletedButtons");
      console.log("hi");
      mobileVersion = false;
    }
  }
}

checkboxEventAdder();
