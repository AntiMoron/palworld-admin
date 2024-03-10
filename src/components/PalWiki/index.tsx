import { Col, Row } from "antd";
import cx from "classnames";
import React from "react";
import all from "@/components/PalData/charNoMap";
import PalAvatar from "../PalAvatar";
import i18n from "@/util/i18n";
import styles from "./index.module.sass";
import { Player } from "@/util/player";

function PalWho(props: { has?: boolean; name: string; character: string }) {
  const { has, name, character } = props;
  return (
    <div className={styles.who}>
      <PalAvatar
        character={character}
        name={name}
        className={cx({
          [styles.no]: !has,
        })}
      />
      <div className="text-gray-400 text-sm text-center">{name}</div>
    </div>
  );
}

interface Props {
  className?: string;
  style?: React.CSSProperties;
  curPals?: Player[];
}

export default function PalWiki(props: Props) {
  const { className, style, curPals } = props;
  const characterIds = new Set(
    curPals?.map((a) => a?.character_id?.toLowerCase()?.replace("boss_", "")) ||
      []
  );
  return (
    <div className={cx(styles.container, className)} style={style}>
      <Row gutter={[48, 48]}>
        {Object.keys(all)
          .filter((a) => Boolean(all[a]))
          .sort((a, b) => {
            return Number(all[a].match(/\d+/)) - Number(all[b].match(/\d+/));
          })
          .map((key) => {
            const value = all[key];
            console.log(characterIds, key.toLowerCase());
            return (
              <Col span={8}>
                <PalWho
                  has={characterIds.has(key.toLowerCase())}
                  name={`No. ${value}` + i18n(`pal.[${value}]`)}
                  character={key}
                />
              </Col>
            );
          })}
      </Row>
    </div>
  );
}
