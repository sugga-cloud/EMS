import bcrypt from 'bcryptjs'; // for hashing passwords
import jwt from 'jsonwebtoken'; // for generating a JWT token
import User from '../models/User.js'; // assuming User model is in the models folder

// Register a new user
export const register = async (req, res) => {
    const { email, password, name } = req.body;

    // Validate input
    if (!email || !password || !name) {
        return res.status(400).json({ message: 'Email, Name, and password are required' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create the new user
        const newUser = new User({
            name,
            email,
            "password": hashedPassword,
        });

        // Save user to the database
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            process.env.JWT_SECRET, // Make sure to set JWT_SECRET in your environment variables
            { expiresIn: '1h' }
        );

        // Respond with success message, user data, and the token
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                email: newUser.email,
                id: newUser._id,
            },
            token, // Send the token in the response body
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
// Login a user
export const login =  async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        // const isMatch = true;
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET, // Make sure to set JWT_SECRET in your environment variables
            { expiresIn: '1h' }
        );

        // Respond with success message, user data, and the token
        res.status(200).json({
            message: 'Login successful',
            user: {
                email: user.email,
                id: user._id,
            },
            token, // Send the token in the response body
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}


// Logout a user (clear the JWT cookie)
export const logout = (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None',
        expires: new Date(0), // Expire the cookie immediately
    });

    res.status(200).json({ message: 'Logged out successfully' });
};


