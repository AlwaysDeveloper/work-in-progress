/**
 * 
 * @param {import("sinon").SinonSandbox} sandbox 
 * @return {{setHeader, send, status}} 
 */
export default function response (sandbox, res) {
	return {
		setHeader: sandbox.spy(),
		send: sandbox.spy(),
		status: sandbox.spy(() => res),
		json: sandbox.spy((data) => data)     
	};
}