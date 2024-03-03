import React from "react";
import { Badge, Tag } from "antd";
import cx from "classnames";
import styles from "./index.module.sass";
import dayjs from "dayjs";

interface Props {
  nick_name: string;
  level?: string | number;
  online?: boolean;
  lastLoginAt: string;
  selected?: boolean;
  onClick?: React.MouseEventHandler;
}

export default function Person(props: Props) {
  const { onClick, selected, nick_name, level, online, lastLoginAt } = props;

  let d = "";
  try {
    d = dayjs(lastLoginAt).format("MMM-DD HH:mm");
    d = d === "Invalid Date" ? "" : d;
  } catch {}
  return (
    <div
      className={cx(styles.container, {
        [styles.selected]: selected,
      })}
      onClick={onClick}
    >
      <div className={styles.heading}>
        <div className={styles.nick}>{nick_name}</div>
        <Tag className={styles.tag} color="gold">
          Level: {level || "0"}
        </Tag>
        {online && (
          <Tag className={styles.tag} color="green">
            {online}
          </Tag>
        )}
      </div>
      {d && (
        <div>
          <Tag color="purple">{d}</Tag>
        </div>
      )}
    </div>
  );
}
