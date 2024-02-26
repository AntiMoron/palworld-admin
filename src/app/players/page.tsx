"use client";

import React, { useEffect, useState } from "react";
import styles from "./index.module.sass";
import Person from "@/components/Person";
import { Player } from "@/util/player";
import { Button, Spin, Table, Tag, Typography } from "antd";
import PalAvatar from "@/components/PalAvatar";
import PalFeature from "@/components/PalFeature";
import PlayerInfo from "@/components/PlayerInfo";
import { useRouter } from "next/navigation";

const { Title, Paragraph } = Typography;

export default function Component(props: any) {
  const { playerUid } = props;
  const [players, setPlayers] = useState<undefined | Player[]>(undefined);
  const [pals, setPals] = useState<undefined | Player[]>(undefined);
  const [curPlayer, setCurPlayer] = useState<undefined | Player>();
  const router = useRouter();
  useEffect(() => {
    fetch("/api/players?isPlayer=true", {
      next: {
        revalidate: 0,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data);
        if (playerUid) {
          const player = data.find((p: Player) => p.player_uid === playerUid);
          setCurPlayer(player);
        } else {
          setCurPlayer(data?.[0]);
        }
      });
  }, []);
  useEffect(() => {
    if (!curPlayer) {
      return;
    }
    fetch(
      `/api/players?ownerId=${curPlayer?.player_uid || ""}&isPlayer=false`,
      {
        next: {
          revalidate: 0,
        },
      }
    )
      .then((res) => res.json())
      .then((pals) => {
        setPals(pals);
      });
  }, [curPlayer]);
  return (
    <Spin spinning={!players} style={{ background: "transparent" }}>
      <Title level={2}> Players</Title>
      <div className={styles.container}>
        <div className={styles.leftPlayers}>
          {players?.map((datum) => {
            const {
              player_id,
              steam_id,
              id,
              nickname,
              last_login_at: lastLoginAt,
              status,
            } = datum;
            return (
              <Person
                selected={datum === curPlayer}
                onClick={() => {
                  setCurPlayer(datum);
                }}
                {...datum}
                lastLoginAt={lastLoginAt}
              />
            );
          })}
        </div>
        <div className={styles.right}>
          {curPlayer && (
            <PlayerInfo
              {...curPlayer}
              onViewGuild={() => {
                router.push(`/guilds/${(curPlayer as any)?.group_id}`);
              }}
            />
          )}
          <Table
            dataSource={pals}
            loading={pals === undefined}
            columns={[
              {
                dataIndex: "nickname",
                sorter: (a, b) => a.nickname.localeCompare(b.nickname),
                title: "Name",
                width: 220,
                render: (data) => (
                  <div>
                    <PalAvatar name={data} />
                    <span style={{ marginLeft: 8 }}>
                      {data.replace("BOSS_", "")}
                    </span>
                  </div>
                ),
              },
              {
                dataIndex: "level",
                title: "Level",
                render: (data) => <Tag color="gold">{data || 0}</Tag>,
                sorter: (a, b) => a.level - b.level,
              },
              {
                dataIndex: "craft_speed",
                title: "Craft Speed",
                render: (data) => data || 0,
                sorter: (a, b) => (a.craft_speed || 0) - (b.craft_speed || 0),
              },
              {
                dataIndex: "max_hp",
                title: "Max HP",
                render: (data) => data || 0,
                sorter: (a, b) => a.max_hp - b.max_hp,
              },
              {
                dataIndex: "talent_hp",
                title: "Talendt HP",
                render: (data) => data || 0,
                sorter: (a, b) => a.talent_hp - b.talent_hp,
              },
              {
                dataIndex: "talent_melee",
                title: "Talent Melee",
                render: (data) => data || 0,
                sorter: (a, b) => a.talent_melee - b.talent_melee,
              },
              {
                dataIndex: "talent_shot",
                title: "Talent Shot",
                render: (data) => data || 0,
                sorter: (a, b) => a.talent_shot - b.talent_shot,
              },
              {
                dataIndex: "talent_defense",
                title: "Talent Defense",
                render: (data) => data || 0,
                sorter: (a, b) => a.talent_defense - b.talent_defense,
              },
              {
                dataIndex: "passive_skill_list",
                title: "Labels",
                render: (data) => {
                  if (!data) {
                    return "- -";
                  }
                  return data?.split(",").map((tag: string) => {
                    if (!tag) {
                      return "- -";
                    }
                    return <PalFeature feature={tag} />;
                  });
                },
                sorter: (a, b) => a.max_mp - b.max_mp,
              },
            ]}
          />
        </div>
      </div>
    </Spin>
  );
}
