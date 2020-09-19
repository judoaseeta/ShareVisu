const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports.resolveWithRoot = (target) => {
    const root = path.parse(__dirname).dir;
    return path.resolve(root,target);
}
exports.loadTypescript = ({ include, exclude } = {}) => {
    return  {
        test: /\.tsx?$/,
        include,
        exclude,
        use: ['babel-loader', 'ts-loader'],
    }
}
exports.loadStyleSheet = (type = 'css', needExtract = false) => {
    if(type === 'css') {
        if(!needExtract) {
            return {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            };
        } else {
            return  {
                test:  /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            };
        }
    } else if (type === 'scss' || type === 'sass') {
        if(!needExtract) {
            return {
                test: /\.(sc|c|sa)ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            };
        } else {
            return  {
                test:  /\.(sc|c|sa)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            };
        }
    }
}
exports.loadImages = ({ include, exclude, options } = {}) => {
    return {
        test: /\.(png|jpg|gif)$/i,
        include,
        exclude,
        use: [
            {
                loader: require.resolve('url-loader'),
                options,
            },
        ]
    };
}