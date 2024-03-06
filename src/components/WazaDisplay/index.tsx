import { Tag, Tooltip } from "antd";
import cx from "classnames";
import React from "react";
import { CheckOutlined } from "@ant-design/icons";
import styles from "./index.module.sass";

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
      color={'green'}
      className={cx({ [styles.equiped]: equiped }, className)}
      style={style}
      icon={<CheckOutlined />}
    >
      {display}
    </Tag>
  );
  if (equiped) {
    return <Tooltip title="This waza is equiped">{content}</Tooltip>;
  }
  return content;
}
