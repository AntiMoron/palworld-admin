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

  const content = (
    <Tag
      color={"green"}
      className={cx({ [styles.equiped]: equiped }, className)}
      style={style}
      icon={equiped ? <CheckOutlined /> : null}
    >
      {display}
    </Tag>
  );
  if (equiped) {
    return <Tooltip title={i18n('waza_tooltip')}>{content}</Tooltip>;
  }
  return content;
}
