///////////////---------------------DATA-------------------------
const wrapper = document.querySelector(".wrapper");
const girls = ["ola", "zuzia"];
const colors = [
  "1b2961",
  "ffbf00",
  "ff006e",
  "0e8ed6",
  "f2c078",
  "c1dbb3",
  "faa916",
  "fb5607"
];
const colorSize = 35;
const startColorOla = "#fff";
const startColorZuzia = "#000";
let activeColorOla = "";
let activeColorZuzia = "";
let ctx = "";

function elementWithClass(type, classNames) {
  const element = document.createElement(type);
  element.classList = classNames;
  return element;
}
///////////////---------------------changeSideBgc-------------------------
const changeSideBgc = (side, status) => {
  const girlSide = document.querySelector(`.side__${side}`);
  const canvasSide = document.querySelector(`.canvas__${side}`);
  let color = "";
  if (status === "start") {
    color = side === "ola" ? [startColorOla] : startColorZuzia;
  } else {
    color = side === "ola" ? [activeColorOla] : activeColorZuzia;
  }
  girlSide.style.backgroundColor = color;
  canvasSide.style.backgroundColor = color;
};
///////////////---------------------chooseColor-------------------------
const chooseColor = props => {
  const parentClassList = props.target.parentElement.classList;
  const color = props.target.style.backgroundColor;
  const side = parentClassList.contains("colors-palette__ola")
    ? "ola"
    : "zuzia";
  side === "ola" ? (activeColorOla = color) : (activeColorZuzia = color);
  const sideColors = document.querySelectorAll(`.colors-palette__${side} div`);
  const targetClassList = props.target.classList;
  if (targetClassList.contains("colors-palette__color--active")) {
    targetClassList.remove("colors-palette__color--active");
    return changeSideBgc(side, "start");
  } else {
    for (let i = 0; i < sideColors.length; i++) {
      sideColors[i].classList.remove("colors-palette__color--active");
    }
    targetClassList.add("colors-palette__color--active");
    return changeSideBgc(side, "active");
  }
};

///////////////---------------------createColor-------------------------
const createColor = colorNumber => {
  const color = elementWithClass(`div`, ["colors-palette__color"]);

  color.style.backgroundColor = `#${colorNumber}`;
  color.style.width = `${colorSize}px`;
  color.style.height = `${colorSize}px`;

  color.style.borderRadius = "50%";
  color.style.cursor = "pointer";
  color.onclick = chooseColor.bind(this);

  return color;
};
///////////////---------------------createColorPalette-------------------------
const createColorPalette = (colors, girl) => {
  const div = elementWithClass(`div`, [
    `colors-palette colors-palette__${girl}`
  ]);

  for (let i = 0; i < colors.length; i++) {
    const color = createColor(colors[i]);
    div.appendChild(color);
  }

  return div;
};

///////////////---------------------createButton-------------------------
const createButton = text => {
  const button = elementWithClass(`a`, [`button button__${text}`]);
  button.name = text;
  button.textContent = `${text}`;
  return button;
};
///////////////---------------------createCanvas-------------------------
const createCanvas = item => {
  const canvas = elementWithClass(`canvas`, [`canvas__${girls[item]}`]);
  canvas.setAttribute("id", `${item}`);

  canvas.width = (window.innerWidth / 2) * 0.6;
  canvas.height = (window.innerWidth / 2) * 0.6;

  return canvas;
};
const drawCanvas = canvas => {
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Create a circular clipping path
    ctx.beginPath();
    ctx.arc(0, 0, canvas.height / 2, 0, Math.PI * 2, true);
    ctx.clip();

    // draw background
    var lingrad = ctx.createLinearGradient(
      0,
      -canvas.width / 2,
      0,
      canvas.width / 2
    );
    lingrad.addColorStop(0, "#232256");
    lingrad.addColorStop(1, "#143778");

    ctx.fillStyle = lingrad;
    ctx.fillRect(
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );

    // draw stars
    for (var j = 1; j < 100; j++) {
      ctx.save();
      ctx.fillStyle = "#fff";
      ctx.translate(
        canvas.width / 2 - Math.floor(Math.random() * canvas.width),
        canvas.width / 2 - Math.floor(Math.random() * canvas.width)
      );
      drawStar(ctx, Math.floor(Math.random() * 4) + 2);
      ctx.restore();
    }
  }

  function drawStar(ctx, r) {
    ctx.beginPath();
    ctx.moveTo(r, 0);
    for (let i = 0; i < 9; i++) {
      ctx.rotate(Math.PI / 5);
      if (i % 2 === 0) {
        ctx.lineTo((r / 0.525731) * 0.200811, 0);
      } else {
        ctx.lineTo(r, 0);
      }
    }
    ctx.closePath();
    ctx.fill();
  }
};
///////////////---------------------createSide-------------------------
const createSide = item => {
  const div = elementWithClass(`div`, [`side side__${girls[item]}`]);
  const button = createButton(girls[item]);
  const colorPalette = createColorPalette(colors, girls[item]);
  const canvas = createCanvas(item);
  drawCanvas(canvas);
  div.appendChild(canvas);
  div.appendChild(button);
  div.appendChild(colorPalette);

  return div;
};
const createDoc = () => {
  wrapper.innerHTML = "";
  for (var i = 0; i < girls.length; i++) {
    const side = createSide(i);
    wrapper.appendChild(side);
  }
  action();
  return;
};
window.addEventListener("DOMContentLoaded", () => {
  createDoc();
});
