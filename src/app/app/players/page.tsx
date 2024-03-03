"use client";

import React, { useEffect, useState } from "react";
import styles from "./index.module.sass";
import Person from "@/components/Person";
import { Player } from "@/util/player";
import { Button, Result, Spin, Table, Tag, Typography } from "antd";
import PalFeature from "@/components/PalFeature";
import PlayerInfo from "@/components/PlayerInfo";
import cx from "classnames";
import { useRouter } from "next/navigation";
import formatNumber from "@/util/formatNumber";
import PalData from "@/components/PalData";

const { Title, Paragraph } = Typography;

export default function Component(props: any) {
  const { playerUid } = props;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
      })
      .finally(() => {
        setLoading(false);
      });
  }, [curPlayer, page]);
  if (Array.isArray(players) && players.length === 0) {
    return (
      <Result
        title="No Players' Data Found"
        subTitle="Please wait next sync."
      />
    );
  }
  return (
    <Spin spinning={!players} style={{ background: "transparent" }}>
      <Title level={2}>{"Players"}</Title>
      <div
        className={cx(styles.container, {
          [styles.playerDetail]: Boolean(playerUid),
        })}
      >
        <div className={styles.leftPlayers}>
          {players?.map((datum) => {
            const { last_login_at: lastLoginAt } = datum;
            return (
              <Person
                selected={datum === curPlayer}
                onClick={() => {
                  const isMobile = window.innerWidth < 640;
                  if (isMobile) {
                    router.push(`/app/players/${datum?.player_uid}`);
                    return;
                  }
                  setPage(1);
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
            loading={loading}
            scroll={{ x: 1400 }}
            columns={[
              {
                dataIndex: "nick_name",
                title: "Name",
                fixed: true,
                width: 150,
                sorter: (a, b) => a.level - b.level,
                render: (_, record) => <PalData {...record} />,
              },
              {
                dataIndex: "craft_speed",
                title: "Craft Speed",
                width: 100,
                render: (data) => formatNumber(data || 0) || "- -",
                sorter: (a, b) => (a.craft_speed || 0) - (b.craft_speed || 0),
              },
              {
                dataIndex: "max_hp",
                title: "Max HP",
                width: 100,
                render: (data) => formatNumber((data || 0) / 1000.0) || "- -",
                sorter: (a, b) => a.max_hp - b.max_hp,
              },
              {
                dataIndex: "talent_hp",
                title: "Talendt HP",
                width: 100,
                render: (data) => formatNumber(data || 0) || "- -",
                sorter: (a, b) => a.talent_hp - b.talent_hp,
              },
              {
                dataIndex: "talent_melee",
                title: "Talent Melee",
                width: 100,
                render: (data) => formatNumber(data || 0) || "- -",
                sorter: (a, b) => a.talent_melee - b.talent_melee,
              },
              {
                dataIndex: "talent_shot",
                title: "Talent Shot",
                width: 100,
                render: (data) => formatNumber(data || 0) || "- -",
                sorter: (a, b) => a.talent_shot - b.talent_shot,
              },
              {
                dataIndex: "talent_defense",
                title: "Talent Defense",
                width: 100,
                render: (data) => formatNumber(data || 0) || "- -",
                sorter: (a, b) => a.talent_defense - b.talent_defense,
              },
              {
                dataIndex: "craft_speed",
                title: "Craft Speed",
                width: 100,
                render: (data) => formatNumber(data || 0) || "- -",
                sorter: (a, b) => (a.craft_speed || 0) - (b.craft_speed || 0),
              },
              {
                dataIndex: "passive_skill_list",
                title: "Labels",
                width: 300,
                render: (data) => {
                  if (!data) {
                    return "- -";
                  }
                  return (
                    <div>
                      {data?.split(",").map((tag: string) => {
                        if (!tag) {
                          return "- -";
                        }
                        return <PalFeature feature={tag} />;
                      })}
                    </div>
                  );
                },
                sorter: (a, b) => a.max_mp - b.max_mp,
              },
            ]}
            pagination={{
              current: page,
              onChange: (page, pageSize) => {
                setPage(page);
              },
            }}
          />
        </div>
      </div>
    </Spin>
  );
}
