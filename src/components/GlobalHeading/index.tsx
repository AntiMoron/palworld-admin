import React from "react";
import cx from "classnames";
import styles from "./index.module.sass";
import PalworldVersion from "../PalworldVer";
import BroadCast from "../Broadcast";
import Language from "../Language";

export default function GlobalHeading() {
  return (
    <div className={cx("flex flex-col", styles.main)}>
      <div className="flex w-full h-[60px] items-center border-b">
        <div className="w-full">
          <PalworldVersion />
        </div>
        <Language className="px-2"/>
        <BroadCast />
      </div>
    </div>
  );
}
