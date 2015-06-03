var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer-core');
var csswring = require('csswring');

module.exports = function (props) {
    return {
        cache: props.cache,
        useMemoryFs: true,
        progress: true,
        watchDelay: 200,

        context: path.join(__dirname, props.context_path),

        entry: {
            app: './js/App.jsx'
        },

        output: {
            path: path.join(__dirname, props.target_dir),
            filename: props.bundle_filename,
            chunkFilename: props.chunk_filename
        },
        module: {
            loaders: [
                {test: /\.(png|jpg|gif)$/, loader: "url?limit=5000&name=img/[hash:16].[ext]"},
                {test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass!postcss')},
                {test: /\.jsx$/, loader: "babel?stage=0"}
            ]
        },
        plugins: [
            new ExtractTextPlugin(props.extract_text_name),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.ProvidePlugin({
                jQuery: "jquery",
                $: "jquery"
            })
        ],

        postcss: [autoprefixer({browsers: ['Chrome >= 33', 'IE >= 8']}), csswring]
    }
};