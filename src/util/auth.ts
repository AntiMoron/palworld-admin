import getConfig from "./getConfig";
import getClient from "./getDbClient";
import jwt from "jsonwebtoken";

interface User {
  id: number;
  username: string;
  password: string;
  cur_jwt?: string;
}

const secret = "palworld-admin-panel";

export async function checkAuth(token: string) {
  const db = getClient();
  const user = (
    await db("user").select().where("username", "admin")
  )?.[0] as User;
  if (!user) {
    throw new Error("User not found");
  }
  const ret = jwt.verify(token, secret);
  if (!ret) {
    console.log(ret);
    throw new Error("Not logined");
  }
  const userJwt = token;
  const validJwt = user.cur_jwt;
  if (userJwt !== validJwt) {
    throw new Error("Not logined");
  }
}

export async function login(username: string, password: string) {
  const db = getClient();
  const user = (
    await db("user").select().where("username", username)
  )?.[0] as User;
  if (!user) {
    throw new Error("User not found");
  }
  if (password === user.password) {
    const token = jwt.sign({ username }, secret, { expiresIn: "1h" });
    await db("user")
      .update({
        cur_jwt: token,
      })
      .where("id", user.id);
    return {
      token,
      expiresIn: 3600,
    };
  }
}

/**
 * Auth for calling sync api
 * @param tokenForSync to be authenticated
 */
export function syncAuth(tokenForSync: string) {
  const config = getConfig();
  const syncToken = config.SYNC_TOKEN;
  if (!syncToken) {
    throw new Error("SYNC_TOKEN is not set");
  }
  if (tokenForSync !== syncToken) {
    throw new Error("You are not allowed to sync");
  }
}
