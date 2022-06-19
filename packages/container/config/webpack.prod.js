const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const domain = process.env.PRODUCTION_DOMAIN

const prodConfig = {
	mode: 'production',
	output: {
		filename: '[name].[contenthash].js',
		publicPath: '/container/build/',
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'container',
			remotes: {
				marketing: `marketing@${domain}/marketing/build/remoteEntry.js`,
				auth: `auth@${domain}/auth/build/remoteEntry.js`,
				dashboard: `dashboard@${domain}/dashboard/build/remoteEntry.js`,
			},
			shared: packageJson.dependencies,
		}),
	],
}

module.exports = merge(commonConfig, prodConfig)
