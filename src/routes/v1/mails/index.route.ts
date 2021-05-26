import { Router } from "express";
import { MailController } from "../../../controllers/mails/index.controller";
import { MailMiddleware } from "../../../middlewares/mails";

const router = Router();

router.get("/all", MailMiddleware.getAllInbox, MailController.getAllInbox);

export default router;
