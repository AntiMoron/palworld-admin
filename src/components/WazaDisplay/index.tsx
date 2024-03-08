import { Tag, Tooltip } from "antd";
import cx from "classnames";
import React from "react";
import { CheckOutlined } from "@ant-design/icons";
import styles from "./index.module.sass";
import i18n from "@/util/i18n";

interface Props {
  className?: string;
  style?: React.CSSProperties;
  name: string;
  equiped?: boolean;
}

export default function WazaDisplay(props: Props) {
  const { className, style, name, equiped } = props;
  const display = name.replace("EPalWazaID::", "");
  const data = i18n(`skill.[${display}].[0]`);
  const element = +i18n(`skill.[${display}].[1]`) || 0;
  const colors = [
    "volcano", // nothing
    "red", // fire
    "blue", // water
    "yellow", // thunder
    "green", // grass
    "magenta", // dark
    "purple", // dragon
    "brown", // ground
    "cyan", // ice
  ];
  const names = [
    "",
    "fire",
    "water",
    "thunder",
    "grass",
    "dark",
    "dragon",
    "ground",
    " ice",
  ];
  if (!data) {
    return null;
  }
  const content = (
    <Tag
      color={colors[element]}
      className={cx({ [styles.equiped]: equiped }, className)}
      style={style}
      icon={equiped ? <CheckOutlined /> : null}
    >
      {data}
    </Tag>
  );
  if (equiped) {
    return (
      <Tooltip
        title={
          i18n("waza_tooltip") + (names[element] ? ` [${names[element]}]` : "")
        }
      >
        {content}
      </Tooltip>
    );
  }
  return content;
}
