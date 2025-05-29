/**
 * @DESC GLOBAL ERROR HANDLER MIDDLEWARE
 * @DESC CATCHES ALL UNHANDLED ERRORS AND SENDS STRUCTURED RESPONSE TO THE CLIENT
 */
exports.globalErrorHandler = (err, req, res, next) => {
    // LOG THE ERROR STACK OR MESSAGE FOR DEBUGGING PURPOSES
    console.error("🔥 GLOBAL ERROR HANDLED:", err.stack || err.message);
  
    // SEND JSON RESPONSE WITH APPROPRIATE STATUS CODE AND MESSAGE
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "INTERNAL SERVER ERROR",
    });
  };