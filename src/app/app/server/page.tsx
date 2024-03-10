"use client";
import React, { useEffect, useState } from "react";
import i18n, { getLang } from "@/util/i18n";
import { Button, Spin, Table, Typography } from "antd";

const { Title } = Typography;

export default function ServerManage() {
  return (
    <div>
      <Title level={2}>{i18n("server_title")}</Title>
      <div>
        <iframe
          src={`http://localhost:9090/graph?g0.expr=rate(node_cpu_seconds_total%7Bmode%3D"system"%7D%5B1m%5D)&g0.tab=0&g0.stacked=0&g0.show_exemplars=0&g0.range_input=1h&g1.expr=node_filesystem_avail_bytes&g1.tab=0&g1.stacked=0&g1.show_exemplars=0&g1.range_input=1h&g2.expr=rate(node_network_receive_bytes_total%5B1m%5D)&g2.tab=0&g2.stacked=0&g2.show_exemplars=0&g2.range_input=1h`}
        />
      </div>
    </div>
  );
}
