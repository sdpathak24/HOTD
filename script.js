// Get input box and buttons
const header = document.getElementById("header");
const textInput = document.getElementById("textInput");
const clearButton = document.getElementById("clearButton");
const btnArea = document.querySelector(".btn");
const saveButton = document.getElementById("saveButton");
const scrollContainer = document.querySelector(".scroller-container");
const bold = document.getElementById("bold");
const sassy = document.getElementById("sassy");
const formal = document.getElementById("formal");
const casual = document.getElementById("casual");
const techy = document.getElementById("techy");
const currentDate = new Date().toLocaleDateString();
const savedText = localStorage.getItem(currentDate);
const favicons = document.getElementById("favicon");
const badge = document.getElementById("badge");
// const homeScreenAdd = document.getElementById("homeScreenAdd");
// const openhomeScreenAdd = document.getElementById("openaddHomeScreenAdd");
// const closehomeScreenAdd = document.getElementById("closeHomeScreenAdd");
const info = document.getElementById("info");
const openInfo = document.getElementById("openinfo");
const closeInfo = document.getElementById("closeinfo");
const overlay = document.getElementById("overlay");
const homePage = document.getElementById("homePage");
// const inp = document.getElementById("textInput");
// const faviconLinks = document.querySelectorAll(
//   'link[rel="icon"], link[rel="apple-touch-icon"]'
// );

// openhomeScreenAdd.addEventListener("click", () => {
//   overlay.classList.add("active");
//   homeScreenAdd.classList.add("active");
//   if (info.classList.contains("active")) {
//     info.classList.remove("active");
//   }
// });

// closehomeScreenAdd.addEventListener("click", () => {
//   overlay.classList.remove("active");
//   homeScreenAdd.classList.remove("active");
// });

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

function checkInput() {
  if (textInput.value) {
    console.log("not empty");
    badge.classList.add("bdHide");
    // faviconLinks.forEach((faviconLink) => {
    //   const href = faviconLink.getAttribute("href");
    //   const newHref = href.replace("favicon-noti/", "favicon/");
    //   faviconLink.setAttribute("href", newHref);
    // });
  } else {
    console.log("empty");
    badge.classList.remove("bdHide");
    // faviconLinks.forEach((faviconLink) => {
    //   const href = faviconLink.getAttribute("href");
    //   const newHref = href.replace("favicon/", "favicon-noti/");
    //   faviconLink.setAttribute("href", newHref);
    // });
  }
}

function color(z) {
  // console.log(z.classList);
  textInput.classList.toggle(z.classList);
  textInput.classList.remove(textInput.classList[0]);
  if (textInput.classList.length == 0) {
    textInput.classList.add(z.classList);
  }
  console.log(textInput.classList);
  // console.log(z.classList)
}

if (savedText) {
  textInput.value = savedText;
}

// Save text to local storage when the user types
textInput.addEventListener("input", () => {
  const currentDate = new Date().toLocaleDateString();
  localStorage.setItem(currentDate, textInput.value);
  if (textInput.value) {
    console.log("not empty");
    // favicons.href = "favicon/android-icon-192x192.png";
    badge.classList.add("bdHide");
    // faviconLinks.forEach((faviconLink) => {
    //   const href = faviconLink.getAttribute("href");
    //   const newHref = href.replace("favicon-noti/", "favicon/");
    //   faviconLink.setAttribute("href", newHref);
    // });
  } else {
    console.log("empty");
    // favicons.href = "favicon-noti/android-icon-192x192.png";
    badge.classList.remove("bdHide");
    // faviconLinks.forEach((faviconLink) => {
    //   const href = faviconLink.getAttribute("href");
    //   const newHref = href.replace("favicon/", "favicon-noti/");
    //   faviconLink.setAttribute("href", newHref);
    // });
  }
});

// Add event listener to save button
if (saveButton) {
  saveButton.addEventListener("click", async function () {
    if (textInput.value) {
      // Create a new canvas element
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      // Set canvas dimensions to square with size 500px by 500px
      canvas.width = 1000;
      canvas.height = 1000;

      // Set background color
      context.fillStyle = getComputedStyle(textInput).backgroundColor;
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Set text style
      const computedStyle = getComputedStyle(textInput);
      context.fillStyle = computedStyle.color;
      context.font = "100px " + computedStyle.fontFamily;
      context.fontsize = computedStyle.fontSize;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.direction = computedStyle.direction;

      // Draw text on canvas
      const x = canvas.width / 2;
      const y = canvas.height / 2;
      const fontSize = parseInt(computedStyle.fontSize);
      const lineHeight = fontSize * 2.5; // adjust line height as needed
      const maxWidth = canvas.width - 100; // leave some margin on the sides
      const words = textInput.value.split(" ");
      const lines = [];
      let currentLine = words[0];
      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = context.measureText(currentLine + " " + word).width;
        if (word.length > maxWidth) {
          // If the word itself is longer than the maximum width, split it and add the parts to separate lines
          let part = "";
          for (let j = 0; j < word.length; j++) {
            const newPart = part + word[j];
            const newWidth = context.measureText(
              currentLine + " " + newPart
            ).width;
            if (newWidth >= maxWidth) {
              lines.push(currentLine);
              currentLine = newPart;
              part = "";
            } else {
              part = newPart;
            }
          }
          if (part !== "") {
            currentLine += " " + part;
          }
        } else if (width < maxWidth) {
          currentLine += " " + word;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      }
      lines.push(currentLine);
      const maxLines = Math.floor(canvas.height / lineHeight);
      if (lines.length > maxLines) {
        lines.splice(maxLines, lines.length - maxLines);
        lines[maxLines - 1] = lines[maxLines - 1].slice(0, -3) + "..."; // add ellipsis to last line if truncated
      }
      const textY = y - ((lines.length - 1) * lineHeight) / 2;
      for (let i = 0; i < lines.length; i++) {
        context.fillText(lines[i], x, textY + i * lineHeight);
      }

      // Add #HOTD text at the bottom of the canvas
      // const hotdText = "#HOTD";
      // possible update
      const hotdText = `${currentDate} ` + "#HOTD";
      const hotdFontSize = 40;
      context.font = `${hotdFontSize}px` + computedStyle.fontFamily;
      context.fillText(hotdText, x, canvas.height - hotdFontSize);

      // Convert canvas to image
      // const image = canvas.toDataURL("image/png");

      // Save image
      // const link = document.createElement("a");
      // link.download = "myHOTD.png";
      // link.href = image;
      // link.click();

      // Convert canvas to image
      const imageData = canvas.toDataURL("image/png");

      // Create a Blob object from the Base64-encoded data
      const byteString = atob(imageData.split(",")[1]);
      const mimeType = imageData.split(",")[0].split(":")[1].split(";")[0];
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([arrayBuffer], { type: mimeType });

      // Share the Blob object
      if (navigator.share) {
        navigator
          .share({
            // title: "HOTD",
            files: [new File([blob], "myHOTD.png", { type: "image/png" })],
          })
          .then(() => {
            console.log("Thanks for sharing!");
          })
          .catch(console.error);
      } else {
        alert(
          "Sharing is not supported on this browser.\nDownloading image instead"
        );
        const link = document.createElement("a");
        link.download = "myHOTD.png";
        link.href = imageData;
        link.click();
      }
    } else {
      alert("Please enter some text");
    }
  });
}
