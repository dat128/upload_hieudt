import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import Image from './image';

dotenv.config();
const config = {
	database: process.env.DATABASE_NAME,
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
};
const sequelize = new Sequelize(config.database, config.username, config.password, {
	host: config.host,
	dialect: 'mysql',
	port: config.port,
	operatorsAliases: false,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 20000,
	},
	timezone: '+07:00',
	logging: true,
});

const database = {};
database.Sequelize = Sequelize;
database.sequelize = sequelize;

database.image = Image(sequelize, Sequelize);

export default database;
