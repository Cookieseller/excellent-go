const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: path.join(__dirname, 'src/server.js'),
    target: 'node',
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
       rules: [{
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                }
            }]
    },
    externals: [nodeExternals()]
};