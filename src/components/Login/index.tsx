"use client";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import sha256 from "sha256";

export default function Login() {
  const router = useRouter();
  return (
    <div>
      <Form
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
              router.push("/app/players");
            });
        }}
        layout="vertical"
      >
        <Form.Item
          rules={[{ required: true }]}
          name="password"
          label="Admin Panel Password"
        >
          <Input placeholder="admin panel password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
