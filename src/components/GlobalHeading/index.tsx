import React from "react";
import cx from "classnames";
import styles from "./index.module.sass";
import PalworldVersion from "../PalworldVer";
import BroadCast from "../Broadcast";

export default function GlobalHeading() {
  return (
    <div className={cx("flex flex-col", styles.main)}>
      <div className="flex w-full h-[60px] items-center border-b">
        <div className="w-full">
          <PalworldVersion />
        </div>
        <BroadCast />
      </div>
    </div>
  );
}
