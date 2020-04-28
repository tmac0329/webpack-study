const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = merge(baseWebpackConfig,{
    mode:'production',
    plugins:[
        new CopyWebpackPlugin([
            {
                from:'./public/js/test.js',
                to:path.resolve(__dirname,'dist','jsProd'),
                flatten:true
            }
        ])
    ]
});