const localStorageKey = 'colorPalette';
const color1 = document.getElementById('firstColor');
const color2 = document.getElementById('secondColor');
const color3 = document.getElementById('thirdColor');
const color4 = document.getElementById('fourthColor');
const buttonColors = document.getElementById('button-random-color');
const containerBoard = document.querySelector('#pixel-board');
const buttonClear = document.getElementById('clear-board');
const input = document.getElementById('board-size');
const generateBoard = document.getElementById('generate-board');

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

function completePalette(colors) {
  const [firstColor, secondColor, thirdColor] = colors;
  color1.style.backgroundColor = 'rgb(0, 0, 0)';
  color2.style.backgroundColor = firstColor;
  color3.style.backgroundColor = secondColor;
  color4.style.backgroundColor = thirdColor;
}

function saveColors(colors) {
  localStorage.setItem(localStorageKey, JSON.stringify(colors));
}

function onClickGenerateColors() {
  const colors = generateDistinctColors(3);
  completePalette(colors);
  saveColors(colors);
}

function getSavedColors() {
  const value = localStorage.getItem(localStorageKey);
  if (!value) {
    return;
  }
  return JSON.parse(value);
}

function onClickPixel() {
  const colorSelected = document.querySelector('.selected');
  const color = colorSelected.style.backgroundColor;
  this.style.backgroundColor = color;
}

function onClickPaletteColor() {
  const prevSelected = document.querySelector('.selected');
  prevSelected.classList.remove('selected');
  this.classList.add('selected');
}

function onClickClear() {
  const pixel = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixel.length; index += 1) {
    pixel[index].style.backgroundColor = 'rgb(255, 255, 255)';
  }
  return pixel;
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

buttonColors.addEventListener('click', onClickGenerateColors);
buttonClear.addEventListener('click', onClickClear);
color1.addEventListener('click', onClickPaletteColor);
color2.addEventListener('click', onClickPaletteColor);
color3.addEventListener('click', onClickPaletteColor);
color4.addEventListener('click', onClickPaletteColor);
generateBoard.addEventListener('click', () => {
  let size = input.value;
  if (size === '') {
    alert('Board Inválido!');
    size = 5;
  }
  if (size < 5) {
    size = 5;
  }
  if (size > 50) {
    size = 50;
  }
  createBoardPixels(size);
});

window.onload = () => {
  const colorsSaved = getSavedColors();
  createBoardPixels(5);
  if (colorsSaved) {
    completePalette(colorsSaved);
    return;
  }
  const colors = generateDistinctColors(3);
  completePalette(colors);
  saveColors(colors);
};
