const path = require('path');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env)=>{
    console.log("--->", env.prod, env.dev);
    return{
        entry: {
            main: "./src/js/main.js"
        },

        output: {
            filename: "[name]-bundle.js", //name=main property
            path: path.resolve(__dirname, "./dist/js"),
        },
        mode: (env.dev) ? 'development' : 'production',
        devServer: {
            contentBase: path.join(__dirname, './dist'),
            open: true,
            watchContentBase: true,
        },
        // optimization: {
        //     minimizer: (env.dev) ? [] : [new UglifyJsPlugin()]
        // }
    }
}