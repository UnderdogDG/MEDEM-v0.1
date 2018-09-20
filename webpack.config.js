const path = require('path');

module.exports = (env)=>{
    return{
        entry: {
            main: "./src/js/main.js"
        },

        output: {
            filename: "[name]-bundle.js", //name=main property
            path: path.resolve(__dirname, "./dist/js"),
        },
        mode:  (env ==="dev") ? 'developer' : 'production',
        devServer: {
            contentBase: path.join(__dirname, './dist'),
            open: true,
            watchContentBase: true,
        }
    }
}