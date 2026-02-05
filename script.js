const yesButton = document.querySelector(".btn.yes");
const noButton = document.querySelector(".btn.no");
const actions = document.querySelector(".actions");
const modal = document.getElementById("surpriseModal");
const countdown = document.getElementById("countdown");
const modalClose = document.querySelector(".modal-close");

const targetTimestamp = Date.parse("2026-02-08T12:30:00+03:00");

const formatTimeUnit = (value) => String(value).padStart(2, "0");

const updateCountdown = () => {
  const diff = targetTimestamp - Date.now();
  if (diff <= 0) {
    countdown.textContent = "00 д 00:00:00";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdown.textContent = `${days} д ${formatTimeUnit(hours)}:${formatTimeUnit(minutes)}:${formatTimeUnit(seconds)}`;
};

const openModal = () => {
  modal.classList.add("is-visible");
  modal.setAttribute("aria-hidden", "false");
};

const closeModal = () => {
  modal.classList.remove("is-visible");
  modal.setAttribute("aria-hidden", "true");
};

const moveNoButton = () => {
  const containerRect = actions.getBoundingClientRect();
  const buttonRect = noButton.getBoundingClientRect();
  const maxLeft = Math.max(containerRect.width - buttonRect.width, 0);
  const maxTop = Math.max(containerRect.height - buttonRect.height, 0);
  const nextLeft = Math.random() * maxLeft;
  const nextTop = Math.random() * maxTop;

  noButton.style.right = "auto";
  noButton.style.left = `${nextLeft}px`;
  noButton.style.top = `${nextTop}px`;
};

updateCountdown();
setInterval(updateCountdown, 1000);

yesButton.addEventListener("mouseenter", openModal);
yesButton.addEventListener("focus", openModal);
yesButton.addEventListener("click", openModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

modalClose.addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

noButton.addEventListener("mouseenter", moveNoButton);
noButton.addEventListener("focus", moveNoButton);
