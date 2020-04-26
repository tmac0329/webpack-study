const HtmlWebpackPlugin = require('html-webpack-plugin');//引入生成html插件
const isDev = process.env.NODE_ENV === 'development';
const config = require('./public/config')[isDev ? 'dev' : 'build'];
const path = require('path'); 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    mode:isDev ? 'development' : 'production',
    module:{
        rules:[
            {
                test:/\.jsx?$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:["@babel/preset-env"],
                        plugins:[
                            [
                                "@babel/plugin-transform-runtime",
                                {
                                    "corejs":3
                                }
                            ]
                        ]
                    }
                },
                exclude:/node_modules/,  //排除node_module目录中的文件

            },
            {
                test:/\.(le|c)ss$/,
                use:[
                    'style-loader',
                    'css-loader',
                    {
                        loader : 'postcss-loader',
                        options:{
                            plugins:function(){
                                return [
                                    require('autoprefixer')({
                                        "overrideBrowserslist":[
                                            ">0.25%",
                                            "not dead"
                                        ]
                                    })
                                ]
                            }
                        }
                    },
                    "less-loader"
                ],
                exclude:/node_modules/
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                use:{
                    loader:'url-loader',
                    options:{
                        limit:10240,    //10k
                        esModule:false,
                        name:'[name]_[hash:6].[ext]',
                        outputPath:'assets'
                    }
                },
                exclude:/node_module/
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html',
            filename:'index.html',  //打包后的文件名
            config:config.template,
            minify:{
                removeAttributeQuotes:false,    //是否删除属性的双引号
                collapseWhitespace:false,   //是否折叠空白
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from:'public/js/*.js',
                to:path.resolve(__dirname,'dist','js'),
                flatten:true
            }
        ])
    ],
    devServer:{
        port:'8081'
    },
    devtool:'cheap-module-eval-source-map',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.[hash:6].js',
        publicPath:''
    }
}