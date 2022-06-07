import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// import rootRouter from './route/index';
// import handleError from './middleware/handleError';
// import handleRequest from './middleware/handleRequest';
// import handleRateLimit from './middleware/handleRateLimit';
import database from './model';
// import message from './utils/message';
// import { HTTP_STATUS_CODE } from './config/constant';

dotenv.config();
const port = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// app.use(handleRateLimit);
// app.use(handleRequest);
database.sequelize.sync();
// rootRouter(app);
// app.use((req, res, next) => {
// 	const error = {
// 		status: HTTP_STATUS_CODE.NOT_FOUND,
// 		detail: {
// 			code: HTTP_STATUS_CODE.NOT_FOUND,
// 			message: message[404],
// 		},
// 	};
// 	next(error);
// });
// app.use(handleError);
app.listen(port, () => {
	console.log(port);
	console.log(`server listening port ${port}`);
});
