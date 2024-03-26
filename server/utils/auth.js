const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/users');

const generateToken = (userId, role) => {
    // Generate JWT token with userId and role
    return jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    try {
        // Verify JWT token and extract payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        return null; // Token is invalid or expired
    }
};

const loginUser = async (username, password) => {
    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('Invalid username or password');
    }

    // Compare provided password with hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid username or password');
    }

    // Generate JWT token containing user ID and role
    const token = generateToken(user._id, user.role);

    return { user, token };
};

const registerUser = async (username, email, password) => {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create a new user with the hashed password
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        // Other user properties...
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    return savedUser;
};


const authMiddleware = async (req, res, next) => {
    // Extract JWT token from request headers or cookies
    const token = req.headers.authorization?.split(' ')[1]; // Assuming JWT is provided in Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Authentication token not provided' });
    }

    // Verify JWT token and extract payload
    const decodedToken = verifyToken(token);
    if (!decodedToken) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Check if user exists and has the specified role
    const user = await User.findById(decodedToken.userId);
    if (!user) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    // User is authorized, proceed to the next middleware or route handler
    req.user = user;
    next();
};

module.exports = { generateToken, verifyToken, loginUser, registerUser, authMiddleware };
