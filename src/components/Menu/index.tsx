"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MehOutlined, TeamOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import cx from "classnames";
import styles from "./index.module.sass";
import PalworldVersion from "../PalworldVer";
import BroadCast from "../Broadcast";
import { motion } from "framer-motion";
import LampContainer from "../LampContainer";

export default function Menu() {
  const [open, setOpen] = useState(false);
  const menu = (
    <div className={cx("flex-1 overflow-auto py-4", styles.menu)}>
      <nav className="grid gap-1">
        <Link
          className="flex items-center h-10 px-4 rounded-md text-sm font-medium transition-colors hover:bg-gray-100 dark:bg-gray-800 hover:text-gray-900 dark:text-gray-50"
          href="/app/players"
        >
          <MehOutlined className="mr-2 h-4 w-4" />
          Players
        </Link>
        <Link
          className="flex items-center h-10 px-4 rounded-md text-sm font-medium transition-colors hover:bg-gray-100 dark:bg-gray-800 hover:text-gray-900 dark:text-gray-50"
          href="/app/guilds"
        >
          <TeamOutlined className="mr-2 h-4 w-4" />
          Guilds
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
              className="flex items-center gap-2 text-xl font-semibold"
              href="/app/players"
            >
              Palworld Admin Panel
            </Link>
          </div>
          {menu}
        </div>
      </div>
      <Button
        type="link"
        className={styles.openButton}
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
        </div>
      </Drawer>
    </div>
  );
}
