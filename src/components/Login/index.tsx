"use client";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import sha256 from "sha256";
import styles from "./index.module.sass";
import i18n from "@/util/i18n";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <div className={styles.border}>
      <h1 className={styles.h1}>{i18n("palworld_admin_panel")}</h1>
      <Form
        className={styles.form}
        onFinish={(values: any) => {
          if (loading) {
            return;
          }
          const { password } = values;
          setLoading(true);
          fetch("/api/auth", {
            method: "POST",
            body: JSON.stringify({
              password: sha256(password),
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.error) {
                message.error(data.error);
                return;
              }
              router.replace("/app/players");
            })
            .finally(() => {
              setLoading(false);
            });
        }}
        layout="vertical"
      >
        <Form.Item
          rules={[{ required: true }]}
          name="password"
          label={<span style={{ color: "#fff" }}>Admin Panel Password</span>}
        >
          <Input type="password" placeholder="admin panel password" />
        </Form.Item>
        <Button loading={loading} type="primary" htmlType="submit">
          {i18n("login_btn")}
        </Button>
      </Form>
    </div>
  );
}
