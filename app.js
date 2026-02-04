// Game State
let gameState = {
  category: '',
  word: '',
  shownWord: [],
  usedLetters: [],
  attempts: 7,
  active: false
};

// DOM Elements
const selectionScreen = document.getElementById('selection-screen');
const gameArea = document.getElementById('game-area');
const categorySelection = document.getElementById('category-selection');
const currentCategoryEl = document.getElementById('current-category');
const wordEl = document.querySelector('.word');
const messageEl = document.querySelector('.message');
const attemptsEl = document.getElementById('intentos');
const inputEl = document.getElementById('texto');
const submitBtn = document.getElementById('submit');
const resetBtn = document.getElementById('reset-btn');
const imageContainer = document.getElementById('imagen');

// Initialize Category Selection
function init() {
  // Check if data exists
  if (!window.gameData) {
    console.error("Game data not found!");
    return;
  }

  // Create buttons for each category
  Object.keys(window.gameData).forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat;
    btn.classList.add('category-btn');
    btn.addEventListener('click', () => startGame(cat));
    categorySelection.appendChild(btn);
  });
}

// Start Game
function startGame(category) {
  const words = window.gameData[category];
  const word = words[Math.floor(Math.random() * words.length)];

  gameState = {
    category: category,
    word: word,
    shownWord: Array(word.length).fill('_'),
    usedLetters: [],
    attempts: 7,
    active: true
  };

  // UI Updates
  selectionScreen.style.display = 'none';
  gameArea.style.display = 'block';
  currentCategoryEl.textContent = `Categoría: ${category}`;
  resetBtn.style.display = 'none';
  imageContainer.innerHTML = ''; // Clear image
  updateDisplay();

  inputEl.value = '';
  inputEl.focus();
  inputEl.disabled = false;
  submitBtn.disabled = false;
  messageEl.textContent = '';
}

// Update Display
function updateDisplay() {
  wordEl.textContent = gameState.shownWord.join(' ');
  attemptsEl.textContent = gameState.attempts;
}

// Process Input
function handleInput() {
  if (!gameState.active) return;

  const letter = inputEl.value.toLowerCase().trim();
  inputEl.value = '';
  inputEl.focus();

  if (!letter || !/^[a-zñ]$/.test(letter)) {
    messageEl.textContent = 'Por favor ingresa una letra válida.';
    return;
  }

  if (gameState.usedLetters.includes(letter)) {
    messageEl.textContent = `¡Ya usaste la letra "${letter}"!`;
    return;
  }

  gameState.usedLetters.push(letter);

  // Check match
  let match = false;
  for (let i = 0; i < gameState.word.length; i++) {
    if (gameState.word[i] === letter) {
      gameState.shownWord[i] = letter;
      match = true;
    }
  }

  if (match) {
    messageEl.textContent = '¡Correcto!';
    messageEl.style.color = 'var(--success)';
    checkWin();
  } else {
    gameState.attempts--;
    messageEl.textContent = 'Incorrecto...';
    messageEl.style.color = 'var(--danger)';
    checkLoss();
  }

  updateDisplay();
}

function checkWin() {
  if (!gameState.shownWord.includes('_')) {
    endGame(true);
  }
}

function checkLoss() {
  if (gameState.attempts === 0) {
    endGame(false);
  }
}

function endGame(win) {
  gameState.active = false;
  inputEl.disabled = true;
  submitBtn.disabled = true;
  resetBtn.style.display = 'inline-block';

  if (win) {
    messageEl.textContent = '¡GANASTE! 🎉';
    messageEl.style.color = 'var(--success)';
    showImage("https://i.pinimg.com/564x/bc/17/f1/bc17f18b731258394538b18df123c133.jpg", "Ganaste");
  } else {
    messageEl.textContent = `Perdiste. La palabra era: ${gameState.word}`;
    messageEl.style.color = 'var(--danger)';
    gameState.shownWord = gameState.word.split(''); // Show full word
    updateDisplay();
    showImage("https://i.pinimg.com/564x/d7/7f/be/d77fbe9d6d0993134f52572064565ef9.jpg", "Perdiste");
  }
}

function showImage(url, alt) {
  const img = document.createElement('img');
  img.src = url;
  img.alt = alt;
  imageContainer.innerHTML = '';
  imageContainer.appendChild(img);
}

// Listeners
submitBtn.addEventListener('click', handleInput);
inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleInput();
});

resetBtn.addEventListener('click', () => {
  // Basic reset to category selection
  gameArea.style.display = 'none';
  selectionScreen.style.display = 'block';
  // Clear selection so we don't duplicate buttons? 
  // Actually init() runs once. Buttons persist.
  // Just show selection screen.
  messageEl.textContent = '';
});

// Start
init();