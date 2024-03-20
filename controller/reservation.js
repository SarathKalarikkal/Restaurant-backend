import {ErrorHandler} from "../error/error.js";
import {Reservation} from "../models/reservationSchema.js"

export const sendReservation = async (req, res, next) => {
    const { firstName, lastName, email, phone, time, date } = req.body;
     
    try {
         // If the user does not exist, proceed with saving the reservation
        if (!firstName || !lastName || !email || !phone || !time || !date) {
            const error = new ErrorHandler("Please fill out the full reservation form!", 400);
            return res.status(error.statusCode).json({ success: false, message: error.message });
        }


        const reservedUser = await Reservation.findOne({ email });

        if (reservedUser) {
            return res.status(200).json({ success: false, message: "User already reserved!" });
        }else{
            await Reservation.create({
                firstName,
                lastName,
                email,
                phone,
                time,
                date
            });
            res.status(200).json({ success: true, message: "Reservation sent successfully!" });
        }

     
       
    
       
        
    } catch (error) {
        if (error.name === "ValidationError") {
            const validationError = Object.values(error.errors).map(err => err.message);
            return next(new ErrorHandler(validationError.join(", "), 400));
        }
    
        return next(new ErrorHandler(error.message, 500));
    }
}
