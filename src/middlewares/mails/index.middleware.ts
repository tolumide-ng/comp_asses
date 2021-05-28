import { ResponseGenerator } from "../../helpers/responseGenerator/index.helper";
import {
    hasLogin,
    hasValidEmail,
    hasValidEncryptionType,
    hasValidId,
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

    static getSpecificInbox() {
        return ResponseGenerator.composeHandlers(
            hasLogin,
            hasValidEmail,
            hasValidEncryptionType,
            hasValidServerType,
            hasValidId,
        );
    }
}
