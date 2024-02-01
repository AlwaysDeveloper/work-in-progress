import DTO from "@utils/DTO";
export default class CreateShortUrlDto {
	url;
	alias;
	createdBy = 123;

	constructor(source) {
		DTO(source)(this);
	}
}