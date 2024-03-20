import {Reservation} from "../models/reservationSchema.js"

export const CheckReservation = async (req, res, next) => {
    const { email } = req.query;

    try {
        // Check if the user already exists in the database
        const reservedUser = await Reservation.findOne({ email });

        if (reservedUser) {
            return res.status(200).json({ success: false, message: "User already reserved!" });
        } 
    } catch (error) {
        // Handle errors
        console.error("Error checking reservation:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
}
