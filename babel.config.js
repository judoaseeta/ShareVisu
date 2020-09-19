function isWeb(caller) {
    return Boolean(caller && caller.target === 'web');
}

function isWebpack(caller) {
    return Boolean(caller && caller.name === 'babel-loader');
}

module.exports = api => {
    const web = api.caller(isWeb);
    const webpack = api.caller(isWebpack);

    return {
        presets: [
            '@babel/preset-react',
            [
                '@babel/preset-env',
                {
                    useBuiltIns: web? 'entry' : undefined,
                    targets: !web ? { node : 'current'} : undefined,
                    modules: webpack ? false : 'commonjs'
                }
            ],
            '@babel/preset-typescript'
        ],
        plugins: [
            '@loadable/babel-plugin',
            "@babel/plugin-transform-runtime",
            [
                'module-resolver',
                {
                    root: ['.'],
                    extensions: ['.ts', '.tsx'],
                },
            ],
        ]
    }

}