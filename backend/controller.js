const User = require('./usersmodel');

exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ email, password });

        res.status(201).json({
            message: 'User created successfully',
            user
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Signup failed' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        res.status(200).json({
            message: 'User Login successful',
            user
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Login failed' });
    }
};