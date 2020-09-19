interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__:any,
    __PRELOADED_STATE__: any,
}

declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}
declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.module' {
    const classes: { [key: string]: string };
    export default classes;
}
declare module '*.png' {
    const fileInfo: string;
    export default fileInfo
}