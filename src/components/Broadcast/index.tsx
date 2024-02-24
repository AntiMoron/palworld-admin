"use client";

import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState } from "react";

export default function BroadCast() {
  const [showModal, setShowModal] = useState(false);
  const [form] = useForm();
  return (
    <>
      <Button
        onClick={() => {
          setShowModal(true);
        }}
      >
        BoardCast
      </Button>
      <Modal
        open={showModal}
        title="System Broadcast"
        footer={null}
        onCancel={() => {
          setShowModal(false);
        }}
      >
        <Form
          form={form}
          onFinish={(values) => {
            const { message } = values;
            // Palworld server not supporting space in messages yet.
            const compatible = message.replace(/\s+/g, "_");
            fetch("/api/schedule/sync/rcon", {
              method: "POST",
              body: JSON.stringify({
                command: "Broadcast",
                params: {
                  MessageText: compatible,
                },
              }),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((r) => r.json())
              .then(() => {
                form.setFieldsValue({ message: "" });
                setShowModal(false);
              });
          }}
        >
          <Form.Item name="message" rules={[{ required: true }]}>
            <Input placeholder="Your text." />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Send
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}