import { isNil } from "lodash";
import getClient from "./getDbClient";
import omit from "lodash/omit";

export interface Player {
  id: number;
  steam_id: string;
  player_id: string;
  player_uid: string;
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
  nickname: string;
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
      steam_id: "steam_id",
      player_id: "player_id",
      player_uid: "game_character.player_uid",
      exp: "exp",
      level: "level",
      instance_id: "game_character.instance_id",
      group_id: "game_group.group_id",
      last_login_at: "last_login_at",
      hp: "hp",
      mp: "mp",
      max_hp: "max_hp",
      max_mp: "max_mp",
      nickname: "nickname",
      is_player: "is_player",
      status: "status",
    });
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
  const old = await getPlayerByPlayerUId(player.player_id);
  if (old) {
    await client("game_character")
      .where("id", old.id)
      .update(omit(player, ["player_uid", "instance_id", "player_id", "id"]));
  } else {
    await client("game_character").insert(player);
  }
}
