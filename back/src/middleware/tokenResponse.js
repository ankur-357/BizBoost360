import jwt from "jsonwebtoken";
import { token_secret } from "../config.js";

export const authRequired = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "Authorization denied" });

    jwt.verify(token, token_secret, (err, user) => {
      if (err) return res.status(403).json({ message: "Token invalid" });
      req.user = user;
    });
    next();
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Error" });
  }
};
