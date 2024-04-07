import EnumsError from "../errors/EnumsError.js";

export const errorHandlerMiddleware = (error, req, res, next) => {
  console.error(error.cause || error.message);
  switch (error.code) {
    case EnumsError.BAD_REQUEST_ERROR:
    case EnumsError.INVALID_PARAMS_ERROR:
      res.status(400).json({ status: "error", message: error.message });
      break;
    case EnumsError.NOT_USER_REGISTER:
      res.status(400).render("error", { title: "error in the cart" });
      break;

    case EnumsError.DATA_BASE_ERROR:
    case EnumsError.ROUTING_ERROR:
    default:
      res.status(500).json({ status: "error", message: error.message });
  }
};
