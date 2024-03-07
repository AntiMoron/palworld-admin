import React from "react";
import Page from "../page";

export default function Component(props: any) {
  const { slug } = props.params || {};
  return <Page guildId={slug}></Page>;
}
