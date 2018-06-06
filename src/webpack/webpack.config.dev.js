const path = require("path");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    devtool: "source-map",
    stats: "verbose",
    entry: [
        'babel-polyfill',
        'react-hot-loader/patch',
        "webpack-hot-middleware/client",
        path.resolve(__dirname, "..", "..", "src", "client", "index.tsx")
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".ts", ".js", ".jsx", ".tsx"]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
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
                exclude: /node_modules/,
                use: [
                    {
                        loader: "awesome-typescript-loader",
                        query: {
                            useTranspileModule: true,
                            useBabel: true,
                            useCache: true,
                            configFileName: path.resolve(__dirname, "..", "..", "src", "client", "tsconfig.json"),
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
