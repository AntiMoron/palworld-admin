import { Tag } from "antd";
import React from "react";

interface Props {
  feature: string;
}

const matching: Record<string, string> = {
  PAL_ALLAttack_up1: "Good|Brave",
  PAL_ALLAttack_up2: "Good|Ferocious",
  CraftSpeed_up1: "Good|Serious",
  MoveSpeed_up_1: "Good|Nimble",
  MoveSpeed_up_2: "Good|Runner",
  MoveSpeed_up_3: "Good|Swift",

  PAL_Sanity_Down_1: "Good|Positive Thinker",
  PAL_Sanity_Down_2: "Good|Workaholic",
  PAL_Sanity_Up_2: "Bad|Sanity Up 2",
  PAL_FullStomach_Up_1: "Bad|Eat a lot 1",
  PAL_FullStomach_Up_2: "Bad|Eat a lot 2",

  ElementBoost_Earth_1_PAL: "Good|Power of Gaia",
  ElementBoost_Aqua_1_PAL: "Good|Hydromaniac",

  ElementResist_Dark_1_PAL: "Good|Cherry",
  ElementResist_Thunder_1_PAL: "Good|Insualted Body",
  ElementBoost_Leaf_1_PAL: 'Good|Leaf Element Up 1',
  PAL_oraora: "Good|Aggressive",
  PAL_sadist: "Good|Sadist",
  PAL_ALLAttack_down1: "Bad|Coward",
  TrainerWorkSpeed_UP_1: "Good|Trainer Work Up",
  ElementBoost_Ice_1_PAL: "Good|Cold Blood",
  ElementBoost_Thunder_1_PAL: "Good|Thunder Storm",
  TrainerATK_UP_1: "Good|Encouraging",
  CraftSpeed_down1: "Bad|Lazy",
  ElementResist_Normal_1_PAL: 'Good|Element Resist 1'
};

export default function PalFeature(props: Props) {
  const { feature } = props;
  const value = matching[feature] || "Good|" + feature;
  const [posNeg, display] = value.split("|");
  const color = feature;
  return <Tag color={posNeg === "Good" ? "green" : "red"}>{display}</Tag>;
}
