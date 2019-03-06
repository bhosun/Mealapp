import Sequelize from 'sequelize';
import db from '../config/db';

const Meal = db.define("meal", {
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
      imageurl: {
          type: Sequelize.STRING,
          allowNull: false
      },
      createdAt: Sequelize.DATEONLY,
});

export default Meal;



