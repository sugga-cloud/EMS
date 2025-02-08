import { Router } from "express";
import { applyToEvent, acceptApplication, rejectApplication } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { isHost } from "../middlewares/isHost.js";
const router = Router();

// Route to apply to an event
// This should be accessible by logged-in users
router.post('/apply/:eventId', isAuthenticated, applyToEvent);

// Route to accept an application (only accessible by the host of the event)
// This should be accessible by the event host only
router.put('/accept/:eventId/:ticketId', isAuthenticated, isHost, acceptApplication);

// Route to reject an application (only accessible by the host of the event)
// This should be accessible by the event host only
router.put('/reject/:eventId/:ticketId', isAuthenticated, isHost, rejectApplication);

export default router;