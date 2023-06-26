const badge = document.getElementById("badge");

// Get all keys from local storage
const keys = Object.keys(localStorage);

// Create an object to store the last input for each day
const lastInputs = {};

// Loop through the keys
keys.forEach(function (key) {
  // Check if the key has the format "MM/DD/YYYY"
  const dateRegex = /^(\d{1,2}\/\d{1,2}\/\d{4})|(\d{4}-\d{2}-\d{2})$/;
  const keystoRemove = [];
  if (!dateRegex.test(key.substr(0, 10))) {
    // Skip this key if it doesn't have one of the supported date formats
    keystoRemove.push(key);
    console.log("key to remove: " + key);
    localStorage.removeItem(key);
    return;
  }
  console.log("key: " + key);

  // Get the value associated with the key
  const value = localStorage.getItem(key);

  // Check if this is the last input for the current day
  const date = key.substr(0, 10);
  if (!lastInputs[date] || key > lastInputs[date].key) {
    lastInputs[date] = {
      key: key,
      value: value,
    };
  }
});

// Get today's date in MM/DD/YYYY format
const today = new Date().toLocaleDateString();

// Sort the lastInputs object by date in descending order
const sortedDates = Object.keys(lastInputs).sort(function (a, b) {
  return new Date(b) - new Date(a);
});

// Loop through the sortedDates and display the last input for each day
let todayDivFound = false;
sortedDates.forEach(function (date) {
  const lastInput = lastInputs[date];
  if (lastInput.value.trim() !== "") {
    // check if the value is not empty or only whitespace
    // Create a new data div for the current key and value
    const newData = document.createElement("div");
    newData.classList.add("data");

    // Create a date-title div with the current key
    const dateTitle = document.createElement("div");
    dateTitle.classList.add("date-title");
    const h2 = document.createElement("h2");
    h2.textContent = "Last HOTD on " + date + ":";
    dateTitle.appendChild(h2);

    // Create a text div with the value
    const text = document.createElement("div");
    text.classList.add("text");
    text.innerHTML = lastInput.value;

    // Append the date-title and text divs to the data div
    newData.appendChild(dateTitle);
    newData.appendChild(text);

    // Append the data div to the mainWrapper div
    const mainWrapper = document.querySelector(".mainWrapper");
    mainWrapper.appendChild(newData);

    // Check if the current date is today's date and set todayDivFound to true
    if (date === today) {
      todayDivFound = true;
    }
  }
});

// Check if today's hotd is entered and add the bdHide class to the badge if it is
const todayHotdKey = today + "_hotd";
const todayHotd = localStorage.getItem(todayHotdKey);
if (todayHotd && todayHotd.trim() !== "") {
  badge.classList.add("bdHide");
}

// Add the bdHide class to the badge if today's data div is present
if (todayDivFound) {
  badge.classList.add("bdHide");
}

// Add a space div to separate the data divs from the "no history yet" text
const space = document.createElement("div");
space.classList.add("space");
const mainWrapper = document.querySelector(".mainWrapper");
mainWrapper.appendChild(space);

// Hide all the data divs that have an empty text
const dataDivs = document.querySelectorAll(".data");
dataDivs.forEach(function (div) {
  if (div.querySelector(".text").textContent.trim() === "") {
    div.style.display = "none";
  }
});

// Check if there are no data divs and add the "no history yet" text
if (mainWrapper.querySelectorAll(".data").length === 0) {
  const noHistory = document.createElement("div");
  noHistory.classList.add("no-history");
  noHistory.style.textAlign = "center";
  noHistory.style.fontSize = "1.5rem";
  noHistory.style.fontWeight = "bold";
  noHistory.innerHTML = "No history yet." + "\n" + "Enter your first HOTD!";
  mainWrapper.appendChild(noHistory);
}

const info = document.getElementById("info");
const openInfo = document.getElementById("openinfo");
const closeInfo = document.getElementById("closeinfo");
const overlay = document.getElementById("overlay");

openInfo.addEventListener("click", () => {
  overlay.classList.add("active");
  info.classList.add("active");
  // if (homeScreenAdd.classList.contains("active")) {
  //   homeScreenAdd.classList.remove("active");
  // }
});

closeInfo.addEventListener("click", () => {
  overlay.classList.remove("active");
  info.classList.remove("active");
});
