import React from "react";
import { Badge, Tag } from "antd";
import cx from "classnames";
import styles from "./index.module.sass";
import dayjs from "dayjs";

interface Props {
  selected?: boolean;
  groupName: string;
  groupType?: string;
  groupLevel?: number;
  onClick?: React.MouseEventHandler;
}

export default function Guild(props: Props) {
  const { onClick, groupName, groupType, selected, groupLevel } = props;
  let typeDisplay = "";
  switch (groupType) {
    case "EPalGroupType::Guild":
      typeDisplay = "Guild";
      break;
    default:
      typeDisplay = groupType?.replace("EPalGroupType::", "") || "";
      break;
  }
  return (
    <div
      className={cx(styles.container, {
        [styles.selected]: selected,
      })}
      onClick={onClick}
    >
      <div className={styles.heading}>
        {groupLevel && (
          <div className={styles.level}>
            Lv. {groupLevel}
          </div>
        )}
        <div className={styles.nick}>{groupName || "- -"}</div>
        {/* {groupType && (
          <Tag className={styles.tag} color="gold">
            {typeDisplay}
          </Tag>
        )} */}
      </div>
    </div>
  );
}
