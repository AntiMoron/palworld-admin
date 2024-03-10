import { checkAuth } from "@/util/auth";
import getBody from "@/util/getBody";
import getDisplayPlayersUID from "@/util/getDisplayPlayerUID";
import {
  getPlayerByInstanceId,
  savePlayer,
  updatePlayerById,
} from "@/util/player";
import sendRcon from "@/util/rcon";
import { NextRequest } from "next/server";

export async function POST(res: NextRequest) {
  const body = await res.json();
  const { action, instanceId } = body || {};
  try {
    const token = res.cookies?.get("__pa_token")?.value;
    try {
      await checkAuth(token as string, "admin");
    } catch {
      return Response.json({ error: "Not Logined" }, { status: 401 });
    }
    const player = await getPlayerByInstanceId(instanceId);
    if (action === "ban") {
      await updatePlayerById({
        id: player.id,
        status: "blacklist",
      } as any);
      return Response.json({
        ok: true,
      });
    } else if (action == "unban") {
      await updatePlayerById({
        id: player.id,
        status: "normal",
      } as any);
      return Response.json({
        ok: true,
      });
    } else if (action === "kick") {
      const { player_uid } = await getPlayerByInstanceId(instanceId);
      const playerUid = getDisplayPlayersUID(player_uid);
      await sendRcon(`KickPlayer`, { playerUid });
      return Response.json({
        ok: true,
      });
    }
  } catch (err) {
    return Response.json({ error: (err as any)?.message }, { status: 400 });
  }
  return Response.json(
    {
      error: "unkown action",
    },
    {
      status: 400,
    }
  );
}
