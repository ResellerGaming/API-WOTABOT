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

  // Mouse drag
  block.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', 'block');
  });

  // Touch drag
  block.addEventListener('touchstart', handleTouchStart);
  block.addEventListener('touchmove', handleTouchMove);
  block.addEventListener('touchend', handleTouchEnd);

  pieces.appendChild(block);
}

let draggedBlock = null;
let offsetX = 0;
let offsetY = 0;

function handleTouchStart(e) {
  draggedBlock = e.target;
  const touch = e.touches[0];
  offsetX = touch.clientX - draggedBlock.getBoundingClientRect().left;
  offsetY = touch.clientY - draggedBlock.getBoundingClientRect().top;
  draggedBlock.style.position = 'fixed';
  draggedBlock.style.zIndex = 1000;
}

function handleTouchMove(e) {
  if (!draggedBlock) return;
  const touch = e.touches[0];
  draggedBlock.style.left = (touch.clientX - offsetX) + 'px';
  draggedBlock.style.top = (touch.clientY - offsetY) + 'px';
}

function handleTouchEnd(e) {
  if (!draggedBlock) return;
  const touch = e.changedTouches[0];
  const elementAtPoint = document.elementFromPoint(touch.clientX, touch.clientY);
  if (elementAtPoint && elementAtPoint.classList.contains('cell')) {
    const index = parseInt(elementAtPoint.dataset.index);
    if (!gridState[index]) {
      elementAtPoint.classList.add('filled');
      gridState[index] = true;
      score += 10;
      scoreEl.textContent = score;
      localStorage.setItem('score', score);
      generateBlock();
    }
  }
  draggedBlock.style.position = '';
  draggedBlock.style.left = '';
  draggedBlock.style.top = '';
  draggedBlock.style.zIndex = '';
  draggedBlock = null;
}

// Desktop drop
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
                             
