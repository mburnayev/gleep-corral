import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // Curiously enough, including this images scope would result in a peculiar `npm run build` error that wasn't very descriptive:
  //
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: '',
  //       port: '',
  //       pathname: '/**',
  //     },
  //   ],
  // },
  //
  // ```
  // TypeError: Expected a non-empty string
  //    at Array.map (<anonymous>)
  // ```
  //
  // ... and only after running `firebase deploy --debug` which spat out the previous error plus
  // Error: ENOENT: no such file or directory, open '/Users/.../GleepCorral/gleep-corral/.next/export-marker.json'
  // was I able to get more work done

	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
};

export default nextConfig;
