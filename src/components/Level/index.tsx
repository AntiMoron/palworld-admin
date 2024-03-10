import React from "react";
import cx from "classnames";
import { Tag } from "antd";
import styles from "./index.module.sass";

interface Props {
  className?: string;
  style?: React.CSSProperties;
  level?: number;
}

export default function Level(props: Props) {
  const { className, level, style } = props;
  if (!level) {
    return null;
  }
  return (
    <Tag className={cx(styles.lvTag, className)} style={style} color="lime">
      Lv. {level}
    </Tag>
  );
}
