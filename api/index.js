import express from 'express';
import bodyParser from 'body-parser';
import '@babel/polyfill';


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
import userRoutes from './routes/user.route';
import catererRoutes from './routes/caterer.route';

app.get("/", (req, res) => {
    return res.send('The API works');
});

// handle
app.use(`${VERSION_API}/meals`, mealRoutes);
app.use(`${VERSION_API}/menus`, menuRoutes);
app.use(`${VERSION_API}/orders`, orderRoutes);
app.use(`${VERSION_API}/user`, userRoutes);
app.use(`${VERSION_API}/caterer`, catererRoutes);

db.sync()
  .then(() => {
      app.listen(port);
      console.log(`Your Server is now running on ${port}`);
      console.log(`your database is now connected`);
  })
  .catch(err => console.log(err));


export default app;


