import AuthenticateToken from "middleware/authenticate";
import execute from "./executor";
import { importer } from "./import";
import Handler from "./Handler";
import ErrorHandler from "../middlewares/errorhandler";

let application;

const defaultAuth = (req, res, next) => next();

class Route {
	_path;
	_method;
	_endpoint;
	#route = [];

	constructor(endpoint){
		this._endpoint = endpoint;
	}

	_checkPath() {
		if (!this._path || this._path === null) {
			throw new Error("path is required. example: /test");
		} else if (typeof this._path !== "string") {
			throw new Error("path must be string like \"/test\"");
		}
	}

	secure(security = AuthenticateToken) {
		this.#route[0] = security;
		return this;
	}

	auth(authenticator = defaultAuth) {
		this.#route[1] = authenticator;
		return this;
	}

	/**
     * 
     * @param { Function | Function[] } middleware 
     * @returns 
     */
	addMiddleware(middleware) {
		if(!Array.isArray(middleware) && typeof middleware === "function"){
			middleware = [middleware];
		}
		this.#route = [...this.#route, ...middleware];
		this.#route.push(middleware);
		return this;
	}

	/**
     * 
     * @param { Function } handler 
     * @param { string } onSuccess 
     * @param { string } onError 
     */
	bind(onSuccess = "Successfull", onError = "Something went wrong!") {
		this.#route.push(
			execute(
				Handler(
					this._endpoint,
					onSuccess,
					onError
				)
			)
		);
		this._checkPath();
		switch (this._method) {
		case "get":
			application.get(this._path, ...this.#route);
			break;
		case "post":
			application.post(this._path, ...this.#route);
			break;
		case "put":
			application.put(this._path, ...this.#route);
			break;
		case "delete":
			application.delete(this._path, ...this.#route);
			break;
		}
	}
}

export class GetRoute extends Route {
	constructor(path, endpoint) {
		super(endpoint);
		this._path = path;
		this._method = "get";
	}
}

export class PostRoute extends Route {
	constructor(path, endpoint) {
		super(endpoint);
		this._path = path;
		this._method = "post";
	}
}

export class PutRoute extends Route {
	constructor(path, endpoint) {
		super(endpoint);
		this._path = path;
		this._method = "put";
	}
}

export class DeleteRoute extends Route {
	constructor(path, endpoint) {
		super(endpoint);
		this._path = path;
		this._method = "get";
	}
}

/**
 * @typedef {Object} ImportOption
 * @property {string[]} includes
 * @property {string[]} load
 */
function loadControllers (importOption) {
	const controllers = importer(importOption);
	controllers.forEach(controller => {
		controller = new controller();
		if(controller.register) {
			controller?.register().forEach(route => {
				try {
					route.bind();
					console.log("\x1b[32m%s\x1b[0m,", `[Endpoint]: (${route._method.toUpperCase()}) ${route._path}`);
				} catch (error) {
					console.log("\x1b[31m%s\x1b[0m,", `[Endpoint]: (${route._method.toUpperCase()}) ${route._path}`);
					console.error(error);
				}
			});
		}else {
			Object
				.values(controller)
				.filter(value => value instanceof Route)
				.forEach(route => {
					try {
						route.bind();
						console.log("\x1b[32m%s\x1b[0m,", `[Endpoint]: (${route._method.toUpperCase()}) ${route._path}`);
					} catch (error) {
						console.log("\x1b[31m%s\x1b[0m,", `[Endpoint 🔴]: (${route._method.toUpperCase()}) ${route._path}`);
						console.error(error);
					}
				});
		}
	});
}

/**
 * 
 * @param {import('express').Application} app 
 * @param {ImportOption} importOption 
 * @returns {*} app
 */
export default function Router(app, importOption) {
	application = app;
	loadControllers(importOption);
	app.use(ErrorHandler);
	return app;
}