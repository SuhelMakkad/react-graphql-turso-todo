import { SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.SECRET);

export const createJWT = (payload: Record<string, string>) =>
  new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret);
