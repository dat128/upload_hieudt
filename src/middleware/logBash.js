import winston from 'winston';

const TIME_FORMAT = {
	DATE_TIME: 'DD-MM-YYYY HH:mm:ss',
	DATE: 'DD-MM-YYYY',
	DATE_MYSQL: 'YYYY-MM-DD',
	DATE1: 'DD/MM/YYYY',
};
const options = {
	file_info: {
		level: 'info',
		filename: `logBashs/info.log`,
		handleExceptions: true,
		json: true,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
		colorize: true,
	},
	file_error: {
		level: 'error',
		filename: `logBashs/error.log`,
		handleExceptions: true,
		json: true,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
		colorize: true,
	},
	console: {
		level: 'debug',
		handleExceptions: true,
		json: false,
		colorize: true,
	},
};
const logInfoConfiguration = {
	transports: [new winston.transports.File(options.file_info)],
	format: winston.format.combine(
		winston.format.timestamp({
			format: TIME_FORMAT.DATE_TIME,
		}),
		winston.format.printf((info) => {
			const data = { time: info.timestamp, label: info.label, level: info.level, message: info.message };
			return JSON.stringify(data);
		})
	),
};

const logErrorConfiguration = {
	transports: [new winston.transports.File(options.file_error)],
	format: winston.format.combine(
		winston.format.timestamp({
			format: TIME_FORMAT.DATE_TIME,
		}),
		winston.format.printf((info) => {
			const data = { time: info.timestamp, label: info.label, level: info.level, message: info.message };
			return JSON.stringify(data);
		})
	),
};

const loggerInfo = winston.createLogger(logInfoConfiguration);
const loggerError = winston.createLogger(logErrorConfiguration);

export { loggerInfo, loggerError };
