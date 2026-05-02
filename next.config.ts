import type { NextConfig } from "next";

const MAJORS_PLACEHOLDER_PATHS = [
  "/az/telebeler/bakalavr/ixtisaslar",
  "/az/telebeler/bakalavr/tedris-proqrami",
  "/az/telebeler/bakalavr/oyrenme-neticeleri",
  "/az/telebeler/magistratura/ixtisaslar",
  "/az/telebeler/magistratura/tedris-proqrami",
  "/en/students/bakalavr/specialties",
  "/en/students/bakalavr/tedris-proqrami",
  "/en/students/bakalavr/oyrenme-neticeleri",
  "/en/students/magistratura/specialties",
  "/en/students/magistratura/tedris-proqrami",
];

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return MAJORS_PLACEHOLDER_PATHS.map((source) => ({
      source,
      destination: "/aztu-updating.html",
      permanent: false,
    }));
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "api-aztu.karamshukurlu.site",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.aztu.edu.az",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.aztu.edu.az",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "api.aztu.edu.az",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
