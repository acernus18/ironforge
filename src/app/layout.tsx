import React from "react";
import {ConfigProvider, Layout} from "antd";
import zhCN from "antd/locale/zh_CN";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {useRemoteData} from "@/components/hooks/use-remote-data";
import {SessionContext} from "@/services/models/session-context";
import {Result} from "@/services/types/structs";
import {AuthContext} from "@/components/context";

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {



    return (
        <html lang="en">
        <head>
            <title>cms</title>
            <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon"/>
        </head>
        <body style={{margin: "0"}}>
        <AntdRegistry>
            {/*<AuthContext.Provider value={new SessionContext()}>*/}
            {/*    */}
            {/*</AuthContext.Provider>*/}

            <ConfigProvider
                locale={zhCN}
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
                    <Header style={{paddingLeft: 3, background: "#001d66", boxShadow: ""}}/>
                    <Layout hasSider={true}>
                        <Layout style={{paddingTop: 24, paddingRight: 24, paddingLeft: 24}}>
                            <Content style={{padding: 24, minHeight: "81vh", background: "#fff"}}>
                                {children}
                            </Content>
                            <Footer style={{textAlign: "center"}}>
                                备案号: <a href={"https://beian.miit.gov.cn/"}>粤ICP备2021175635号-1</a>
                                <p style={{marginTop: 10}}>
                                    Copyright © 2022 Maples. All rights reserved.
                                </p>
                            </Footer>
                        </Layout>
                    </Layout>
                </Layout>
            </ConfigProvider>
        </AntdRegistry>
        </body>
        </html>
    );
}
