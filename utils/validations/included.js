export default function included(array) {
	return (value) => {
		if(!Array.isArray(array)) {
			throw new Error(`Array is required but got ${typeof array}`);
		}
		return array.includes(value);
	};
}