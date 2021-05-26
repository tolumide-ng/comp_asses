import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ResponseGenerator } from "./helpers/responseGenerator/index.helper";
import Routes from "./routes/v1";

dotenv.config();
const app = express();
app.use(express.json({}));
app.use(cors());

Routes(app);

app.use("*", (req, res) => {
    ResponseGenerator.sendError(res, 404);
});

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
    process.stdout.write(`Listening on port ${PORT}`);
});

export default app;
