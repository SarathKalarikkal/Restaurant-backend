
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const errorMiddleware = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let errorMessage = err.message || "Internal Server Error";

    // Return validation errors in JSON format
    if (err.name === "ValidationError") {
        statusCode = 400;
        errorMessage = err.message;
    }
    
    res.status(statusCode).json({ success: false, message: errorMessage });
};

export { ErrorHandler, errorMiddleware };
