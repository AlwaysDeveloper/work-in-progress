/* eslint-disable no-undef */
import { CreateUserDummyDTO } from "@test/data/DTO";
import UserService from "./user.service";
import { expect } from "@test/tools/assertions";
import PasswordManager from "@common/PasswordManager";
import { UserRoles, UserStatus } from "@constants/enums";
import { JWTSign } from "@common/JWT";
import { MockRepository } from "@test/tools/test-repository";
import UserRepository from "@repositories/UserRepository";

describe("Describing the user service specs.", () => {
	let userDummyDTO;
	let token;
	let userService;
	const passwordManager = new PasswordManager();
	let userMockRepository;

	beforeEach(async () => {
		userDummyDTO = { 
			...CreateUserDummyDTO(),
			userRole: UserRoles.user,
			isActive: UserStatus.active,
		};

		userMockRepository = new MockRepository(UserRepository, {
			create: {
				...userDummyDTO,
				toJSON: () => userDummyDTO
			},
			find: {
				...userDummyDTO,
				password: await passwordManager.hash(userDummyDTO.password)
			},
			getUserCredentials: {
				...userDummyDTO
			}
		});

		token = JWTSign({ id: userDummyDTO.exId, userRole: userDummyDTO.userRole });
		userService = new UserService(new UserRepository(), passwordManager);
	});

	it("should create new user.", async () => {
		const result = await userService.create(userDummyDTO);
		expect(result).to.have.property("token");
		expect(result).to.have.property("exId");
	});

	it("should get the user via user credentials.", async () => {
		const result = await userService.login({ username: userDummyDTO.username, password: userDummyDTO.password });
		expect(result).to.be.have.property("token");
		expect(result.isLoggedIn).to.be.equal(true);
	});

	it("should get logged in using token.", async () => {
		const result = await userService.loginWithToken({token, userRole: userDummyDTO.userRole});
		expect(result).to.be.have.property("exId");
	});

	afterEach(() => {
		userMockRepository?.restore();
	});
});