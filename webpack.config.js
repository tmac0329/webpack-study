//引入生成html插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const config = require('./public/config')[isDev ? 'dev' : 'build'];
const path = require('path'); 
//打包时自动清空之前生成的文件，例：在hash命名文件时手动清理之前的文件重复操作
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//拷贝静态资源
const CopyWebpackPlugin = require('copy-webpack-plugin');
//抽离css文件单独打包（异步）
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
//压缩css文件
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');

const webpack = require('webpack');
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
                    {
                        loader : MiniCssExtractPlugin.loader,
                        options : {
                            hmr : isDev,
                            relaodAll : true
                        }
                    },
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
        new HtmlWebpackPlugin({     //自动生成要编译的html模板
            template:'./public/index.html',
            filename:'index.html',  //打包后的文件名
            config:config.template,
            minify:{
                removeAttributeQuotes:false,    //是否删除属性的双引号
                collapseWhitespace:false,   //是否折叠空白
            },
            chunks:['index']
        }),
        new HtmlWebpackPlugin({
            template:'./public/login.html',
            filename:'login.html',
            chunks:['login']
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([     //拷贝静态资源
            {
                from:'public/js/*.js',
                to:path.resolve(__dirname,'dist','js'),
                flatten:true
            }
        ],{
            ignore:['other.js']     //忽略所有要拷贝的文件中的other.js文件
        }),
        new MiniCssExtractPlugin({
            filename:'css/[name].css'
        }),
        new OptimizeCssPlugin(),
        new webpack.HotModuleReplacementPlugin()    //热更新插件
    ],
    devServer:{
        port:'8088',
        hot:true
    },
    devtool:'cheap-module-eval-source-map',
    entry:{
        // 多页应用（多入口情况）
        index:'./src/index.js',
        login:'./src/login.js'
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].[hash:6].js',
        publicPath:''
    }
}