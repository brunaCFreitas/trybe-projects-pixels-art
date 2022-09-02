const colorKey = 'colorPalette';
const pixelBoardKey = 'pixelBoard';
const boardSizeKey = 'boardSize';
const defaultColor = 'rgb(255,255,255)';
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

function getLocalStorage(key) {
  const value = localStorage.getItem(key);
  if (!value) {
    return;
  }
  return JSON.parse(value);
}

function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function onChangeBoardSize(size, cleanBoardColors) {
  setLocalStorage(boardSizeKey, size);
  if (cleanBoardColors) {
    setLocalStorage(pixelBoardKey, Array(size * size).fill(defaultColor));
  }
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

function fillSavedColors() {
  const pixels = getLocalStorage(pixelBoardKey);
  if (!pixels) {
    return;
  }

  const children = Array.from(containerBoard.children);
  for (let i = 0; i < children.length; i += 1) {
    const pixel = children[i];
    const color = pixels[i];
    pixel.style.backgroundColor = color;
  }
}

function getElementIndex(element) {
  return Array.from(element.parentNode.children).indexOf(element);
}

function onClickGenerateColors() {
  const colors = generateDistinctColors(3);
  completePalette(colors);
  setLocalStorage(colorKey, colors);
}

function onClickPixel() {
  const colorSelected = document.querySelector('.selected');
  const color = colorSelected.style.backgroundColor;
  this.style.backgroundColor = color;

  const index = getElementIndex(this);
  const pixels = getLocalStorage(pixelBoardKey);
  pixels[index] = color;
  setLocalStorage(pixelBoardKey, pixels);
}

function onClickPaletteColor() {
  const prevSelected = document.querySelector('.selected');
  prevSelected.classList.remove('selected');
  this.classList.add('selected');
}

function createBoardPixels(size, cleanBoardColors) {
  const lenghtBoard = size * size;
  containerBoard.innerHTML = '';
  containerBoard.style.width = `${size * 42}px`;
  for (let index = 0; index < lenghtBoard; index += 1) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    containerBoard.appendChild(pixel);

    pixel.addEventListener('click', onClickPixel);
  }
  onChangeBoardSize(size, cleanBoardColors);
}

function onClickClear() {
  const boardSize = getLocalStorage(boardSizeKey) || 5;
  createBoardPixels(boardSize, true);
}

function onLoadPage() {
  const boardSize = getLocalStorage(boardSizeKey) || 5;
  let colors = getLocalStorage(colorKey);
  const cleanBoardColors = !colors;

  if (!colors) {
    colors = generateDistinctColors(3);
  }

  createBoardPixels(boardSize, cleanBoardColors);
  completePalette(colors);

  fillSavedColors();

  setLocalStorage(colorKey, colors);
  setLocalStorage(boardSizeKey, boardSize);
}

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}
function onClickGenerateBoard() {
  let size = parseInt(input.value, 10);
  if (!size) {
    alert('Board Inválido!');
    size = 5;
  }
  size = clamp(size, 5, 50);
  createBoardPixels(size, true);
}

buttonColors.addEventListener('click', onClickGenerateColors);
buttonClear.addEventListener('click', onClickClear);
color1.addEventListener('click', onClickPaletteColor);
color2.addEventListener('click', onClickPaletteColor);
color3.addEventListener('click', onClickPaletteColor);
color4.addEventListener('click', onClickPaletteColor);
generateBoard.addEventListener('click', onClickGenerateBoard);

window.onload = onLoadPage;
