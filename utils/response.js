/**
 * 
 * @param { Object | String | Boolean | Array | Number } result 
 * @param { String } message 
 * @param { String } onError 
 * @returns 
 */
export default function response (result, message, onError) {
	return {
		result,
		onSuccess: message,
		onError
	};
}