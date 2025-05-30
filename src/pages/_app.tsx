import React from "react";
import {AppProps} from "next/app";
import {ConfigProvider, Layout} from "antd";

export default function Index({Component, pageProps}: AppProps) {
    return (
        <ConfigProvider
            // locale={zhCN}
            theme={{
                token: {
                    // colorPrimary: "#08979c",
                    borderRadius: 3,
                },
                components: {
                    Button: {
                        // colorPrimary: "#003eb3",
                        algorithm: true,
                    },
                },
            }}
        >
            <Layout>
                <Layout.Header style={{paddingLeft: 3, background: "#001d66", boxShadow: ""}}/>
                <Layout hasSider={true}>
                    <Layout style={{paddingTop: 24, paddingRight: 24, paddingLeft: 24}}>
                        <Layout.Content style={{padding: 24, minHeight: "81vh", background: "#fff"}}>
                            <Component {...pageProps} />
                        </Layout.Content>
                    </Layout>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
}
