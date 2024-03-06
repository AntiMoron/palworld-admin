"use client";

import React, { useEffect, useState } from "react";
import styles from "./index.module.sass";
import { Spin, Tag } from "antd";
import { Player } from "@/util/player";
import PalData from "@/components/PalData";
import WazaDisplay from "@/components/WazaDisplay";

export default function PalDetail(props: any) {
  const { slug: instanceId } = props.params || {};
  const [loading, setLoading] = useState(false);
  const [detailData, setDetailData] = useState<Player | undefined>();
  useEffect(() => {
    setLoading(true);
    fetch(`/api/players?instanceId=${instanceId || ""}&isPlayer=false`, {
      next: {
        revalidate: 0,
      },
    })
      .then((res) => res.json())
      .then((res: Player[]) => {
        setDetailData(res?.[0]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [instanceId]);
  const {
    mastered_waza = "",
    equip_waza = "",
    craft_speeds,
    craft_speed,
    passive_skill_list,
    hp,
    mp,
    max_hp,
    max_mp,
  } = detailData || {};
  // they can use
  const masteredWaza = mastered_waza.split(",").filter(Boolean);
  // currently they are using
  const equipWaza = equip_waza
    .split(",")
    .filter(Boolean)
    .reduce((pre, cur) => {
      pre[cur] = true;
      return pre;
    }, {} as Record<string, boolean>);
  return (
    <Spin spinning={loading}>
      <div className={styles.container}>
        {detailData && <PalData size="large" {...detailData} />}
      </div>
      <div>
        {masteredWaza?.map((waza: string) => {
          return <WazaDisplay name={waza} equiped={equipWaza[waza]} />;
        })}
      </div>
    </Spin>
  );
}
