import express from "express";
import MailRoutes from "./mails/index.route";

export default (app: express.Application) => {
    app.use("/", MailRoutes);
};
