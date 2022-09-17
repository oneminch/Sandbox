import "virtual:windi.css";
import "./style.css";
import { createApp } from "petite-vue";
import axios from "axios";

/* ====================== Homepage ====================== */

const experiments = {
	"css-tinker": ["css", "fundamentals", "content"],
	"drag-n-drop": ["drag-and-drop", "vanilla-js", "windi-css"],
	"random-jokes": ["petite-vue", "water-css", "humor-api"]
};

// Render link and tags for each experiment
Object.keys(experiments).forEach((exp) => {
	let linkHTML = `
		<a
			class="exp-link"
			href="./${exp}.html"
			target="_blank"
			rel="noopener noreferer">
			<div class="w-full flex flex-col justify-between items-start">
				<p class="text-lg mb-2 pl-2 font-extrabold">
					${exp}
				</p>

				<div>`;

	experiments[exp].forEach((tag) => {
		linkHTML += '<span class="tag">' + tag + "</span>";
	});

	linkHTML += `	
				</div>
			</div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
			</svg>
		</a>`;

	document.querySelector("#app").innerHTML += linkHTML;
});

/* ====================== Drag & Drop ====================== */

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

/* ====================== CSS Tinkers ====================== */

// Smooth scrolling for table of contents
document.querySelectorAll(".outline-link").forEach((link) =>
	link.addEventListener("click", (e) => {
		e.preventDefault();

		window.scrollTo({
			behavior: "smooth",
			top:
				document
					.querySelector(e.currentTarget.attributes.href.nodeValue)
					.getBoundingClientRect().top -
				document.body.getBoundingClientRect().top -
				5
		});
	})
);

/* ====================== Random Jokes ====================== */

createApp({
	joke: "",
	modal: false,
	get showQuote() {
		return this.joke.length > 0;
	},
	// methods
	hideModal() {
		this.modal = false;
	},
	fetchNewJoke() {
		let vm = this;
		axios
			.get(
				"https://api.humorapi.com/jokes/random?api-key=c1be3de018d14210981b291d6e2b3dde"
			)
			.then(function (response) {
				vm.joke = response.data.joke;
			})
			.catch(function (error) {
				vm.modal = true;
				console.log(error);
			});
	}
}).mount();

/* ====================== Drag & Drop ====================== */
