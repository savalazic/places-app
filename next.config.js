const path = require('path');
const glob = require('glob');
const OhPack = require('ohpack-webpack-plugin');
const SMixer = require('stylus-mixer');

module.exports = {
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.(css|styl)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]',
        },
      },
      {
        test: /\.styl$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader',
          {
            loader: OhPack.loaders.stylus,
            options: {
              use: [SMixer()],
              includePaths: ['styles', 'node_modules']
                .map(d => path.join(__dirname, d))
                .map(g => glob.sync(g))
                .reduce((a, c) => a.concat(c), []),
            },
          },
        ],
      },
    );
    return config;
  },
};
