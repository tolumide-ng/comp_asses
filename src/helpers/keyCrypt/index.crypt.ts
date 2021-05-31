import crypto, { BinaryLike } from "crypto";
import { NextFunction, Request, Response } from "express";
import { UserMessagesDef } from "../mailFunctions";
import { ResponseGenerator } from "../responseGenerator";
import { UserInfoDef } from "./index.model";
import dotenv from "dotenv";

dotenv.config();

export class KeyCrypt {
    private static ALGORITHM: string = "aes-128-cbc";

    private static AES_KEY: string | undefined = process.env.AES_KEY;

    private static IV_KEY: BinaryLike | undefined = process.env.IV_KEY;

    static encrypt(input: object, toUpdate: UserMessagesDef): void {
        const modifiedInput = JSON.stringify(input);

        if (KeyCrypt.AES_KEY && KeyCrypt.IV_KEY) {
            let cypher = crypto.createCipheriv(
                KeyCrypt.ALGORITHM,
                Buffer.from(KeyCrypt.AES_KEY),
                KeyCrypt.IV_KEY,
            );

            let encrypyted = cypher.update(modifiedInput);

            encrypyted = Buffer.concat([encrypyted, cypher.final()]);

            const key = encrypyted.toString("hex");

            toUpdate.keys = key;
        }
    }

    static decrypt(req: Request, res: Response, next: NextFunction) {
        try {
            const input = req.headers.userkey || req.headers.userKey;

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

            if (!data.email || !data.password) {
                throw Error;
            }

            req.body.email = data.email;
            req.body.password = data.password;

            next();
        } catch (error) {
            return ResponseGenerator.sendError(
                res,
                401,
                "Authentication Error: Please add a valid userKey",
            );
        }
    }
}
