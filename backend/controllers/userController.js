import Event from '../models/Event.js';
import { v4 as uuidv4 } from 'uuid'; // For generating unique ticket ID
import { sendMail } from '../config/mail.js';
// Email configuration (using Gmail in this example)

// Accept Application (by Event Host)
export const acceptApplication = async (req, res) => {
    const { eventId, ticketId } = req.params; // Event ID and Ticket ID
    const userId = req.userId; // Event host's user ID

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if the requester is the event host
        if (event.host.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You are not authorized to accept/reject applications' });
        }

        // Find the registered user application by ticket ID
        const userApplication = event.registeredUser.find(
            (user) => user.ticketId === ticketId || !user.ticketId // Find the user application (with no ticket initially)
        );

        if (!userApplication) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Generate a unique ticket ID for this user
        const newTicketId = uuidv4(); // Generate a unique ticket ID

        // Update the user's application with a new ticket ID and change status to 'Registered'
        userApplication.ticketId = newTicketId;
        userApplication.status = 'Registered'; // User has been accepted into the event

        await event.save();

        // Send email notification to the user whose application was accepted
        const user = await User.findById(userApplication.id); // Get user details for email notification
        if (user) {
            const mailOptions = {
                from: process.env.EMAIL_USER, // Your email address
                to: user.email, // Recipient's email
                subject: 'Your Application has been Accepted',
                text: `Dear ${user.email},\n\nYour application for the event "${event.title}" has been accepted.\nYour unique ticket ID is: ${newTicketId}\n\nThank you for your participation!`,
            };

            // // Send email
            // transporter.sendMail(mailOptions, (error, info) => {
            //     if (error) {
            //         console.error('Error sending email:', error);
            //     } else {
            //         console.log('Email sent: ' + info.response);
            //     }
            // });
        }

        res.status(200).json({
            message: 'Application accepted successfully',
            ticketId: newTicketId, // Return the newly generated ticket ID
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
// Apply to Event (Create application)
export const applyToEvent = async (req, res) => {
    const { eventId } = req.params; // Event ID from the request params
    const userId = req.userId; // User ID from JWT (authenticated user)
    
    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if the user has already applied
        const userAlreadyApplied = event.registeredUser.some(
            (user) => user.id.toString() === userId.toString()
        );

        if (userAlreadyApplied) {
            return res.status(400).json({ message: 'You have already applied to this event' });
        }

        // Create a new application without a ticket ID for now
        event.registeredUser.push({
            id: userId,
            status: 'Raised', // User has raised an application
            ticketId: null, // No ticket ID initially
        });

        await event.save();
        sendMail(req.email,event.title);
        res.status(200).json({
            message: 'Application raised successfully. Awaiting host approval.',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Reject Application (by Event Host)
export const rejectApplication = async (req, res) => {
    const { eventId, ticketId } = req.params; // Event ID and Ticket ID
    const userId = req.userId; // Event host's user ID

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if the requester is the event host
        if (event.host.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You are not authorized to accept/reject applications' });
        }

        // Find the registered user application by ticket ID
        const userApplication = event.registeredUser.find(
            (user) => user.ticketId === ticketId
        );

        if (!userApplication) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // Update the status to "Rejected"
        userApplication.status = 'Rejected';

        await event.save();

        res.status(200).json({ message: 'Application rejected successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
