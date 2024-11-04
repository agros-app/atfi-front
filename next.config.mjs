/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals.push("pino-pretty");
        return config;
      },
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'elbucke.s3.us-east-1.amazonaws.com'
          }
        ]
      }
};

export default nextConfig;
