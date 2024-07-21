import React from "react";
import {Button} from "antd";
import {UserSessionContext} from "@/components/context/user-session-context";

export default function Index() {

    const userSession = React.useContext(UserSessionContext);

    return (
        <>
            {JSON.stringify(userSession)}
            <Button>111</Button>
        </>
    );
}
