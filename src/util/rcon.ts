import Rcon from "rcon";
import getConfig from "./getConfig";

export default function sendRcon(
  cmd: string,
  params?: Record<string, string | number>
) {
  return new Promise((resolve, reject) => {
    const { RCON_LOCATION = "", RCON_ADMIN_PASSWORD = "" } = getConfig();
    const location = RCON_LOCATION || "";
    const pwd = RCON_ADMIN_PASSWORD || "";
    if (!pwd) {
      throw new Error("No RCON_ADMIN_PASSWORD provided");
    }
    const [host, port] = location.split(":");
    console.log("RCON", { host, port, pwd, cmd, params });
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
            conn.send(`${cmd} ${SteamID || ""}`);
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
