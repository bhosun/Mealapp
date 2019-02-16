import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const PORT = 8080;

app.use(bodyParser.json());

// ROUTES
import mealRoutes from './routes/meal.route';

app.get("/", (req, res) => {
    return res.send('The API works');
});

// handle
app.use("/api/v1/meals", mealRoutes);

app.listen(PORT, () => {
    console.log(`app is running on PORT ${PORT}`);
});