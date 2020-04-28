const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(baseWebpackConfig,{
    mode:'development',
    devServer:{
        port:'8088'
    }
});