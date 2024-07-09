import {Sequelize} from 'sequelize';
import config from '.';

const sequelize = new Sequelize(config.DB_DATABASE, config.DB_USERNAME, config.DB_PASSWORD, {
  host: config.DB_HOST,
  port: config.DB_PORT,
  dialect: config.DB_DIALECT,
  logging: false
});

export default sequelize;
