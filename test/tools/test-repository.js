import { Op } from "sequelize";
import sinon from "sinon";
import Repository from "../../models";

export class TestRepository {
	#name;
	#baseRepository;
	#toClean = [];
	#definations = false;
	constructor(repository) {
		this.#baseRepository = repository;
		if(!(repository instanceof Repository)) {
			this.#definations = true;
		}
		this.#map();
	}

	#map() {
		Object.keys(this.#baseRepository)
			.forEach(key => {
				this[key] = this.#definations ? () => Promise.resolve(this.#baseRepository[key]) : this.#baseRepository[key];
			});
	}

	async create(records, options = null) {
		if(this.#definations) {
			return Promise.resolve(this.#baseRepository.create);
		}
		const result = await this.#baseRepository.create(records, options);
		if(Array.isArray(result)) {
			result.forEach(item => this.#toClean.push(item.id));
		}else {
			this.#toClean.push(result.id);
		}
		return result;
	}
    
	async clean () {
		console.log(`Cleaning insert ids: ${this.#toClean.join(",")} of ${this.#name}`);
		await this.#baseRepository.delete({where: { id: { [Op.in]: this.#toClean } }, isForever: true});
	}
}

export class MockRepository {
	stubs;
	constructor (repository, implementations) {
		const prototype = repository.prototype;
		if(typeof prototype === "undefined"){
			throw new Error("Not a repository to mock.");
		}
		this.stubs = Object
			.keys(implementations)
			.map(key => {
				const stub = sinon.stub(prototype, key);
				stub.resolves(implementations[key]);
				return stub;
			});
	}

	restore() {
		this.stubs.forEach(stub => stub.restore());
	}
}
