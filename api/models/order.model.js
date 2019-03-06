import Sequelize from 'sequelize';
import db from '../config/db';

const Order = db.define("order", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      order: {
          type: Sequelize.JSON,
          allowNull: false
      },
      billing_address: {
           type: Sequelize.TEXT,
           allowNull: false
      },
      totalPrice: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      quantity: {
          type: Sequelize.INTEGER,
          allowNull: false
      }
});

export default Order;