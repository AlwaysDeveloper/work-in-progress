/**
 * 
 * @param {function} validator 
 * @param {string} message 
 * @returns 
 */
export default function rule(validator, message) {
	return {
		validator,
		message
	};
}