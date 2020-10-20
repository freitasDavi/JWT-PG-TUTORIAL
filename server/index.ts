import express from "express";
import cors from "cors";
import router from "./routes/jwtAuth";
import dashboard from "./routes/dashboard";

const app = express();
// Middleware

app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", router);
app.use("/dashboard", dashboard);

app.listen(5000, () => [console.log("server is running on port 5000")]);
