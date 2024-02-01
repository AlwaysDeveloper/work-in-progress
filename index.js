import("@config")
	.then(async () => {
		const http = await import("http");
		const app = await import("./app");

		const server = http.createServer(app);
		server.listen(APP_CONFIG.port, () => console.log(`app is listening on: http://localhost:${APP_CONFIG.port}`));
	})
	.catch();
