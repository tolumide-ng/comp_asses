import { Router } from "express";
import { MailMiddleware } from "../../../middlewares/mails";

const router = Router();

router.get("/all", MailMiddleware.getAllInbox);
