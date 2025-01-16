/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Add a rule for .glb and .hdr files
    config.module.rules.push({
      test: /\.(glb|hdr|exr|gltf|fbx)$/,
      type: 'asset/resource',
    });

    return config;
  },

};

export default nextConfig;
