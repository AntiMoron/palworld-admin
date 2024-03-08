import React from "react";
import cx from "classnames";
import PalAvatar from "../PalAvatar";
import { Player } from "@/util/player";
import styles from "./index.module.sass";
import ExpBar from "../ExpBar";
import formatNumber from "@/util/formatNumber";
import i18n from "@/util/i18n";
import charNoMap from "./charNoMap";

interface Props extends Player {
  className?: string;
  style?: React.CSSProperties;
  size?: "normal" | "large";
}

const works = [
  "EmitFlame", // Kindling
  "Watering", // Watering
  "Seeding", // Planting
  "GenerateElectricity", // Generate Electricity
  "Handcraft", // Handiwork
  "Collection", // Gathering
  "Deforest", // Lumbering
  "Mining", // Mining
  "ProductMedicine", // Medicine Production
  "Cool", // Cooling
  "Transport", // Transporting
  "MonsterFarm", // Farming
  "OilExtraction", // Oil Extraction
];

const attributes = [
  {
    name: "HP",
    index: "max_hp",
    color: "#2ecc71",
    handler: (data: any) => formatNumber((data || 0) / 1000.0),
  },
  { name: "MP", index: "max_mp", color: "#3498db" },
  { name: "ATK", index: "talent_melee", color: "#e74c3c" },
  { name: "SHOT", index: "talent_shot", color: "#9b59b6" },
  { name: "DEF", index: "talent_defense", color: "#34495e" },
];

export default function PalData(props: Props) {
  const {
    className,
    style,
    nick_name: nickname,
    character_id,
    gender,
    level,
    exp,
    size,
    craft_speeds = "",
  } = props;
  const crafts = craft_speeds
    ?.split(",")
    .map((item) => item.split("|"))
    .reduce((acc, [type, value]) => {
      acc[type] = +value || 0;
      return acc;
    }, {} as Record<string, number>);
  const isAlphaBoss = nickname?.match(/[Bb][Oo][Ss][Ss]_/);
  const nickname2 = isAlphaBoss ? nickname?.replace("BOSS_", "") : nickname;
  const isSpecialName = nickname !== character_id;
  const isFemail = gender === "Female";
  console.log(character_id);
  let palName = i18n(
    `pal.[${charNoMap[character_id?.replace(/[Bb][Oo][Ss][Ss]_/, "")] || -1}]`
  );
  if (palName.indexOf("-1") >= 0) {
    palName = character_id.replace(/[Bb][Oo][Ss][Ss]_/, "");
  }
  const displayName = isSpecialName ? nickname2 : palName;
  return (
    <div
      className={cx(
        {
          [styles.large]: size === "large",
        },
        className
      )}
      style={style}
    >
      <div className={styles.basic}>
        <PalAvatar name={nickname} character={character_id} />
        <div className={styles.lv}>Lv. {level}</div>
        <div className={cx(styles.gender, { [styles.fem]: isFemail })}>
          {isFemail ? "♀" : "♂"}
        </div>
        <span className={styles.name}>{displayName}</span>
      </div>
      <div className={styles.exp}>
        <ExpBar exp={exp} />
      </div>
      <div className={styles.workIcons}>
        {works.map((work) => {
          if (size !== "large" && !crafts[work]) {
            return null;
          }
          return (
            <div
              className={cx(styles.workIcon, {
                [styles.ok]: crafts[work] > 0,
              })}
            >
              <img src={`/pal/workability/${work}.png`} alt={work} />
              {crafts[work] > 0 && (
                <span className={styles.value}>{crafts[work]}</span>
              )}
            </div>
          );
        })}
      </div>
      {size === "large" && (
        <div className={styles.attribute}>
          {attributes.map((attribute) => {
            const { name, index, color, handler } = attribute;
            let value = (props as any)[index];
            if (handler) {
              value = handler(value);
            }
            return (
              <div className={styles.attr}>
                <div className={styles.attr_name} style={{ color }}>
                  {name}
                </div>
                <div>{value || "- -"}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
