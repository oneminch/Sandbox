import './style.css';

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
  });
});

document.addEventListener("drop", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("dropzone")) {
    e.target.appendChild(e.dataTransfer.mozSourceNode);
    e.target.classList.remove("bg-gray-200");
    e.target.classList.add("bg-gray-100");
  }
});

document.addEventListener("dragleave", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("dropzone")) {
    e.target.classList.remove("bg-gray-200");
    e.target.classList.add("bg-gray-100");
  }
});

document.addEventListener("dragover", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("dropzone")) {
    e.target.classList.remove("bg-gray-100");
    e.target.classList.add("bg-gray-200");
  }
});
