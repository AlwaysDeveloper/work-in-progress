import { readdirSync, statSync, readFileSync } from "fs";
import path from "path";

function checkFileToLoad(filename, load) {
	let toLoad = false;
	load.forEach(item => {
		if (filename.indexOf(item) !== -1) {
			toLoad = true;
		}
	});
	return toLoad;
}

function checkDirectoryToLoad(dirName, includes) {
	let toLoad = false;
	if (Array.isArray(includes)) {
		includes.forEach(item => {
			if (dirName.indexOf(item) !== -1) {
				toLoad = true;
			}
		});
	}
	return toLoad;
}

function scanApp({ includes, load }) {
	const rootDirectories = [];
	const apiFiles = [];
	readdirSync(path.resolve())
		.forEach((item) => {
			item = path.join(path.resolve(), item);
			const stats = statSync(item);
			if (!stats.isDirectory() && checkFileToLoad(item, load)) {
				apiFiles.push(item);
			} else if (stats.isDirectory() && checkDirectoryToLoad(item, includes)) {
				rootDirectories.push(item);
			}
		});
	return { rootDirectories, apiFiles };
}

function getAllApiFiles(source, { includes, load }, files) {
	const stats = statSync(source);
	if (!stats.isDirectory() && checkFileToLoad(source, load)) {
		files.push(source);
	} else if (stats.isDirectory() && checkDirectoryToLoad(source, includes)) {
		readdirSync(source)
			.map(item => `${source}/${item}`)
			.forEach(item => getAllApiFiles(item, { includes, load }, files));
	}
}

export function importer(options) {
	if(!options.includes || !Array.isArray(options.includes)) {
		throw "Includes are required and array.";
	}

	if(!options.load || !Array.isArray(options.load)){ 
		throw "Load are required and array.";
	}

	const { apiFiles, rootDirectories } = scanApp(options);

	rootDirectories.forEach(source => getAllApiFiles(source, options, apiFiles));

	return apiFiles.map((file) => {
		if (readFileSync(file).length === 0) {
			console.log("\x1b[33m%s\x1b[0m", `[Warning]: ${file} is empty. Please check!`);
		} else {
			console.log(`[Loading]: ${file}`);
		}

		// eslint-disable-next-line no-undef
		const afterRequire = require(file);
		return afterRequire.hasOwnProperty("default") ? afterRequire.default : afterRequire;
	});
}