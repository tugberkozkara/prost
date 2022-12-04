const express = require('express');
const app = express();
const userController = require('./controllers/userController');
const placeController = require('./controllers/placeController');
const cors = require('cors');
require('./config/db')

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hellor woldr!");
    return res.status(200)
});

app.listen(5000, () =>{
    console.log(`Server is running on port 5000`);
});

app.use('/users', userController);
app.use('/places', placeController);
