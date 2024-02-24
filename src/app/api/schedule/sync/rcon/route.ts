import { sendRcon } from "@/app/api/rcon/info/route";
import { savePlayer } from "@/util/player";

export async function GET() {
  console.log("triggered RCON sync");
  try {
    const ret = await sendRcon("ShowPlayers");
    console.log(ret);
  } catch (err) {
    console.log("RCON sync error: ", err);
  }
  return Response.json({ message: "RCON sync triggered" });
}
