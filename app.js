let input = document.getElementById("input");
let display = document.getElementById("display");
let share_btn = document.getElementById("share");
let heading = document.getElementById("heading");


function startTime() {
  var date = new Date();
  var time = date.getDate();  
  setTimeout(function () {startTime(); display_val()}, 1000); //for deployment
  return time;
  /* Notification to be added */
  
}

function display_val(){
  display.innerHTML = localStorage.getItem(startTime());
}

function add() {
  if (!input.value) {
    alert("enter something");
  } else {
    localStorage.setItem(startTime(), input.value);
    // console.log(localStorage);
    input.value = "";
    /* Convert to image to be added*/
  }
}

function share() {
  if (display.innerHTML != '') {
    if (navigator.share) {
      navigator
        .share({
          title: "HOTD",
          // url:"google.com" + display.innerHTML,
          text:
            "HEY! This is my HOTD!\n\n" +
            "\"" + display.innerHTML + "\"" +
            "\n\nWhats's your HOTD?",
          url: "",
        })
        .then(() => {
          console.log("thanks");
        })
        .catch(console.error);
    } else {
      alert("sharing is not supported");
    }
  } else {
    alert("cant share empty");
  }
}


/* JS for Info */

let infobtn = document.getElementById("infobtn")
let infoContainer = document.getElementById("infoContainer")
function showInfo(){
  if(infoContainer.style.display === "none"){
    infoContainer.style.display = "block";
  }
  console.log("pressed");

  infoContainer.addEventListener("click", () => {
    infoContainer.style.display = "none";
  })
}