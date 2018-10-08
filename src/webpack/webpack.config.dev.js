//@ts-check

const path = require("path");
const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const paths = require('./paths');

//** @type webpack.Configuration */

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: [
        'babel-polyfill',
        'react-hot-loader/patch',
        "webpack-hot-middleware/client",
        paths.entryPointIndexTsx
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        filename: "bundle.js",
        pathinfo: false
    },
    resolve: {
        extensions: [".ts", ".js", ".jsx", ".tsx"]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin({
            tslint: true,
            checkSyntacticErrors: true,
            tsconfig: paths.tsConfigFile,
            watch: ['./src/client', './src/common']
        }),
        new ForkTsCheckerNotifierWebpackPlugin({ title: 'TypeScript', excludeWarnings: true })
    ],
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
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: [
                    paths.clientFolder,
                    paths.commonFolder
                ],
                exclude: path.resolve(process.cwd(), 'node_modules'),
                use: [
                    { loader: 'cache-loader' },
                    {
                        loader: 'thread-loader',
                        options: {
                            // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                            workers: require('os').cpus().length - 1,
                        },
                    },
                    {
                        loader: "ts-loader",
                        query: {
                            happyPackMode: true,
                            configFile: paths.tsConfigFile,
                        },
                    }
                ]
            },
            {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader"],
                include: [ paths.semanticUiCssFolder, paths.notusFolder ]
            },
            {
                test: /\.(jpe?g|gif|png|svg)$/i,
                loader: "url-loader?limit=10000",
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
