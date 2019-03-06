import Sequelize from 'sequelize';
import db from '../config/db';

const Menu = db.define("menu", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      names: {
          type: Sequelize.STRING,
          allowNull: false
      },
      price: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      createdAt: Sequelize.DATEONLY,
});

export default Menu;