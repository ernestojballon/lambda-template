import { logEvent } from "./logger.js";

class CustomError extends Error {
  constructor(statusCode, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.name = "CustomError";
    // Custom debugging information
    this.statusCode = statusCode;
    this.status = "Error";
    this.date = new Date();
    logEvent({
      event: "ERROR",
      payload: {
        message: this.message,
      },
    });
  }
}
export default CustomError;
