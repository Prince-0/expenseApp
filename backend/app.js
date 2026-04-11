require('dotenv').config({ path: __dirname + '/.env' });
console.log("API KEY:", process.env.GEMINI_API_KEY);

const express = require('express');
const cors = require('cors');

const sequelize = require('./db');
const user = require('./models/usersmodel');
const expense = require('./models/transactionModel');
const payment = require('./models/paymentModel');

user.hasMany(expense , { foreignKey: 'userId' });
expense.belongsTo(user , { foreignKey: 'userId' });

const userRoute = require('./routes/userRoute');
const paymentRoute = require('./routes/paymentRoute');
const transactionRoute = require('./routes/transactionRoute');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/user', userRoute);
app.use('/expense',transactionRoute);
app.use('/payment', paymentRoute);

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