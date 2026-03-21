let workTime = 25;
let breakTime = 5;
let timeLeft = workTime * 60;
let timer = null;
let isRunning = false;
let mode = 'work';
let sessions = 0;

const timerDisplay = document.getElementById('timer');
const modeDisplay = document.getElementById('mode');
const sessionsDisplay = document.getElementById('sessions');
const workInput = document.getElementById('workTime');
const breakInput = document.getElementById('breakTime');

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function updateDisplay() {
  timerDisplay.textContent = formatTime(timeLeft);
}

function switchMode() {
  if (mode === 'work') {
    mode = 'break';
    timeLeft = breakTime * 60;
    sessions++;
  } else {
    mode = 'work';
    timeLeft = workTime * 60;
  }

  modeDisplay.textContent = 'Mode: ' + (mode === 'work' ? 'Work' : 'Break');
  sessionsDisplay.textContent = 'Sessions: ' + sessions;
  updateDisplay();
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;

  timer = setInterval(() => {
    if (timeLeft <= 0) {
      switchMode();
    } else {
      timeLeft--;
    }
    updateDisplay();
  }, 1000);
}

function pauseTimer() {
  isRunning = false;
  clearInterval(timer);
}

function resetTimer() {
  pauseTimer();
  mode = 'work';
  sessions = 0;
  workTime = parseInt(workInput.value);
  breakTime = parseInt(breakInput.value);
  timeLeft = workTime * 60;
  modeDisplay.textContent = 'Mode: Work';
  sessionsDisplay.textContent = 'Sessions: 0';
  updateDisplay();
}
workInput.addEventListener('input', () => {
  workTime = parseInt(workInput.value) || 0;
  if (mode === 'work') {
    timeLeft = workTime * 60;
    updateDisplay();
  }
});

breakInput.addEventListener('input', () => {
  breakTime = parseInt(breakInput.value) || 0;
  if (mode === 'break') {
    timeLeft = breakTime * 60;
    updateDisplay();
  }
});

updateDisplay();