import React from "react";
import type {DocumentContext} from "next/document";
import Document, {Head, Html, Main, NextScript} from "next/document";
import {createCache, extractStyle, StyleProvider} from "@ant-design/cssinjs";

export default function MyDocument() {
    return (
        <Html lang="en">
            <Head/>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
    const cache = createCache();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => (
                <StyleProvider cache={cache}>
                    <App {...props} />
                </StyleProvider>
            ),
        });

    const initialProps = await Document.getInitialProps(ctx);
    const style = extractStyle(cache, true);
    return {
        ...initialProps,
        styles: (
            <>
                {initialProps.styles}
                <style dangerouslySetInnerHTML={{__html: style}}/>
            </>
        ),
    };
};
