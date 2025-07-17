const grid = document.getElementById('grid');
const pieces = document.getElementById('pieces');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
let score = 0;
let time = 0;

// Setup timer
setInterval(() => {
  time++;
  timerEl.textContent = time;
}, 1000);

// Create 9x9 grid
const gridState = [];
for (let i = 0; i < 81; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.index = i;
  grid.appendChild(cell);
  gridState.push(false);
}

// Generate a block
function generateBlock() {
  pieces.innerHTML = '';
  const block = document.createElement('div');
  block.classList.add('block');
  block.setAttribute('draggable', 'true');
  block.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', 'block');
  });
  pieces.appendChild(block);
}

// Allow drop
grid.addEventListener('dragover', e => {
  e.preventDefault();
});

grid.addEventListener('drop', e => {
  const target = e.target;
  if (target.classList.contains('cell')) {
    const index = parseInt(target.dataset.index);
    if (!gridState[index]) {
      target.classList.add('filled');
      gridState[index] = true;
      score += 10;
      scoreEl.textContent = score;
      localStorage.setItem('score', score);
      generateBlock();
    }
  }
});

// Init
generateBlock();
score = parseInt(localStorage.getItem('score')) || 0;
scoreEl.textContent = score;
