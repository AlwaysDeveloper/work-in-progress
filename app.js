import Router from "@router";
import Express from "express";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import ErrorHandler from "@middleware/errorhandler";

const middlewares = [
	cors(),
	json(),
	urlencoded({ limit: "225mb", extended: true }),
];

const app = Router(
	middlewares.reduce((app, middleware) => app.use(middleware), Express()),
	{
		include: ["resources"],
		load: ["api.js", "controller.js"],
	},
);

app.use(ErrorHandler);

export default app;
