import { readdirSync, statSync, readFileSync } from "fs";
import path from "path";

export default class AutoImport {
	includes;
	load;
	apiFiles = [];
	controllers = [];
	constructor(options) {
		const { include, load } = options;
		if (include && Array.isArray(include)) {
			this.includes = include;
		}
		this.load = load;
		this.#scanApp().forEach((source) => this.#getAllApiFiles(source));
		this.apiFiles.forEach((toRequire) => {
			if (readFileSync(toRequire).length === 0) {
				console.log("\x1b[33m%s\x1b[0m", `[Warning]: ${toRequire} is empty. Please check!`);
			} else {
				console.log(`[Loading]: ${toRequire}`);
			}
			// eslint-disable-next-line no-undef
			const controller = require(toRequire);
			if(controller.hasOwnProperty("default")){
				const main = controller.default;
				this.controllers.push(main);
			}
		});
	}

	#checkFileToLoad(filename) {
		let toLoad = false;
		this.load.forEach(item => {
			if (filename.indexOf(item) !== -1) {
				toLoad = true;
			}
		});
		return toLoad;
	}

	#checkDirectoryToLoad(dirName) {
		let toLoad = false;
		if (Array.isArray(this.includes)) {
			this.includes.forEach(item => {
				if (dirName.indexOf(item) !== -1) {
					toLoad = true;
				}
			});
		}
		return toLoad;
	}

	#scanApp() {
		const rootDirectories = [];
		readdirSync(path.resolve())
			.forEach((item) => {
				item = path.join(path.resolve(), item);
				const stats = statSync(item);
				if (!stats.isDirectory() && this.#checkFileToLoad(item)) {
					this.apiFiles.push(item);
				} else if (stats.isDirectory() && this.#checkDirectoryToLoad(item)) {
					rootDirectories.push(item);
				}
			});
		return rootDirectories;
	}

	#getAllApiFiles(source) {
		const stats = statSync(source);
		if (!stats.isDirectory() && this.#checkFileToLoad(source)) {
			this.apiFiles.push(source);
		} else if (stats.isDirectory() && this.#checkDirectoryToLoad(source)) {
			readdirSync(source)
				.map(item => `${source}/${item}`)
				.forEach(item => this.#getAllApiFiles(item));
		}
	}
}