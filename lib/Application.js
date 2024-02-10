import HttpServer from "http";
import cors from "cors";
import Express from "express";
import { json, urlencoded } from "body-parser";
import Router from "./router";

export class App {
	#load = ["api.js", "controller.js"];
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
				load: this.#load
			}
		);
		return this;
	}

	listen() {
		HttpServer
			.createServer(this.#app)
			.listen(this.port, () => console.log(`server listing at: http://localhost:${this.port}`));
	}
}