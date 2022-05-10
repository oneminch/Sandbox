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
