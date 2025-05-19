/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "deims.org",
      "media.springernature.com"
      // add other domains if needed
    ],
  },
};

export default nextConfig;
