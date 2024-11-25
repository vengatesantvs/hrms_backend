import dbConfig from '../dbconfig.js';
import { Sequelize, DataTypes } from 'sequelize';
// import ('dotenv').config();
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: true,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('connected..');
  })
  .catch((err) => {
    console.log('Error' + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

import userdatas from './employeetransfer/Users.js';
import companydatas from './employeetransfer/Companies.js';
import employeetransferdatas from './employeetransfer/EmployeeTransfer.js';
import salutationdatas from './employeetransfer/Salutation.js';

db.user = userdatas(sequelize, DataTypes);
db.company=companydatas(sequelize,DataTypes)
db.employeetransfer = employeetransferdatas(sequelize, DataTypes);
db.salutation=salutationdatas(sequelize,DataTypes)


sequelize.sync({ force: false })  // force: true drops the table and recreates it, false ensures it's created only if it doesn't exist
  .then(() => {
    console.log('Tables have been created');
  })
  .catch((error) => {
    console.error('Error creating table:', error);
  });
export default db;
