require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const cors = require('cors');

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
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoute);
app.use('/expense',transactionRoute);
app.use('/payment', paymentRoute);
app.use('/password',passwordRoute);

app.get('/', (req, res) => {
  res.send('API is running...');
});

sequelize.sync()
    .then(() => {
        console.log('Database synced');
        app.listen(3001, () => {
            console.log('Server running on port 3001');
        });
    })
    .catch(err => console.log(err));