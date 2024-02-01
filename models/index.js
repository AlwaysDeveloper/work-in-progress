import Model from "./db";
export default class Repository {
	#model;

	constructor(model) {
		if(!model) { 
			throw new Error("Model is required!"); 
		}
		this.#model = Model[model];
	}

	/**
     * 
     * @param { FindOptions } criteria 
     * @returns { Promise<Model|null> } 
     */
	find(criteria) {
		return this.#model.findOne(criteria);
	}

	/**
     * 
     * @param { Object|Object[] } records 
     * @param { BulkCreateOptions } options 
     * @returns { Promise<Model|Model[]> }
     */
	create(records, options = null) {
		if(Array.isArray(records) && options === null) {
			throw new Error("Bulk create options are required for an array of records.");
		}
		else if(options === null) {
			return this.#model.create(records);
		}
		return this.#model.bulkCreate(records, options);
	}

	/**
     * 
     * @param { Object } data 
     * @param { UpdateOptions } options 
     * @returns { Promise<Model|null> }
     */
	update(data, options) {
		return this.#model.update(data, options);
	}

	/**
     * 
     * @param { DestroyOptions & { isForever?: boolean } } options 
     * @returns { Promise<Model|null> }
     */
	delete(options) {
		if(options.isForever) { 
			return this.#model.destroy(options);
		}
		return this.#model.update({ status: false }, options);
	}

	/**
     * 
     * @param { string } sql 
     * @param { QueryTypes } type 
     * @param { Object } replacements 
     * @returns { Promise<Array<Object>> } 
     */
	query(sql, type, replacements) {
		return this.#model.sequelize.query(
			sql, {
				type,
				replacements
			}
		);
	}
}
