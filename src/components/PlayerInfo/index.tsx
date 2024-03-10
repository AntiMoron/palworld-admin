import { Player } from "@/util/player";
import React from "react";
import cx from "classnames";
import { Typography, Button } from "antd";
import styles from "./index.module.sass";
import ExpBar from "../ExpBar";
import i18n from "@/util/i18n";
import Level from "../Level";

const { Paragraph } = Typography;

interface Props extends Player {
  className?: string;
  style?: React.CSSProperties;
  onViewGuild?: React.MouseEventHandler;
}

export default function PlayerInfo(props: Props) {
  const {
    className,
    style,
    onViewGuild,
    nick_name,
    player_uid,
    steam_id,
    exp,
    level,
    instance_id,
  } = props;
  return (
    <>
      <div className={cx(styles.playerInfo, className)} style={style}>
        <div className={styles.left}>
          <div>
            <Level level={level} />
            {nick_name}
          </div>
          <div className={styles.lower}>
            {player_uid && <Paragraph copyable>{player_uid}</Paragraph>}
            {steam_id && <Paragraph copyable>{steam_id}</Paragraph>}
          </div>
          <div>
            <ExpBar exp={exp} />
          </div>
        </div>
        <Button.Group>
          <Button type="link" onClick={onViewGuild}>
            {i18n("view_guild")}
          </Button>
          <Button type="link" onClick={() => {}}>
            踢出
          </Button>
          <Button
            type="link"
            onClick={() => {
              fetch(`/api/players/action`, {
                next: {
                  revalidate: 0,
                },
                method: "POST",
                body: JSON.stringify({
                  instanceId: instance_id,
                  action: "ban",
                }),
              });
            }}
          >
            封禁
          </Button>
        </Button.Group>
      </div>
      <div></div>
    </>
  );
}
