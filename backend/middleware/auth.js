const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    try {
        const token = req.cookies["access-token"];
        if(!token) return res.status(401).json({ error: 'Token Not Found' }); 
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid or Expired Token' });
        req.user = user;
        next();
    });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = authenticateToken;