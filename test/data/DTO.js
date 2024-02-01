import {faker} from "@faker-js/faker";
import { v4 } from "uuid";

export const CreateUserDummyDTO = () => {
	return {
		exId: v4(),
		email: faker.internet.email(),
		fullName: faker.person.fullName(),
		msnid: faker.phone.number(),
		username: faker.internet.userName(),
		countryCode: faker.location.countryCode(),
		password: faker.internet.password()
	};
};

export const SaveCardDummyDTO = () => {
	return {
		channelId: faker.string.uuid(),
		cardId: faker.string.uuid(),
		userId: faker.string.uuid(),
	};
};