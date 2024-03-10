import getBody from "@/util/getBody";
import sendRcon from "@/util/rcon";

// not GET, for not wanting nextjs to evalute this function in build time.
export async function PUT() {
  try {
    const ret = await sendRcon("Info");
    return Response.json(ret);
  } catch (err) {
    return Response.json({
      error: (err as Error)?.message || err,
    });
  }
}

export async function POST(res: Request) {
  const body = await getBody(res);
  try {
    const { command, params } = body;
    const data = await sendRcon(command, params as any);
    return Response.json({ ok: true, data });
  } catch (err) {
    return Response.json({
      error: (err as Error)?.message || err,
    });
  }
}
