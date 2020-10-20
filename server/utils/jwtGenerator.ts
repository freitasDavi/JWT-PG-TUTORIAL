import jwt from "jsonwebtoken";
require("dotenv").config();

interface iUser {
  id: string;
}

function jwtGenerator(user_id: string) {
  const payload = {
    user: {
      id: user_id,
    } as iUser,
  };

  return jwt.sign(payload, process.env.jwtSecret as string, {
    expiresIn: "1h",
  });
}

export default jwtGenerator;
