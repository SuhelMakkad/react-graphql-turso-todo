import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcrypt";
const secret = new TextEncoder().encode(process.env.SECRET);
const iat = Math.floor(Date.now() / 1000);
export const encodeJWT = (payload, exp = 3600) => new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp + iat)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(secret);
export const verifyJWT = (token) => jwtVerify(token, secret);
const saltRounds = 10;
export const generateHash = (plainText) => bcrypt.hashSync(plainText, saltRounds);
export const validateHash = (plainText, hash) => bcrypt.compareSync(plainText, hash);
//# sourceMappingURL=utils.js.map