var path = require("path");
var webpack = require("webpack");
module.exports = {
    cache: true,
    useMemoryFs: true,
    progress: true,
    watchDelay: 200,

    context: path.join(__dirname, './app'),

    entry: {
        app:'./react/app.jsx'
        //index: './js/index.es6.js',
        //react_es6:'./react/es6/app.es6.jsx',
       // coffee: './js/index_coff.coffee',
       // scss_style:'./styles/main.scss'
       // main:'./js/main.js',
       // html:'./pages/index.html'

    },

    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "dist/",
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
            {test: /\.css$/, loader: "css!autoprefixer"},
            {test: /\.scss$/, loader: "css!sass"},
            {test: /\.js$/, loader: "jsx"},
            {test: /\.jsx$/, loader: "jsx?insertPragma=React.DOM"}
        ]
    },
    plugins: [
        //new ExtractTextPlugin('main.css'),
        new webpack.ProvidePlugin({
            // Automtically detect jQuery and $ as free var in modules
            // and inject the jquery library
            // This is required by many jquery plugins
            jQuery: "jquery",
            $: "jquery"
        })
    ]

    //externals: {
    //    //don't bundle the 'react' npm package with our bundle.js
    //    //but get it from a global 'React' variable
    //    'react': 'React'
    //},
    //resolve: {
    //    extensions: ['', '.js', '.jsx']
    //}
};
