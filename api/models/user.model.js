import Sequelize from 'sequelize';
import db from '../config/db';

import Order from './order.model';

const User = db.define('user', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: Sequelize.DATEONLY,
    updatedAt: Sequelize.DATEONLY
  });

  User.hasMany(Order, { constraints: true, onDelete: 'CASCADE' });
  
  export default User;