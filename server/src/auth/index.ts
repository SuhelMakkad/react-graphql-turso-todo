import express from "express";
import { v4 as uuid } from "uuid";
import { sql } from "drizzle-orm";
import { db } from "../drizzle/db";
import { users } from "../drizzle/schema";
import { encodeJWT, generateHash, validateHash } from "./utils";

export const authRouter = express.Router();

authRouter.post("/sign-up", async (req, res) => {
  const { firstName, lastName, email, password } = req.body as Record<
    string,
    string
  >;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      status: "failed",
      message: "Insufficient data",
    });
  }

  const user = {
    id: uuid(),
    firstName,
    lastName,
    email,
    password: generateHash(password),
  };

  try {
    await db.insert(users).values(user).execute();
    const jwt = await encodeJWT({
      user: { id: user.id },
    });

    return res.json({
      status: "success",
      message: "User created",
      jwt,
    });
  } catch (e) {
    console.error(e);
    return res.status(400).json({
      status: "failed",
      message: "Can not create account with this email",
      error: (e as Error).message,
    });
  }
});

authRouter.get("/login", async (req, res) => {
  const { email, password } = req.query;

  try {
    const user = await db
      .select()
      .from(users)
      .where(sql`${users.email} = ${email}`)
      .execute();

    if (!user?.length) {
      throw Error("NotFound");
    }

    const isValid = validateHash(password as string, user[0].password);

    if (!isValid) {
      throw Error("Unauthorized");
    }

    const jwt = await encodeJWT({
      user: { id: user[0].id },
    });

    return res.json({
      jwt,
    });
  } catch (e) {
    console.error(e);
    return res.status(400).json({
      status: "failed",
      message: "Invalid credentials",
    });
  }
});
