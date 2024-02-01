let app;

class MockRoute {
	#endpoint;
	constructor(method, route) {
		this.#set(method, route);
	}

	#set(method, route) {
		const _app = app.router;
		if (!_app[method]) {
			throw new Error("Mock app is not initialized yet.");
		} else if (!_app[method][route]) {
			throw new Error(`${method}(${route}) not found!`);
		}
		this.#endpoint = _app[method][route];
	}

	/**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {Function} next 
     * @returns {Promise<Object>}
     */
	execute(req, res) { 
		return new Promise((resolve, reject) => {
			try {
				res.json = (data) => resolve(data);
				this.#endpoint(req, res, (error) => reject(error))
					.catch(error => { throw error; });
			} catch (error) {
				reject(error);
			}
		});
	}
}

export class TestGetRoute extends MockRoute {
	/**
     * 
     * @param {string} route 
     */
	constructor(route) {
		super("get", route);
	}
}

export class TestPostRoute extends MockRoute {
	/**
     * 
     * @param {string} route 
     */
	constructor(route) {
		super("post", route);
	}
}

export class TestPutRoute extends MockRoute {
	/**
     * 
     * @param {string} route 
     */
	constructor(route) {
		super("put", route);
	}
}

export class TestDeleteRoute extends MockRoute {
	/**
     * 
     * @param {string} route 
     */
	constructor(route) {
		super("delete", route);
	}
}
/**
 * 
 * @param {import MockApp from "./mockapp";} app 
 */
export default function TestRouter(mockApp) {
	app = mockApp;
}