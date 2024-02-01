import ShortenUrlRepository from "@repositories/ShortenUrlRepository";
import Controller from "@utils/controller";
import CreateShortUrlDto from "./dtos/createShortUrlDto";
import RedirectService from "./redirect.service";

export default class RedirectController extends Controller{
	constructor() {
		super();
		this.service = new RedirectService(
			new ShortenUrlRepository()
		);
	}

	create = this.post("/v1/register", async(req) => {
		const result = await this.service.create(new CreateShortUrlDto(req));
		return result;
	});

	onVisit = this.get("/:alias",async (req) => {
		const alias = req.params.alias;
		const result = await this.service.getUrl(alias);
		return this.redirect(result.url, 301);
	});
}
