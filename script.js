console.log("Typing Speed Game script loaded!");

const promptText = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing fast is a skill you can improve.",
  "Practice makes perfect when it comes to speed.",
  "JavaScript powers interactive web experiences.",
  "Creativity meets logic in web development."
];

const promptEl = document.getElementById("prompt");
const inputEl = document.getElementById("input");
const startBtn = document.getElementById("startBtn");
const resultsEl = document.getElementById("results");

let startTime, currentPrompt;

function generatePrompt(mode) {
  if (mode === "sentence") {
    return promptText[Math.floor(Math.random() * promptText.length)];
  } else if (mode === "alphabet") {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    return Array.from({ length: 10 }, () => letters[Math.floor(Math.random() * letters.length)]).join(" ");
  } else if (mode === "number") {
    return Array.from({ length: 10 }, () => Math.floor(Math.random() * 10) + 1).join(" ");
  }
}

function startGame() {
  const mode = document.getElementById("modeSelector").value;
  currentPrompt = generatePrompt(mode);
  promptEl.textContent = currentPrompt;
  inputEl.value = "";
  inputEl.disabled = false;
  inputEl.focus();
  resultsEl.textContent = "";
  startTime = new Date();
}

inputEl.addEventListener("input", () => {
  if (inputEl.value === currentPrompt) {
    const endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000 / 60; // in minutes

    const typedWords = inputEl.value.trim().split(" ");
    const promptWords = currentPrompt.trim().split(" ");

    let correctCount = 0;
    for (let i = 0; i < promptWords.length; i++) {
      if (typedWords[i] === promptWords[i]) {
        correctCount++;
      }
    }

    const wordCount = promptWords.length;
    const wpm = Math.round(wordCount / timeTaken);
    const accuracy = Math.round((correctCount / wordCount) * 100);
    const errors = wordCount - correctCount;

    resultsEl.innerHTML = `
      🎯 Speed: ${wpm} WPM<br>
      ✅ Accuracy: ${accuracy}%<br>
      ❌ Errors: ${errors}
    `;
    inputEl.disabled = true;
  }
});

startBtn.addEventListener("click", startGame);