import React from "react";
import { Badge, Tag } from "antd";
import cx from "classnames";
import styles from "./index.module.sass";
import dayjs from "dayjs";
import Level from "../Level";

interface Props {
  nick_name: string;
  level?: string | number;
  online?: boolean;
  lastLoginAt: string;
  selected?: boolean;
  status?: string;
  onClick?: React.MouseEventHandler;
}

export default function Person(props: Props) {
  const {
    onClick,
    selected,
    nick_name,
    level = 0,
    online,
    status,
    lastLoginAt,
  } = props;

  let d = "";
  try {
    d = dayjs(lastLoginAt).format("MMM-DD HH:mm");
    d = d === "Invalid Date" ? "" : d;
  } catch {}
  return (
    <div
      className={cx(
        styles.container,
        { [styles.banned]: status === "blacklist" },
        { "text-gray-400": status === "blacklist" },
        "text-black bg-gray-300 border-transparent hover:bg-white hover:border-blue-400",
        {
          "bg-white border-blue-400": selected,
        }
      )}
      onClick={onClick}
    >
      <div className={styles.heading}>
        <div className={styles.lv}>
          <Level level={+level} />
        </div>
        <div className={styles.nick}>{nick_name}</div>
        {online && (
          <Tag className={styles.tag} color="green">
            {online}
          </Tag>
        )}
      </div>
      {d && <div className={cx('text-gray-500', styles.logintime)}>Last Seen At: {d}</div>}
    </div>
  );
}
