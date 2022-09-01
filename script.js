const color1 = document.getElementById('firstColor');
const color2 = document.getElementById('secondColor');
const color3 = document.getElementById('thirdColor');
const color4 = document.getElementById('fourthColor');
const buttonColors = document.getElementById('button-random-color');

function generateRandomColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  if (red === 255 && green === 255 && blue === 255) {
    generateRandomColor();
  }

  const colorRandom = `rgb(${red}, ${green}, ${blue})`;
  return colorRandom;
}

function generateDistinctColors(count) {
  const colors = [];
  while (colors.length < count) {
    const color = generateRandomColor();
    if (!colors.includes(color)) {
      colors.push(color);
    }
  }
  return colors;
}

function completePalette() {
  const [firstColor, secondColor, thirdColor] = generateDistinctColors(3);
  color1.style.backgroundColor = 'rgb(0, 0, 0)';
  color2.style.backgroundColor = firstColor;
  color3.style.backgroundColor = secondColor;
  color4.style.backgroundColor = thirdColor;
}
completePalette();

buttonColors.addEventListener('click', completePalette);