import Rcon from "rcon";

function sendRcon(cmd: string, params?: Record<string, string | number>) {
  return new Promise((resolve, reject) => {
    const location = process.env.RCON_LOCATION || "";
    const pwd = process.env.RCON_ADMIN_PASSWORD || "";
    if (!pwd) {
      throw new Error("No RCON_ADMIN_PASSWORD provided");
    }
    const [host, port] = location.split(":");
    const conn = new Rcon(host, port, pwd);
    conn
      .on("connect", () => {
        // console.log("connect");
      })
      .on("auth", () => {
        switch (cmd) {
          case "Shutdown":
            {
              const { Seconds, MessageText } = params || {};
              conn.send(`${cmd} ${Seconds} ${MessageText}`);
            }
            break;
          case "Broadcast":
            {
              const { MessageText } = params || {};
              conn.send(`${cmd} ${MessageText}`);
            }
            break;
          case "KickPlayer":
          case "BanPlayer":
          case "TeleportToPlayer":
          case "TeleportToMe":
            const { SteamID } = params || {};
            conn.send(`${cmd} ${SteamID || ''}`);
            break;
          default:
            conn.send(cmd);
            break;
        }
      });
    conn.on("server", (ret: string) => {
      console.log("server", ret);
      if (!resolve) {
        return;
      }
      switch (cmd) {
        case "Help":
        case "Info":
          {
            const [full, ver, name] =
              ret.match(/Welcome to Pal Server\[(.*)\] (.*)/) || [];
            resolve({
              full,
              ver,
              name,
            });
          }
          break;
        case "ShowPlayers":
          const lines = ret.split("\n");
          const [tableKeys, rows] = lines;
          const keys = tableKeys.split(",").map((a) => a.trim());
          console.log(keys, rows);
          resolve(rows);
          break;
        case "Broadcast":
          resolve(ret);
          break;
        case "KickPlayer":
          resolve(ret);
          break;
        case "BanPlayer":
          resolve(ret);
          break;
        case "TeleportToPlayer":
          resolve(ret);
          break;
        case "TeleportToMe":
          resolve(ret);
          break;
        case "DoExit":
          resolve(ret);
          break;
        case "Shutdown":
          resolve(ret);
          break;
        default:
          if (reject) {
            reject(new Error("Unknown Command"));
          }
          break;
      }
    });
    conn.on("end", () => {
      conn.disconnect();
    });
    conn.on("response", (ret) => {
      if (resolve) {
        resolve(ret);
      }
    });
    conn.on("result", (ret) => {
      console.log(ret);
    });

    conn.on("error", (ret) => {
      console.log(ret);
      if (reject) {
        reject(ret);
      }
    });
    conn.connect();
  });
}

export async function GET() {
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
