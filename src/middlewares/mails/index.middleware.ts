import { KeyCrypt } from "../../helpers/keyCrypt";
import { ResponseGenerator } from "../../helpers/responseGenerator";
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
            hasValidEncryptionType,
            hasValidServerType,
            hasValidId,
            KeyCrypt.decrypt,
        );
    }
}
