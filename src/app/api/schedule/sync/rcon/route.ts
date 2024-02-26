import sendRcon from "@/util/rcon";

export async function POST() {
  console.log("triggered RCON sync");
  try {
    const ret = await sendRcon("ShowPlayers");
    console.log(ret);
  } catch (err) {
    console.log("RCON sync error: ", err);
  }
  return Response.json({ message: "RCON sync triggered" });
}
