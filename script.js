const articles = document.querySelectorAll(".article");
const listStatesElement = document.querySelector(".list");

let currentPeriod = "weekly";
let timeData = [];

async function loadData() {
  const response = await fetch("data.json");
  timeData = await response.json();
}

listStatesElement.addEventListener("click", function (e) {
  if (e.target && !e.target.matches(".list-item")) return;

  document.querySelectorAll(".list-item").forEach((item) => {
    item.classList.remove("active");
  });

  e.target.classList.add("active");
  currentPeriod = e.target.getAttribute("data-period");
  updateUI();
});

function updateUI() {
  articles.forEach((article) => {
    const title = article.getAttribute("data-title");
    const matchingData = timeData.find((item) => item.title === title);

    if (!matchingData) return;

    const periodData = matchingData.timeframes[currentPeriod];

    const current = article.querySelector(".hours-title");
    const previous = article.querySelector(".last-week-text");

    current.textContent = `${periodData.current}hrs`;
    previous.textContent = `Last ${currentPeriod} - ${periodData.previous}hrs`;
  });
}

async function init() {
  await loadData();
  updateUI();
}

init();
