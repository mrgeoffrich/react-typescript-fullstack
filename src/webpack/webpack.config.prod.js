const path = require("path");
const webpack = require("webpack");
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
    mode: "production",
    entry: [
        'babel-polyfill',
        path.resolve(__dirname, "..", "client", "index.tsx")
    ],
    output: {
        path: path.resolve(__dirname, '..', '..', 'build', "dist"),
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
                        loader: "awesome-typescript-loader",
                        query: {
                            useTranspileModule: true,
                            useBabel: true,
                            useCache: false,
                            configFileName: path.resolve(__dirname, "..", "client", "tsconfig.json")
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
                include: /node_modules/,
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
                loader: "file-loader"
            },
            {
                test: /\.(woff|woff2)$/,
                loader: "url-loader?prefix=font/&limit=5000"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=image/svg+xml"
            }
        ]
    }
};
