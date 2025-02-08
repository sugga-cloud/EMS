import Event from '../models/Event.js';
const isHost = async (req, res, next) => {
    const { eventId } = req.params;
    const userId = req.userId;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.host.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You are not authorized to manage this event' });
        }

        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


export default isHost;