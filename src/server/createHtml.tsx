import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import {Helmet} from "react-helmet";
import { ChunkExtractor } from '@loadable/server';
export default (
    rootComponent: JSX.Element,
    extractor: ChunkExtractor,
) => {
    const styleSheet = new ServerStyleSheet();
    try {
        const html = renderToString(styleSheet.collectStyles(rootComponent));
        const styleTags = styleSheet.getStyleTags();
        const helmet = Helmet.renderStatic();
        return `
        <!DOCTYPE html>
        <html lang="eng">
            <head>
                <link rel="icon" type="image/png" href="/assets/favicon.png" />
                <meta name="viewport" content="width=device-width, user-scalable=no">
                <meta name="google" content="notranslate">
                ${helmet.title.toString()}
                ${extractor.getLinkTags()}
                ${extractor.getStyleTags()}
                ${styleTags}
                <link rel="stylesheet" href="/web/main.css" type="text/css">
            </head>
            <body>
                <div id="root">${html}</div>
                ${extractor.getScriptTags()}
            </body>
        </html>
        `
    } catch(e) {
        console.error(e);
    } finally {
        styleSheet.seal()
    }
}