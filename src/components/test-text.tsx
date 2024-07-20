"use client";

import React from "react";
import {useRemoteData} from "@/components/hooks/use-remote-data";
import {SessionContext} from "@/services/models/session-context";
import {Result} from "@/services/types/structs";
import {Utils} from "@/services/utils";

export const TestText = () => {
    const {result} = useRemoteData<SessionContext>(new SessionContext(), React.useCallback(async () => {
        const response: Result<SessionContext> = [null, null];
        const result = await Utils.get<SessionContext>("/api/auth");
        console.log(result);
        return [result, null];
    }, []));

    return (
        <>{JSON.stringify(result)}</>
    )
};