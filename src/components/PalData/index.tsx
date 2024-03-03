import React from "react";
import cx from "classnames";
import PalAvatar from "../PalAvatar";
import { Player } from "@/util/player";
import { Progress } from "antd";
import styles from "./index.module.sass";

interface Props extends Player {
  className?: string;
  style?: React.CSSProperties;
}

export default function PalData(props: Props) {
  const { className, style, nick_name: nickname, gender, level } = props;
  const isFemail = gender === "Femail";
  return (
    <div className={className} style={style}>
      <div className={styles.basic}>
        <PalAvatar name={nickname} />
        <div className={cx(styles.gender, { [styles.fem]: isFemail })}>
          {gender === "Femail" ? "♀" : "♂"}
        </div>
        <span className={styles.name}>{nickname.replace("BOSS_", "")}</span>
        <div className={styles.lv}>Lv. {level}</div>
      </div>
      <div>
        <Progress percent={50} strokeColor={"#f1c40f"} showInfo={false} />
      </div>
    </div>
  );
}
