import Event from '../models/Event.js';
import User from '../models/User.js';
import Uploader from '../config/cloudinary.js';

// Create an Event
export const createEvent = async (req, res) => {
    const { title, about, relation, timelines } = req.body;

    if (!title || !about) {
        return res.status(400).json({ message: 'Host, title, and about are required' });
    }

    // Check if there is an image in the request
    if (!req.files || !req.files.file) {
        return res.status(400).json({ message: 'Image is required' });
    }

    try {
        // Upload the image to Cloudinary
        const image = req.files.file; // Assuming 'image' is the name of the input field in your form
        // console.log("image"+Object.entries(image));
        const result = await Uploader(image.tempFilePath);

        const url = result; // Get the URL of the uploaded image

        // Log the image URL
        // console.log(url);

        const host = req.userId;
        console.log({ host, title, about, relation, timelines });

        const newEvent = new Event({
            imageUrl: url,
            host,
            title,
            about,
            relation,
            timelines,
        });

        await newEvent.save();

        const user = await User.findById(host);
        user.HostedEvents.push(newEvent._id);
        await user.save();

        res.status(201).json({
            message: 'Event created successfully',
            event: newEvent,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
// Get all Events
export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json({'events':[...events]});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a specific Event by ID
export const getEventById = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findById(id).populate('host', 'email');
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update an Event
export const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, about, relation, timelines } = req.body;

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        event.title = title || event.title;
        event.about = about || event.about;
        event.relation = relation || event.relation;
        event.timelines = timelines || event.timelines;

        await event.save();
        res.status(200).json({
            message: 'Event updated successfully',
            event,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete an Event
export const deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findByIdAndDelete(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
