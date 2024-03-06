"use client";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import sha256 from "sha256";
import styles from "./index.module.sass";

export default function Login() {
  const router = useRouter();
  return (
    <div className={styles.border}>
      <h1 className={styles.h1}>Palworld Admin Panel</h1>
      <Form
        className={styles.form}
        onFinish={(values: any) => {
          const { password } = values;
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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
