import { checkAuth } from "@/util/auth";
import { getGroupByGroupId, getGroups } from "@/util/group";
import { NextRequest } from "next/server";
import log from "@/util/log";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies?.get("__pa_token")?.value;
    try {
      await checkAuth(token as string);
    } catch {
      return Response.json({ error: "Not Logined" }, { status: 401 });
    }
    const params = req.nextUrl.searchParams;
    const groupId = params.get("groupId") || undefined;
    if (groupId) {
      const group = await getGroupByGroupId(groupId);
      return Response.json([group]);
    }
    const groups = await getGroups();
    return Response.json(groups);
  } catch (err) {
    log("error", err);
    return Response.json(
      { error: (err as any)?.message },
      {
        status: 400,
      }
    );
  }
}
