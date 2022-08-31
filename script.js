const color1 = document.getElementById('black');
const color2 = document.getElementById('secondColor');
const color3 = document.getElementById('thirdColor');
const color4 = document.getElementById('fourthColor');
const containerBoard = document.querySelector('#pixel-board');
const inputSize = document.getElementById('board-size');
const sizeBoard = inputSize.value;

function randomColorGenerator() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  if (red === 255 && green === 255 && blue === 255) {
    randomColorGenerator();
  }

  const colorRGB = `rgb(${red}, ${green}, ${blue})`;
  console.log(colorRGB);

  return colorRGB;
}

function createColorPalette() {
  color1.style.backgroundColor = 'rgb(0, 0, 0)';
  color2.style.backgroundColor = randomColorGenerator();
  color3.style.backgroundColor = randomColorGenerator();
  color4.style.backgroundColor = randomColorGenerator();
}
createColorPalette();

const buttonGeneratorColor = document.getElementById('button-random-color');
buttonGeneratorColor.addEventListener('click', createColorPalette);

function createBoardPixels(size) {
  containerBoard.style.width = `${5 * 42}px`;
  for (let index = 0; index < size; index += 1) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    containerBoard.appendChild(pixel);
  }
}
createBoardPixels(25);

