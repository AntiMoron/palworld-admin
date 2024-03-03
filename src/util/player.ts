import { isNil, pick } from "lodash";
import getClient from "./getDbClient";
import omit from "lodash/omit";

export interface Player {
  id: number;
  steam_id: string;
  player_uid: string;
  gender: string;
  exp: number;
  craft_speed?: number;
  level: number;
  is_player: number; // 0 | 1
  instance_id: string;
  last_login_at: string;
  hp: number;
  mp: number;
  max_hp: number;
  max_mp: number;
  nick_name: string;
  status: string;
  owner_time?: string;
  owner_player_uid?: string;
  talent_hp: number;
  talent_melee: number;
  talent_shot: number;
  talent_defense: number;
  passive_skill_list?: string;
  craft_speeds?: string;
}

export async function getPlayerByPlayerUId(playerUId: string) {
  const client = getClient();
  const items = await client("game_character")
    .select()
    .where("player_uid", playerUId)
    .where("is_player", 1);
  return items?.[0] as Player;
}

export async function getAllPlayers(filter?: {
  order?: "asc" | "desc";
  ownerId?: string;
  order_by?: "level" | "id" | "last_login_at";
  groupId?: string;
  isPlayer?: boolean;
}) {
  const client = getClient();
  const sql = client("game_character")
    .leftJoin(
      "char_group_rel",
      "char_group_rel.instance_id",
      "game_character.instance_id"
    )
    .leftJoin("game_group", "game_group.group_id", "char_group_rel.group_id")
    .select({
      id: "game_character.id",
      steam_id: "game_character.steam_id",
      player_uid: "game_character.player_uid",
      exp: "exp",
      gender: "gender",
      level: "level",
      instance_id: "game_character.instance_id",
      group_id: "game_group.group_id",
      last_login_at: "last_login_at",
      hp: "hp",
      mp: "mp",
      shield_max_hP: "shield_max_hP",
      craft_speed: "craft_speed",
      craft_speeds: "craft_speeds",
      mastered_waza: "mastered_waza",
      equip_waza: "equip_waza",
      max_hp: "max_hp",
      max_mp: "max_mp",
      max_sp: "max_sp",
      passive_skill_list: "passive_skill_list",
      talent_hp: "talent_hp",
      talent_melee: "talent_melee",
      talent_shot: "talent_shot",
      talent_defense: "talent_defense",
      nick_name: "game_character.nick_name",
      is_player: "is_player",
      status: "status",
    })
    .whereNot("game_character.level", 0);
  if (filter) {
    const { isPlayer, order, order_by, groupId, ownerId } = filter;
    if (order_by) {
      sql.orderBy(order_by, order || "desc");
    }
    if (ownerId) {
      sql.where("game_character.owner_player_uid", ownerId);
    }
    if (!isNil(isPlayer)) {
      sql.where("game_character.is_player", isPlayer ? 1 : 0);
    }
    if (groupId) {
      sql.where("game_group.group_id", groupId);
    }
  }
  const items = await sql;
  return items as Player[];
}

export async function savePlayer(player: Omit<Player, "id">) {
  const client = getClient();
  const old = await getPlayerByPlayerUId(player.player_uid);
  if (old) {
    await client("game_character")
      .where("id", old.id)
      .update(omit(player, ["player_uid", "instance_id", "player_uid", "id"]));
  } else {
    await client("game_character").insert(player);
  }
}

export function handleRawSavedPlayer(player: any): Player {
  const handled: any = pick(player, [
    "playerUid",
    "instanceId",
    "Level",
    "Exp",
    "NickName",
    "HP",
    "FullStomach",
    "PhysicalHealth",
    "IsPlayer",
    "MaxHP",
    "ShieldMaxHP",
    "CharacterID",
    "Gender",
    "EquipWaza",
    "MasteredWaza",
    "Talent_HP",
    "Talent_Melee",
    "Talent_Shot",
    "Talent_Defense",
    "PassiveSkillList",
    "CraftSpeeds",
    "MP",
    "OwnedTime",
    "OwnerPlayerUId",
    "CraftSpeed",
    "last_login_at",
  ]);
  handled.CraftSpeeds = (handled.CraftSpeeds || [])
    .map((item: any) => {
      const { rank, workSuitability } = item;
      return `${workSuitability}|${rank || 0}`;
    })
    .join(",");
  handled.Gender = handled.Gender?.value?.replace("EPalGenderType::", "");
  handled.EquipWaza = (handled.EquipWaza?.values || []).join(",");
  handled.MasteredWaza = (handled.MasteredWaza?.values || []).join(",");
  handled.PassiveSkillList = (handled.PassiveSkillList || []).join(",");
  for (const key in handled) {
    if (/[A-Z]/.test(key)) {
      const val = handled[key];
      delete handled[key];
      const snakeKey = key
        .replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`)
        .replace(/^_/, "")
        .replace(/_+/g, "_")
        .replace(/([msh])_p+/g, "$1p")
        .replace(/([i])_d+/g, "$1d")
        .replace(/u_id/g, "uid");
      handled[snakeKey] = val;
    }
  }
  handled.is_player = handled.isplayer ? 1 : 0;
  delete handled.isplayer;
  if (handled.character_id) {
    handled.nick_name = handled.nick_name || handled.character_id;
  }
  console.log(handled);
  return handled;
}
