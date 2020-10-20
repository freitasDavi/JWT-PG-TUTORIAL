import jwt from "jsonwebtoken";
require("dotenv").config();

function jwtGenerator(user_id: string) {
  const payload = {
    user: {
      id: user_id,
    },
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
}

export default jwtGenerator;
