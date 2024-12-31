// '2024-12-12 12:06:00'
// '2024-12-12 11:55:00'
const newYear = new Date('2025-01-01 00:00:00');

function formatTime(time) {
  return time.toString().padStart(2, '0');
}

function updateCountdown() {
  const now = new Date();
  const timeLeft = newYear - now;

  const days = Math.floor(timeLeft / 1000 / 60 / 60 / 24);
  const hours = Math.floor((timeLeft / 1000 / 60 / 60) % 24);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  const happyNewYear =
    days === 0 && hours === 0 && minutes === 0 && seconds === 0;

  if (happyNewYear) {
    clearInterval(countdownInterval);

    setInterval(() => {
      confetti({
        particleCount: 200,
        spread: 360,
        origin: {
          x: Math.random(),
          y: Math.random(),
        },
      });
    }, 1000);

    document.querySelector('.container-start').style.display = 'none';
    document.querySelector('.container-end').style.display = 'block';
  }

  document.getElementById('days').textContent = formatTime(days);
  document.getElementById('hours').textContent = formatTime(hours);
  document.getElementById('minutes').textContent = formatTime(minutes);
  document.getElementById('seconds').textContent = formatTime(seconds);
}

const countdownInterval = setInterval(updateCountdown, 1000);

updateCountdown();
