module.exports = {
  presets: [
    "@babel/env", 
    "@babel/preset-react",
    "@babel/preset-flow"
  ],
  sourceMaps: 'both',
  plugins: [
    '@babel/plugin-proposal-class-properties'
  ]
};
