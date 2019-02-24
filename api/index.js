import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 8000;
const VERSION_API = '/api/v1'

app.use(bodyParser.json());

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

app.listen(port, () => {
    console.log(`app is running on PORT ${port}`);
});

export default app;


