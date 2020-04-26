module.exports = {
  presets: [
    ["@babel/preset-env", {
      modules: false
    }]
  ],
  plugins: ["@babel/plugin-proposal-object-rest-spread"],
  exclude: 'node_modules/**'
}