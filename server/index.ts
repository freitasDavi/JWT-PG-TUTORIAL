import express from "express";
import cors from "cors";
import router from "./routes/jwtAuth";

const app = express();
// Middleware

app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", router);

app.listen(5000, () => [console.log("server is running on port 5000")]);
