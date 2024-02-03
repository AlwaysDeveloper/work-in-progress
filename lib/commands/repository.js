/* eslint-disable no-undef */
import FileSystem from "fs";
import path from "path";
import { exec } from "child_process";

export default function repository() {
	const repositoryBody = [
		"import Repository from \"models\";",
		"",
		"export default class ${ModelName}Repository extends Repository{",
		"  constructor() {",
		"    super(\"${Model}\");",
		"  }",
		"}"
	];

	const repositoryPath = path.join(path.resolve(), "repositories");
	if (!FileSystem.existsSync(repositoryPath)) {
		FileSystem.mkdirSync(repositoryPath);
	}
	const [modelName, attributes] = process.argv.slice(2);

	const repositoryName = `${modelName.charAt(0).toUpperCase()}${modelName.slice(1)}`;

	const replacements = {
		"${ModelName}": repositoryName,
		"${Model}": modelName
	};

	const formattedBody = repositoryBody
		.map((item) => {
			const pattern = /\${(.*?)}/.exec(item);
			if (pattern === null) {
				return item;
			}
			return item.replace(pattern[0], replacements[pattern[0]]);
		})
		.join("\n");

	const sequelizeCommand = `npx sequelize model:generate --name ${modelName} --attributes ${attributes}`;

	exec(sequelizeCommand, (error, stdout, stderr) => {
		if(error && error !== null) {
			console.error(error);
			process.exit(0);
		}else if(stderr) {
			console.error(stderr);
			process.exit(0);
		}
		console.info(stdout);
		const repositoryFile = path.join(repositoryPath, `${repositoryName}.js`);
		FileSystem.writeFileSync(repositoryFile, formattedBody);
		console.log(`New Respository was created at \x1b[34m${repositoryFile} .`);
		process.exit(1);
	});
}

repository();