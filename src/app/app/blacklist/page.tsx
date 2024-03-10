"use client";
import i18n, { getLang } from "@/util/i18n";
import React, { useEffect, useState } from "react";
import { Spin, Table, Typography } from "antd";
import { Player } from "@/util/player";
import PlayerInfo from "@/components/PlayerInfo";
import Person from "@/components/Person";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  return (
    <div>
      <Title level={2}>{i18n("blacklist_title")}</Title>
      <div>
        <Table
          onRow={(record) => ({
            onClick: () => {
              router.push(
                `/app/players/${record?.player_uid}?lang=${getLang()}`
              );
            },
          })}
          columns={[
            {
              title: "Player",
              dataIndex: "",
              render: (_, record) => {
                const { last_login_at: lastLoginAt } = record;
                return <Person lastLoginAt={lastLoginAt} {...record} />;
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
