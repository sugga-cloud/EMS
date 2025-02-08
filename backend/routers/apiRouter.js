import { Router } from "express";
import authRouter from './authRouter.js'
import eventRouter from './eventRouter.js'
import isAuthenticated from "../middlewares/isAuthenticated.js";
import User from "../models/User.js";
const router = Router();

router.use('/auth',authRouter);
router.use('/events',eventRouter);

// API to update or delete user by ID from cookie
router.put('/profile',isAuthenticated,async (req, res) => {
        // Update user
        const userId = req.userId; // Get user ID from the cookie
        if (!userId) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        const { name, email, password, age, status, otp } = req.body;

        try {
            // Find and update the user using the ID from the cookie
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { name, email, password, age, status, otp },
                { new: true } // Returns the updated user
            );

            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json(updatedUser); // Respond with updated user data
        } catch (error) {
            res.status(500).json({ message: 'Server Error', error: error.message });
        }
    })
    router.delete('/profile',isAuthenticated,async (req, res) => {
        // Delete user
        const userId = req.userId; // Get user ID from the cookie
        if (!userId) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        try {
            // Find and delete the user by ID from the cookie
            const deletedUser = await User.findByIdAndDelete(userId);

            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Delete the cookie upon successful deletion
            res.clearCookie('_id');
            
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server Error', error: error.message });
        }
    });

    router.get('/profile',isAuthenticated, async (req, res) => {
        const userId = req.userId; // Get user ID from the cookie
    
        if (!userId) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
    
        try {
            // Find the user by their ID
            const user = await User.findById(userId).populate('HostedEvents').select('-password -otp') // Exclude sensitive fields like password and otp
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            // Send back the user details
            res.status(200).json(user);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: 'Server Error', error: error.message });
        }
    });

export default router;

