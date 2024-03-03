import { checkAuth } from "@/util/auth";
import { getGroups } from "@/util/group";
import { NextRequest } from "next/server";
import { RedirectType, redirect } from "next/navigation";

export async function GET(res: NextRequest) {
  try {
    const token = res.cookies?.get("__pa_token")?.value;
    try {
      await checkAuth(token as string);
    } catch {
      return Response.json({ error: "Not Logined" }, { status: 401 });
    }
    const groups = await getGroups();
    return Response.json(groups);
  } catch (err) {
    console.log(err);
    return Response.json(
      { error: (err as any)?.message },
      {
        status: 400,
      }
    );
  }
}
