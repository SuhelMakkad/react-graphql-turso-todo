import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import bcrypt from "bcrypt";

const secret = new TextEncoder().encode(process.env.SECRET);
const iat = Math.floor(Date.now() / 1000);

export const encodeJWT = (payload: JWTPayload, exp = 3600) =>
  new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp + iat)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(secret);

export const verifyJWT = (token: string) => jwtVerify(token, secret);

const saltRounds = 10;

export const generateHash = (plainText: string) =>
  bcrypt.hashSync(plainText, saltRounds);

export const validateHash = (plainText: string, hash: string) =>
  bcrypt.compareSync(plainText, hash);
