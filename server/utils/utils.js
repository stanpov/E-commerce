import jwt from "jsonwebtoken";

export const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" });
};

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies["access_token"];

    if (!token) {
      return res.status(400).json({ msg: "Invalid Authorisation" });
    }
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) {
        return res.status(400).json({ msg: "Invalid Authorisation" });
      }
      req.user = decoded;
      return next();
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Something went wrong, please try again later." });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({
      message: "Invalid Admin Token. You need admin permission to do that!",
    });
  }
};
