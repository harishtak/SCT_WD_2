let startTime;
let isRunning = false;
let interval;

function updateDisplay() {
  const currentTime = new Date().getTime();
  const elapsed = currentTime - startTime;
  const ms = elapsed % 1000;
  const totalSeconds = Math.floor(elapsed / 1000);
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  document.getElementById("display").textContent =
    `${pad(hrs)}:${pad(mins)}:${pad(secs)}.${pad(ms, 3)}`;
}

function pad(n, z = 2) {
  return n.toString().padStart(z, '0');
}

function start() {
  if (!isRunning) {
    startTime = Date.now() - (window.elapsedTime || 0);
    interval = setInterval(updateDisplay, 10);
    isRunning = true;
  }
}

function pause() {
  if (isRunning) {
    clearInterval(interval);
    window.elapsedTime = Date.now() - startTime;
    isRunning = false;
  }
}

function reset() {
  clearInterval(interval);
  isRunning = false;
  window.elapsedTime = 0;
  document.getElementById("display").textContent = "00:00:00.000";
  document.getElementById("laps").innerHTML = "";
}

function lap() {
  if (!isRunning) return;
  const lapTime = document.getElementById("display").textContent;
  const li = document.createElement("li");
  li.textContent = `Lap - ${lapTime}`;
  document.getElementById("laps").appendChild(li);
}
