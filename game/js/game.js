import quotes_array from "./modules/quotes.js";
import * as f from "./modules/functions.js";
// define the time limit
let TIME_LIMIT = 10;

// selecting required elements
let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");

let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");

let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");

let start_btn = document.querySelector(".start_btn");
let restart_btn = document.querySelector(".restart_btn");

let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let info_bar = document.querySelector(".info");
let panel = document.querySelector(".panel");
let body = document.querySelector("body");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let timer = null;

start_btn.addEventListener("click", () => {
  startGame();
});

restart_btn.addEventListener("click", () => {
  startGame();
});

input_area.addEventListener("input", () => {
  processCurrentText();
});

function updateQuote() {
  quote_text.textContent = null;
  current_quote = quotes_array[Math.floor(Math.random() * quotes_array.length)];

  // separate each character and make an element
  // out of each of them to individually style them
  current_quote.split("").forEach((char) => {
    const charSpan = document.createElement("span");
    charSpan.innerText = char;
    quote_text.appendChild(charSpan);
  });
}

function processCurrentText() {
  // get current input text and split it
  let curr_input = input_area.value;
  let curr_input_array = curr_input.split("");

  // increment total characters typed
  characterTyped++;

  errors = 0;

  let quoteSpanArray = quote_text.querySelectorAll("span");
  quoteSpanArray.forEach((char, index) => {
    let typedChar = curr_input_array[index];

    // characters not currently typed
    if (typedChar == null) {
      char.classList.remove("correct_char");
      char.classList.remove("incorrect_char");

      // correct characters
    } else if (typedChar === char.innerText) {
      char.classList.add("correct_char");
      char.classList.remove("incorrect_char");
      body.classList.remove("shake");

      // incorrect characters
    } else {
      char.classList.add("incorrect_char");
      char.classList.remove("correct_char");

      body.classList.add("shake");

      body.addEventListener("animationend", () => {
        body.classList.remove("shake");
      });

      // increment number of errors
      errors++;
    }
  });

  // display the number of errors
  error_text.textContent = total_errors + errors;

  // update accuracy text
  let correctCharacters = characterTyped - (total_errors + errors);
  let accuracyVal = (correctCharacters / characterTyped) * 100;
  accuracy_text.textContent = Math.round(accuracyVal) + "%";

  // if current text is completely typed
  // irrespective of errors
  if (curr_input.length == current_quote.length) {
    updateQuote();
    f.updateSound();

    // update total errors
    total_errors += errors;

    // clear the input area
    input_area.value = "";
  }
}

function updateTimer() {
  if (timeLeft > 0) {
    // decrease the current time left
    timeLeft--;

    // increase the time elapsed
    timeElapsed++;

    // update the timer text
    timer_text.textContent = timeLeft + "s";

    if (timeLeft <= 5) {
      f.timeSound();
    }
  } else {
    // finish the game
    finishGame();
  }
}

function finishGame() {
  // stop the timer
  clearInterval(timer);
  f.endSound();

  // hidde the input area
  input_area.style.display = "none";

  // show finishing text
  quote_text.textContent = "Time out.";

  // display restart button
  restart_btn.style.display = "block";

  // calculate cpm and wpm
  let cpm = Math.round((characterTyped / timeElapsed) * 60);
  let wpm = Math.round((characterTyped / 5 / timeElapsed) * 60);

  // update cpm and wpm text
  cpm_text.textContent = cpm;
  wpm_text.textContent = wpm;

  // display the cpm and wpm
  cpm_group.style.display = "block";
  wpm_group.style.display = "block";

  info_bar.classList.add("finResult");
  panel.classList.add("finPanel");
}

function startGame() {
  f.startSound();
  resetValues();
  updateQuote();
  input_area.focus();

  // clear old and start a new timer
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);

  input_area.addEventListener("keydown", f.typingSound);
  info_bar.classList.remove("finResult");
  panel.classList.remove("finPanel");
}

function resetValues() {
  timeLeft = TIME_LIMIT;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;

  accuracy = 0;

  characterTyped = 0;
  input_area.disabled = false;

  input_area.value = "";
  accuracy_text.textContent = 0 + "%";
  timer_text.textContent = timeLeft + "s";
  error_text.textContent = 0;
  restart_btn.style.display = "none";
  cpm_group.style.display = "none";
  wpm_group.style.display = "none";

  start_btn.style.display = "none";
  info_bar.style.display = "flex";
  input_area.style.display = "block";
  quote_text.style.display = "block";
}
