const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "Token missing" });
        }

        const decoded = jwt.verify(token, "secretkey");

        req.userId = decoded.userId;

        next(); 

    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = auth;