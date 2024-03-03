import cx from "classnames";
import { Player } from "@/util/player";
import React from "react";
import { Progress } from "antd";

// https://www.reddit.com/r/Palworld/comments/19fbr4m/who_have_1_list_of_exp_for_every_level_or_how/
const expLevelTable = {
  "1": 8,
  "2": 30,
  "3": 98,
  "4": 180,
  "5": 278,
  "6": 394,
  "7": 536,
  "8": 705,
  "9": 908,
  "10": 1153,
  "11": 1444,
  "12": 1795,
  "13": 2216,
  "14": 2721,
  "15": 3329,
  "16": 4055,
  "17": 4928,
  "18": 5976,
  "19": 7233,
  "20": 8743,
  "21": 10552,
  "22": 12725,
  "23": 15332,
  "24": 18459,
  "25": 22215,
  "26": 26719,
  "27": 32125,
  "28": 38611,
  "29": 46396,
  "30": 55737,
  "31": 66947,
  "32": 80398,
  "33": 96540,
  "34": 115908,
  "35": 139154,
  "36": 167046,
  "37": 200517,
  "38": 240683,
  "39": 288881,
  "40": 346719,
  "41": 416125,
  "42": 499413,
  "43": 599357,
  "44": 719290,
  "45": 863210,
  "46": 1035914,
  "47": 1243159,
  "48": 1491853,
  "49": 1790285,
  "50": 99999999,
} as Record<string, number>;

const levels = Object.keys(expLevelTable);
const exps = levels.map((a) => expLevelTable["" + a] || 0);

interface Props extends Pick<Player, "exp"> {
  className?: string;
  style?: React.CSSProperties;
}

export default function ExpBar(props: Props) {
  const { className, style, exp } = props;
  const nextLev = exps.findIndex((barrel) => exp < barrel);
  const prevLev = exps.findLastIndex((barrel) => exp >= barrel);
  const prevBar = exps[prevLev];
  const nextBar = exps[nextLev];
  const perc = ((exp - prevBar) / (nextBar - prevBar)) * 100;
  return (
    <div style={style} className={className}>
      <Progress showInfo={false} percent={perc} /> Exp. {exp}→{nextBar}
    </div>
  );
}
