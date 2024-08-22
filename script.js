const canvas = document.getElementById("canvas");
canvas.width = canvas.clientWidth; // Set the canvas width to match the client width
const ctx = canvas.getContext("2d");
const img = new Image();
const nameInput = document.getElementById("name");

// ---------- Fetch decrypted text from Worker ----------

// Get the URL query string
const queryString = window.location.search;

// Create a URLSearchParams object from the query string
const params = new URLSearchParams(queryString);

// Get the value of the 'm' parameter
let m = params.get("m");

// Convert the decrypted text to valid json for certificate generation
function decTxtToCertJSON(input) {
  // Split the input string by commas to get key-value pairs
  const pairs = input.split(",");

  // Initialize an empty object to store the result
  const result = {};

  // Iterate over each pair
  pairs.forEach((pair) => {
    // Split each pair by the colon to separate key and value
    const [key, value] = pair.split(":");
    // Assign the key-value pair to the result object
    result[key] = value;
  });

  // Return the result object
  return result;
}

m = m.replaceAll(" ", "+");

//ajascertdec01c.sub0.workers.dev
fetch(`https://ajascertdec01c.sub0.workers.dev/?m=${m}`)
  .then((response) => response.text())
  .then((decTxt) => {
    // const decTxt = text;
    // decTxt = "v:0,t:Internship,c:Course,n:q,s:0009-09-09,e:0009-09-09";
    // Display the value of 'decTxt' on the page
    console.log(decTxt);
    console.log(m);
    const certParams = decTxtToCertJSON(decTxt);
    img.src = "cert_0.0.1d.png";
    img.onload = () => {
      generateCert(certParams);
    };
  })
  .catch((error) => console.error("Error fetching the text:", error));

// ----------

// ---------- Certificate Generation ----------

function calculateTitleHeight() {
  const canvas = document.getElementById("canvas");
  const canvasHeight = canvas.offsetHeight;
  const titleHeight = canvasHeight * 0.1;
  return `${titleHeight}px`;
}

refHeight = calculateTitleHeight();

ch = canvas.height;
cw = canvas.width;

function generateCert(paramDict) {
  let purpose = paramDict["t"];
  let certStyle = paramDict["t"];
  let program = purpose == "Internship" ? "Internship Program" : "Course";
  let startDate = paramDict["s"];
  let endDate = paramDict["e"];
  let candidateName = paramDict["n"];

  if (purpose == "Internship") {
    ctx.drawImage(img, 0, 0, canvas.clientWidth, canvas.height);
    ctx.font = `bold ${canvas.width * 0.03}px Share Tech`;
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(`of ${purpose}`, canvas.width / 2, canvas.height / 3.2);
  }
  ctx.font = `${canvas.width * 0.015}px Share Tech`;
  ctx.fillStyle = "white";
  ctx.textAlign = "center";

  ctx.fillText(
    `This ${program} Certificate is Proudly Awarded to`,
    canvas.width / 2,
    canvas.height / 2.7
  );

  ctx.font = `${canvas.width * 0.05}px Share Tech`;
  ctx.fillStyle = "#12f1ff";
  ctx.textAlign = "center";
  ctx.fillText(candidateName, canvas.width / 2, canvas.height / 2.1);

  let { width } = ctx.measureText(candidateName);
  let lineStart = canvas.width / 2 - width / 2 - 25;
  ctx.fillRect(lineStart, canvas.height / 2, width + 50, canvas.width * 0.005);

  ctx.font = `${canvas.width * 0.015}px Share Tech`;
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText(
    `For the outstanding completion of the ${program} at Arjun Aerospace Pvt. Ltd.`,
    canvas.width / 2,
    canvas.height / 1.75
  );
  ctx.fillText(
    `from ${startDate} to ${endDate}`,
    canvas.width / 2,
    canvas.height / 1.65
  );
}

// ----------

// ---------- Download Certificate ----------

document.getElementById("download").addEventListener("click", () => {
  const a = document.createElement("a");
  a.href = canvas.toDataURL();
  a.download = "certificate.png";
  a.click();
});
