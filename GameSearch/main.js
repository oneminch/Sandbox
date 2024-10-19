import "/style.css";
import "virtual:windi.css";
import Fuse from "fuse.js";
import Alpine from "alpinejs";

window.Alpine = Alpine;

class Query {
	constructor(name, value) {
		this[name] = value;
	}
}

const createSearchQuery = (query) => {
	let keywords = query.split(" "),
		queryList = [];

	keywords.forEach((keyword) => {
		queryList.push(new Query("title", keyword));
		queryList.push(new Query("short_description", keyword));
	});

	return queryList;
};

Alpine.data("app", () => ({
	query: "",
	results: [],
	allGames: [],
	initialDesc: true,

	fetchGames() {
		const baseURL = "https://www.freetogame.com/api/games";
		const corsProxy = "https://api.allorigins.win/get?url=";

		fetch(`${corsProxy}${encodeURIComponent(baseURL)}`)
			.then((response) => response.json())
			.then((data) => {
				const jsonData = JSON.parse(data.contents);
				this.allGames = jsonData.slice();
			})
			.catch((err) => console.log(err));
	},

	search() {
		if (!this.query.trim()) {
			return;
		}

		this.initialDesc = false;

		const fuse = new Fuse(this.allGames, {
			threshold: 0.3,
			keys: ["title", "short_description"],
		});

		const results = fuse.search({
			$or: createSearchQuery(this.query),
		});

		this.results = results.map((el) => el.item);
		// console.log(JSON.parse(JSON.stringify(this.results)));
	},

	init() {
		this.fetchGames();
	},
}));

Alpine.start();
