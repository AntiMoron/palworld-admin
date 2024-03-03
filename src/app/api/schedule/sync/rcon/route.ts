import { syncAuth } from "@/util/auth";
import sendRcon from "@/util/rcon";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  console.log("triggered RCON sync");
  try {
    const syncToken = req.headers.get("__sync_token");
    syncAuth(syncToken || "");
    const ret = await sendRcon("ShowPlayers");
    console.log(ret);
  } catch (err) {
    console.log("RCON sync error: ", err);
    return Response.json(
      { error: (err as Error)?.message || err },
      {
        status: 400,
      }
    );
  }
  return Response.json({ message: "RCON sync triggered" });
}
