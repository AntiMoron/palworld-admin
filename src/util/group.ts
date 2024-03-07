import dayjs from "dayjs";
import getClient from "./getDbClient";
import omit from "lodash/omit";
import log from "./log";

export interface Group {
  id: number;
  group_id: string;
  group_name: string;
  group_type: string;
  guild_name: string;
  base_camp_level?: number;
  base_ids?: string[];
}

export async function getGroups() {
  const client = getClient();
  const groups = await client("game_group").select();
  return (groups as Group[])?.map((item) => {
    const baseIds = (item.base_ids as any as string)?.split(",");
    item.base_ids = baseIds;
    return item;
  });
}

export async function getGroupByGroupId(groupId: string) {
  const client = getClient();
  const group = await client("game_group")
    .select()
    .where("group_id", groupId)
    .then((r: Group[]) => r?.[0]);
  return group as Group;
}

export async function saveGroup(group: Omit<Group, "id">) {
  const { group_id } = group;
  const client = getClient();
  const old = await getGroupByGroupId(group_id);
  (group as any).base_ids = group.base_ids?.join(",");
  if (old) {
    await client("game_group")
      .where("id", old.id)
      .update(
        omit(group, ["group_id", "individual_character_handle_ids", "players"])
      );
  } else {
    const sql = client("game_group").insert(
      omit(group, ["individual_character_handle_ids", "players"])
    );
    log("debug", sql.toQuery());
    await sql;
  }
}

export async function saveGroupRelation(instance_id: string, group_id: string) {
  const client = getClient();
  const old = await client("char_group_rel")
    .where("group_id", group_id)
    .where("instance_id", instance_id)
    .then((r: Group[]) => r?.[0]);
  if (old) {
    return;
  } else {
    await client("char_group_rel").insert({
      instance_id,
      group_id,
      created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    });
  }
}
