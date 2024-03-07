import convTime from "@/util/convTime";
import fetchSavedFile from "@/util/fetchSavedFile";
import getConfig from "@/util/getConfig";
import getFileUtcTimeStamp from "@/util/getFileUtcTimeStamp";
import { saveGroup, saveGroupRelation } from "@/util/group";
import { handleRawSavedPlayer, savePlayer } from "@/util/player";
import runBash from "@/util/script";
import dayjs from "dayjs";
import { syncAuth } from "@/util/auth";
import { NextRequest } from "next/server";
import getSyncStats, { SyncStats } from "@/util/syncStats";
import { log } from "console";

export async function POST(req: NextRequest) {
  try {
    log("info", "triggered SaveFile: Level.sav sync");
    const config = getConfig();
    const fileDir = config.SAVE_FILE_DIR || "";
    const syncToken = req.headers.get("__sync_token");
    // check sync permission
    syncAuth(syncToken || "");
    log("info", "SAVE_FILE_DIR", config.SAVE_FILE_DIR);
    if (!fileDir) {
      throw new Error("SAVE_FILE_DIR is not set");
    }
    const files = await runBash(
      `find ${fileDir} -name 'Level.sav' -exec readlink -f {} \\;`
    );
    const filename = files.split("\n")?.[0];
    const fileUtc = getFileUtcTimeStamp(filename);
    log("info", "start to read " + filename);
    const status = getSyncStats();
    if (status === SyncStats.SYNCING) {
      throw new Error("Last sync not finished yet.");
    }
    const data = await fetchSavedFile(filename);
    log("info", "finish reading");
    const {
      pals,
      playerInstanceIdMap,
      realTimeTick,
      players,
      guilds = [],
    } = data;
    const playerLoginTimes = guilds
      .map((item) => ({
        player_uid: item.player_uid,
        last_online_real_time: item.player_info?.last_online_real_time || 0,
      }))
      .reduce((acc, cur) => {
        acc[cur.player_uid || ""] = cur.last_online_real_time;
        return acc;
      }, {} as any);
    log("debug", "playerLoginTimes", JSON.stringify(playerLoginTimes));
    // sync players
    for (const player of players) {
      log(
        "debug",
        player,
        convTime(
          playerLoginTimes[player.playerUid]?.last_online_real_time || 0,
          realTimeTick,
          fileUtc
        )
      );
      try {
        // console.log(player);
        await savePlayer(
          handleRawSavedPlayer({
            ...player,
            last_login_at: convTime(
              playerLoginTimes[player.playerUid]?.last_online_real_time || 0,
              realTimeTick,
              fileUtc
            ),
          })
        );
      } catch (err) {
        log("error", "saveplayer error: ", err);
      }
    }

    for (const pal of pals) {
      try {
        // console.log(pal);
        await savePlayer(
          handleRawSavedPlayer({
            ...pal,
            last_login_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          })
        );
      } catch (err) {
        log("error", "savepals error: ", err);
      }
    }
    // sync guilds
    for (const group of guilds) {
      try {
        // console.log(group);
        const { individual_character_handle_ids: relations = [], group_id } =
          group;
        await saveGroup(group);
        for (const rel of relations) {
          const { instance_id } = rel;
          // console.log("bind", instance_id, group_id);
          await saveGroupRelation(instance_id, group_id);
        }
      } catch (err) {
        log("error", "savegroup error: ", err);
      }
    }
    return Response.json({ OK: true });
  } catch (err) {
    log("error", err);
    return Response.json(
      {
        error: (err as Error)?.message || err,
      },
      {
        status: 400,
      }
    );
  }
}
