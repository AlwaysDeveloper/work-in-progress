import ApiError from "@errors/apierror";
import validate from "@validation/validate";
export default class Dto {
	#source;
	#rules;
	constructor(source, rules) {
		this.#source = source;
		this.#rules = rules;
	}

	#map(origin, destination) {
		Object
			.keys(destination)
			.forEach((key) => {
				destination[key] = origin[key];
			});

		if(this.#rules) {
			validate(this.#rules, destination);
		}
	}

	fromBody(toMap) {
		if(!this.#source.body) {
			throw new ApiError(500, "no valid source!");
		}
		const source = this.#source.body;
		this.#map(source, toMap);
	}

	fromQuery(toMap) {
		if(!this.#source.query) {
			throw new ApiError(500, "no valid source!");
		}
		const source = this.#source.query;
		this.#map(source, toMap);
	}

	fromParams(value) {
		if(!this.#source.params) {
			throw new ApiError(500, "no valid source!");
		}
		const source = this.#source.params;
		return source[value];
	}

	fromHeaders(toMap) {
		if(!this.#source.headers) {
			throw new ApiError(500, "no valid source!");
		}
		const source = this.#source.headers;
		this.#map(source, toMap);
	}
}

function map (origin, destination) {
	Object
		.keys(destination)
		.forEach((key) => {
			destination[key] = origin[key];
		});
}

export class BodyDto {
	#source;
	constructor(source) {
		if(!source.body) {
			throw new ApiError(500, "no valid source: body required!");
		}
		this.#source = source.body;
	}

	validate(rules) {
		validate(rules, this.#source);
		return this;
	}

	get(target) {
		map(this.#source, target);
	}
}

export class QueryDto {
	#source;
	constructor(source) {
		if(!source.body) {
			throw new ApiError(500, "no valid source: queries required!");
		}
		this.#source = source.query;
	}

	validate(rules) {
		validate(rules, this.#source);
		return this;
	}

	get(target) {
		map(this.#source, target);
	}
}

export class HeadersDto {
	#source;
	constructor(source) {
		if(!source.body) {
			throw new ApiError(500, "no valid source: headers required!");
		}
		this.#source = source.headers;
	}

	validate(rules) {
		validate(rules, this.#source);
		return this;
	}

	get(target) {
		map(this.#source, target);
	}
}