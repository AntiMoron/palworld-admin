"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MehOutlined,
  TeamOutlined,
  MenuOutlined,
  ClusterOutlined,
  AudioMutedOutlined,
} from "@ant-design/icons";
import { Button, Drawer } from "antd";
import cx from "classnames";
import styles from "./index.module.sass";
import PalworldVersion from "../PalworldVer";
import BroadCast from "../Broadcast";
import Language from "../Language";
import i18n, { setLang } from "@/util/i18n";
import { useSearchParams } from "next/navigation";

export default function Menu() {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const lang = searchParams?.get("lang") || "en";
  setLang(lang);
  const menu = (
    <div className={cx("flex-1 overflow-auto py-4", styles.menu)}>
      <nav className="grid gap-1">
        <Link
          className="flex items-center h-10 px-4 rounded-md text-sm font-medium transition-colors bg-transparent text-black hover:bg-gray-100 hover:text-gray-900"
          href={`/app/players?lang=${lang}`}
        >
          <MehOutlined className="mr-2 h-4 w-4" />
          {i18n("player_title")}
        </Link>
        <Link
          className="flex items-center h-10 px-4 rounded-md text-sm font-medium transition-colors bg-transparent text-black hover:bg-gray-100 hover:text-gray-900"
          href={`/app/guilds?lang=${lang}`}
        >
          <TeamOutlined className="mr-2 h-4 w-4" />
          {i18n("guild_title")}
        </Link>
        <Link
          className="flex items-center h-10 px-4 rounded-md text-sm font-medium transition-colors bg-transparent text-black hover:bg-gray-100 hover:text-gray-900"
          href={`/app/blacklist?lang=${lang}`}
        >
          <AudioMutedOutlined className="mr-2 h-4 w-4" />
          {i18n("blacklist_title")}
        </Link>
        <Link
          className="flex items-center h-10 px-4 rounded-md text-sm font-medium transition-colors bg-transparent text-black hover:bg-gray-100 hover:text-gray-900"
          href={`/app/server?lang=${lang}`}
        >
          <ClusterOutlined className="mr-2 h-4 w-4" />
          {i18n("server_title")}
        </Link>
      </nav>
    </div>
  );
  return (
    <div className={styles.container}>
      <div className="flex flex-col border-r bg-gray-100/40 dark:bg-gray-800/40">
        <div className={styles.lg}>
          <div className="flex h-[60px] items-center">
            <Link
              className="flex items-center gap-2 text-xl font-semibold px-6 bg-transparent text-black"
              href={`/app/players?lang=${lang}`}
            >
              {i18n("palworld_admin_panel")}
            </Link>
          </div>
          {menu}
        </div>
      </div>
      <Button
        type="link"
        className={cx("text-black", styles.openButton)}
        onClick={() => {
          setOpen(true);
        }}
      >
        <MenuOutlined />
      </Button>
      <Drawer
        maskClosable
        placement="left"
        styles={{
          header: { display: "none" },
          body: {},
          content: { padding: "none", width: "80vw" },
        }}
        classNames={{
          body: "bg-gray-100 text-black",
        }}
        closeIcon={null}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        {menu}
        <hr />
        <div className="grid gap-1 py-6">
          <PalworldVersion className="w-full" />
          <BroadCast />
          <Language />
        </div>
      </Drawer>
    </div>
  );
}
