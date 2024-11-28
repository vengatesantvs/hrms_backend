import db from '../models/index.js';
const User =db.user;
const UserRoleMap = db.userrolemaps;
const menu=db.menudatas;
const subMenu=db.subMenudatas;
const roleSettings=db.rolesettingsdatas;
const RoleSubmenuButtons=db.roleSubmenuButtons;
const Role=db.role;

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from "dotenv"
dotenv.config()
const signup = async (req, res) => {
  const { ecode, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ where: { ecode } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use',requestSuccessful:false });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.create({ ecode, password: hashedPassword });
    
    return res.status(201).json({ message: 'User created successfully',requestSuccessful:true });
  } catch (error) {
    console.error('Error during signup:', error);

    // Handle specific Sequelize errors
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: 'Validation Error', errors: error.errors,requestSuccessful:false });
    }

    return res.status(500).json({ message: 'Internal Server Error',requestSuccessful:false });
  }
};

const login = async (req, res) => {
  const { ecode, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { ecode } });
    if (!user) {
      return res.status(404).json({ message: 'User not found',requestSuccessful:false });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password',requestSuccessful:false });
    }
    const userrole= await getUserRole(user.id);
    // Generate a JWT token
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET,{
      expiresIn: process.env.EXPIRESIN, // this will be in ms, here 10 mins is the limit
      notBefore: process.env.NOTBEFORE, // after 1 min we are able to use this token value
      algorithm: process.env.ALGORITHAM
  });

    return res.json({ token, message: 'Login successful',requestSuccessful:true,roleId : userrole.roleId });
  } catch (error) {
    console.error('Error during login:', error);

    // Handle specific Sequelize errors
    if (error.name === 'SequelizeDatabaseError') {
      return res.status(500).json({ message: 'Database Error',requestSuccessful:false });
    }

    return res.status(500).json({ message: 'Internal Server Error',requestSuccessful:false });
  }
};
const getUserRole = async (id) => {
  console.log(id,"userrole")

  const userRole = await UserRoleMap.findOne({
    where: {userId: id, primary_role :1 },
    include: [{
      model: Role, 
      as: 'rolemap',
      attributes: ['id', 'roleName'],
    }],
  });

  if(!userRole) {
    throw new NotFoundException();
  }
  return userRole;
}

const getRoleSettings = async (id) => {
  const data = await roleSettings.findAll({
    where: { roleId: id, status: 'Active' },
    order: ['menuId'],
  });
  return data;
};

const getMenus = async (id) => {
  const data = menu.findOne({
    where: { id: id },
  });
  return data;
};
const getSubMenus = async (id, roleid) => {
  const data = subMenu.findOne({
    include: [
      {
        model: RoleSubmenuButtons,
        as: 'submenuButtonsMap',
        where: { roleId: roleid },
      },
    ],
    where: { id: id },
  });
  return data;
};

const getUserRoles = async (id) => {
  const roleList = UserRoleMap.findAll({ where: { userId: id } });
  return roleList;
};

const getMenuTabs = async (menuId, roleId) => {
  const [results, metadata] = await db.sequelize.query(
    'SELECT id, tab_name,tab_menu_operation as buttons FROM role_menu_tab_settings where roleId=' +
      roleId +
      ' and menuId=' +
      menuId
  );
  return results;
};

const getSubMenuTabs = async (menuId, roleId) => {
  const [results, metadata] = await db.sequelize.query(
    'SELECT id, tab_name,tab_menu_operation as buttons FROM role_menu_tab_settings where roleId=' +
      roleId +
      ' and submenuId=' +
      menuId
  );
  return results;
};
const getMenulist = async (id) => {
  const menuData = [];

  const roleAccess = await getRoleSettings(id);

  for (const roleData of roleAccess) {
    const obj = {};
    const menuData1 = await getMenus(roleData.menuId);
    const menuTab = await getMenuTabs(roleData.menuId, id);

    obj['id'] = menuData1.id;
    obj['title'] = menuData1.title;
    obj['icon'] = menuData1.icon;
    obj['activeIcon'] = menuData1.activeIcon;
    obj['path'] = menuData1.path;
    obj['buttons'] = roleData.menu_operation;

    if (menuTab) {
      obj['menuTab'] = menuTab;
    }

    if (roleData.submenuIds && roleData.submenuIds !== '0') {
      const subMenuListId = roleData.submenuIds.split(',');
      const submenuList = [];

      for (const element of subMenuListId) {
        const obj1 = {};
        const submenuItem = await getSubMenus(element, id);
        const subMenuTabs = await getSubMenuTabs(element, id);
        const subbutton = submenuItem.submenuButtonsMap;

        obj1['id'] = submenuItem.id;
        obj1['title'] = submenuItem.title;
        obj1['path'] = submenuItem.path;
        obj1['buttons'] = subbutton[0].button_operation;

        if (subMenuTabs) {
          obj1['menuTab'] = subMenuTabs;
        }

        submenuList.push(obj1);
      }

      obj['submenu'] = submenuList;
    }

    menuData.push(obj);
  }

  return menuData;
};

const menuList = async (req, res, next) => {
  try {
    const auditData = {};
    const menulist = await getMenulist(req.body.roleId);
    auditData['message'] = 'Get Menu list ';
    auditData['result'] = 'success ';
    auditData['menu_name'] = '';
    auditData['submenu_name'] = '';
    auditData['action'] = 'GET';
    res.status(200).send({
      requestSuccessful: true,
      menuList: menulist,
    });
  } catch (err) {
    console.error('User Controller menuList Error:', err);
    next(err);
  }
};
const controller={
  signup,login,menuList
}

export default controller