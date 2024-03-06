import getConfig from "@/util/getConfig";
import getSyncStats from "@/util/syncStats";
import { NextRequest } from "next/server";

export function GET(req: NextRequest) {
  try {
    const syncToken = req.headers.get("__sync_token");
    // check sync permission
    syncAuth(syncToken || "");
    const stats = getSyncStats();
    console.log(stats);
    return Response.json({ stats });
  } catch (error) {
    return Response.json(error, { status: 400 });
  }
}
function syncAuth(arg0: string) {
  throw new Error("Function not implemented.");
}
