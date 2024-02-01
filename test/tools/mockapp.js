import path from "path";
import FileSystem from "fs";

export default class MockApp {
	#json;
	router = {};
	constructor() {
		this.#checkAndCreateTemResourceFolder();
	}

	#checkAndCreateTemResourceFolder() {
		const tempResourcePath = path.join(
			path.join(path.resolve(), "test"),
			".temp"
		);

		if (!FileSystem.existsSync(tempResourcePath)) {
			FileSystem.mkdirSync(tempResourcePath);
			console.log(".temp folder created.");
		}

		this.#json = path.join(tempResourcePath, "routes.json");
		if (!FileSystem.existsSync(this.#json)) {
			FileSystem.writeFileSync(this.#json, JSON.stringify({}));
		}
	}

	#map({ method, route, pipeline }) {
		if (!this.router.hasOwnProperty(method)) {
			this.router[method] = {};
		}
		this.router[method][route] = pipeline;
	}

	get(...args) {
		this.#map({
			method: "get",
			route: args.shift(),
			pipeline: args.pop()
		});
	}

	post(...args) {
		this.#map({
			method: "post",
			route: args.shift(),
			pipeline: args.pop()
		});
	}

	put(...args) {
		this.#map({
			method: "put",
			route: args.shift(),
			pipeline: args.pop()
		});
	}

	delete(...args) {
		this.#map({
			method: "delete",
			route: args.shift(),
			pipeline: args.pop()
		});
	}
}