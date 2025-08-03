
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
const display = document.getElementById("display");
const lapsList = document.getElementById("laps");

function updateTime() {
  const currentTime = Date.now() - startTime + elapsedTime;
  const date = new Date(currentTime);
  const mins = String(date.getUTCMinutes()).padStart(2, '0');
  const secs = String(date.getUTCSeconds()).padStart(2, '0');
  const millis = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
  display.textContent = `${mins}:${secs}:${millis}`;
}

document.getElementById("start").addEventListener("click", () => {
  startTime = Date.now();
  timerInterval = setInterval(updateTime, 10);
  document.getElementById("start").disabled = true;
});

document.getElementById("pause").addEventListener("click", () => {
  clearInterval(timerInterval);
  elapsedTime += Date.now() - startTime;
  document.getElementById("start").disabled = false;
});

document.getElementById("reset").addEventListener("click", () => {
  clearInterval(timerInterval);
  display.textContent = "00:00:00";
  elapsedTime = 0;
  startTime = 0;
  lapsList.innerHTML = "";
  document.getElementById("start").disabled = false;
});

document.getElementById("lap").addEventListener("click", () => {
  if (!timerInterval) return;
  const lapTime = display.textContent;
  const li = document.createElement("li");
  li.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
  lapsList.appendChild(li);
});
