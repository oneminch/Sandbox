import "virtual:windi.css";
import "./style.css";

const experiments = ["drag-n-drop", "landing-page"];

experiments.forEach((exp) => {
	const link = document.createElement("a");
	link.href = `./${exp}/dist/index.html`;
	link.classList.add("exp-link");

	const linkText = document.createElement("span");
	linkText.textContent = exp;

	const icon = `
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  		<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
		</svg>`;

	link.innerHTML = linkText.outerHTML + icon;

	document.querySelector("#app").appendChild(link);
});
