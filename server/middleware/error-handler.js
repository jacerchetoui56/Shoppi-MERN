const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, please try again later",
  };
  //!handle duplicate email error
  if (err.code && err.code === 11000) {
    customError.status = 400;
    customError.msg = `Problem with the ${Object.keys(
      err.keyValue
    )}, Please chose another one.`;
  }
  //!handle 404 : NotFound Errors (Cast Errors)
  if (err.name && err.name === "CastError") {
    customError.statusCode = 404;
    customError.msg = `No Job With ID : ${err.value}`;
  }

  //!handle validation errors
  if (err.name && err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
    customError.status = 400;
  }

  return res
    .status(customError.statusCode)
    .json({ success: false, msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
