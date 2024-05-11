import { createHmac } from "crypto";
import generateRandomString from "./GenerateRandomString";

export default function createHashDigest(string) {
	return createHmac("sha256", generateRandomString(12)).update(string).digest("hex");
}