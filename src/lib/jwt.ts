import jwt, { SignOptions } from "jsonwebtoken";
import { TokenPayload } from "../types/user.js";
import { env } from "../config/env.js";

export function signAccessToken(payload: TokenPayload): string {
    const options: SignOptions = {
        expiresIn: env.jwtAccessExpiresIn as SignOptions['expiresIn']
    }

    return jwt.sign(payload, env.jwtAccessSecret, options)
}