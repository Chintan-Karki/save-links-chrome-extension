let myList = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const saveBtn = document.getElementById("save-btn");

const linksFromLocalStorage = JSON.parse(localStorage.getItem("myList"));

if (linksFromLocalStorage) {
  myList = linksFromLocalStorage;
  render(myList);
}

function render(Lists) {
  let listItems = "";
  for (let i = 0; i < Lists.length; i++) {
    listItems += `
      <li>
          <a target='_blank' href='${Lists[i]}'>
              ${Lists[i]}
          </a>
      </li>`;
  }
  ulEl.innerHTML = listItems;
}

saveBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let currentLink = tabs[0].url;

    if (!myList.includes(currentLink)) {
      myList.push(currentLink);
      console.log(currentLink);
      localStorage.setItem("myList", JSON.stringify(myList));
      render(myList);
    } else {
      alert("already there");
    }
  });
});

inputBtn.addEventListener("click", function () {
  let inputValue = inputEl.value;
  if (inputValue != "") {
    if (!myList.includes(inputValue)) {
      myList.push(inputValue);
      inputEl.value = "";
      localStorage.setItem("myList", JSON.stringify(myList));
      render(myList);
    } else {
      alert("This tab is already saved");
    }
  } else {
    alert("Not a valid input");
  }
});

// When clicked, clear localStorage, myList, and the DOM
deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myList = [];
  render(myList);
});
