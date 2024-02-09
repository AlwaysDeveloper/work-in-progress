import { CloudWatchLogger } from "../aws";

export async function loggerInitilizer() {
	new CloudWatchLogger();
}