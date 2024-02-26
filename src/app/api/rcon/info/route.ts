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

function getBody(res: Request): Promise<Record<string, string>> {
  return new Promise((resolve, reject) => {
    const data = res.body?.getReader();
    data?.read().then((res) => {
      const data = res.value?.toString();
      if (!data) {
        reject(new Error("No Data"));
        return;
      }
      const obj = JSON.parse(data);
      console.log(obj);
      if (resolve) {
        resolve(obj);
      }
    });
  });
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
