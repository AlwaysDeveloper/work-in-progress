import HttpServer from "http";
import cors from "cors";
import Express from "express";
import { json, urlencoded } from "body-parser";
import Router from "./router";
import ErrorHandler from "./middlewares/errorhandler";

export class App {
	#load = ["api.js", "controller.js"];
	#includes = [];
	#app;
	#middlewares = [
		cors(),
		json(),
		urlencoded({ limit: "225mb", extended: true }),
	];

	constructor(port) {
		if(!port) {
			throw new Error("Port is required");
		}
		this.port = port;
	}

	/**
	 * 
	 * @param {Function} middleware 
	 */
	addMiddleWare(middleware) {
		this.#middlewares.push(middleware);
		return this;
	}

	/**
	 * 
	 * @param {string[]} directories 
	 */
	from(directories) {
		if(directories) {
			this.#includes = directories;
		}
		return this;
	}

	/**
	 * 
	 * @param {string[]} expression 
	 */
	load(extensions) {
		if(extensions){
			this.#load = extensions;
		}
		return this;
	}

	build() {
		this.#app = Router(
			this.#middlewares.reduce((app, middleware) => app.use(middleware), Express()),
			{
				load: this.#load,
				includes: this.#includes
			}
		).use(ErrorHandler);
		return this;
	}

	listen() {
		HttpServer
			.createServer(this.#app)
			.listen(this.port, () => {
				console.log(`server listing at: http://localhost:${this.port}`);
			});
	}
}