import Repository from "../models";

export default class UserRespository extends Repository {
    constructor() {
        super("user");
    }
}