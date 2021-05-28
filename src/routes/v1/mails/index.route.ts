import { Router } from "express";
import { MailController } from "../../../controllers/mails/index.controller";
import { MailMiddleware } from "../../../middlewares/mails";

const router = Router();

router.get("/all", MailMiddleware.getAllInbox(), MailController.getAllInbox);

router.get(
    "/one/:id",
    MailMiddleware.getSpecificInbox(),
    MailController.getSpecificInbox,
);

export default router;
