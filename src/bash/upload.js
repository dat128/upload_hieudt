import fs from 'fs';
import { loggerError, loggerInfo } from '../middleware/logBash';
import awsService from '../service/aws.service';
import imageService from '../service/image.service';

const dir = './image/';

async function uploadItem(fileName) {
	try {
		const file = fs.readFileSync(`./image/${fileName}`);
		// eslint-disable-next-line no-await-in-loop
		const image = await awsService.upload(file, fileName, 'image/png');
		await imageService.create({ name: fileName, url: image });
		loggerInfo.info(`upload image success: ${fileName}`);
		console.log(`upload image success: ${fileName}`);
	} catch (error) {
		console.log(`upload image error ${error}: ${fileName}`);
		loggerError.error(`upload image error ${error}: ${fileName}`);
	}
}

async function upload() {
	try {
		const files = fs.readdirSync(dir);
		// eslint-disable-next-line no-plusplus
		for (let i = 0; i < files.length; i++) {
			// eslint-disable-next-line no-await-in-loop
			await uploadItem(files[i]);
		}
	} catch (err) {
		console.log(err);
	}
}
upload(dir);
