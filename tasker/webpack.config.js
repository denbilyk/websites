var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    cache: true,
    useMemoryFs: true,
    progress: true,
    watchDelay: 200,

    context: path.join(__dirname, './src/main/webapp/app'),

    entry: {
        //app:'./react/app.jsx'
        //index: './js/index.es6.js',
        app:'./react/es6/app.es6.jsx'
        //app:'./react/app.jsx'
       // coffee: './js/index_coff.coffee',
       // scss_style:'./styles/main.scss'
       // main:'./js/main.js',
       // html:'./pages/index.html'

    },

    output: {
        path: path.join(__dirname, "target"),
        filename: "[name].js",
        chunkFilename: "[chunkhash].js"
    },
    module: {

        //{test: /\.es6.js$/, exclude: /node_modules/, loader: "babel-loader?stage=0"},
        //  {test: /\.coffee$/, exclude: /node_modules/, loader: "coffee-loader"},
        // {test: /\.(png|jpg|gif)$/, loader: "file-loader?name=img/img-[hash:6].[ext]"},
        //  {test: /\.(png|jpg|gif)$/, loader: "url-loader?limit=5000&name=img/[hash:6]-[hash:4]-[hash:4].[ext]"},
        //  {test: /\.html$/, loader: "html-loader" },
        //{test: /\.es6.jsx$/, loader: "babel-loader?stage=0"}
        // required for react jsx
        loaders: [
            //{test: /\.css$/, loader: "css!autoprefixer"},
            {test: /\.html$/, loader: "html"},
            {test: /\.(png|jpg|gif)$/, loader: "url?limit=5000&name=img/[hash:16].[ext]"},
            {test: /\.scss$/, loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap') },
            {test: /\.es6.jsx$/, loader: "babel?stage=0"}
            //{test: /\.js$/, loader: "jsx"},
            //{test: /\.jsx$/, loader: "jsx?insertPragma=React.DOM"}
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.ProvidePlugin({
            // Automtically detect jQuery and $ as free var in modules
            // and inject the jquery library
            // This is required by many jquery plugins
            jQuery: "jquery",
            $: "jquery"
        })
    ]

};
