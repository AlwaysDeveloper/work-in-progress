import AWS from "aws-sdk";
import config from "@config";

AWS.config.update({
	accessKeyId: config.aws.access_key_id,
	secretAccessKey: config.aws.secret_access_key,
	region: config.aws.region
});

export default AWS;