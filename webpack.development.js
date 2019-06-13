const path = require('path');
const webpack = require('webpack');
const DotEnv = require('dotenv-webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const AutoDllPlugin = require('autodll-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// shareable webpack config
const Config = require('webpack-config').Config;
const baseConfig = path.resolve(__dirname, 'webpack.base.js');
const helpers = require('./helper');
const myAppSrc = '';
const myAppSrcAbs = helpers.root(myAppSrc);
const BkPackageProject = path.resolve(myAppSrcAbs, 'package.json');
const ProjectPackage = require(BkPackageProject);

console.log('Iniciamos webpack.development ...');
console.log("path1", path.resolve(myAppSrcAbs, "src/index.js"));
console.log("DIRNAME", path.resolve(__dirname, "src"));

const domainRegEx = /(domain=)\S+/g;

function relayRequestHeaders(proxyReq) {
    let domain = '.epd.bankia.int';
    let cookiesStr = proxyReq.getHeader('cookie');
    if (cookiesStr) {
        proxyReq.setHeader('cookie', cookiesStr.replace(domainRegEx, '$1' + domain + ';'));
    }
}

function relayResponseHeaders(proxyRes) {
    let setCookieHeader = proxyRes.headers['set-cookie'];
    if (setCookieHeader && setCookieHeader.length) {
        proxyRes.headers['set-cookie'] = setCookieHeader.map(function (cookie) {
            return cookie.replace(domainRegEx, '$1;');
        });
    }
}

const htmlWebpackPlugin = new HtmlWebPackPlugin({
    inject: false,
    hash: true,
    template: './public/index.html',
    filename: './index.html'
});

module.exports.default = new Config().extend(baseConfig).merge({
    mode: 'development',
    entry: {
        main: [
            './public/demo/demo.js'
        ]
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve(myAppSrcAbs, 'public/demo'),
            path.resolve(myAppSrcAbs, "src")
        ],
        alias: {},
        extensions: ['*', '.js', '.json', '.jsx', '.scss']
    },
    output: {
        path: path.resolve(myAppSrcAbs, 'public'),
        libraryTarget: 'umd',
        publicPath: '/',
        filename: '[name].[hash].js'
    },
    externals: {},
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(myAppSrcAbs, "public"),
        host: 'desarrollolocal.epd.bankia.int',
        port: 4201,
        proxy: [{
            context: ['/auth', '/api'],
            target: 'http://slish1028:35272',
            onProxyReq: relayRequestHeaders,
            onProxyRes: relayResponseHeaders
        }],
        compress: true,
        historyApiFallback: true,
        hot: true,
        https: false,
        noInfo: false
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                include: [
                    path.resolve(myAppSrcAbs, 'public/demo'),
                    path.resolve(myAppSrcAbs, 'src')
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: [['@babel/preset-env', {
                        //useBuiltIns: "usage",
                        targets: {
                          browsers: [
                            "ie >= 11",
                            "android >= 4.2",
                            "ios >= 7",
                            "chrome >= 29",
                            "firefox >= 48",
                            "safari >= 9.1"
                          ],
                        },
                        debug: true
                      }], '@babel/react'],
                        plugins: [
                            ['@babel/plugin-proposal-decorators', {'legacy': true}],
                            '@babel/proposal-class-properties',
                            '@babel/plugin-syntax-dynamic-import'
                        ]
                    }
                }
            },
            {
                test: /\.(woff2?|ttf|eot|svg|gif|png|jpg|jpeg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(css|sass|scss)$/,
                include: [
                    path.resolve(myAppSrcAbs, 'src'),
                    path.resolve(myAppSrcAbs, 'public')
                ],
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            sourceMap: true,
                            importLoader: 2
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')
                            ],
                            autoprefixer: {
                                browsers: ['last 2 versions']
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                js: {
                    test: /\.js$/,
                    name: "commons",
                    chunks: "all",
                    minChunks: 7
                }
            }
        }
    },
    plugins: [
        new DotEnv({
            path: path.resolve(__dirname, './src/environments/dev.env'),
            safe: false,
            systemvars: true,
            silent: false,
            debug: true
        }),
        new DuplicatePackageCheckerPlugin({
            emitError: false,
            verbose: true
        }),
        new MiniCssExtractPlugin({
            filename: "style.[hash].css"
        }),
        htmlWebpackPlugin,
        new AutoDllPlugin({
            debug: true,
            filename: `${ProjectPackage.name}-[name].js`
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new WebpackMd5Hash()
    ],
    cache: false,
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        ignored: [
            path.resolve(myAppSrcAbs, 'node_modules'),
            path.resolve(myAppSrcAbs, 'umd'),
        ]
    }
});
