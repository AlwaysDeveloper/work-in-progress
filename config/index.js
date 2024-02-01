/* eslint-disable no-undef */
import file from "fs";
import path from "path";

const contents = file.readFileSync(path.join(path.resolve(), process.env.CONFIG), { encoding: "utf-8" });

function deepFreeze(obj) {
	Object.keys(obj).forEach((key) => {
		if (typeof obj[key] === "object" && obj[key] !== null) {
			deepFreeze(obj[key]);
		}
	});
	return Object.freeze(obj);
}

global.APP_CONFIG = deepFreeze(JSON.parse(contents));


