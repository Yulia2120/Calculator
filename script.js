let a = ""; // first number
let b = ""; //second number
let sign = ""; //знак операции
let finish = false;

const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ","];
const action = ["-", "+", "X", "/"];
//screen
const out = document.querySelector(".calc-screen p");

function clearAll() {
  a = "";
  b = "";
  sign = "";
  finish = false;
  out.textContent = 0;
}

document.querySelector(".ac").onclick = clearAll;
document.querySelector(".buttons").onclick = (event) => {
  // нажата не кнопка
  if (!event.target.classList.contains("btn")) return;
  // нажата кнопка clearAll ac
  if (event.target.classList.contains("ac")) return;

  out.textContent = "";

  //получаю нажатую кнопку
  const key = event.target.textContent;
  //если нажата цифра 0-9 или ,
  if (digit.includes(key)) {
    if (b === "" && sign === "") {
      a += key;
      out.textContent = a;
    } else if (a !== "" && b !== "" && finish) {
      b = key;
      finish = false;
      out.textContent = b;
    } else {
      b += key;
      out.textContent = b;
    }

    return;
  }

  //если нажата клавиша действия = - / *
  if (action.includes(key)) {
    sign = key;
    out.textContent = sign;
    return;
  }
  //=
  if (key === "=") {
    if (b === "") b = a;
    switch (sign) {
      case "+":
        a = +a + +b; // чтобы не получить конкатенацию
        break;
      case "-":
        a = a - b;
        break;
      case "X":
        a = a * b;
        break;
      case "/":
        if (b === "0") {
          out.textContent = "Ошибка";
          a = "";
          b = "";
          sign = "";
          return;
        }
        a = a / b;
        break;
    }
    finish = true;
    out.textContent = a;
  }

  const para = document.createElement("p");
  para.innerHTML = `${a}  ${b} ${sign}`;
  document.getElementById("history").append(para);
};
