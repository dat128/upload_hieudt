import aws from 'aws-sdk';
// const aws = require('aws-sdk');
import dotenv from 'dotenv';

dotenv.config();

const s3 = new aws.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
});

const { AWS_BUCKET } = process.env;

const upload = async (file, fileName, type) => {
	const params = {
		Bucket: `${AWS_BUCKET}`,
		Key: fileName,
		Body: file,
		ACL: 'public-read',
		ContentType: type,
	};
	const res = await s3.upload(params).promise();
	return res.Location;
};

// eslint-disable-next-line import/prefer-default-export
export default { upload };
