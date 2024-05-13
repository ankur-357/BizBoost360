import { token_secret } from "../config.js";
import Jwt from "jsonwebtoken";

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    Jwt.sign(
      payload,
      token_secret,
      {
        expiresIn: 86400,
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}
