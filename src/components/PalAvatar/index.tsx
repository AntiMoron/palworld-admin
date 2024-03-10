import { Avatar, Tooltip } from "antd";
import React from "react";
import styles from "./index.module.sass";

interface Props {
  character?: string;
  name: string;
}

export default function PalAvatar(props: Props) {
  const { character } = props;
  const bs = /[Bb][Oo][Ss][Ss]_/;
  const isBoss = character?.match(bs);
  const originName = character?.replace(bs, "");
  const localUrl = `/pal/T_${originName}_icon_normal.png`;
  return (
    <Tooltip title={isBoss ? "This Pal is an Alpha Pal" : ""}>
      <div className={styles.icon}>
        <Avatar src={localUrl} key={localUrl} />
        {isBoss && (
          <img
            className={styles.boss}
            src="/pal/alpha_pal.png"
            loading="lazy"
          />
        )}
      </div>
    </Tooltip>
  );
}
