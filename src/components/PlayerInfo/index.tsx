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
  onAction?: (action: string) => void;
}

export default function PlayerInfo(props: Props) {
  const {
    className,
    style,
    onViewGuild,
    nick_name,
    player_uid,
    status,
    exp,
    level,
    instance_id,
    onAction,
  } = props;
  return (
    <>
      <div className={cx(styles.playerInfo, className)} style={style}>
        <div className={styles.left}>
          <div>
            <Level level={level} />
            <span
              className={cx({
                "text-gray-400": status === "blacklist",
                [styles.banned]: status === "blacklist",
              })}
            >
              {nick_name}
            </span>
            {status === "blacklist" && (
              <Tag style={{ marginLeft: 4 }} color="red">
                Banned
              </Tag>
            )}
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
      <Button.Group className="mb-4">
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
                    onAction?.("kick");
                  })
                  .catch((err: Error) => {
                    message.error(err?.message);
                  });
              },
            });
          }}
        >
          {i18n("kick")}
        </Button>
        <Button
          danger={status !== "blacklist"}
          onClick={() => {
            const action = status === "blacklist" ? "unban" : "ban";
            Modal.confirm({
              title: status === "blacklist" ? "Unban Player" : "Ban Player",
              content:
                status === "blacklist"
                  ? "you sure you want to unban this player?"
                  : "you sure you want to ban this player?",
              onOk: () => {
                fetch(`/api/players/action`, {
                  next: {
                    revalidate: 0,
                  },
                  method: "POST",
                  body: JSON.stringify({
                    instanceId: instance_id,
                    action,
                  }),
                })
                  .then(() => {
                    message.success("Done");
                    onAction?.(action);
                  })
                  .catch((err: Error) => {
                    message.error(err?.message);
                  });
              },
            });
          }}
        >
          {status !== "blacklist" ? i18n("ban") : i18n("unban")}
        </Button>
      </Button.Group>
    </>
  );
}
