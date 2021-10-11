const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const DotenvPlugin = require('dotenv-webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (_, { mode }) => {
    const dev = mode === 'development' || !mode;
    
    const pages = fs.readdirSync(path.resolve(__dirname, './src/pages')).reduce((prev, k) => {
        const subpages = fs.readdirSync(path.resolve(__dirname, `./src/pages/${k}`))
            .filter(v => fs.statSync(`./src/pages/${k}/${v}`).isDirectory() 
                && fs.existsSync(`./src/pages/${k}/${v}/index.js`))
            .reduce((p, v) => ({
                ...p,
                [`${k}/${v}`]: `./src/pages/${k}/${v}/index.js`
            }), {});
        return ({
            ...prev,
            ...subpages,
            [k]: `./src/pages/${k}/index.js`
        });
    }, {});
    return [{
        name: 'planning-wiki-client',
        mode,
        target: 'web',
        entry: pages,
        output: {
            path: path.resolve(__dirname, './build'),
            filename: (pathData) => pathData.chunk.name === 'index' || pathData.chunk.name === '404' ? '[name].[hash].js' : `[name]/${pathData.chunk.name.split('/').slice(-1)[0]}.[hash].js`
        },
        resolve: {
            alias: {
                //Svelte
                svelte: path.resolve('node_modules', 'svelte'),
                //Src links
                components: path.resolve('src', 'components'),
                styles: path.resolve('src', 'styles'),
                lib: path.resolve('src', 'lib'),
                assets: path.resolve('src', 'assets'),
                static: path.resolve('src', 'static')
            },
            extensions: ['.mjs', '.js', '.svelte'],
            mainFields: ['svelte', 'browser', 'module', 'main']
        },
        module: {
            rules: [
                {
                    test: /\.(html|svelte)$/,
                    exclude: path.resolve(__dirname, './index.html'),
                    use: [{
                        loader: 'svelte-loader',
                        options: {
                            compilerOptions: {
                                dev, // Default: false
                            },
                            dev,
                            emitCss: true,
                            css: true,
                            hotReload: dev
                        } 
                    }]
                },
                {
                    test: /\.pre.js$/,
                    use: [{
                        loader: 'json-loader',
                    },{
                        loader: 'val-loader',
                        options: {
                            minify: false,
                            "feature-detects": [
                              "test/es6/promises",
                            ],
                        },
                    }]
                },
                {
                    test: /\.css$/,
                    use: [
                        dev ? 'style-loader' : ExtractCssChunks.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                            }
                        }
                    ]
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        dev ? 'style-loader' : ExtractCssChunks.loader,
                        // Translates CSS into CommonJS
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                            }
                        },
                        // Compiles Sass to CSS
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(png|jp(e*)g|svg|gif|webp)$/i,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 1000,
                            name: 'assets/[name].[hash].[ext]'
                        }
                    }
                    ],
                },
            ]
        },
        devServer: {
            contentBase: path.join(__dirname, 'build'),
            compress: true,
            port: 9000,
            hot: true,
            staticOptions: {
                extensions: ['html']
            }
        },
        plugins: [
            new ExtractCssChunks({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                moduleFilename: ({ name }) => name === 'index' || name === '404' ? `${name}.css` : `${name}/${name.split('/').slice(-1)[0]}.css`
            }),
            ...Object.keys(pages).map(v => new HtmlWebpackPlugin({
                title: "Planning.wiki",
                filename: v === 'index' || v === '404' ? `${v}.html` : `${v}/index.html`,
                chunks: [v],
                meta: {
                    viewport: 'width=device-width, initial-scale=1',
                    robots: process.env.NOINDEX ? "noindex" : "all"
                },
                favicon: './src/assets/favicon.webp',
                publicPath: process.env.HOST_URL ? process.env.HOST_URL : '/'
            })),
            new DotenvPlugin({
                systemvars: true,
            }),
        ],
    }];
}