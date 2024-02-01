export default class Request {
	body = {};
	headers = {};
	params = {};
	query = {};
	/**
     * 
     * @param {{[string]: [string | object | Array | number | boolean]}} params 
     * @returns 
     */
	setBody(body) {
		this.body = body;
		return this;
	}

	/**
     * 
     * @param {{[string]: [string]}} params 
     * @returns 
     */
	setHeader(headers) {
		this.headers = headers;
		return this;
	}

	/**
     * 
     * @param {{[string]: [string]}} params 
     * @returns 
     */
	setParams(params) {
		this.params = params;
		return this;
	}

	/**
     * 
     * @param {{[string]: [string]}} params 
     * @returns 
     */
	setQuery(query) {
		this.query = query;
		return this;
	}

	setUser(user) {
		this.user = user;
		return this;
	}
}