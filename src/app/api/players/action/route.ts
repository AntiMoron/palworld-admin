import getBody from "@/util/getBody";
import getDisplayPlayersUID from "@/util/getDisplayPlayerUID";
import {
  getPlayerByInstanceId,
  savePlayer,
  updatePlayerById,
} from "@/util/player";
import sendRcon from "@/util/rcon";

export async function POST(res: Request) {
  const body = await getBody(res);
  const { action, instanceId } = body || {};
  try {
    const player = await getPlayerByInstanceId(instanceId);
    if (action === "ban") {
      await updatePlayerById({
        id: player.id,
        status: "blacklist",
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
