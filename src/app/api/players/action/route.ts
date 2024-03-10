import getBody from "@/util/getBody";
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
      const { steam_id: steamId } = await getPlayerByInstanceId(instanceId);
      await sendRcon(`KickPlayer`, { steamId });
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
