


// Wraps endpoint functionany error and return a json 
// response with the error message and status code.
export function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      (err.statusCode && res.status(err.statusCode)) || res.status(500);
      res.json({
        status: err.status || 500,
        message: err.message || "Internal Server Error",
      });
      //TO DO:: make and end point to handler the errors
      //next(err);
    }
  };
}
