export default function optional (validator, message) {
    return {
        validator: (value) => {
            return value ? validator(value) : true;
        },
        message
    }
}