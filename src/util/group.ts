import dayjs from "dayjs";
import getClient from "./getDbClient";
import omit from "lodash/omit";

export interface Group {
  id: number;
  group_id: string;
  group_name: string;
  group_type: string;
  guild_name: string;
}

export async function getGroups() {
  const client = getClient();
  const groups = await client("game_group");
  return groups as Group[];
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
  if (old) {
    await client("game_group")
      .where("id", old.id)
      .update(
        omit(group, ["group_id", "individual_character_handle_ids", "players"])
      );
  } else {
    await client("game_group").insert(
      omit(group, ["individual_character_handle_ids", "players"])
    );
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
