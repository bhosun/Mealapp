import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const PORT = 8000;

app.use(bodyParser.json());

// ROUTES
import mealRoutes from './routes/meal.route';
import menuRoutes from './routes/menu.route';
import orderRoutes from './routes/order.route';

app.get("/", (req, res) => {
    return res.send('The API works');
});

// handle
app.use("/api/v1/meals", mealRoutes);
app.use("/api/v1/menus", menuRoutes);
app.use("/api/v1/orders", orderRoutes);

app.listen(PORT, () => {
    console.log(`app is running on PORT ${PORT}`);
});