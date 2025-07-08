let materialType;
let fillStrokeSelectionContainer;
let ambientSpecularSelectionContainer;
let fillCheckbox, strokeCheckbox, ambientCheckbox, specularCheckbox;
let emissivePicker;

let fillSelection, strokeSelection, ambientSelection, specularSelection;

let textureImg;

function preload() {
  textureImg = loadImage('assets/venus.jpg'); // Adjust path if needed
}

function setup() {
  let c = createCanvas(700, 700, WEBGL);
  c.parent('3d-material-lighting-canvas');
  angleMode(DEGREES);
  createSelectionArea();
}

  background(0);
  ambientLight(80);
  directionalLight(255, 255, 255, 0.5, 1, -0.5);
  rotateX(15);
  rotateY(35);
  let currentMaterial = materialType.value();
  switch (currentMaterial) {
    case 'color':
      applyColorMaterial();
      break;
    case 'emissive':
      applyEmissiveMaterial();
      break;
    case 'normal':
      applyNormalMaterial();
      break;
    case 'texture':
      applyTextureMaterial();
      break;
  }
  drawInteriorRoom(500);
}

function drawInteriorRoom(size) {
  let s = size / 2;
  push();
  // Floor
  push();
  translate(0, s, 0);
  rotateX(90);
  plane(size, size);
  pop();
  // Ceiling
  push();
  translate(0, -s, 0);
  rotateX(90);
  plane(size, size);
  pop();
  // Back wall
  push();
  translate(0, 0, -s);
  plane(size, size);
  pop();
  // Left wall
  push();
  translate(-s, 0, 0);
  rotateY(90);
  plane(size, size);
  pop();
  // Right wall
  push();
  translate(s, 0, 0);
  rotateY(90);
  plane(size, size);
  pop();
  pop();
}

function createSelectionArea() {
  let selectionArea = createDiv();
  selectionArea.style('background', '#f0f0f0');
  selectionArea.style('width', '700px');
  selectionArea.style('font-family', 'sans-serif');
  selectionArea.style('padding', '10px');
  let materialTypeLabel = createElement('label', 'Material type');
  materialTypeLabel.parent(selectionArea);
  materialType = createRadio();
  materialType.parent(materialTypeLabel);
  materialType.option('color');
  materialType.option('emissive');
  materialType.option('normal');
  materialType.option('texture');
  materialType.selected('color');
  fillStrokeSelectionContainer = createDiv();
  fillStrokeSelectionContainer.parent(selectionArea);
  ambientSpecularSelectionContainer = createDiv();
  ambientSpecularSelectionContainer.parent(selectionArea);
  fillSelection = color(255);
  fillCheckbox = createColorSelector('fill', fillSelection, true, fillStrokeSelectionContainer);
  strokeSelection = color(0);
  strokeCheckbox = createColorSelector('stroke', strokeSelection, true, fillStrokeSelectionContainer);
  ambientSelection = color(255);
  ambientCheckbox = createColorSelector('ambient', ambientSelection, false, ambientSpecularSelectionContainer);
  specularSelection = color(255);
  specularCheckbox = createColorSelector('specular', specularSelection, false, ambientSpecularSelectionContainer);
  emissivePicker = createColorPicker(color(255));
  emissivePicker.parent(selectionArea);
  emissivePicker.hide();
}

function createColorSelector(label, colorSelection, checked, parentElement) {
  let checkbox = createCheckbox(label);
  checkbox.parent(parentElement);
  let picker = createColorPicker(colorSelection);
  picker.parent(parentElement);
  function setColor() {
    let selectedColor = picker.color();
    colorSelection.setRed(red(selectedColor));
    colorSelection.setGreen(green(selectedColor));
    colorSelection.setBlue(blue(selectedColor));
  }
  picker.changed(setColor);
  function setPickerVisibility() {
    picker.style('display', checkbox.checked() ? 'inline-block' : 'none');
  }
  checkbox.changed(setPickerVisibility);
  checkbox.checked(checked);
  setPickerVisibility();
  return checkbox;
}

function applyColorMaterial() {
  ambientSpecularSelectionContainer.show();
  fillStrokeSelectionContainer.show();
  emissivePicker.hide();
  if (ambientCheckbox.checked()) ambientMaterial(ambientSelection);
  if (specularCheckbox.checked()) specularMaterial(specularSelection);
  if (fillCheckbox.checked()) fill(fillSelection);
  else noFill();
  if (strokeCheckbox.checked()) stroke(strokeSelection);
  else noStroke();
}

function applyEmissiveMaterial() {
  fillStrokeSelectionContainer.hide();
  ambientSpecularSelectionContainer.hide();
  emissivePicker.show();
  noStroke();
  emissiveMaterial(emissivePicker.color());
}

function applyNormalMaterial() {
  fillStrokeSelectionContainer.hide();
  ambientSpecularSelectionContainer.hide();
  emissivePicker.hide();
  noStroke();
  normalMaterial();
}

function applyTextureMaterial() {
  fillStrokeSelectionContainer.hide();
  emissivePicker.hide();
  ambientSpecularSelectionContainer.show();
  if (ambientCheckbox.checked()) ambientMaterial(ambientSelection);
  if (specularCheckbox.checked()) specularMaterial(specularSelection);
  noStroke();
  texture(textureImg);
} 