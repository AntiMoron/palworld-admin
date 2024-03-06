"use client";
import React, { useState } from "react";
import { FloatButton } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import styles from "./index.module.sass";
import { useInterval } from "ahooks";

export default function ReturnMark() {
  const [show, setShow] = useState(false);
  useInterval(() => {
    if (/^\/app\/\w+(\/{0,1})$/.test(window.location.pathname)) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, 1000);
  if (!show) {
    return null;
  }
  return (
    <FloatButton
      className={styles.btn}
      tooltip="Back to last page"
      shape="circle"
      onClick={() => {
        window.history.go(-1);
      }}
      icon={<ArrowLeftOutlined />}
    ></FloatButton>
  );
}
