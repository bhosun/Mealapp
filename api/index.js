import express from 'express';
import bodyParser from 'body-parser';
import Meal from './models/meal.model';
import Menu from './models/menu.model';
import Order from './models/order.model';
import User from './models/user.model';
import Caterer from './models/caterer.model';

const app = express();
const port = process.env.PORT || 8000;
const VERSION_API = '/api/v1'

app.use(bodyParser.json());

// Setup Database
import db from './config/db';


// ROUTES
import mealRoutes from './routes/meal.route';
import menuRoutes from './routes/menu.route';
import orderRoutes from './routes/order.route';

app.get("/", (req, res) => {
    return res.send('The API works');
});

// handle
app.use(`${VERSION_API}/meals`, mealRoutes);
app.use(`${VERSION_API}/menus`, menuRoutes);
app.use(`${VERSION_API}/orders`, orderRoutes);

User.hasMany(Order, { constraints: true, onDelete: 'CASCADE' });
Order.belongsTo(Caterer, { constraints: true, onDelete: 'CASCADE' });
Meal.belongsTo(Caterer, { constraints: true, onDelete: 'CASCADE' });
Menu.belongsTo(Caterer, User, { constraints: true, onDelete: 'CASCADE' });


db.sync()
  .then(() => {
      app.listen(port);
      console.log(`Your Server is now running on ${port}`);
      console.log(`your database is now connected`);
  })
  .catch(err => console.log(err));


export default app;


