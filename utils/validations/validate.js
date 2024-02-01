import ValidationError from "@errors/validationerror";

function executeRules(rules, value) {
	for (let rule of rules) {
		const { validator, message } = rule;
		const result = validator(value);
		if (!result) {
			return {
				error: true,
				message
			};
		}
	}
	return true;
}

/**
 * 
 * @param {bject} rules 
 * @param {object} dto 
 */
export default function validate(rules, dto = {}) {
	const error = {};
	Object
		.keys(rules)
		.forEach((key) => {
			const value = dto[key];
			const rulesArray = rules[key];
			const result = executeRules(rulesArray, value);
			if (result.hasOwnProperty("error") && result.error) {
				error[key] = result.message;
			}
		});

	if (Object.keys(error).length > 0) {
		throw new ValidationError(error);
	}

	return dto;
}

