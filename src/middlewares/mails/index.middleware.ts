import { ResponseGenerator } from "../../helpers/responseGenerator/index.helper";
import {
    hasLogin,
    hasValidEmail,
    hasValidEncryptionType,
    hasValidServerType,
} from "../../validators/mail";

export class MailMiddleware {
    static getAllInbox() {
        return ResponseGenerator.composeHandlers(
            hasLogin,
            hasValidEmail,
            hasValidEncryptionType,
            hasValidServerType,
        );
    }
}
