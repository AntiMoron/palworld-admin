"use client";

import React, { useEffect, useState } from "react";
import styles from "./index.module.sass";
import { Player } from "@/util/player";
import { Spin, Table, Tag, Typography, Result } from "antd";
import { Group } from "@/util/group";
import Guild from "@/components/Guild";
import { useRouter } from "next/navigation";
import cx from "classnames";
import i18n, { getLang } from "@/util/i18n";

const { Title, Paragraph } = Typography;

export default function Component(props: any) {
  const { guildId } = props;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [groups, setGroups] = useState<undefined | Group[]>(undefined);
  const [players, setPlayers] = useState<Player[] | undefined>();
  const [curGroup, setCurGroup] = useState<undefined | Group>();
  useEffect(() => {
    fetch(`/api/group?groupId=${guildId || ""}`, {
      method: "GET",
      next: {
        revalidate: 0,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          router.replace("/");
          return;
        }
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
  }, [guildId]);
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
        if (data.error) {
          router.replace("/");
          return;
        }
        setPlayers(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [curGroup]);

  if (Array.isArray(groups) && groups.length === 0) {
    return <Result title={i18n("no_guild")} subTitle={i18n("wait_sync")} />;
  }
  return (
    <Spin spinning={!groups} style={{ background: "transparent" }}>
      <Title level={2}> {i18n("guild_title")}</Title>
      <div
        className={cx(styles.container, {
          [styles.playerDetail]: Boolean(guildId),
        })}
      >
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
                  const isMobile = window.innerWidth < 640;
                  if (isMobile) {
                    router.push(
                      `/app/guilds/${group?.group_id}?lang=${getLang()}`
                    );
                    return;
                  }
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
              <div>{curGroup.guild_name || curGroup.group_name}</div>
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
                  router.push(
                    `/app/players/${record.player_uid}?lang=${getLang()}`
                  );
                },
              };
            }}
            columns={[
              {
                title: i18n("guild_name"),
                dataIndex: "nick_name",
              },
              {
                title: i18n("level"),
                dataIndex: "level",
                render: (data) => <Tag color="gold">{data}</Tag>,
              },
              {
                title: i18n("player_status"),
                dataIndex: "status",
              },
            ]}
          />
        </div>
      </div>
    </Spin>
  );
}
