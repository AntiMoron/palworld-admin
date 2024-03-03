import { login } from "@/util/auth";
import { NextRequest } from "next/server";

// login
export async function POST(req: NextRequest) {
  try {
    const { password } =
      JSON.parse(
        (await req.body?.getReader()?.read())?.value?.toString() || ""
      ) || {};
    const token = await login("admin", password);
    if (!token) {
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
    Response.json(err, { status: 401 });
  }
}
