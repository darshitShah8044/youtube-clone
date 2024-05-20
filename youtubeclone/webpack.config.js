const path = require("path");

module.exports = {
  // Entry point of your React application
  entry: "./src/index.js",
  output: {
    // Output directory
    path: path.resolve(__dirname, "dist"),
    // Output filename
    filename: "bundle.js",
  },
  resolve: {
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
      stream: require.resolve("stream-browserify"),
    },
  },
  // Other webpack configuration options...
};
