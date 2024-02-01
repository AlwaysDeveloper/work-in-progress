import AWS from "./main";

export default class S3 {
	s3 = new AWS.S3();
	config = APP_CONFIG.aws.s3;

	_getParams(objectKey) {
		return {
			Bucket: this.config.bucket,
			Key: objectKey,
			Expires: this.config.expiration
		};
	}

	getPresignedUrl(objectKey) {
		return new Promise((resolve, reject) => {
			this.s3.getSignedUrl(
				"putObject",
				this._getParams(objectKey),
				(error, url) => {
					if (error) reject(error);
					resolve(url);
				}
			);
		});
	}

	getFileUrl(objectKey) {
		return new Promise((resolve, reject) => {
			this.s3.getSignedUrl(
				"getObject",
				this._getParams(objectKey),
				(error, url) => {
					if (error) reject(error);
					resolve(url);
				}
			);
		});
	}
}