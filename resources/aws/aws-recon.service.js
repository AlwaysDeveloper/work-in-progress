import { RekognitionClient, DetectModerationLabelsCommand, CreateProjectCommand  } from "@aws-sdk/client-rekognition";

export class AwsReconService {
	client;
	constructor() {
		this.client = new RekognitionClient({ 
			region: "ap-south-1", 
			credentials: {
				accessKeyId: "", 
				secretAccessKey: ""
			} 
		});
	}

	async createProject() {
		const result = await this.client.send(new CreateProjectCommand({ProjectName: "TEST_MODIRATION", AutoUpdate: "ENABLED", Feature: "CONTENT_MODERATION"}));
		console.log(result);
		return result;
	}

	async check() {
		// await this.createProject();
		const command = new DetectModerationLabelsCommand({
			Image: {
				S3Object: {
					Bucket: "whatsapp-clone-local",
					Name: "test.jpg",
				}
			},
			MinConfidence: 95,
			HumanLoopConfig: {
				// HumanLoopName: "a3-b5c-d7e",
				// FlowDefinitionArn: "a3-b5c-d7e",
				ContentClassifiers: [ // ContentClassifiers
					"FreeOfPersonallyIdentifiableInformation" || "FreeOfAdultContent",
				]
			},
			// ProjectVersion: "arn:aws:rekognition:ap-south-1:874811557808:project/TEST_MODIRATION/1714484815446",
		});
		const result = await this.client.send(command);
		return result;
	}
}