import React from "react";
import cx from "classnames";
import PalAvatar from "../PalAvatar";
import { Player } from "@/util/player";
import styles from "./index.module.sass";
import ExpBar from "../ExpBar";

interface Props extends Player {
  className?: string;
  style?: React.CSSProperties;
}

export default function PalData(props: Props) {
  const { className, style, nick_name: nickname, character_id, gender, level, exp } = props;
  const isFemail = gender === "Female";
  return (
    <div className={className} style={style}>
      <div className={styles.basic}>
        <PalAvatar name={nickname} character={character_id} />
        <div className={styles.lv}>Lv. {level}</div>
        <div className={cx(styles.gender, { [styles.fem]: isFemail })}>
          {isFemail ? "♀" : "♂"}
        </div>
        <span className={styles.name}>{nickname.replace("BOSS_", "")}</span>
      </div>
      <div>
        <ExpBar exp={exp} />
      </div>
    </div>
  );
}
