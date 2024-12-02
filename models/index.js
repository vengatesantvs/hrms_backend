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
import vendordatas from './employeeportal/vendor.js';
import employeedatas from './employeeportal/employee.js';
import menudatas from './employeetransfer/menuList.js';
import subMenudatas from './employeetransfer/subMenulist.js';
import rolesettingsdatas from './employeetransfer/roleSettings.js';
import roleSubmenuButtondatas from './employeetransfer/roleSubMenuButton.js';
import userrolemapDatas from './employeetransfer/userRoleMapping.js';
import roledatas from './employeetransfer/roles.js';
import roleMenuTabSettingsDatas from './employeetransfer/roleMenuTabSettings.js';
import allowancedatas from './payroll/Allowance.js';
import deductiondatas from './payroll/Deductions.js';
import fixeddeductiondatas from './payroll/FixedDeductions.js';
db.user = userdatas(sequelize, DataTypes);
db.company=companydatas(sequelize,DataTypes)
db.employeetransfer = employeetransferdatas(sequelize, DataTypes);
db.salutation=salutationdatas(sequelize,DataTypes)
db.vendor=vendordatas(sequelize,DataTypes)
db.employee=employeedatas(sequelize,DataTypes)
db.userrolemaps = userrolemapDatas(sequelize, DataTypes);
db.role = roledatas(sequelize, DataTypes);
db.menudatas = menudatas(sequelize, DataTypes);
db.subMenudatas = subMenudatas(sequelize, DataTypes);
db.rolesettingsdatas = rolesettingsdatas(sequelize, DataTypes);
db.roleSubmenuButtons = roleSubmenuButtondatas(sequelize, DataTypes);
db.roleMentuTabSettings = roleMenuTabSettingsDatas(sequelize, DataTypes);
db.allowances=allowancedatas(sequelize,DataTypes)
db.deductions=deductiondatas(sequelize,DataTypes)
db.fixeddeductions=fixeddeductiondatas(sequelize,DataTypes)
db.userrolemaps.belongsTo(db.role, { foreignKey: 'roleId', as: 'rolemap' });
db.subMenudatas.hasMany(db.roleSubmenuButtons, {
  foreignKey: 'submenuId',
  as: 'submenuButtonsMap',
});
db.roleSubmenuButtons.belongsTo(db.subMenudatas, {
  foreignKey: 'submenuId',
  as: 'submenuButtons',
});
sequelize.sync({ force: false })  // force: true drops the table and recreates it, false ensures it's created only if it doesn't exist
  .then(() => {
    console.log('Tables have been created');
  })
  .catch((error) => {
    console.error('Error creating table:', error);
  });
export default db;
