import Sequelize from 'sequelize';
import db from '../config/db';

import Meal from './meal.model';
import Menu from './menu.model';
import Order from './order.model';

const Caterer = db.define('caterer', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  catering_company: {
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

Caterer.hasMany(Order, { constraints: true, onDelete: 'CASCADE' });
Caterer.hasMany(Meal, { constraints: true, onDelete: 'CASCADE' });
Caterer.hasMany(Menu, { constraints: true, onDelete: 'CASCADE' });

export default Caterer;