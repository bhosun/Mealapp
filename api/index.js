import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
    return res.send('The API works');
});

app.listen(PORT, () => {
    console.log(`app is running on PORT ${PORT}`);
});