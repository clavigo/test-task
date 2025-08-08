import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { sessionRouter } from "./routes/sessionRoutes.js";
import { gameRouter } from "./routes/gameRoutes.js";
import { authRouter } from "./routes/authRoutes.js";

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use(sessionRouter);
app.use(gameRouter);
app.use(authRouter);

app.get("/", (req, res) => {
  res.json({ message: "ОП!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
