module.exports = {
    roots: ["<rootDir>/src"],
    transform: {
        "^.+\\.tsx?$" : "ts-jest"
    },
    setupFilesAfterEnv: [
        "@testing-library/jest-dom/extend-expect"
    ],
    moduleNameMapper: {
        "\\.module\.(c|sc|sa)ss$":"identity-obj-proxy",
        "\\.(c|sc|sa)ss$": "<rootDir>/config/styleMock.js",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/config/fileMock.js"
    },
    testRegex:"(/__test__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions:[
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node",
        "css",
        "scss"
    ],
    globals: {
        'ts-jest' :{
            tsConfig: '<rootDir>/tsconfig.test.json',
        }
    }
}