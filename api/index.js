import express from 'express';

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    return res.send("The API works");
});

app.listen(PORT, () => {
    console.log(`app is running on PORT ${PORT}`);
});