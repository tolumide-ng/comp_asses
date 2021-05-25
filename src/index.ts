import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json({}));
app.use(cors());

app.use("*", (req, res) => {
    res.status(200).send({ message: "welcome to email_server :eyes" });
});

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
    process.stdout.write(`Listening on port ${PORT}`);
});

export default app;
