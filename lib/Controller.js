import { DeleteRoute, GetRoute, PostRoute, PutRoute } from "./router";
import Injectable from "./Injectable";
import { ResponseType } from "./constants/routes.contants";

export default class Controller extends Injectable {
	constructor(...args) {
		super(...args);
	}
    
	/**
     * 
     * @param { string } route 
     * @param { Function } handler 
     * @returns 
     */
	get (route, handler) {
		return new GetRoute(route, handler);
	}

	/**
     * 
     * @param { string } route 
     * @param { Function } handler 
     * @returns 
     */
	post (route, handler) {
		return  new PostRoute(route, handler);
	}


	/**
     * 
     * @param { string } route 
     * @param { Function } handler 
     * @returns 
     */
	put (route, handler) {
		return new PutRoute(route, handler);
	}

	/**
     * 
     * @param { string } route 
     * @param { Function } handler 
     * @returns 
     */
	delete (route, handler) {
		return new DeleteRoute(route, handler);
	}

	response (callback, message, onError) {
		return async (req) => {
			try {
				return {
					type: ResponseType.RESPONSE,
					result: await callback(req),
					message,
				};
			} catch (error) {
				return {
					type: ResponseType.RESPONSE,
					error,
					message: onError,
				};
			}
		};
	}

	redirect (url, statusCode) {
		return {
			type: ResponseType.REDIRECT,
			code: statusCode,
			url
		};
	}
}