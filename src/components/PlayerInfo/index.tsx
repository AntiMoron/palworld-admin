import { Player } from "@/util/player";
import React from "react";
import cx from "classnames";
import { Typography, Button, Tag, Tooltip, Modal, message } from "antd";
import styles from "./index.module.sass";
import ExpBar from "../ExpBar";
import i18n from "@/util/i18n";
import Level from "../Level";
import getDisplayPlayersUID from "@/util/getDisplayPlayerUID";

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
            {player_uid && (
              <Tooltip title="Can be used in the game to teleport (to)">
                <Tag color="blue" className={styles.uidTag}>
                  UID:
                  <Paragraph copyable className={styles.uid}>
                    {getDisplayPlayersUID(player_uid)}{" "}
                  </Paragraph>
                </Tag>
              </Tooltip>
            )}
          </div>
        </div>
        <div>
          <ExpBar exp={exp} />
        </div>
      </div>
      <Button.Group>
        <Button onClick={onViewGuild}>{i18n("view_guild")}</Button>
        <Button
          onClick={() => {
            Modal.confirm({
              title: "Kick Player",
              type: "warning",
              content: "Are you sure you want to kick this player?",
              onOk: () => {
                fetch(`/api/players/action`, {
                  next: {
                    revalidate: 0,
                  },
                  method: "POST",
                  body: JSON.stringify({
                    instanceId: instance_id,
                    action: "kick",
                  }),
                })
                  .then(() => {
                    message.success("Done");
                  })
                  .catch((err: Error) => {
                    message.error(err?.message);
                  });
              },
            });
          }}
        >
          Kick
        </Button>
        <Button
          danger
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
          Ban
        </Button>
      </Button.Group>
      <div></div>
    </>
  );
}
