// Get input box and buttons
const textInput = document.getElementById("textInput");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const bold = document.getElementById("bold");
const sassy = document.getElementById("sassy");
const formal = document.getElementById("formal");
const casual = document.getElementById("casual");
const techy = document.getElementById("techy");

// function reload() {
//   window.location.reload();
// }

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

// Load saved text from local storage
// let latestText = "";
// let latestDate = new Date(0);
// for (let i = 0; i < localStorage.length; i++) {
//   const key = localStorage.key(i);
//   const date = new Date(key);
//   if (date > latestDate) {
//     latestDate = date;
//     latestText = localStorage.getItem(key);
//   }
// }
// textInput.value = latestText;

// Add event listener to input box
// textInput.addEventListener("input", function () {
//   // Get text from input box
//   const text = textInput.value;

//   // Get current date and time
//   const now = new Date();

//   const today = now.getDate();

//   // Save text to local storage with current date and time as key
//   localStorage.setItem(now.toLocaleString(), text);

//   // Update savedText display
//   let latestText = "";
//   let latestDate = new Date(0);
//   for (let i = 0; i < localStorage.length; i++) {
//     const key = localStorage.key(i);
//     const date = new Date(key);
//     if (date > latestDate) {
//       latestDate = date;
//       latestText = localStorage.getItem(key);
//     }
//   }
//   textInput.value = latestText;
//   localStorage.getItem(now.toLocaleString());
// });

// textInput.addEventListener("input", function () {
//   // Get text from input box
//   const text = textInput.value;

//   // Get current date and time
//   const now = new Date();

//   const today = now.getDate();

//   // Save text to local storage with current date and time as key
//   localStorage.setItem(now.toLocaleString(), text);

//   // Display text in the input box
//   // textInput.value = localStorage.getItem(now.toLocaleString());

//   // Load saved text from local storage
//   let latestText = "";
//   let latestDate = new Date(0);
//   for (let i = 0; i < localStorage.length; i++) {
//     const key = localStorage.key(i);
//     const date = new Date(key);
//     if (date > latestDate) {
//       latestDate = date;
//       latestText = localStorage.getItem(key);
//     }
//   }
//   textInput.value = latestText;
// });

// Load saved text from local storage
// Load saved text from local storage
// let latestText = "";
// let latestDate = new Date(0);
// for (let i = 0; i < localStorage.length; i++) {
//   const key = localStorage.key(i);
//   const date = new Date(key);
//   if (date > latestDate) {
//     latestDate = date;
//     latestText = localStorage.getItem(key);
//   }
// }
// textInput.value = latestText;

// Add event listener to input box
// Add event listener to input box
// textInput.addEventListener("input", function () {
//   // Get current date and time
//   const now = new Date();

//   // Save text to local storage with current date and time as key
//   localStorage.setItem(now.toLocaleString(), textInput.value);

//   // Load latest saved text from local storage
//   let latestText = "";
//   let latestDate = new Date(0);
//   for (let i = 0; i < localStorage.length; i++) {
//     const key = localStorage.key(i);
//     const date = new Date(key);
//     if (date > latestDate) {
//       latestDate = date;
//       latestText = localStorage.getItem(key);
//     }
//   }

//   // Display latest saved text in input box
//   textInput.value = latestText;
// });

const currentDate = new Date().toLocaleDateString();
const savedText = localStorage.getItem(currentDate);
if (savedText) {
  textInput.value = savedText;
}

// Save text to local storage when the user types
textInput.addEventListener("input", () => {
  const currentDate = new Date().toLocaleDateString();
  localStorage.setItem(currentDate, textInput.value);
});

// Add event listener to save button
if (saveButton) {
  saveButton.addEventListener("click", async function () {
    // Get latest text from local storage
    // let latestText = "";
    // let latestDate = new Date(0);
    // for (let i = 0; i < localStorage.length; i++) {
    //   const key = localStorage.key(i);
    //   const date = new Date(key);
    //   if (date > latestDate) {
    //     latestDate = date;
    //     latestText = localStorage.getItem(key);
    //   }
    // }

    let latestText = localStorage.getItem(currentDate);

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
    const lineHeight = fontSize * 1.5; // adjust line height as needed
    const maxWidth = canvas.width - 100; // leave some margin on the sides
    const lines = latestText.split("\n");
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
    const hotdText = "#HOTD";
    const hotdFontSize = 50;
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
          title: "HOTD",
          files: [new File([blob], "myHOTD.png", { type: "image/png" })],
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch(console.error);
    } else {
      alert(
        "Sharing is not supported on this browser.\nDownloading image instead?"
      );
      const link = document.createElement("a");
      link.download = "myHOTD.png";
      link.href = imageData;
      link.click();
    }
  });
}
