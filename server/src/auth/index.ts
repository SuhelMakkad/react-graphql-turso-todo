import express from "express";
import { v4 as uuid } from "uuid";
import { db } from "../drizzle/db";
import { createJWT } from "./utils";
import { users } from "../drizzle/schema";
import { sql } from "drizzle-orm";

export const authRouter = express.Router();

authRouter.post("/sign-up", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
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
  };

  try {
    await db.insert(users).values(user);
    const jwt = await createJWT({
      userId: user.id,
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
      .where(sql`${users.email} = ${email}`);

    if (!user?.length) {
      throw Error("NotFound");
    }

    const jwt = await createJWT({
      userId: user[0].id,
    });

    return res.json({
      jwt,
    });
  } catch (e) {
    console.error(e);
    return res.status(400).json({
      status: "failed",
      message: "user not found",
    });
  }
});
