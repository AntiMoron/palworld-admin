import React from "react";
import cx from "classnames";
import styles from "./index.module.sass";
import Level from "../Level";

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
      className={cx(
        styles.container,
        "text-black bg-gray-300 border-transparent hover:bg-white hover:border-blue-400",
        {
          "bg-white border-blue-400": selected,
        }
      )}
      onClick={onClick}
    >
      <div className={styles.heading}>
        {groupLevel && <Level className={styles.level} level={groupLevel} />}
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
