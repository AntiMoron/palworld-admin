import { Avatar } from "antd";
import React from "react";

interface Props {
  name: string;
}

export default function PalAvatar(props: Props) {
  const { name } = props;
  const isBoss = name.match(/BOSS_/);
  const originName = name.replace(/BOSS_/g, "");
  const localUrl = `/pal/T_${originName}_icon_normal.png`;
  return <Avatar src={localUrl} />;
}
