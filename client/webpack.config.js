const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = (env, argv) => {
  const isDevelopment = argv.mode !== "production";

  return {
    mode: isDevelopment ? "development" : "production",
    entry: {
      main: ["./src/index.jsx"],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"]
            },
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    plugins: [
      isDevelopment && new ReactRefreshPlugin(),
      new HtmlWebpackPlugin({
        filename: "./index.html",
        template: "./public/index.html",
      }),
    ].filter(Boolean),
    resolve: {
      extensions: [".js", ".jsx"],
      alias: {
        style: path.resolve(__dirname, "src/styles"),
        components: path.resolve(__dirname, "src/components"),
        pages: path.resolve(__dirname, "src/pages"),
      }
    },
    devServer: {
      historyApiFallback: true,
    },
  };
};