import i18n from "@/util/i18n";
import { Tag } from "antd";
import React from "react";

interface Props {
  feature: string;
}

export default function PalFeature(props: Props) {
  const { feature } = props;
  const display = i18n(`label.[${feature}].[0]`);
  const posNeg = +i18n(`label.[${feature}].[1]`) || 0;
  return (
    <Tag color={posNeg > 0 ? "yellow" : "red"}>
      {display} {posNeg}
    </Tag>
  );
}
