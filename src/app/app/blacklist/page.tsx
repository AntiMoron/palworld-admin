"use client";
import i18n from "@/util/i18n";
import React, { useEffect, useState } from "react";
import { Spin, Table, Typography } from "antd";
import { Player } from "@/util/player";
import PlayerInfo from "@/components/PlayerInfo";
import Person from "@/components/Person";

const { Title } = Typography;

export default function BlackList() {
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState<undefined | Player[]>();
  useEffect(() => {
    fetch(`/api/players?status=blacklist`, {
      method: "GET",
      next: {
        revalidate: 0,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <Title level={2}>{i18n("blacklist_title")}</Title>
      <div>
        <Table
          columns={[
            {
              title: "",
              dataIndex: "",
              render: (data, record) => {
                return <Person lastLoginAt={""} {...record} />;
              },
            },
          ]}
          dataSource={players}
          loading={loading}
        />
      </div>
    </div>
  );
}
