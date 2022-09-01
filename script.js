const color1 = document.getElementById('firstColor');
const color2 = document.getElementById('secondColor');
const color3 = document.getElementById('thirdColor');
const color4 = document.getElementById('fourthColor');

function generateRandomColors() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  if (red === 255 && green === 255 && blue === 255) {
    generateRandomColors();
  }

  const colorRandom = `rgb(${red}, ${green}, ${blue})`;
  return colorRandom;
}

// eslint-disable-next-line complexity
function completePalette() {
  color1.style.backgroundColor = 'black';
  color2.style.backgroundColor = generateRandomColors();
  color3.style.backgroundColor = generateRandomColors();
  color4.style.backgroundColor = generateRandomColors();

  if (color2 === color1 || color2 === color3 || color2 === color4) {
    color2.style.backgroundColor = generateRandomColors();
  }

  if (color3 === color1 || color3 === color2 || color3 === color4) {
    color3.style.backgroundColor = generateRandomColors();
  }
  if (color4 === color1 || color4 === color2 || color4 === color3) {
    color4.style.backgroundColor = generateRandomColors();
  }
}

completePalette();
