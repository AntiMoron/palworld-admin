"use client";

import React, { useCallback, useEffect, useState } from "react";
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
import ReturnMark from "@/components/ReturnMark";
import i18n, { getLang } from "@/util/i18n";

const { Title, Paragraph } = Typography;

export default function Component(props: any) {
  const { playerUid } = props;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState<undefined | Player[]>(undefined);
  const [pals, setPals] = useState<undefined | Player[]>(undefined);
  const [curPlayer, setCurPlayer] = useState<undefined | Player>();
  const router = useRouter();
  const getPlayers = useCallback(() => {
    fetch("/api/players?isPlayer=true", {
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
    getPlayers();
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
        if (pals.error) {
          router.replace("/");
          return;
        }
        setPals(pals);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [curPlayer]);
  if (Array.isArray(players) && players.length === 0) {
    return <Result title={i18n("no_player")} subTitle={i18n("wait_sync")} />;
  }
  return (
    <Spin spinning={!players} style={{ background: "transparent" }}>
      <Title level={2}>{i18n("player_title")}</Title>
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
                    router.push(
                      `/app/players/${datum?.player_uid}?lang=${getLang()}`
                    );
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
            <>
              <PlayerInfo
                onAction={() => {
                  getPlayers();
                }}
                className={styles.playerInfo}
                {...curPlayer}
                onViewGuild={() => {
                  router.push(
                    `/app/guilds/${
                      (curPlayer as any)?.group_id
                    }?lang=${getLang()}`
                  );
                }}
              />
              <div className={styles.palsCount}>
                {i18n("pal_total_owned_cnt", {
                  cnt: pals?.length || "- -",
                })}
              </div>
            </>
          )}
          <Table
            dataSource={pals}
            loading={loading}
            scroll={{ x: 1400 }}
            onRow={(record) => {
              return {
                onClick: () => {
                  router.push(
                    `/app/pal/${record.instance_id}?lang=${getLang()}`
                  );
                },
              };
            }}
            columns={[
              {
                dataIndex: "nick_name",
                title: i18n("name_col"),
                fixed: true,
                width: 150,
                sorter: (a, b) => a.level - b.level,
                render: (_, record) => <PalData {...record} />,
              },
              {
                dataIndex: "craft_speed",
                title: i18n("craft_speed_col"),
                width: 100,
                render: (data) => formatNumber(data || 0) || "- -",
                sorter: (a, b) => (a.craft_speed || 0) - (b.craft_speed || 0),
              },
              {
                dataIndex: "max_hp",
                title: i18n("hp"),
                width: 100,
                render: (data) => formatNumber((data || 0) / 1000.0) || "- -",
                sorter: (a, b) => a.max_hp - b.max_hp,
              },
              {
                dataIndex: "talent_hp",
                title: i18n("talent_hp_col"),
                width: 100,
                render: (data) => formatNumber(data || 0) || "- -",
                sorter: (a, b) => a.talent_hp - b.talent_hp,
              },
              {
                dataIndex: "talent_melee",
                title: i18n("talent_melee_col"),
                width: 100,
                render: (data) => formatNumber(data || 0) || "- -",
                sorter: (a, b) => a.talent_melee - b.talent_melee,
              },
              {
                dataIndex: "talent_shot",
                title: i18n("talent_shot_col"),
                width: 100,
                render: (data) => formatNumber(data || 0) || "- -",
                sorter: (a, b) => a.talent_shot - b.talent_shot,
              },
              {
                dataIndex: "talent_defense",
                title: i18n("talent_defense_col"),
                width: 100,
                render: (data) => formatNumber(data || 0) || "- -",
                sorter: (a, b) => a.talent_defense - b.talent_defense,
              },
              {
                dataIndex: "passive_skill_list",
                title: i18n("passive_skill_list_col"),
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
