import express from "express";
import { v4 as uuid } from "uuid";
import { sql } from "drizzle-orm";
import { db } from "../drizzle/db.js";
import { users } from "../drizzle/schema.js";
import { encodeJWT } from "./utils.js";
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
        password,
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
    }
    catch (e) {
        console.error(e);
        return res.status(400).json({
            status: "failed",
            message: "Can not create account with this email",
            error: e.message,
        });
    }
});
authRouter.get("/login", async (req, res) => {
    const { email, password } = req.query;
    try {
        const user = await db
            .select()
            .from(users)
            .where(sql `${users.email} = ${email}`)
            .execute();
        if (!user?.length) {
            throw Error("NotFound");
        }
        const jwt = await encodeJWT({
            user: { id: user[0].id },
        });
        return res.json({
            jwt,
        });
    }
    catch (e) {
        console.error(e);
        return res.status(400).json({
            status: "failed",
            message: "user not found",
        });
    }
});
//# sourceMappingURL=index.js.map