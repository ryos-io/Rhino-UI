const webpack = require('webpack')
const path = require('path')
const package = require('./package.json')

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')

module.exports = (env, options) => {
    // create a nice object from the env variable
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next.toUpperCase()}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    const isProduction = options.mode === 'production'
    const envName = isProduction ? 'prod' : 'dev'
    // const envName = 'prod'
    const sourcePath = path.join(__dirname, './src')
    const outPath = path.join(__dirname, './dist')
    console.log(`Build target enviornment': ${options.mode}`);

    const TSSTRICT = (env && env.TSSTRICT) || false
    return {
        mode: options.mode || 'development',
        context: sourcePath,
        entry: {
            app: './index.tsx',
        },
        output: {
            publicPath: '/',
            path: outPath,
            filename: isProduction ? '[contenthash].js' : '[hash].js',
            chunkFilename: isProduction ? '[name].[contenthash].js' : '[name].[hash].js',
        },
        target: 'web',
        resolve: {
            extensions: ['.js', '.ts', '.tsx'],
            // Fix webpack's default behavior to not load packages with jsnext:main module
            // (jsnext:main directs not usually distributable es6 format, but es6 sources)
            mainFields: ['module', 'browser', 'main'],
            alias: {
                app: path.resolve(__dirname, 'src/'),
            },
        },
        module: {
            rules: [
                // .ts, .tsx
                {
                    test: /\.tsx?$/,
                    loader: 'awesome-typescript-loader',
                    options: {
                        ignoreDiagnostics: !TSSTRICT ? [6133, 6134, 6135] : [],
                    },
                    exclude: '/**/*.test.tsx?',
                },
                // css
                {
                    test: /\.css$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        {
                            loader: 'css-loader',
                            query: {
                                modules: true,
                                sourceMap: !isProduction,
                                importLoaders: 1,
                                localIdentName: isProduction ? '[hash:base64:5]' : '[local]__[hash:base64:5]',
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    require('postcss-import')({ addDependencyTo: webpack }),
                                    require('postcss-url')(),
                                    require('postcss-preset-env')({
                                        /* use stage 2 features (defaults) */
                                        stage: 2,
                                    }),
                                    require('postcss-reporter')(),
                                    require('postcss-browser-reporter')({
                                        disabled: isProduction,
                                    }),
                                ],
                            },
                        },
                    ],
                },
                // static assets
                { test: /\.html$/, use: 'html-loader' },
                { test: /\.(a?png|svg)$/, use: 'url-loader?limit=10000' },
                {
                    test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
                    use: 'file-loader',
                },
            ],
        },
        plugins: [
            new webpack.NormalModuleReplacementPlugin(/(.*)\/dev\/(\.*)/, function (resource) {
                resource.request = resource.request.replace(/dev/, `/${envName}/`);
            }),
            new webpack.EnvironmentPlugin(envKeys),
            new WebpackCleanupPlugin(),
            new MiniCssExtractPlugin({
                filename: '[hash].css',
                disable: !isProduction,
            }),
            new HtmlWebpackPlugin({
                template: 'index.html',
                append: {
                    head: `<script src="//cdn.polyfill.io/v3/polyfill.min.js"></script>`,
                },
                meta: {
                    title: package.name,
                    description: package.description,
                    keywords: Array.isArray(package.keywords) ? package.keywords.join(',') : undefined,
                },
            }),
        ],
        devServer: {
            contentBase: sourcePath,
            hot: true,
            inline: true,
            historyApiFallback: {
                disableDotRule: true,
            },
            stats: 'minimal',
            clientLogLevel: 'warning',
            disableHostCheck: true,
            proxy: {
                '/api/v1': {
                    target: 'http://localhost:8080',
                    pathRewrite: { '^/api/v1': '' }
                }
            }
        },
        // https://webpack.js.org/configuration/devtool/
        devtool: isProduction ? 'hidden-source-map' : 'cheap-module-eval-source-map',
        node: {
            // workaround for webpack-dev-server issue
            // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
            fs: 'empty',
            net: 'empty',
        },
    }
}
