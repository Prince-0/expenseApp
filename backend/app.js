const express = require('express');
const cors = require('cors');

const sequelize = require('./db');
require('./usersmodel');
const userRoutes = require('./route');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);

sequelize.sync()
    .then(() => {
        console.log('Database synced');
        app.listen(3001, () => {
            console.log('Server running on port 3001');
        });
    })
    .catch(err => console.log(err));