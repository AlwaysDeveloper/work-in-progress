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
			if(result.error) {
				return {
					Error: result
				};
			}
			return {
				Ok: {
					type: result.type || "response",
					message: result.message || onSuccess,
					entity: result.result || result
				}
			};
		} catch (error) {
			error.message = error.message || onError;
			return {
				Error: error
			};
		}
	};
}