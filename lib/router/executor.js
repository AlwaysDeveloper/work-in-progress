import { ResponseType } from "../constants/routes.contants";

const onResponse = (req, res, result) => {
	res.status(200);
	res.json(result);
};

const onRedirect = (req, res, result) => {
	res.redirect(result.code, result.url);
};

const actions = {
	[ResponseType.RESPONSE]: onResponse,
	[ResponseType.REDIRECT]: onRedirect
};

const executor = (handler) => {
	if (typeof handler !== "function") {
		throw new Error("not a function");
	}
	return async (req, res, next) => {
		const result = await handler(req, res);
		if (result.Error) {
			next(result.Error); 
			return;
		}
		const { Ok } = result;
		actions[Ok.type](req, res, Ok);
	};
};

export default executor;