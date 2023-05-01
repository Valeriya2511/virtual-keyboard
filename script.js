const keyboard = [
  "`",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "-",
  "=",
  "Backspace",
  "Tab",
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "[",
  "]",
  "\\",
  "Del",
  "CapsLock",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  ";",
  "'",
  "Enter",
  "Shift",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  ",",
  ".",
  "/",
  "ArrowUp",
  "Shift",
  "Control",
  "Win",
  "Alt",
  " ",
  "Alt",
  "Control",
  "ArrowLeft",
  "ArrowDown",
  "ArrowRight",
];

const keyboardRU = [
  "ё",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "-",
  "=",
  "Backspace",
  "Tab",
  "й",
  "ц",
  "у",
  "к",
  "е",
  "н",
  "г",
  "ш",
  "щ",
  "з",
  "х",
  "ъ",
  "\\",
  "Del",
  "CapsLock",
  "ф",
  "ы",
  "в",
  "а",
  "п",
  "р",
  "о",
  "л",
  "д",
  "ж",
  "э",
  "Enter",
  "Shift",
  "я",
  "ч",
  "с",
  "м",
  "и",
  "т",
  "ь",
  "б",
  "ю",
  ".",
  "ArrowUp",
  "Shift",
  "Control",
  "Win",
  "Alt",
  " ",
  "Alt",
  "Control",
  "ArrowLeft",
  "ArrowDown",
  "ArrowRight",
];

let c = false;

const body = document.querySelector(".body");

const wrapperKeyBoard = document.createElement("div");
wrapperKeyBoard.classList.add("wrapper-keyboard");

const wrapperTextarea = document.createElement("textarea");
wrapperTextarea.classList.add("wrapper-textarea");

const titleKeyBoard = document.createElement("h1");
titleKeyBoard.classList.add("title-keyboard");
titleKeyBoard.textContent = "RSS Виртуальная клавиатура";

const os = document.createElement("p");
os.classList.add("os");
os.textContent = "OS - Windows";

const language = document.createElement("p");
language.classList.add("os");
language.textContent = "Language - Ctrl + Shift";

function init(keyboard) {
  let out = "";
  for (let i = 0; i < keyboard.length; i++) {
    if (keyboard[i] === "Backspace" || keyboard[i] === "CapsLock" || i === 42) {
      out +=
        '<div class="square-key rectangular-key-backspace" data="' +
        keyboard[i] +
        '">' +
        `${keyboard[i]}` +
        "</div>";
    } else if (keyboard[i] === "Enter") {
      out +=
        '<div class="square-key rectangular-key-enter" data="' +
        keyboard[i] +
        '">' +
        `${keyboard[i]}` +
        "</div>";
    } else if (keyboard[i] === "Control") {
      out +=
        '<div class="square-key rectangular-key-control" data="' +
        keyboard[i] +
        '">' +
        `${keyboard[i]}` +
        "</div>";
    } else if (keyboard[i] === " ") {
      out +=
        '<div class="square-key rectangular-key-space" data="' +
        keyboard[i] +
        '">' +
        `${keyboard[i]}` +
        "</div>";
    } else {
      out +=
        '<div class="square-key"  data="' +
        keyboard[i] +
        '">' +
        `${keyboard[i]}` +
        "</div>";
    }
  }
  body.append(titleKeyBoard);
  body.append(wrapperTextarea);
  body.append(wrapperKeyBoard);
  body.append(os);
  body.append(language);
  wrapperKeyBoard.innerHTML = out;
}

init(keyboard);

// keys.forEach((el) => {
//   el.addEventListener("click", (event) => {
//     if (event.target.innerHTML === "CapsLock") {
//       if (el.classList.contains("active")) {
//         c = false;
//         el.classList.remove("active");
//         for (let i of keys) {
//           i.classList.remove("square-key-to-upper-case");
//         }
//       } else {
//         c = true;
//         el.classList.add("active");
//         for (let i of keys) {
//           if (i.textContent.length === 1) {
//             i.classList.add("square-key-to-upper-case");
//           }
//         }
//       }
//     }
//     if (event.target.innerHTML === "Backspace") {
//       wrapperTextarea.value = wrapperTextarea.value.substring(
//         0,
//         wrapperTextarea.value.length - 1
//       );
//     } else {
//       if (c === true) {
//         wrapperTextarea.value =
//           wrapperTextarea.value +
//           String(event.target.innerHTML).toUpperCase().replace("CAPSLOCK", "");
//       } else if (c === false) {
//         wrapperTextarea.value =
//           wrapperTextarea.value +
//           String(event.target.innerHTML).replace("CapsLock", "");
//       } else {
//         wrapperTextarea.value = wrapperTextarea.value + event.target.innerHTML;
//       }
//     }
//   });
// });

let lang = "en";

function newClick(document) {
  document.querySelectorAll(".square-key").forEach((el) => {
    el.addEventListener("click", (event) => {
      wrapperTextarea.value = wrapperTextarea.value + event.target.innerHTML;
    });
    console.log(document);
  });
}

function runOnKeys(func, func2, ...codes) {
  let pressed = new Set();

  document.addEventListener("keydown", function (event) {
    document
      .querySelector('.wrapper-keyboard .square-key[data="' + event.key + '"]')
      .classList.add("active");
    wrapperTextarea.value = wrapperTextarea.value + event.key;

    pressed.add(event.code);

    for (let code of codes) {
      if (!pressed.has(code)) {
        return;
      }
    }
    pressed.clear();

    if (lang === "en") {
      func(keyboardRU);
      lang = "ru";
    } else if (lang === "ru") {
      func(keyboard);
      lang = "en";
    }
  });

  document.addEventListener("keyup", function (event) {
    pressed.delete(event.code);
    document
      .querySelector('.wrapper-keyboard .square-key[data="' + event.key + '"]')
      .classList.remove("active");
  });

  func2(document);
}

runOnKeys(init, newClick, "ControlLeft", "ShiftLeft");
