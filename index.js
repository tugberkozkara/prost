const express = require('express');
const app = express();
const userController = require('./controllers/userController');
const placeController = require('./controllers/placeController');
require('./config/db')


app.get("/", (req, res) => {
    res.send("Hellor woldr!");
    return res.status(200)
});

app.listen(8080, () =>{
    console.log(`Server is running on port 8080`);
});

app.use('/users', userController);
app.use('/places', placeController);
