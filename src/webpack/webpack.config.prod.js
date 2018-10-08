const path = require("path");
const webpack = require("webpack");
const ManifestPlugin = require('webpack-manifest-plugin');
const paths = require('./paths');

module.exports = {
    mode: "production",
    entry: [
        'babel-polyfill',
        paths.entryPointIndexTsx
    ],
    output: {
        path: paths.prodDistOutputFoler,
        publicPath: "/dist/",
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".ts", ".js", ".jsx", ".tsx"]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    },
    plugins: [
        new ManifestPlugin({
            publicPath:'/dist/'
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader",
                        query: {
                            configFile: paths.tsConfigFile,
                        },
                    }
                ]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.css$/,
                include: [ paths.semanticUiCssFolder, paths.notusFolder ],
                loaders: ["style-loader", "css-loader"],
            },
            {
                test: /\.(jpe?g|gif|png|svg)$/i,
                loader: "url-loader?limit=10000",
            },
            {
                test: /\.json$/,
                loader: "json-loader",
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader",
                include: [ paths.semanticUiCssFolder ]
            },
            {
                test: /\.(woff|woff2)$/,
                loader: "url-loader?prefix=font/&limit=5000",
                include: [ paths.semanticUiCssFolder ]
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/octet-stream",
                include: [ paths.semanticUiCssFolder ]
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=image/svg+xml",
                include: [ paths.semanticUiCssFolder ]
            }
        ]
    }
};
