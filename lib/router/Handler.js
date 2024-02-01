/**
 * 
 * @param {function} handler 
 * @param {string} onSuccess 
 * @param {string} onError 
 */
export default function Handler(handler, onSuccess, onError) {
	return async (req, res) => {
		try {
			const result = await handler(req, res);
			return {
				Ok: {
					type: result.type || "response",
					message: result.onSuccess || onSuccess,
					entity: result.result || result
				}
			};
		} catch (error) {
			error.errorMessage = onError;
			return {
				Error: error
			};
		}
	};
}