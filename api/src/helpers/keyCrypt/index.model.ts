import { Request, Response } from "express";

export interface KeyCryptDef {
    encrypt(input: object | string): string;

    decrypt(req: Request, res: Response): void;
}

export interface UserInfoDef {
    email: string;
    password: string;
}
