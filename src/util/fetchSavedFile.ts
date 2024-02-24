import fs from "fs";
import JSONStream from "jsonstream";

function getWorkTypeValue(craftSpeedsValue: any) {
  if (!craftSpeedsValue) {
    return [];
  }
  const values = craftSpeedsValue.values || [];
  return values.map((value: any) => {
    const { WorkSuitability, Rank } = value;
    const rank = unwrapValue(Rank);
    const workSuitability = unwrapValue(WorkSuitability).replace(
      "EPalWorkSuitability::",
      ""
    );
    return {
      rank,
      workSuitability,
    };
  });
}

interface Character {
  instanceId: string;
  playerUid: string;

  Level: number;
  Exp: number;
  NickName: string;
  HP: number;
  FullStomach: number;
  PhysicalHealth: number;
  IsPlayer?: boolean;
  MaxHP: number;
  ShieldMaxHP: number;
  MaxSP: number;
  GotStatusPointList: any[];
  CharacterID: string; // e.g. 'Boar'
  Gender: string; // e.g. 'EPalGenderType::Female'
  EquipWaza: string; // e.g. 'EPalGenderType::Female'
  MasteredWaza: string; // e.g. 'EPalGenderType::Female'
  Talent_HP: number;
  Talent_Melee: number;
  Talent_Shot: number;
  Talent_Defense: number;
  PassiveSkillList: any;
  MP: number;
  OwnedTime: number;
  OwnerPlayerUId: string;
  OldOwnerPlayerUIds?: string[];
  CraftSpeed: number;
  CraftSpeeds: any[]; // 各种属性
  EquipItemContainerId?: number;
  SlotID?: string;
  SlotIndex?: string;
}

function unwrapValue(data: any) {
  if (typeof data !== "object") {
    return data;
  }
  if (Array.isArray(data)) {
    return data;
  }
  const value = data && data.value;
  return unwrapValue(value);
}

export default function fetchSavedFile(fileDir: string) {
  return new Promise<{
    playerInstanceIdMap: Record<string, Character>;
    players: Character[];
    pals: Character[];
    guilds: any[];
    WorkSaveData: any;
    BaseCampSaveData: any;
    CharacterContainerSaveData: any;
  }>((resolve, reject) => {
    const stream = fs.createReadStream(fileDir);
    stream.pipe(JSONStream.parse(undefined)).on("data", (data) => {
      const worldSaveData = data.properties.worldSaveData.value;
      try {
        const {
          CharacterSaveParameterMap,
          WorkSaveData,
          BaseCampSaveData,
          GroupSaveDataMap,
          CharacterContainerSaveData,
        } = worldSaveData;
        const characters = CharacterSaveParameterMap.value.map((item: any) => {
          const key = item.key;
          const playerUid = key.PlayerUId.value;
          const instanceId = key.InstanceId.value;

          const params = item.value.RawData.value.object.SaveParameter.value;
          const {
            Level,
            Exp,
            NickName,
            HP,
            FullStomach,
            PhysicalHealth,
            IsPlayer,
            MaxHP,
            ShieldMaxHP,
            MaxSP,
            GotStatusPointList,
            CharacterID,
            Gender,
            EquipWaza,
            MasteredWaza,
            Talent_HP,
            Talent_Melee,
            Talent_Shot,
            Talent_Defense,
            PassiveSkillList,
            MP,
            OwnedTime,
            OwnerPlayerUId,
            OldOwnerPlayerUIds,
            CraftSpeed,
            CraftSpeeds, // 各种属性
            EquipItemContainerId,
            SlotID,
            SlotIndex,
          } = params;
          if (PassiveSkillList?.value) {
            console.log(PassiveSkillList.value?.values);
          }
          return {
            playerUid,
            instanceId,
            Level: unwrapValue(Level),
            Exp: unwrapValue(Exp),
            NickName: unwrapValue(NickName),
            HP: unwrapValue(HP),
            FullStomach: unwrapValue(FullStomach),
            PhysicalHealth: unwrapValue(PhysicalHealth),
            IsPlayer: unwrapValue(IsPlayer),
            MaxHP: unwrapValue(MaxHP),
            ShieldMaxHP: unwrapValue(ShieldMaxHP),
            MaxSP: unwrapValue(MaxSP),
            GotStatusPointList: unwrapValue(GotStatusPointList),
            CharacterID: unwrapValue(CharacterID),
            Gender: unwrapValue(Gender),
            EquipWaza: unwrapValue(EquipWaza),
            MasteredWaza: unwrapValue(MasteredWaza),
            Talent_HP: unwrapValue(Talent_HP),
            Talent_Melee: unwrapValue(Talent_Melee),
            Talent_Shot: unwrapValue(Talent_Shot),
            Talent_Defense: unwrapValue(Talent_Defense),
            PassiveSkillList: PassiveSkillList?.value?.values || [],
            CraftSpeeds: getWorkTypeValue(CraftSpeeds.value),
            MP: unwrapValue(MP),
            OwnedTime: unwrapValue(OwnedTime),
            OwnerPlayerUId: unwrapValue(OwnerPlayerUId),
            OldOwnerPlayerUIds: unwrapValue(OldOwnerPlayerUIds),
            CraftSpeed: unwrapValue(CraftSpeed),
            EquipItemContainerId: unwrapValue(EquipItemContainerId),
            SlotID: unwrapValue(SlotID),
            SlotIndex: unwrapValue(SlotIndex),
          } as Character;
        });
        const players = characters.filter((item: any) => item.IsPlayer);
        const pals = characters.filter((item: any) => !item.IsPlayer);
        const playerInstanceIdMap = players.reduce(
          (pre: any, cur: Character) => {
            pre[cur.instanceId] = cur;
            return pre;
          },
          {} as Record<string, Character>
        );

        const guilds = GroupSaveDataMap.value
          .filter((item: any) => {
            const value = item.value;
            if (!value) {
              return false;
            }
            if (!value.GroupType) {
              console.log(item);
              return;
            }
            try {
              return value.GroupType.value.value === "EPalGroupType::Guild";
            } catch {
              return false;
            }
          })
          .map((a: any) => {
            const value = a.value.RawData.value;
            const {
              group_type,
              group_id,
              group_name,
              individual_character_handle_ids,
            } = value;
            return {
              group_type,
              group_id,
              group_name,
              individual_character_handle_ids,
            };
          });
        if (resolve) {
          resolve({
            playerInstanceIdMap,
            players,
            pals,
            guilds,
            WorkSaveData,
            BaseCampSaveData,
            CharacterContainerSaveData,
          });
        }
      } catch (err) {
        if (reject) {
          reject(err);
        }
      }
    });
  });
}
