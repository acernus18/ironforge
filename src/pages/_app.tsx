import React from "react";
import {AppProps} from "next/app";
import {ConfigProvider, Layout} from "antd";
import {UserSessionContextProvider} from "@/components/context/user-session-context";
// import zhCN from "antd/locale/zh_CN";

export default function Index({Component, pageProps}: AppProps) {
    return (
        <UserSessionContextProvider>
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
                            <Layout.Footer style={{textAlign: "center"}}>
                                备案号: <a href={"https://beian.miit.gov.cn/"}>粤ICP备2021175635号-1</a>
                                <p style={{marginTop: 10}}>
                                    Copyright © 2022 Maples. All rights reserved.
                                </p>
                            </Layout.Footer>
                        </Layout>
                    </Layout>
                </Layout>
            </ConfigProvider>
        </UserSessionContextProvider>
    );
}
