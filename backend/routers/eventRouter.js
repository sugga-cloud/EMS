import express from 'express';
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '../controllers/eventController.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import isHost from '../middlewares/isHost.js';
import { applyToEvent } from '../controllers/userController.js';

const router = express.Router();

router.post('/apply/:eventId',isAuthenticated,applyToEvent)

// Create an Event (requires authentication)
router.post('/create-event', isAuthenticated, createEvent);

// Get all Events (public route)
router.get('/', getAllEvents);

// Get specific Event by ID (public route)
router.get('/:id', getEventById);

// Update an Event (requires authentication and user must be host)
router.put('/:id', isAuthenticated, isHost, updateEvent);

// Delete an Event (requires authentication and user must be host)
router.delete('/:id', isAuthenticated, isHost, deleteEvent);

export default router;
