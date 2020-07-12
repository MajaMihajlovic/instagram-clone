const HtmlWebpackPlugin = require("html-webpack-plugin"),
    path = require("path"),
    getBabelConfig = require("./babel.config"),
    p = (p) => path.join(__dirname, "../", p || "");

module.exports = {
    resolve: {
        alias: {
            app: p("src"),
        },
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                //add here any ES6 based library
                include: /[\\\/](src)[\\\/]/,
                loader: "babel-loader",
                query: getBabelConfig({ modules: false }),
            },
            {
                test: /\.(png|jpg)/,
                loader: "file-loader",
            },
        ],
    },
    entry: {
        app: [p("src/index.js")],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: p("public/index.html"),
        }),
    ],
    optimization: {
        runtimeChunk: "single",
    },
};
