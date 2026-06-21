const now = new Date();
const currentYear = now.getFullYear();
const targetYear = currentYear + 1;

const newYear = new Date(`${targetYear}-01-01 00:00:00`);

const yearElements = document.querySelectorAll('#targetYear, #yearBadge, #newYearDisplay');
yearElements.forEach(el => { el.textContent = targetYear; });

document.title = `Cuenta atrás — Año Nuevo ${targetYear}`;

function formatTime(time) {
  return time.toString().padStart(2, '0');
}

function updateCountdown() {
  const now = new Date();
  const timeLeft = newYear - now;

  if (timeLeft <= 0) {
    clearInterval(countdownInterval);
    celebrateNewYear();
    return;
  }

  const days = Math.floor(timeLeft / 1000 / 60 / 60 / 24);
  const hours = Math.floor((timeLeft / 1000 / 60 / 60) % 24);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  document.getElementById('days').textContent = formatTime(days);
  document.getElementById('hours').textContent = formatTime(hours);
  document.getElementById('minutes').textContent = formatTime(minutes);
  document.getElementById('seconds').textContent = formatTime(seconds);

  updateYearProgress(now);
}

function updateYearProgress(now) {
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const endOfYear = new Date(now.getFullYear() + 1, 0, 1);
  const total = endOfYear - startOfYear;
  const elapsed = now - startOfYear;
  const percent = Math.min(100, (elapsed / total) * 100);

  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  progressFill.style.width = `${percent}%`;
  progressText.textContent = `${percent.toFixed(1)}%`;
}

function celebrateNewYear() {
  const startSection = document.querySelector('.container-start');
  const endSection = document.querySelector('.container-end');

  startSection.style.display = 'none';
  endSection.style.display = 'flex';

  const duration = 30 * 1000;
  const end = Date.now() + duration;

  function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors: ['#f093fb', '#f5576c', '#ffd86f', '#ffffff', '#00d4ff'],
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors: ['#f093fb', '#f5576c', '#ffd86f', '#ffffff', '#00d4ff'],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }

  frame();

  confetti({
    particleCount: 200,
    spread: 360,
    origin: { x: 0.5, y: 0.3 },
    colors: ['#f093fb', '#f5576c', '#ffd86f', '#ffffff', '#00d4ff'],
  });

  setTimeout(() => {
    confetti({
      particleCount: 150,
      spread: 360,
      origin: { x: 0.5, y: 0.5 },
    });
  }, 500);

  document.querySelector('.container-end h1').style.animation = 'none';
  void document.querySelector('.container-end h1').offsetHeight;
  document.querySelector('.container-end h1').style.animation = 'fade-in-down 1.5s cubic-bezier(0.25, 1, 0.3, 1) both';
}

function previewCelebration() {
  confetti({
    particleCount: 80,
    spread: 100,
    origin: { x: 0.5, y: 0.4 },
    colors: ['#f093fb', '#f5576c', '#ffd86f', '#ffffff', '#00d4ff'],
  });
  setTimeout(() => {
    confetti({
      particleCount: 60,
      spread: 120,
      origin: { x: 0.3, y: 0.5 },
    });
  }, 150);
  setTimeout(() => {
    confetti({
      particleCount: 60,
      spread: 120,
      origin: { x: 0.7, y: 0.5 },
    });
  }, 300);
}

document.getElementById('celebrateBtn').addEventListener('click', previewCelebration);

const countdownInterval = setInterval(updateCountdown, 1000);

updateCountdown();
