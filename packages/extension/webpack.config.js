// Copyright 2019-2023 @polkadot/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0

const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-extension-manifest-plugin');

const { blake2AsHex } = require('@polkadot/util-crypto');

const pkgJson = require('./package.json');
const manifest = require('./manifest.json');

const EXT_NAME = manifest.short_name;

const packages = [
    "extension",
    'plutonication',
];

const entryPoints = {
    background: './src/background.ts',
    page: './src/page.ts',
    content: "./src/content.ts",
};

module.exports = {
    context: __dirname,
    devtool: false,
    entry: entryPoints,
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: 'html-loader',
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]',
                },
            },
        ]
    },
    output: {
        chunkFilename: '[name].js',
        filename: '[name].js',
        globalObject: '(typeof self !== \'undefined\' ? self : this)',
        path: path.join(__dirname, 'build')
    },
    performance: {
        hints: false
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                EXTENSION_PREFIX: JSON.stringify(process.env.EXTENSION_PREFIX || EXT_NAME),
                NODE_ENV: JSON.stringify('production'),
                PORT_PREFIX: JSON.stringify(blake2AsHex(JSON.stringify(manifest), 64))
            }
        }),
        new CopyPlugin({ patterns: [{ from: 'public' }] }),
        new ManifestPlugin({
            config: {
                base: manifest,
                extend: {
                    version: pkgJson.version.split('-')[0] // remove possible -beta.xx
                }
            }
        })
    ],
    resolve: {
        alias: packages.reduce((alias, p) => ({
            ...alias,
            [`@plutonication/${p}`]: path.resolve(__dirname, `../${p}/src`),
        }),),
        extensions: ['.ts', ".js", ".html", ".css"],
    },
    watch: false
};