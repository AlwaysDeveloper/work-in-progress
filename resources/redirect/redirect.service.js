export default class RedirectService {
	/**
     * 
     * @param { ShortenUrlRepository } repository 
     */
	constructor(repository) {
		this.repository = repository;
	}

	async create(shortenUrlDto) {
		const result = await this.repository.create({
			redirectTo: shortenUrlDto.url,
			alias: shortenUrlDto.alias,
			createdBy: shortenUrlDto.createdBy
		});

		return `http://localhost:3000/${result.alias}`;
	}

	getUrl(alias) {
		return this.repository.find({where: {alias}});
	}
}