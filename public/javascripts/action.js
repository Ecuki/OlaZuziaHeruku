let counter = 0;
let imageCounter = 1;

function remove(elements) {
  if (!elements) {
    return;
  } else if (elements.length) {
    for (let element of elements) {
      element.parentNode.removeChild(element);
    }
  } else {
    elements.parentNode.removeChild(elements);
  }
}

function getRandomTransform() {
  const height =
    Math.random() * ((window.innerHeight * 3) / 8 + 40) +
    ((window.innerHeight * 1) / 8 + 40);
  const randomPosition = parseInt(Math.random() * height);
  let value = counter % 2 ? randomPosition : -randomPosition;

  const translate = `translateY(${value}px) rotate(${
    counter % 2 ? "-" : "+"
  }45deg)`;
  return translate;
}
function handleLetterClick(e) {
  const letter = e.target;
  const text = letter.textContent;
  if (letter.classList.contains("letter--active")) return;
  letter.textContent = text;
  letter.classList.toggle("letter--active");

  letter.style.backgroundColor = letter.style.color;

  setTimeout(() => {
    // letter.textContent = "?";
    letter.classList.toggle("letter--active");
    letter.style.backgroundColor = "transparent";
  }, 2500);
}

function createSign(sign) {
  let letter = elementWithClass("span", ["letter letter--clear"]);

  counter = counter >= colors.length ? 0 : counter;
  letter.style.color = `#${colors[counter]}`;
  letter.style.display = "block";
  counter++;
  letter.textContent = sign;
  if (sign == " ") letter.innerHTML = "&nbsp;";
  letter.style.transform = getRandomTransform();
  setTimeout(() => {
    letter.addEventListener("click", e => handleLetterClick(e));
  }, 12000);

  return letter;
}

function createMessage(name) {
  const text = `cześć ${name}!`;
  const message = elementWithClass("div", ["welcoming-message"]);

  for (let sign of text) {
    const letter = createSign(sign);
    message.appendChild(letter);
  }
  return message;
}

function createArrow() {
  const arrow = elementWithClass("div", ["arrow"]);
  const arrowTop = elementWithClass("div", ["arrow-top"]);
  const arrowBottom = elementWithClass("div", ["arrow-bottom"]);

  arrow.appendChild(arrowTop);
  arrow.appendChild(arrowBottom);
  return arrow;
}
function createImage(name) {
  const image = elementWithClass("div", ["img"]);
  image.style.backgroundImage = `url('/images/${name}/${imageCounter}.jpg')`;
  const arrowLeft = createArrow();
  const arrowRight = createArrow();
  arrowRight.classList.add("arrow-right");
  arrowLeft.classList.add("arrow-left");

  image.appendChild(arrowLeft);
  image.appendChild(arrowRight);

  return image;
}
function changeImage(e, name) {
  const arrow = e.target;
  const i = arrow.classList.contains("arrow-right") ? 1 : -1;

  const image = document.querySelector("div.img");
  imageCounter += i;
  if (imageCounter > 5) imageCounter = 1;
  if (imageCounter < 1) imageCounter = 5;
  image.style.backgroundImage = `url('/images/${name}/${imageCounter}.jpg')`;
}
function welcoming(name) {
  const contener = document.createElement("div");
  contener.setAttribute("id", "message");
  const image = createImage(name);
  const message = createMessage(name);
  const exit = createButton("exit");
  const write = createButton("pisanko");
  write.setAttribute("href", `/chat?name=${name}`);
  exit.setAttribute("href", `/`);

  contener.appendChild(message);
  contener.appendChild(image);
  contener.appendChild(exit);
  contener.appendChild(write);
  wrapper.appendChild(contener);

  const arrows = document.querySelectorAll(".arrow");
  arrows.forEach(arrow =>
    arrow.addEventListener("click", e => changeImage(e, name))
  );

  setTimeout(() => {
    const letters = document.getElementsByClassName("letter");
    [...letters].forEach(letter => {
      letter.classList.remove("letter--clear");
      letter.style.transform = "none";
      letter.style.transform = "translateY(-200%)";
    });
  }, 12000);
}

function handleSideChoose(e) {
  const sides = document.querySelectorAll(".side");
  remove(sides);

  e.preventDefault;
  const name = e.target.name;
  welcoming(name);
}
function action() {
  window.removeEventListener("resize", createDoc);
  const buttons = document.querySelectorAll("a");

  for (let button of buttons) {
    button.addEventListener("click", e => {
      handleSideChoose(e);
    });
  }
  return;
}
