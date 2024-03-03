"use client";

import React, { useEffect, useState } from "react";
import styles from "./index.module.sass";
import { Player } from "@/util/player";
import { Spin, Table, Tag, Typography } from "antd";
import { Group } from "@/util/group";
import Guild from "@/components/Guild";
import { useRouter } from "next/navigation";

const { Title, Paragraph } = Typography;

export default function Component(props: any) {
  const { guildId } = props;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [groups, setGroups] = useState<undefined | Group[]>(undefined);
  const [players, setPlayers] = useState<Player[] | undefined>();
  const [curGroup, setCurGroup] = useState<undefined | Group>();
  useEffect(() => {
    fetch("/api/group", {
      method: "GET",
      next: {
        revalidate: 0,
      },
    })
      .then((res) => res.json())
      .catch((res) => res.status === 401 && router.replace("/"))
      .then((data) => {
        data.sort((a: Group, b: Group) => {
          if (a.guild_name === "Unnamed Guild") return 1;
          if (b.guild_name === "Unnamed Guild") return -1;
          return a?.guild_name?.localeCompare?.(b.guild_name);
        });
        setGroups(data);
        if (guildId) {
          const corres = data.find(
            (datum: Group) => datum.group_id === guildId
          );
          setCurGroup(corres);
        } else {
          setCurGroup(data?.[0]);
        }
      });
  }, []);
  useEffect(() => {
    if (!curGroup) {
      return;
    }
    setLoading(true);
    fetch(`/api/players?isPlayer=true&groupId=${curGroup?.group_id}`, {
      next: {
        revalidate: 0,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        setPlayers(data);
      })
      .catch((res) => res.status === 401 && router.replace("/"))
      .finally(() => {
        setLoading(false);
      });
  }, [curGroup]);

  return (
    <Spin spinning={!groups} style={{ background: "transparent" }}>
      <Title level={2}> Guilds</Title>
      <div className={styles.container}>
        <div className={styles.leftPlayers}>
          {groups?.map((group) => {
            const {
              group_id: groupId,
              group_type: groupType,
              group_name: groupName,
              guild_name: guildName,
              base_camp_level,
            } = group;
            return (
              <Guild
                selected={curGroup === group}
                onClick={() => {
                  setCurGroup(group);
                }}
                groupName={guildName}
                groupType={groupType}
                groupLevel={base_camp_level}
              />
            );
          })}
        </div>
        <div className={styles.right}>
          {curGroup && (
            <div>
              <div>{curGroup.group_name}</div>
              <Paragraph copyable>{curGroup.group_id}</Paragraph>
            </div>
          )}
          <Table
            dataSource={players}
            loading={loading}
            pagination={{
              pageSize: 50,
              showPrevNextJumpers: true,
              showQuickJumper: true,
              showSizeChanger: true,
              total: players?.length,
              showLessItems: true,
            }}
            onRow={(record) => {
              return {
                onClick: () => {
                  router.push(`/app/players/${record.player_uid}`);
                },
              };
            }}
            columns={[
              {
                title: "Guild Name",
                dataIndex: "nick_name",
              },
              {
                title: "Level",
                dataIndex: "level",
                render: (data) => <Tag color="gold">{data}</Tag>,
              },
              {
                title: "status",
                dataIndex: "status",
              },
            ]}
          />
        </div>
      </div>
    </Spin>
  );
}
