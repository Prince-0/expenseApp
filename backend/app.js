const express = require('express');
const cors = require('cors');

const sequelize = require('./db');
const User = require('./usersmodel');
const expense = require('./transactionModel');

User.hasMany(expense);
expense.belongsTo(User);

const userRoutes = require('./authRoute');
const transactionRoute = require('./transactionRoute');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/user',transactionRoute);

sequelize.sync()
    .then(() => {
        console.log('Database synced');
        app.listen(3001, () => {
            console.log('Server running on port 3001');
        });
    })
    .catch(err => console.log(err));