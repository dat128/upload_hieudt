import fs from 'fs';
import sharp from 'sharp';
import { loggerError, loggerInfo } from '../middleware/logBash';
import awsService from '../service/aws.service';
import imageService from '../service/image.service';

const dir = './image/';

async function uploadItem(fileName, resize) {
	try {
		// const file = fs.readFileSync(`./image/${fileName}`);
		// eslint-disable-next-line no-await-in-loop
		const prefix = resize ? `resize/${resize}/` : '';
		const fileNameFormat = `${prefix}${fileName.substr(0, fileName.lastIndexOf('.'))}`;
		const fileResized = await sharp(`${dir}${fileName}`).resize(resize).png().toBuffer();
		const image = await awsService.upload(fileResized, fileNameFormat, 'image/png');
		await imageService.create({ name: fileNameFormat, url: image });
		loggerInfo.info(`upload image success: ${fileName}`);
		console.log(`upload image success: ${fileName}`);
	} catch (error) {
		console.log(`upload image error ${error}: ${fileName}`);
		loggerError.error(`upload image error ${error}: ${fileName}`);
	}
}

async function upload(folderUrl, resize) {
	try {
		const files = fs.readdirSync(folderUrl);
		// eslint-disable-next-line no-plusplus
		for (let index = 0; index < files.length; index++) {
			// eslint-disable-next-line no-await-in-loop
			await uploadItem(files[index], resize);
		}
	} catch (err) {
		console.log(err);
	}
}
// upload original
// upload(dir);
// upload resize with resize = 360
upload(dir, 360);
