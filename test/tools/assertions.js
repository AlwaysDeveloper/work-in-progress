import sinon from "sinon";
import chai from "chai";
import sinonChai from "sinon-chai";

chai.use(sinonChai);

export const expect = chai.expect;
export const sandbox = sinon.createSandbox;
export const sub = sinon.createStubInstance;