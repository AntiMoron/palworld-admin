import React from "react";
import { Player } from "@/util/player";
import cx from "classnames";
import { Progress } from "antd";
import styles from './index.module.sass'
import formatNumber from "@/util/formatNumber";

// https://www.reddit.com/r/Palworld/comments/19fbr4m/who_have_1_list_of_exp_for_every_level_or_how/
const expLevelTable = {
  "1": 8,
  "2": 38,
  "3": 136,
  "4": 316,
  "5": 594,
  "6": 988,
  "7": 1524,
  "8": 2229,
  "9": 3137,
  "10": 4290,
  "11": 5734,
  "12": 7529,
  "13": 9745,
  "14": 12466,
  "15": 15795,
  "16": 19850,
  "17": 24778,
  "18": 30754,
  "19": 37987,
  "20": 46730,
  "21": 57282,
  "22": 70007,
  "23": 85339,
  "24": 103798,
  "25": 126013,
  "26": 152732,
  "27": 184857,
  "28": 223468,
  "29": 269864,
  "30": 325601,
  "31": 392548,
  "32": 472946,
  "33": 569486,
  "34": 685394,
  "35": 824548,
  "36": 991594,
  "37": 1192111,
  "38": 1432794,
  "39": 1721675,
  "40": 2068394,
  "41": 2484519,
  "42": 2983932,
  "43": 3583289,
  "44": 4302579,
  "45": 5165789,
  "46": 6201703,
  "47": 7444862,
  "48": 8936715,
  "49": 10727000,
  "50": 110726999,
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
    <div style={style} className={cx(styles.expBar, className)}>
      <Progress showInfo={false} percent={perc} /> <span className={styles.text}>Exp. {formatNumber(exp)}→
      {formatNumber(nextBar)}</span>
    </div>
  );
}
