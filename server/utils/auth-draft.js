const jwt = require('jsonwebtoken');

//replace key
const secretKey = 'replace_secret_key';


//generating jwt token with a specific user role
const generateToken = (payload, role) => {
    const tokenPayload = {
        ...payload,
        role, // add a custom claim for the user role
    };

    return jwt.sign(tokenPayload, secretKey, { expiresIn: '2h'});
};

//middleware function to verify jwt token and user role

const verifyTokenRole = ( requiredRole ) => (req, res, next) => {
    const token = req.header('Authorization');

    if(!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided'});
    }
    
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized - Invalid Token'});
        }

        if (decoded.role !== requiredRole) {
            return res.status(403).json({ message: 'Forbidden - Permissions not granted'});
        }

        req.user = decoded.user;
        next();
    });
};

const authorizeUser = async(req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication Token not provided'})
    }
}

module.exports = {
    generateToken,
    verifyTokenRole,
    authorizeUser,
};