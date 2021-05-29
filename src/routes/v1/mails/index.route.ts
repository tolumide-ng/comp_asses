import { Router } from "express";
import { MailController } from "../../../controllers/mails/index.controller";
import { MailMiddleware } from "../../../middlewares/mails";

const router = Router();

router.post("/all", MailMiddleware.getAllInbox(), MailController.getAllInbox);

router.post(
    "/one/:id",
    MailMiddleware.getSpecificInbox(),
    MailController.getSpecificInbox,
);

export default router;
