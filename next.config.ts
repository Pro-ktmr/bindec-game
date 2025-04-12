import type { NextConfig } from "next";

const IS_DEV = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  output: "export",
  basePath: IS_DEV ? "" : "/bindec-game",
};

export default nextConfig;
