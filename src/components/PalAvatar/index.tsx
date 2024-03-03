import { Avatar } from "antd";
import React from "react";
import styles from "./index.module.sass";

interface Props {
  name: string;
}

export default function PalAvatar(props: Props) {
  const { name } = props;
  const isBoss = name.match(/BOSS_/);
  const originName = name.replace(/BOSS_/g, "");
  const localUrl = `/pal/T_${originName}_icon_normal.png`;
  return (
    <div className={styles.icon}>
      <Avatar src={localUrl} />
      {isBoss && <img className={styles.boss} src="/pal/alpha_pal.png" loading="lazy" />}
    </div>
  );
}
