import bcrypt from "bcrypt";

export default class PasswordManager {
	/**
     * 
     * @param {string} password 
     * @returns {Promise<string>}
     */
	async hash(password) {
		return bcrypt.hash(password, APP_CONFIG.passwordManager.salt);
	}

	/**
     * 
     * @param {string} hash 
     * @param {string} password 
     * @returns {Promise<boolean>}
     */
	async verify(hash, password) {
		return bcrypt.compare(password, hash);
	}
}