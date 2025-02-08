import jwt from 'jsonwebtoken';

const isAuthenticated = (req, res, next) => {
    // Get the Authorization header
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return res.status(401).json({ message: 'No authorization header. Please log in.' });
    }

    // Extract the token from the 'Bearer <token>' format
    const token = authHeader.split(' ')[1]; // We expect the token after 'Bearer '

    if (!token) {
        return res.status(401).json({ message: 'No token provided. Please log in.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the userId and email to the request for use in other routes
        req.userId = decoded.userId;
        req.email = decoded.email;

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export default isAuthenticated;
