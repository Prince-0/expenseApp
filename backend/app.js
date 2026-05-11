require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const cors = require('cors');
const path = require('path');

const sequelize = require('./db');
const user = require('./models/usersmodel');
const expense = require('./models/transactionModel');
const payment = require('./models/paymentModel');
const password = require('./models/passwordReset');

user.hasMany(expense , { foreignKey: 'userId' });
expense.belongsTo(user , { foreignKey: 'userId' });
user.hasMany(password);
password.belongsTo(user);

const userRoute = require('./routes/userRoute');
const paymentRoute = require('./routes/paymentRoute');
const transactionRoute = require('./routes/transactionRoute');
const passwordRoute = require('./routes/passwordRoute');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/public")));
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoute);
app.use('/expense',transactionRoute);
app.use('/payment', paymentRoute);
app.use('/password',passwordRoute);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/views/login.html'));
});

const PORT = process.env.PORT || 3001;

sequelize.sync()
    .then(() => {
        console.log('Database synced');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => console.log(err));