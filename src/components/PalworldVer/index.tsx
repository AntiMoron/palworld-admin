"use client";
import React, { useEffect, useState } from "react";
import styles from "./index.module.sass";

interface Props {}

export default function PalworldVersion(props: Props) {
  const [info, setInfo] = useState<{ ver: string; name: string } | undefined>(
    undefined
  );
  useEffect(() => {
    fetch("/api/rcon/info", {
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
    <div className={`flex-1 ${styles.header}`}>
      <span className={styles.serverInfo}>
        {info?.ver || ""} {info?.name || ""}
      </span>
    </div>
  );
}
