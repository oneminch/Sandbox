import "virtual:windi.css";
import "./style.css";

const experiments = {
	"drag-n-drop": ["drag-and-drop", "vanilla-js", "windi-css"],
	"landing-page": ["parallax", "lightbox"]
};

// Render link and tags for each experiment
Object.keys(experiments).forEach((exp) => {
	let linkHTML = `
		<a
			class="exp-link"
			href="./${exp}/dist/index.html"
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
