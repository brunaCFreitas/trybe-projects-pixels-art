const color1 = document.getElementById('black');
const color2 = document.getElementById('secondColor');
const color3 = document.getElementById('thirdColor');
const color4 = document.getElementById('fourthColor');
const containerBoard = document.querySelector('#pixel-board');

function onClickPixel() {
  const colorSelected = document.querySelector('.selected');
  const color = colorSelected.style.backgroundColor;
  this.style.backgroundColor = color;
}

function onClickPalletColor() {
  const prevSelected = document.querySelector('.selected');
  prevSelected.classList.remove('selected');
  this.classList.add('selected');
}

function createBoardPixels(size) {
  const lenghtBoard = size * size;
  containerBoard.innerHTML = '';
  containerBoard.style.width = `${size * 42}px`;
  for (let index = 0; index < lenghtBoard; index += 1) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    containerBoard.appendChild(pixel);

    pixel.addEventListener('click', onClickPixel);
  }
}

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

const inputSize = document.getElementById('board-size');
inputSize.addEventListener('change', () => {
  const size = inputSize.value;
  createBoardPixels(size);
});

color1.addEventListener('click', onClickPalletColor);
color2.addEventListener('click', onClickPalletColor);
color3.addEventListener('click', onClickPalletColor);
color4.addEventListener('click', onClickPalletColor);

createColorPalette();

const buttonGeneratorColor = document.getElementById('button-random-color');
buttonGeneratorColor.addEventListener('click', createColorPalette);

createBoardPixels(5);
