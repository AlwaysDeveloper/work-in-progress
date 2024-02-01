import S3 from "./s3";
import AWS from "./main";

export default {
	S3,
	CloudWatchLogger: AWS.CloudWatchLogs()
};