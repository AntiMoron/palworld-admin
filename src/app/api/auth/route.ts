import { login } from "@/util/auth";
import { NextRequest } from "next/server";
import log from "@/util/log";
import parseJSON from "@/util/parseJSON";

// login
export async function POST(req: NextRequest) {
  try {
    const value = (await req.body?.getReader().read())?.value?.toString();
    const { password } = parseJSON(value || "") || {};
    const token = await login("admin", password);
    if (!token) {
      log("error", "Failed to login", token);
      return Response.json(
        { error: "Failed to login" },
        {
          status: 401,
        }
      );
    }
    const { token: content, expiresIn } = token;
    return Response.json(
      { ok: true },
      {
        headers: {
          "set-cookie": `__pa_token=${content}; Max-Age=${expiresIn};`,
        },
      }
    );
  } catch (err) {
    log("error", err);
    return Response.json({ error: (err as any)?.message }, { status: 401 });
  }
}
