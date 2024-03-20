import express from 'express';
import { sendReservation } from "../controller/reservation.js";
import { CheckReservation } from '../controller/checkReservation.js';

const router = express.Router();

router.post('/send', sendReservation)
router.get('/check', CheckReservation);

export default router;