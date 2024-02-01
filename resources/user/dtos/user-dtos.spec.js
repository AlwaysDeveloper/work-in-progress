/* eslint-disable no-undef */
import { CreateUserDummyDTO } from "@test/data/DTO";
import { expect } from "@test/tools/assertions";
import { UserRoles } from "@constants/enums";
import ValidationError from "@errors/validationerror";
import CreateUserDto from "./create-user.dto";
import Request from "@test/tools/request";
import UserLoginCredentialsDto from "./user-login.dto";
import ValidateForOtherServicesDto from "./validate-for-other-service.dto";

describe("Describe the dtos for user apis.", () => {
	describe("Unit test for CreateUserDto.", () => {
		let userDummyDTO;
		let request;
		beforeEach(async () => {
			userDummyDTO = CreateUserDummyDTO();
			request = new Request();
		});
    
		it("should give error if full name is missing.", async () => {
			try {
				new CreateUserDto(request);
			} catch (error) {
				expect(error).to.instanceOf(ValidationError);
				expect(error).to.have.property("details");
				expect(error).to.have.property("statusCode");
				expect(Object.values(error.details)).to.includes("Full name is required!");
			}
		});
    
		it("should give error if email is missing.", async () => {
			try {
				new CreateUserDto(request);
			} catch (error) {
				expect(error).to.instanceOf(ValidationError);
				expect(error).to.have.property("details");
				expect(error).to.have.property("statusCode");
				expect(Object.values(error.details)).to.includes("Email is required!");
			}
		});
        
		it("should give error if country code is missing.", async () => {
			try {
				new CreateUserDto(request);
			} catch (error) {
				expect(error).to.instanceOf(ValidationError);
				expect(error).to.have.property("details");
				expect(error).to.have.property("statusCode");
				expect(Object.values(error.details)).to.includes("Country code is required!");
			}
		});
    
		it("should give error if msnid is missing.", async () => {
			try {
				new CreateUserDto(request);
			} catch (error) {
				expect(error).to.instanceOf(ValidationError);
				expect(error).to.have.property("details");
				expect(error).to.have.property("statusCode");
				expect(Object.values(error.details)).to.includes("Mobile number is required!");
			}
		});
    
		it("should give error if username is missing.", async () => {
			try {
				new CreateUserDto(request);
			} catch (error) {
				expect(error).to.instanceOf(ValidationError);
				expect(error).to.have.property("details");
				expect(error).to.have.property("statusCode");
				expect(Object.values(error.details)).to.includes("Username is required!");
			}
		});
    
		it("should give error if email is not valid.", async () => {
			try {
				new CreateUserDto(request.setBody({ ...userDummyDTO, email: "email" }));
			} catch (error) {
				expect(error).to.instanceOf(ValidationError);
				expect(error).to.have.property("details");
				expect(error).to.have.property("statusCode");
				expect(Object.values(error.details)).to.includes("Email is not valid!");
			}
		});
    
		it("shouls return dto if all validations passed.", async () => {
			const result = new CreateUserDto(request.setBody(userDummyDTO));
			expect(result).to.instanceOf(CreateUserDto);   
		});
	});

	describe("Unit test for UserLoginCredentialsDto.", () => {
		let userDummyDTO;
		let request;
		beforeEach(async () => {
			userDummyDTO = CreateUserDummyDTO();
			request = new Request();
		});
    
		it("shoudl give error if username is missing.", async () => {
			try {
				new UserLoginCredentialsDto(request);
			} catch (error) {
				expect(error).to.instanceOf(ValidationError);
				expect(error).to.have.property("details");
				expect(error).to.have.property("statusCode");
				expect(Object.values(error.details)).to.includes("Username is required!");
			}
		});
    
		it("should give error if password is missing.", async () => {
			try {
				new UserLoginCredentialsDto(request);
			} catch (error) {
				expect(error).to.instanceOf(ValidationError);
				expect(error).to.have.property("details");
				expect(error).to.have.property("statusCode");
				expect(Object.values(error.details)).to.includes("Password is required!");
			}
		});
    
		it("should returns dto if all validations passed.", async () => {
			const result = new UserLoginCredentialsDto(request.setBody({ username: userDummyDTO.username, password: "test" }));
			expect(result).to.be.instanceOf(UserLoginCredentialsDto);
			expect(result).to.be.eql({ username: userDummyDTO.username, password: "test" });
		});
	});

	describe("Unit test for ValidateForOtherServicesDto.", () => {
		let request;
		beforeEach(async () => {
			request = new Request();
		});
    
		it("shoudl give error if token is missing.", async () => {
			try {
				new ValidateForOtherServicesDto(request);
			} catch (error) {
				expect(error).to.instanceOf(ValidationError);
				expect(error).to.have.property("details");
				expect(error).to.have.property("statusCode");
				expect(Object.values(error.details)).to.includes("Token is required!");
			}
		});
    
		it("should give error if userrole is missing.", async () => {
			try {
				new ValidateForOtherServicesDto(request);
			} catch (error) {
				expect(error).to.instanceOf(ValidationError);
				expect(error).to.have.property("details");
				expect(error).to.have.property("statusCode");
				expect(Object.values(error.details)).to.includes("User role is required!");
			}
		});
    
		it("should give error if userrole is not valid.", async () => {
			try {
				new ValidateForOtherServicesDto(request.setBody({userRole: "Test"}));
			} catch (error) {
				expect(error).to.instanceOf(ValidationError);
				expect(error).to.have.property("details");
				expect(error).to.have.property("statusCode");
				expect(Object.values(error.details)).to.includes("User role is not valid!");
			}
		});
    
		it("should returns dto if all validations passed.", async () => {
			const result = new ValidateForOtherServicesDto(request.setBody({token: "token", userRole: UserRoles.user}));
			expect(result).to.be.instanceOf(ValidateForOtherServicesDto);
			expect(result).to.be.eql({token: "token", userRole: UserRoles.user});
		});
	});
});