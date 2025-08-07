import express from "express";
import { gameRouter } from "./routes/gameRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 5000;

app.use(cookieParser());
app.use(express.json());

app.use(gameRouter);

app.get("/", (req, res) => {
  res.json({ message: "ОП!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
