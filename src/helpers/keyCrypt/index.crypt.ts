import crypto, { BinaryLike } from "crypto";
import { Request, Response } from "express";
import { KeyCryptDef } from ".";
import { ResponseGenerator } from "../responseGenerator/index.helper";
import { UserInfoDef } from "./index.model";

export class KeyCrypt implements KeyCryptDef {
    private static ALGORITHM: string = "aes-128-cbc'";

    private static AES_KEY: string | undefined = process.env.AES_KEY;

    private static IV_KEY: BinaryLike | undefined = process.env.IV_KEY;

    encrypt(input: object | string): string {
        const modifiedInput = JSON.stringify(input);

        if (!KeyCrypt.AES_KEY || !KeyCrypt.IV_KEY) {
            return "";
        }

        let cypher = crypto.createCipheriv(
            KeyCrypt.ALGORITHM,
            Buffer.from(KeyCrypt.AES_KEY),
            KeyCrypt.IV_KEY,
        );

        let encrypyted = cypher.update(modifiedInput);

        encrypyted = Buffer.concat([encrypyted, cypher.final()]);

        return encrypyted.toString("hex");
    }

    decrypt(req: Request, res: Response) {
        try {
            const input = req.headers.userKey;

            if (!input || typeof input !== "string") {
                throw Error("");
            }

            if (!KeyCrypt.AES_KEY || !KeyCrypt.IV_KEY) {
                return "";
            }

            const encryptedText = Buffer.from(input, "hex");
            const decipher = crypto.createDecipheriv(
                KeyCrypt.ALGORITHM,
                Buffer.from(KeyCrypt.AES_KEY),
                KeyCrypt.IV_KEY,
            );

            let decrypted = decipher.update(encryptedText);
            decrypted = Buffer.concat([decrypted, decipher.final()]);

            let data = JSON.parse(decrypted.toString()) as UserInfoDef;

            req.userInfo = data;

            return decrypted.toString();
        } catch (error) {
            // console.log("err", err.message)
            return ResponseGenerator.sendError(res, 401);
        }
    }
}
