import { Player } from "@/util/player";
import React from "react";
import cx from "classnames";
import { Typography, Button } from "antd";
import styles from "./index.module.sass";

const { Paragraph } = Typography;

interface Props extends Player {
  className?: string;
  style?: React.CSSProperties;
  onViewGuild?: React.MouseEventHandler;
}

export default function PlayerInfo(props: Props) {
  const { className, style, onViewGuild, nick_name, player_uid, steam_id } =
    props;
  return (
    <>
      <div className={cx(styles.playerInfo, className)} style={style}>
        <div className={styles.left}>
          <div>{nick_name}</div>
          <div className={styles.lower}>
            {player_uid && <Paragraph copyable>{player_uid}</Paragraph>}
            {steam_id && <Paragraph copyable>{steam_id}</Paragraph>}
          </div>
        </div>
        <Button type="link" onClick={onViewGuild}>
          View his/her Guild
        </Button>
      </div>
      <div></div>
    </>
  );
}
