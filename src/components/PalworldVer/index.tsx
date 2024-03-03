"use client";
import React, { useEffect, useState } from "react";
import cx from "classnames";
import styles from "./index.module.sass";

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export default function PalworldVersion(props: Props) {
  const { className, style } = props;
  const [info, setInfo] = useState<{ ver: string; name: string } | undefined>(
    undefined
  );
  useEffect(() => {
    fetch("/api/rcon/info", {
      method: "PUT",
      next: {
        revalidate: 0,
      },
    })
      .then((res) => res.json())
      .then((info) => {
        setInfo(info as any);
      });
  }, []);
  return (
    <div className={cx(`flex-1 ${styles.header}`, className)} style={style}>
      {info?.ver || ""} {info?.name || ""}
    </div>
  );
}
