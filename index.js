import { App } from "./lib/Application";


async function bootstrap () {
	await import("config");
	// new Application({ load: ["api.js", "controller.js"] }).listen(APP_CONFIG.port);
	new App(APP_CONFIG.port)
		.load(["controller.js"])
		.build()
		.listen();
}

bootstrap();
