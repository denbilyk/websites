var path = require("path");
var webpack = require("webpack");
module.exports = {
    cache: true,
    useMemoryFs: true,
    progress: true,
    watchDelay: 200,

    context: path.join(__dirname, './app'),

    entry: {
        react: './react/app.jsx'
    },

    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "dist/",
        filename: "bundle.js",
        chunkFilename: "[chunkhash].js"
    },
    module: {
        loaders: [
            // required to write "require('./style.css')"
            {test: /\.css$/, loader: "style-loader!css-loader"},

            // required for react jsx
            {test: /\.js$/, loader: "jsx-loader"},
            {test: /\.jsx$/, loader: "jsx-loader?insertPragma=React.DOM"}
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            // Automtically detect jQuery and $ as free var in modules
            // and inject the jquery library
            // This is required by many jquery plugins
            jQuery: "jquery",
            $: "jquery"
        })
    ],

    externals: {
        //don't bundle the 'react' npm package with our bundle.js
        //but get it from a global 'React' variable
        'react': 'React'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
