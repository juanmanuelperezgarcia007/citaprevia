const path = require('path');
const DotEnv = require('dotenv-webpack');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const AutoDllPlugin = require('autodll-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// shareable webpack config
const Config = require('webpack-config').Config;
const baseConfig = path.resolve(__dirname, 'webpack.base.js');
const helpers = require('./helper');
const myAppSrc = '';
const myAppSrcAbs = helpers.root(myAppSrc);
const BkPackageProject = path.resolve(myAppSrcAbs, 'package.json');
const ProjectPackage = require(BkPackageProject);

console.log('Iniciamos webpack.production.js ...');

module.exports = new Config().extend(baseConfig).merge({
    mode: 'production',
    entry: {
        main: [
            './public/demo/demo.js'
        ]
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve(myAppSrcAbs, 'src')
        ],
        extensions: ['*', '.js', '.json', '.jsx', '.scss']
    },
    output: {
        path: path.resolve(myAppSrcAbs, 'umd'),
        filename: `${ProjectPackage.name}-[name].js`,
        libraryTarget: 'umd',
        umdNamedDefine: true,
        publicPath: '/'
    },
    externals: [],
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
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
                test: /\.(woff2?|ttf|eot|svg)$/,
                use: [{
                    loader: 'file-loader?prefix=fonts/',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/fonts/'
                    }
                }]
            },
            {
                test: /\.(gif|png|jpg|jpeg|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/images/'
                    }
                }]
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
                            importLoader: true,
                            minimize: 'produccion'
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
                            },
                            name: '[name].[ext]',
                            outputPath: 'assets/css/'
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
            chunks: 'all',
            minSize: 100000,
            maxSize: 300000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendor: {
                    test: /[\/]node_modules[\/]([\w]+|@babel|@webcomponents|@samverschueren|@types)/,
                    name: 'vendor',
                    chunks: 'all',
                }
            }
        },
        minimizer: [
            new TerserPlugin({
                sourceMap: true,
                parallel: true
            })
        ]
    },
    plugins: [
        new DotEnv({
            path:path.resolve(__dirname, './src/environments/prod.env'),
            safe: false, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
            systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
            silent: false // hide any errors
        }),
        new DuplicatePackageCheckerPlugin({emitError: false}),
        new CleanWebpackPlugin([
            'umd'
        ], {
            root: myAppSrcAbs
        }),
        new CopyWebpackPlugin([
            {from: path.resolve(myAppSrcAbs, 'public/assets'), to: 'assets'}
        ]),
        new MiniCssExtractPlugin({
            filename: `./assets/css/${ProjectPackage.name}-[name].css`,
            chunkFilename: `[id].${ProjectPackage.name}-[name].css`
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        }),
        new AutoDllPlugin({
            debug: true,
            filename: `${ProjectPackage.name}-[name].js`
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: false,
            debug: true
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
});
