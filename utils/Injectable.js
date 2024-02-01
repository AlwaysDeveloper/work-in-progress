export default class Injectable {
	constructor(...args) {
		args.forEach(injected => {
			const injectionName = `${injected.constructor.name.charAt(0).toLowerCase()}${injected.constructor.name.slice(1)}`;
			this[injectionName] = injected;
		});
	}
}