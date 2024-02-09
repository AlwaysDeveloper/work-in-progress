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
	get = (route, handler) => new GetRoute(route, handler);

	/**
     * 
     * @param { string } route 
     * @param { Function } handler 
     * @returns 
     */
	post = (route, handler) => new PostRoute(route, handler);


	/**
     * 
     * @param { string } route 
     * @param { Function } handler 
     * @returns 
     */
	put = (route, handler) => new PutRoute(route, handler);

	/**
     * 
     * @param { string } route 
     * @param { Function } handler 
     * @returns 
     */
	delete = (route, handler) => new DeleteRoute(route, handler);

	response (result, message, onError) {
		return {
			type: ResponseType.RESPONSE,
			result,
			onSuccess: message,
			onError
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