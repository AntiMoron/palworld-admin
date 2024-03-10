"use client";
import React, { CSSProperties, useMemo } from "react";
import cx from "classnames";
import styles from "./index.module.sass";
import { Select } from "antd";

interface Props {
  className?: string;
  style?: CSSProperties;
  base_ids?: string[];
  onChange?: (baseId: string) => void;
  value?: string;
}

export default function GroupBase(props: Props) {
  const { className, style, base_ids: baseIds, value, onChange } = props;

  const bases = useMemo(() => {}, [baseIds]);
  return (
    <div className={cx(className)} style={style}>
      <Select
        value={value}
        onChange={onChange}
        options={baseIds?.map((id, idx) => {
          return {
            value: id,
            label: `据点 ${idx}`,
          };
        })}
      ></Select>
    </div>
  );
}
