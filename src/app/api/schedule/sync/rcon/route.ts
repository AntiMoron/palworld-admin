import { syncAuth } from "@/util/auth";
import getDisplayPlayersUID from "@/util/getDisplayPlayerUID";
import log from "@/util/log";
import { getAllPlayers, getPlayerByInstanceId } from "@/util/player";
import sendRcon from "@/util/rcon";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  log("info", "triggered RCON sync");
  try {
    const syncToken = req.headers.get("__sync_token");
    syncAuth(syncToken || "");
    try {
      const players = await getAllPlayers({ status: "blacklist" });
      for (const player of players) {
        // those guys are banned, kick them!
        const id = getDisplayPlayersUID(player?.player_uid);
        try {
          await sendRcon(`KickPlayer ${id}`);
        } catch (err) {
          log("error", "rcon kick blacklist", (err as any)?.message);
        }
      }
    } catch (err) {
      log("error", (err as any)?.message);
    }
  } catch (err) {
    log("error", "RCON sync error: ", err);
    return Response.json(
      { error: (err as Error)?.message || err },
      {
        status: 400,
      }
    );
  }
  return Response.json({ message: "RCON sync triggered" });
}
