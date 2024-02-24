import fetchSavedFile from "@/util/fetchSavedFile";
import { getGroupByGroupId, saveGroup, saveGroupRelation } from "@/util/group";
import { savePlayer, getAllPlayers, getPlayerByPlayerUId } from "@/util/player";
import dayjs from "dayjs";
import path from "path";

export async function GET() {
  try {
    const fileDir = process.env.SAVE_FILE_DIR || "";
    if (!fileDir) {
      throw new Error("SAVE_FILE_DIR is not set");
    }
    const filename = path.join(process.cwd(), fileDir);
    console.log("start to read " + filename);
    const data = await fetchSavedFile(filename);
    console.log("finish to read");
    const { pals, playerInstanceIdMap, players, guilds } = data;
    // sync players
    for (const player of players) {
      console.log(player);
      try {
        await savePlayer({
          instance_id: player.instanceId,
          player_id: player.playerUid,
          player_uid: player.playerUid,
          steam_id: player.instanceId,
          nickname: player.NickName,
          level: player.Level,
          exp: player.Exp,
          hp: player.HP,
          is_player: 1,
          max_hp: player.MaxHP,
          mp: player.MP,
          max_mp: player.MaxSP,
          status: "normal",
          talent_hp: player.Talent_HP,
          talent_melee: player.Talent_Melee,
          talent_shot: player.Talent_Shot,
          talent_defense: player.Talent_Defense,
          passive_skill_list: player.PassiveSkillList.join(","),
          craft_speed: player.CraftSpeed,
          last_login_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        });
      } catch (err) {
        console.log("saveplayer error: ", err);
      }
    }

    for (const pal of pals) {
      try {
        await savePlayer({
          instance_id: pal.instanceId,
          player_id: pal.playerUid,
          is_player: 0,
          player_uid: pal.playerUid,
          steam_id: pal.instanceId,
          nickname: pal.CharacterID,
          level: pal.Level,
          exp: pal.Exp,
          hp: pal.HP,
          max_hp: pal.MaxHP,
          mp: pal.MP,
          max_mp: pal.MaxSP,
          status: "normal",
          craft_speed: pal.CraftSpeed,
          talent_hp: pal.Talent_HP,
          talent_melee: pal.Talent_Melee,
          talent_shot: pal.Talent_Shot,
          craft_speeds: pal.CraftSpeeds.map((item) => {
            const { rank, workSuitability } = item;
            return `${workSuitability}|${rank}`;
          }).join(","),
          talent_defense: pal.Talent_Defense,
          passive_skill_list: pal.PassiveSkillList.join(","),
          last_login_at: "2024-02-24 13:02:02",
          owner_player_uid: pal.OwnerPlayerUId,
        });
      } catch (err) {
        console.log("savepals error: ", err);
      }
    }
    // sync guilds
    for (const group of guilds) {
      try {
        const { individual_character_handle_ids: relations = [], group_id } =
          group;
        await saveGroup(group);
        for (const rel of relations) {
          const { instance_id } = rel;
          // console.log("bind", instance_id, group_id);
          await saveGroupRelation(instance_id, group_id);
        }
      } catch (err) {
        console.log("savegroup error: ", err);
      }
    }
    return Response.json({ OK: true });
  } catch (err) {
    console.log(err);
    return Response.json({
      error: (err as Error)?.message || err,
    });
  }
}
