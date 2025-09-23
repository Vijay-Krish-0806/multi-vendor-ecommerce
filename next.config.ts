import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // experimental: {
  //   browserDebugInfoInTerminal: true,
  // },
};

export default withPayload(nextConfig);
