
// Middleware to check if the user is an admin
exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // User is admin, allow access to the route
    } else {
        res.status(403).json({ message: 'Unauthorized' });
    }
};

// Middleware to check if the user is a teacher
exports.isTeacher = (req, res, next) => {
    if (req.user && req.user.role === 'teacher') {
        next(); // User is teacher, allow access to the route
    } else {
        res.status(403).json({ message: 'Unauthorized' });
    }
};

// Middleware to check if the user is a parent
exports.isParent = (req, res, next) => {
    if (req.user && req.user.role === 'parent') {
        next(); // User is parent, allow access to the route
    } else {
        res.status(403).json({ message: 'Unauthorized' });
    }
};

// Middleware to check if the user is a student
exports.isStudent = (req, res, next) => {
    if (req.user && req.user.role === 'student') {
        next(); // User is student, allow access to the route
    } else {
        res.status(403).json({ message: 'Unauthorized' });
    }
};
